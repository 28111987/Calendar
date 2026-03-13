// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║  P2P GROWTH METRICS DASHBOARD — Premium Analytics Engine v4.4             ║
// ║  Modern Dark-Mode UI  ·  Real-Time  ·  Auto-Refresh                       ║
// ╚══════════════════════════════════════════════════════════════════════════════╝
//
// v4.4 CHANGE LOG (over v4.3):
//   • REQUIREMENTS TABLE: Title accent + sparkline bars now both use teal
//     (#39d2c0) for consistent colour coding
//   • CLIENTS TABLE: Title accent + sparkline bars now both use violet
//     (#bc8cff) for consistent colour coding
//   • CLIENT NAMES: Geo suffixes (e.g. "- US") stripped from names; geo
//     shown separately as CTA-style token badge (larger font, padded)
//   • All prior v4.3 fixes preserved
//
// v4.3 CHANGE LOG (over v4.2):
//   • PIPELINE HEALTH: Trimmed to cols B–F (removed empty col G)
//   • SERVICE FREQUENCY & MONTHLY REVENUE: Trimmed to 10 cols (removed
//     trailing blank col L)
//   • SPARKLINE HEADERS: "Demand", "Momentum", "Visual" titles now merged
//     across their 2-column sparkline span for visual consistency
//   • TITLE COLOURS: Subtitle & KPI heading changed to #FFDD2F
//   • All prior v4.2 fixes preserved
//
// v4.2 CHANGE LOG (over v4.1):
//   • SPARKLINES: All horizontal bar charts now span 2 columns (merged) for
//     wider, more readable visuals
//   • CLIENTS TABLE: "Key Requirements" column now spans 2 merged columns
//   • CLIENTS TABLE: Added "Geo" column (second-to-last) with colour-coded
//     region tokens (US/EU/AU/UK/IN/etc.) pulled from column B of month tabs
//   • BOLD: All text/numbers across every table row are now bold by default
//   • TOTALS COLOUR: Changed from orange (#f0b429) to yellow (#FFDD2F)
//   • LAYOUT: Column widths increased ~7% across the board to fill the
//     remaining ~1 inch of empty space at 100% zoom
//   • TABLES: Each table spans only as many columns as it has data — no
//     extra blank columns stretching to M
//   • All prior v4.1 fixes (string formatting, plain text, etc.) preserved
// ═══════════════════════════════════════════════════════════════════════════════

// ─── CONFIGURATION ───────────────────────────────────────────────────────────
var MONTH_TABS = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
var DATA_START_ROW    = 49;
var DATA_END_ROW      = 150;
var COL_GEO           = 2;   // Column B — Geo (US, EU, AU, etc.)
var COL_CLIENT_TYPE   = 5;
var COL_CLIENT_DOMAIN = 7;
var COL_REQUIREMENT   = 9;
var COL_SERVICE       = 11;
var COL_STATUS        = 17;
var COL_COST          = 19;
var GROWTH_TAB        = "Growth Metrics";

// ─── PREMIUM COLOUR SYSTEM ──────────────────────────────────────────────────
var P = {
  // Base Tones (Dark Mode)
  bg0       : "#0d1117",
  bg1       : "#161b22",
  bg2       : "#1c2333",
  bg3       : "#21293a",
  // Text
  tx0       : "#ffffff",
  tx1       : "#e6edf3",
  tx2       : "#8b949e",
  tx3       : "#6e7681",
  // Accents
  gold      : "#f0b429",
  azure     : "#58a6ff",
  emerald   : "#3fb950",
  coral     : "#f85149",
  violet    : "#bc8cff",
  amber     : "#d29922",
  teal      : "#39d2c0",
  rose      : "#ff7eb3",
  // Totals row colour — CHANGED from gold to yellow
  totalsYellow : "#FFDD2F",
  // KPI Card Top-Edge
  kpiBlue   : "#1f6feb",
  kpiGreen  : "#238636",
  kpiPurple : "#8957e5",
  kpiOrange : "#da6d25",
  kpiTeal   : "#1b7c83",
  kpiRose   : "#bf3989",
  // Table
  rowEven   : "#161b22",
  rowOdd    : "#1c2333",
  headerRow : "#0d1117",
  borderDk  : "#30363d",
  totalsBg  : "#1a2332"
};

// ─── GEO COLOUR MAP ─────────────────────────────────────────────────────────
var GEO_COLOURS = {
  "US"  : {bg: "#1f3a5f", fg: "#58a6ff"},   // blue token
  "EU"  : {bg: "#2d1f5e", fg: "#bc8cff"},   // violet token
  "AU"  : {bg: "#1a3d2e", fg: "#3fb950"},   // green token
  "UK"  : {bg: "#3d2b1a", fg: "#f0b429"},   // gold token
  "IN"  : {bg: "#3d1a2b", fg: "#ff7eb3"},   // rose token
  "CA"  : {bg: "#1a3d3d", fg: "#39d2c0"},   // teal token
  "SG"  : {bg: "#3d3a1a", fg: "#d29922"},   // amber token
  "AE"  : {bg: "#3d1a1a", fg: "#f85149"},   // coral token
  "—"   : {bg: "#21293a", fg: "#6e7681"}    // default/unknown
};

