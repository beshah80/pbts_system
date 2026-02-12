# PBTS Passenger App — Modern Transit Experience Prototype

**Goal:** Create a high-fidelity, desktop-first public transport portal for Addis Ababa. The design must be inviting, intuitive, and consistent with modern travel apps (like Airbnb or Moovit).

**HCI Principles to Apply:**
*   **Recognition over Recall:** Use clear icons and "Pill" shapes for search to make functionality obvious.
*   **Aesthetic and Minimalist Design:** Use whitespace effectively. Avoid "wall of text."
*   **Consistency:** Navigation and buttons must behave identically across all pages.
*   **User Control:** Easy way to undo searches or go back.

---

## 1. Global Layout (Desktop-First)

*   **Top "Masthead Navigation" (Hero Header):**
    *   **Background:** Full-width high-quality image placeholder (height ~320px on Desktop).
    *   **Overlay (Glassmorphism effect):**
        *   **Top Row:** Logo (Left) + Nav Links (Right: Home, Route Planner, Live Map, Alerts, Feedback).
        *   **Center Content:**
            *   **Headline:** "Explore Addis Ababa with Ease."
            *   **Subhead:** "Live tracking, accurate schedules, and real-time alerts."
            *   **Primary CTA:** "Plan Your Journey" (White Button).

*   **Footer (Persistent):**
    *   **Links:** About, Privacy Policy, Terms, Contact Support.
    *   **Socials:** Icons for Telegram, Facebook, Twitter.
    *   **Copyright:** "© 2024 PBTS Addis."

---

## 2. Key Screen Specifications

### A. Home Page (Brand & Entry)
*   **Hero Section:** (As defined above in Global Layout).
*   **Features Grid (Below Fold):**
    *   3-Column Layout.
    *   **Card 1:** "Live Tracking" (Map Icon) - "See exactly where your bus is."
    *   **Card 2:** "Smart Routing" (Path Icon) - "Find the fastest way to your destination."
    *   **Card 3:** "Instant Alerts" (Bell Icon) - "Get notified about delays or changes."
*   **Note:** NO Search Bar on the Homepage (per user requirement). Search is dedicated to the Route Planner.

### B. Journey Planner (Search Page)
*   **Layout:** Split Screen (Left: Search/Results, Right: Map Placeholder).
*   **Search Widget (The "Pill"):**
    *   Floating white card with rounded corners (Pill shape).
    *   **Inputs:** "From" (Current Location) -> "To" (Destination).
    *   **Action:** Circular Orange "Search" Button.
*   **Results List:**
    *   **Card Style:** Clean white cards with shadow.
    *   **Content:** Route Number (e.g., "22"), ETA ("5 min"), Duration ("45 min trip").
    *   **Action:** "Track Live" button on each card.

### C. Live Map (Tracking)
*   **Full-Screen Map Interface:**
    *   **Bus Pins:** Moving icons showing live position.
    *   **User Location:** Blue dot.
    *   **Route Lines:** Polyline showing the path.
*   **Bottom Sheet (Slide-up):**
    *   **Bus Details:** "Bus 402 - Arriving in 2 min."
    *   **Crowd Level:** "Seats Available" (Green).

### D. Feedback & Support (Structured Form)
*   **Layout:** Centered Single-Column Form (Clean & Focused).
*   **Step 1: Rating:**
    *   Large 5-Star Rating component.
    *   Label: "How was your experience?"
*   **Step 2: Category Chips (Clickable):**
    *   [Late Arrival] [Driver Behavior] [Cleanliness] [Safety] [App Issue]
    *   *Behavior:* toggle selection (turn blue when selected).
*   **Step 3: Details:**
    *   "Route ID" (Optional dropdown).
    *   "Comments" (Text area).
*   **Step 4: Submission:**
    *   "Submit Anonymously" (Checkbox - Checked by default).
    *   **Primary Button:** "Send Feedback".
*   **Success State:**
    *   Green Checkmark Animation.
    *   "Thank you! Reference ID: #FDB-2024."

---

## 3. Visual Style & Design Tokens

*   **Color Palette (Modern & Clean):**
    *   **Primary Brand:** Indigo Blue (#4F46E5).
    *   **Accent/Action:** Orange (#F97316) - For "Search" and "Call to Action".
    *   **Background:** Off-White (#F9FAFB).
    *   **Text:** Dark Slate (#1F2937).
    *   **Success:** Green (#10B981).

*   **Typography:**
    *   **Font:** Inter or Poppins (Rounded, friendly sans-serif).
    *   **Headings:** Large, bold, tracking tight.
    *   **Body:** Relaxed line-height (1.6) for readability.

*   **Components:**
    *   **Buttons:** Fully rounded (Pill shape) for primary actions.
    *   **Inputs:** Light gray background, no border until focused.
    *   **Shadows:** Soft, diffused shadows (Apple/Google style) to create depth.
