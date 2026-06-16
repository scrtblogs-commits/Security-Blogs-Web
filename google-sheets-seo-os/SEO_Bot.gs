/**
 * SecurityBlogs — SEO Automation Bot
 * Powered by Claude AI (Anthropic API) + Gmail
 *
 * SETUP (do once):
 *   1. Paste your Claude API key into CLAUDE_API_KEY below
 *   2. Run setupBotTriggers() once to schedule the daily automation
 *   3. That's it — the bot runs every day at 8am automatically
 *
 * MANUAL RUNS (any time):
 *   - runFullBot()          → runs everything below in sequence
 *   - findGuestProspects()  → find new guest post targets
 *   - sendOutreachEmails()  → send pitches for "Planned" rows
 *   - sendFollowUps()       → chase up pitches sent 7+ days ago
 *   - writeBlogDrafts()     → write AI blog drafts for "Idea" rows
 *   - findKeywords()        → generate keyword ideas into Blog Posting
 */

// ════════════════════════════════════════════════════════
// ⚙️  CONFIGURATION — FILL THESE IN BEFORE RUNNING
// ════════════════════════════════════════════════════════

var BOT_CONFIG = {
  // Your Claude API key from console.anthropic.com
  CLAUDE_API_KEY: 'YOUR_CLAUDE_API_KEY_HERE',

  // Claude model to use
  CLAUDE_MODEL: 'claude-sonnet-4-6',

  // Your details — used in outreach emails
  YOUR_NAME:    'Yousif Jonaid',
  YOUR_TITLE:   'Founder',
  COMPANY:      'SecurityBlogs',
  WEBSITE:      'securityblogs.com.au',
  EMAIL:        'scrtblogs@gmail.com',

  // Max emails to send per run (safety cap — avoids Gmail spam flags)
  MAX_PITCHES_PER_RUN:   5,
  MAX_FOLLOWUPS_PER_RUN: 5,
  MAX_BLOGS_PER_RUN:     3,

  // Days before auto follow-up
  FOLLOWUP_DAYS: 7,
};

// ════════════════════════════════════════════════════════
// 🚀  MASTER RUN — call this or let the trigger call it
// ════════════════════════════════════════════════════════

function runFullBot() {
  var log = [];
  log.push('🤖 SEO Bot started: ' + new Date().toLocaleString());
  log.push('─────────────────────────────────────────');

  try { log = log.concat(findGuestProspects());   } catch(e) { log.push('❌ findGuestProspects error: ' + e.message); }
  try { log = log.concat(sendOutreachEmails());   } catch(e) { log.push('❌ sendOutreachEmails error: ' + e.message); }
  try { log = log.concat(sendFollowUps());        } catch(e) { log.push('❌ sendFollowUps error: ' + e.message); }
  try { log = log.concat(writeBlogDrafts());      } catch(e) { log.push('❌ writeBlogDrafts error: ' + e.message); }
  try { log = log.concat(findKeywords());         } catch(e) { log.push('❌ findKeywords error: ' + e.message); }

  log.push('─────────────────────────────────────────');
  log.push('✅ Bot finished: ' + new Date().toLocaleString());

  writeBotLog(log.join('\n'));
  Logger.log(log.join('\n'));
}

// ════════════════════════════════════════════════════════
// 1. FIND GUEST POST PROSPECTS
//    Claude generates 10 new target sites → Guest Posting tab
// ════════════════════════════════════════════════════════