// ─── LAYOUT SYSTEM ───────────────────────────────────────────────────────────
// Widths bumped ~7% to fill the ~1 inch gap at 100% zoom
var L = {
  totalCols: 14,
  colW: [
    36,    // A  – left gutter
    94,    // B  – Rank / Month / Type
    210,   // C  – primary name
    152,   // D  – metric 1
    152,   // E  – metric 2
    140,   // F  – metric 3
    94,    // G  – centre column
    94,    // H  – Rank / Month / Type
    210,   // I  – primary name
    158,   // J  – metric 1
    150,   // K  – metric 2
    140,   // L  – metric 3
    176,   // M  – metric 4 / visual
    36     // N  – right gutter
  ],
  // Row heights
  hTitle     : 70,
  hSubtitle  : 30,
  hTimestamp : 26,
  hDivider   : 5,
  hSpacer    : 18,
  hSection   : 42,
  hTableHead : 38,
  hTableRow  : 32,
  hTotalsRow : 34,
  hKpiLabel  : 42,
  hKpiValue  : 54,
  hKpiAccent : 5,
  hFooter    : 28,
  // Font sizes
  fTitle     : 24,
  fSubtitle  : 11,
  fTimestamp : 9,
  fSection   : 12,
  fTableHead : 9,
  fTableBody : 10,
  fKpiLabel  : 9,
  fKpiValue  : 17,
  fTotals    : 10,
  fFooter    : 8
};
var BORDER = SpreadsheetApp.BorderStyle.SOLID;
var CLIP   = SpreadsheetApp.WrapStrategy.CLIP;
var WRAP   = SpreadsheetApp.WrapStrategy.WRAP;
var FONT   = "Google Sans";

// ═══════════════════════════════════════════════════════════════════════════════
// DATA LAYER
// ═══════════════════════════════════════════════════════════════════════════════
function collectAllData() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var allRows = [];
  for (var m = 0; m < MONTH_TABS.length; m++) {
    var sheet = ss.getSheetByName(MONTH_TABS[m]);
    if (!sheet) continue;
    var lr = Math.min(sheet.getLastRow(), DATA_END_ROW);
    if (lr < DATA_START_ROW) continue;
    var nr = lr - DATA_START_ROW + 1;
    var vals = sheet.getRange(DATA_START_ROW, 1, nr, COL_COST).getValues();
    for (var r = 0; r < vals.length; r++) {
      var v = vals[r];
      var dom = clean(v[COL_CLIENT_DOMAIN - 1]);
      var req = clean(v[COL_REQUIREMENT - 1]);
      var svc = clean(v[COL_SERVICE - 1]);
      var sts = clean(v[COL_STATUS - 1]);
      var cst = parseFloat(v[COL_COST - 1]) || 0;
      var ctp = clean(v[COL_CLIENT_TYPE - 1]);
      var geo = clean(v[COL_GEO - 1]);
      if (!svc && !req && !dom) continue;
      if (isDrop(svc)) svc = "";
      if (isDrop(req)) req = "";
      if (!svc && !req) continue;
      var sl = sts.toLowerCase();
      allRows.push({
        month: MONTH_TABS[m], domain: dom, requirement: req, service: svc,
        status: sts, cost: cst, clientType: ctp, geo: geo,
        isConverted: sl.indexOf("converted") !== -1,
        isLost: sl.indexOf("lost") !== -1 || sl.indexOf("closed") !== -1,
        isOpen: sl.indexOf("open") !== -1 || sl.indexOf("progress") !== -1 || sl.indexOf("pending") !== -1
      });
    }
  }
  return allRows;
}

// ─── Value Formatters ────────────────────────────────────────────────────────
function clean(v)  { return String(v || "").trim(); }
function isDrop(v) { return v.toLowerCase().indexOf("select") !== -1; }
function num(n)    { return String(Math.round(n)); }
function cur(n)    { return "$" + Math.round(n).toLocaleString("en-US"); }
function pct(n)    { return n.toFixed(1) + "%"; }
function dec(n)    { return n.toFixed(1); }
function dv(a, b)  { return b > 0 ? a / b : 0; }

