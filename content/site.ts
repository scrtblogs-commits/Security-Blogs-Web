/**
 * SITE CONTENT — edit this file to change copy across the site.
 *
 * RULES OF THE GAME (so you don't break the site):
 *  1. Only edit text BETWEEN the single quotes 'like this'.
 *  2. Keep the quotes. Keep the commas at the end of each line.
 *  3. If your text contains a single quote, type \' instead, e.g. 'we\'re live'.
 *  4. Hrefs that start with "/" go to pages on this site (e.g. '/contact/').
 *     Always keep the trailing slash.
 *  5. After saving, the site rebuilds and redeploys automatically (or
 *     re-download the Hostinger zip if you upload manually).
 *
 * See EDITING-GUIDE.md at the root of the repo for screenshots-style steps
 * on how to edit this file from github.com without any tools.
 */

export const SITE = {
  /** Brand identity (used in navbar, footer, page titles). */
  brand: {
    name: 'SecurityGrowth',
    tagline: 'The AI Visibility Platform for Security Brands.',
  },

  /** Homepage editable copy. */
  home: {
    badge: 'LIVE · AI VISIBILITY ENGINE',
    // The headline ("Be the answer AI gives.") is structured for the
    // colored italics — to change the words themselves, edit app/page.tsx.
    lead:
      'When buyers ask ChatGPT, Gemini or Google AI for the best security provider — your brand should be named. We make that happen.',
    ctaPrimary: { label: 'Get your free audit →', href: '/contact/' },
    ctaSecondary: { label: 'Try the live score', href: '/free-tools/' },
    trust: 'Trusted across AU · US · UK · UAE · SG',

    servicesEyebrow: 'What we do',
    servicesTitle: 'One growth engine. Every channel that matters.',
    servicesSub:
      'From classic search to AI answer engines, we own every surface where security buyers discover, compare and choose vendors. Drag, swipe or tap a card to explore.',

    statsEyebrow: 'The results',
    statsTitle: 'Numbers our clients brag about.',
  },

  /** Contact page details (also used by the footer where relevant). */
  contact: {
    email: 'hello@securityblogs.com.au',
    location: 'Australia',
    locationSub: 'Also serving US · UK · UAE · SG',
    responseTime: 'Response within 24 hours',
    responseSub: 'Real humans, fast replies',
    confidentiality: '100% confidential, no spam',
    confidentialitySub: 'Your data stays private',
  },

  /** Footer copy. */
  footer: {
    tagline: 'The AI Visibility Platform for Security Brands.',
  },

  /** Social media links — leave '' (empty) to hide an icon. */
  socials: {
    linkedin: '',
    facebook: '',
    instagram: '',
    youtube: '',
  },

  /** Default text for the CTA band at the bottom of many pages. */
  ctaBand: {
    title: 'Ready to be the answer AI gives?',
    subtitle:
      'Get a free AI visibility audit and see exactly where your security brand wins — and where competitors get cited instead of you.',
    ctaLabel: 'Get your free audit →',
    ctaHref: '/book-strategy-call/',
  },
} as const
