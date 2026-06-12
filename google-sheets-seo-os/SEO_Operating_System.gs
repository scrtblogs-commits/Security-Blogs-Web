/**
 * SecurityBlogs SEO Operating System — Google Apps Script
 * Run buildSEOOperatingSystem() once to build the entire system.
 * ============================================================
 */

// ── GLOBAL COLOUR PALETTE ────────────────────────────────────
const C = {
  primary:      '#1e5fe0',
  headerDark:   '#0f172a',
  headerMid:    '#1e293b',
  white:        '#ffffff',
  green:        '#16a34a',
  greenLight:   '#dcfce7',
  yellow:       '#d97706',
  yellowLight:  '#fef3c7',
  red:          '#dc2626',
  redLight:     '#fee2e2',
  blue:         '#2563eb',
  blueLight:    '#dbeafe',
  purple:       '#7c3aed',
  purpleLight:  '#ede9fe',
  orange:       '#ea580c',
  orangeLight:  '#ffedd5',
  gray:         '#6b7280',
  grayLight:    '#f8fafc',
  border:       '#e2e8f0',
  rowAlt:       '#f8fafc',
};

// ── MAIN ENTRY POINT ─────────────────────────────────────────
function buildSEOOperatingSystem() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.rename('SecurityBlogs — SEO Operating System');

  // Remove default blank sheet if it exists
  const defaultSheet = ss.getSheetByName('Sheet1');

  // Build all sheets (order = tab order)
  buildInstructions(ss);
  buildDashboard(ss);
  buildSEOImplementation(ss);
  buildSocialMediaBoard(ss);
  buildWebDesignDev(ss);
  buildBusinessListings(ss);
  buildGuestPosting(ss);
  buildBlogPosting(ss);
  buildLinkBuilding(ss);
  buildContentOpportunities(ss);
  buildSchemaBoard(ss);

  // Delete default sheet last
  if (defaultSheet) { try { ss.deleteSheet(defaultSheet); } catch(e) {} }

  // Activate dashboard
  ss.setActiveSheet(ss.getSheetByName('📊 Dashboard'));

  SpreadsheetApp.getUi().alert(
    '✅ SEO Operating System built successfully!\n\n' +
    '11 sheets created.\n' +
    'Start on the 📊 Dashboard tab.\n\n' +
    'SecurityBlogs — SEO Master'
  );
}

// ════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ════════════════════════════════════════════════════════════

function getOrCreate(ss, name) {
  let sh = ss.getSheetByName(name);
  if (!sh) sh = ss.insertSheet(name);
  sh.clear();
  return sh;
}

function headerRow(sh, row, cols, bgColor, textColor) {
  bgColor   = bgColor   || C.headerDark;
  textColor = textColor || C.white;
  const range = sh.getRange(row, 1, 1, cols.length);
  range.setValues([cols]);
  range.setBackground(bgColor);
  range.setFontColor(textColor);
  range.setFontWeight('bold');
  range.setFontSize(10);
  range.setWrap(true);
  range.setVerticalAlignment('middle');
  sh.setFrozenRows(row);
}

function sectionTitle(sh, row, col, text, bgColor, span) {
  span    = span    || 1;
  bgColor = bgColor || C.primary;
  const r = sh.getRange(row, col, 1, span);
  r.merge();
  r.setValue(text);
  r.setBackground(bgColor);
  r.setFontColor(C.white);
  r.setFontWeight('bold');
  r.setFontSize(11);
  r.setVerticalAlignment('middle');
  r.setHorizontalAlignment('center');
  sh.setRowHeight(row, 32);
}

function setColWidths(sh, widths) {
  widths.forEach(function(w, i) {
    sh.setColumnWidth(i + 1, w);
  });
}

function addDropdown(sh, startRow, col, numRows, values) {
  const rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(values, true)
    .setAllowInvalid(false)
    .build();
  sh.getRange(startRow, col, numRows, 1).setDataValidation(rule);
}

function colorByStatus(sh, startRow, col, numRows, map) {
  // map = { value: bgColor, ... }
  const rules = sh.getConditionalFormatRules();
  Object.keys(map).forEach(function(val) {
    const rule = SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo(val)
      .setBackground(map[val])
      .setFontColor(C.headerDark)
      .setRanges([sh.getRange(startRow, col, numRows, 1)])
      .build();
    rules.push(rule);
  });
  sh.setConditionalFormatRules(rules);
}

function altRows(sh, startRow, numRows, numCols) {
  for (let r = startRow; r < startRow + numRows; r++) {
    if ((r - startRow) % 2 === 0) {
      sh.getRange(r, 1, 1, numCols).setBackground(C.grayLight);
    } else {
      sh.getRange(r, 1, 1, numCols).setBackground(C.white);
    }
  }
}

function freezeAndFormat(sh, rows, cols) {
  sh.setFrozenRows(rows);
  sh.setFrozenColumns(cols || 1);
}

// ════════════════════════════════════════════════════════════
// 1. INSTRUCTIONS
// ════════════════════════════════════════════════════════════
function buildInstructions(ss) {
  const sh = getOrCreate(ss, '📋 Instructions');
  sh.setTabColor(C.gray);
  sh.setColumnWidth(1, 220);
  sh.setColumnWidth(2, 600);
  sh.getRange('A1:B1').merge().setValue('SecurityBlogs — SEO Operating System')
    .setBackground(C.headerDark).setFontColor(C.white).setFontSize(16).setFontWeight('bold')
    .setHorizontalAlignment('center').setVerticalAlignment('middle');
  sh.setRowHeight(1, 50);

  const lines = [
    ['VERSION', '1.0 — Built by SecurityBlogs SEO Master'],
    ['PURPOSE', 'Full SEO management system for SecurityBlogs (and future clients StateGuard, etc.)'],
    ['', ''],
    ['── TABS ─────────────────', ''],
    ['📊 Dashboard', 'Live summary of all tasks, statuses, and progress across all sections'],
    ['✅ SEO Implementation', 'Track on-page SEO for every URL — keywords, meta, H1, schema, status'],
    ['📱 Social Media Board', 'Instagram content planner with hooks, captions, CTAs, hashtags, post types'],
    ['🖥️ Web Design & Dev', 'Track UX, mobile, CTA, speed, and conversion issues across all pages'],
    ['📍 Business Listings', 'All Australian directories and listing platforms with credentials and status'],
    ['🔗 Guest Posting', 'Track outreach, pitches, placements, and published guest post URLs'],
    ['✍️ Blog Posting', 'Full blog workflow from Idea → Draft → Review → Published'],
    ['🏗️ Link Building', 'All link acquisition — guest posts, niche edits, directories, citations'],
    ['🔍 Content Opportunities', 'GSC export analysis — quick wins, low CTR fixes, content gaps'],
    ['🗂️ Schema Board', 'Track schema implementation and validation across all pages'],
    ['', ''],
    ['── HOW TO USE ───────────', ''],
    ['Step 1', 'Start with ✅ SEO Implementation — add all your website URLs and fill in current status'],
    ['Step 2', 'Use 📱 Social Media Board to plan your next 4 weeks of Instagram content'],
    ['Step 3', 'Export Google Search Console data → paste into 🔍 Content Opportunities'],
    ['Step 4', 'Add all directories to 📍 Business Listings and track verification'],
    ['Step 5', 'Plan your next 3 blog posts in ✍️ Blog Posting'],
    ['Step 6', 'Check 📊 Dashboard weekly to see overall progress'],
    ['', ''],
    ['── AUTOMATION READY ─────', ''],
    ['Make.com', 'Connect Blog Posting sheet to trigger content briefs automatically'],
    ['Claude / ChatGPT', 'Use column values as prompts — Hook + Caption + CTA → AI generates full post'],
    ['GSC Import', 'Paste GSC "Queries" export directly into Content Opportunities sheet'],
    ['', ''],
    ['── STATUS COLOURS ───────', ''],
    ['🟢 Done / Published / Active', 'Task complete'],
    ['🟡 In Progress / Draft', 'Work underway'],
    ['🔴 Urgent / Issue / Blocked', 'Needs immediate attention'],
    ['🔵 Planned / Idea', 'Not yet started'],
    ['⚪ Not Applicable / N/A', 'Does not apply to this row'],
  ];

  lines.forEach(function(line, i) {
    const row = i + 2;
    sh.getRange(row, 1).setValue(line[0]).setFontWeight('bold').setFontSize(9).setFontColor(C.gray);
    sh.getRange(row, 2).setValue(line[1]).setFontSize(9).setWrap(true);
    sh.setRowHeight(row, 22);
  });

  sh.setFrozenRows(1);
}

