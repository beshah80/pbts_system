# Balsamiq Design Prompt for Public Bus Transportation System (PBTS)

## Project Overview
Design wireframes for a comprehensive Public Bus Tracking and Scheduling System for Ethiopian cities, specifically Addis Ababa. The system serves three main user types: Administrators, Drivers, and Passengers.

## System Context
- **Target Users**: Transport authorities (AARTB), bus operators (Anbessa, Sheger, Velocity), drivers, and passengers
- **Primary Goal**: Modernize public transport management with real-time tracking, scheduling, and passenger information
- **Technology**: Web-based platform with mobile-responsive design
- **Location**: Addis Ababa, Ethiopia (expandable to other Ethiopian cities)

## Design Requirements

### 1. Admin Dashboard Wireframes
Create wireframes for transport authority and bus operator management:

**Main Dashboard:**
- Header with navigation (Dashboard, Buses, Drivers, Routes, Schedules, Analytics, Settings)
- KPI cards showing: Total Buses, Active Drivers, Routes, Daily Trips
- Real-time status widgets: Active Buses, Unreported Buses, Delays
- Quick actions panel: Add Bus, Add Driver, Create Schedule
- Recent activity feed
- Analytics charts (simple bar/line charts)

**Bus Management:**
- Bus list table with columns: Plate Number, Bus Type (Anbessa/Sheger/Velocity), Status, Driver, Route
- Add/Edit bus form with fields: Plate Number, Bus Number, Type, Capacity, Status
- Bus details view with maintenance history and current assignment
- Search and filter controls

**Driver Management:**
- Driver list with photo thumbnails, name, license number, status, assigned bus
- Driver registration form: Personal info, license details, emergency contact
- Driver profile with performance metrics and trip history
- Status management (Active, Inactive, On Leave)

**Route Management:**
- Route list showing route number, name, start/end locations, distance
- Route creation form with stop selection and sequencing
- Interactive map view for route visualization
- Stop management interface

**Schedule Management:**
- Calendar view of schedules
- Schedule creation form with conflict detection warnings
- Bulk schedule operations
- Schedule templates

### 2. Driver Dashboard Wireframes
Design for bus drivers and supervisors:

**Main Dashboard:**
- Large, touch-friendly interface optimized for mobile
- Current trip information card with route details
- Trip controls: Start Trip, Update Stop, Report Incident, End Trip
- Today's schedule overview
- Emergency alert button (prominent red button)

**Trip Management:**
- Current route map with stop markers
- Stop update interface with large buttons for each stop
- Incident reporting form with predefined categories
- Trip timeline showing completed and upcoming stops

**Schedule View:**
- Today's assignments
- Upcoming trips
- Trip history
- Schedule calendar

### 3. Passenger Dashboard Wireframes
Design for public bus users:

**Main Dashboard:**
- Route search interface (From/To location inputs)
- Popular routes quick access
- Real-time bus tracking map
- Service alerts and notifications
- Favorite routes section

**Route Search Results:**
- List of available routes with details:
  - Route name and number
  - Estimated duration and fare
  - Next departure times
  - Current bus locations
  - "Track" and "View Details" buttons

**Route Details:**
- Route map with all stops marked
- Complete schedule with departure times
- Real-time bus positions
- Estimated arrival times
- Route information (distance, fare, operator)

**Feedback System:**
- Feedback form with rating system
- Category selection (Service, Cleanliness, Punctuality, Safety)
- OTP verification interface for anonymous feedback
- Feedback history

## Design Guidelines

### Visual Hierarchy
- Use clear headings and subheadings
- Implement consistent spacing and alignment
- Prioritize important actions with larger buttons
- Use color coding for status indicators (Green=Active, Red=Alert, Yellow=Warning)

### Mobile-First Approach
- Design for mobile screens first (320px width minimum)
- Use large touch targets (44px minimum)
- Implement collapsible navigation for mobile
- Ensure readable text without zooming

### Ethiopian Context Considerations
- Include Amharic text placeholders where appropriate
- Consider low-bandwidth scenarios with simple layouts
- Design for various device capabilities
- Include offline state indicators

### Status Indicators
- Bus Status: Active (Green), Maintenance (Orange), Inactive (Gray)
- Driver Status: Available (Green), On Trip (Blue), Off Duty (Gray)
- Trip Status: On Time (Green), Delayed (Yellow), Cancelled (Red)

### Data Display
- Use tables for data-heavy sections with sorting capabilities
- Implement card layouts for mobile-friendly information display
- Include search and filter controls for large datasets
- Show loading states and empty states

## Specific Wireframe Pages Needed

### Admin Section (8-10 wireframes)
1. Admin Login
2. Main Dashboard
3. Bus Management List
4. Add/Edit Bus Form
5. Driver Management List
6. Add/Edit Driver Form
7. Route Management
8. Schedule Management
9. Analytics Dashboard
10. Settings Page

### Driver Section (5-6 wireframes)
1. Driver Login
2. Driver Dashboard
3. Current Trip View
4. Stop Update Interface
5. Incident Report Form
6. Schedule View

### Passenger Section (6-7 wireframes)
1. Passenger Home
2. Route Search
3. Search Results
4. Route Details
5. Real-time Tracking
6. Feedback Form
7. OTP Verification

## Technical Considerations for Wireframes
- Show responsive breakpoints (mobile, tablet, desktop)
- Include navigation patterns (hamburger menu, bottom nav, sidebar)
- Indicate interactive elements (buttons, links, form fields)
- Show modal dialogs and overlays
- Include error states and success messages
- Display loading indicators and progress bars

## Ethiopian Transport Context
- Routes connect major terminals: Meskel Square, Mexico Square, Megenagna, Piyassa
- Bus operators: Anbessa (government), Sheger (government), Velocity (private)
- Typical route names: "Meskel-Bole", "Mexico-Piassa", "Megenagna-Merkato"
- Fare system in Ethiopian Birr (ETB)
- Consider Amharic language support

## Accessibility Requirements
- High contrast color schemes
- Clear visual hierarchy
- Keyboard navigation support
- Screen reader friendly layouts
- Simple, intuitive navigation patterns

## Output Format
Create low-fidelity wireframes focusing on:
- Layout structure and information hierarchy
- User flow and navigation patterns
- Content organization and grouping
- Interactive elements placement
- Responsive behavior indicators

Remember: Focus on functionality and user experience over visual design. Use Balsamiq's built-in UI elements and keep wireframes simple and clear.