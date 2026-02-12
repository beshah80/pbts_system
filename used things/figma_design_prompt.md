# Figma Design Prompt for Public Bus Transportation System (PBTS)

## Project Overview
Create high-fidelity UI designs for a Public Bus Tracking and Scheduling System serving Addis Ababa, Ethiopia. Design a modern, accessible, and culturally appropriate interface for three user types: Administrators, Drivers, and Passengers.

## Design System Foundation

### Color Palette
**Primary Colors:**
- Primary Blue: #2563EB (Professional, trustworthy)
- Secondary Blue: #3B82F6 (Interactive elements)
- Dark Blue: #1E40AF (Headers, emphasis)

**Status Colors:**
- Success Green: #10B981 (Active, on-time, success states)
- Warning Yellow: #F59E0B (Delays, caution)
- Error Red: #EF4444 (Alerts, errors, emergencies)
- Info Blue: #06B6D4 (Information, neutral status)

**Neutral Colors:**
- Gray 900: #111827 (Primary text)
- Gray 700: #374151 (Secondary text)
- Gray 500: #6B7280 (Placeholder text)
- Gray 300: #D1D5DB (Borders)
- Gray 100: #F3F4F6 (Background)
- White: #FFFFFF (Cards, backgrounds)

**Ethiopian Context Colors:**
- Ethiopian Green: #009639 (Flag reference, success)
- Ethiopian Yellow: #FFDE00 (Flag reference, highlights)
- Ethiopian Red: #DA020E (Flag reference, alerts)

### Typography
**Primary Font:** Inter (Clean, modern, multilingual support)
**Secondary Font:** Noto Sans Ethiopic (For Amharic text support)

**Type Scale:**
- H1: 32px/40px (Page titles)
- H2: 24px/32px (Section headers)
- H3: 20px/28px (Card titles)
- H4: 18px/24px (Subsections)
- Body Large: 16px/24px (Primary content)
- Body: 14px/20px (Secondary content)
- Caption: 12px/16px (Labels, metadata)

### Spacing System
- Base unit: 4px
- Spacing scale: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px
- Component padding: 16px (mobile), 24px (desktop)
- Section margins: 32px (mobile), 48px (desktop)

### Component Library

