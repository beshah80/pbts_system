# PBTS Route Management Specification (`apps/admin/app/routes/page.tsx`)

**Status:** High-Fidelity Requirement
**Goal:** Create a visual, map-centric interface for managing bus routes and stops. Avoid text-heavy forms; prioritize "Draw & Drop" interaction.

---

## 1. Route List View (Main Page)
**URL:** `/routes`

### **Layout**
*   **Split View:**
    *   **Left (60%):** Data Table of Routes.
    *   **Right (40%):** Static Preview Map (Shows the selected route's path).

### **A. Toolbar**
*   **Search:** "Search Route Name or ID..."
*   **Filter:** `Region` [Bole, Piazza, Megenagna].
*   **Primary Action:** `Button` **"Create New Route"** (Opens Full Screen Editor).

### **B. Data Table Columns**
1.  **Route ID:** Badge (e.g., **R-22**).
2.  **Path:** Text (e.g., "Bole Atlas <-> Piassa").
3.  **Stops:** Number (e.g., "14 Stops").
4.  **Distance:** Text (e.g., "12.5 km").
5.  **Est. Time:** Text (e.g., "45 mins").
6.  **Status:** Toggle Switch (Active/Inactive).
7.  **Actions:** Edit (Pencil), Delete (Trash).

### **C. Interaction**
*   **Hover:** Hovering a row highlights the path on the Right-Side Preview Map.
*   **Click:** Opens the "Route Details" or "Edit Mode".

---

## 2. Route Editor (Create/Edit Mode)
**Context:** This should be a **Full Screen Drawer** or a separate page (`/routes/new` or `/routes/[id]`).

### **Layout: The "Mission Control" View**
*   **Left Panel (30% - Controls):**
    *   **Route Info:** Input fields for Route Name, Route Number, Fare Price (ETB).
    *   **Stop Sequence (Vertical List):**
        *   List of stops (1. Bole, 2. Atlas, 3. Urael...).
        *   **Drag & Drop Handles:** Allow reordering stops easily.
        *   **"Add Stop" Button:** Adds a new slot to the list.
    *   **Save Actions:** "Save Route" (Primary), "Cancel" (Secondary).

*   **Right Panel (70% - Interactive Map):**
    *   **Map Tool:** Full-screen Leaflet/Google Map.
    *   **Drawing Tools:**
        *   **"Draw Path":** Click points on the map to draw the polyline (Blue line).
        *   **"Drop Pin":** Click to add a Bus Stop.
    *   **Visual Feedback:**
        *   **Start Point:** Green Flag Icon.
        *   **End Point:** Red Flag Icon.
        *   **Stops:** Small Blue Circle Icons.
        *   **Direction Arrows:** Small arrows on the line showing flow.

### **HCI Principles Applied**
*   **Direct Manipulation:** Don't ask users to type coordinates. Let them click the map.
*   **Error Prevention:** If a user tries to save a route with 0 stops, show an inline error: "A route must have at least 2 stops (Start & End)."
*   **Visibility of System Status:** As the user draws, update the "Total Distance" and "Est. Time" automatically in the Left Panel.

---

## 3. Stop Management (Modal)
**Context:** When clicking a specific Stop Pin on the map.

*   **Stop Name:** Input (e.g., "Meskel Square North").
*   **Landmark:** Input (e.g., "Near Train Station").
*   **Is Shelter Available?** Checkbox.
*   **Coordinates:** Auto-filled from map pin (Read-only).
