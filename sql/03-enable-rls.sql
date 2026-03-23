-- Mavlers Ops: Re-enable Row Level Security
-- Run this AFTER data migration is confirmed working.
--
-- Policy: All authenticated users get full CRUD access.
-- Unauthenticated users get no access.

-- Enable RLS on sales_pipeline
ALTER TABLE sales_pipeline ENABLE ROW LEVEL SECURITY;

-- Allow all authenticated users to SELECT
CREATE POLICY "Authenticated users can read all rows"
  ON sales_pipeline FOR SELECT
  TO authenticated
  USING (true);

-- Allow all authenticated users to INSERT
CREATE POLICY "Authenticated users can insert rows"
  ON sales_pipeline FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow all authenticated users to UPDATE
CREATE POLICY "Authenticated users can update all rows"
  ON sales_pipeline FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow all authenticated users to DELETE
CREATE POLICY "Authenticated users can delete all rows"
  ON sales_pipeline FOR DELETE
  TO authenticated
  USING (true);

-- Same for clients lookup table
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read clients"
  ON clients FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage clients"
  ON clients FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
