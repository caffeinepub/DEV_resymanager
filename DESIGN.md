# Design Brief

**App**: Restaurant Reservation Manager  
**Category**: Productivity / Operations  
**Aesthetic**: Professional, utilitarian, minimal restaurant tech  
**Theme**: Dark mode (deep charcoal background, cream text, warm rust accents)

## Tone & Purpose

Staff use this app during service to manage reservations in real-time. Interface prioritizes clarity, speed, and readability under variable lighting. No decoration; every element serves function.

## Palette

| Token           | OKLCH           | Purpose                          |
| --------------- | --------------- | -------------------------------- |
| Background      | 0.12 0 0        | Primary surface, near-black      |
| Foreground      | 0.96 0 0        | Text, high contrast on dark      |
| Card            | 0.16 0 0        | Elevated surfaces, reservation   |
| Primary         | 0.52 0.22 29    | Rust/burnt orange CTA buttons    |
| Secondary       | 0.50 0.06 160   | Muted sage for secondary actions |
| Muted           | 0.25 0 0        | Subtle backgrounds, disabled     |
| Destructive     | 0.59 0.18 13    | Delete, deactivate actions       |
| Border          | 0.22 0 0        | Dividers, input outlines         |

## Typography

| Role    | Font                    | Usage                               |
| ------- | ----------------------- | ----------------------------------- |
| Display | DM Sans (400, 700)      | Headers, large labels, nav          |
| Body    | DM Sans (400, 700)      | Form fields, list items, copy       |
| Mono    | Geist Mono              | Times, phone numbers, IDs, details  |

## Shape Language

- **Radii**: 4px for buttons/inputs, 0px for data tables. Minimal visual softness.
- **Density**: Compact in lists (tight vertical spacing). Breathe in forms (comfortable padding).
- **Borders**: Primary visual hierarchy tool. Used over color alone.
- **Shadows**: Minimal (`shadow-sm` only). Elevation through layering, not depth effects.

## Structural Zones

| Zone            | Background    | Border              | Purpose                                  |
| --------------- | ------------- | ------------------- | ---------------------------------------- |
| Header/Nav      | `bg-card`     | `border-b`          | Date navigation, "Today" label, arrows   |
| Content (Main)  | `bg-background` | None              | Reservation list display                 |
| Summary Stats   | `bg-muted/10` | `border-b`          | Count, guest total (secondary zone)      |
| List Items      | `bg-card`     | `border-b`          | Reservation rows, time-sorted            |
| Admin Sidebar   | `bg-card`     | `border-l`          | User mgmt, open hours, elevated panel    |
| Form Sections   | `bg-input`    | `border`            | Input fields, form containers            |
| Actions         | `bg-primary`  | None                | Primary CTA, accent color (rust)         |

## Component Patterns

- **Reservation List Item**: Card row with name, time (mono font), guest count, status badge. Tap to edit; left-swipe or delete button for removal.
- **Date Header**: Large date label, "Today" badge if applicable, left/right navigation arrows (ghost buttons).
- **Summary Row**: Two metrics (reservation count, total guests), subtle secondary zone styling.
- **Admin Form**: Stacked inputs with labels, day-of-week selector (chips or select), time pickers. Submit button in primary rust color.
- **User List**: Table with name, email, status badge (pending/accepted/deactivated), actions (copy invite link, deactivate).

## Motion

- **Transitions**: All interactive elements use `.transition-smooth` (0.3s cubic-bezier).
- **Interactions**: Subtle hover states (opacity shifts, background tint). No animation for decorative effect.
- **Loading**: Skeleton loaders for reservation list on initial load (minimal pulse).

## Constraints

- No gradients, no blur, no glow effects. Pure solid colors and borders.
- All buttons use semantic tokens (primary/secondary/ghost), never raw colors.
- Fonts locked to DM Sans + Geist Mono. No system fallbacks.
- Radius fixed at 4px; no variation except full-circle for avatars.
- Max content width: 1200px on desktop; full-width on mobile with side padding (2rem).

## Signature Detail

**Time-aware header badge**: The "Today" label and date display in the header is the visual centerpiece. It signals the time-aware reservation logic to the user — they immediately know whether they're viewing today or a different day. Render date prominently (large, bold) with optional secondary label (weekday, "Today" if applicable). This is NOT a generic date picker; it's the interface's statement about temporal awareness.