// ════════════════════════════════════════════════════════════
// 2. DASHBOARD
// ════════════════════════════════════════════════════════════
function buildDashboard(ss) {
  const sh = getOrCreate(ss, '📊 Dashboard');
  sh.setTabColor(C.primary);

  // Title
  sh.getRange('A1:H1').merge()
    .setValue('📊 SecurityBlogs — SEO Operating System Dashboard')
    .setBackground(C.headerDark).setFontColor(C.white).setFontSize(14).setFontWeight('bold')
    .setHorizontalAlignment('center').setVerticalAlignment('middle');
  sh.setRowHeight(1, 48);

  sh.getRange('A2:H2').merge()
    .setValue('Live status across all 10 boards — update daily')
    .setBackground(C.primary).setFontColor(C.white).setFontSize(10)
    .setHorizontalAlignment('center');
  sh.setRowHeight(2, 28);

  // ── Section headers row 4
  const sections = [
    ['✅ SEO\nImplementation', '📱 Social\nMedia', '🖥️ Web Design\n& Dev', '📍 Business\nListings',
     '🔗 Guest\nPosting', '✍️ Blog\nPosting', '🏗️ Link\nBuilding', '🗂️ Schema\nBoard'],
  ];
  const secRange = sh.getRange(4, 1, 1, 8);
  secRange.setValues(sections);
  secRange.setBackground(C.headerMid).setFontColor(C.white).setFontWeight('bold')
    .setFontSize(10).setWrap(true).setVerticalAlignment('middle').setHorizontalAlignment('center');
  sh.setRowHeight(4, 44);

  // ── Stat labels row 5-7
  const statLabels = ['Total Items', 'Completed / Done', 'In Progress', 'Pending / Planned'];
  const statBg = [C.grayLight, C.greenLight, C.yellowLight, C.blueLight];
  statLabels.forEach(function(label, i) {
    sh.getRange(5 + i, 1, 1, 8).setBackground(statBg[i]);
    const lCell = sh.getRange(5 + i, 1);
    lCell.setValue(label).setFontWeight('bold').setFontSize(9).setFontColor(C.headerDark);
  });

  // Sheet name map for COUNTIF formulas
  const sheetMap = [
    "'✅ SEO Implementation'",
    "'📱 Social Media Board'",
    "'🖥️ Web Design & Dev'",
    "'📍 Business Listings'",
    "'🔗 Guest Posting'",
    "'✍️ Blog Posting'",
    "'🏗️ Link Building'",
    "'🗂️ Schema Board'",
  ];

  // Status column index per sheet (1-based) and done/in-progress values
  const statusCols = ['K','H','G','F','I','F','G','F']; // approx status col letters
  const doneVals   = ['Done','Published','Active','Verified','Published','Published','Acquired','Validated'];
  const inProgVals = ['In Progress','Scheduled','In Progress','Submitted','In Progress','In Review','In Progress','Pending'];

  sheetMap.forEach(function(shName, i) {
    const col = statusCols[i];
    // Total = COUNTA of col B rows 3:500
    sh.getRange(5, i + 1).setFormula(
      '=IFERROR(COUNTA(' + shName + '!B3:B500)-1,"–")'
    ).setHorizontalAlignment('center').setFontSize(12).setFontWeight('bold');

    // Done
    sh.getRange(6, i + 1).setFormula(
      '=IFERROR(COUNTIF(' + shName + '!' + col + '3:' + col + '500,"' + doneVals[i] + '"),"–")'
    ).setHorizontalAlignment('center').setFontSize(11).setFontColor(C.green).setFontWeight('bold');

    // In Progress
    sh.getRange(7, i + 1).setFormula(
      '=IFERROR(COUNTIF(' + shName + '!' + col + '3:' + col + '500,"' + inProgVals[i] + '"),"–")'
    ).setHorizontalAlignment('center').setFontSize(11).setFontColor(C.yellow).setFontWeight('bold');

    // Pending
    sh.getRange(8, i + 1).setFormula(
      '=IFERROR(COUNTIF(' + shName + '!' + col + '3:' + col + '500,"Planned")+"' +
      'COUNTIF(' + shName + '!' + col + '3:' + col + '500,"Not Started"),"–")'
    ).setHorizontalAlignment('center').setFontSize(11).setFontColor(C.blue).setFontWeight('bold');
  });

  sh.setRowHeight(5, 28); sh.setRowHeight(6, 28); sh.setRowHeight(7, 28); sh.setRowHeight(8, 28);

  // ── Spacer row 9
  sh.setRowHeight(9, 16);

  // ── SEO Health section row 10
  sectionTitle(sh, 10, 1, '📈 Quick Wins Monitor — Paste GSC data into Content Opportunities sheet', C.primary, 8);
  sh.setRowHeight(10, 32);

  const qwHeaders = ['Metric', 'Target', 'Source Sheet'];
  sh.getRange(11, 1, 1, 3).setValues([qwHeaders])
    .setBackground(C.headerMid).setFontColor(C.white).setFontWeight('bold').setFontSize(9);

  const qwRows = [
    ['Blogs Published This Month', '=IFERROR(COUNTIFS(\'✍️ Blog Posting\'!F3:F500,"Published",\'✍️ Blog Posting\'!D3:D500,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1)),0)', '✍️ Blog Posting'],
    ['Guest Posts Published', '=IFERROR(COUNTIF(\'🔗 Guest Posting\'!I3:I500,"Published"),0)', '🔗 Guest Posting'],
    ['Links Acquired This Month', '=IFERROR(COUNTIF(\'🏗️ Link Building\'!G3:G500,"Acquired"),0)', '🏗️ Link Building'],
    ['Business Listings Active', '=IFERROR(COUNTIF(\'📍 Business Listings\'!F3:F500,"Active"),0)', '📍 Business Listings'],
    ['Schema Pages Validated', '=IFERROR(COUNTIF(\'🗂️ Schema Board\'!F3:F500,"Validated"),0)', '🗂️ Schema Board'],
    ['Social Posts Scheduled', '=IFERROR(COUNTIF(\'📱 Social Media Board\'!H3:H500,"Scheduled"),0)', '📱 Social Media Board'],
    ['SEO Pages Done', '=IFERROR(COUNTIF(\'✅ SEO Implementation\'!K3:K500,"Done"),0)', '✅ SEO Implementation'],
    ['Web Issues Resolved', '=IFERROR(COUNTIF(\'🖥️ Web Design & Dev\'!G3:G500,"Done"),0)', '🖥️ Web Design & Dev'],
  ];

  qwRows.forEach(function(row, i) {
    sh.getRange(12 + i, 1).setValue(row[0]).setFontSize(9).setFontWeight('bold');
    sh.getRange(12 + i, 2).setFormula(row[1]).setFontSize(11).setFontWeight('bold')
      .setHorizontalAlignment('center').setFontColor(C.primary);
    sh.getRange(12 + i, 3).setValue(row[2]).setFontSize(9).setFontColor(C.gray);
    sh.setRowHeight(12 + i, 24);
    if (i % 2 === 0) sh.getRange(12 + i, 1, 1, 3).setBackground(C.grayLight);
  });

  // ── Column widths
  setColWidths(sh, [180, 160, 160, 160, 140, 130, 140, 160]);
  sh.setFrozenRows(1);
}

