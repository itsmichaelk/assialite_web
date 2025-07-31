from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
import uuid

class PageView(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    ip: str
    user_agent: str
    referrer: Optional[str] = None
    page: str  # 'landing', 'impressum', 'datenschutz'
    session_id: str

class PageViewCreate(BaseModel):
    ip: str
    user_agent: str
    referrer: Optional[str] = None
    page: str
    session_id: str

class ClickEvent(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    session_id: str
    element_type: str  # 'cta-main', 'cta-hero', 'cta-testimonials', etc.
    element_location: str  # section where clicked
    ip: str

class ClickEventCreate(BaseModel):
    session_id: str
    element_type: str
    element_location: str
    ip: str

class SectionView(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    session_id: str
    section: str  # 'hero', 'benefits', 'story', 'testimonials', 'bonus', 'faq'
    time_spent: Optional[int] = 0  # seconds
    scroll_depth: Optional[int] = 0  # percentage

class SectionViewCreate(BaseModel):
    session_id: str
    section: str
    time_spent: Optional[int] = 0
    scroll_depth: Optional[int] = 0

class AnalyticsSummary(BaseModel):
    total_page_views: int
    unique_visitors: int
    total_clicks: int
    top_sections: List[dict]
    conversion_rate: float
    avg_time_on_page: float

class PerformanceMetric(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    load_time: float
    time_to_first_byte: Optional[float] = None
    first_contentful_paint: Optional[float] = None
    largest_contentful_paint: Optional[float] = None
    cumulative_layout_shift: Optional[float] = None
    device: str  # 'mobile', 'tablet', 'desktop'
    connection: Optional[str] = None

class PerformanceMetricCreate(BaseModel):
    load_time: float
    time_to_first_byte: Optional[float] = None
    first_contentful_paint: Optional[float] = None
    largest_contentful_paint: Optional[float] = None
    cumulative_layout_shift: Optional[float] = None
    device: str
    connection: Optional[str] = None