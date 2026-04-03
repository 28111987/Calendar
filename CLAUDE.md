# Calendar Project

This repository manages calendar data and related tooling using the iCalendar (`.ics`) format.

## Project conventions

- Calendar files must conform to RFC 5545 (iCalendar specification)
- All `DTSTART`, `DTEND`, and `DTSTAMP` fields must use valid ISO 8601 datetime format
- Every `VEVENT` must include a unique `UID`
- `SUMMARY` fields must not be empty

## Key invariants

- Begin/End block pairs (`BEGIN:VCALENDAR`/`END:VCALENDAR`, `BEGIN:VEVENT`/`END:VEVENT`) must always be balanced and properly nested
- `DTEND` must always be after `DTSTART`
- Timezone handling must be explicit; avoid ambiguous local times
