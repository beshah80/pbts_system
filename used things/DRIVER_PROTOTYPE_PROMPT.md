# PBTS Driver Web — Desktop Home & Pages Specification

**Goal:** Desktop-first website with a white theme, simple visuals, and clear navigation. Focus on Login, Home, Trip, Schedule, and a separate Incident Report page. No chat feature.

**Matches Codebase:** Uses existing pages and components:
- Pages: [login](file:///d:/Education/pbts_system/apps/driver/app/auth/login/page.tsx), [dashboard](file:///d:/Education/pbts_system/apps/driver/app/dashboard/page.tsx), [trip](file:///d:/Education/pbts_system/apps/driver/app/trip/page.tsx), [incidents](file:///d:/Education/pbts_system/apps/driver/app/incidents/page.tsx), [schedule](file:///d:/Education/pbts_system/apps/driver/app/schedule/page.tsx), [profile](file:///d:/Education/pbts_system/apps/driver/app/profile/page.tsx)
- Components: [login-form](file:///d:/Education/pbts_system/apps/driver/components/auth/login-form.tsx), [trip-navigation](file:///d:/Education/pbts_system/apps/driver/components/trip/trip-navigation.tsx), [stop-tracker](file:///d:/Education/pbts_system/apps/driver/components/trip/stop-tracker.tsx), [passenger-counter](file:///d:/Education/pbts_system/apps/driver/components/trip/passenger-counter.tsx), [route-progress](file:///d:/Education/pbts_system/apps/driver/components/trip/route-progress.tsx), [driver-map](file:///d:/Education/pbts_system/apps/driver/components/map/driver-map.tsx), [route-overlay](file:///d:/Education/pbts_system/apps/driver/components/map/route-overlay.tsx), [incident-form](file:///d:/Education/pbts_system/apps/driver/components/incidents/incident-form.tsx), [delay-reporter](file:///d:/Education/pbts_system/apps/driver/components/incidents/delay-reporter.tsx), [emergency-button](file:///d:/Education/pbts_system/apps/driver/components/incidents/emergency-button.tsx), [dispatch-chat](file:///d:/Education/pbts_system/apps/driver/components/communication/dispatch-chat.tsx), [notifications](file:///d:/Education/pbts_system/apps/driver/components/communication/notifications.tsx)
- Documentation Alignment: Features required by the report (driver/supervisor dashboard, update current stop, incident reporting, schedule coordination) are included. See [project document](file:///d:/Education/pbts_system/used%20things/_MConverter.eu_8-Public_bus_tracking_and_scheduling_system%20(1).md).

---

## 1. Desktop Shell
- Nav Bar: Gray background with logo placeholder at left; links: Home, Trip, Schedule, Incident Report, Profile, Logout.
- Current Page Indicator: Active link uses stronger blue text and underline.
- Hero Section (Home): White background, centered heading “Welcome to Driver Page”, two quick buttons.
- Footer: Quick links (Home, Trip, Incident Report, Schedule) and contact info.
- Content Width: 1440px desktop grid; cards 360–560px; map panel wide.
- Keyboard Shortcuts: D=Home, T=Trip, S=Schedule, I=Incident Report, P=Profile; Enter confirms; Esc cancels.

---

## 2. Login (`/auth/login`)
- Split Layout: Left = login form; Right = full-height image (transport visual). Top of left column shows “Welcome”.
- Fields: Employee ID, Password, show/hide password.
- Feedback: Inline error, loading spinner, disabled submit while loading.
- Success: Redirect to Driver Home (`/dashboard`) with a success toast.
- Reference: [login-form.tsx](file:///d:/Education/pbts_system/apps/driver/components/auth/login-form.tsx)

---

## 3. Driver Home (`/dashboard`)
- Nav Bar: Gray background, active “Home” link highlighted.
- Hero: Large heading “Welcome to Driver Page” and two quick buttons:
  - “Go to Trip” (primary blue).
  - “Report Incident” (secondary red).
- Quick Guide: Three simple steps:
  1. Check your schedule.
  2. Start trip and update stops.
  3. Report incidents if needed.
- Info Strip: Driver ID (left), Duty Status (center), Date/Time (right) on a white card with gray border.
- Reduce Whitespace: Use max-width container (≤1200px), 3‑column guide card grid; add a “Helpful Links” row (Schedule, Trip, Incident) if extra vertical space remains.
- Footer: Quick links and support email.
- Reference: [dashboard page](file:///d:/Education/pbts_system/apps/driver/app/dashboard/page.tsx), [system-stats](file:///d:/Education/pbts_system/apps/driver/components/dashboard/system-stats.tsx), [schedule-card](file:///d:/Education/pbts_system/apps/driver/components/dashboard/schedule-card.tsx)

---

## 4. Trip (Desktop Drive Mode) (`/trip`)
- Two-Panel Layout:
  - Left (Map Panel ~65%): DriverMap with route path; RouteOverlay with traffic toggle.
  - Right (Controls Stack ~35%):
    - TripNavigation: Arrive/Depart button with confirmation (long‑press or slider).
    - StopTracker: Select current stop; ETA and completion markers.
    - PassengerCounter: +/- buttons; capacity bar.
    - RouteProgress: Distance, stops, speed, delays, on‑time %.
- Header Bar: Route name, Trip ID, “List/Map” toggle, Back button.
- States:
  - En Route: “Arriving at [Stop]” (Blue theme).
  - At Stop: “Depart [Stop]” (Green theme).
- Reference: [trip page](file:///d:/Education/pbts_system/apps/driver/app/trip/page.tsx), [driver-map](file:///d:/Education/pbts_system/apps/driver/components/map/driver-map.tsx), [trip-navigation](file:///d:/Education/pbts_system/apps/driver/components/trip/trip-navigation.tsx), [stop-tracker](file:///d:/Education/pbts_system/apps/driver/components/trip/stop-tracker.tsx), [passenger-counter](file:///d:/Education/pbts_system/apps/driver/components/trip/passenger-counter.tsx), [route-progress](file:///d:/Education/pbts_system/apps/driver/components/trip/route-progress.tsx)

---

## 5. Incident Report (Separate Page) (`/incidents`)
- Page Purpose: Single, clear workflow to submit incident or delay reports.
- Header: “Incident Report”, Back button, connection status.
- Primary Button: “Report New Incident”.
- Incident Form:
  - Type (Breakdown, Accident, Medical, Security, Traffic).
  - Severity (Low, Medium, High, Emergency).
  - Description, optional photo upload, current location (auto).
  - Submit → success toast “Report Sent”.
- Delays Section:
  - [delay-reporter](file:///d:/Education/pbts_system/apps/driver/components/incidents/delay-reporter.tsx) for ETA impact.
- Recent Reports: List with type, severity, time.
- Emergency Shortcut: Header “Emergency” button.
- Reference: [incidents page](file:///d:/Education/pbts_system/apps/driver/app/incidents/page.tsx), [incident-form](file:///d:/Education/pbts_system/apps/driver/components/incidents/incident-form.tsx), [emergency-button](file:///d:/Education/pbts_system/apps/driver/components/incidents/emergency-button.tsx)

---

## 6. Schedule (`/schedule`)
- Header: Date, connection status indicator; refresh control.
- Stats: Pending, In Progress, Completed counts.
- List: All trips; Start CTA; offline state message.
- Summary: Total trips, estimated duration, first/last trip.
- Reference: [schedule page](file:///d:/Education/pbts_system/apps/driver/app/schedule/page.tsx), [schedule-card](file:///d:/Education/pbts_system/apps/driver/components/dashboard/schedule-card.tsx)

---

## 7. Profile & Settings (`/profile`)
- Profile: Avatar, name, employee number, duty status.
- Status Control: Active / Break / Off Duty quick toggles.
- Information: License, phone, emergency contact, shift.
- Settings: Notifications and App Settings actions.
- Sign Out: Red button; redirect to Login.
- Reference: [profile page](file:///d:/Education/pbts_system/apps/driver/app/profile/page.tsx)

---

## 8. Theme & Accessibility (White)
- Colors: White background, soft gray nav bar, blue accents (#2563EB), red for incident actions.
- Typography: Inter/Roboto; headings 20–24px; body 16–18px; status 24–28px.
- Buttons: Desktop size 44–52px height, clear labels.
- Accessibility: Visible focus, keyboard shortcuts, readable contrast.

---

## 9. Generation Instructions (Figma/Balsamiq)
- Frames: 1440×1024 desktop frames for pages: Login, Home, Trip, Incident Report, Schedule, Profile.
- Include: Gray nav bar with active link styling, white hero with heading and two buttons, simple user guide cards, footer with quick links.
- Use labels from the code and documentation to avoid mismatch.

---

## 10. Visual Tokens (Desktop)
- Panels: White cards with soft gray borders; avoid dark theme.
- Icons: Lucide with solid visibility; blue and red accents for key actions.
