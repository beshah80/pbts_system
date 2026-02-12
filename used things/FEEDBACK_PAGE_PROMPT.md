# PBTS Feedback Page — Specialized Prototype Prompt

**Instruction:** Use this prompt to generate a high-fidelity design specifically for the **Feedback & Reporting Page** of the Passenger App.

## Design Goal
Create a clean, frictionless, and reassuring feedback interface. The user should feel that their voice matters and that reporting an issue is quick (under 30 seconds).

## Page Structure (Desktop & Mobile)

### 1. Header (Masthead Context)
*   **Nav Bar:** Standard top image navigation bar (as per global spec).
*   **Page Title:** "Rate Your Journey" or "Report an Issue" (Centered or Left-aligned below nav).

### 2. The Form Container (Centered Card)
*   **Visual Style:** A clean white card with soft shadow on a light gray background. Max-width 600px for readability on desktop.

### 3. Form Elements (In Order)

#### A. Overall Satisfaction (Star Rating)
*   **Label:** "How was your experience?"
*   **Component:** 5 large, outlined stars.
*   **Interaction:**
    *   Hover state: Fills with yellow/gold.
    *   Selected state: Solid gold.
    *   *Micro-interaction:* If 1-3 stars are clicked, immediately reveal the "What went wrong?" section below.

#### B. Issue Categories (The "Chips" Grid)
*   **Label:** "What went wrong?" (Visible only if rating < 5 stars).
*   **Component:** A grid of clickable "Chips" or "Pills" (Rounded buttons).
*   **State:**
    *   **Default:** Gray outline, white background, gray text.
    *   **Selected:** Red/Orange outline, light red background, bold text.
*   **Options:**
    *   [Late Arrival]
    *   [Driver Behavior]
    *   [Cleanliness]
    *   [Overcrowded]
    *   [Safety Concern]
    *   [App Issue]

#### C. Route Context (Smart Defaults)
*   **Label:** "Which route?"
*   **Component:** Dropdown or Combobox.
*   **Smart Behavior:** If the user just finished a trip, this is **Pre-filled** with "Route 5A (Bole - Piazza)" and locked or clearly marked. If generic feedback, allow search.

#### D. Additional Details (Text Area)
*   **Label:** "Tell us more (Optional)"
*   **Component:** Large text area (3-4 lines height).
*   **Placeholder:** "Please describe what happened..."

#### E. Privacy Control
*   **Component:** Checkbox.
*   **Label:** "Submit anonymously"
*   **Default:** Checked (True).

### 4. Primary Action
*   **Button:** Full-width (Mobile) or Wide (Desktop) button.
*   **Label:** "Submit Feedback"
*   **Color:** Primary Indigo (#1E40AF).

## Success State (Post-Submission)
*   **Visual:** Replace the form card with a Success Card.
*   **Icon:** Large Green Checkmark.
*   **Text:** "Thank you! Your feedback helps us improve."
*   **Reference ID:** "Ref: #FB-2024-889" (Small text).
*   **Actions:**
    *   [Return Home] (Primary)
    *   [View My Feedback] (Secondary/Link)

## HCI & Accessibility Notes
*   **Focus Management:** When the page loads, focus should be on the Star Rating.
*   **Touch Targets:** Chips must be at least 44px tall for mobile tapping.
*   **Keyboard Nav:** Users must be able to Tab through stars and Select chips with Space/Enter.
