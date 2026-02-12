# Public Bus Transport System (PBTS) - UX/UI Design Specification & Prototype Prompt

This document serves as a comprehensive design specification and prompt for creating high-fidelity prototypes (using tools like Figma or Balsamiq). It addresses specific feedback regarding user flow efficiency ("too many steps"), navigation structure, and visual hierarchy.

## 1. Design Philosophy & Core Requirements
*   **Minimal Clicks:** Every core action must be achievable in **3 clicks or less**.
*   **Clear Hierarchy:** 
    *   **Top Bar:** Logo (Branding) always visible at the top left/center.
    *   **Navigation:** distinct and consistent (Bottom Tab Bar for Mobile, Sidebar for Web/Admin).
*   **Visual Feedback:** Large, touch-friendly buttons for Drivers/Passengers.
*   **Modern Aesthetic:** Clean lines, high contrast for accessibility, and professional color palette (e.g., Navy Blue, White, Status Colors: Green/Red/Orange).

---

## 2. Passenger Application (Mobile First)
**Target Device:** Mobile (iPhone/Android)
**Primary Goal:** Get from Point A to Point B with real-time tracking.

### A. Global Layout
*   **Top Header:** PBTS Logo (Left), Notification Bell (Right).
*   **Bottom Navigation Bar:**
    1.  **Home** (Icon: House)
    2.  **Live Map** (Icon: Map)
    3.  **Routes** (Icon: List)
    4.  **Profile** (Icon: User)

### B. Screen 1: Homepage (The "Hub")
*   **Feedback Addressed:** "Need separate homepage", "Logo at top".
*   **Layout:**
    1.  **Header:** PBTS Logo clearly visible.
    2.  **Hero Section:** "Where do you want to go?" - Large Search Bar (Input).
    3.  **Quick Actions (Horizontal Scroll):** "Home", "Work", "University" (Saved Places - 1 click to route).
    4.  **Recent Routes:** List of last 3 routes taken. Tapping one immediately opens tracking.
    5.  **Nearby Stops:** "Nearest stop: Central Station (2 min walk)" - showing next arriving bus.

### C. Screen 2: Search Results & Selection
*   **Action:** User types destination.
*   **Layout:**
    *   List of options: "Bus 5A - Arriving in 5 mins", "Bus 12 - Arriving in 15 mins".
    *   **One-Click Action:** Tapping a result goes *directly* to Live Tracking. No intermediate "Confirm" page unless payment is required.

### D. Screen 3: Live Tracking (The "Core")
*   **Layout:**
    *   **Map (Full Screen Background):** Shows User location (Blue dot) and Bus location (Bus Icon moving).
    *   **Bottom Sheet (Draggable):**
        *   **Header:** "Route 5A - Towards Downtown"
        *   **Status:** "Arriving in 3 mins" (Big bold text).
        *   **Stops List:** Vertical line showing passed stops (grayed out) and upcoming stops.

---

## 3. Driver Application (Tablet/Large Mobile)
**Target Device:** Tablet or Large Phone (Dashboard mounted)
**Primary Goal:** Manage schedule and trip progress with minimal distraction.

### A. Global Layout
*   **Top Bar:** Driver Name, Vehicle ID, **Status Toggle** (On Duty / Off Duty).

### B. Screen 1: Driver Dashboard (Start of Shift)
*   **Feedback Addressed:** "Too many steps to start".
*   **Layout:**
    1.  **Today's Schedule Card:** "Shift: 08:00 - 16:00".
    2.  **Next Trip Card (Prominent):** 
        *   "Route 101: Central <-> Airport"
        *   "Departure: 08:15 AM"
    3.  **Primary Action Button:** **"START TRIP"** (Green, Full Width).
    *   *Note:* No digging through menus. The next action is always front and center.

### C. Screen 2: Active Trip Mode
*   **Layout:**
    *   **Left Side (Map):** Navigation view showing route line.
    *   **Right Side (Controls):**
        *   **Current Stop:** "Main St. Station" (Highlighted).
        *   **Next Stop:** "Library".
        *   **Passenger Count (Optional):** Simple +/- counter.
        *   **Primary Action:** **"ARRIVED AT STOP"** (Huge Button). Changes to "DEPART" after clicking.
    *   **Floating Action Button (Red):** "Report Incident" (For emergencies/breakdowns).

### D. Screen 3: Incident Report (Quick Modal)
*   **Action:** Driver taps "Report Incident".
*   **Layout:**
    *   Grid of large icons: "Flat Tire", "Accident", "Traffic", "Medical".
    *   Tap Icon -> Auto-send location -> "Help is on the way". (2 clicks total).

---

## 4. Admin Panel (Web Desktop)
**Target Device:** Desktop Browser
**Primary Goal:** System overview and rapid management.

### A. Global Layout
*   **Sidebar Navigation (Left):**
    *   **Logo** at top.
    *   **Dashboard**
    *   **Live Fleet** (Map)
    *   **Schedules**
    *   **Buses / Drivers**
    *   **Incidents** (Badge with count)
    *   **Feedback**
*   **Top Bar:** Search system, User Admin.

### B. Screen 1: Executive Dashboard
*   **Feedback Addressed:** "Worst style" - needs to look professional and dense with info.
*   **Layout:**
    1.  **KPI Cards (Top Row):** 
        *   "Active Buses: 45/50" (Green)
        *   "Open Incidents: 2" (Red)
        *   "On-Time Performance: 94%"
    2.  **Main Chart:** Hourly passenger volume.
    3.  **Recent Activity Feed:** "Bus 101 started trip", "Driver John reported delay".

### C. Screen 2: Live Fleet Map
*   **Layout:**
    *   Full-screen map showing all buses.
    *   Color-coded pins: Green (Moving), Red (Stopped/Issue), Grey (Offline).
    *   **Hover Action:** Hovering over a bus shows "Driver: Jane Doe, Speed: 40km/h, Passengers: 12".

### D. Screen 3: Schedule Management (Grid)
*   **Layout:**
    *   Spreadsheet-like view (React Table).
    *   **Inline Editing:** Click a cell to change time/driver. No "Edit -> Save -> Back" cycle.
    *   **Drag & Drop:** Drag a driver from "Available" list to a "Route" slot.

---

## 5. Prompt for AI / Designer
**Copy and paste this into your design tool or give to a designer:**

> "Create a high-fidelity prototype for the PBTS (Public Bus Transport System) with three distinct interfaces: Passenger (Mobile), Driver (Tablet), and Admin (Desktop). 
>
> **Core Constraint:** Fix previous UX complaints by ensuring the **Passenger App** has a dedicated homepage with the logo at the top and a prominent search bar. Reduce user flows to maximum 3 clicks for core tasks.
>
> **Style Guide:**
> *   **Colors:** Primary #1E40AF (Blue), Secondary #F59E0B (Amber), Background #F3F4F6 (Light Gray).
> *   **Typography:** Inter or Roboto (Clean sans-serif).
> *   **Icons:** Lucide or Material Design (Outline style).
>
> **Specific Views to Generate:**
> 1.  **Passenger Home:** Clean branding, 'Where to?' input, saved places shortcuts.
> 2.  **Passenger Tracking:** Split screen map + arrival time details.
> 3.  **Driver Active Trip:** Large touch targets, clear 'Next Stop' indicator, accessible 'Panic/Incident' button.
> 4.  **Admin Dashboard:** Dense information display with KPI cards and a sidebar navigation."

