# Code Review Guidelines

## Always check

- iCalendar files follow RFC 5545: balanced BEGIN/END blocks, required properties present
- `DTEND` is strictly after `DTSTART` (no zero-duration or negative-duration events unless intentional)
- `UID` values are unique across all events in a calendar file
- Datetime strings are well-formed (e.g., `YYYYMMDDTHHMMSSZ`)
- Any script or tool that parses or generates `.ics` files handles malformed input gracefully
- New API endpoints or data-processing functions validate untrusted input before use
- Secrets, credentials, or personally identifiable information are not committed to the repository

## Security

- Flag any code that constructs calendar data from unsanitized user input (injection risk)
- Flag hardcoded credentials or API keys
- Flag improper handling of external `.ics` file imports (path traversal, XXE, etc.)

## Skip

- Formatting-only whitespace changes that don't affect iCalendar parsing
- Changes to comment lines inside `.ics` files (lines starting with `;`)
