from fastapi import APIRouter, HTTPException, Request
from typing import List, Optional
from datetime import datetime, timedelta
from database import get_database
from models.analytics import (
    PageView, PageViewCreate, ClickEvent, ClickEventCreate, 
    SectionView, SectionViewCreate, AnalyticsSummary,
    PerformanceMetric, PerformanceMetricCreate
)

router = APIRouter(prefix="/api/analytics", tags=["analytics"])

# Get database connection
db = get_database()

def get_client_ip(request: Request) -> str:
    """Extract client IP from request"""
    if "x-forwarded-for" in request.headers:
        return request.headers["x-forwarded-for"].split(",")[0].strip()
    elif "x-real-ip" in request.headers:
        return request.headers["x-real-ip"]
    else:
        return request.client.host if request.client else "unknown"

@router.post("/page-view", response_model=PageView)
async def track_page_view(page_data: PageViewCreate, request: Request):
    """Track a page view event"""
    try:
        # Override IP with actual client IP
        page_data.ip = get_client_ip(request)
        page_view = PageView(**page_data.dict())
        
        await db.page_views.insert_one(page_view.dict())
        return page_view
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to track page view: {str(e)}")

@router.post("/click", response_model=ClickEvent)
async def track_click_event(click_data: ClickEventCreate, request: Request):
    """Track a click event"""
    try:
        # Override IP with actual client IP
        click_data.ip = get_client_ip(request)
        click_event = ClickEvent(**click_data.dict())
        
        await db.click_events.insert_one(click_event.dict())
        return click_event
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to track click: {str(e)}")

@router.post("/section-view", response_model=SectionView)
async def track_section_view(section_data: SectionViewCreate, request: Request):
    """Track a section view event"""
    try:
        section_view = SectionView(**section_data.dict())
        await db.section_views.insert_one(section_view.dict())
        return section_view
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to track section view: {str(e)}")

@router.post("/performance", response_model=PerformanceMetric)
async def track_performance_metric(perf_data: PerformanceMetricCreate, request: Request):
    """Track performance metrics"""
    try:
        performance_metric = PerformanceMetric(**perf_data.dict())
        await db.performance_metrics.insert_one(performance_metric.dict())
        return performance_metric
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to track performance: {str(e)}")

@router.get("/summary", response_model=AnalyticsSummary)
async def get_analytics_summary(days: Optional[int] = 7):
    """Get analytics summary for the last N days"""
    try:
        start_date = datetime.utcnow() - timedelta(days=days)
        
        # Get total page views
        total_views = await db.page_views.count_documents({
            "timestamp": {"$gte": start_date}
        })
        
        # Get unique visitors (by IP)
        unique_visitors_pipeline = [
            {"$match": {"timestamp": {"$gte": start_date}}},
            {"$group": {"_id": "$ip"}},
            {"$count": "unique_visitors"}
        ]
        unique_result = await db.page_views.aggregate(unique_visitors_pipeline).to_list(1)
        unique_visitors = unique_result[0]["unique_visitors"] if unique_result else 0
        
        # Get total clicks
        total_clicks = await db.click_events.count_documents({
            "timestamp": {"$gte": start_date}
        })
        
        # Get top sections by views
        top_sections_pipeline = [
            {"$match": {"timestamp": {"$gte": start_date}}},
            {"$group": {"_id": "$section", "views": {"$sum": 1}, "avg_time": {"$avg": "$time_spent"}}},
            {"$sort": {"views": -1}},
            {"$limit": 5}
        ]
        top_sections = await db.section_views.aggregate(top_sections_pipeline).to_list(5)
        
        # Calculate conversion rate (clicks / page views)
        conversion_rate = (total_clicks / total_views * 100) if total_views > 0 else 0
        
        # Calculate average time on page
        avg_time_pipeline = [
            {"$match": {"timestamp": {"$gte": start_date}}},
            {"$group": {"_id": None, "avg_time": {"$avg": "$time_spent"}}}
        ]
        avg_time_result = await db.section_views.aggregate(avg_time_pipeline).to_list(1)
        avg_time_on_page = avg_time_result[0]["avg_time"] if avg_time_result else 0
        
        return AnalyticsSummary(
            total_page_views=total_views,
            unique_visitors=unique_visitors,
            total_clicks=total_clicks,
            top_sections=top_sections,
            conversion_rate=round(conversion_rate, 2),
            avg_time_on_page=round(avg_time_on_page, 2)
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get analytics: {str(e)}")

@router.get("/page-views")
async def get_page_views(days: Optional[int] = 7, limit: Optional[int] = 100):
    """Get recent page views"""
    try:
        start_date = datetime.utcnow() - timedelta(days=days)
        page_views = await db.page_views.find({
            "timestamp": {"$gte": start_date}
        }).sort("timestamp", -1).limit(limit).to_list(limit)
        
        return {"page_views": page_views, "count": len(page_views)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get page views: {str(e)}")

@router.get("/clicks")
async def get_click_events(days: Optional[int] = 7, limit: Optional[int] = 100):
    """Get recent click events"""
    try:
        start_date = datetime.utcnow() - timedelta(days=days)
        clicks = await db.click_events.find({
            "timestamp": {"$gte": start_date}
        }).sort("timestamp", -1).limit(limit).to_list(limit)
        
        return {"clicks": clicks, "count": len(clicks)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get clicks: {str(e)}")