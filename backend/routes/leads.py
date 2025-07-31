from fastapi import APIRouter, HTTPException, Request
from typing import List, Optional
from datetime import datetime, timedelta
from motor.motor_asyncio import AsyncIOMotorClient
import os
from models.leads import (
    Lead, LeadCreate, NewsletterSignup, ContactMessage, 
    ContactMessageCreate, LeadStats
)

router = APIRouter(prefix="/api/leads", tags=["leads"])

# Get database connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

def get_client_ip(request: Request) -> str:
    """Extract client IP from request"""
    if "x-forwarded-for" in request.headers:
        return request.headers["x-forwarded-for"].split(",")[0].strip()
    elif "x-real-ip" in request.headers:
        return request.headers["x-real-ip"]
    else:
        return request.client.host if request.client else "unknown"

@router.post("/capture", response_model=Lead)
async def capture_lead(lead_data: LeadCreate, request: Request):
    """Capture a new lead"""
    try:
        # Override IP with actual client IP and add user agent
        lead_data.ip = get_client_ip(request)
        lead_data.user_agent = request.headers.get("user-agent", "unknown")
        
        # Check if lead already exists (by email)
        existing_lead = await db.leads.find_one({"email": lead_data.email})
        if existing_lead:
            # Update existing lead with new information
            update_data = {
                "timestamp": datetime.utcnow(),
                "source": lead_data.source,
                "interests": list(set(existing_lead.get("interests", []) + lead_data.interests))
            }
            await db.leads.update_one({"email": lead_data.email}, {"$set": update_data})
            
            # Return updated lead
            updated_lead = await db.leads.find_one({"email": lead_data.email})
            return Lead(**updated_lead)
        else:
            # Create new lead
            lead = Lead(**lead_data.dict())
            await db.leads.insert_one(lead.dict())
            return lead
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to capture lead: {str(e)}")

@router.post("/newsletter", response_model=Lead)
async def newsletter_signup(signup_data: NewsletterSignup, request: Request):
    """Handle newsletter signup"""
    try:
        lead_data = LeadCreate(
            email=signup_data.email,
            source=signup_data.source,
            ip=get_client_ip(request),
            user_agent=request.headers.get("user-agent", "unknown"),
            interests=signup_data.interests
        )
        
        return await capture_lead(lead_data, request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process newsletter signup: {str(e)}")

@router.get("/", response_model=List[Lead])
async def get_leads(
    limit: Optional[int] = 50, 
    status: Optional[str] = None,
    source: Optional[str] = None,
    days: Optional[int] = None
):
    """Get all leads with optional filters"""
    try:
        query = {}
        
        if status:
            query["status"] = status
        if source:
            query["source"] = source
        if days:
            start_date = datetime.utcnow() - timedelta(days=days)
            query["timestamp"] = {"$gte": start_date}
        
        leads = await db.leads.find(query).sort("timestamp", -1).limit(limit).to_list(limit)
        return [Lead(**lead) for lead in leads]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get leads: {str(e)}")

@router.get("/stats", response_model=LeadStats)
async def get_lead_stats(days: Optional[int] = 7):
    """Get lead statistics"""
    try:
        start_date = datetime.utcnow() - timedelta(days=days)
        
        # Total leads
        total_leads = await db.leads.count_documents({
            "timestamp": {"$gte": start_date}
        })
        
        # New leads
        new_leads = await db.leads.count_documents({
            "timestamp": {"$gte": start_date},
            "status": "new"
        })
        
        # Conversion rate (converted / total)
        converted_leads = await db.leads.count_documents({
            "timestamp": {"$gte": start_date},
            "status": "converted"
        })
        conversion_rate = (converted_leads / total_leads * 100) if total_leads > 0 else 0
        
        # Top sources
        top_sources_pipeline = [
            {"$match": {"timestamp": {"$gte": start_date}}},
            {"$group": {"_id": "$source", "count": {"$sum": 1}}},
            {"$sort": {"count": -1}},
            {"$limit": 5}
        ]
        top_sources = await db.leads.aggregate(top_sources_pipeline).to_list(5)
        
        # Leads by day
        leads_by_day_pipeline = [
            {"$match": {"timestamp": {"$gte": start_date}}},
            {
                "$group": {
                    "_id": {"$dateToString": {"format": "%Y-%m-%d", "date": "$timestamp"}},
                    "count": {"$sum": 1}
                }
            },
            {"$sort": {"_id": 1}}
        ]
        leads_by_day = await db.leads.aggregate(leads_by_day_pipeline).to_list(days)
        
        return LeadStats(
            total_leads=total_leads,
            new_leads=new_leads,
            conversion_rate=round(conversion_rate, 2),
            top_sources=top_sources,
            leads_by_day=leads_by_day
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get lead stats: {str(e)}")

@router.post("/contact", response_model=ContactMessage)
async def submit_contact_form(contact_data: ContactMessageCreate, request: Request):
    """Submit contact form message"""
    try:
        # Add IP address
        contact_data.ip = get_client_ip(request)
        
        # Create contact message
        contact_message = ContactMessage(**contact_data.dict())
        await db.contact_messages.insert_one(contact_message.dict())
        
        # Also create a lead from the contact form
        lead_data = LeadCreate(
            email=contact_data.email,
            name=contact_data.name,
            source="contact-form",
            ip=contact_data.ip,
            user_agent=request.headers.get("user-agent", "unknown"),
            interests=["contact-form", "high-intent"]
        )
        
        # Capture the lead (will update if exists)
        await capture_lead(lead_data, request)
        
        return contact_message
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to submit contact form: {str(e)}")

@router.get("/contact", response_model=List[ContactMessage])
async def get_contact_messages(
    limit: Optional[int] = 50,
    status: Optional[str] = None,
    priority: Optional[str] = None
):
    """Get contact messages with optional filters"""
    try:
        query = {}
        
        if status:
            query["status"] = status
        if priority:
            query["priority"] = priority
        
        messages = await db.contact_messages.find(query).sort("timestamp", -1).limit(limit).to_list(limit)
        return [ContactMessage(**msg) for msg in messages]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get contact messages: {str(e)}")

@router.put("/contact/{message_id}/status")
async def update_contact_status(message_id: str, status: str):
    """Update contact message status"""
    try:
        result = await db.contact_messages.update_one(
            {"id": message_id},
            {"$set": {"status": status}}
        )
        
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Contact message not found")
        
        return {"message": "Status updated successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to update status: {str(e)}")

@router.put("/lead/{lead_id}/status")
async def update_lead_status(lead_id: str, status: str):
    """Update lead status"""
    try:
        result = await db.leads.update_one(
            {"id": lead_id},
            {"$set": {"status": status}}
        )
        
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Lead not found")
        
        return {"message": "Lead status updated successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to update lead status: {str(e)}")