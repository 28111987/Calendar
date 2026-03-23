-- Mavlers Ops: Sales Pipeline KPI View
-- Auto-calculates key metrics by geo and report_month

CREATE OR REPLACE VIEW sales_pipeline_kpis AS
SELECT
  report_month,
  geo,

  -- Lead counts
  COUNT(*) AS total_sqls,
  COUNT(*) FILTER (WHERE client_type = 'NBD') AS nbd_count,
  COUNT(*) FILTER (WHERE client_type = 'Existing Account') AS ebd_count,

  -- Status breakdown
  COUNT(*) FILTER (WHERE project_status = 'Converted') AS converted,
  COUNT(*) FILTER (WHERE project_status = 'Quote Sent') AS quotes_pending,
  COUNT(*) FILTER (WHERE project_status = 'Scope Clarification') AS scope_clarification,
  COUNT(*) FILTER (WHERE project_status = 'Silent Lead') AS silent_leads,
  COUNT(*) FILTER (WHERE project_status = 'Reclassified') AS reclassified,
  COUNT(*) FILTER (WHERE project_status = 'Lost - Controlled') AS lost_controlled,
  COUNT(*) FILTER (WHERE project_status = 'Lost - Uncontrolled') AS lost_uncontrolled,

  -- Conversion rate
  ROUND(
    COUNT(*) FILTER (WHERE project_status = 'Converted')::NUMERIC / NULLIF(COUNT(*), 0) * 100, 1
  ) AS conversion_rate,

  -- Revenue metrics
  COALESCE(SUM(project_cost_usd), 0) AS total_proposed_value,
  COALESCE(SUM(project_cost_usd) FILTER (WHERE project_status IN ('Converted', 'Quote Sent', 'Scope Clarification')), 0) AS pipeline_value,
  COALESCE(SUM(project_cost_usd) FILTER (WHERE project_status = 'Converted'), 0) AS won_value,

  -- Quote-to-Conversion rate
  ROUND(
    COUNT(*) FILTER (WHERE project_status = 'Converted')::NUMERIC /
    NULLIF(COUNT(*) FILTER (WHERE project_status IN ('Converted', 'Quote Sent')), 0) * 100, 1
  ) AS quote_to_conversion_rate

FROM sales_pipeline
GROUP BY report_month, geo
ORDER BY report_month DESC, geo;
