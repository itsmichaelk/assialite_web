#!/usr/bin/env python3
"""
Comprehensive Backend API Testing for AI Product Challenge
Tests all analytics and leads endpoints with realistic data
"""

import requests
import json
import time
import uuid
from datetime import datetime, timedelta
from typing import Dict, Any
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv('/app/frontend/.env')

# Get backend URL from environment
BACKEND_URL = os.getenv('REACT_APP_BACKEND_URL', 'http://localhost:8001')
API_BASE = f"{BACKEND_URL}/api"

class BackendTester:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'Content-Type': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        })
        self.test_results = []
        self.session_id = str(uuid.uuid4())
        
    def log_test(self, test_name: str, success: bool, details: str = ""):
        """Log test results"""
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}")
        if details:
            print(f"   Details: {details}")
        
        self.test_results.append({
            'test': test_name,
            'success': success,
            'details': details,
            'timestamp': datetime.utcnow().isoformat()
        })
    
    def test_health_check(self):
        """Test health check endpoint"""
        try:
            response = self.session.get(f"{API_BASE}/health")
            success = response.status_code == 200
            
            if success:
                data = response.json()
                details = f"Status: {data.get('status')}, DB: {data.get('database')}"
            else:
                details = f"Status code: {response.status_code}"
                
            self.log_test("Health Check", success, details)
            return success
        except Exception as e:
            self.log_test("Health Check", False, str(e))
            return False
    
    def test_analytics_page_view(self):
        """Test page view tracking"""
        try:
            test_data = {
                "ip": "192.168.1.100",
                "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                "referrer": "https://google.com",
                "page": "landing",
                "session_id": self.session_id
            }
            
            response = self.session.post(f"{API_BASE}/analytics/page-view", json=test_data)
            success = response.status_code == 200
            
            if success:
                data = response.json()
                details = f"Page view tracked: {data.get('page')} at {data.get('timestamp')}"
            else:
                details = f"Status: {response.status_code}, Response: {response.text}"
                
            self.log_test("Analytics - Page View Tracking", success, details)
            return success
        except Exception as e:
            self.log_test("Analytics - Page View Tracking", False, str(e))
            return False
    
    def test_analytics_click_event(self):
        """Test click event tracking"""
        try:
            test_data = {
                "session_id": self.session_id,
                "element_type": "cta-main",
                "element_location": "hero-section",
                "ip": "192.168.1.100"
            }
            
            response = self.session.post(f"{API_BASE}/analytics/click", json=test_data)
            success = response.status_code == 200
            
            if success:
                data = response.json()
                details = f"Click tracked: {data.get('element_type')} in {data.get('element_location')}"
            else:
                details = f"Status: {response.status_code}, Response: {response.text}"
                
            self.log_test("Analytics - Click Event Tracking", success, details)
            return success
        except Exception as e:
            self.log_test("Analytics - Click Event Tracking", False, str(e))
            return False
    
    def test_analytics_section_view(self):
        """Test section view tracking"""
        try:
            test_data = {
                "session_id": self.session_id,
                "section": "hero",
                "time_spent": 45,
                "scroll_depth": 85
            }
            
            response = self.session.post(f"{API_BASE}/analytics/section-view", json=test_data)
            success = response.status_code == 200
            
            if success:
                data = response.json()
                details = f"Section view tracked: {data.get('section')} for {data.get('time_spent')}s"
            else:
                details = f"Status: {response.status_code}, Response: {response.text}"
                
            self.log_test("Analytics - Section View Tracking", success, details)
            return success
        except Exception as e:
            self.log_test("Analytics - Section View Tracking", False, str(e))
            return False
    
    def test_analytics_performance(self):
        """Test performance metrics tracking"""
        try:
            test_data = {
                "load_time": 2.5,
                "time_to_first_byte": 0.8,
                "first_contentful_paint": 1.2,
                "largest_contentful_paint": 2.1,
                "cumulative_layout_shift": 0.05,
                "device": "desktop",
                "connection": "4g"
            }
            
            response = self.session.post(f"{API_BASE}/analytics/performance", json=test_data)
            success = response.status_code == 200
            
            if success:
                data = response.json()
                details = f"Performance tracked: {data.get('load_time')}s load time on {data.get('device')}"
            else:
                details = f"Status: {response.status_code}, Response: {response.text}"
                
            self.log_test("Analytics - Performance Metrics", success, details)
            return success
        except Exception as e:
            self.log_test("Analytics - Performance Metrics", False, str(e))
            return False
    
    def test_lead_capture(self):
        """Test lead capture functionality"""
        try:
            test_data = {
                "email": "max.mustermann@example.com",
                "name": "Max Mustermann",
                "phone": "+49 30 12345678",
                "source": "exit-intent",
                "ip": "192.168.1.100",
                "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
                "interests": ["ratenzahlung", "anfaenger"]
            }
            
            response = self.session.post(f"{API_BASE}/leads/capture", json=test_data)
            success = response.status_code == 200
            
            if success:
                data = response.json()
                details = f"Lead captured: {data.get('email')} from {data.get('source')}"
            else:
                details = f"Status: {response.status_code}, Response: {response.text}"
                
            self.log_test("Leads - Lead Capture", success, details)
            return success
        except Exception as e:
            self.log_test("Leads - Lead Capture", False, str(e))
            return False
    
    def test_newsletter_signup(self):
        """Test newsletter signup"""
        try:
            test_data = {
                "email": "anna.schmidt@example.com",
                "source": "newsletter",
                "interests": ["newsletter", "updates"]
            }
            
            response = self.session.post(f"{API_BASE}/leads/newsletter", json=test_data)
            success = response.status_code == 200
            
            if success:
                data = response.json()
                details = f"Newsletter signup: {data.get('email')}"
            else:
                details = f"Status: {response.status_code}, Response: {response.text}"
                
            self.log_test("Leads - Newsletter Signup", success, details)
            return success
        except Exception as e:
            self.log_test("Leads - Newsletter Signup", False, str(e))
            return False
    
    def test_contact_form(self):
        """Test contact form submission"""
        try:
            test_data = {
                "name": "Thomas Weber",
                "email": "thomas.weber@example.com",
                "subject": "Frage zur Ratenzahlung",
                "message": "Hallo, ich hätte gerne mehr Informationen über die Ratenzahlungsmöglichkeiten für den AI Product Challenge Kurs. Können Sie mir dabei helfen?",
                "ip": "192.168.1.100"
            }
            
            response = self.session.post(f"{API_BASE}/leads/contact", json=test_data)
            success = response.status_code == 200
            
            if success:
                data = response.json()
                details = f"Contact form submitted: {data.get('subject')} from {data.get('email')}"
            else:
                details = f"Status: {response.status_code}, Response: {response.text}"
                
            self.log_test("Leads - Contact Form", success, details)
            return success
        except Exception as e:
            self.log_test("Leads - Contact Form", False, str(e))
            return False
    
    def test_lead_deduplication(self):
        """Test lead deduplication functionality"""
        try:
            # First submission
            test_data = {
                "email": "duplicate.test@example.com",
                "name": "Duplicate Test",
                "source": "newsletter",
                "ip": "192.168.1.100",
                "user_agent": "Mozilla/5.0",
                "interests": ["newsletter"]
            }
            
            response1 = self.session.post(f"{API_BASE}/leads/capture", json=test_data)
            
            # Second submission with same email but different interests
            test_data["interests"] = ["newsletter", "ratenzahlung"]
            test_data["source"] = "exit-intent"
            
            response2 = self.session.post(f"{API_BASE}/leads/capture", json=test_data)
            
            success = response1.status_code == 200 and response2.status_code == 200
            
            if success:
                data2 = response2.json()
                details = f"Deduplication working: Updated interests to {data2.get('interests')}"
            else:
                details = f"Status: {response1.status_code}, {response2.status_code}"
                
            self.log_test("Leads - Deduplication", success, details)
            return success
        except Exception as e:
            self.log_test("Leads - Deduplication", False, str(e))
            return False
    
    def test_analytics_summary(self):
        """Test analytics summary endpoint"""
        try:
            # Wait a moment for data to be processed
            time.sleep(1)
            
            response = self.session.get(f"{API_BASE}/analytics/summary?days=7")
            success = response.status_code == 200
            
            if success:
                data = response.json()
                details = f"Summary: {data.get('total_page_views')} views, {data.get('unique_visitors')} visitors, {data.get('total_clicks')} clicks"
            else:
                details = f"Status: {response.status_code}, Response: {response.text}"
                
            self.log_test("Analytics - Summary Dashboard", success, details)
            return success
        except Exception as e:
            self.log_test("Analytics - Summary Dashboard", False, str(e))
            return False
    
    def test_lead_stats(self):
        """Test lead statistics endpoint"""
        try:
            response = self.session.get(f"{API_BASE}/leads/stats?days=7")
            success = response.status_code == 200
            
            if success:
                data = response.json()
                details = f"Lead stats: {data.get('total_leads')} total, {data.get('new_leads')} new, {data.get('conversion_rate')}% conversion"
            else:
                details = f"Status: {response.status_code}, Response: {response.text}"
                
            self.log_test("Leads - Statistics", success, details)
            return success
        except Exception as e:
            self.log_test("Leads - Statistics", False, str(e))
            return False
    
    def test_get_leads(self):
        """Test getting leads with filters"""
        try:
            response = self.session.get(f"{API_BASE}/leads/?limit=10&status=new")
            success = response.status_code == 200
            
            if success:
                data = response.json()
                details = f"Retrieved {len(data)} leads"
            else:
                details = f"Status: {response.status_code}, Response: {response.text}"
                
            self.log_test("Leads - Get Leads with Filters", success, details)
            return success
        except Exception as e:
            self.log_test("Leads - Get Leads with Filters", False, str(e))
            return False
    
    def test_get_contact_messages(self):
        """Test getting contact messages"""
        try:
            response = self.session.get(f"{API_BASE}/leads/contact?limit=10")
            success = response.status_code == 200
            
            if success:
                data = response.json()
                details = f"Retrieved {len(data)} contact messages"
            else:
                details = f"Status: {response.status_code}, Response: {response.text}"
                
            self.log_test("Leads - Get Contact Messages", success, details)
            return success
        except Exception as e:
            self.log_test("Leads - Get Contact Messages", False, str(e))
            return False
    
    def test_get_page_views(self):
        """Test getting page views"""
        try:
            response = self.session.get(f"{API_BASE}/analytics/page-views?days=7&limit=50")
            success = response.status_code == 200
            
            if success:
                data = response.json()
                details = f"Retrieved {data.get('count', 0)} page views"
            else:
                details = f"Status: {response.status_code}, Response: {response.text}"
                
            self.log_test("Analytics - Get Page Views", success, details)
            return success
        except Exception as e:
            self.log_test("Analytics - Get Page Views", False, str(e))
            return False
    
    def test_get_click_events(self):
        """Test getting click events"""
        try:
            response = self.session.get(f"{API_BASE}/analytics/clicks?days=7&limit=50")
            success = response.status_code == 200
            
            if success:
                data = response.json()
                details = f"Retrieved {data.get('count', 0)} click events"
            else:
                details = f"Status: {response.status_code}, Response: {response.text}"
                
            self.log_test("Analytics - Get Click Events", success, details)
            return success
        except Exception as e:
            self.log_test("Analytics - Get Click Events", False, str(e))
            return False
    
    def test_error_handling(self):
        """Test error handling with invalid data"""
        try:
            # Test with invalid email
            invalid_data = {
                "email": "invalid-email",
                "source": "test",
                "ip": "192.168.1.100",
                "user_agent": "test"
            }
            
            response = self.session.post(f"{API_BASE}/leads/capture", json=invalid_data)
            success = response.status_code == 422  # Validation error expected
            
            details = f"Validation error correctly returned: {response.status_code}"
            self.log_test("Error Handling - Invalid Email", success, details)
            return success
        except Exception as e:
            self.log_test("Error Handling - Invalid Email", False, str(e))
            return False
    
    def run_all_tests(self):
        """Run all backend tests"""
        print(f"\n🚀 Starting Backend API Tests")
        print(f"Backend URL: {BACKEND_URL}")
        print(f"API Base: {API_BASE}")
        print("=" * 60)
        
        # Core functionality tests
        tests = [
            self.test_health_check,
            self.test_analytics_page_view,
            self.test_analytics_click_event,
            self.test_analytics_section_view,
            self.test_analytics_performance,
            self.test_lead_capture,
            self.test_newsletter_signup,
            self.test_contact_form,
            self.test_lead_deduplication,
            self.test_analytics_summary,
            self.test_lead_stats,
            self.test_get_leads,
            self.test_get_contact_messages,
            self.test_get_page_views,
            self.test_get_click_events,
            self.test_error_handling
        ]
        
        passed = 0
        failed = 0
        
        for test in tests:
            if test():
                passed += 1
            else:
                failed += 1
            time.sleep(0.5)  # Small delay between tests
        
        print("\n" + "=" * 60)
        print(f"📊 Test Results Summary:")
        print(f"✅ Passed: {passed}")
        print(f"❌ Failed: {failed}")
        print(f"📈 Success Rate: {(passed/(passed+failed)*100):.1f}%")
        
        return passed, failed, self.test_results

if __name__ == "__main__":
    tester = BackendTester()
    passed, failed, results = tester.run_all_tests()
    
    # Save detailed results
    with open('/app/backend_test_results.json', 'w') as f:
        json.dump({
            'summary': {
                'passed': passed,
                'failed': failed,
                'success_rate': passed/(passed+failed)*100 if (passed+failed) > 0 else 0,
                'backend_url': BACKEND_URL,
                'test_timestamp': datetime.utcnow().isoformat()
            },
            'detailed_results': results
        }, f, indent=2)
    
    print(f"\n📄 Detailed results saved to: /app/backend_test_results.json")
    
    # Exit with appropriate code
    exit(0 if failed == 0 else 1)