# AttendX — Web Attendance System

A polished browser-first MVP based on the supplied attendance architecture.

## Run

No build step is required.

1. Extract the ZIP.
2. Open `index.html` in Chrome/Edge.

For a local server (recommended):

```bash
python -m http.server 5500
```

Then open `http://localhost:5500`.

## Included UI

- Student dashboard
- Student attendance analytics
- Lecture schedule
- Attendance marking modal
- Teacher live lecture dashboard
- Rotating-code presentation UI
- Live roster + confidence states
- Teacher alerts
- OD claim upload UI
- HOD command center
- OD approvals
- Append-only audit log view
- Attendance/defaulter report cards
- Responsive desktop/tablet/mobile layout

## Backend integration

This frontend is intentionally separated from the attendance/security backend. Connect the UI to the Rust gateway APIs for:

- lecture lifecycle
- TOTP/code verification
- device binding
- geofence validation
- Wi-Fi confidence grading
- attendance writes
- teacher overrides
- OD validation
- exports
- audit events

Never expose the lecture secret to the browser.

## Design

Dark navy navigation + indigo product accent, dense but readable data tables, status badges, responsive cards, and role-specific workflows.