// ════════════════════════════════════════════════════════════
// 3. SEO IMPLEMENTATION
// ════════════════════════════════════════════════════════════
function buildSEOImplementation(ss) {
  const sh = getOrCreate(ss, '✅ SEO Implementation');
  sh.setTabColor(C.green);

  sectionTitle(sh, 1, 1, '✅ SecurityBlogs — SEO Implementation Tracker', C.headerDark, 17);
  sh.setRowHeight(1, 36);

  const cols = [
    '#', 'URL', 'Page Type', 'Focus Keyword', 'Meta Title',
    'Title Length', 'Meta Description', 'Desc Length', 'H1',
    'H1 ✓', 'Status', 'Schema', 'Internal Links', 'Priority',
    'Assigned To', 'Last Updated', 'Notes'
  ];
  headerRow(sh, 2, cols, C.headerMid, C.white);

  // Sample data
  const sampleData = [
    [1, 'https://securityblogs.com.au/', 'Homepage', 'security marketing agency', 'Security Marketing Agency for the Security Industry | SecurityBlogs', '=LEN(E3)', 'Australia\'s only specialist digital marketing agency for the security industry. SEO, AI visibility, Google Ads & web design for CCTV and access control. Free audit.', '=LEN(G3)', 'Security Marketing Agency for Australian Security Businesses', '=IF(LEN(I3)>0,"✅","❌")', 'In Progress', 'Organisation, WebSite', 8, 'High', 'Yousif', '=TODAY()', 'Homepage hero needs schema review'],
    [2, 'https://securityblogs.com.au/services/security-seo', 'Service', 'security SEO services', 'Security SEO Services for Australian Security Companies | SecurityBlogs', '=LEN(E4)', 'Specialist Security SEO for CCTV installers, access control integrators, and security SaaS vendors. +180% avg organic growth. Book your free audit today.', '=LEN(G4)', 'Security SEO Services for Australian Security Companies', '=IF(LEN(I4)>0,"✅","❌")', 'In Progress', 'ProfessionalService, FAQ', 5, 'High', 'Yousif', '=TODAY()', ''],
    [3, 'https://securityblogs.com.au/services/aio', 'Service', 'AI intelligence optimisation', 'AIO — AI Intelligence Optimisation for Security Businesses | SecurityBlogs', '=LEN(E5)', 'Get your security business cited by ChatGPT, Perplexity & Gemini. SecurityBlogs\' AIO service achieves 87% AI citation rate. Book a free strategy call today.', '=LEN(G5)', 'AIO — AI Intelligence Optimisation for Security Companies', '=IF(LEN(I5)>0,"✅","❌")', 'Planned', 'ProfessionalService, FAQ', 3, 'High', 'Yousif', '=TODAY()', ''],
    [4, 'https://securityblogs.com.au/services/aeo', 'Service', 'AEO AI-enabled optimisation', 'AEO Services for Security Businesses | SecurityBlogs', '=LEN(E6)', 'Win featured snippets and AI Overviews for security keywords. SecurityBlogs AEO delivers 3.4× more featured answers for security companies. Free strategy call.', '=LEN(G6)', 'AEO — AI-Enabled Optimisation for Security Businesses', '=IF(LEN(I6)>0,"✅","❌")', 'Planned', 'ProfessionalService, FAQ', 3, 'Medium', 'Yousif', '=TODAY()', ''],
    [5, 'https://securityblogs.com.au/services/geo', 'Service', 'GEO geographic entity optimisation', 'GEO Services for Security Companies | SecurityBlogs', '=LEN(E7)', 'Build local knowledge-graph authority for your security business. SecurityBlogs GEO verifies your entity in 90 days. Book your free consultation today.', '=LEN(G7)', 'GEO — Geographic Entity Optimisation for Security Businesses', '=IF(LEN(I7)>0,"✅","❌")', 'Planned', 'ProfessionalService, LocalBusiness', 3, 'Medium', 'Yousif', '=TODAY()', ''],
  ];

  sh.getRange(3, 1, sampleData.length, cols.length).setValues(sampleData);

  // Colour-code Title Length col (F) — red if >60, green if <=60
  const titleLenRules = sh.getConditionalFormatRules();
  const tlRange = sh.getRange('F3:F200');
  titleLenRules.push(SpreadsheetApp.newConditionalFormatRule()
    .whenNumberGreaterThan(60).setBackground(C.redLight).setRanges([tlRange]).build());
  titleLenRules.push(SpreadsheetApp.newConditionalFormatRule()
    .whenNumberLessThanOrEqualTo(60).setBackground(C.greenLight).setRanges([tlRange]).build());

  // Colour-code Desc Length col (H) — red if >160 or <120, green 140-158
  const descLenRange = sh.getRange('H3:H200');
  titleLenRules.push(SpreadsheetApp.newConditionalFormatRule()
    .whenNumberGreaterThan(160).setBackground(C.redLight).setRanges([descLenRange]).build());
  titleLenRules.push(SpreadsheetApp.newConditionalFormatRule()
    .whenNumberBetween(140, 160).setBackground(C.greenLight).setRanges([descLenRange]).build());
  titleLenRules.push(SpreadsheetApp.newConditionalFormatRule()
    .whenNumberLessThan(120).setBackground(C.yellowLight).setRanges([descLenRange]).build());

  sh.setConditionalFormatRules(titleLenRules);

  // Dropdowns
  addDropdown(sh, 3, 3, 200, ['Homepage','Service','Blog','Category','Landing Page','Location','Case Study','FAQ','About','Contact','Other']);
  addDropdown(sh, 3, 11, 200, ['Done','In Progress','Planned','Needs Review','Not Started']);
  addDropdown(sh, 3, 14, 200, ['Critical','High','Medium','Low']);
  addDropdown(sh, 3, 15, 200, ['Yousif','Team','Freelancer','Agency']);

  // Status colour coding
  colorByStatus(sh, 3, 11, 200, {
    'Done':         C.greenLight,
    'In Progress':  C.yellowLight,
    'Needs Review': C.orangeLight,
    'Planned':      C.blueLight,
    'Not Started':  C.grayLight,
  });
  colorByStatus(sh, 3, 14, 200, {
    'Critical': C.redLight,
    'High':     C.orangeLight,
    'Medium':   C.yellowLight,
    'Low':      C.grayLight,
  });

  altRows(sh, 3, 150, cols.length);
  freezeAndFormat(sh, 2, 1);

  setColWidths(sh, [35, 300, 120, 200, 320, 80, 380, 80, 280, 60, 110, 200, 100, 80, 120, 110, 200]);
}

