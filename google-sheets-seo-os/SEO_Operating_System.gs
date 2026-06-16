/**
 * SecurityBlogs — SEO Operating System (Google Apps Script)
 * Optimised build: batch operations only, no row-by-row loops.
 * Run: buildSEOOperatingSystem()
 * ─────────────────────────────────────────────────────────
 */

// ── COLOUR PALETTE ───────────────────────────────────────
var C = {
  primary:     '#1e5fe0',
  headerDark:  '#0f172a',
  headerMid:   '#1e293b',
  white:       '#ffffff',
  green:       '#16a34a',
  greenLight:  '#dcfce7',
  yellow:      '#d97706',
  yellowLight: '#fef3c7',
  red:         '#dc2626',
  redLight:    '#fee2e2',
  blue:        '#2563eb',
  blueLight:   '#dbeafe',
  purple:      '#7c3aed',
  purpleLight: '#ede9fe',
  orange:      '#ea580c',
  orangeLight: '#ffedd5',
  gray:        '#6b7280',
  grayLight:   '#f8fafc',
  pink:        '#db2777'
};

// ── MAIN ─────────────────────────────────────────────────
function buildSEOOperatingSystem() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.rename('SecurityBlogs — SEO Operating System');

  var blank = ss.getSheetByName('Sheet1');

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

  if (blank) { try { ss.deleteSheet(blank); } catch(e) {} }
  ss.setActiveSheet(ss.getSheetByName('📊 Dashboard'));

  SpreadsheetApp.getUi().alert(
    '✅ SEO Operating System built!\n\n11 tabs ready.\nStart at 📊 Dashboard.\n\nSecurityBlogs — SEO Master'
  );
}

// ════════════════════════════════════════════════════════
// HELPERS
// ════════════════════════════════════════════════════════

function getOrCreate(ss, name) {
  var sh = ss.getSheetByName(name);
  if (!sh) sh = ss.insertSheet(name);
  sh.clear();
  sh.clearConditionalFormatRules();
  return sh;
}

// Styled header row — single batch call
function headerRow(sh, row, cols) {
  var r = sh.getRange(row, 1, 1, cols.length);
  r.setValues([cols])
   .setBackground(C.headerMid)
   .setFontColor(C.white)
   .setFontWeight('bold')
   .setFontSize(10)
   .setWrap(true)
   .setVerticalAlignment('middle');
  sh.setFrozenRows(row);
  sh.setRowHeight(row, 38);
}

// Merged section title
function sectionTitle(sh, row, col, text, bg, span) {
  var r = sh.getRange(row, col, 1, span || 1);
  if (span > 1) r.merge();
  r.setValue(text)
   .setBackground(bg || C.primary)
   .setFontColor(C.white)
   .setFontWeight('bold')
   .setFontSize(11)
   .setVerticalAlignment('middle')
   .setHorizontalAlignment('center');
  sh.setRowHeight(row, 36);
}

// Column widths batch
function setCols(sh, widths) {
  widths.forEach(function(w, i) { sh.setColumnWidth(i + 1, w); });
}

// Dropdown validation
function addDV(sh, row, col, rows, list) {
  sh.getRange(row, col, rows, 1).setDataValidation(
    SpreadsheetApp.newDataValidation().requireValueInList(list, true).setAllowInvalid(false).build()
  );
}

// Conditional format — text equals
function cfEquals(sh, col, row, numRows, map) {
  var rules = sh.getConditionalFormatRules();
  Object.keys(map).forEach(function(val) {
    rules.push(
      SpreadsheetApp.newConditionalFormatRule()
        .whenTextEqualTo(val)
        .setBackground(map[val])
        .setFontColor(C.headerDark)
        .setRanges([sh.getRange(row, col, numRows, 1)])
        .build()
    );
  });
  sh.setConditionalFormatRules(rules);
}

// Alternate row shading via CF (one API call instead of 150 setBackground calls)
function altRows(sh, startRow, numRows, numCols) {
  var rules = sh.getConditionalFormatRules();
  rules.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenFormulaSatisfied('=MOD(ROW(),2)=0')
      .setBackground('#f1f5f9')
      .setRanges([sh.getRange(startRow, 1, numRows, numCols)])
      .build()
  );
  sh.setConditionalFormatRules(rules);
}

