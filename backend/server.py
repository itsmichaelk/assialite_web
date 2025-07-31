from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from database import get_database, client
import logging
from pydantic import BaseModel, Field
from typing import List
import uuid
from datetime import datetime

# Import route modules
from routes import analytics, leads

# Get database connection
db = get_database()

# Create the main app without a prefix
app = FastAPI(
    title="AI Product Challenge Backend",
    description="Backend API for AI Product Challenge Landing Page",
    version="1.0.0"
)

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Define Models (keeping existing models for compatibility)
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {
        "message": "AI Product Challenge Backend API",
        "version": "1.0.0",
        "status": "active",
        "endpoints": {
            "analytics": "/api/analytics/*",
            "leads": "/api/leads/*",
            "health": "/api/health"
        }
    }

@api_router.get("/health")
async def health_check():
    """Health check endpoint"""
    try:
        # Test database connection
        await db.command("ping")
        return {
            "status": "healthy",
            "database": "connected",
            "timestamp": datetime.utcnow()
        }
    except Exception as e:
        return {
            "status": "unhealthy",
            "database": "disconnected",
            "error": str(e),
            "timestamp": datetime.utcnow()
        }

# Legacy endpoints (keeping for compatibility)
@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Include feature routers
api_router.include_router(analytics.router)
api_router.include_router(leads.router)

# Include the main router in the app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_event():
    """Create database indexes on startup"""
    try:
        # Create indexes for analytics collections
        await db.page_views.create_index([("timestamp", -1)])
        await db.page_views.create_index([("session_id", 1)])
        await db.page_views.create_index([("ip", 1)])
        
        await db.click_events.create_index([("timestamp", -1)])
        await db.click_events.create_index([("session_id", 1)])
        await db.click_events.create_index([("element_type", 1)])
        
        await db.section_views.create_index([("timestamp", -1)])
        await db.section_views.create_index([("session_id", 1)])
        await db.section_views.create_index([("section", 1)])
        
        # Create indexes for leads collections
        await db.leads.create_index([("email", 1)], unique=True)
        await db.leads.create_index([("timestamp", -1)])
        await db.leads.create_index([("status", 1)])
        await db.leads.create_index([("source", 1)])
        
        await db.contact_messages.create_index([("timestamp", -1)])
        await db.contact_messages.create_index([("status", 1)])
        await db.contact_messages.create_index([("email", 1)])
        
        # Create indexes for performance metrics
        await db.performance_metrics.create_index([("timestamp", -1)])
        await db.performance_metrics.create_index([("device", 1)])
        
        logger.info("Database indexes created successfully")
    except Exception as e:
        logger.error(f"Failed to create database indexes: {str(e)}")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()