// ════════════════════════════════════════════════════════════
// 4. SOCIAL MEDIA BOARD
// ════════════════════════════════════════════════════════════
function buildSocialMediaBoard(ss) {
  const sh = getOrCreate(ss, '📱 Social Media Board');
  sh.setTabColor('#e91e8c');

  sectionTitle(sh, 1, 1, '📱 SecurityBlogs — Social Media & Instagram Content Planner', '#e91e8c', 16);
  sh.setRowHeight(1, 36);

  const cols = [
    '#', 'Scheduled Date', 'Platform', 'Content Pillar', 'Industry Trend / Topic',
    'Hook (First Line)', 'Caption (Full Text)', 'CTA', 'Hashtags',
    'Post Type', 'Carousel Slides', 'Reel Idea / Script', 'Design Notes',
    'Design Status', 'Approval Status', 'Posting Status', 'Notes'
  ];
  headerRow(sh, 2, cols, '#1a0533', C.white);

  // Content pillar options
  const pillars = [
    'Security SEO', 'AI Visibility / AIO', 'AEO — Featured Snippets', 'GEO — Local Entity',
    'Security Marketing', 'Guest Posting / PR', 'Industry News', 'Case Study / Proof',
    'Education / How-To', 'Behind the Scenes', 'Client Win', 'Tool / Resource',
  ];

  // Sample data — 12 content ideas pre-populated
  const ideas = [
    [1,'','Instagram','Security SEO','How to rank #1 on Google Maps for security keywords',
     '❓ Is your security company invisible on Google Maps? Here\'s why...',
     'Most CCTV installers and alarm companies in Australia are losing leads every single day to competitors who rank higher on Google Maps.\n\nIt\'s not about having a better product. It\'s about three things:\n✅ Google Business Profile optimised\n✅ NAP consistency across all directories\n✅ Local schema on your website\n\nFix these three and you\'ll see results within 60–90 days.\n\nWe\'ve done this for 50+ security businesses across Australia.\n\nDrop "AUDIT" in the comments and we\'ll check your ranking for free. 👇',
     'Comment "AUDIT" for a free local SEO check','#SecuritySEO #CCTV #AlarmInstaller #SecurityMarketing #LocalSEO #GoogleMaps #SecurityBusiness #AustralianSecurity #SecurityCompany #SEOAgency',
     'Carousel','Slide 1: The Problem | Slide 2: Google Maps Pack | Slide 3: 3 Fixes | Slide 4: Results | Slide 5: CTA',
     'Short reel showing Google Maps local pack — before vs after for a CCTV installer',
     'Dark background, blue accent, SecurityBlogs logo bottom right','To Design','Pending','Planned',''],
    [2,'','Instagram','AI Visibility / AIO','Why security businesses are invisible to ChatGPT',
     '🤖 ChatGPT just recommended your competitor. Not you. Here\'s why...',
     '60% of B2B buyers now use AI assistants to find vendors.\n\nIf your security business isn\'t appearing when someone asks ChatGPT "best access control company in Melbourne" — you\'re losing leads you\'ll never even know existed.\n\nThe fix?\n1. Allow AI crawlers in your robots.txt (most block them by accident)\n2. Add JSON-LD structured data to every page\n3. Build brand entity signals across the web\n\nWe helped one security integrator go from 0 AI citations to being recommended in 87% of relevant AI searches.\n\nLink in bio to check your AI Visibility Score — it\'s free. 👆',
     'Check your free AI Visibility Score — link in bio','#AIVisibility #ChatGPT #SecurityMarketing #AIO #SecuritySEO #AISearch #SecurityBusiness #DigitalMarketing #SecurityIndustry #AustralianBusiness',
     'Carousel','Slide 1: The AI shift | Slide 2: What ChatGPT sees | Slide 3: The 3 fixes | Slide 4: Results | Slide 5: Free tool CTA',
     'Reel: Screen recording of ChatGPT recommending a security company — show the before/after',
     'Gradient purple to blue, tech feel','To Design','Pending','Planned',''],
    [3,'','Instagram','AEO — Featured Snippets','How to win Google featured snippets for security keywords',
     '🏆 Position zero. The spot above #1 on Google. Here\'s how security companies win it...',
     'Most security businesses compete for position 1–10.\n\nBut there\'s a spot ABOVE position 1 that most people miss — the featured snippet.\n\nFor a CCTV installer in Sydney, owning "how to choose a security camera system" in the featured snippet = hundreds of extra clicks every month.\n\nHow to get it:\n✅ Answer the question directly in your first sentence\n✅ Use a clear list or table format\n✅ Add FAQ schema to your page\n✅ Keep answers between 40–60 words\n\nWe got 3.4× more featured snippets for security clients using this method.\n\nSave this post — you\'ll want it later 🔖',
     'Save this for your next content update','#FeaturedSnippet #SecuritySEO #AEO #CCTV #SecurityMarketing #GoogleSEO #ContentMarketing #SecurityBusiness #SEOTips #AustralianSEO',
     'Carousel','Slide 1: What is position zero | Slide 2: Featured snippet example | Slide 3: 4 steps | Slide 4: Security example | Slide 5: Results stat',
     '','Dark green, clean typography, screenshot mockup of Google SERP','To Design','Pending','Planned',''],
    [4,'','Instagram','GEO — Local Entity','Google Knowledge Panel for security businesses',
     '📍 Does your security company have a Google Knowledge Panel? If not, you\'re leaving authority on the table...',
     'A Google Knowledge Panel means Google officially recognises your business as a real, verified entity.\n\nFor security companies this means:\n🔹 Appearing in AI-generated local recommendations\n🔹 Stronger local pack rankings\n🔹 More trust from prospects who research you before calling\n\nWe verify security business entities in 90 days — here\'s the 3-step process we use:\n\n1. Build consistent NAP signals across 15+ directories\n2. Add LocalBusiness + Organization schema\n3. Create brand entity signals (Wikipedia, LinkedIn, industry directories)\n\nComment "KNOWLEDGE" and we\'ll check if your business has one already. 👇',
     'Comment "KNOWLEDGE" for a free check','#GoogleKnowledgePanel #GEO #SecurityMarketing #LocalSEO #SecurityBusiness #EntitySEO #SecurityInstaller #CCTV #AccessControl #AustralianSecurity',
     'Static Post','N/A','60-second reel: screen share showing a security company knowledge panel forming step by step','Clean blue background, knowledge graph visual','To Design','Pending','Planned',''],
    [5,'','Instagram','Case Study / Proof','+180% organic traffic for a security installer',
     '📈 +180% organic traffic in 12 months. Here\'s exactly what we did for a Sydney CCTV installer...',
     'When they came to us, they were ranking on page 3 for most of their core keywords.\n\nNo local SEO. No schema. A website Google barely knew existed.\n\n12 months later:\n📈 +180% organic traffic\n📞 3× more inbound calls per month\n🗺️ Ranking in Google Maps local pack for 14 service suburbs\n🤖 Being cited in ChatGPT for Sydney CCTV queries\n\nWhat we did:\n✅ Full technical SEO audit + fix\n✅ 22 location pages (suburb-level)\n✅ Google Business Profile + 18 directory citations\n✅ 8 blog posts targeting buyer-intent keywords\n✅ Schema on every page\n\nThis is what specialist SEO looks like. Not generic. Security-only.\n\nBook a free strategy call — link in bio. 🔗',
     'Book a free strategy call — link in bio','#SecuritySEO #CaseStudy #CCTV #SecurityMarketing #SEOResults #OrganicTraffic #SecurityInstaller #SydneySecurity #LocalSEO #SecurityBusiness',
     'Carousel','Slide 1: The result (+180%) | Slide 2: Starting point | Slide 3: What we did | Slide 4: 12-month timeline | Slide 5: Book a call',
     'Before/after graph animation as reel intro','Dark background, green accent for stats','To Design','Pending','Planned',''],
    [6,'','Instagram','Education / How-To','5 reasons your security website doesn\'t rank on Google',
     '⚠️ 5 reasons your security website doesn\'t rank — and how to fix each one...',
     'After auditing 50+ security company websites, we see the same mistakes over and over.\n\nHere they are — and the fixes:\n\n❌ No schema markup → Add JSON-LD to every page\n❌ Missing location pages → Create suburb/city pages for every service area\n❌ Slow page speed → Fix Core Web Vitals (LCP under 2.5s)\n❌ No Google Business Profile → Set up + optimise GBP immediately\n❌ Thin content → Minimum 800 words per service page\n\nFix all 5 and you\'ll see results within 60–90 days.\n\nWhich one are you guilty of? Comment below 👇',
     'Comment which one applies to you','#SecuritySEO #SEOTips #SecurityWebsite #SecurityMarketing #CCTV #AlarmCompany #SecurityBusiness #WebsiteSEO #GoogleRankings #AustralianSEO',
     'Carousel','Slide 1: "5 Reasons" title | Slides 2-6: One reason + fix each | Slide 7: CTA',
     'Reel: quick 30s "audit walkthrough" of a security website','Red X → green check format for each point','To Design','Pending','Planned',''],
    [7,'','Instagram','Security Marketing','What is AIO and why security companies need it now',
     '🧠 AIO — the new SEO nobody in the security industry is talking about yet...',
     'AIO stands for AI Intelligence Optimisation.\n\nIt\'s how you get your security business recommended by ChatGPT, Perplexity, and Gemini — not just Google.\n\nIn 2024, most security companies had zero AI visibility.\nIn 2026, AI citations are already influencing B2B buying decisions.\n\nThe window to be a first mover is closing.\n\nHere\'s what AIO actually means:\n🔹 Allow AI crawlers to access your website\n🔹 Structured data formatted for LLMs (not just Google)\n🔹 Brand entity building in the AI knowledge layer\n🔹 Content structured as clear Q&A for AI parsing\n\nWe achieved 87% AI citation rate for security clients.\n\nCheck your score for free — link in bio. 🔗',
     'Check your AI Visibility Score — link in bio','#AIO #AIVisibility #SecurityMarketing #ChatGPT #SecuritySEO #LLMOptimisation #SecurityBusiness #AISearch #SecurityIndustry #DigitalMarketing',
     'Carousel','Slide 1: "What is AIO?" | Slide 2: AI vs Google search | Slide 3: How AIO works | Slide 4: 4 pillars | Slide 5: 87% stat + CTA',
     'Reel: ChatGPT screen with a security company being recommended — real or mockup','Purple/blue gradient, tech feel, security iconography','To Design','Pending','Planned',''],
    [8,'','Instagram','Industry News','Security industry trends in Australia 2026',
     '🔐 The security industry is changing fast. Here\'s what Australian security businesses need to know in 2026...',
     'The biggest shifts happening in Australian security right now:\n\n1️⃣ Cloud-based security systems overtaking on-premise (VSaaS growing 18% YoY)\n2️⃣ AI-powered CCTV analytics becoming standard for commercial clients\n3️⃣ Mandatory monitoring requirements tightening in commercial properties\n4️⃣ Cybersecurity converging with physical security (more hybrid deals)\n5️⃣ B2B buyers using AI to shortlist security vendors — before they Google anything\n\nThe businesses winning in 2026 are investing in both product quality AND digital visibility.\n\nWhich of these affects your business most? 👇',
     'Tell us which trend affects you most','#SecurityIndustry #SecurityTrends2026 #AustralianSecurity #SecurityBusiness #CCTV #AccessControl #SecurityMarketing #SecuritySEO #PhysicalSecurity #SecurityTech',
     'Carousel','Slide 1: "Security in 2026" title | Slides 2-6: One trend each | Slide 7: How to respond + CTA',
     'Reel: fast-cut through 5 trend visuals with text overlay','News-style layout, Australian flag accent','To Design','Pending','Planned',''],
  ];

  if (ideas.length > 0) {
    sh.getRange(3, 1, ideas.length, cols.length).setValues(ideas);
  }

  // Dropdowns
  addDropdown(sh, 3, 3, 200, ['Instagram','LinkedIn','Facebook','TikTok','YouTube Shorts','Pinterest']);
  addDropdown(sh, 3, 4, 200, pillars);
  addDropdown(sh, 3, 10, 200, ['Static Post','Carousel','Reel','Story','Poll','All Formats']);
  addDropdown(sh, 3, 14, 200, ['To Design','Designing','Designed','Revision','Approved']);
  addDropdown(sh, 3, 15, 200, ['Pending','In Review','Approved','Rejected']);
  addDropdown(sh, 3, 16, 200, ['Planned','Scheduled','Posted','Archived']);

  colorByStatus(sh, 3, 16, 200, {
    'Posted':    C.greenLight,
    'Scheduled': C.yellowLight,
    'Planned':   C.blueLight,
    'Archived':  C.grayLight,
  });
  colorByStatus(sh, 3, 14, 200, {
    'Approved':  C.greenLight,
    'Designing': C.yellowLight,
    'Revision':  C.orangeLight,
    'To Design': C.blueLight,
  });

  altRows(sh, 3, 150, cols.length);
  freezeAndFormat(sh, 2, 1);

  setColWidths(sh, [35, 110, 100, 160, 220, 280, 400, 200, 300, 110, 250, 250, 200, 110, 110, 110, 180]);
}

