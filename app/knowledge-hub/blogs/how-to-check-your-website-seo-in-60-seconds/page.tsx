import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/JsonLd'

export const metadata: Metadata = {
  title: "How to Check Your Website's SEO in 60 Seconds | SecurityBlogs",
  description:
    'Install the free SEO META in 1 CLICK Chrome extension and learn to read meta tags, heading structure, image alt text and SERP previews for your security business website.',
  alternates: { canonical: '/knowledge-hub/blogs/how-to-check-your-website-seo-in-60-seconds/' },
  openGraph: {
    title: "How to Check Your Website's SEO in 60 Seconds | SecurityBlogs",
    description:
      'Install the free SEO META in 1 CLICK Chrome extension and learn to read meta tags, heading structure, image alt text and SERP previews for your security business website.',
    url: '/knowledge-hub/blogs/how-to-check-your-website-seo-in-60-seconds/',
    siteName: 'SecurityBlogs',
    type: 'article',
    publishedTime: '2026-06-23',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: "How to Check Your Website's SEO in 60 Seconds",
  description:
    'Install the free SEO META in 1 CLICK Chrome extension and learn to read meta tags, heading structure, image alt text and SERP previews for your security business website.',
  datePublished: '2026-06-23',
  dateModified: '2026-06-23',
  image: 'https://securityblogs.com.au/og-image.png',
  author: { '@type': 'Person', name: 'SecurityBlogs Team', url: 'https://securityblogs.com.au/about-us/' },
  publisher: { '@type': 'Organization', name: 'SecurityBlogs' },
  mainEntityOfPage: 'https://securityblogs.com.au/knowledge-hub/blogs/how-to-check-your-website-seo-in-60-seconds/',
}

const html = `
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }

.guide-wrap { max-width: 680px; padding: 0 0 2rem; }

.guide-hero {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  border-radius: 16px;
  padding: 2rem 1.5rem;
  margin-bottom: 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}
.guide-hero::before {
  content: '';
  position: absolute;
  top: -30px; right: -30px;
  width: 120px; height: 120px;
  border-radius: 50%;
  background: rgba(99,102,241,0.15);
}
.brand-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255,255,255,0.1);
  border: 0.5px solid rgba(255,255,255,0.2);
  border-radius: 20px;
  padding: 4px 14px;
  font-size: 12px;
  color: #a5b4fc;
  margin-bottom: 1rem;
  letter-spacing: 0.5px;
}
.brand-dot { width: 8px; height: 8px; background: #6366f1; border-radius: 50%; }
.guide-hero h1 { font-size: 22px; font-weight: 500; color: #fff; margin-bottom: 0.5rem; line-height: 1.3; }
.guide-hero p { font-size: 14px; color: rgba(255,255,255,0.65); line-height: 1.6; }

.progress-bar {
  display: flex;
  align-items: center;
  gap: 0;
  margin-bottom: 2rem;
  background: #f9fafb;
  border-radius: 16px;
  padding: 0.75rem 1rem;
  border: 0.5px solid #e5e7eb;
  overflow-x: auto;
}
.step-dot {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  flex: 1;
  min-width: 60px;
  cursor: pointer;
  transition: opacity 0.2s;
}
.step-dot:hover { opacity: 0.8; }
.dot-circle {
  width: 28px; height: 28px;
  border-radius: 50%;
  border: 1.5px solid #d1d5db;
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 500;
  color: #6b7280;
  background: #fff;
  transition: all 0.3s;
}
.dot-circle.active { background: #6366f1; border-color: #6366f1; color: #fff; }
.dot-circle.done { background: #10b981; border-color: #10b981; color: #fff; }
.dot-label { font-size: 10px; color: #9ca3af; text-align: center; line-height: 1.2; }
.dot-line { flex: 1; height: 1.5px; background: #e5e7eb; min-width: 12px; }
.dot-line.done { background: #10b981; }

.step-card {
  display: none;
  border-radius: 16px;
  border: 0.5px solid #e5e7eb;
  overflow: hidden;
  margin-bottom: 1.5rem;
}
.step-card.active { display: block; }

.step-header {
  padding: 1rem 1.25rem;
  background: #f9fafb;
  border-bottom: 0.5px solid #e5e7eb;
  display: flex;
  align-items: center;
  gap: 12px;
}
.step-num {
  width: 32px; height: 32px;
  border-radius: 50%;
  background: #6366f1;
  color: #fff;
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; font-weight: 500;
  flex-shrink: 0;
}
.step-title { font-size: 16px; font-weight: 500; color: #111827; }
.step-subtitle { font-size: 12px; color: #6b7280; margin-top: 2px; }
.step-body { padding: 1.25rem; background: #fff; }

.mock-browser {
  border: 0.5px solid #d1d5db;
  border-radius: 10px;
  overflow: hidden;
  margin: 1rem 0;
}
.browser-bar {
  background: #f9fafb;
  padding: 8px 12px;
  display: flex; align-items: center; gap: 8px;
  border-bottom: 0.5px solid #e5e7eb;
}
.browser-dots { display: flex; gap: 5px; }
.bd { width: 10px; height: 10px; border-radius: 50%; }
.bd-r { background: #ff5f57; }
.bd-y { background: #febc2e; }
.bd-g { background: #28c840; }
.url-bar {
  flex: 1;
  background: #fff;
  border: 0.5px solid #e5e7eb;
  border-radius: 12px;
  padding: 4px 10px;
  font-size: 12px;
  color: #6b7280;
  display: flex; align-items: center; gap: 6px;
}
.lock-icon { color: #10b981; font-size: 12px; }

.ext-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border: 0.5px solid #e5e7eb;
  border-radius: 10px;
  margin: 8px 0;
  background: #fff;
}
.ext-icon {
  width: 36px; height: 36px;
  background: #1e40af;
  border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  font-size: 10px; font-weight: 500; color: #fff; text-align: center;
  flex-shrink: 0;
}
.ext-name { font-size: 13px; font-weight: 500; color: #111827; }
.ext-rating { font-size: 11px; color: #6b7280; }
.ext-btn {
  margin-left: auto;
  background: #1a73e8;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 6px 14px;
  font-size: 12px;
  cursor: pointer;
}

.toolbar-mock {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
  padding: 8px 12px;
  background: #f9fafb;
  border-radius: 10px;
  border: 0.5px solid #e5e7eb;
  margin: 1rem 0;
}
.toolbar-icon {
  width: 28px; height: 28px;
  background: #fff;
  border: 0.5px solid #e5e7eb;
  border-radius: 6px;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px;
  cursor: pointer;
}
.toolbar-icon.highlighted {
  border-color: #6366f1;
  background: #eef2ff;
  animation: gpulse 1.5s infinite;
}
@keyframes gpulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(99,102,241,0.4); }
  50% { box-shadow: 0 0 0 4px rgba(99,102,241,0); }
}

.seo-panel {
  border: 0.5px solid #d1d5db;
  border-radius: 10px;
  overflow: hidden;
  margin: 1rem 0;
  font-size: 13px;
}
.panel-header {
  background: #1e1e2e;
  color: #a5b4fc;
  padding: 8px 12px;
  display: flex; align-items: center; gap: 8px;
  font-size: 12px; font-weight: 500;
}
.panel-row {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 12px;
  border-bottom: 0.5px solid #f3f4f6;
}
.panel-row:last-child { border-bottom: none; }
.panel-label { width: 90px; flex-shrink: 0; color: #6b7280; font-size: 12px; padding-top: 2px; }
.panel-value { flex: 1; color: #111827; font-size: 12px; line-height: 1.5; }
.tag-good { display: inline-block; background: #dcfce7; color: #166534; border-radius: 4px; padding: 1px 6px; font-size: 11px; font-weight: 500; }
.tag-warn { display: inline-block; background: #fef9c3; color: #854d0e; border-radius: 4px; padding: 1px 6px; font-size: 11px; font-weight: 500; }
.tag-bad { display: inline-block; background: #fee2e2; color: #991b1b; border-radius: 4px; padding: 1px 6px; font-size: 11px; font-weight: 500; }
.char-count { font-size: 11px; color: #9ca3af; margin-top: 3px; }

.tip-box {
  background: #eef2ff;
  border: 0.5px solid #c7d2fe;
  border-radius: 10px;
  padding: 10px 14px;
  margin: 1rem 0;
  display: flex;
  gap: 10px;
  align-items: flex-start;
}
.tip-icon { color: #6366f1; font-size: 18px; flex-shrink: 0; margin-top: 1px; }
.tip-text { font-size: 13px; color: #3730a3; line-height: 1.5; }

.warn-box {
  background: #fffbeb;
  border: 0.5px solid #fde68a;
  border-radius: 10px;
  padding: 10px 14px;
  margin: 1rem 0;
  display: flex;
  gap: 10px;
  align-items: flex-start;
}
.warn-icon { color: #d97706; font-size: 18px; flex-shrink: 0; margin-top: 1px; }
.warn-text { font-size: 13px; color: #92400e; line-height: 1.5; }

.good-box {
  background: #f0fdf4;
  border: 0.5px solid #bbf7d0;
  border-radius: 10px;
  padding: 10px 14px;
  margin: 1rem 0;
  display: flex;
  gap: 10px;
  align-items: flex-start;
}
.good-icon { color: #10b981; font-size: 18px; flex-shrink: 0; margin-top: 1px; }
.good-text { font-size: 13px; color: #065f46; line-height: 1.5; }

.step-instruction {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 0.5px solid #f3f4f6;
}
.step-instruction:last-child { border-bottom: none; }
.instr-num {
  width: 22px; height: 22px; border-radius: 50%;
  background: #6366f1; color: #fff;
  display: flex; align-items: center; justify-content: center;
  font-size: 11px; font-weight: 500; flex-shrink: 0; margin-top: 1px;
}
.instr-text { font-size: 13px; color: #111827; line-height: 1.6; }
.instr-text strong { font-weight: 500; }

.watermark {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 10px;
  color: rgba(255,255,255,0.5);
  margin-top: 8px;
  justify-content: center;
}
.watermark-logo {
  background: #6366f1;
  color: #fff;
  border-radius: 4px;
  padding: 1px 5px;
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.3px;
}

.nav-row {
  display: flex;
  gap: 10px;
  margin-top: 1.25rem;
  align-items: center;
}
.btn-next {
  background: #6366f1;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 9px 20px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s;
}
.btn-next:hover { opacity: 0.9; }
.btn-prev {
  background: #f9fafb;
  color: #6b7280;
  border: 0.5px solid #d1d5db;
  border-radius: 8px;
  padding: 9px 20px;
  font-size: 13px;
  cursor: pointer;
}
.btn-prev:hover { background: #f3f4f6; }
.step-counter { margin-left: auto; font-size: 12px; color: #9ca3af; }

.conversion-card {
  background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
  border-radius: 16px;
  padding: 1.75rem;
  text-align: center;
  margin-top: 1rem;
}
.conv-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(99,102,241,0.25);
  border: 0.5px solid rgba(99,102,241,0.4);
  border-radius: 20px;
  padding: 4px 12px;
  font-size: 11px;
  color: #a5b4fc;
  margin-bottom: 1rem;
}
.conv-title { font-size: 20px; font-weight: 500; color: #fff; margin-bottom: 0.5rem; }
.conv-sub { font-size: 13px; color: rgba(255,255,255,0.6); margin-bottom: 1.5rem; line-height: 1.6; }
.conv-features {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-bottom: 1.5rem;
  text-align: left;
}
.conv-feat { display: flex; align-items: center; gap: 8px; font-size: 12px; color: rgba(255,255,255,0.8); }
.feat-dot { width: 6px; height: 6px; background: #a5b4fc; border-radius: 50%; flex-shrink: 0; }
.cta-btn {
  display: inline-block;
  background: #6366f1;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 11px 28px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.2s;
}
.cta-btn:hover { background: #4f46e5; }
.cta-secondary {
  display: block;
  margin-top: 10px;
  font-size: 12px;
  color: rgba(255,255,255,0.4);
  cursor: pointer;
  text-decoration: underline;
}

.sb-logo-strip {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  background: rgba(99,102,241,0.08);
  border-top: 0.5px solid rgba(99,102,241,0.15);
  font-size: 10px;
  color: #6b7280;
}
.sb-logo-pill {
  background: #6366f1;
  color: #fff;
  border-radius: 4px;
  padding: 1px 5px;
  font-size: 9px;
  font-weight: 500;
}
.serp-preview {
  border: 0.5px solid #e5e7eb;
  border-radius: 10px;
  padding: 12px;
  margin: 1rem 0;
  background: #fff;
}
.serp-url { font-size: 11px; color: #188038; margin-bottom: 3px; }
.serp-title { font-size: 18px; color: #1a0dab; font-weight: 400; margin-bottom: 4px; cursor: pointer; }
.serp-title:hover { text-decoration: underline; }
.serp-desc { font-size: 13px; color: #6b7280; line-height: 1.5; }
.char-pill { display: inline-block; border-radius: 4px; padding: 1px 6px; font-size: 11px; font-weight: 500; margin-left: 6px; }
.cp-good { background: #dcfce7; color: #166534; }
.cp-warn { background: #fef9c3; color: #854d0e; }
.cp-bad { background: #fee2e2; color: #991b1b; }

.heading-tree { padding: 0.75rem; background: #f9fafb; border-radius: 10px; margin: 1rem 0; }
.h-item { display: flex; gap: 8px; align-items: center; padding: 4px 0; font-size: 12px; color: #111827; }
.h-tag { font-family: monospace; font-size: 10px; padding: 1px 5px; border-radius: 3px; font-weight: 500; flex-shrink: 0; }
.h-h1 { background: #dbeafe; color: #1e40af; }
.h-h2 { background: #ede9fe; color: #5b21b6; margin-left: 14px; }
.h-h3 { background: #fce7f3; color: #9d174d; margin-left: 28px; }

.img-check { display: flex; flex-direction: column; gap: 6px; margin: 1rem 0; }
.img-row { display: flex; align-items: center; gap: 10px; font-size: 12px; padding: 7px 10px; background: #f9fafb; border-radius: 10px; border: 0.5px solid #e5e7eb; }
.img-thumb { width: 36px; height: 28px; background: #e5e7eb; border-radius: 4px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 10px; color: #6b7280; }
.img-name { flex: 1; color: #111827; font-family: monospace; font-size: 11px; }

.quiz-box { border: 0.5px solid #d1d5db; border-radius: 10px; overflow: hidden; margin: 1rem 0; }
.quiz-q { padding: 10px 14px; background: #f9fafb; font-size: 13px; font-weight: 500; color: #111827; border-bottom: 0.5px solid #e5e7eb; }
.quiz-opts { padding: 10px; display: flex; flex-direction: column; gap: 6px; }
.quiz-opt {
  padding: 8px 12px;
  border-radius: 8px;
  border: 0.5px solid #e5e7eb;
  font-size: 12px;
  cursor: pointer;
  color: #111827;
  background: #fff;
  transition: all 0.2s;
  text-align: left;
}
.quiz-opt:hover { border-color: #6366f1; background: #eef2ff; }
.quiz-opt.correct { background: #f0fdf4; border-color: #10b981; color: #065f46; }
.quiz-opt.wrong { background: #fef2f2; border-color: #ef4444; color: #991b1b; }
</style>

<div class="guide-wrap">

  <div class="guide-hero">
    <div class="brand-badge"><div class="brand-dot"></div> SecurityBlogs.com.au — AI Visibility Platform</div>
    <h1>How to Check Your Website's SEO in 60 Seconds</h1>
    <p>A step-by-step guide to installing the "SEO META in 1 CLICK" Chrome extension and reading your SEO data like a pro.</p>
    <div class="watermark"><span class="watermark-logo">SB</span> securityblogs.com.au</div>
  </div>

  <div class="progress-bar" id="progressBar">
    <div class="step-dot" onclick="goTo(0)"><div class="dot-circle active" id="d0">1</div><div class="dot-label">Install</div></div>
    <div class="dot-line" id="l0"></div>
    <div class="step-dot" onclick="goTo(1)"><div class="dot-circle" id="d1">2</div><div class="dot-label">Open</div></div>
    <div class="dot-line" id="l1"></div>
    <div class="step-dot" onclick="goTo(2)"><div class="dot-circle" id="d2">3</div><div class="dot-label">Meta Tags</div></div>
    <div class="dot-line" id="l2"></div>
    <div class="step-dot" onclick="goTo(3)"><div class="dot-circle" id="d3">4</div><div class="dot-label">Headings</div></div>
    <div class="dot-line" id="l3"></div>
    <div class="step-dot" onclick="goTo(4)"><div class="dot-circle" id="d4">5</div><div class="dot-label">Images</div></div>
    <div class="dot-line" id="l4"></div>
    <div class="step-dot" onclick="goTo(5)"><div class="dot-circle" id="d5">6</div><div class="dot-label">SERP</div></div>
    <div class="dot-line" id="l5"></div>
    <div class="step-dot" onclick="goTo(6)"><div class="dot-circle" id="d6">7</div><div class="dot-label">Next Steps</div></div>
  </div>

  <!-- STEP 1 -->
  <div class="step-card active" id="step0">
    <div class="step-header"><div class="step-num">1</div><div><div class="step-title">Install the Extension</div><div class="step-subtitle">Add "SEO META in 1 CLICK" to Chrome — it's free</div></div></div>
    <div class="step-body">
      <div class="step-instruction"><div class="instr-num">1</div><div class="instr-text">Open <strong>Google Chrome</strong> on your computer. This extension only works in Chrome (or Chromium-based browsers like Edge or Brave).</div></div>
      <div class="step-instruction"><div class="instr-num">2</div><div class="instr-text">Go to the Chrome Web Store — type <strong>chrome.google.com/webstore</strong> in the address bar and press Enter.</div></div>
      <div class="step-instruction"><div class="instr-num">3</div><div class="instr-text">Search for <strong>"SEO META in 1 CLICK"</strong> in the search box at the top left of the Web Store.</div></div>
      <div class="step-instruction"><div class="instr-num">4</div><div class="instr-text">Click the result that looks exactly like this:</div></div>
      <div class="mock-browser">
        <div class="browser-bar"><div class="browser-dots"><div class="bd bd-r"></div><div class="bd bd-y"></div><div class="bd bd-g"></div></div><div class="url-bar">&#x1F512; chrome.google.com/webstore</div></div>
        <div style="padding:12px;">
          <div class="ext-item" style="border-color:#6366f1;background:#fafafa;">
            <div class="ext-icon" style="background:#1e40af;font-size:9px;line-height:1.3;text-align:center;padding:4px;">SEO<br>META</div>
            <div><div class="ext-name">SEO META in 1 CLICK</div><div class="ext-rating">⭐ 4.6 · 200,000+ users · Free</div></div>
            <button class="ext-btn">Add to Chrome</button>
          </div>
        </div>
        <div class="sb-logo-strip"><span class="sb-logo-pill">SB</span> Guide by SecurityBlogs.com.au — Be the answer AI gives.</div>
      </div>
      <div class="step-instruction"><div class="instr-num">5</div><div class="instr-text">Click <strong>"Add to Chrome"</strong> → then click <strong>"Add extension"</strong> in the popup. Chrome installs it in under 5 seconds.</div></div>
      <div class="good-box"><div class="good-icon">✓</div><div class="good-text"><strong>You'll know it's installed</strong> when you see a small puzzle-piece icon appear in your Chrome toolbar, and a confirmation message says "SEO META in 1 CLICK has been added to Chrome."</div></div>
    </div>
    <div style="padding:0 1.25rem 1.25rem;"><div class="nav-row"><button class="btn-next" onclick="goTo(1)">Next: Open the Extension →</button><span class="step-counter">Step 1 of 7</span></div></div>
  </div>

  <!-- STEP 2 -->
  <div class="step-card" id="step1">
    <div class="step-header"><div class="step-num">2</div><div><div class="step-title">Open It on Any Website</div><div class="step-subtitle">Pin it to your toolbar for easy access</div></div></div>
    <div class="step-body">
      <div class="step-instruction"><div class="instr-num">1</div><div class="instr-text">Navigate to <strong>any website you want to check</strong> — for example, your own business website or a competitor's site.</div></div>
      <div class="step-instruction"><div class="instr-num">2</div><div class="instr-text">Click the <strong>puzzle piece icon</strong> in the top-right corner of Chrome to see all your extensions.</div></div>
      <div class="step-instruction"><div class="instr-num">3</div><div class="instr-text">Find <strong>"SEO META in 1 CLICK"</strong> and click the <strong>pin icon</strong> next to it so it always shows in your toolbar.</div></div>
      <div class="toolbar-mock">
        <span style="font-size:11px;color:#9ca3af;margin-right:auto;">yourwebsite.com.au</span>
        <div class="toolbar-icon">🏠</div>
        <div class="toolbar-icon">⭐</div>
        <div class="toolbar-icon highlighted" title="SEO META in 1 CLICK">S</div>
        <div class="toolbar-icon">🧩</div>
      </div>
      <p style="font-size:12px;color:#9ca3af;margin-top:-4px;margin-bottom:12px;">↑ The <strong style="font-weight:500;">S</strong> icon (highlighted in purple) is your SEO META extension — now pinned to the toolbar.</p>
      <div class="step-instruction"><div class="instr-num">4</div><div class="instr-text"><strong>Click the S icon</strong> while you're on any webpage. A panel will instantly open showing you all the SEO data for that page.</div></div>
      <div class="tip-box"><div class="tip-icon">💡</div><div class="tip-text"><strong>Pro tip:</strong> Start with your own website's homepage. Navigate to it first, then click the extension. This gives you an immediate snapshot of what Google sees when it visits your site.</div></div>
      <div class="mock-browser">
        <div class="browser-bar"><div class="browser-dots"><div class="bd bd-r"></div><div class="bd bd-y"></div><div class="bd bd-g"></div></div><div class="url-bar">&#x1F512; yourbusiness.com.au</div></div>
        <div style="padding:12px 12px 0;">
          <div style="font-size:11px;color:#9ca3af;margin-bottom:8px;">Extension panel opens instantly →</div>
          <div style="border:0.5px solid #d1d5db;border-radius:8px;overflow:hidden;">
            <div style="background:#1e1e2e;padding:8px 12px;font-size:11px;color:#a5b4fc;display:flex;align-items:center;justify-content:space-between;"><span>SEO META in 1 CLICK</span><span style="background:rgba(99,102,241,0.2);padding:2px 7px;border-radius:10px;font-size:10px;">yourbusiness.com.au</span></div>
            <div style="padding:10px 12px;display:flex;gap:10px;">
              <div style="flex:1;text-align:center;padding:8px;background:#f9fafb;border-radius:6px;"><div style="font-size:11px;color:#9ca3af;">Meta Title</div><div style="font-size:14px;font-weight:500;color:#10b981;margin-top:2px;">✓</div></div>
              <div style="flex:1;text-align:center;padding:8px;background:#f9fafb;border-radius:6px;"><div style="font-size:11px;color:#9ca3af;">Description</div><div style="font-size:14px;font-weight:500;color:#f59e0b;margin-top:2px;">⚠</div></div>
              <div style="flex:1;text-align:center;padding:8px;background:#f9fafb;border-radius:6px;"><div style="font-size:11px;color:#9ca3af;">H1 Tags</div><div style="font-size:14px;font-weight:500;color:#10b981;margin-top:2px;">✓</div></div>
              <div style="flex:1;text-align:center;padding:8px;background:#f9fafb;border-radius:6px;"><div style="font-size:11px;color:#9ca3af;">Images</div><div style="font-size:14px;font-weight:500;color:#ef4444;margin-top:2px;">✗</div></div>
            </div>
          </div>
        </div>
        <div class="sb-logo-strip"><span class="sb-logo-pill">SB</span> Guide by SecurityBlogs.com.au — Be the answer AI gives.</div>
      </div>
    </div>
    <div style="padding:0 1.25rem 1.25rem;"><div class="nav-row"><button class="btn-prev" onclick="goTo(0)">← Back</button><button class="btn-next" onclick="goTo(2)">Next: Read Meta Tags →</button><span class="step-counter">Step 2 of 7</span></div></div>
  </div>

  <!-- STEP 3 -->
  <div class="step-card" id="step2">
    <div class="step-header"><div class="step-num">3</div><div><div class="step-title">Understanding Meta Tags</div><div class="step-subtitle">The first thing Google reads about your page</div></div></div>
    <div class="step-body">
      <p style="font-size:13px;color:#6b7280;margin-bottom:1rem;line-height:1.6;">The extension shows you two critical meta tags: <strong style="font-weight:500;color:#111827;">Title</strong> and <strong style="font-weight:500;color:#111827;">Description</strong>. Here's how to read what it tells you:</p>
      <div class="seo-panel">
        <div class="panel-header">🏷 Meta Tags — What the extension shows you</div>
        <div class="panel-row"><div class="panel-label">Title</div><div class="panel-value">Security Guard Services Melbourne | StateGuard<br><div class="char-count">55 characters <span class="tag-good">Good</span></div></div></div>
        <div class="panel-row"><div class="panel-label">Description</div><div class="panel-value">Professional licensed security guards in Melbourne. 24/7 patrol, event security &amp; corporate protection. Get a free quote today. Serving all Melbourne suburbs.<br><div class="char-count">160 characters <span class="tag-good">Good</span></div></div></div>
        <div class="panel-row"><div class="panel-label">Keywords</div><div class="panel-value"><span class="tag-warn">Not set</span> — Keywords meta tag is ignored by Google, so this doesn't matter.</div></div>
        <div class="panel-row"><div class="panel-label">Robots</div><div class="panel-value">index, follow <span class="tag-good">Indexable</span></div></div>
        <div class="panel-row"><div class="panel-label">Canonical</div><div class="panel-value" style="font-family:monospace;font-size:11px;word-break:break-all;">https://stateguard.com.au/security-guards-melbourne/ <span class="tag-good">Set</span></div></div>
      </div>
      <p style="font-size:13px;font-weight:500;color:#111827;margin-bottom:8px;">What do the colours mean?</p>
      <div style="display:flex;flex-direction:column;gap:6px;margin-bottom:1rem;">
        <div style="display:flex;gap:10px;align-items:center;font-size:12px;"><span class="tag-good">Good</span> <span style="color:#6b7280;">Within the ideal range — Google will display it correctly in search results.</span></div>
        <div style="display:flex;gap:10px;align-items:center;font-size:12px;"><span class="tag-warn">Warning</span> <span style="color:#6b7280;">Too short, too long, or missing — Google may rewrite it or show something else.</span></div>
        <div style="display:flex;gap:10px;align-items:center;font-size:12px;"><span class="tag-bad">Error</span> <span style="color:#6b7280;">Missing entirely — this is hurting your rankings and click-through rate right now.</span></div>
      </div>
      <p style="font-size:13px;font-weight:500;color:#111827;margin-bottom:6px;">Ideal character counts to remember:</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:1rem;">
        <div style="padding:10px;background:#f9fafb;border-radius:10px;border:0.5px solid #e5e7eb;"><div style="font-size:11px;color:#9ca3af;">Meta Title</div><div style="font-size:16px;font-weight:500;color:#111827;">50–60 chars</div><div style="font-size:11px;color:#9ca3af;">Ideal range</div></div>
        <div style="padding:10px;background:#f9fafb;border-radius:10px;border:0.5px solid #e5e7eb;"><div style="font-size:11px;color:#9ca3af;">Meta Description</div><div style="font-size:16px;font-weight:500;color:#111827;">140–160 chars</div><div style="font-size:11px;color:#9ca3af;">Ideal range</div></div>
      </div>
      <div class="quiz-box" id="quiz1">
        <div class="quiz-q">❓ Quick check: Your title tag shows 72 characters. What does that mean?</div>
        <div class="quiz-opts">
          <button class="quiz-opt" onclick="answerQuiz('quiz1',this,false)">It's fine — longer titles rank better</button>
          <button class="quiz-opt" onclick="answerQuiz('quiz1',this,true)">It's too long — Google may cut it off in search results</button>
          <button class="quiz-opt" onclick="answerQuiz('quiz1',this,false)">It's too short — you need at least 80 characters</button>
        </div>
      </div>
    </div>
    <div style="padding:0 1.25rem 1.25rem;"><div class="nav-row"><button class="btn-prev" onclick="goTo(1)">← Back</button><button class="btn-next" onclick="goTo(3)">Next: Check Headings →</button><span class="step-counter">Step 3 of 7</span></div></div>
  </div>

  <!-- STEP 4 -->
  <div class="step-card" id="step3">
    <div class="step-header"><div class="step-num">4</div><div><div class="step-title">Reading the Heading Structure</div><div class="step-subtitle">H1, H2, H3 — your page's content hierarchy</div></div></div>
    <div class="step-body">
      <p style="font-size:13px;color:#6b7280;margin-bottom:1rem;line-height:1.6;">Headings tell Google what your page is about and how it's organised. The extension shows you every heading tag on the page in a tree structure.</p>
      <div class="heading-tree">
        <div style="font-size:11px;color:#9ca3af;margin-bottom:8px;font-weight:500;">HEADING TREE — GOOD EXAMPLE</div>
        <div class="h-item"><span class="h-tag h-h1">H1</span> Security Guard Services in Melbourne</div>
        <div class="h-item"><span class="h-tag h-h2">H2</span> What Our Security Guards Do</div>
        <div class="h-item"><span class="h-tag h-h3">H3</span> Patrol &amp; Monitoring</div>
        <div class="h-item"><span class="h-tag h-h3">H3</span> Access Control</div>
        <div class="h-item"><span class="h-tag h-h2">H2</span> Areas We Serve</div>
        <div class="h-item"><span class="h-tag h-h3">H3</span> CBD &amp; Inner Suburbs</div>
        <div class="h-item"><span class="h-tag h-h2">H2</span> Why Choose StateGuard?</div>
      </div>
      <div class="good-box" style="margin-top:0;"><div class="good-icon">✓</div><div class="good-text">One H1, multiple H2s below it, H3s only inside H2 sections. Clean, logical, easy for Google to follow.</div></div>
      <p style="font-size:13px;font-weight:500;color:#111827;margin:1rem 0 8px;">Common problems to look for:</p>
      <div style="display:flex;flex-direction:column;gap:6px;">
        <div class="warn-box" style="margin:0;"><div class="warn-icon">⚠</div><div class="warn-text"><strong>No H1 tag</strong> — Every page must have exactly one H1. If the extension shows zero H1s, this is a critical fix.</div></div>
        <div class="warn-box" style="margin:0;"><div class="warn-icon">⚠</div><div class="warn-text"><strong>Multiple H1 tags</strong> — If you see 2, 3, or more H1s, Google gets confused about which is the main topic.</div></div>
        <div class="warn-box" style="margin:0;"><div class="warn-icon">⚠</div><div class="warn-text"><strong>Skipped levels</strong> — Going from H1 straight to H4 with no H2 or H3 in between breaks the logical structure.</div></div>
      </div>
      <div class="tip-box" style="margin-top:1rem;"><div class="tip-icon">💡</div><div class="tip-text"><strong>Industry insight:</strong> Security company websites often use H1 tags as decorative banners ("Welcome to Our Company!") instead of keyword-rich headings. Your H1 should always include your main service and location — e.g. "Security Guard Services Sydney."</div></div>
    </div>
    <div style="padding:0 1.25rem 1.25rem;"><div class="nav-row"><button class="btn-prev" onclick="goTo(2)">← Back</button><button class="btn-next" onclick="goTo(4)">Next: Image Alt Text →</button><span class="step-counter">Step 4 of 7</span></div></div>
  </div>

  <!-- STEP 5 -->
  <div class="step-card" id="step4">
    <div class="step-header"><div class="step-num">5</div><div><div class="step-title">Checking Image Alt Text</div><div class="step-subtitle">Google can't see images — it reads alt text instead</div></div></div>
    <div class="step-body">
      <p style="font-size:13px;color:#6b7280;margin-bottom:1rem;line-height:1.6;">The extension lists every image on the page and shows whether it has alt text. Missing alt text is one of the most common SEO mistakes on Australian security company websites.</p>
      <div class="img-check">
        <div style="font-size:11px;color:#9ca3af;margin-bottom:2px;font-weight:500;">IMAGES FOUND ON PAGE (4)</div>
        <div class="img-row"><div class="img-thumb" style="background:#dbeafe;">🛡</div><div class="img-name">security-guard-patrol.jpg</div><span class="tag-good">Alt set</span></div>
        <div class="img-row"><div class="img-thumb" style="background:#f3f4f6;">🏢</div><div class="img-name">hero-banner-1920.png</div><span class="tag-bad">No alt text</span></div>
        <div class="img-row"><div class="img-thumb" style="background:#fef3c7;">📷</div><div class="img-name">IMG_20240312_093847.jpg</div><span class="tag-warn">Poor filename</span></div>
        <div class="img-row"><div class="img-thumb" style="background:#dcfce7;">👤</div><div class="img-name">team-photo.jpg</div><span class="tag-good">Alt set</span></div>
      </div>
      <div class="warn-box"><div class="warn-icon">⚠</div><div class="warn-text"><strong>hero-banner-1920.png</strong> has no alt text. Fix: add alt text like "Licensed security guards patrolling commercial premises in Melbourne."</div></div>
      <div class="tip-box"><div class="tip-icon">💡</div><div class="tip-text"><strong>The filename problem:</strong> "IMG_20240312_093847.jpg" tells Google nothing. Rename it — e.g. <span style="font-family:monospace;font-size:11px;">stateguard-security-guard-sydney.jpg</span></div></div>
      <p style="font-size:13px;font-weight:500;color:#111827;margin-bottom:8px;">Good vs bad alt text:</p>
      <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:1rem;">
        <div style="padding:8px 12px;background:#fee2e2;border-radius:10px;border:0.5px solid #fecaca;font-size:12px;"><span style="color:#991b1b;font-weight:500;">✗ Bad:</span> <span style="color:#7f1d1d;font-family:monospace;">alt="image1"</span> or no alt at all</div>
        <div style="padding:8px 12px;background:#dcfce7;border-radius:10px;border:0.5px solid #bbf7d0;font-size:12px;"><span style="color:#166534;font-weight:500;">✓ Good:</span> <span style="color:#14532d;font-family:monospace;">alt="Armed security guard at retail centre entrance, Melbourne"</span></div>
      </div>
      <div class="quiz-box" id="quiz2">
        <div class="quiz-q">❓ The extension shows 8 images, all with "No alt text." Which one should you fix first?</div>
        <div class="quiz-opts">
          <button class="quiz-opt" onclick="answerQuiz('quiz2',this,false)">The last image on the page</button>
          <button class="quiz-opt" onclick="answerQuiz('quiz2',this,true)">The hero banner / most prominent image above the fold</button>
          <button class="quiz-opt" onclick="answerQuiz('quiz2',this,false)">The smallest file-size image to save bandwidth</button>
        </div>
      </div>
    </div>
    <div style="padding:0 1.25rem 1.25rem;"><div class="nav-row"><button class="btn-prev" onclick="goTo(3)">← Back</button><button class="btn-next" onclick="goTo(5)">Next: SERP Preview →</button><span class="step-counter">Step 5 of 7</span></div></div>
  </div>

  <!-- STEP 6 -->
  <div class="step-card" id="step5">
    <div class="step-header"><div class="step-num">6</div><div><div class="step-title">The SERP Preview Feature</div><div class="step-subtitle">See exactly how Google will show your page in search</div></div></div>
    <div class="step-body">
      <p style="font-size:13px;color:#6b7280;margin-bottom:1rem;line-height:1.6;">One of the most useful features: the extension shows you a <strong style="font-weight:500;color:#111827;">live preview</strong> of how your page appears in Google search results — before you even check Google itself.</p>
      <div class="mock-browser">
        <div class="browser-bar"><div class="browser-dots"><div class="bd bd-r"></div><div class="bd bd-y"></div><div class="bd bd-g"></div></div><div class="url-bar">🔍 security guards melbourne</div></div>
        <div style="padding:12px;">
          <div style="font-size:11px;color:#9ca3af;margin-bottom:8px;">Google search result preview — from the extension:</div>
          <div class="serp-preview"><div class="serp-url">stateguard.com.au › security-guards-melbourne</div><div class="serp-title">Security Guard Services Melbourne | StateGuard <span class="char-pill cp-good">55 chars ✓</span></div><div class="serp-desc">Professional licensed security guards in Melbourne. 24/7 patrol, event security &amp; corporate protection. Get a free quote today. <span class="char-pill cp-good">160 chars ✓</span></div></div>
          <div class="serp-preview" style="margin-top:8px;border-color:#fde68a;background:#fffbeb;"><div class="serp-url">competitor.com.au › services</div><div class="serp-title" style="color:#9ca3af;">Security Services — Competitor Site <span class="char-pill cp-warn">38 chars ⚠</span></div><div class="serp-desc" style="color:#9ca3af;">Welcome to our website. We provide security services across Australia... <span class="char-pill cp-bad">Rewritten by Google</span></div></div>
        </div>
        <div class="sb-logo-strip"><span class="sb-logo-pill">SB</span> Guide by SecurityBlogs.com.au — Be the answer AI gives.</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:6px;margin-top:1rem;">
        <div class="good-box" style="margin:0;"><div class="good-icon">✓</div><div class="good-text">Title includes the service + city — "Security Guard Services Melbourne"</div></div>
        <div class="good-box" style="margin:0;"><div class="good-icon">✓</div><div class="good-text">Description includes a benefit + call to action — "Get a free quote today"</div></div>
        <div class="good-box" style="margin:0;"><div class="good-icon">✓</div><div class="good-text">Clean URL that matches the keyword — /security-guards-melbourne</div></div>
      </div>
      <div class="tip-box" style="margin-top:1rem;"><div class="tip-icon">💡</div><div class="tip-text"><strong>Test your competitors:</strong> Open a competitor's website, click the extension, and check their SERP preview. If their description is weak, you have an immediate opportunity to outrank them with better-written meta tags.</div></div>
    </div>
    <div style="padding:0 1.25rem 1.25rem;"><div class="nav-row"><button class="btn-prev" onclick="goTo(4)">← Back</button><button class="btn-next" onclick="goTo(6)">Finish: What to do next →</button><span class="step-counter">Step 6 of 7</span></div></div>
  </div>

  <!-- STEP 7 -->
  <div class="step-card" id="step6">
    <div class="step-header"><div class="step-num">7</div><div><div class="step-title">You've Completed the Audit</div><div class="step-subtitle">Here's what to do with what you found</div></div></div>
    <div class="step-body">
      <div class="good-box"><div class="good-icon">🏆</div><div class="good-text">You now know how to read meta tags, heading structure, image alt text, and SERP previews using a free Chrome extension. That puts you ahead of most security business owners in Australia.</div></div>
      <p style="font-size:13px;font-weight:500;color:#111827;margin:1rem 0 8px;">Your quick-fix priority list:</p>
      <div class="step-instruction"><div class="instr-num" style="background:#ef4444;">1</div><div class="instr-text"><strong>Fix missing or duplicate H1 tags</strong> — This is the highest-impact, fastest fix. Takes 5 minutes in your CMS.</div></div>
      <div class="step-instruction"><div class="instr-num" style="background:#f59e0b;">2</div><div class="instr-text"><strong>Rewrite your meta title and description</strong> — Include your service + city in the title. Add a benefit and call to action in the description.</div></div>
      <div class="step-instruction"><div class="instr-num" style="background:#6366f1;">3</div><div class="instr-text"><strong>Add alt text to every image</strong> — Start with the hero image, then work your way down.</div></div>
      <div class="step-instruction"><div class="instr-num" style="background:#10b981;">4</div><div class="instr-text"><strong>Repeat on every key page</strong> — Homepage, each service page, each location page. Takes 10 seconds per page.</div></div>
      <div class="warn-box"><div class="warn-icon">⏱</div><div class="warn-text"><strong>But here's the reality:</strong> Rankings in competitive markets like security in Melbourne, Sydney, or Brisbane require consistent content strategy, backlink building, schema markup, and AI search visibility — not just a clean meta tag.</div></div>
      <div class="conversion-card">
        <div class="conv-badge"><div style="width:6px;height:6px;background:#a5b4fc;border-radius:50%;"></div> SecurityBlogs.com.au</div>
        <div class="conv-title">Want Your Security Business to Be the Answer AI Gives?</div>
        <div class="conv-sub">We help Australian security companies rank on Google AND appear in AI tools like ChatGPT and Gemini. Our AI Visibility Platform is built specifically for the security industry.</div>
        <div class="conv-features">
          <div class="conv-feat"><div class="feat-dot"></div>Full SEO audit for your site</div>
          <div class="conv-feat"><div class="feat-dot"></div>AI citation readiness score</div>
          <div class="conv-feat"><div class="feat-dot"></div>Security industry topical maps</div>
          <div class="conv-feat"><div class="feat-dot"></div>Done-for-you content writing</div>
          <div class="conv-feat"><div class="feat-dot"></div>Schema markup for guards</div>
          <div class="conv-feat"><div class="feat-dot"></div>State licence page creation</div>
        </div>
        <a href="/contact/" class="cta-btn">Get Your Free SEO Audit ↗</a>
        <a href="/contact/" class="cta-secondary">See a sample audit first →</a>
      </div>
    </div>
    <div style="padding:0 1.25rem 1.25rem;"><div class="nav-row"><button class="btn-prev" onclick="goTo(5)">← Back</button><button class="btn-next" onclick="goTo(0)" style="background:#10b981;">Start Over from Step 1</button><span class="step-counter">Step 7 of 7 ✓</span></div></div>
  </div>

</div>

<script>
let current = 0;
const total = 7;
const done = new Set();
function goTo(n) {
  document.getElementById('step' + current).classList.remove('active');
  done.add(current);
  current = n;
  document.getElementById('step' + current).classList.add('active');
  updateProgress();
  window.scrollTo && window.scrollTo(0, 0);
}
function updateProgress() {
  for (let i = 0; i < total; i++) {
    const circle = document.getElementById('d' + i);
    circle.classList.remove('active', 'done');
    if (i === current) circle.classList.add('active');
    else if (done.has(i)) circle.classList.add('done');
    if (i < total - 1) {
      const line = document.getElementById('l' + i);
      if (line) line.classList.toggle('done', done.has(i));
    }
  }
}
function answerQuiz(id, el, correct) {
  const box = document.getElementById(id);
  const opts = box.querySelectorAll('.quiz-opt');
  opts.forEach(o => { o.disabled = true; o.style.cursor = 'default'; });
  el.classList.add(correct ? 'correct' : 'wrong');
  if (correct) {
    el.textContent = '✓ ' + el.textContent + ' — Correct!';
  } else {
    el.textContent = '✗ ' + el.textContent;
    opts.forEach(o => { if (!o.classList.contains('wrong')) o.classList.add('correct'); });
  }
}
</script>
`

export default function SeoIn60SecondsPage() {
  return (
    <>
      <JsonLd data={articleSchema} />
      <article>
        <section className="section" style={{ paddingBottom: 0 }}>
          <div className="container" style={{ maxWidth: 760 }}>
            <div style={{ marginBottom: 16, fontSize: 13.5 }}>
              <Link href="/knowledge-hub/blogs/" style={{ color: 'var(--blue)' }}>← Back to the blog</Link>
            </div>
            <div className="flex items-center gap-2" style={{ marginBottom: 14 }}>
              <span className="chip" style={{ color: 'var(--blue)', borderColor: 'var(--blue)' }}>SEO</span>
              <span className="text-dim" style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5 }}>
                23 June 2026 · 7 min read
              </span>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container" style={{ maxWidth: 760 }}>
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        </section>
      </article>
    </>
  )
}