#### Buttons
**Primary Button:**
- Background: Primary Blue (#2563EB)
- Text: White
- Height: 44px (mobile), 40px (desktop)
- Border radius: 8px
- Font weight: 600

**Secondary Button:**
- Background: Transparent
- Border: 2px solid Primary Blue
- Text: Primary Blue
- Same dimensions as primary

**Emergency Button:**
- Background: Error Red (#EF4444)
- Text: White
- Larger size: 56px height
- Bold text, icon included

#### Cards
- Background: White
- Border radius: 12px
- Shadow: 0 1px 3px rgba(0,0,0,0.1)
- Padding: 16px (mobile), 24px (desktop)
- Border: 1px solid Gray 300

#### Form Elements
- Input height: 44px
- Border radius: 8px
- Border: 1px solid Gray 300
- Focus state: Primary Blue border
- Error state: Error Red border

## Screen Designs Required

### 1. Admin Dashboard (Desktop & Mobile)

**Desktop Layout (1440px):**
- Sidebar navigation (240px width)
- Main content area with dashboard widgets
- Header with user profile and notifications
- Grid layout for KPI cards (4 columns)
- Charts and analytics section
- Recent activity feed

**Mobile Layout (375px):**
- Bottom navigation bar
- Collapsible hamburger menu
- Stacked KPI cards
- Simplified charts
- Swipeable sections

**Key Components:**
- KPI cards with icons and numbers
- Status indicators with color coding
- Data tables with sorting/filtering
- Modal forms for adding/editing
- Charts (bar, line, donut)
- Action buttons and dropdowns

### 2. Driver Application (Mobile-First)

**Mobile Layout (375px):**
- Large, touch-friendly interface
- Current trip card with route info
- Map view with route visualization
- Stop update buttons (large, clear)
- Emergency alert (prominent placement)
- Bottom navigation

**Key Features:**
- Trip status timeline
- Stop markers on map
- Incident reporting form
- Schedule calendar view
- Performance metrics
- Offline state indicators

**Accessibility Focus:**
- High contrast colors
- Large touch targets (minimum 44px)
- Clear visual hierarchy
- Simple navigation
- Voice-over support

### 3. Passenger Application (Mobile & Desktop)

**Mobile Layout (375px):**
- Route search interface
- Real-time bus tracking
- Route results list
- Favorite routes
- Feedback system
- Service alerts

**Desktop Layout (1200px):**
- Split layout with map and results
- Detailed route information
- Advanced filtering options
- Multiple route comparison
- Enhanced map features

**Key Components:**
- Search autocomplete
- Route cards with real-time info
- Interactive map with bus positions
- Rating and feedback forms
- OTP verification interface
- Notification system

## Ethiopian Cultural Considerations

### Visual Elements
- Incorporate subtle Ethiopian flag colors in accents
- Use culturally appropriate imagery
- Consider right-to-left text support for Arabic
- Include Amharic text examples
- Use local landmark references

### Content Localization
- Bilingual interface (English/Amharic)
- Local currency (Ethiopian Birr - ETB)
- Local time format (12-hour with AM/PM)
- Ethiopian calendar consideration
- Local phone number formats

### Accessibility for Local Context
- Design for various device capabilities
- Consider low-bandwidth scenarios
- Offline-first approach indicators
- Simple, intuitive navigation
- High contrast for outdoor visibility

## Specific Design Requirements

### Real-Time Elements
- Live status indicators (pulsing animations)
- Real-time bus position markers
- Live countdown timers
- Connection status indicators
- Auto-refresh notifications

### Data Visualization
- Route maps with clear paths
- Bus position markers with direction
- Stop markers with amenities icons
- Status badges and labels
- Progress indicators for trips

### Interactive Elements
- Touch-friendly buttons and controls
- Swipe gestures for mobile
- Hover states for desktop
- Loading states and skeletons
- Error and success messages

### Forms and Input
- Clear form validation
- Step-by-step wizards
- Auto-complete functionality
- Date/time pickers
- File upload interfaces

## Responsive Design Breakpoints
- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px - 1440px
- Large Desktop: 1441px+

## Animation and Micro-interactions
- Smooth transitions (300ms ease-in-out)
- Button hover effects
- Loading animations
- Success confirmations
- Error shake animations
- Progressive disclosure

## Accessibility Standards
- WCAG 2.1 AA compliance
- Color contrast ratio 4.5:1 minimum
- Keyboard navigation support
- Screen reader compatibility
- Focus indicators
- Alternative text for images

## Design Deliverables

### 1. Design System
- Color palette with hex codes
- Typography specifications
- Component library
- Icon set (custom Ethiopian context icons)
- Spacing and layout guidelines

### 2. High-Fidelity Mockups
**Admin Dashboard:**
- Desktop dashboard (3-4 screens)
- Mobile dashboard (3-4 screens)
- Forms and modals
- Data tables and charts

**Driver Application:**
- Mobile interface (5-6 screens)
- Trip management flow
- Emergency and incident reporting
- Schedule views

**Passenger Application:**
- Mobile interface (6-7 screens)
- Desktop interface (3-4 screens)
- Route search and results
- Real-time tracking
- Feedback system

### 3. Prototypes
- Interactive prototypes showing user flows
- Micro-interactions and animations
- Responsive behavior demonstrations
- State changes and transitions

### 4. Specifications
- Design specifications document
- Asset export guidelines
- Developer handoff notes
- Accessibility checklist

## Ethiopian Transport Context Integration

### Route Information Display
- Route numbers and names (e.g., "Route 12: Meskel-Bole")
- Operator identification (Anbessa, Sheger, Velocity)
- Terminal names (Meskel Square, Mexico, Megenagna)
- Fare information in ETB
- Distance in kilometers

### Cultural Design Elements
- Ethiopian flag color accents
- Local architectural elements in illustrations
- Cultural patterns in decorative elements
- Appropriate imagery of Ethiopian buses
- Local landmark icons

### Language Support
- English as primary language
- Amharic text support and examples
- Proper font selection for Ethiopic script
- Text direction considerations
- Cultural number formatting

## Technical Considerations for Design
- Design for web-based platform
- Consider mobile data limitations
- Offline state designs
- Progressive web app considerations
- Cross-browser compatibility
- Performance optimization

## Final Output Requirements
Create a comprehensive Figma file with:
- Organized pages for each user type
- Shared component library
- Consistent design system
- Responsive layouts
- Interactive prototypes
- Developer-ready specifications

Focus on creating a professional, accessible, and culturally appropriate design that serves the diverse needs of Ethiopia's public transportation system while maintaining modern UI/UX standards.