# Mavlers Ops — Project Context

## Overview
Internal CRUD operations platform for Mavlers (creative/digital marketing agency).
Replaces Google Sheets-based tracking. 4 users: Shrujal (admin) + 3 SMEs (Nitisha-US, Tejal-EU, Zalak-AU).

## Tech Stack
- **Frontend**: Lovable (React + TypeScript + Tailwind CSS + shadcn/ui)
- **Backend**: Lovable's managed Supabase (`psiysclozenrsisrrowy.supabase.co`)
- **Auth**: Supabase Auth (Google sign-in + email/password)
- **Real-time**: Supabase real-time subscriptions
- **Access model**: All authenticated users = full CRUD, no role-based restrictions

## Key Constraint
Lovable manages the Supabase connection. Cannot change URL/keys directly.
The standalone Supabase (`apyhrsrergrmmpualbpx.supabase.co`) is temporary for migration only.

## Database Schema

### Table: `sales_pipeline`
| Column | Type | Notes |
|--------|------|-------|
| id | UUID | Auto-generated PK |
| managed_by | Text | "Nitisha - US", "Tejal - EU", "Zalak - AU" |
| geo | Text | Derived from managed_by |
| received_on | Date | Required |
| confirmed_on | Date | Optional |
| client_type | Text | "NBD" or "Existing Account" |
| client_name | Text | Required, with autocomplete |
| client_domain | Text | Optional |
| requirements_for | Text[] | Multi-select array |
| service_category | Text | "Web", "Email", "Other Creative" |
| conversation_subject | Text | Optional |
| project_id | Text | Optional |
| project_status | Text | See status values below |
| project_cost_usd | Numeric | Dollar amount |
| quantity | Integer | Optional |
| comments | Text | Optional |
| invoice_number | Text | Optional |
| report_month | Text | Format "YYYY-MM" (e.g., "2026-03") |
| created_at | Timestamp | Auto |
| updated_at | Timestamp | Auto |
| created_by | UUID | Auto |

### Status Values & Colors
- Converted → Green
- Quote Sent → Yellow
- Scope Clarification → Blue
- Silent Lead → Gray
- Reclassified → Gray
- Lost - Controlled → Red
- Lost - Uncontrolled → Red

### View: `sales_pipeline_kpis`
Auto-calculates conversion rates, totals, pipeline/won values by geo and report_month.

### Lookup Table: `clients`
Auto-populated from pipeline entries for client name autocomplete.

## Design Specs
- Sidebar: Dark navy `#1a1f2e`
- Content area: Light gray `#f8fafc`
- Accent: Teal/blue `#0ea5e9`
- Font: Inter
- Cards: White, subtle shadow, rounded corners
- Style: Linear/Notion/Vercel aesthetic

## Google Sheet Source
- Sheet ID: `1DGQwZ96unFEY7f4fxv89BT49a7Jd7k4EDJjQo_muB8U`
- Tabs: JAN, FEB, MAR
- Headers at row 47 (JAN) / 46 (FEB, MAR)
- Data starts at row 50 (JAN) / 49 (FEB, MAR)
- Total rows: 112 (JAN:72, FEB:37, MAR:33)

## Future Tabs (Phase 2+)
1. Revenue — Monthly revenue by client, service line, geo
2. Resource Deployment — Designer/developer assignments, utilization
3. Growth Metrics — Business development KPIs, client acquisition
4. Creative Operations — Project pipeline, delivery status, backlog