function findGuestProspects() {
  var log = ['[Prospects] Asking Claude for new guest post targets...'];
  var sh = getSheet('🔗 Guest Posting');
  var lastRow = Math.max(sh.getLastRow(), 2);

  // Count how many we already have to avoid duplicates
  var existing = sh.getRange(3, 2, lastRow - 2, 1).getValues().flat().filter(String);

  var prompt =
    'You are an SEO link building specialist for SecurityBlogs (securityblogs.com.au) — ' +
    'an SEO and digital marketing agency for the physical security industry in Australia.\n\n' +
    'Generate 10 websites that would be ideal guest post targets. Requirements:\n' +
    '- Relevant to: security industry, physical security, digital marketing, B2B tech, or Australian business\n' +
    '- DR (Domain Rating) estimated 30-70\n' +
    '- Should accept external contributions / guest articles\n' +
    '- Mix of AU and international sites\n\n' +
    'Already have these sites (do NOT repeat): ' + existing.join(', ') + '\n\n' +
    'Return ONLY a JSON array, no explanation:\n' +
    '[{"website":"Site Name","domain":"domain.com","dr":45,"traffic":"20k+","niche":"Security Industry","contact":"Editorial Team","topic":"AI Visibility for Physical Security Companies","target_page":"/services/aio","anchor":"AI visibility for security companies"}]';

  var raw = callClaude(prompt, 1500);
  var sites = parseJSON(raw);
  if (!sites || !sites.length) {
    log.push('[Prospects] ⚠️ Claude returned no prospects this run.');
    return log;
  }

  var nextRow = lastRow + 1;
  var nextNum = lastRow - 1;
  sites.forEach(function(s) {
    nextNum++;
    sh.getRange(nextRow, 1, 1, 16).setValues([[
      nextNum,
      s.website || '',
      s.domain || '',
      s.dr || '',
      s.traffic || '',
      s.niche || '',
      s.contact || 'Editorial Team',
      '', // pitch date
      '', // response
      s.target_page || '/services/security-seo',
      s.anchor || '',
      s.topic || '',
      'Planned',
      '', // published URL
      '', // pub date
      'Added by SEO Bot ' + today()
    ]]);
    nextRow++;
    log.push('[Prospects] ✅ Added: ' + s.website + ' (' + s.domain + ')');
  });

  return log;
}

// ════════════════════════════════════════════════════════
// 2. SEND OUTREACH PITCHES
//    For "Planned" rows → Claude writes pitch → Gmail sends it
// ════════════════════════════════════════════════════════

function sendOutreachEmails() {
  var log = ['[Outreach] Checking for rows ready to pitch...'];

  if (!checkApiKey()) { log.push('[Outreach] ❌ No API key set.'); return log; }

  var sh = getSheet('🔗 Guest Posting');
  var data = sh.getRange(3, 1, sh.getLastRow() - 2, 16).getValues();
  var sent = 0;

  for (var i = 0; i < data.length && sent < BOT_CONFIG.MAX_PITCHES_PER_RUN; i++) {
    var row = data[i];
    var status    = row[12]; // col M
    var website   = row[1];
    var domain    = row[2];
    var niche     = row[5];
    var contact   = row[6];
    var targetPg  = row[9];
    var anchor    = row[10];
    var topic     = row[11];

    if (status !== 'Planned' || !domain || !topic) continue;

    log.push('[Outreach] Writing pitch for: ' + website);

    var pitch = writePitch(website, domain, niche, contact, topic, targetPg, anchor);
    if (!pitch) { log.push('[Outreach] ⚠️ No pitch generated for ' + website); continue; }

    // Derive editor email — try contact@domain, editor@domain as fallback pattern
    var toEmail = guessEmail(contact, domain);

    try {
      GmailApp.sendEmail(toEmail, pitch.subject, pitch.body, {
        name: BOT_CONFIG.YOUR_NAME + ' — ' + BOT_CONFIG.COMPANY,
        replyTo: BOT_CONFIG.EMAIL
      });

      // Update sheet row: Pitch Date, Status → Pitching
      var sheetRow = i + 3;
      sh.getRange(sheetRow, 8).setValue(today());   // Pitch Date
      sh.getRange(sheetRow, 13).setValue('Pitching'); // Status
      sh.getRange(sheetRow, 16).setValue('Pitched by bot ' + today()); // Notes

      log.push('[Outreach] ✅ Pitch sent to ' + toEmail + ' for ' + website);
      sent++;
      Utilities.sleep(2000); // 2s pause between emails
    } catch(e) {
      log.push('[Outreach] ❌ Gmail error for ' + website + ': ' + e.message);
    }
  }

  if (sent === 0) log.push('[Outreach] No new rows ready to pitch.');
  return log;
}