// ════════════════════════════════════════════════════════════
// 5. WEB DESIGN & DEV
// ════════════════════════════════════════════════════════════
function buildWebDesignDev(ss) {
  const sh = getOrCreate(ss, '🖥️ Web Design & Dev');
  sh.setTabColor(C.purple);

  sectionTitle(sh, 1, 1, '🖥️ SecurityBlogs — Web Design & Development Issue Tracker', C.headerDark, 10);
  sh.setRowHeight(1, 36);

  const cols = ['#', 'Page / Section', 'Issue Category', 'Issue Description',
    'Recommendation', 'Priority', 'Effort (hrs)', 'Status', 'Assigned To', 'Due Date', 'Notes'];
  headerRow(sh, 2, cols, C.headerMid, C.white);

  const data = [
    [1, 'Homepage', 'Core Web Vitals', 'LCP > 3.2s on mobile', 'Optimise hero image to WebP, add lazy loading below fold', 'Critical', 4, 'Planned', 'Dev', '', ''],
    [2, 'All Service Pages', 'Schema', 'Missing ProfessionalService schema on 5 service pages', 'Add JSON-LD ProfessionalService schema to each service page', 'High', 2, 'Planned', 'Yousif', '', ''],
    [3, 'Homepage', 'CTA', 'Primary CTA button not visible above fold on mobile', 'Move CTA above fold on mobile breakpoint', 'High', 1, 'Planned', 'Dev', '', ''],
    [4, '/services/aio', 'Content', 'AI Visibility tool not loading on slow connections', 'Add loading state and fallback text for Spline 3D component', 'High', 3, 'Planned', 'Dev', '', ''],
    [5, 'All Pages', 'Mobile', 'Navigation hamburger menu z-index issue on iOS Safari', 'Fix z-index stacking context for mobile nav overlay', 'High', 2, 'Planned', 'Dev', '', ''],
    [6, '/contact', 'Conversion', 'Form submit button lacks loading/confirmation state', 'Add spinner and success message after form submission', 'Medium', 1, 'Planned', 'Dev', '', ''],
    [7, 'All Blog Posts', 'UX', 'No estimated reading time shown', 'Add reading time calculator to blog post header', 'Low', 1, 'Planned', 'Dev', '', ''],
    [8, '/knowledge-hub', 'UX', 'Category filter resets on back navigation', 'Persist filter state in URL parameters', 'Medium', 2, 'Planned', 'Dev', '', ''],
    [9, 'All Pages', 'Speed', 'Google Fonts loaded synchronously (render blocking)', 'Switch to font-display: swap and self-host fonts', 'Medium', 2, 'Planned', 'Dev', '', ''],
    [10, '/services/*', 'Design', 'Service page hero images not using consistent aspect ratio', 'Standardise hero image to 16:9, min 1200px wide, WebP', 'Low', 2, 'Planned', 'Yousif', '', ''],
    [11, 'Homepage', 'Conversion', 'No social proof above fold (stats strip below hero)', 'Move stats strip (50+ brands, +180% traffic) to above fold', 'Medium', 1, 'Planned', 'Dev', '', ''],
    [12, 'All Pages', 'Accessibility', 'Some buttons missing aria-label attributes', 'Add descriptive aria-labels to all icon-only buttons', 'Medium', 1, 'Planned', 'Dev', '', ''],
  ];

  sh.getRange(3, 1, data.length, cols.length).setValues(data);

  addDropdown(sh, 3, 3, 200, ['Core Web Vitals','Schema','CTA','Mobile','UX','Speed','Design','Content','Conversion','Accessibility','Bug','Security','Other']);
  addDropdown(sh, 3, 6, 200, ['Critical','High','Medium','Low']);
  addDropdown(sh, 3, 8, 200, ['Planned','In Progress','In Review','Done','Won\'t Fix']);
  addDropdown(sh, 3, 9, 200, ['Dev','Yousif','Designer','Freelancer']);

  colorByStatus(sh, 3, 6, 200, {'Critical': C.redLight, 'High': C.orangeLight, 'Medium': C.yellowLight, 'Low': C.grayLight});
  colorByStatus(sh, 3, 8, 200, {'Done': C.greenLight, 'In Progress': C.yellowLight, 'Planned': C.blueLight, 'Won\'t Fix': C.grayLight});

  altRows(sh, 3, 150, cols.length);
  freezeAndFormat(sh, 2, 1);
  setColWidths(sh, [35, 200, 150, 320, 350, 90, 90, 110, 110, 110, 220]);
}

