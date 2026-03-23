-- Mavlers Ops: Sales Pipeline Table Schema
-- Reference schema — the actual table is managed by Lovable's Supabase.
-- Use this as documentation and for recreating if needed.

CREATE TABLE IF NOT EXISTS sales_pipeline (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  managed_by TEXT NOT NULL,
  geo TEXT GENERATED ALWAYS AS (
    CASE
      WHEN managed_by ILIKE '%US%' THEN 'US'
      WHEN managed_by ILIKE '%EU%' THEN 'EU'
      WHEN managed_by ILIKE '%AU%' THEN 'AU'
      ELSE 'Unknown'
    END
  ) STORED,
  received_on DATE NOT NULL,
  confirmed_on DATE,
  client_type TEXT NOT NULL CHECK (client_type IN ('NBD', 'Existing Account')),
  client_name TEXT NOT NULL,
  client_domain TEXT,
  requirements_for TEXT[] NOT NULL DEFAULT '{}',
  service_category TEXT NOT NULL CHECK (service_category IN ('Web', 'Email', 'Other Creative')),
  conversation_subject TEXT,
  project_id TEXT,
  project_status TEXT NOT NULL CHECK (project_status IN (
    'Converted', 'Quote Sent', 'Scope Clarification',
    'Silent Lead', 'Reclassified', 'Lost - Controlled', 'Lost - Uncontrolled'
  )),
  project_cost_usd NUMERIC DEFAULT 0,
  quantity INTEGER,
  comments TEXT,
  invoice_number TEXT,
  report_month TEXT NOT NULL, -- Format: "YYYY-MM"
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER sales_pipeline_updated_at
  BEFORE UPDATE ON sales_pipeline
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Clients lookup table for autocomplete
CREATE TABLE IF NOT EXISTS clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
