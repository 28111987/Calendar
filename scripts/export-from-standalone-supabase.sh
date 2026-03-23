#!/bin/bash
# Export sales_pipeline data from standalone Supabase as CSV
# Standalone Supabase URL: https://apyhrsrergrmmpualbpx.supabase.co
#
# USAGE:
#   1. Replace YOUR_SERVICE_ROLE_KEY with your standalone Supabase service role key
#   2. Run: bash scripts/export-from-standalone-supabase.sh
#   3. Output: data/sales_pipeline_export.csv

SUPABASE_URL="https://apyhrsrergrmmpualbpx.supabase.co"
API_KEY="YOUR_SERVICE_ROLE_KEY"  # Replace with actual service role key

mkdir -p data

echo "Exporting sales_pipeline from standalone Supabase..."

curl -s "${SUPABASE_URL}/rest/v1/sales_pipeline?select=*&order=report_month,received_on" \
  -H "apikey: ${API_KEY}" \
  -H "Authorization: Bearer ${API_KEY}" \
  -H "Accept: text/csv" \
  -o data/sales_pipeline_export.csv

ROW_COUNT=$(tail -n +2 data/sales_pipeline_export.csv | wc -l)
echo "Exported ${ROW_COUNT} rows to data/sales_pipeline_export.csv"
echo ""
echo "Next steps:"
echo "  1. Open Lovable's Supabase SQL Editor"
echo "  2. Use the Table Editor > Import CSV feature"
echo "  3. Or use the import script: bash scripts/import-to-lovable-supabase.sh"