// ════════════════════════════════════════════════════════════
// 6. BUSINESS LISTINGS
// ════════════════════════════════════════════════════════════
function buildBusinessListings(ss) {
  const sh = getOrCreate(ss, '📍 Business Listings');
  sh.setTabColor(C.orange);

  sectionTitle(sh, 1, 1, '📍 SecurityBlogs — Business Listings & Directory Registration', C.headerDark, 11);
  sh.setRowHeight(1, 36);

  const cols = ['#', 'Directory / Platform', 'Category', 'Country', 'Listing URL',
    'Status', 'Profile URL', 'Login Email', 'Last Updated', 'Verification Type', 'Notes'];
  headerRow(sh, 2, cols, C.headerMid, C.white);

  const listings = [
    [1,'Google Business Profile','Search / Maps','AU','https://business.google.com','Active','','info@securityblogs.com.au','','Email / Postcard','Critical — optimise fully'],
    [2,'Bing Places for Business','Search / Maps','AU','https://bingplaces.com','Planned','','','','Email','Import from GBP'],
    [3,'Apple Maps Connect','Maps','AU','https://mapsconnect.apple.com','Planned','','','','Email',''],
    [4,'Yellow Pages Australia','Directory','AU','https://yellowpages.com.au','Planned','','','','Email','Free listing available'],
    [5,'White Pages Australia','Directory','AU','https://whitepages.com.au','Planned','','','','Email',''],
    [6,'True Local','Reviews / Directory','AU','https://truelocal.com.au','Planned','','','','Email',''],
    [7,'hipages','Trade Marketplace','AU','https://hipages.com.au','Planned','','','','Phone','Relevant for security installer clients'],
    [8,'Oneflare','Trade Marketplace','AU','https://oneflare.com.au','Planned','','','','Phone',''],
    [9,'Local Search','Directory','AU','https://localsearch.com.au','Planned','','','','Email',''],
    [10,'Hotfrog Australia','Directory','AU','https://hotfrog.com.au','Planned','','','','Email','Low priority'],
    [11,'ASIAL Member Directory','Industry','AU','https://asial.com.au','Planned','','','','ASIAL Membership','High authority backlink'],
    [12,'LinkedIn Company Page','Social / Professional','Global','https://linkedin.com/company','Active','','','','Email','Keep updated with services'],
    [13,'Facebook Business Page','Social','AU','https://facebook.com','Active','','','','Email',''],
    [14,'Crunchbase','Tech / Business','Global','https://crunchbase.com','Planned','','','','Email','Good entity signal for AI'],
    [15,'Google Search Console','Webmaster','AU','https://search.google.com/search-console','Active','','info@securityblogs.com.au','','Google Account','Verify sitemap submitted'],
    [16,'Bing Webmaster Tools','Webmaster','AU','https://webmaster.tools.bing.com','Planned','','','','Microsoft Account',''],
    [17,'Clutch.co','B2B Reviews','Global','https://clutch.co','Planned','','','','Email','Good for agency credibility'],
    [18,'DesignRush','Agency Directory','Global','https://designrush.com','Planned','','','','Email',''],
    [19,'Trustpilot','Reviews','AU','https://trustpilot.com','Planned','','','','Email',''],
    [20,'ProductHunt','Product Launch','Global','https://producthunt.com','Planned','','','','Email','When launching free tools'],
  ];

  sh.getRange(3, 1, listings.length, cols.length).setValues(listings);

  addDropdown(sh, 3, 6, 200, ['Active','Planned','Submitted','Verified','Needs Update','Inactive','Not Applicable']);
  addDropdown(sh, 3, 10, 200, ['Email','Phone','Postcard','SMS','Google Account','Microsoft Account','ASIAL Membership','Instant']);

  colorByStatus(sh, 3, 6, 200, {
    'Active':        C.greenLight,
    'Verified':      C.greenLight,
    'Submitted':     C.yellowLight,
    'Planned':       C.blueLight,
    'Needs Update':  C.orangeLight,
    'Inactive':      C.grayLight,
  });

  altRows(sh, 3, 150, cols.length);
  freezeAndFormat(sh, 2, 1);
  setColWidths(sh, [35, 220, 150, 80, 260, 110, 260, 200, 110, 160, 250]);
}

// ════════════════════════════════════════════════════════════
// 7. GUEST POSTING
// ════════════════════════════════════════════════════════════
function buildGuestPosting(ss) {
  const sh = getOrCreate(ss, '🔗 Guest Posting');
  sh.setTabColor(C.blue);

  sectionTitle(sh, 1, 1, '🔗 SecurityBlogs — Guest Posting & Outreach Board', C.headerDark, 13);
  sh.setRowHeight(1, 36);

  const cols = ['#', 'Website', 'Domain', 'DR', 'Monthly Traffic', 'Niche / Category',
    'Contact Name', 'Pitch Date', 'Response', 'Target Page on SecBlogs',
    'Anchor Text', 'Topic Pitched', 'Status', 'Published URL', 'Published Date', 'Notes'];
  headerRow(sh, 2, cols, C.headerMid, C.white);

  const data = [
    [1,'securityblogs.com.au','securityblogs.com.au',35,'Internal','Security Marketing','Yousif','','','','','','Internal','','','Own platform — use for client backlinks'],
    [2,'sen.news','sen.news',42,'10k+','Security Industry','SEN Editorial','','No response','','','Security SEO for Australian Installers','Planned','','',''],
    [3,'securityinsider.com.au','securityinsider.com.au',38,'8k+','Security Industry','Editor','','','','','','AIO for Security Businesses','Planned','',''],
    [4,'ifsecglobal.com','ifsecglobal.com',55,'50k+','Security Industry','UK Editorial','','','','','','AI Visibility for Physical Security Companies','Planned','',''],
    [5,'securitymagazine.com','securitymagazine.com',58,'80k+','Security Industry (US)','US Editor','','','','','','How Security SaaS Vendors Are Using AIO in 2026','Planned','',''],
    [6,'securityinfowatch.com','securityinfowatch.com',50,'40k+','Security Industry (US)','Editor','','','','','','GEO — The New Local SEO for Security Installers','Planned','',''],
  ];

  sh.getRange(3, 1, data.length, cols.length).setValues(data);

  addDropdown(sh, 3, 9,  200, ['No response','Positive','Interested','Rejected','Published','Ghosted']);
  addDropdown(sh, 3, 13, 200, ['Planned','Pitching','Negotiating','Writing','In Review','Published','Rejected']);

  colorByStatus(sh, 3, 13, 200, {
    'Published':    C.greenLight,
    'Writing':      C.yellowLight,
    'Pitching':     C.blueLight,
    'Negotiating':  C.blueLight,
    'In Review':    C.orangeLight,
    'Planned':      C.grayLight,
    'Rejected':     C.redLight,
  });

  altRows(sh, 3, 150, cols.length);
  freezeAndFormat(sh, 2, 1);
  setColWidths(sh, [35, 220, 220, 50, 100, 150, 130, 110, 110, 220, 180, 280, 110, 280, 110, 220]);
}

