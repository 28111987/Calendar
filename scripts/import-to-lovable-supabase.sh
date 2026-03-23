#!/bin/bash
# Import sales_pipeline CSV data into Lovable's managed Supabase
# Lovable Supabase URL: https://psiysclozenrsisrrowy.supabase.co
#
# NOTE: You need the service role key from Lovable's Supabase.
# Find it in: Lovable project settings > Supabase > Service Role Key
# Or in Supabase dashboard: Settings > API > service_role key
#
# USAGE:
#   1. Replace YOUR_LOVABLE_SERVICE_ROLE_KEY below
#   2. Ensure data/sales_pipeline_export.csv exists (run export script first)
#   3. Run: bash scripts/import-to-lovable-supabase.sh

SUPABASE_URL="https://psiysclozenrsisrrowy.supabase.co"
API_KEY="YOUR_LOVABLE_SERVICE_ROLE_KEY"  # Replace with actual key
CSV_FILE="data/sales_pipeline_export.csv"
BATCH_SIZE=50

if [ ! -f "$CSV_FILE" ]; then
  echo "ERROR: ${CSV_FILE} not found. Run the export script first."
  exit 1
fi

echo "Importing data into Lovable's Supabase..."
echo "Source: ${CSV_FILE}"

# Convert CSV to JSON and import in batches using Python
python3 << 'PYTHON_SCRIPT'
import csv
import json
import urllib.request
import sys
import os

SUPABASE_URL = os.environ.get("SUPABASE_URL", "https://psiysclozenrsisrrowy.supabase.co")
API_KEY = os.environ.get("API_KEY", "YOUR_LOVABLE_SERVICE_ROLE_KEY")
CSV_FILE = "data/sales_pipeline_export.csv"
BATCH_SIZE = 50

# Read CSV
rows = []
with open(CSV_FILE, "r") as f:
    reader = csv.DictReader(f)
    for row in reader:
        # Clean up the row — remove 'id' so Supabase generates new UUIDs
        clean = {k: v for k, v in row.items() if k != "id" and v != ""}

        # Handle requirements_for array — CSV may have it as string like "{Email,Website}"
        if "requirements_for" in clean:
            val = clean["requirements_for"]
            if val.startswith("{") and val.endswith("}"):
                clean["requirements_for"] = val[1:-1].split(",")

        # Handle numeric fields
        if "project_cost_usd" in clean:
            try:
                clean["project_cost_usd"] = float(clean["project_cost_usd"])
            except ValueError:
                clean["project_cost_usd"] = 0

        if "quantity" in clean:
            try:
                clean["quantity"] = int(clean["quantity"])
            except ValueError:
                del clean["quantity"]

        rows.append(clean)

print(f"Read {len(rows)} rows from CSV")

# Import in batches
imported = 0
for i in range(0, len(rows), BATCH_SIZE):
    batch = rows[i:i + BATCH_SIZE]
    data = json.dumps(batch).encode("utf-8")

    req = urllib.request.Request(
        f"{SUPABASE_URL}/rest/v1/sales_pipeline",
        data=data,
        method="POST",
        headers={
            "apikey": API_KEY,
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json",
            "Prefer": "return=minimal"
        }
    )

    try:
        resp = urllib.request.urlopen(req)
        imported += len(batch)
        print(f"  Imported batch {i // BATCH_SIZE + 1}: {len(batch)} rows (total: {imported})")
    except urllib.error.HTTPError as e:
        print(f"  ERROR on batch {i // BATCH_SIZE + 1}: {e.code} {e.read().decode()}")
        sys.exit(1)

print(f"\nDone! Imported {imported} rows total.")
print("\nNext steps:")
print("  1. Verify data in Lovable app")
print("  2. Run sql/03-enable-rls.sql to re-enable Row Level Security")
print("  3. Delete standalone Supabase project")
PYTHON_SCRIPT
