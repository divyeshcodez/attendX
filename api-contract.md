# AttendX API Contract — Frontend Integration

Suggested Rust gateway endpoints:

GET  /lectures/today
GET  /lectures/:id
POST /lectures/:id/open
POST /lectures/:id/close

POST /lectures/:id/mark
POST /lectures/:id/reset-device

GET  /lectures/:id/roster
POST /lectures/:id/override

POST /claims
GET  /claims
POST /claims/:id/approve
POST /claims/:id/reject

GET /students/:id/attendance
GET /reports/attendance.xlsx
GET /reports/defaulters.xlsx

GET /audit

The browser should send the student's location, code, device identifier/binding proof and available Wi-Fi metadata to the gateway. Server-side validation remains authoritative.