// ════════════════════════════════════════════════════════════
// 8. BLOG POSTING
// ════════════════════════════════════════════════════════════
function buildBlogPosting(ss) {
  const sh = getOrCreate(ss, '✍️ Blog Posting');
  sh.setTabColor(C.green);

  sectionTitle(sh, 1, 1, '✍️ SecurityBlogs — Blog Content Workflow  |  Idea → Draft → Review → Published', C.headerDark, 12);
  sh.setRowHeight(1, 36);

  const cols = ['#', 'Topic / Working Title', 'Primary Keyword', 'Intent',
    'Cluster', 'Status', 'Author', 'Brief Date', 'Draft Date',
    'Review Date', 'Publish Date', 'Live URL', 'Word Count', 'Notes'];
  headerRow(sh, 2, cols, C.headerMid, C.white);

  const data = [
    [1,'The Complete Guide to SEO for Security Companies in Australia','security SEO','Informational','Security SEO','Planned','Yousif','','','','','',5000,'Cluster pillar page — highest priority'],
    [2,'Local SEO for CCTV Installers: A Complete Guide','local SEO for CCTV companies','Informational','Security SEO','Planned','Yousif','','','','','',2000,'Supporting post — cluster 1'],
    [3,'AEO for Security Companies: Win Featured Snippets and AI Overviews','AEO for security companies','Commercial','AEO','Planned','Yousif','','','','','',3500,'Pillar — AEO cluster'],
    [4,'How to Get Your Security Company Cited by ChatGPT','get cited by ChatGPT security','Informational','AI Visibility','Planned','Yousif','','','','','',2000,'High demand — publish first'],
    [5,'GEO for Security Companies: Build Local Entity Authority in 90 Days','GEO SEO for security','Commercial','GEO','Planned','Yousif','','','','','',3500,'Pillar — GEO cluster'],
    [6,'How AI Assistants Choose Which Security Companies to Recommend','how AI recommends security','Informational','AI Visibility','Planned','Yousif','','','','','',2000,'High traffic potential'],
    [7,'Security Company Google Ads: A Complete Guide for Australian Businesses','Google Ads for security companies','Commercial','Security Marketing','Planned','Yousif','','','','','',2500,'Service-supporting content'],
    [8,'What Is AIO in SEO? — AI Intelligence Optimisation Explained','what is AIO in SEO','Informational','AI Visibility','Planned','Yousif','','','','','',1500,'Glossary/definition post'],
    [9,'Keyword Research for Security Companies: Step-by-Step Guide','keyword research security companies','Informational','Security SEO','Planned','Yousif','','','','','',2500,'Supporting post'],
    [10,'How to Rank in Google Maps for Security Keywords','rank Google Maps security','Informational','Security SEO','Planned','Yousif','','','','','',2000,'High intent, local focus'],
  ];

  sh.getRange(3, 1, data.length, cols.length).setValues(data);

  addDropdown(sh, 3, 4,  200, ['Informational','Commercial','Transactional','Navigational']);
  addDropdown(sh, 3, 5,  200, ['Security SEO','AEO','GEO','AI Visibility','Security Marketing','Guest Posting','Cybersecurity PR','Other']);
  addDropdown(sh, 3, 6,  200, ['Idea','Brief Ready','Writing','Draft Done','In Review','Approved','Scheduled','Published','Archived']);
  addDropdown(sh, 3, 7,  200, ['Yousif','Freelancer','Agency','AI-Assisted']);

  colorByStatus(sh, 3, 6, 200, {
    'Published':   C.greenLight,
    'Scheduled':   C.greenLight,
    'Approved':    C.blueLight,
    'In Review':   C.orangeLight,
    'Draft Done':  C.yellowLight,
    'Writing':     C.yellowLight,
    'Brief Ready': C.blueLight,
    'Idea':        C.grayLight,
    'Archived':    C.grayLight,
  });

  // Progress tracker formula — auto % complete
  sh.getRange('N2').setValue('% Complete').setBackground(C.headerMid).setFontColor(C.white).setFontWeight('bold');
  for (let r = 3; r <= 200; r++) {
    sh.getRange(r, 14).setFormula(
      '=IFERROR(IF(F' + r + '="Published",100,IF(F' + r + '="Scheduled",90,IF(F' + r + '="Approved",80,IF(F' + r + '="In Review",60,IF(F' + r + '="Draft Done",50,IF(F' + r + '="Writing",30,IF(F' + r + '="Brief Ready",15,IF(F' + r + '="Idea",5,0)))))))),"–")'
    ).setHorizontalAlignment('center');
  }

  altRows(sh, 3, 150, 14);
  freezeAndFormat(sh, 2, 1);
  setColWidths(sh, [35, 320, 240, 110, 140, 110, 100, 100, 100, 100, 110, 280, 90, 90]);
}

// ════════════════════════════════════════════════════════════
// 9. LINK BUILDING
// ════════════════════════════════════════════════════════════
function buildLinkBuilding(ss) {
  const sh = getOrCreate(ss, '🏗️ Link Building');
  sh.setTabColor(C.orange);

  sectionTitle(sh, 1, 1, '🏗️ SecurityBlogs — Link Building Tracker', C.headerDark, 12);
  sh.setRowHeight(1, 36);

  const cols = ['#', 'Target Page (Our Site)', 'Target Keyword', 'Link Type',
    'Anchor Text', 'Source Website', 'Source DR', 'Status',
    'Date Acquired', 'Do-Follow?', 'Outreach Contact', 'Notes'];
  headerRow(sh, 2, cols, C.headerMid, C.white);

  const data = [
    [1,'/services/security-seo','security SEO','Guest Post','security SEO services','sen.news',42,'Planned','','Yes','','Target SEN editorial'],
    [2,'/services/aio','AI visibility for security','Guest Post','AI visibility for security companies','ifsecglobal.com',55,'Planned','','Yes','','Pitch AI Visibility article'],
    [3,'/','SecurityBlogs','Directory','SecurityBlogs','asial.com.au',48,'Planned','','Yes','','ASIAL member directory listing'],
    [4,'/services/geo','GEO SEO','Niche Edit','GEO for security companies','securityinsider.com.au',38,'Planned','','Yes','','Contact editor re: adding link to existing article'],
    [5,'/knowledge-hub/security-industry-seo/complete-guide-security-seo','security SEO guide','Resource Link','complete guide to security SEO','securitymagazine.com',58,'Planned','','Yes','','Resource page outreach'],
    [6,'/services/security-seo','SEO for security installers','Citation','security marketing agency','localsearch.com.au',35,'Planned','','Yes','','Directory citation'],
    [7,'/services/google-ads','Google Ads for security','Guest Post','Google Ads for security companies','securityinfowatch.com',50,'Planned','','Yes','','US market link'],
    [8,'/ai-visibility-center','AI visibility','Press / PR','AI visibility centre for security','itnews.com.au',60,'Planned','','Yes','','PR announcement for AI Visibility tool'],
  ];

  sh.getRange(3, 1, data.length, cols.length).setValues(data);

  addDropdown(sh, 3, 4,  200, ['Guest Post','Niche Edit','Directory','Resource Link','Citation','PR / Press','Sponsored','Broken Link']);
  addDropdown(sh, 3, 8,  200, ['Planned','Outreach Sent','In Progress','Acquired','Published','Rejected','Lost']);
  addDropdown(sh, 3, 10, 200, ['Yes','No','Unknown']);

  colorByStatus(sh, 3, 8, 200, {
    'Acquired':       C.greenLight,
    'Published':      C.greenLight,
    'In Progress':    C.yellowLight,
    'Outreach Sent':  C.blueLight,
    'Planned':        C.grayLight,
    'Rejected':       C.redLight,
    'Lost':           C.redLight,
  });

  altRows(sh, 3, 150, cols.length);
  freezeAndFormat(sh, 2, 1);
  setColWidths(sh, [35, 280, 200, 120, 220, 200, 80, 120, 110, 90, 160, 220]);
}

