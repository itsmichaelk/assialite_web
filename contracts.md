# Backend Integration Contracts

## Current Frontend State
- **Status**: Complete frontend-only implementation with mock data
- **Mock Data Location**: `/app/frontend/src/data/mock.js`
- **External Redirects**: All CTAs redirect to `https://www.digistore24.com/product/593778?aff=Moneymommys`

## Backend Features to Implement

### 1. Analytics & Tracking System
**Purpose**: Track user behavior and conversion metrics for optimization

**Endpoints**:
- `POST /api/analytics/page-view` - Track page views
- `POST /api/analytics/click` - Track CTA clicks
- `POST /api/analytics/section-view` - Track section visibility
- `GET /api/analytics/dashboard` - Get analytics dashboard data

**Data Models**:
```javascript
// PageView Schema
{
  id: String,
  timestamp: Date,
  ip: String,
  userAgent: String,
  referrer: String,
  page: String, // 'landing', 'impressum', 'datenschutz'
  sessionId: String
}

// ClickEvent Schema  
{
  id: String,
  timestamp: Date,
  sessionId: String,
  elementType: String, // 'cta-main', 'cta-hero', 'cta-testimonials', etc.
  elementLocation: String, // section where clicked
  ip: String
}

// SectionView Schema
{
  id: String,
  timestamp: Date,
  sessionId: String,
  section: String, // 'hero', 'benefits', 'story', 'testimonials', 'bonus', 'faq'
  timeSpent: Number, // seconds
  scrollDepth: Number // percentage
}
```

### 2. Lead Capture System
**Purpose**: Capture interested visitors before they leave

**Endpoints**:
- `POST /api/leads/capture` - Capture lead information
- `GET /api/leads` - Get all leads (admin)
- `POST /api/leads/newsletter` - Newsletter signup

**Data Models**:
```javascript
// Lead Schema
{
  id: String,
  email: String,
  name: String (optional),
  phone: String (optional),
  source: String, // 'exit-intent', 'newsletter', 'contact-form'
  timestamp: Date,
  ip: String,
  userAgent: String,
  interests: [String], // tags like 'ratenzahlung', 'anfaenger', etc.
  status: String // 'new', 'contacted', 'converted'
}
```

### 3. Contact Form System
**Purpose**: Allow visitors to ask questions or request information

**Endpoints**:
- `POST /api/contact/submit` - Submit contact form
- `GET /api/contact/messages` - Get all messages (admin)

**Data Models**:
```javascript
// ContactMessage Schema
{
  id: String,
  name: String,
  email: String,
  subject: String,
  message: String,
  timestamp: Date,
  ip: String,
  status: String, // 'new', 'replied', 'closed'
  priority: String // 'low', 'medium', 'high'
}
```

### 4. Performance Metrics
**Purpose**: Track page performance and optimization opportunities

**Endpoints**:
- `POST /api/metrics/performance` - Submit performance metrics
- `GET /api/metrics/summary` - Get performance summary

**Data Models**:
```javascript
// PerformanceMetric Schema
{
  id: String,
  timestamp: Date,
  loadTime: Number,
  timeToFirstByte: Number,
  firstContentfulPaint: Number,
  largestContentfulPaint: Number,
  cumulativeLayoutShift: Number,
  device: String, // 'mobile', 'tablet', 'desktop'
  connection: String // '4g', 'wifi', etc.
}
```

## Frontend Integration Plan

### Phase 1: Analytics Integration
1. **Remove**: No mock data removal needed (analytics is new)
2. **Add**: Analytics tracking hooks in components
3. **Integration Points**:
   - Page load tracking in App.js
   - CTA click tracking in all buttons
   - Section view tracking with Intersection Observer
   - Session management with localStorage

### Phase 2: Lead Capture Integration  
1. **Add**: Exit-intent modal component
2. **Add**: Newsletter signup form in footer
3. **Add**: Contact form component (optional)
4. **Integration Points**:
   - Exit-intent popup when user tries to leave
   - Newsletter form submission
   - Lead capture on key interactions

### Phase 3: Performance Monitoring
1. **Add**: Performance tracking utilities
2. **Integration Points**:
   - Web Vitals measurement
   - Load time tracking  
   - Error boundary reporting

## Mock Data Strategy
- **Keep**: All current mock data in mock.js (no backend replacement needed)
- **Reason**: Landing page content is static and doesn't need dynamic content management
- **Focus**: Add behavioral tracking and lead generation capabilities

## Security Considerations
- Rate limiting on form submissions
- IP-based tracking (GDPR compliant)
- Input validation and sanitization
- CORS configuration for frontend domain
- Session management for analytics

## Success Metrics
- Page views and unique visitors
- CTA click-through rates
- Lead capture conversion rates  
- Average time on page per section
- Bounce rate optimization
- Mobile vs desktop performance

## Technical Notes
- Use existing MongoDB connection
- Implement proper error handling
- Add logging for debugging
- Consider implementing caching for analytics queries
- Prepare for high traffic with proper indexing