// ═══════════════════════════════════════════════════════════════════════════════
// ANALYTICS ENGINE
// ═══════════════════════════════════════════════════════════════════════════════
function analyse(data) {
  // Service frequency
  var sM = {};
  for (var i = 0; i < data.length; i++) {
    var d = data[i]; if (!d.service) continue;
    if (!sM[d.service]) sM[d.service] = {c:0, r:0, v:0};
    sM[d.service].c++;
    if (d.isConverted) { sM[d.service].v++; sM[d.service].r += d.cost; }
  }
  var sA = [];
  for (var k in sM) sA.push({n:k, c:sM[k].c, r:sM[k].r, v:sM[k].v, cr:dv(sM[k].v, sM[k].c)*100});
  sA.sort(function(a,b){ return b.c - a.c; });

  // Requirements (top 10)
  var rM = {};
  for (var i = 0; i < data.length; i++) {
    var d = data[i]; if (!d.requirement) continue;
    if (!rM[d.requirement]) rM[d.requirement] = {c:0, r:0, v:0, s:d.service};
    rM[d.requirement].c++;
    if (d.isConverted) { rM[d.requirement].v++; rM[d.requirement].r += d.cost; }
  }
  var rA = [];
  for (var k in rM) rA.push({n:k, c:rM[k].c, r:rM[k].r, v:rM[k].v, s:rM[k].s, cr:dv(rM[k].v, rM[k].c)*100});
  rA.sort(function(a,b){ return b.c - a.c; });
  rA = rA.slice(0, 10);

  // Clients (top 10 by revenue) — now includes geo
  var cM = {};
  for (var i = 0; i < data.length; i++) {
    var d = data[i]; if (!d.domain) continue;
    if (!cM[d.domain]) cM[d.domain] = {p:0, r:0, v:0, rq:{}, geo:{}};
    cM[d.domain].p++;
    if (d.isConverted) { cM[d.domain].v++; cM[d.domain].r += d.cost; }
    if (d.requirement) cM[d.domain].rq[d.requirement] = true;
    if (d.geo) cM[d.domain].geo[d.geo] = (cM[d.domain].geo[d.geo] || 0) + 1;
  }
  var cA = [];
  for (var k in cM) {
    // Determine primary geo (most frequent)
    var geoKeys = Object.keys(cM[k].geo);
    var primaryGeo = "—";
    var maxGeoCount = 0;
    for (var g = 0; g < geoKeys.length; g++) {
      if (cM[k].geo[geoKeys[g]] > maxGeoCount) {
        maxGeoCount = cM[k].geo[geoKeys[g]];
        primaryGeo = geoKeys[g];
      }
    }
    cA.push({
      n:k, p:cM[k].p, r:cM[k].r, v:cM[k].v,
      cr:dv(cM[k].v, cM[k].p)*100,
      rq:Object.keys(cM[k].rq).join(", "),
      geo: primaryGeo.toUpperCase()
    });
  }
  cA.sort(function(a,b){ return b.r - a.r; });
  cA = cA.slice(0, 10);

  // Monthly
  var mM = {};
  for (var i = 0; i < data.length; i++) {
    var d = data[i];
    if (!mM[d.month]) mM[d.month] = {q:0, v:0, r:0};
    mM[d.month].q++;
    if (d.isConverted) { mM[d.month].v++; mM[d.month].r += d.cost; }
  }
  var mA = [];
  for (var m = 0; m < MONTH_TABS.length; m++) {
    var mn = MONTH_TABS[m];
    if (mM[mn]) mA.push({m:mn, q:mM[mn].q, v:mM[mn].v, r:mM[mn].r, cr:dv(mM[mn].v, mM[mn].q)*100, avg:dv(mM[mn].r, mM[mn].v)});
  }

  // Service x Month
  var sbm = {}, sSet = {};
  for (var i = 0; i < data.length; i++) {
    var d = data[i]; if (!d.service) continue;
    var key = d.month + "|" + d.service;
    if (!sbm[key]) sbm[key] = {c:0, r:0};
    sbm[key].c++;
    if (d.isConverted) sbm[key].r += d.cost;
    sSet[d.service] = true;
  }

  // NBD vs Existing
  var nbe = {"NBD":{c:0, r:0, v:0}, "Existing":{c:0, r:0, v:0}};
  for (var i = 0; i < data.length; i++) {
    var d = data[i]; if (!d.clientType) continue;
    var bk = d.clientType.toLowerCase().indexOf("nbd") !== -1 ? "NBD" : "Existing";
    nbe[bk].c++;
    if (d.isConverted) { nbe[bk].v++; nbe[bk].r += d.cost; }
  }

  // Pipeline
  var pipe = {conv:0, lost:0, open:0, other:0};
  for (var i = 0; i < data.length; i++) {
    if (data[i].isConverted) pipe.conv++;
    else if (data[i].isLost)  pipe.lost++;
    else if (data[i].isOpen)  pipe.open++;
    else                      pipe.other++;
  }

  // KPIs
  var tQ = data.length, tV = 0, tR = 0;
  for (var i = 0; i < data.length; i++) {
    if (data[i].isConverted) { tV++; tR += data[i].cost; }
  }
  var aM = mA.length;
  var top3 = 0;
  for (var i = 0; i < Math.min(3, cA.length); i++) top3 += cA[i].r;

  return {
    sA:sA, rA:rA, cA:cA, mA:mA, sbm:sbm, sN:Object.keys(sSet).sort(), nbe:nbe, pipe:pipe,
    tQ:tQ, tV:tV, tR:tR, aM:aM,
    cr:  dv(tV, tQ) * 100,
    ad:  dv(tR, tV),
    mr:  dv(tR, aM),
    ar:  aM > 0 ? (tR / aM) * 12 : 0,
    conc: dv(top3, tR) * 100,
    vel: dv(tV, aM),
    sqlV: dv(tQ, aM)
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
// RENDERING PRIMITIVES
// ═══════════════════════════════════════════════════════════════════════════════
function initSheet(sh) {
  for (var c = 0; c < L.colW.length; c++) sh.setColumnWidth(c + 1, L.colW[c]);
  sh.getRange(1, 1, 250, L.totalCols).setNumberFormat("@");
}

/** Full-width merged row */
function darkRow(sh, row, text, fg, size, weight, height, style) {
  var r = sh.getRange(row, 1, 1, L.totalCols).merge();
  r.setValue(text).setBackground(P.bg0).setFontColor(fg).setFontSize(size)
   .setFontWeight(weight || "normal")
   .setHorizontalAlignment("center").setVerticalAlignment("middle");
  if (style) r.setFontStyle(style);
  sh.setRowHeight(row, height || 30);
  return r;
}

/** Thin accent divider */
function accentDiv(sh, row, colour) {
  sh.getRange(row, 1, 1, L.totalCols).merge().setBackground(colour || P.gold);
  sh.setRowHeight(row, L.hDivider);
}

/** Dark spacer */
function spacer(sh, row) {
  sh.getRange(row, 1, 1, L.totalCols).merge().setBackground(P.bg0);
  sh.setRowHeight(row, L.hSpacer);
}

/** Section title — full span with left accent bar */
function secTitle(sh, row, cS, cN, text, accent) {
  accent = accent || P.gold;
  sh.getRange(row, cS, 1, 1).setBackground(accent);
  var r = sh.getRange(row, cS + 1, 1, cN - 1).merge();
  r.setValue("     " + text)
   .setBackground(P.bg2).setFontColor(accent)
   .setFontSize(L.fSection).setFontWeight("bold")
   .setHorizontalAlignment("left").setVerticalAlignment("middle");
  sh.setRowHeight(row, L.hSection);
}

/** Table column headers */
function tHead(sh, row, cS, vals) {
  var r = sh.getRange(row, cS, 1, vals.length);
  r.setValues([vals])
   .setBackground(P.bg0).setFontColor(P.tx2)
   .setFontSize(L.fTableHead).setFontWeight("bold")
   .setHorizontalAlignment("center").setVerticalAlignment("middle")
   .setWrapStrategy(WRAP);
  sh.setRowHeight(row, L.hTableHead);
  r.setBorder(false, false, true, false, false, false, P.borderDk, BORDER);
}

/** Table data row — zebra-striped, ALL BOLD by default */
function tRow(sh, row, cS, vals, idx, fw) {
  var bg = (idx % 2 === 0) ? P.rowEven : P.rowOdd;
  var r = sh.getRange(row, cS, 1, vals.length);
  r.setValues([vals])
   .setBackground(bg).setFontColor(P.tx1)
   .setFontSize(L.fTableBody).setFontWeight("bold")   // ← CHANGED: always bold
   .setHorizontalAlignment("center").setVerticalAlignment("middle")
   .setWrapStrategy(CLIP);
  sh.setRowHeight(row, L.hTableRow);
  return r;
}

/** Totals row — YELLOW accent (#FFDD2F) */
function tTotal(sh, row, cS, vals) {
  var r = sh.getRange(row, cS, 1, vals.length);
  r.setValues([vals])
   .setBackground(P.totalsBg).setFontColor(P.totalsYellow)   // ← CHANGED to yellow
   .setFontSize(L.fTotals).setFontWeight("bold")
   .setHorizontalAlignment("center").setVerticalAlignment("middle")
   .setWrapStrategy(CLIP);
  sh.setRowHeight(row, L.hTotalsRow);
  r.setBorder(true, false, false, false, false, false, P.totalsYellow, BORDER);   // ← yellow border
  return r;
}

/** Grid borders */
function gBorder(sh, sR, sC, nR, nC) {
  sh.getRange(sR, sC, nR, nC).setBorder(true, true, true, true, true, true, P.borderDk, BORDER);
}

/** Colour-code a cell green/red */
function tintCell(sh, row, col, value) {
  if (value > 0) sh.getRange(row, col).setFontColor(P.emerald).setFontWeight("bold");
  else if (value < 0) sh.getRange(row, col).setFontColor(P.coral).setFontWeight("bold");
}

/** Native SPARKLINE progress bar — now spans 2 merged columns */
function sparkBar2(sh, row, col, value, max, colour) {
  if (max <= 0) return;
  var pct = Math.min(value / max, 1);
  var bg  = P.bg3;
  var merged = sh.getRange(row, col, 1, 2).merge();
  merged.setNumberFormat("");
  merged.setFormula(
    '=SPARKLINE(' + pct + ',{"charttype","bar";"max",1;"color1","' + colour + '";"color2","' + bg + '"})'
  );
}

/** Single-column sparkline (for cases where 2-col merge isn't possible) */
function sparkBar(sh, row, col, value, max, colour) {
  if (max <= 0) return;
  var pct = Math.min(value / max, 1);
  var bg  = P.bg3;
  var cell = sh.getRange(row, col);
  cell.setNumberFormat("");
  cell.setFormula(
    '=SPARKLINE(' + pct + ',{"charttype","bar";"max",1;"color1","' + colour + '";"color2","' + bg + '"})'
  );
}

/** Left-align a specific cell */
function leftAlign(sh, row, col) {
  sh.getRange(row, col).setHorizontalAlignment("left");
}

/** Right-align a specific cell */
function rightAlign(sh, row, col) {
  sh.getRange(row, col).setHorizontalAlignment("right");
}

/** Strip geo suffix (e.g. " - US", " - AU") from a client name */
function stripGeo(name) {
  return String(name).replace(/\s*[-–—]\s*(US|EU|AU|UK|IN|CA|SG|AE)\s*$/i, "").trim();
}

/** Apply CTA-style geo token to a cell — rounded-look bold badge */
function geoToken(sh, row, col, geoCode) {
  var code = geoCode ? geoCode.toUpperCase() : "—";
  var colours = GEO_COLOURS[code] || GEO_COLOURS["—"];
  var cell = sh.getRange(row, col);
  cell.setValue("  " + code + "  ")
      .setBackground(colours.bg)
      .setFontColor(colours.fg)
      .setFontWeight("bold")
      .setFontSize(10)
      .setHorizontalAlignment("center")
      .setVerticalAlignment("middle");
}

// ═══════════════════════════════════════════════════════════════════════════════
// KPI CARD RENDERER
// ═══════════════════════════════════════════════════════════════════════════════
function kpiCard(sh, accentRow, labelRow, valueRow, cStart, cSpan, accent, label, value) {
  sh.getRange(accentRow, cStart, 1, cSpan).merge().setBackground(accent);
  sh.getRange(labelRow, cStart, 1, cSpan).merge()
    .setValue(label)
    .setBackground(P.bg1).setFontColor(P.tx2)
    .setFontSize(L.fKpiLabel).setFontWeight("bold")
    .setHorizontalAlignment("center").setVerticalAlignment("bottom");
  sh.getRange(valueRow, cStart, 1, cSpan).merge()
    .setValue(String(value))
    .setBackground(P.bg1).setFontColor(P.tx0)
    .setFontSize(L.fKpiValue).setFontWeight("bold")
    .setHorizontalAlignment("center").setVerticalAlignment("middle");
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN DASHBOARD
// ═══════════════════════════════════════════════════════════════════════════════
function updateGrowthMetrics() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(GROWTH_TAB);
  if (!sh) sh = ss.insertSheet(GROWTH_TAB);
  sh.clear();
  sh.clearFormats();
  sh.setFrozenRows(0);
  sh.setFrozenColumns(0);
  initSheet(sh);

  var data = collectAllData();
  var A    = analyse(data);
  var row  = 1;

  // Pre-fill with dark background + font
  sh.getRange(1, 1, 250, L.totalCols).setBackground(P.bg0).setFontFamily(FONT);

  // ┌─────────────────────────────────────────────────────────────────────────┐
  // │  HEADER BANNER                                                         │
  // └─────────────────────────────────────────────────────────────────────────┘
  accentDiv(sh, row, P.gold);
  row++;
  darkRow(sh, row, "P2P  GROWTH  METRICS  2026", P.tx0, L.fTitle, "bold", L.hTitle);
  row++;
  darkRow(sh, row, "Global Revenue  ·  Growth Analytics  ·  Creative Services  ·  Real-Time Report", P.totalsYellow, L.fSubtitle, "normal", L.hSubtitle);
  row++;
  var ts = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "dd MMM yyyy  'at'  HH:mm:ss");
  darkRow(sh, row, "Last Synced : " + ts, P.tx3, L.fTimestamp, "normal", L.hTimestamp, "italic");
  row++;
  spacer(sh, row); row++;
  sh.getRange(1, 1, row - 1, L.totalCols).setBorder(false, false, false, false, false, false);

  // ┌─────────────────────────────────────────────────────────────────────────┐
  // │  KPI SCORECARDS — Row 1                                                │
  // └─────────────────────────────────────────────────────────────────────────┘
  darkRow(sh, row, "—  KEY PERFORMANCE INDICATORS  —", P.totalsYellow, L.fSection, "bold", L.hSection);
  row++;
  spacer(sh, row); row++;

  var k1a = row; sh.setRowHeight(row, L.hKpiAccent); row++;
  var k1l = row; sh.setRowHeight(row, L.hKpiLabel);  row++;
  var k1v = row; sh.setRowHeight(row, L.hKpiValue);  row++;

  kpiCard(sh, k1a, k1l, k1v, 2,  2, P.kpiBlue,   "TOTAL SQLs",      num(A.tQ));
  kpiCard(sh, k1a, k1l, k1v, 4,  2, P.kpiGreen,  "CONVERTED",       num(A.tV));
  kpiCard(sh, k1a, k1l, k1v, 6,  1, P.kpiPurple, "CONV. RATE",      pct(A.cr));
  kpiCard(sh, k1a, k1l, k1v, 8,  2, P.gold,      "TOTAL REVENUE",   cur(A.tR));
  kpiCard(sh, k1a, k1l, k1v, 10, 1, P.kpiOrange, "AVG DEAL SIZE",   cur(A.ad));
  kpiCard(sh, k1a, k1l, k1v, 11, 2, P.kpiTeal,   "ANNUALISED REV",  cur(A.ar));
  kpiCard(sh, k1a, k1l, k1v, 13, 1, P.kpiRose,   "TOP SERVICE",     A.sA.length > 0 ? A.sA[0].n : "—");

  spacer(sh, row); row++;

  // ┌─────────────────────────────────────────────────────────────────────────┐
  // │  KPI SCORECARDS — Row 2                                                │
  // └─────────────────────────────────────────────────────────────────────────┘
  var k2a = row; sh.setRowHeight(row, L.hKpiAccent); row++;
  var k2l = row; sh.setRowHeight(row, L.hKpiLabel);  row++;
  var k2v = row; sh.setRowHeight(row, L.hKpiValue);  row++;

  kpiCard(sh, k2a, k2l, k2v, 2,  2, P.teal,    "ACTIVE MONTHS",       num(A.aM));
  kpiCard(sh, k2a, k2l, k2v, 4,  2, P.violet,  "AVG REV / MONTH",    cur(A.mr));
  kpiCard(sh, k2a, k2l, k2v, 6,  1, P.azure,   "TOTAL SERVICES",     num(A.sA.length));
  kpiCard(sh, k2a, k2l, k2v, 8,  2, A.conc > 60 ? P.coral : (A.conc > 40 ? P.amber : P.emerald),
                                                 "CONCENTRATION RISK", pct(A.conc));
  kpiCard(sh, k2a, k2l, k2v, 10, 1, P.emerald, "VELOCITY / MO",      dec(A.vel));
  kpiCard(sh, k2a, k2l, k2v, 11, 2, P.azure,   "SQLs / MONTH",       dec(A.sqlV));
  kpiCard(sh, k2a, k2l, k2v, 13, 1, P.rose,    "TOP REQUIREMENT",    A.rA.length > 0 ? A.rA[0].n : "—");

  spacer(sh, row); row++;
  accentDiv(sh, row, P.borderDk); row++;
  spacer(sh, row); row++;

  // ┌─────────────────────────────────────────────────────────────────────────┐
  // │  PIPELINE HEALTH  +  NBD vs EXISTING  (side by side)                   │
  // └─────────────────────────────────────────────────────────────────────────┘
  // Pipeline: cols 2–6 (5 cols: Status, Count, Share, Visual×2)
  // NBD:      cols 8–13 (6 cols)
  secTitle(sh, row, 2, 5, "PIPELINE HEALTH", P.teal);
  secTitle(sh, row, 8, 6, "NEW BUSINESS vs EXISTING", P.violet);
  row++;

  // Pipeline header: Status | Count | Share | Visual (2 cols merged in sparkline)
  tHead(sh, row, 2, ["Status", "Count", "Share", "Visual", ""]);
  // Merge "Visual" header across 2 columns (E+F)
  sh.getRange(row, 5, 1, 2).merge()
    .setValue("Visual")
    .setHorizontalAlignment("center").setVerticalAlignment("middle")
    .setBackground(P.bg0).setFontColor(P.tx2)
    .setFontSize(L.fTableHead).setFontWeight("bold");
  tHead(sh, row, 8, ["Segment", "SQLs", "Converted", "Revenue", "Conv. Rate", "Rev Share"]);
  row++;

  // ── Pipeline (left) ──
  var pItems = [
    {l: "● Converted",         v: A.pipe.conv,  clr: P.emerald},
    {l: "● Lost / Closed",     v: A.pipe.lost,  clr: P.coral},
    {l: "● Other",             v: A.pipe.other, clr: P.tx3}
  ];
  var pStart = row;
  for (var pi = 0; pi < pItems.length; pi++) {
    var share = dv(pItems[pi].v, A.tQ) * 100;
    tRow(sh, row, 2, [pItems[pi].l, num(pItems[pi].v), pct(share), "", ""], pi);
    leftAlign(sh, row, 2);
    sh.getRange(row, 2).setFontColor(pItems[pi].clr);
    sparkBar2(sh, row, 5, pItems[pi].v, A.tQ, pItems[pi].clr);  // ← 2 columns wide (E+F)
    row++;
  }
  tTotal(sh, row, 2, ["TOTAL", num(A.tQ), "100.0%", "", ""]);
  row++;
  gBorder(sh, pStart - 1, 2, row - pStart + 1, 5);

  // ── NBD vs Existing (right) ──
  var nRow  = pStart;
  var nKeys = ["NBD", "Existing"];
  var tNR   = A.nbe["NBD"].r + A.nbe["Existing"].r;
  for (var ni = 0; ni < nKeys.length; ni++) {
    var n = A.nbe[nKeys[ni]];
    tRow(sh, nRow, 8, [
      nKeys[ni],
      num(n.c),
      num(n.v),
      cur(n.r),
      pct(dv(n.v, n.c) * 100),
      pct(dv(n.r, tNR) * 100)
    ], ni);
    leftAlign(sh, nRow, 8);
    nRow++;
  }
  var nTC = A.nbe["NBD"].c + A.nbe["Existing"].c;
  var nTV = A.nbe["NBD"].v + A.nbe["Existing"].v;
  tTotal(sh, nRow, 8, ["TOTAL", num(nTC), num(nTV), cur(tNR), pct(dv(nTV, nTC) * 100), "100.0%"]);
  nRow++;
  gBorder(sh, pStart - 1, 8, nRow - pStart + 1, 6);

  row = Math.max(row, nRow);
  spacer(sh, row); row++;
  accentDiv(sh, row, P.borderDk); row++;
  spacer(sh, row); row++;

  // ┌─────────────────────────────────────────────────────────────────────────┐
  // │  SERVICE FREQUENCY RANKING                                             │
  // │  Cols B–J = 9 data cols + K–L for 2-col sparkline = 11 total           │
  // └─────────────────────────────────────────────────────────────────────────┘
  var svcNCols = 10;  // B(#) C(Name) D(Vol) E(Conv) F(Conv%) G(Rev) H(RevShare) I(AvgR) J+K(Demand sparkline 2-col)
  secTitle(sh, row, 2, svcNCols, "SERVICE FREQUENCY RANKING", P.azure);
  row++;
  tHead(sh, row, 2, ["#", "Service", "Volume", "Converted", "Conv %", "Revenue", "Rev Share", "Avg Rev/Conv", "Demand", ""]);
  // Merge "Demand" header across 2 columns (J+K)
  sh.getRange(row, 10, 1, 2).merge()
    .setValue("Demand")
    .setHorizontalAlignment("center").setVerticalAlignment("middle")
    .setBackground(P.bg0).setFontColor(P.tx2)
    .setFontSize(L.fTableHead).setFontWeight("bold");
  row++;

  var svcStart    = row;
  var maxSvcCount = A.sA.length > 0 ? A.sA[0].c : 1;
  for (var i = 0; i < A.sA.length; i++) {
    var svcRevShare = pct(dv(A.sA[i].r, A.tR) * 100);
    var svcAvgRev   = A.sA[i].v > 0 ? cur(A.sA[i].r / A.sA[i].v) : "$0";
    tRow(sh, row, 2, [
      num(i + 1),
      A.sA[i].n,
      num(A.sA[i].c),
      num(A.sA[i].v),
      pct(A.sA[i].cr),
      cur(A.sA[i].r),
      svcRevShare,
      svcAvgRev,
      "", ""            // Demand sparkline cols (2 merged)
    ], i);
    leftAlign(sh, row, 3);
    sparkBar2(sh, row, 10, A.sA[i].c, maxSvcCount, P.azure);  // ← 2 columns wide (J+K)
    row++;
  }
  // Service totals
  var sTc = 0, sTr = 0, sTv = 0;
  for (var i = 0; i < A.sA.length; i++) { sTc += A.sA[i].c; sTr += A.sA[i].r; sTv += A.sA[i].v; }
  tTotal(sh, row, 2, [
    "", "TOTAL", num(sTc), num(sTv),
    pct(dv(sTv, sTc) * 100), cur(sTr),
    "100.0%", sTv > 0 ? cur(sTr / sTv) : "$0",
    "", ""
  ]);
  row++;
  gBorder(sh, svcStart - 1, 2, row - svcStart + 1, svcNCols);

  spacer(sh, row); row++;
  accentDiv(sh, row, P.borderDk); row++;
  spacer(sh, row); row++;

  // ┌─────────────────────────────────────────────────────────────────────────┐
  // │  TOP 10 REQUIREMENTS                                                   │
  // │  Cols B–L = 11 cols: # | Req | Svc | Vol | Conv | Rev | Conv% |        │
  // │                       RevShare | AvgR | Demand(2-col merged)            │
  // └─────────────────────────────────────────────────────────────────────────┘
  var reqNCols = 11;
  secTitle(sh, row, 2, reqNCols, "TOP 10 REQUIREMENTS — Most Opted Creative Requirements", P.teal);
  row++;
  tHead(sh, row, 2, ["#", "Requirement", "Service", "Volume", "Converted", "Revenue", "Conv %", "Rev Share", "Avg Rev/Conv", "Demand", ""]);
  // Merge "Demand" header across 2 columns (K+L)
  sh.getRange(row, 11, 1, 2).merge()
    .setValue("Demand")
    .setHorizontalAlignment("center").setVerticalAlignment("middle")
    .setBackground(P.bg0).setFontColor(P.tx2)
    .setFontSize(L.fTableHead).setFontWeight("bold");
  row++;

  var rqStart     = row;
  var maxReqCount = A.rA.length > 0 ? A.rA[0].c : 1;
  for (var i = 0; i < A.rA.length; i++) {
    var revShare  = pct(dv(A.rA[i].r, A.tR) * 100);
    var avgRvConv = A.rA[i].v > 0 ? cur(A.rA[i].r / A.rA[i].v) : "$0";
    tRow(sh, row, 2, [
      num(i + 1),
      A.rA[i].n,
      A.rA[i].s,
      num(A.rA[i].c),
      num(A.rA[i].v),
      cur(A.rA[i].r),
      pct(A.rA[i].cr),
      revShare,
      avgRvConv,
      "", ""           // Demand sparkline (2-col merged)
    ], i);
    leftAlign(sh, row, 3);
    leftAlign(sh, row, 4);
    sparkBar2(sh, row, 11, A.rA[i].c, maxReqCount, P.teal);  // ← 2 columns wide (K+L)
    row++;
  }
  // Totals
  var rTc = 0, rTv = 0, rTr = 0;
  for (var i = 0; i < A.rA.length; i++) { rTc += A.rA[i].c; rTv += A.rA[i].v; rTr += A.rA[i].r; }
  tTotal(sh, row, 2, [
    "", "TOP 10 TOTAL", "",
    num(rTc), num(rTv), cur(rTr),
    pct(dv(rTv, rTc) * 100),
    pct(dv(rTr, A.tR) * 100),
    rTv > 0 ? cur(rTr / rTv) : "$0",
    "", ""
  ]);
  row++;
  gBorder(sh, rqStart - 1, 2, row - rqStart + 1, reqNCols);

  spacer(sh, row); row++;
  accentDiv(sh, row, P.borderDk); row++;
  spacer(sh, row); row++;

  // ┌─────────────────────────────────────────────────────────────────────────┐
  // │  MONTHLY REVENUE & PERFORMANCE TRENDS                                  │
  // │  Cols B–L = 11: Month | SQLs | Conv | Conv% | Rev | AvgDeal |          │
  // │                 MoM | Cumulative | Momentum(2-col merged)               │
  // └─────────────────────────────────────────────────────────────────────────┘
  var moNCols = 10;
  secTitle(sh, row, 2, moNCols, "MONTHLY REVENUE & PERFORMANCE TRENDS", P.emerald);
  row++;
  tHead(sh, row, 2, ["Month", "SQLs", "Converted", "Conv %", "Revenue", "Avg Deal", "MoM Growth", "Cumulative", "Momentum", ""]);
  // Merge "Momentum" header across 2 columns (J+K)
  sh.getRange(row, 10, 1, 2).merge()
    .setValue("Momentum")
    .setHorizontalAlignment("center").setVerticalAlignment("middle")
    .setBackground(P.bg0).setFontColor(P.tx2)
    .setFontSize(L.fTableHead).setFontWeight("bold");
  row++;

  var moStart  = row;
  var prevRev  = 0;
  var cumRev   = 0;
  var maxMoRev = 0;
  for (var i = 0; i < A.mA.length; i++) { if (A.mA[i].r > maxMoRev) maxMoRev = A.mA[i].r; }

  for (var i = 0; i < A.mA.length; i++) {
    var mom    = "—";
    var momVal = 0;
    if (i > 0 && prevRev > 0) {
      momVal = ((A.mA[i].r - prevRev) / prevRev) * 100;
      mom = (momVal > 0 ? "▲ " : "▼ ") + pct(Math.abs(momVal));
    }
    prevRev = A.mA[i].r;
    cumRev += A.mA[i].r;
    tRow(sh, row, 2, [
      A.mA[i].m,
      num(A.mA[i].q),
      num(A.mA[i].v),
      pct(A.mA[i].cr),
      cur(A.mA[i].r),
      cur(A.mA[i].avg),
      mom,
      cur(cumRev),
      "", ""           // Momentum sparkline (2-col merged)
    ], i);
    sparkBar2(sh, row, 10, A.mA[i].r, maxMoRev, P.emerald);  // ← 2 columns wide (J+K)
    if (mom !== "—") tintCell(sh, row, 8, momVal);
    row++;
  }
  // Totals
  var mTq = 0, mTv = 0, mTr = 0;
  for (var i = 0; i < A.mA.length; i++) { mTq += A.mA[i].q; mTv += A.mA[i].v; mTr += A.mA[i].r; }
  tTotal(sh, row, 2, [
    "TOTAL", num(mTq), num(mTv),
    pct(dv(mTv, mTq) * 100),
    cur(mTr), cur(dv(mTr, mTv)),
    "—", cur(mTr), "", ""
  ]);
  row++;
  gBorder(sh, moStart - 1, 2, row - moStart + 1, moNCols);

  spacer(sh, row); row++;
  accentDiv(sh, row, P.borderDk); row++;
  spacer(sh, row); row++;

  // ┌─────────────────────────────────────────────────────────────────────────┐
  // │  SERVICE BREAKDOWN BY MONTH — dynamic width                            │
  // └─────────────────────────────────────────────────────────────────────────┘
  var sbH = ["Month"];
  for (var s = 0; s < A.sN.length; s++) { sbH.push(A.sN[s] + " Vol"); sbH.push(A.sN[s] + " Rev"); }
  sbH.push("Total Vol");
  sbH.push("Total Rev");
  var sbColN = Math.min(sbH.length, 12);
  while (sbH.length < sbColN) sbH.push("");

  secTitle(sh, row, 2, sbColN, "SERVICE BREAKDOWN BY MONTH", P.amber);
  row++;
  tHead(sh, row, 2, sbH.slice(0, sbColN));
  row++;

  var sbStart = row;
  for (var mi = 0; mi < A.mA.length; mi++) {
    var rv  = [A.mA[mi].m];
    var tVol = 0, tRv = 0;
    for (var s = 0; s < A.sN.length; s++) {
      var key = A.mA[mi].m + "|" + A.sN[s];
      var vol = A.sbm[key] ? A.sbm[key].c : 0;
      var rev = A.sbm[key] ? A.sbm[key].r : 0;
      rv.push(num(vol));
      rv.push(cur(rev));
      tVol += vol;
      tRv  += rev;
    }
    rv.push(num(tVol));
    rv.push(cur(tRv));
    while (rv.length < sbColN) rv.push("");
    tRow(sh, row, 2, rv.slice(0, sbColN), mi);
    row++;
  }
  gBorder(sh, sbStart - 1, 2, row - sbStart + 1, sbColN);

  spacer(sh, row); row++;
  accentDiv(sh, row, P.borderDk); row++;
  spacer(sh, row); row++;

  // ┌─────────────────────────────────────────────────────────────────────────┐
  // │  TOP 10 CLIENTS — Revenue, Conversions & Requirements                  │
  // │  Cols B–M = 12: # | Client | Rev | Proj | Conv | Conv% | RevShare |    │
  // │       AvgR | KeyReqs(2-col merged) | Geo | RevVisual(2-col merged)     │
  // └─────────────────────────────────────────────────────────────────────────┘
  var cliNCols = 12;
  secTitle(sh, row, 2, cliNCols, "TOP 10 CLIENTS — Revenue, Conversions & Requirements", P.violet);
  row++;
  // Header: note "Key Requirements" spans col J, "—" is placeholder for merge into K,
  //         "Geo" at col L, "Revenue Visual" spans cols M (will merge M+… but we use sparkBar2 at L+M)
  // Actually let's lay it out: B=# C=Client D=Rev E=Proj F=Conv G=Conv% H=RevShare I=AvgR J+K=KeyReqs(merged) L=Geo M+?(next col)=RevVisual
  // But we only have up to col M (13th col, N=14 is gutter). So 12 cols from B to M.
  // Layout: B(#) C(Client) D(Rev) E(Proj) F(Conv) G(Conv%) H(RevShare) I(AvgR) J(KeyReqs) K(—merged) L(Geo) M(RevVisual)
  // RevVisual will be single col since we're at the edge. We'll use sparkBar (1 col) for revenue visual here.
  tHead(sh, row, 2, ["#", "Client", "Revenue", "Projects", "Converted", "Conv %", "Rev Share", "Avg Rev/Conv", "Key Requirements", "", "Geo", "Revenue Visual"]);
  row++;

  var cdStart    = row;
  var maxCliRev  = A.cA.length > 0 ? A.cA[0].r : 1;
  for (var i = 0; i < A.cA.length; i++) {
    var rStr     = A.cA[i].rq.length > 80 ? A.cA[i].rq.substring(0, 77) + "…" : A.cA[i].rq;  // wider = more chars
    var avgRC    = A.cA[i].v > 0 ? cur(A.cA[i].r / A.cA[i].v) : "$0";
    var cliShare = pct(dv(A.cA[i].r, A.tR) * 100);
    tRow(sh, row, 2, [
      num(i + 1),
      stripGeo(A.cA[i].n),
      cur(A.cA[i].r),
      num(A.cA[i].p),
      num(A.cA[i].v),
      pct(A.cA[i].cr),
      cliShare,
      avgRC,
      rStr,            // Key Requirements (will merge J+K)
      "",              // merged into Key Requirements
      "",              // Geo (set separately via geoToken)
      ""               // Revenue Visual (sparkline)
    ], i);
    leftAlign(sh, row, 3);   // client name left

    // Merge Key Requirements across 2 columns (J+K = cols 10+11 relative, but absolute = cS+8, cS+9)
    // cS = 2, so cols 10 and 11
    sh.getRange(row, 10, 1, 2).merge()
      .setHorizontalAlignment("left").setFontSize(9).setWrapStrategy(CLIP);

    // Geo token in col 12
    geoToken(sh, row, 12, A.cA[i].geo);

    // Revenue visual sparkline in col 13 (single column — at the edge)
    sparkBar(sh, row, 13, A.cA[i].r, maxCliRev, P.violet);
    row++;
  }
  // Merge the header cells for "Key Requirements" too (cols 10+11)
  sh.getRange(cdStart - 1, 10, 1, 2).merge()
    .setValue("Key Requirements")
    .setHorizontalAlignment("center").setVerticalAlignment("middle");

  // Client totals
  var cTp = 0, cTr = 0, cTv = 0;
  for (var i = 0; i < A.cA.length; i++) { cTp += A.cA[i].p; cTr += A.cA[i].r; cTv += A.cA[i].v; }
  tTotal(sh, row, 2, [
    "", "TOP 10 TOTAL", cur(cTr), num(cTp), num(cTv),
    pct(dv(cTv, cTp) * 100),
    pct(dv(cTr, A.tR) * 100),
    cTv > 0 ? cur(cTr / cTv) : "$0",
    "", "", "", ""
  ]);
  row++;
  gBorder(sh, cdStart - 1, 2, row - cdStart + 1, cliNCols);

  spacer(sh, row); row++;

  // ┌─────────────────────────────────────────────────────────────────────────┐
  // │  FOOTER                                                                │
  // └─────────────────────────────────────────────────────────────────────────┘
  accentDiv(sh, row, P.gold); row++;

  // ── Final global formatting ──
  sh.getRange(1, 1, row, L.totalCols).setFontFamily(FONT);
  SpreadsheetApp.flush();
}

// ═══════════════════════════════════════════════════════════════════════════════
// TRIGGER MANAGEMENT
// ═══════════════════════════════════════════════════════════════════════════════
function createAutoRefreshTrigger() {
  clearTriggers_();
  ScriptApp.newTrigger("updateGrowthMetrics").timeBased().everyHours(1).create();
  SpreadsheetApp.getUi().alert("✔ Hourly auto-refresh trigger activated.");
}
function removeAutoRefreshTrigger() {
  clearTriggers_();
  SpreadsheetApp.getUi().alert("Auto-refresh trigger removed.");
}
function clearTriggers_() {
  var t = ScriptApp.getProjectTriggers();
  for (var i = 0; i < t.length; i++) {
    if (t[i].getHandlerFunction() === "updateGrowthMetrics") ScriptApp.deleteTrigger(t[i]);
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// CUSTOM MENU
// ═══════════════════════════════════════════════════════════════════════════════
function onOpen() {
  SpreadsheetApp.getUi().createMenu("📊 Growth Metrics")
    .addItem("🔄 Refresh Dashboard Now", "updateGrowthMetrics")
    .addSeparator()
    .addItem("⏰ Setup Auto-Refresh (Hourly)", "createAutoRefreshTrigger")
    .addItem("🚫 Remove Auto-Refresh", "removeAutoRefreshTrigger")
    .addToUi();
}