// ════════════════════════════════════════════════════════════
// 10. CONTENT OPPORTUNITIES (GSC)
// ════════════════════════════════════════════════════════════
function buildContentOpportunities(ss) {
  const sh = getOrCreate(ss, '🔍 Content Opportunities');
  sh.setTabColor(C.yellow);

  sectionTitle(sh, 1, 1, '🔍 Content Opportunities — Paste Google Search Console Data Here (Queries Export)', C.headerDark, 13);
  sh.setRowHeight(1, 36);

  // Instruction row
  sh.getRange('A2:M2').merge()
    .setValue('HOW TO USE: In Google Search Console → Performance → Search Results → Queries → Export CSV → Paste data from row 4 onwards. Formulas auto-classify opportunities.')
    .setBackground(C.yellowLight).setFontColor(C.headerDark).setFontSize(9).setWrap(true)
    .setVerticalAlignment('middle');
  sh.setRowHeight(2, 36);

  const cols = ['Query', 'Clicks', 'Impressions', 'CTR %', 'Position',
    'Opportunity Type', 'Target Page', 'Action Required', 'Priority', 'Status',
    'Est. Traffic Gain', 'Cluster', 'Notes'];
  headerRow(sh, 3, cols, C.headerMid, C.white);

  // Auto-classification formulas for rows 4–500
  for (let r = 4; r <= 200; r++) {
    // Opportunity Type (col F)
    sh.getRange(r, 6).setFormula(
      '=IFERROR(IF(AND(E' + r + '>10,E' + r + '<21,C' + r + '>100),"🏆 Quick Win",' +
      'IF(AND(E' + r + '>=4,E' + r + '<=10,D' + r + '<0.05,C' + r + '>200),"🎯 Low CTR Fix",' +
      'IF(AND(E' + r + '>30,C' + r + '>50),"📝 New Content",' +
      'IF(AND(E' + r + '>=1,E' + r + '<=10,B' + r + '>50),"🔗 Internal Link Boost",' +
      'IF(B' + r + '>0,"📊 Monitor","–"))))),"")'
    ).setWrap(false);

    // Priority (col I)
    sh.getRange(r, 9).setFormula(
      '=IFERROR(IF(F' + r + '="🏆 Quick Win","High",' +
      'IF(F' + r + '="🎯 Low CTR Fix","High",' +
      'IF(F' + r + '="📝 New Content","Medium",' +
      'IF(F' + r + '="🔗 Internal Link Boost","Medium","Low")))),"")'
    );

    // Est Traffic Gain (col K) — rough estimate
    sh.getRange(r, 11).setFormula(
      '=IFERROR(IF(C' + r + '>0,ROUND(C' + r + '*0.1,0),""),"–")'
    ).setHorizontalAlignment('center');
  }

  // Sample GSC data
  const gscSample = [
    ['security seo', 12, 450, 0.027, 8.3, '','', 'Improve meta description CTR + add FAQ schema','','Planned','','Security SEO','Close to page 1 — optimise now'],
    ['seo for security companies', 8, 320, 0.025, 9.1, '','', 'Add internal links from blog posts to service page','','Planned','','Security SEO',''],
    ['cctv installer sydney seo', 3, 180, 0.017, 14.2, '','', 'Create dedicated blog post targeting this keyword','','Planned','','Security SEO','No existing page'],
    ['what is aio seo', 0, 210, 0, 22.4, '','', 'Create definition page + FAQ schema','','Planned','','AI Visibility','Zero clicks — needs page'],
    ['ai visibility for security businesses', 2, 140, 0.014, 11.8, '','', 'Strengthen AIO service page with more content','','Planned','','AI Visibility',''],
    ['security marketing agency australia', 15, 380, 0.039, 6.2, '','', 'Update meta title + description for better CTR','','Planned','','Security Marketing','Good position, low CTR'],
    ['geo seo', 1, 95, 0.011, 18.3, '','', 'Create GEO pillar page','','Planned','','GEO','Need content'],
    ['guest posting security industry', 5, 160, 0.031, 7.8, '','', 'Add internal links + update page content','','Planned','','Guest Posting',''],
  ];

  sh.getRange(4, 1, gscSample.length, 13).setValues(gscSample);

  // Format CTR as percentage
  sh.getRange('D4:D500').setNumberFormat('0.0%');

  // Colour code opportunity types
  const oppRules = sh.getConditionalFormatRules();
  const oppRange = sh.getRange('F4:F500');
  [
    ['🏆 Quick Win',          C.greenLight],
    ['🎯 Low CTR Fix',        C.blueLight],
    ['📝 New Content',        C.purpleLight],
    ['🔗 Internal Link Boost',C.yellowLight],
    ['📊 Monitor',            C.grayLight],
  ].forEach(function(pair) {
    oppRules.push(SpreadsheetApp.newConditionalFormatRule()
      .whenTextContains(pair[0]).setBackground(pair[1])
      .setRanges([oppRange]).build());
  });
  sh.setConditionalFormatRules(oppRules);

  addDropdown(sh, 4, 10, 200, ['Planned','In Progress','Done','Monitor']);

  altRows(sh, 4, 150, cols.length);
  freezeAndFormat(sh, 3, 1);
  setColWidths(sh, [280, 70, 100, 70, 70, 160, 260, 280, 80, 110, 100, 140, 220]);
}

// ════════════════════════════════════════════════════════════
// 11. SCHEMA BOARD
// ════════════════════════════════════════════════════════════
function buildSchemaBoard(ss) {
  const sh = getOrCreate(ss, '🗂️ Schema Board');
  sh.setTabColor(C.purple);

  sectionTitle(sh, 1, 1, '🗂️ SecurityBlogs — Schema Markup Tracker (JSON-LD)', C.headerDark, 9);
  sh.setRowHeight(1, 36);

  const cols = ['#', 'URL / Page', 'Page Type', 'Schema Types Required',
    'Implementation Status', 'Validation Status', 'Rich Result Type', 'Last Validated', 'Notes'];
  headerRow(sh, 2, cols, C.headerMid, C.white);

  const schemaData = [
    [1, 'https://securityblogs.com.au/', 'Homepage', 'Organization, WebSite, BreadcrumbList', 'Done', 'Validated', 'Sitelinks SearchBox', '', 'Sitewide schema in layout.tsx'],
    [2, 'https://securityblogs.com.au/services/security-seo', 'Service', 'ProfessionalService, BreadcrumbList, FAQPage', 'In Progress', 'Pending', 'FAQ Rich Result', '', 'Add FAQPage schema — 6 Q&As ready'],
    [3, 'https://securityblogs.com.au/services/aio', 'Service', 'ProfessionalService, BreadcrumbList, FAQPage', 'Planned', 'Not Tested', 'FAQ Rich Result', '', ''],
    [4, 'https://securityblogs.com.au/services/aeo', 'Service', 'ProfessionalService, BreadcrumbList, FAQPage', 'Planned', 'Not Tested', 'FAQ Rich Result', '', ''],
    [5, 'https://securityblogs.com.au/services/geo', 'Service', 'ProfessionalService, LocalBusiness, BreadcrumbList, FAQPage', 'Planned', 'Not Tested', 'FAQ Rich Result', '', 'LocalBusiness for GEO service page'],
    [6, 'https://securityblogs.com.au/services/google-ads', 'Service', 'ProfessionalService, BreadcrumbList, FAQPage', 'Planned', 'Not Tested', 'FAQ Rich Result', '', ''],
    [7, 'https://securityblogs.com.au/services/bing-ads', 'Service', 'ProfessionalService, BreadcrumbList, FAQPage', 'Planned', 'Not Tested', 'FAQ Rich Result', '', ''],
    [8, 'https://securityblogs.com.au/services/web-design', 'Service', 'ProfessionalService, BreadcrumbList, FAQPage', 'Planned', 'Not Tested', 'FAQ Rich Result', '', ''],
    [9, 'https://securityblogs.com.au/knowledge-hub/blogs/[slug]', 'Blog Post', 'BlogPosting, BreadcrumbList, FAQPage (if FAQ)', 'In Progress', 'Pending', 'Article + FAQ', '', 'Apply to all blog posts via CMS'],
    [10, 'https://securityblogs.com.au/case-studies/[slug]', 'Case Study', 'Article, BreadcrumbList', 'Planned', 'Not Tested', 'Article', '', ''],
    [11, 'https://securityblogs.com.au/about-us', 'About', 'Organization, Person (Yousif Jonaid), BreadcrumbList', 'Planned', 'Not Tested', 'None (entity signal)', '', 'Person schema with knowsAbout'],
    [12, 'https://securityblogs.com.au/contact', 'Contact', 'LocalBusiness, ContactPoint, BreadcrumbList', 'Planned', 'Not Tested', 'None', '', ''],
    [13, 'https://securityblogs.com.au/publish-with-us/guest-posting', 'Publishing', 'Service, BreadcrumbList, FAQPage', 'Planned', 'Not Tested', 'FAQ Rich Result', '', ''],
    [14, 'https://securityblogs.com.au/free-tools/ai-visibility-score', 'Tool', 'WebApplication, BreadcrumbList', 'Planned', 'Not Tested', 'None', '', 'WebApplication schema for free tool'],
  ];

  sh.getRange(3, 1, schemaData.length, cols.length).setValues(schemaData);

  addDropdown(sh, 3, 3, 200, ['Homepage','Service','Blog Post','Case Study','Category','Location','FAQ','About','Contact','Tool','Publishing','Other']);
  addDropdown(sh, 3, 5, 200, ['Done','In Progress','Planned','Not Started']);
  addDropdown(sh, 3, 6, 200, ['Validated','Pending','Not Tested','Has Errors','Has Warnings']);

  colorByStatus(sh, 3, 5, 200, {'Done': C.greenLight, 'In Progress': C.yellowLight, 'Planned': C.blueLight, 'Not Started': C.grayLight});
  colorByStatus(sh, 3, 6, 200, {'Validated': C.greenLight, 'Pending': C.yellowLight, 'Not Tested': C.grayLight, 'Has Errors': C.redLight, 'Has Warnings': C.orangeLight});

  altRows(sh, 3, 150, cols.length);
  freezeAndFormat(sh, 2, 1);
  setColWidths(sh, [35, 380, 120, 300, 140, 130, 180, 120, 280]);
}
