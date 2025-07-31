from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List
from datetime import datetime
import uuid

class Lead(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    name: Optional[str] = None
    phone: Optional[str] = None
    source: str  # 'exit-intent', 'newsletter', 'contact-form'
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    ip: str
    user_agent: str
    interests: List[str] = []  # tags like 'ratenzahlung', 'anfaenger', etc.
    status: str = 'new'  # 'new', 'contacted', 'converted'

class LeadCreate(BaseModel):
    email: EmailStr
    name: Optional[str] = None
    phone: Optional[str] = None
    source: str
    ip: str
    user_agent: str
    interests: List[str] = []

class NewsletterSignup(BaseModel):
    email: EmailStr
    source: str = 'newsletter'
    interests: List[str] = ['newsletter']

class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    subject: str
    message: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    ip: str
    status: str = 'new'  # 'new', 'replied', 'closed'
    priority: str = 'medium'  # 'low', 'medium', 'high'

class ContactMessageCreate(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str
    ip: str
    
class LeadStats(BaseModel):
    total_leads: int
    new_leads: int
    conversion_rate: float
    top_sources: List[dict]
    leads_by_day: List[dict]