function writePitch(website, domain, niche, contact, topic, targetPage, anchorText) {
  var prompt =
    'Write a guest post pitch email from ' + BOT_CONFIG.YOUR_NAME + ', Founder of ' + BOT_CONFIG.COMPANY + ' (' + BOT_CONFIG.WEBSITE + ').\n\n' +
    'Target publication: ' + website + ' (' + domain + ') — niche: ' + niche + '\n' +
    'Contact: ' + contact + '\n' +
    'Proposed article topic: ' + topic + '\n' +
    'Our target page to link back to: ' + BOT_CONFIG.WEBSITE + targetPage + '\n' +
    'Desired anchor text: ' + anchorText + '\n\n' +
    'Requirements:\n' +
    '- Professional, concise, not salesy\n' +
    '- Personalise the opening to the specific publication\n' +
    '- Propose a concrete article title and 3-4 bullet point outline\n' +
    '- Mention SecurityBlogs is a specialist security industry SEO agency in Australia\n' +
    '- 150-220 words max in the body\n' +
    '- Australian English spelling\n\n' +
    'Return ONLY valid JSON:\n' +
    '{"subject":"Email subject line here","body":"Full email body here (plain text, use \\n for line breaks)"}';

  var raw = callClaude(prompt, 800);
  return parseJSON(raw);
}

// ════════════════════════════════════════════════════════
// 3. AUTO FOLLOW-UPS
//    Pitches sent 7+ days ago with no positive response → follow-up email
// ════════════════════════════════════════════════════════

function sendFollowUps() {
  var log = ['[Follow-up] Checking for pitches needing follow-up...'];

  if (!checkApiKey()) { log.push('[Follow-up] ❌ No API key set.'); return log; }

  var sh = getSheet('🔗 Guest Posting');
  var data = sh.getRange(3, 1, sh.getLastRow() - 2, 16).getValues();
  var sent = 0;

  for (var i = 0; i < data.length && sent < BOT_CONFIG.MAX_FOLLOWUPS_PER_RUN; i++) {
    var row     = data[i];
    var status  = row[12];
    var website = row[1];
    var domain  = row[2];
    var contact = row[6];
    var pitchDateVal = row[7];
    var topic   = row[11];

    if (status !== 'Pitching') continue;
    if (!pitchDateVal) continue;

    var pitchDate = new Date(pitchDateVal);
    var daysSince = Math.floor((new Date() - pitchDate) / 86400000);

    if (daysSince < BOT_CONFIG.FOLLOWUP_DAYS) continue;

    var followUp = writeFollowUp(website, domain, contact, topic, daysSince);
    if (!followUp) continue;

    var toEmail = guessEmail(contact, domain);

    try {
      GmailApp.sendEmail(toEmail, followUp.subject, followUp.body, {
        name: BOT_CONFIG.YOUR_NAME + ' — ' + BOT_CONFIG.COMPANY,
        replyTo: BOT_CONFIG.EMAIL
      });

      var sheetRow = i + 3;
      sh.getRange(sheetRow, 16).setValue('Follow-up sent ' + today());

      log.push('[Follow-up] ✅ Follow-up sent to ' + website + ' (' + daysSince + ' days since pitch)');
      sent++;
      Utilities.sleep(2000);
    } catch(e) {
      log.push('[Follow-up] ❌ Error sending to ' + website + ': ' + e.message);
    }
  }

  if (sent === 0) log.push('[Follow-up] No follow-ups due today.');
  return log;
}

