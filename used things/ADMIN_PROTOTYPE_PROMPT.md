# PBTS Admin System — Full-Scope Prototype Prompt

**Goal:** Generate a complete, high-fidelity web prototype for the PBTS Admin System. This system is the "Brain" of the operation.
**Target Audience:** Transport Officers, Fleet Managers, and System Admins.
**HCI Principles:**
*   **Visibility:** Immediate status of the fleet.
*   **Error Prevention:** Validation in forms (Bus/Driver creation).
*   **Efficiency:** Powerful filters and search for managing large datasets.
*   **Consistency:** Standardized table layouts and action buttons.

---

## 1. Authentication & Entry

### A. Admin Login Page
*   **Layout:** Split Screen.
    *   **Left (Brand):** High-quality photo of an Addis Ababa street/bus with a dark blue overlay. Large "PBTS Admin" Logo. Quote: "Moving Addis Forward."
    *   **Right (Form):** Clean, centered login card.
*   **Form Elements:**
    *   **Input 1:** "Email or Badge ID" (Icon: User).
    *   **Input 2:** "Password" (Icon: Lock) + "Show Password" eye toggle.
    *   **Action:** "Sign In" (Full-width Blue Button).
    *   **Support:** "Forgot Password?" link and "Contact IT Support" footer.
*   **HCI Note:** Clear error messages (e.g., "Invalid credentials") displayed *inline* in red, not as a popup.

---

## 2. The Command Center

### B. Admin Dashboard (Home)
*   **Layout:** 3-Tier Hierarchy.
*   **Tier 1: Global Status Bar (Top):**
    *   "System Health: Normal" (Green Dot).
    *   "Active Buses: 142/150".
    *   "Critical Alerts: 2" (Blinking Red).
*   **Tier 2: Key Metrics (Cards):**
    *   **Ridership:** Graph showing today's passenger count vs. yesterday.
    *   **On-Time Performance:** Gauge chart (Green zone > 90%).
    *   **Revenue (Optional):** Daily ticket sales estimate.
*   **Tier 3: Live Overview:**
    *   **Map Widget:** Large central map showing bus clusters.
    *   **Recent Activity Feed (Right Side):** "Bus 402 Reported Breakdown", "Driver Abebe clocked in".

---

## 3. Fleet & Staff Management (CRUD)

### C. Bus Management (List View)
*   **Header:** Title "Fleet Management" + Button "Add New Bus" (Primary).
*   **Search & Filter Bar (Crucial for Efficiency):**
    *   **Search:** "Search by Plate # or Bus ID..."
    *   **Filters:** Status (Active, Maintenance, Retired), Capacity (40, 60, 80).
*   **Data Table:**
    *   **Columns:** Bus ID (Bold), Plate Number, Model/Make, Capacity, Status (Badge: Green/Red/Yellow), Last Maintenance Date.
    *   **Actions:** "Edit" (Pencil), "View History" (Eye), "Delete" (Trash - with confirmation).

### D. Add/Edit Bus Form (Modal or Dedicated Page)
*   **Layout:** Two-Column Form with Section Headers.
*   **Section 1: Identification:**
    *   **Bus ID:** Auto-generated (e.g., B-1024) or Manual.
    *   **Plate Number:** Text input with validation pattern (e.g., Code-3...).
*   **Section 2: Specifications:**
    *   **Make/Model:** Dropdown (Anbessa, Yutong, Bishoftu).
    *   **Capacity:** Number input (Stepper).
    *   **Manufacture Year:** Date picker (Year only).
*   **Section 3: Status:**
    *   **Initial Status:** Dropdown (Active, Maintenance).
*   **Actions:** "Cancel" (Ghost button) and "Save Bus" (Primary Blue).

### E. Driver Management (List View)
*   **Header:** "Personnel / Drivers" + "Add New Driver".
*   **Filters:** Status (On Duty, Off Duty, Leave), License Type.
*   **Data Table:**
    *   **Columns:** Photo (Avatar), Full Name, License #, Phone, Status (Badge), Assigned Bus (Link).
    *   **Actions:** "Edit Profile", "View Schedule", "Suspend".

### F. Add Driver Form
*   **Layout:** Steps or Sections.
*   **Section 1: Personal Info:**
    *   **Photo Upload:** Circular dropzone with preview.
    *   **Full Name:** Input.
    *   **Contact:** Phone (Masked input +251...), Email.
*   **Section 2: Credentials:**
    *   **License Number:** Input.
    *   **License Expiry:** Date Picker (Warn if expired).
    *   **Experience:** "Years of Experience" slider or input.
*   **Section 3: Login Details:**
    *   **Badge ID:** Auto-generated.
    *   **Temp Password:** Button to "Generate & Email".

---

## 4. Operations

### G. Schedule Management (The Planner)
*   **View Toggle:** "List View" vs "Calendar/Gantt View".
*   **Filter:** "Select Route" (Dropdown) - **HCI:** Don't show all schedules at once; force route selection to reduce clutter.
*   **The Gantt Chart:**
    *   **Rows:** Bus IDs.
    *   **Bars:** Trips (e.g., 8:00 AM - 9:30 AM).
    *   **Interaction:** Drag a bar to change start time. Click to assign a different driver.
*   **Conflict Detection:** If a bus is assigned to two overlapping trips, show a **Red Warning Line**.

### H. Incident Management
*   **Layout:** Kanban Board (Columns) or List.
*   **Columns:** "New/Open", "Investigating", "Resolved".
*   **Incident Card:**
    *   **Header:** "Accident - Bus 402" (Red Tag).
    *   **Body:** "Collision at Meskel Square."
    *   **Meta:** "Reported 10m ago by Driver".
    *   **Action:** "View Details" button.

---

## 5. Insights & Feedback

### I. Analytics & Reports
*   **Dashboard Style:** Grid of Charts.
*   **Chart 1 (Line):** Peak Hours Ridership (Time vs. Count).
*   **Chart 2 (Bar):** Incidents per Route (Identify dangerous routes).
*   **Chart 3 (Pie):** Fleet Status Distribution (Active vs Maintenance).
*   **Date Range Picker:** "Last 7 Days", "This Month", "Custom".
*   **Export:** "Download CSV/PDF" button top right.

### J. Feedback Management
*   **Layout:** Inbox Style.
*   **Sidebar:** Categories (Cleanliness, Driver Behavior, Late).
*   **Main List:**
    *   **Item:** Star Rating (⭐⭐⭐), Category Tag, Snippet of text ("Bus was very dirty...").
    *   **Action:** Hover shows "Reply" or "Mark as Read".
*   **Detail View (Side Panel):**
    *   Full comment.
    *   Related Trip/Route info.
    *   "Reply to User" text box (if not anonymous).

---

## 6. Visual Design System
*   **Navigation:** Left Sidebar (Dark Blue #0F172A). Collapsible.
*   **Header:** White, Sticky. Contains Global Search and Profile.
*   **Colors:**
    *   **Primary:** #2563EB (Royal Blue).
    *   **Danger:** #EF4444 (Red).
    *   **Success:** #10B981 (Green).
    *   **Warning:** #F59E0B (Amber).
*   **Typography:** Inter or Roboto. Clean, legible, professional.