// Build a 2D array of identical formulas (batch setFormulas)
function formulaCol(formula, rows) {
  var out = [];
  for (var i = 0; i < rows; i++) out.push([formula.replace(/#R#/g, String(i + 1))]);
  return out;
}

// ════════════════════════════════════════════════════════
// 1. INSTRUCTIONS
// ════════════════════════════════════════════════════════
function buildInstructions(ss) {
  var sh = getOrCreate(ss, '📋 Instructions');
  sh.setTabColor(C.gray);
  sh.setColumnWidth(1, 230);
  sh.setColumnWidth(2, 580);

  sh.getRange('A1:B1').merge()
    .setValue('SecurityBlogs — SEO Operating System v1.0')
    .setBackground(C.headerDark).setFontColor(C.white).setFontSize(15)
    .setFontWeight('bold').setHorizontalAlignment('center').setVerticalAlignment('middle');
  sh.setRowHeight(1, 48);

  var rows = [
    ['BUILT FOR','SecurityBlogs — securityblogs.com.au'],
    ['PURPOSE','All-in-one SEO management: on-page, off-page, social, listings, schema, content'],
    ['',''],
    ['── TABS ──────────────',''],
    ['📊 Dashboard','Live summary — metrics auto-update from all other sheets'],
    ['✅ SEO Implementation','Every URL tracked: keyword, meta, H1, schema, status + length validators'],
    ['📱 Social Media Board','Instagram planner — 8 posts pre-loaded with hooks, captions, CTAs, hashtags'],
    ['🖥️ Web Design & Dev','UX, mobile, CTA, speed, conversion issue tracker'],
    ['📍 Business Listings','20 Australian directories + global platforms with status'],
    ['🔗 Guest Posting','Outreach pipeline — DR, traffic, pitch, status, published URL'],
    ['✍️ Blog Posting','Full workflow: Idea → Brief → Writing → Draft → Review → Published'],
    ['🏗️ Link Building','All link types: guest posts, niche edits, directories, citations, PR'],
    ['🔍 Content Opportunities','Paste GSC export — formulas auto-classify Quick Wins, Low CTR, Gaps'],
    ['🗂️ Schema Board','Schema type mapping + validation status for every page'],
    ['',''],
    ['── HOW TO START ──────',''],
    ['Step 1','✅ SEO Implementation — add all your URLs and fill in current status'],
    ['Step 2','📱 Social Media Board — fill in scheduled dates and mark Design Status'],
    ['Step 3','🔍 Content Opportunities — export GSC Queries CSV and paste from row 4'],
    ['Step 4','📍 Business Listings — work through the list and mark each Active'],
    ['Step 5','✍️ Blog Posting — add your next 5 blog topics and assign authors'],
    ['Step 6','📊 Dashboard — check weekly for overall progress'],
    ['',''],
    ['── STATUS COLOURS ────',''],
    ['Green','Done / Published / Active / Validated'],
    ['Yellow','In Progress / Draft / Designing / Writing'],
    ['Red','Urgent / Issue / Blocked / Rejected'],
    ['Blue','Planned / Idea / Not Started'],
    ['Grey','Low priority / Archived / N/A'],
    ['',''],
    ['── AUTOMATION ────────',''],
    ['Google Search Console','Export Queries CSV → paste into 🔍 Content Opportunities (row 4+)'],
    ['Make.com','Connect Blog Posting Status column to trigger briefs in Claude/ChatGPT'],
    ['Claude / ChatGPT','Use Hook + Caption + CTA columns as prompts to generate full post copy'],
  ];

  var vals = rows.map(function(r) { return [r[0], r[1]]; });
  sh.getRange(2, 1, vals.length, 2).setValues(vals).setFontSize(9).setWrap(true);

  // Bold the label column
  for (var i = 0; i < rows.length; i++) {
    sh.getRange(i + 2, 1).setFontWeight('bold').setFontColor(C.gray);
    sh.setRowHeight(i + 2, 22);
  }
  sh.setFrozenRows(1);
}

// ════════════════════════════════════════════════════════
// 2. DASHBOARD
// ════════════════════════════════════════════════════════
function buildDashboard(ss) {
  var sh = getOrCreate(ss, '📊 Dashboard');
  sh.setTabColor(C.primary);

  sh.getRange('A1:H1').merge()
    .setValue('📊 SecurityBlogs — SEO Operating System  |  Dashboard')
    .setBackground(C.headerDark).setFontColor(C.white).setFontSize(14)
    .setFontWeight('bold').setHorizontalAlignment('center').setVerticalAlignment('middle');
  sh.setRowHeight(1, 46);

  sh.getRange('A2:H2').merge()
    .setValue('Metrics auto-update from all boards — review weekly')
    .setBackground(C.primary).setFontColor(C.white).setFontSize(10)
    .setHorizontalAlignment('center').setVerticalAlignment('middle');
  sh.setRowHeight(2, 26);

  // Board headers row 4
  var boards = [['✅ SEO Impl.','📱 Social','🖥️ Web Dev','📍 Listings','🔗 Guest Post','✍️ Blogs','🏗️ Links','🗂️ Schema']];
  sh.getRange(4, 1, 1, 8).setValues(boards)
    .setBackground(C.headerMid).setFontColor(C.white).setFontWeight('bold')
    .setFontSize(10).setHorizontalAlignment('center').setVerticalAlignment('middle');
  sh.setRowHeight(4, 40);
  sh.setRowHeight(3, 12);

  // Stat label rows
  var statLabels = [['Total Items'],['✅ Done / Published'],['🔄 In Progress'],['📋 Planned']];
  var statBg = [C.grayLight, C.greenLight, C.yellowLight, C.blueLight];
  statLabels.forEach(function(lbl, i) {
    var row = 5 + i;
    sh.getRange(row, 1).setValue(lbl[0]).setFontWeight('bold').setFontSize(9);
    sh.getRange(row, 1, 1, 8).setBackground(statBg[i]);
    sh.setRowHeight(row, 28);
  });

  // Formula data per board: [sheetName, dataCol, doneValue, inProgressValue]
  var boards2 = [
    ["'✅ SEO Implementation'",  'K', 'Done',      'In Progress'],
    ["'📱 Social Media Board'",  'P', 'Posted',     'Scheduled'],
    ["'🖥️ Web Design & Dev'",   'H', 'Done',      'In Progress'],
    ["'📍 Business Listings'",   'F', 'Active',    'Submitted'],
    ["'🔗 Guest Posting'",       'M', 'Published', 'In Progress'],
    ["'✍️ Blog Posting'",        'F', 'Published', 'Writing'],
    ["'🏗️ Link Building'",      'H', 'Acquired',  'In Progress'],
    ["'🗂️ Schema Board'",       'F', 'Validated', 'In Progress'],
  ];

  boards2.forEach(function(b, i) {
    var col = i + 1;
    var sn  = b[0]; var dc = b[1]; var dv = b[2]; var iv = b[3];
    sh.getRange(5, col).setFormula('=IFERROR(COUNTA(' + sn + '!B3:B300),0)')
      .setHorizontalAlignment('center').setFontSize(13).setFontWeight('bold');
    sh.getRange(6, col).setFormula('=IFERROR(COUNTIF(' + sn + '!' + dc + '3:' + dc + '300,"' + dv + '"),0)')
      .setHorizontalAlignment('center').setFontSize(12).setFontWeight('bold').setFontColor(C.green);
    sh.getRange(7, col).setFormula('=IFERROR(COUNTIF(' + sn + '!' + dc + '3:' + dc + '300,"' + iv + '"),0)')
      .setHorizontalAlignment('center').setFontSize(12).setFontWeight('bold').setFontColor(C.yellow);
    sh.getRange(8, col).setFormula('=IFERROR(COUNTIF(' + sn + '!' + dc + '3:' + dc + '300,"Planned"),0)')
      .setHorizontalAlignment('center').setFontSize(12).setFontWeight('bold').setFontColor(C.blue);
  });

  sh.setRowHeight(9, 16);

  // Quick stats section
  sectionTitle(sh, 10, 1, '📈 Quick Stats (auto-calculated)', C.primary, 3);
  var ql = [
    ['Blogs Published This Month',
     '=IFERROR(COUNTIFS(\'✍️ Blog Posting\'!F3:F300,"Published",\'✍️ Blog Posting\'!K3:K300,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1)),0)'],
    ['Guest Posts Published',
     '=IFERROR(COUNTIF(\'🔗 Guest Posting\'!M3:M300,"Published"),0)'],
    ['Links Acquired',
     '=IFERROR(COUNTIF(\'🏗️ Link Building\'!H3:H300,"Acquired"),0)'],
    ['Business Listings Active',
     '=IFERROR(COUNTIF(\'📍 Business Listings\'!F3:F300,"Active"),0)'],
    ['Schema Pages Validated',
     '=IFERROR(COUNTIF(\'🗂️ Schema Board\'!F3:F300,"Validated"),0)'],
    ['Social Posts Scheduled / Posted',
     '=IFERROR(COUNTIF(\'📱 Social Media Board\'!P3:P300,"Posted")+COUNTIF(\'📱 Social Media Board\'!P3:P300,"Scheduled"),0)'],
    ['SEO Pages Done',
     '=IFERROR(COUNTIF(\'✅ SEO Implementation\'!K3:K300,"Done"),0)'],
    ['Web Issues Resolved',
     '=IFERROR(COUNTIF(\'🖥️ Web Design & Dev\'!H3:H300,"Done"),0)'],
  ];

  ql.forEach(function(row, i) {
    var r = 11 + i;
    sh.getRange(r, 1).setValue(row[0]).setFontSize(9).setFontWeight('bold');
    sh.getRange(r, 2).setFormula(row[1]).setFontSize(13).setFontWeight('bold')
      .setFontColor(C.primary).setHorizontalAlignment('center');
    sh.getRange(r, 3).setValue('→ check the tab').setFontSize(9).setFontColor(C.gray);
    sh.setRowHeight(r, 26);
    if (i % 2 === 0) sh.getRange(r, 1, 1, 3).setBackground(C.grayLight);
  });

  setCols(sh, [200, 180, 160, 150, 150, 140, 150, 160]);
  sh.setFrozenRows(1);
}

// ════════════════════════════════════════════════════════
// 3. SEO IMPLEMENTATION
// ════════════════════════════════════════════════════════
function buildSEOImplementation(ss) {
  var sh = getOrCreate(ss, '✅ SEO Implementation');
  sh.setTabColor(C.green);

  sectionTitle(sh, 1, 1, '✅ SecurityBlogs — SEO Implementation Tracker', C.headerDark, 17);

  var cols = ['#','URL','Page Type','Focus Keyword','Meta Title','Title Len',
    'Meta Description','Desc Len','H1','H1 ✓','Status',
    'Schema Applied','Int. Links','Priority','Assigned','Last Updated','Notes'];
  headerRow(sh, 2, cols);

  var data = [
    [1,'https://securityblogs.com.au/','Homepage','security marketing agency',
     'Security Marketing Agency for the Security Industry | SecurityBlogs','=LEN(E3)',
     'Australia\'s only specialist digital marketing agency for the security industry. SEO, AI visibility & paid media for CCTV and access control. Free audit.','=LEN(G3)',
     'Security Marketing Agency for Australian Security Businesses','=IF(LEN(I3)>0,"✅","❌")',
     'In Progress','Organisation, WebSite',8,'High','Yousif','=TEXT(TODAY(),"dd mmm yyyy")','Review hero CTA'],
    [2,'https://securityblogs.com.au/services/security-seo','Service','security SEO services',
     'Security SEO Services for Australian Security Companies | SecurityBlogs','=LEN(E4)',
     'Specialist Security SEO for CCTV installers, access control integrators & security SaaS vendors. +180% avg organic growth. Book your free audit today.','=LEN(G4)',
     'Security SEO Services for Australian Security Companies','=IF(LEN(I4)>0,"✅","❌")',
     'In Progress','ProfessionalService, FAQ',5,'High','Yousif','=TEXT(TODAY(),"dd mmm yyyy")','Add FAQ schema'],
    [3,'https://securityblogs.com.au/services/aio','Service','AI intelligence optimisation',
     'AIO — AI Intelligence Optimisation for Security Businesses | SecurityBlogs','=LEN(E5)',
     'Get your security business cited by ChatGPT, Perplexity & Gemini. 87% AI citation rate achieved. Book a free AIO strategy call with SecurityBlogs today.','=LEN(G5)',
     'AIO — AI Intelligence Optimisation for Security Companies','=IF(LEN(I5)>0,"✅","❌")',
     'Planned','ProfessionalService, FAQ',3,'High','Yousif','=TEXT(TODAY(),"dd mmm yyyy")',''],
    [4,'https://securityblogs.com.au/services/aeo','Service','AEO AI-enabled optimisation',
     'AEO Services for Security Companies | SecurityBlogs','=LEN(E6)',
     'Win featured snippets and AI Overviews for security keywords. 3.4× more featured answers for security companies. Book your free AEO consultation today.','=LEN(G6)',
     'AEO — AI-Enabled Optimisation for Security Businesses','=IF(LEN(I6)>0,"✅","❌")',
     'Planned','ProfessionalService, FAQ',3,'Medium','Yousif','=TEXT(TODAY(),"dd mmm yyyy")',''],
    [5,'https://securityblogs.com.au/services/geo','Service','GEO geographic entity optimisation',
     'GEO Services for Security Companies | SecurityBlogs','=LEN(E7)',
     'Build local knowledge-graph authority for your security business in 90 days. SecurityBlogs GEO service. Book a free geographic entity strategy call.','=LEN(G7)',
     'GEO — Geographic Entity Optimisation for Security Businesses','=IF(LEN(I7)>0,"✅","❌")',
     'Planned','ProfessionalService, LocalBusiness, FAQ',3,'Medium','Yousif','=TEXT(TODAY(),"dd mmm yyyy")',''],
    [6,'https://securityblogs.com.au/services/google-ads','Service','Google Ads for security companies',
     'Google Ads for Security Companies | SecurityBlogs','=LEN(E8)',
     'Target security buyers on Google Search. 3.2× average ROAS for security installers and integrators. Managed Google Ads campaigns by SecurityBlogs. Book a call.','=LEN(G8)',
     'Google Ads Management for Security Companies','=IF(LEN(I8)>0,"✅","❌")',
     'Planned','ProfessionalService, FAQ',3,'Medium','Yousif','=TEXT(TODAY(),"dd mmm yyyy")',''],
    [7,'https://securityblogs.com.au/services/bing-ads','Service','Bing Ads for security B2B',
     'Bing Ads for Security B2B Companies | SecurityBlogs','=LEN(E9)',
     'Reach B2B security buyers on Microsoft Bing. 41% lower CPC than Google. LinkedIn targeting available. Managed Bing Ads for security businesses. Get started.','=LEN(G9)',
     'Bing Ads for Security B2B Businesses','=IF(LEN(I9)>0,"✅","❌")',
     'Planned','ProfessionalService, FAQ',3,'Low','Yousif','=TEXT(TODAY(),"dd mmm yyyy")',''],
    [8,'https://securityblogs.com.au/services/web-design','Service','security website design',
     'Security Website Design & Development | SecurityBlogs','=LEN(E10)',
     'AI-ready, schema-rich security websites built for rankings and conversions. 2.1× conversion lift. Next.js + headless CMS. Book a free website consultation.','=LEN(G10)',
     'Security Website Design & Development for Security Businesses','=IF(LEN(I10)>0,"✅","❌")',
     'Planned','ProfessionalService, FAQ',3,'Medium','Yousif','=TEXT(TODAY(),"dd mmm yyyy")',''],
  ];

  sh.getRange(3, 1, data.length, cols.length).setValues(data);

  // Title length CF (col F=6)
  var rules = [];
  var tlR = sh.getRange('F3:F300');
  var dlR = sh.getRange('H3:H300');
  rules.push(SpreadsheetApp.newConditionalFormatRule().whenNumberGreaterThan(60).setBackground(C.redLight).setRanges([tlR]).build());
  rules.push(SpreadsheetApp.newConditionalFormatRule().whenNumberBetween(50,60).setBackground(C.greenLight).setRanges([tlR]).build());
  rules.push(SpreadsheetApp.newConditionalFormatRule().whenNumberLessThan(50).setBackground(C.yellowLight).setRanges([tlR]).build());
  rules.push(SpreadsheetApp.newConditionalFormatRule().whenNumberGreaterThan(160).setBackground(C.redLight).setRanges([dlR]).build());
  rules.push(SpreadsheetApp.newConditionalFormatRule().whenNumberBetween(140,160).setBackground(C.greenLight).setRanges([dlR]).build());
  rules.push(SpreadsheetApp.newConditionalFormatRule().whenNumberLessThan(120).setBackground(C.yellowLight).setRanges([dlR]).build());
  sh.setConditionalFormatRules(rules);

  addDV(sh, 3, 3,  200, ['Homepage','Service','Blog','Category','Landing Page','Location','Case Study','FAQ','About','Contact','Other']);
  addDV(sh, 3, 11, 200, ['Done','In Progress','Needs Review','Planned','Not Started']);
  addDV(sh, 3, 14, 200, ['Critical','High','Medium','Low']);
  addDV(sh, 3, 15, 200, ['Yousif','Dev','Designer','Freelancer','Agency']);

  cfEquals(sh, 11, 3, 200, {'Done': C.greenLight,'In Progress': C.yellowLight,'Needs Review': C.orangeLight,'Planned': C.blueLight,'Not Started': C.grayLight});
  cfEquals(sh, 14, 3, 200, {'Critical': C.redLight,'High': C.orangeLight,'Medium': C.yellowLight,'Low': C.grayLight});

  altRows(sh, 3, 150, cols.length);
  setCols(sh, [35,300,110,200,310,75,380,75,280,55,110,200,80,80,100,120,200]);
}

// ════════════════════════════════════════════════════════
// 4. SOCIAL MEDIA BOARD
// ════════════════════════════════════════════════════════
function buildSocialMediaBoard(ss) {
  var sh = getOrCreate(ss, '📱 Social Media Board');
  sh.setTabColor(C.pink);

  sectionTitle(sh, 1, 1, '📱 SecurityBlogs — Social Media & Instagram Content Planner', '#881337', 16);

  var cols = ['#','Scheduled Date','Platform','Content Pillar','Trend / Topic',
    'Hook (First Line)','Caption (Full)','CTA','Hashtags',
    'Post Type','Carousel Slides','Reel Idea','Design Notes',
    'Design Status','Approval','Posting Status'];
  headerRow(sh, 2, cols);

  var pillars = ['Security SEO','AI Visibility / AIO','AEO — Featured Snippets',
    'GEO — Local Entity','Security Marketing','Guest Posting / PR',
    'Industry News','Case Study / Proof','Education / How-To','Client Win'];

  var ideas = [
    [1,'','Instagram','Security SEO','How to rank in Google Maps for security keywords',
     '❓ Is your security company invisible on Google Maps? Here\'s why...',
     'Most CCTV installers and alarm companies in Australia are losing leads every day to competitors who rank higher on Google Maps.\n\nIt\'s not about having a better product. It\'s about three things:\n✅ Google Business Profile optimised\n✅ NAP consistency across all directories\n✅ Local schema on your website\n\nFix these three and you\'ll see results within 60–90 days.\n\nWe\'ve done this for 50+ security businesses across Australia.\n\nComment "AUDIT" for a free local ranking check 👇',
     'Comment "AUDIT" for a free check',
     '#SecuritySEO #CCTV #AlarmInstaller #SecurityMarketing #LocalSEO #GoogleMaps #SecurityBusiness #AustralianSecurity',
     'Carousel','Slide 1: Problem | Slide 2: Google Maps Pack | Slide 3: 3 Fixes | Slide 4: Results | Slide 5: CTA',
     'Before/after Google Maps local pack for a CCTV installer','Dark blue bg, SecurityBlogs branding',
     'To Design','Pending','Planned'],
    [2,'','Instagram','AI Visibility / AIO','Why security businesses are invisible to ChatGPT',
     '🤖 ChatGPT just recommended your competitor. Not you. Here\'s why...',
     '60% of B2B buyers now use AI assistants to find vendors.\n\nIf your security business doesn\'t appear when someone asks ChatGPT "best access control company in Melbourne" — you\'re losing leads you\'ll never know existed.\n\nThe fix:\n1. Allow AI crawlers in your robots.txt\n2. Add JSON-LD structured data to every page\n3. Build brand entity signals across the web\n\nWe helped one security integrator go from 0 AI citations to 87% AI citation rate.\n\nCheck your free AI Visibility Score — link in bio 👆',
     'Free AI Visibility Score — link in bio',
     '#AIVisibility #ChatGPT #SecurityMarketing #AIO #SecuritySEO #AISearch #SecurityBusiness #DigitalMarketing',
     'Carousel','Slide 1: The AI shift | Slide 2: ChatGPT screenshot | Slide 3: 3 fixes | Slide 4: 87% stat | Slide 5: CTA',
     'Screen recording style — ChatGPT recommending a security company','Purple-blue gradient, tech feel',
     'To Design','Pending','Planned'],
    [3,'','Instagram','AEO — Featured Snippets','How to win Google featured snippets for security keywords',
     '🏆 Position zero. Above #1 on Google. Here\'s how security companies win it...',
     'Most security businesses compete for positions 1–10.\n\nBut there\'s a spot ABOVE position 1 — the featured snippet.\n\nFor a CCTV installer in Sydney, owning the featured snippet for "how to choose a security camera" = hundreds of extra clicks per month for free.\n\nHow to get it:\n✅ Answer the question directly in sentence one\n✅ Use a clear list or table format\n✅ Add FAQ schema to the page\n✅ Keep answers 40–60 words\n\nWe got 3.4× more featured snippets for security clients using this.\n\nSave this post 🔖',
     'Save this for your next content update',
     '#FeaturedSnippet #SecuritySEO #AEO #CCTV #SecurityMarketing #GoogleSEO #ContentMarketing #SecurityBusiness',
     'Carousel','Slide 1: What is position zero | Slide 2: Example | Slide 3: 4 steps | Slide 4: Security example | Slide 5: Stat + CTA',
     '','Dark green, screenshot mockup of Google SERP',
     'To Design','Pending','Planned'],
    [4,'','Instagram','GEO — Local Entity','Google Knowledge Panel for security businesses',
     '📍 Does your security company have a Google Knowledge Panel? If not, you\'re leaving authority on the table...',
     'A Google Knowledge Panel means Google officially recognises your business as a real, verified entity.\n\nFor security companies this means:\n🔹 Appearing in AI-generated local recommendations\n🔹 Stronger local pack rankings\n🔹 More trust from prospects before they call\n\nWe verify security business entities in 90 days:\n1. Build NAP signals across 15+ directories\n2. Add LocalBusiness + Organization schema\n3. Create brand entity signals on LinkedIn, ASIAL, industry directories\n\nComment "KNOWLEDGE" and we\'ll check yours for free 👇',
     'Comment "KNOWLEDGE" for a free check',
     '#GoogleKnowledgePanel #GEO #SecurityMarketing #LocalSEO #SecurityBusiness #EntitySEO #SecurityInstaller #CCTV',
     'Static Post','N/A','60s reel: knowledge panel forming step by step','Clean blue bg, knowledge graph visual',
     'To Design','Pending','Planned'],
    [5,'','Instagram','Case Study / Proof','+180% organic traffic for a Sydney CCTV installer',
     '📈 +180% organic traffic in 12 months. Here\'s exactly what we did...',
     'When they came to us, they were on page 3 for most of their core keywords.\n\nNo local SEO. No schema. A website Google barely knew existed.\n\n12 months later:\n📈 +180% organic traffic\n📞 3× more inbound calls per month\n🗺️ Ranking in Google Maps local pack for 14 suburbs\n🤖 Being cited in ChatGPT for Sydney CCTV queries\n\nWhat we did:\n✅ Full technical SEO audit\n✅ 22 location pages (suburb-level)\n✅ Google Business Profile + 18 directory citations\n✅ 8 blog posts targeting buyer-intent keywords\n✅ Schema on every page\n\nBook a free strategy call — link in bio 🔗',
     'Book a free strategy call — link in bio',
     '#SecuritySEO #CaseStudy #CCTV #SecurityMarketing #SEOResults #OrganicTraffic #SecurityInstaller #SydneySecurity',
     'Carousel','Slide 1: +180% | Slide 2: Starting point | Slide 3: What we did | Slide 4: Timeline | Slide 5: Book a call',
     'Before/after traffic graph animation','Dark bg, green stats accent',
     'To Design','Pending','Planned'],
    [6,'','Instagram','Education / How-To','5 reasons your security website doesn\'t rank',
     '⚠️ 5 reasons your security website doesn\'t rank on Google — and how to fix each one...',
     'After auditing 50+ security company websites, we see the same mistakes every time.\n\n❌ No schema markup → Add JSON-LD to every page\n❌ No location pages → Create suburb/city pages for every service area\n❌ Slow page speed → Fix Core Web Vitals (LCP under 2.5s)\n❌ No Google Business Profile → Set up + optimise GBP immediately\n❌ Thin content → Minimum 800 words per service page\n\nFix all 5 and you\'ll see results in 60–90 days.\n\nWhich one applies to you? Comment below 👇',
     'Comment which one is your biggest issue',
     '#SecuritySEO #SEOTips #SecurityWebsite #SecurityMarketing #CCTV #AlarmCompany #WebsiteSEO #GoogleRankings',
     'Carousel','Slide 1: "5 Reasons" title | Slides 2–6: One reason + fix | Slide 7: CTA',
     '30s audit walkthrough reel','Red X → green check format',
     'To Design','Pending','Planned'],
    [7,'','Instagram','AI Visibility / AIO','What is AIO and why security companies need it now',
     '🧠 AIO — the new SEO nobody in the security industry is talking about yet...',
     'AIO = AI Intelligence Optimisation.\n\nHow you get your security business recommended by ChatGPT, Perplexity, and Gemini — not just Google.\n\nIn 2024 most security companies had zero AI visibility.\nIn 2026 AI citations influence B2B buying decisions daily.\n\nThe window to be a first mover is closing.\n\nWhat AIO means:\n🔹 Allow AI crawlers in your robots.txt\n🔹 Structured data formatted for LLMs\n🔹 Brand entity building in the AI knowledge layer\n🔹 Content structured as clear Q&A for AI parsing\n\n87% AI citation rate for our security clients.\n\nCheck your score free — link in bio 🔗',
     'Free AI Visibility Score — link in bio',
     '#AIO #AIVisibility #SecurityMarketing #ChatGPT #SecuritySEO #LLMOptimisation #SecurityBusiness #AISearch',
     'Carousel','Slide 1: What is AIO | Slide 2: AI vs Google | Slide 3: How it works | Slide 4: 4 pillars | Slide 5: 87% stat + CTA',
     'ChatGPT screen showing a security company recommended','Purple/blue gradient, tech feel',
     'To Design','Pending','Planned'],
    [8,'','Instagram','Industry News','Security industry trends in Australia 2026',
     '🔐 The security industry is changing fast. What Australian security businesses need to know in 2026...',
     'The biggest shifts in Australian security right now:\n\n1️⃣ Cloud-based security (VSaaS) growing 18% YoY — on-premise declining\n2️⃣ AI-powered CCTV analytics becoming standard for commercial clients\n3️⃣ Mandatory monitoring requirements tightening for commercial properties\n4️⃣ Cybersecurity converging with physical security\n5️⃣ B2B buyers using AI to shortlist vendors before they Google anything\n\nThe businesses winning in 2026 invest in product quality AND digital visibility.\n\nWhich trend affects your business most? 👇',
     'Tell us which trend affects you most',
     '#SecurityIndustry #SecurityTrends2026 #AustralianSecurity #SecurityBusiness #CCTV #AccessControl #SecurityMarketing',
     'Carousel','Slide 1: "Security 2026" title | Slides 2–6: One trend each | Slide 7: How to respond + CTA',
     'Fast-cut 5 trend visuals with text overlay','News-style layout, Australian flag accent',
     'To Design','Pending','Planned'],
  ];

  sh.getRange(3, 1, ideas.length, cols.length).setValues(ideas);

  addDV(sh, 3, 3,  200, ['Instagram','LinkedIn','Facebook','TikTok','YouTube Shorts','Pinterest']);
  addDV(sh, 3, 4,  200, pillars);
  addDV(sh, 3, 10, 200, ['Static Post','Carousel','Reel','Story','Poll','All Formats']);
  addDV(sh, 3, 14, 200, ['To Design','Designing','Designed','Revision','Approved']);
  addDV(sh, 3, 15, 200, ['Pending','In Review','Approved','Rejected']);
  addDV(sh, 3, 16, 200, ['Planned','Scheduled','Posted','Archived']);

  cfEquals(sh, 16, 3, 200, {'Posted': C.greenLight,'Scheduled': C.yellowLight,'Planned': C.blueLight,'Archived': C.grayLight});
  cfEquals(sh, 14, 3, 200, {'Approved': C.greenLight,'Designing': C.yellowLight,'Revision': C.orangeLight,'To Design': C.blueLight});

  altRows(sh, 3, 150, cols.length);
  setCols(sh, [35,110,90,150,200,280,400,200,300,110,260,240,180,110,100,110]);
}

// ════════════════════════════════════════════════════════
// 5. WEB DESIGN & DEV
// ════════════════════════════════════════════════════════
function buildWebDesignDev(ss) {
  var sh = getOrCreate(ss, '🖥️ Web Design & Dev');
  sh.setTabColor(C.purple);

  sectionTitle(sh, 1, 1, '🖥️ Web Design & Development — Issue Tracker', C.headerDark, 11);

  var cols = ['#','Page / Section','Issue Category','Issue Description',
    'Recommendation','Priority','Effort (hrs)','Status','Assigned','Due Date','Notes'];
  headerRow(sh, 2, cols);

  var data = [
    [1,'Homepage','Core Web Vitals','LCP > 3.2s on mobile','Optimise hero image to WebP, add lazy loading below fold','Critical',4,'Planned','Dev','','Highest priority — affects rankings'],
    [2,'All Service Pages','Schema','Missing ProfessionalService schema on 5 service pages','Add JSON-LD ProfessionalService schema to each page','High',2,'Planned','Yousif','',''],
    [3,'Homepage','CTA','Primary CTA not visible above fold on mobile','Move CTA above fold on mobile breakpoint','High',1,'Planned','Dev','',''],
    [4,'/services/aio','Performance','Spline 3D component not loading on slow connections','Add loading state and fallback text','High',3,'Planned','Dev','',''],
    [5,'All Pages','Mobile','Hamburger nav z-index issue on iOS Safari','Fix z-index stacking context for mobile nav','High',2,'Planned','Dev','',''],
    [6,'/contact','Conversion','Form submit lacks loading / confirmation state','Add spinner + success message after submit','Medium',1,'Planned','Dev','',''],
    [7,'All Blog Posts','UX','No estimated reading time shown','Add reading time to blog post header','Low',1,'Planned','Dev','',''],
    [8,'/knowledge-hub','UX','Category filter resets on back navigation','Persist filter state in URL params','Medium',2,'Planned','Dev','',''],
    [9,'All Pages','Speed','Google Fonts loaded synchronously (render-blocking)','Switch to font-display: swap + self-host fonts','Medium',2,'Planned','Dev','',''],
    [10,'All Service Pages','Design','Hero images inconsistent aspect ratio','Standardise to 16:9, min 1200px, WebP format','Low',2,'Planned','Yousif','',''],
    [11,'Homepage','Conversion','Stats strip below fold — not seen on first load','Move stats (50+ brands, +180%) above fold','Medium',1,'Planned','Dev','',''],
    [12,'All Pages','Accessibility','Icon-only buttons missing aria-labels','Add descriptive aria-labels to all icon buttons','Medium',1,'Planned','Dev','',''],
  ];

  sh.getRange(3, 1, data.length, cols.length).setValues(data);

  addDV(sh, 3, 3, 200, ['Core Web Vitals','Schema','CTA','Mobile','UX','Speed','Design','Content','Conversion','Accessibility','Bug','Security','Other']);
  addDV(sh, 3, 6, 200, ['Critical','High','Medium','Low']);
  addDV(sh, 3, 8, 200, ['Planned','In Progress','In Review','Done','Won\'t Fix']);
  addDV(sh, 3, 9, 200, ['Dev','Yousif','Designer','Freelancer']);

  cfEquals(sh, 6, 3, 200, {'Critical': C.redLight,'High': C.orangeLight,'Medium': C.yellowLight,'Low': C.grayLight});
  cfEquals(sh, 8, 3, 200, {'Done': C.greenLight,'In Progress': C.yellowLight,'Planned': C.blueLight,'Won\'t Fix': C.grayLight});

  altRows(sh, 3, 150, cols.length);
  setCols(sh, [35,200,140,320,340,90,90,110,100,110,220]);
}

// ════════════════════════════════════════════════════════
// 6. BUSINESS LISTINGS
// ════════════════════════════════════════════════════════
function buildBusinessListings(ss) {
  var sh = getOrCreate(ss, '📍 Business Listings');
  sh.setTabColor(C.orange);

  sectionTitle(sh, 1, 1, '📍 Business Listings & Directory Registration', C.headerDark, 11);

  var cols = ['#','Directory / Platform','Category','Country','Directory URL',
    'Status','Profile URL','Login Email','Last Updated','Verification','Notes'];
  headerRow(sh, 2, cols);

  var data = [
    [1,'Google Business Profile','Search / Maps','AU','https://business.google.com','Active','','info@securityblogs.com.au','','Email / Postcard','CRITICAL — fully optimise'],
    [2,'Bing Places for Business','Search / Maps','AU','https://bingplaces.com','Planned','','','','Email','Import from GBP'],
    [3,'Apple Maps Connect','Maps','AU','https://mapsconnect.apple.com','Planned','','','','Email',''],
    [4,'Yellow Pages Australia','Directory','AU','https://yellowpages.com.au','Planned','','','','Email','Free listing'],
    [5,'White Pages Australia','Directory','AU','https://whitepages.com.au','Planned','','','','Email',''],
    [6,'True Local','Reviews / Directory','AU','https://truelocal.com.au','Planned','','','','Email',''],
    [7,'hipages','Trade Marketplace','AU','https://hipages.com.au','Planned','','','','Phone','Relevant for installer clients'],
    [8,'Oneflare','Trade Marketplace','AU','https://oneflare.com.au','Planned','','','','Phone',''],
    [9,'Local Search','Directory','AU','https://localsearch.com.au','Planned','','','','Email',''],
    [10,'Hotfrog Australia','Directory','AU','https://hotfrog.com.au','Planned','','','','Email','Low priority'],
    [11,'ASIAL Member Directory','Industry','AU','https://asial.com.au','Planned','','','','ASIAL Membership','High authority backlink'],
    [12,'LinkedIn Company Page','Professional','Global','https://linkedin.com/company','Active','','','','Email','Keep updated monthly'],
    [13,'Facebook Business Page','Social','AU','https://facebook.com','Active','','','','Email',''],
    [14,'Crunchbase','Tech / Business','Global','https://crunchbase.com','Planned','','','','Email','Entity signal for AI'],
    [15,'Google Search Console','Webmaster','AU','https://search.google.com/search-console','Active','','info@securityblogs.com.au','','Google Account','Verify sitemap submitted'],
    [16,'Bing Webmaster Tools','Webmaster','AU','https://webmaster.tools.bing.com','Planned','','','','Microsoft Account',''],
    [17,'Clutch.co','B2B Reviews','Global','https://clutch.co','Planned','','','','Email','Agency credibility'],
    [18,'DesignRush','Agency Directory','Global','https://designrush.com','Planned','','','','Email',''],
    [19,'Trustpilot','Reviews','AU','https://trustpilot.com','Planned','','','','Email',''],
    [20,'ProductHunt','Product Launch','Global','https://producthunt.com','Planned','','','','Email','For free tools launch'],
  ];

  sh.getRange(3, 1, data.length, cols.length).setValues(data);

  addDV(sh, 3, 6,  200, ['Active','Planned','Submitted','Verified','Needs Update','Inactive']);
  addDV(sh, 3, 10, 200, ['Email','Phone','Postcard','SMS','Google Account','Microsoft Account','ASIAL Membership','Instant']);

  cfEquals(sh, 6, 3, 200, {'Active': C.greenLight,'Verified': C.greenLight,'Submitted': C.yellowLight,'Planned': C.blueLight,'Needs Update': C.orangeLight,'Inactive': C.grayLight});

  altRows(sh, 3, 150, cols.length);
  setCols(sh, [35,220,140,70,260,110,260,200,110,160,250]);
}

// ════════════════════════════════════════════════════════
// 7. GUEST POSTING
// ════════════════════════════════════════════════════════
function buildGuestPosting(ss) {
  var sh = getOrCreate(ss, '🔗 Guest Posting');
  sh.setTabColor(C.blue);

  sectionTitle(sh, 1, 1, '🔗 Guest Posting & Outreach Board', C.headerDark, 15);

  var cols = ['#','Website','Domain','DR','Monthly Traffic','Niche',
    'Contact Name','Pitch Date','Response','Our Target Page',
    'Anchor Text','Topic Pitched','Status','Published URL','Pub. Date','Notes'];
  headerRow(sh, 2, cols);

  var data = [
    [1,'SecurityBlogs (own)','securityblogs.com.au',35,'Growing','Security Marketing','Yousif','','','','','','Internal','','','Use for client backlinks'],
    [2,'SEN Magazine','sen.news',42,'10k+','Security Industry AU','SEN Editorial','','No response','/services/security-seo','security SEO services','Security SEO for Australian Installers','Planned','','',''],
    [3,'Security Insider','securityinsider.com.au',38,'8k+','Security Industry AU','Editor','','','/services/aio','AI visibility for security','AIO for Security Businesses','Planned','','',''],
    [4,'IFSEC Global','ifsecglobal.com',55,'50k+','Security Industry Global','UK Editorial','','','/services/aio','AI visibility security industry','AI Visibility for Physical Security in 2026','Planned','','',''],
    [5,'Security Magazine US','securitymagazine.com',58,'80k+','Security Industry US','US Editor','','','/services/security-seo','security SEO agency','How Security SaaS Vendors Are Using AIO in 2026','Planned','','',''],
    [6,'SecurityInfoWatch','securityinfowatch.com',50,'40k+','Security Industry US','Editor','','','/services/geo','GEO for security companies','GEO — The New Local SEO for Security Installers','Planned','','',''],
  ];

  sh.getRange(3, 1, data.length, cols.length).setValues(data);

  addDV(sh, 3, 9,  200, ['No response','Positive','Interested','Rejected','Published','Ghosted']);
  addDV(sh, 3, 13, 200, ['Planned','Pitching','Negotiating','Writing','In Review','Published','Rejected']);

  cfEquals(sh, 13, 3, 200, {'Published': C.greenLight,'Writing': C.yellowLight,'Pitching': C.blueLight,'Negotiating': C.blueLight,'In Review': C.orangeLight,'Planned': C.grayLight,'Rejected': C.redLight});

  altRows(sh, 3, 150, cols.length);
  setCols(sh, [35,200,200,50,100,140,130,110,110,220,180,280,110,280,110,220]);
}

// ════════════════════════════════════════════════════════
// 8. BLOG POSTING
// ════════════════════════════════════════════════════════
function buildBlogPosting(ss) {
  var sh = getOrCreate(ss, '✍️ Blog Posting');
  sh.setTabColor(C.green);

  sectionTitle(sh, 1, 1, '✍️ Blog Content Workflow  ·  Idea → Brief → Writing → Draft → Review → Published', C.headerDark, 13);

  var cols = ['#','Topic / Working Title','Primary Keyword','Intent','Cluster',
    'Status','Author','Brief Date','Draft Date','Review Date','Publish Date',
    'Live URL','Word Count','% Done'];
  headerRow(sh, 2, cols);

  var data = [
    [1,'The Complete Guide to SEO for Security Companies in Australia','security SEO','Informational','Security SEO','Planned','Yousif','','','','','',5000,''],
    [2,'Local SEO for CCTV Installers: A Complete Guide','local SEO for CCTV companies','Informational','Security SEO','Planned','Yousif','','','','','',2000,''],
    [3,'AEO for Security Companies: Win Featured Snippets & AI Overviews','AEO for security companies','Commercial','AEO','Planned','Yousif','','','','','',3500,''],
    [4,'How to Get Your Security Company Cited by ChatGPT','get cited by ChatGPT security','Informational','AI Visibility','Planned','Yousif','','','','','',2000,''],
    [5,'GEO for Security Companies: Build Local Entity Authority in 90 Days','GEO SEO for security','Commercial','GEO','Planned','Yousif','','','','','',3500,''],
    [6,'How AI Assistants Choose Which Security Companies to Recommend','how AI recommends security','Informational','AI Visibility','Planned','Yousif','','','','','',2000,''],
    [7,'Security Company Google Ads: A Complete Guide for Australian Businesses','Google Ads for security companies','Commercial','Security Marketing','Planned','Yousif','','','','','',2500,''],
    [8,'What Is AIO in SEO? — AI Intelligence Optimisation Explained','what is AIO in SEO','Informational','AI Visibility','Planned','Yousif','','','','','',1500,''],
    [9,'Keyword Research for Security Companies: Step-by-Step Guide','keyword research security companies','Informational','Security SEO','Planned','Yousif','','','','','',2500,''],
    [10,'How to Rank in Google Maps for Security Keywords','rank Google Maps security','Informational','Security SEO','Planned','Yousif','','','','','',2000,''],
  ];

  sh.getRange(3, 1, data.length, cols.length).setValues(data);

  // Batch % Done formulas (col 14 = N) — one setFormulas call
  var pctFormulas = [];
  for (var r = 3; r <= 202; r++) {
    pctFormulas.push(['=IFERROR(IF(F' + r + '="Published",100,IF(F' + r + '="Scheduled",90,IF(F' + r + '="Approved",80,IF(F' + r + '="In Review",60,IF(F' + r + '="Draft Done",50,IF(F' + r + '="Writing",30,IF(F' + r + '="Brief Ready",15,IF(F' + r + '="Idea",5,0)))))))),"")']);
  }
  sh.getRange(3, 14, 200, 1).setFormulas(pctFormulas).setHorizontalAlignment('center');

  addDV(sh, 3, 4,  200, ['Informational','Commercial','Transactional','Navigational']);
  addDV(sh, 3, 5,  200, ['Security SEO','AEO','GEO','AI Visibility','Security Marketing','Guest Posting','Cybersecurity PR','Other']);
  addDV(sh, 3, 6,  200, ['Idea','Brief Ready','Writing','Draft Done','In Review','Approved','Scheduled','Published','Archived']);
  addDV(sh, 3, 7,  200, ['Yousif','Freelancer','Agency','AI-Assisted']);

  cfEquals(sh, 6, 3, 200, {'Published': C.greenLight,'Scheduled': C.greenLight,'Approved': C.blueLight,'In Review': C.orangeLight,'Draft Done': C.yellowLight,'Writing': C.yellowLight,'Brief Ready': C.blueLight,'Idea': C.grayLight,'Archived': C.grayLight});

  altRows(sh, 3, 150, cols.length);
  setCols(sh, [35,320,240,110,140,110,100,100,100,100,110,280,90,70]);
}

// ════════════════════════════════════════════════════════
// 9. LINK BUILDING
// ════════════════════════════════════════════════════════
function buildLinkBuilding(ss) {
  var sh = getOrCreate(ss, '🏗️ Link Building');
  sh.setTabColor(C.orange);

  sectionTitle(sh, 1, 1, '🏗️ Link Building Tracker', C.headerDark, 12);

  var cols = ['#','Target Page (Our Site)','Target Keyword','Link Type',
    'Anchor Text','Source Website','Source DR','Do-Follow?',
    'Status','Date Acquired','Contact','Notes'];
  headerRow(sh, 2, cols);

  var data = [
    [1,'/services/security-seo','security SEO','Guest Post','security SEO services','sen.news',42,'Yes','Planned','','','Target SEN editorial team'],
    [2,'/services/aio','AI visibility for security','Guest Post','AI visibility for security companies','ifsecglobal.com',55,'Yes','Planned','','','Pitch AI Visibility article'],
    [3,'/','SecurityBlogs','Directory','SecurityBlogs','asial.com.au',48,'Yes','Planned','','','ASIAL member directory'],
    [4,'/services/geo','GEO SEO','Niche Edit','GEO for security companies','securityinsider.com.au',38,'Yes','Planned','','','Add link to existing article'],
    [5,'/knowledge-hub/security-industry-seo/complete-guide-security-seo','security SEO guide','Resource Link','complete guide to security SEO','securitymagazine.com',58,'Yes','Planned','','','Resource page outreach'],
    [6,'/services/security-seo','SEO for security installers','Citation','security marketing agency','localsearch.com.au',35,'Yes','Planned','','','Directory citation'],
    [7,'/services/google-ads','Google Ads for security','Guest Post','Google Ads for security companies','securityinfowatch.com',50,'Yes','Planned','','','US market'],
    [8,'/ai-visibility-center','AI visibility','PR / Press','AI Visibility Centre for security','itnews.com.au',60,'Yes','Planned','','','PR announcement for tool launch'],
  ];

  sh.getRange(3, 1, data.length, cols.length).setValues(data);

  addDV(sh, 3, 4,  200, ['Guest Post','Niche Edit','Directory','Resource Link','Citation','PR / Press','Sponsored','Broken Link']);
  addDV(sh, 3, 8,  200, ['Yes','No','Unknown']);
  addDV(sh, 3, 9,  200, ['Planned','Outreach Sent','In Progress','Acquired','Published','Rejected','Lost']);

  cfEquals(sh, 9, 3, 200, {'Acquired': C.greenLight,'Published': C.greenLight,'In Progress': C.yellowLight,'Outreach Sent': C.blueLight,'Planned': C.grayLight,'Rejected': C.redLight,'Lost': C.redLight});

  altRows(sh, 3, 150, cols.length);
  setCols(sh, [35,280,200,120,220,200,80,90,120,110,160,220]);
}

// ════════════════════════════════════════════════════════
// 10. CONTENT OPPORTUNITIES
// ════════════════════════════════════════════════════════
function buildContentOpportunities(ss) {
  var sh = getOrCreate(ss, '🔍 Content Opportunities');
  sh.setTabColor(C.yellow);

  sectionTitle(sh, 1, 1, '🔍 Content Opportunities — Paste Google Search Console Queries Export Here', C.headerDark, 11);

  sh.getRange('A2:K2').merge()
    .setValue('HOW TO USE: GSC → Performance → Search Results → Queries → Export CSV → Paste data from row 4 onwards (Query, Clicks, Impressions, CTR, Position). Formulas auto-classify.')
    .setBackground(C.yellowLight).setFontColor(C.headerDark).setFontSize(9).setWrap(true).setVerticalAlignment('middle');
  sh.setRowHeight(2, 40);

  var cols = ['Query','Clicks','Impressions','CTR %','Avg Position',
    'Opportunity Type','Priority','Target Page','Action Required','Status','Notes'];
  headerRow(sh, 3, cols);

  // Sample GSC data
  var sample = [
    ['security seo',12,450,0.027,8.3,'','','','','Planned',''],
    ['seo for security companies',8,320,0.025,9.1,'','','','','Planned',''],
    ['cctv installer sydney seo',3,180,0.017,14.2,'','','','','Planned',''],
    ['what is aio seo',0,210,0,22.4,'','','','','Planned',''],
    ['ai visibility for security businesses',2,140,0.014,11.8,'','','','','Planned',''],
    ['security marketing agency australia',15,380,0.039,6.2,'','','','','Planned',''],
    ['geo seo',1,95,0.011,18.3,'','','','','Planned',''],
    ['guest posting security industry',5,160,0.031,7.8,'','','','','Planned',''],
  ];
  sh.getRange(4, 1, sample.length, cols.length).setValues(sample);

  // Batch Opportunity Type formulas (col F=6)
  var oppF = [], priF = [];
  for (var r = 4; r <= 303; r++) {
    oppF.push(['=IFERROR(IF(B' + r + '="",,IF(AND(E' + r + '>10,E' + r + '<21,C' + r + '>100),"🏆 Quick Win",IF(AND(E' + r + '>=4,E' + r + '<=10,D' + r + '<0.05,C' + r + '>200),"🎯 Low CTR Fix",IF(AND(E' + r + '>30,C' + r + '>50),"📝 New Content",IF(AND(E' + r + '>=1,E' + r + '<=10,B' + r + '>50),"🔗 Internal Link","📊 Monitor"))))),"")']);
    priF.push(['=IFERROR(IF(F' + r + '="🏆 Quick Win","High",IF(F' + r + '="🎯 Low CTR Fix","High",IF(F' + r + '="📝 New Content","Medium","Low"))),"")']);
  }
  sh.getRange(4, 6, 300, 1).setFormulas(oppF);
  sh.getRange(4, 7, 300, 1).setFormulas(priF);

  sh.getRange('D4:D500').setNumberFormat('0.0%');

  // CF for opportunity types
  var rules = sh.getConditionalFormatRules();
  var oppRange = sh.getRange('F4:F500');
  [['🏆 Quick Win', C.greenLight],['🎯 Low CTR Fix', C.blueLight],['📝 New Content', C.purpleLight],['🔗 Internal Link', C.yellowLight],['📊 Monitor', C.grayLight]]
    .forEach(function(p) {
      rules.push(SpreadsheetApp.newConditionalFormatRule().whenTextContains(p[0]).setBackground(p[1]).setRanges([oppRange]).build());
    });
  sh.setConditionalFormatRules(rules);

  addDV(sh, 4, 10, 300, ['Planned','In Progress','Done','Monitor']);
  altRows(sh, 4, 200, cols.length);
  setCols(sh, [280,70,100,70,80,160,80,280,280,100,220]);
}

// ════════════════════════════════════════════════════════
// 11. SCHEMA BOARD
// ════════════════════════════════════════════════════════
function buildSchemaBoard(ss) {
  var sh = getOrCreate(ss, '🗂️ Schema Board');
  sh.setTabColor(C.purple);

  sectionTitle(sh, 1, 1, '🗂️ Schema Markup Tracker — JSON-LD Implementation & Validation', C.headerDark, 9);

  var cols = ['#','URL / Page','Page Type','Schema Types Required',
    'Implementation','Validation','Rich Result Eligible','Last Checked','Notes'];
  headerRow(sh, 2, cols);

  var data = [
    [1,'https://securityblogs.com.au/','Homepage','Organization, WebSite, BreadcrumbList','Done','Validated','Sitelinks SearchBox','','Sitewide schema in layout.tsx'],
    [2,'https://securityblogs.com.au/services/security-seo','Service','ProfessionalService, BreadcrumbList, FAQPage','In Progress','Pending','FAQ Rich Result','','Add FAQPage — 6 Q&As ready'],
    [3,'https://securityblogs.com.au/services/aio','Service','ProfessionalService, BreadcrumbList, FAQPage','Planned','Not Tested','FAQ Rich Result','',''],
    [4,'https://securityblogs.com.au/services/aeo','Service','ProfessionalService, BreadcrumbList, FAQPage','Planned','Not Tested','FAQ Rich Result','',''],
    [5,'https://securityblogs.com.au/services/geo','Service','ProfessionalService, LocalBusiness, BreadcrumbList, FAQPage','Planned','Not Tested','FAQ Rich Result','','LocalBusiness for GEO page'],
    [6,'https://securityblogs.com.au/services/google-ads','Service','ProfessionalService, BreadcrumbList, FAQPage','Planned','Not Tested','FAQ Rich Result','',''],
    [7,'https://securityblogs.com.au/services/bing-ads','Service','ProfessionalService, BreadcrumbList, FAQPage','Planned','Not Tested','FAQ Rich Result','',''],
    [8,'https://securityblogs.com.au/services/web-design','Service','ProfessionalService, BreadcrumbList, FAQPage','Planned','Not Tested','FAQ Rich Result','',''],
    [9,'/knowledge-hub/blogs/[slug]','Blog Post','BlogPosting, BreadcrumbList, FAQPage (if FAQ)','In Progress','Pending','Article + FAQ','','Apply via CMS to all posts'],
    [10,'/case-studies/[slug]','Case Study','Article, BreadcrumbList','Planned','Not Tested','Article','',''],
    [11,'https://securityblogs.com.au/about-us','About','Organization, Person, BreadcrumbList','Planned','Not Tested','None (entity signal)','','Person schema with knowsAbout'],
    [12,'https://securityblogs.com.au/contact','Contact','LocalBusiness, ContactPoint, BreadcrumbList','Planned','Not Tested','None','',''],
    [13,'/publish-with-us/guest-posting','Publishing','Service, BreadcrumbList, FAQPage','Planned','Not Tested','FAQ Rich Result','',''],
    [14,'/free-tools/ai-visibility-score','Tool','WebApplication, BreadcrumbList','Planned','Not Tested','None','','WebApplication schema for tool'],
  ];

  sh.getRange(3, 1, data.length, cols.length).setValues(data);

  addDV(sh, 3, 3, 200, ['Homepage','Service','Blog Post','Case Study','Category','Location','FAQ','About','Contact','Tool','Publishing','Other']);
  addDV(sh, 3, 5, 200, ['Done','In Progress','Planned','Not Started']);
  addDV(sh, 3, 6, 200, ['Validated','Pending','Not Tested','Has Errors','Has Warnings']);

  cfEquals(sh, 5, 3, 200, {'Done': C.greenLight,'In Progress': C.yellowLight,'Planned': C.blueLight,'Not Started': C.grayLight});
  cfEquals(sh, 6, 3, 200, {'Validated': C.greenLight,'Pending': C.yellowLight,'Not Tested': C.grayLight,'Has Errors': C.redLight,'Has Warnings': C.orangeLight});

  altRows(sh, 3, 150, cols.length);
  setCols(sh, [35,380,120,320,120,120,180,120,280]);
}