function writeFollowUp(website, domain, contact, topic, daysSince) {
  var prompt =
    'Write a short, friendly follow-up email for a guest post pitch sent ' + daysSince + ' days ago.\n\n' +
    'From: ' + BOT_CONFIG.YOUR_NAME + ', ' + BOT_CONFIG.COMPANY + ' (' + BOT_CONFIG.WEBSITE + ')\n' +
    'To: ' + contact + ' at ' + website + ' (' + domain + ')\n' +
    'Original pitch topic: ' + topic + '\n\n' +
    'Requirements:\n' +
    '- Very brief — 60-80 words max\n' +
    '- Not pushy, just a gentle nudge\n' +
    '- Offer to adjust the topic if needed\n' +
    '- Australian English\n\n' +
    'Return ONLY valid JSON:\n' +
    '{"subject":"Follow-up subject line","body":"Follow-up email body (plain text)"}';

  var raw = callClaude(prompt, 400);
  return parseJSON(raw);
}

// ════════════════════════════════════════════════════════
// 4. WRITE BLOG DRAFTS
//    "Idea" rows in Blog Posting tab → Claude writes full post → saves to Notes col
// ════════════════════════════════════════════════════════

function writeBlogDrafts() {
  var log = ['[Blogs] Checking for blog drafts to write...'];

  if (!checkApiKey()) { log.push('[Blogs] ❌ No API key set.'); return log; }

  var sh = getSheet('✍️ Blog Posting');
  var data = sh.getRange(3, 1, sh.getLastRow() - 2, 14).getValues();
  var written = 0;

  for (var i = 0; i < data.length && written < BOT_CONFIG.MAX_BLOGS_PER_RUN; i++) {
    var row     = data[i];
    var title   = row[1];
    var keyword = row[2];
    var intent  = row[3];
    var cluster = row[4];
    var status  = row[5];
    var wcount  = row[12] || 2000;

    if (status !== 'Idea' || !title || !keyword) continue;

    log.push('[Blogs] Writing draft: ' + title);

    var draft = writeBlogPost(title, keyword, intent, cluster, wcount);
    if (!draft) { log.push('[Blogs] ⚠️ No draft returned for: ' + title); continue; }

    // Save to a new Google Doc and link it in the URL column (col L = 12)
    var docUrl = saveDraftToDoc(title, draft);
    var sheetRow = i + 3;
    sh.getRange(sheetRow, 6).setValue('Draft Done');   // Status
    sh.getRange(sheetRow, 8).setValue(today());        // Brief Date
    sh.getRange(sheetRow, 9).setValue(today());        // Draft Date
    sh.getRange(sheetRow, 12).setValue(docUrl);        // Live URL col used for draft link

    log.push('[Blogs] ✅ Draft saved: ' + docUrl);
    written++;
    Utilities.sleep(3000);
  }

  if (written === 0) log.push('[Blogs] No "Idea" rows found ready to write.');
  return log;
}

function writeBlogPost(title, keyword, intent, cluster, wordCount) {
  var prompt =
    'You are an expert SEO content writer for SecurityBlogs (securityblogs.com.au), ' +
    'a specialist SEO and digital marketing agency for the physical security industry in Australia.\n\n' +
    'Write a complete, publish-ready blog post:\n\n' +
    'Title: ' + title + '\n' +
    'Primary keyword: ' + keyword + '\n' +
    'Search intent: ' + intent + '\n' +
    'Topic cluster: ' + cluster + '\n' +
    'Target word count: ' + wordCount + ' words\n\n' +
    'Requirements:\n' +
    '- Australian English spelling throughout (optimise, analyse, colour, behaviour, etc.)\n' +
    '- E-E-A-T: write with genuine expertise and authority\n' +
    '- Structure: Intro → H2 sections with H3 subsections → Conclusion with CTA\n' +
    '- Include practical, actionable advice specific to Australian security businesses\n' +
    '- Naturally use the primary keyword in: title, first paragraph, one H2, conclusion\n' +
    '- End with a CTA linking to the relevant SecurityBlogs service page\n' +
    '- Write in clear, professional Australian English — no AI-sounding phrases\n' +
    '- Use Markdown formatting (## for H2, ### for H3, **bold**, bullet lists)\n\n' +
    'Write the complete post now:';

  return callClaude(prompt, 4000);
}

