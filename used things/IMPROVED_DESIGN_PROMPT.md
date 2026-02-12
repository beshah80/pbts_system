# Ultimate PBTS Design Prompt for High-Fidelity Prototypes

**Instruction to the User:** Copy and paste the text below into your design tool's AI assistant (like ChatGPT, Claude, or a dedicated UI generator) or use it as a checklist when manually designing in Figma/Balsamiq.

---

## 1. System Persona & Design Vibe
"You are an expert UI/UX Designer specializing in modern public transport apps like Uber, Citymapper, or Google Maps. Your goal is to design the **Public Bus Transport System (PBTS)** for Addis Ababa.
**The Vibe:** Ultra-modern, clean, minimal, and high-contrast.
**The Enemy:** Clutter, hidden menus, and 'too many clicks'.
**Primary Rule:** Every core action (finding a bus, starting a trip) must happen in **3 taps or less**."

---

## 2. STRICT Constraints (The "Don't Do This" List)
*   **NO generic dashboards:** Do not make the Driver app look like an Excel sheet. It must look like a specialized navigation tool (large buttons, map-focused).
*   **NO buried navigation:** The Passenger app MUST have a visible **Bottom Navigation Bar** at all times.
*   **NO clutter:** If a button isn't used 80% of the time, hide it in a menu.
*   **Logo Placement:** The PBTS Logo must be prominently displayed at the **Top Center** or **Top Left** of the Passenger Homepage.

---

## 3. Passenger App (Mobile) - The "3-Step" Flow

### Screen 1: The "Hub" (Homepage)
**Prompt Description:**
"Create a mobile homepage for the Passenger App.
*   **Top Bar:** PBTS Logo (Left), Profile Icon (Right).
*   **Hero Section:** A large, friendly text 'Where are you going?' with a high-contrast **Search Input Field**.
*   **Quick Access:** Immediately below the search, show a horizontal row of 'Saved Places' (Home, Work, School) as circular icons.
*   **Recent Activity:** A list of the last 2 trips taken. Tapping one immediately restarts that search.
*   **Bottom Navigation:** 4 tabs [Home (Active), Live Map, Routes, Settings].
*   **Visual Style:** White background, Navy Blue primary elements, rounded corners (16px)."

### Screen 2: Search & Track (The "One-Click" Result)
**Prompt Description:**
"Create the Search Results view overlaid on a Map.
*   **Background:** Full-screen map showing user location.
*   **Bottom Sheet:** A card slides up showing the best bus option.
    *   *Content:* 'Bus 5A - Bole to Piazza'.
    *   *Status:* 'Arriving in 4 mins' (Large, Green Text).
    *   *Action:* A single large Blue button: **'Track Live'**.
*   **UX Note:** Do not force the user to confirm 3 times. Search -> Click Result -> Live Tracking."

### Screen 3: Live Tracking (En Route)
**Prompt Description:**
"Create the Live Tracking screen.
*   **Visuals:** A 3D-style map view following the bus icon along a blue route line.
*   **Info Card (Bottom):**
    *   'Next Stop: Mexico Square'.
    *   'ETA: 12 mins'.
    *   **Panic/Feedback:** A small, discreet 'Report Issue' flag icon in the corner."

---

## 4. Driver App (Tablet) - The "Big Button" Interface

### Screen 1: Shift Start (Dashboard)
**Prompt Description:**
"Create a tablet interface for the Bus Driver.
*   **Header:** Driver Name & Bus Number (e.g., 'Abebe - Bus 404').
*   **Main Content:** The screen should be dominated by **ONE** primary card:
    *   'Next Trip: Route 22'.
    *   'Departure: 08:30 AM'.
*   **Primary Action:** A massive, full-width Green button: **'START TRIP'**.
*   **Secondary Info:** A small sidebar showing 'Today's Schedule' list."

### Screen 2: Active Drive Mode
**Prompt Description:**
"Create the Driver's navigation screen.
*   **Layout:** Split screen (70% Map, 30% Controls).
*   **Map:** Shows the route path and upcoming stops.
*   **Controls (Right Side):**
    *   **Current Status:** 'Approaching: Stadium'.
    *   **Primary Action:** A massive Blue button: **'ARRIVED'**. (This button changes to 'DEPART' after clicking).
    *   **Emergency:** A clearly visible Red 'SOS' button in the top right corner."

---

## 5. Admin Panel (Web) - The "Command Center"

### Screen 1: The Overview
**Prompt Description:**
"Create a desktop dashboard for the System Administrator.
*   **Sidebar:** Dark vertical navigation (Dashboard, Fleet, Incidents, Users).
*   **Top Area:** 4 KPI Cards (Active Buses, On-Time %, Incidents, Total Passengers).
*   **Main Feature:** A central 'Live Map' widget showing moving bus dots (Green = Good, Red = Delayed).
*   **Incident Feed:** A right-sidebar list showing real-time alerts (e.g., 'Bus 104: Breakdown').
*   **Style:** Professional, dense data display, use white cards on a light gray background."
