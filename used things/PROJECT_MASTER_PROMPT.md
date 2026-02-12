# PBTS "Addis Transit" — Master Prototype Specification

**Status:** Final Correction
**Alignment:** Strictly matched to `d:\Education\pbts_system` folder structure.
**Goal:** Create a cohesive, high-fidelity prototype that upgrades the current "List Views" to professional "Data Management" interfaces.

---

## 1. 👮 Admin Portal (`apps/admin`)

### **Global Navigation (Sidebar)**
*   **Matches Codebase:** `components/layout/sidebar.tsx`
*   **Items:**
    1.  **Dashboard** (`/`)
    2.  **Transport** (Buses) (`/buses`)
    3.  **Drivers** (`/drivers`)
    4.  **Schedules** (`/schedules`)
    5.  **Feedback** (`/feedback`)
    6.  **Incidents** (`/incidents`)
    7.  **Analytics** (`/analytics`)
    8.  **Settings** (`/settings` or `/integration`)

---

### **A. Dashboard (`app/page.tsx`)**
*   **Purpose:** High-level system health (not deep management).
*   **Layout:** 3-Tier Hierarchy.
*   **Tier 1: KPI Cards (4 items):**
    *   **Total Fleet:** "120 Buses" (Active vs Maintenance).
    *   **Active Staff:** "45 Drivers On-Duty".
    *   **Incidents:** "3 Active" (Red text if > 0).
    *   **Ridership:** "12k Today".
*   **Tier 2: System Map (The "Glance" View):**
    *   **Widget:** A central map placeholder showing **clustered pins** (e.g., "5 Buses in Bole").
    *   **Note:** This is *not* a separate "Live Fleet" page; it's just a widget here to see if the system is running.
*   **Tier 3: Recent Alerts:**
    *   List of the last 5 logs (e.g., "Bus 402 reported delay", "New Feedback received").

### **B. Transport / Bus Management (`app/buses/page.tsx`)**
*   **Goal:** Manage the fleet inventory.
*   **UI Pattern:** **Data Table with Filters**.
*   **Top Bar:**
    *   **Search:** "Search Plate # (e.g., ANB-202)..."
    *   **Filter:** `Status` [All, Active, Maintenance].
    *   **Action:** "Add Bus" (Opens Modal).
*   **The Table Columns:**
    *   **Bus ID/Plate:** Bold.
    *   **Type:** (Anbessa, Sheger).
    *   **Capacity:** (e.g., 60).
    *   **Status:** `Badge` (Green=Active, Orange=Maintenance).
    *   **Actions:** Edit (Pencil), Delete (Trash).

### **C. Driver Management (`app/drivers/page.tsx`)**
*   **Goal:** HR & Shift assignment.
*   **UI Pattern:** **Card Grid** or **Table** (Table is better for >20 drivers).
*   **Columns:**
    *   **Profile:** Avatar + Name.
    *   **License:** Number + **Expiry Date** (Highlight red if expired).
    *   **Status:** `Badge` (On Duty / Off Duty).
    *   **Assigned Bus:** Link to Bus ID.

### **D. Schedule Management (`app/schedules/page.tsx`)**
*   **Goal:** Planning routes and times.
*   **UI Pattern:** **Gantt / Timeline View** (Crucial Upgrade).
*   **Visual:**
    *   **Y-Axis:** List of Buses.
    *   **X-Axis:** Time (6 AM - 10 PM).
    *   **Bars:** Colored blocks for trips.
    *   **Interaction:** Click a bar to edit the "Trip" (Change driver, change time).
*   **Conflict:** Show a **Red Line** if two bars overlap for the same bus.

### **E. Incident Management (`app/incidents/page.tsx`)**
*   **Goal:** Handle emergencies.
*   **UI Pattern:** **Kanban Board**.
*   **Columns:**
    1.  **New Reports:** (Red) - Fresh from drivers.
    2.  **In Progress:** (Yellow) - Dispatcher dispatched help.
    3.  **Resolved:** (Green) - Closed.
*   **Card:** Shows Incident Type (Accident/Breakdown), Bus ID, and Time.

### **F. Feedback (`app/feedback/page.tsx`)**
*   **Goal:** Customer Service.
*   **UI Pattern:** **Inbox / List**.
*   **Content:**
    *   List of user comments.
    *   **Star Rating** visualization (⭐⭐⭐⭐⭐).
    *   **Tags:** [Cleanliness], [Punctuality].
    *   **Reply Button:** Opens a modal to send a response (if not anonymous).

### **G. Analytics (`app/analytics/page.tsx`)**
*   **Goal:** Reporting.
*   **Charts:**
    *   **Ridership:** Line chart (Time vs Passengers).
    *   **Performance:** Bar chart (On-Time vs Delayed Routes).

---

## 2. 🚌 Driver App (`apps/driver`)

### **A. Operational Dashboard**
*   **Design Philosophy:** **"Cockpit Mode"** (Large buttons, high contrast).
*   **State 1: Off Duty**
    *   Hero Card: "Shift Starts at 08:00 AM".
    *   Action: "Clock In" / "Start Shift".
*   **State 2: Active Trip**
    *   **Top:** Next Stop Name (Huge Text: "STADIUM").
    *   **Center:** "Arrive" Button (Blue) -> Changes to "Depart" (Green).
    *   **Bottom Right:** **Emergency FAB** (Red Triangle) -> Opens Incident Grid (Breakdown, Accident).

---

## 3. 🧍 Passenger App (`apps/passenger`)

### **A. Home Page**
*   **No Search Bar:** As requested.
*   **Hero:** Full-width image header ("Explore Addis").
*   **Features:** "View Routes", "Track Bus", "Feedback" cards.

### **B. Route Planner (Dedicated Page)**
*   **Search Widget:** "Pill" shape floating over map.
*   **Inputs:** Start -> End.
*   **Results:** List of bus options (Route 22, Route 4) with ETA.

### **C. Feedback Form**
*   **Step-by-Step:**
    1.  **Rate:** 5 Stars.
    2.  **Tag:** Clickable Chips ([Late], [Dirty]).
    3.  **Comment:** Text area.
    4.  **Submit:** Success checkmark.

---

## 4. Shared Design System (Tailwind)
*   **Colors:**
    *   **Admin:** Professional Blue (`bg-blue-600`).
    *   **Driver:** High-Contrast Dark (`bg-slate-900`, `text-white`).
    *   **Passenger:** Friendly Indigo/Orange (`bg-indigo-600`, `bg-orange-500`).
*   **Components:** Use `shadcn/ui` style (Cards, rounded Buttons, Badges).