function saveDraftToDoc(title, content) {
  var doc = DocumentApp.create('[DRAFT] ' + title);
  doc.getBody().setText(content);
  doc.saveAndClose();
  // Move to a "SEO Blog Drafts" folder if it exists, otherwise root Drive
  return doc.getUrl();
}

// ════════════════════════════════════════════════════════
// 5. KEYWORD RESEARCH
//    Claude generates 15 keyword ideas → adds to Blog Posting as "Idea" rows
// ════════════════════════════════════════════════════════

function findKeywords() {
  var log = ['[Keywords] Generating keyword ideas...'];

  if (!checkApiKey()) { log.push('[Keywords] ❌ No API key set.'); return log; }

  var sh = getSheet('✍️ Blog Posting');
  var lastRow = Math.max(sh.getLastRow(), 2);
  var existing = sh.getRange(3, 3, lastRow - 2, 1).getValues().flat().filter(String);

  var prompt =
    'You are an SEO keyword researcher for SecurityBlogs (securityblogs.com.au), ' +
    'an SEO and digital marketing agency for the physical security industry in Australia.\n\n' +
    'Generate 15 high-value blog post keyword opportunities. Focus on:\n' +
    '- Security company SEO and digital marketing\n' +
    '- AI visibility (AEO, GEO, AIO) for security businesses\n' +
    '- Local SEO for Australian security installers (CCTV, access control, alarms)\n' +
    '- Security industry content marketing and lead generation\n\n' +
    'Prioritise keywords that are:\n' +
    '- Long-tail (3-5 words) with clear search intent\n' +
    '- Achievable for a specialist agency blog (not mega-broad)\n' +
    '- Useful for Australian audiences\n\n' +
    'Already have these keywords (do NOT repeat): ' + existing.slice(0, 30).join(', ') + '\n\n' +
    'Return ONLY valid JSON array:\n' +
    '[{"title":"Blog post working title","keyword":"primary keyword","intent":"Informational","cluster":"Security SEO","word_count":2000}]\n\n' +
    'Clusters must be one of: Security SEO, AEO, GEO, AI Visibility, Security Marketing, Guest Posting, Cybersecurity PR';

  var raw = callClaude(prompt, 2000);
  var ideas = parseJSON(raw);
  if (!ideas || !ideas.length) {
    log.push('[Keywords] ⚠️ No keyword ideas returned.');
    return log;
  }

  var nextRow = lastRow + 1;
  var nextNum = lastRow - 1;
  ideas.forEach(function(idea) {
    nextNum++;
    sh.getRange(nextRow, 1, 1, 6).setValues([[
      nextNum,
      idea.title || '',
      idea.keyword || '',
      idea.intent || 'Informational',
      idea.cluster || 'Security SEO',
      'Idea'
    ]]);
    sh.getRange(nextRow, 13).setValue(idea.word_count || 2000);
    nextRow++;
    log.push('[Keywords] ✅ Added: ' + idea.keyword);
  });

  return log;
}

// ════════════════════════════════════════════════════════
// 🔁  TRIGGER SETUP — run this ONCE to schedule the daily bot
// ════════════════════════════════════════════════════════

function setupBotTriggers() {
  // Delete any existing bot triggers first
  ScriptApp.getProjectTriggers().forEach(function(t) {
    if (t.getHandlerFunction() === 'runFullBot') {
      ScriptApp.deleteTrigger(t);
    }
  });

  // Run every day at 8am
  ScriptApp.newTrigger('runFullBot')
    .timeBased()
    .everyDays(1)
    .atHour(8)
    .create();

  SpreadsheetApp.getUi().alert(
    '✅ Bot scheduled!\n\nrunFullBot() will run automatically every day at 8am.\n\nMake sure your Claude API key is set in BOT_CONFIG.'
  );
}

function removeBotTriggers() {
  var removed = 0;
  ScriptApp.getProjectTriggers().forEach(function(t) {
    if (t.getHandlerFunction() === 'runFullBot') {
      ScriptApp.deleteTrigger(t);
      removed++;
    }
  });
  SpreadsheetApp.getUi().alert('Removed ' + removed + ' bot trigger(s).');
}

// ════════════════════════════════════════════════════════
// 📋  BOT LOG — writes to a "🤖 Bot Log" tab
// ════════════════════════════════════════════════════════

function writeBotLog(text) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName('🤖 Bot Log');
  if (!sh) {
    sh = ss.insertSheet('🤖 Bot Log');
    sh.setTabColor('#7c3aed');
    sh.getRange(1, 1).setValue('🤖 SEO Bot Activity Log')
      .setBackground('#0f172a').setFontColor('#ffffff')
      .setFontWeight('bold').setFontSize(12);
    sh.setColumnWidth(1, 80);
    sh.setColumnWidth(2, 900);
    sh.getRange(2, 1, 1, 2).setValues([['Timestamp','Log']])
      .setBackground('#1e293b').setFontColor('#ffffff').setFontWeight('bold');
    sh.setFrozenRows(2);
  }
  var nextRow = Math.max(sh.getLastRow() + 1, 3);
  sh.getRange(nextRow, 1, 1, 2).setValues([[new Date(), text]]);
  sh.setRowHeight(nextRow, 20);
}

// ════════════════════════════════════════════════════════
// 🔧  UTILITY FUNCTIONS
// ════════════════════════════════════════════════════════

function callClaude(prompt, maxTokens) {
  if (!checkApiKey()) throw new Error('Claude API key not set in BOT_CONFIG.');

  var payload = {
    model: BOT_CONFIG.CLAUDE_MODEL,
    max_tokens: maxTokens || 1000,
    messages: [{ role: 'user', content: prompt }]
  };

  var options = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      'x-api-key': BOT_CONFIG.CLAUDE_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  var response = UrlFetchApp.fetch('https://api.anthropic.com/v1/messages', options);
  var code = response.getResponseCode();

  if (code !== 200) {
    throw new Error('Claude API error ' + code + ': ' + response.getContentText().substring(0, 200));
  }

  var data = JSON.parse(response.getContentText());
  return data.content && data.content[0] ? data.content[0].text : null;
}

function parseJSON(text) {
  if (!text) return null;
  try {
    // Extract JSON block if wrapped in markdown code fences
    var match = text.match(/```(?:json)?\s*([\s\S]*?)```/);
    var jsonStr = match ? match[1] : text;
    // Find first [ or { and last ] or }
    var start = jsonStr.search(/[\[{]/);
    var end   = Math.max(jsonStr.lastIndexOf(']'), jsonStr.lastIndexOf('}'));
    if (start === -1 || end === -1) return null;
    return JSON.parse(jsonStr.substring(start, end + 1));
  } catch(e) {
    Logger.log('JSON parse error: ' + e.message + '\nRaw: ' + text.substring(0, 300));
    return null;
  }
}

function getSheet(name) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(name);
  if (!sh) throw new Error('Sheet not found: ' + name + '. Run buildSEOOperatingSystem() first.');
  return sh;
}

function guessEmail(contact, domain) {
  // If contact looks like an email already, use it
  if (contact && contact.indexOf('@') > -1) return contact;
  // Otherwise default to editor@ — most publication contact point
  return 'editor@' + domain;
}

function today() {
  return Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'dd/MM/yyyy');
}

function checkApiKey() {
  return BOT_CONFIG.CLAUDE_API_KEY && BOT_CONFIG.CLAUDE_API_KEY !== 'YOUR_CLAUDE_API_KEY_HERE';
}
