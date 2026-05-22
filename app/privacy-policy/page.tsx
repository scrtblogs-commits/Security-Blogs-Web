import ArticleLayout from '@/components/ui/ArticleLayout'

export const metadata = {
  title: 'Privacy Policy · SecurityGrowth',
  description: 'How SecurityGrowth collects, uses, stores and protects your personal information across our AI visibility and SEO services for the security industry.',
}

const toc = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'information-we-collect', label: 'Information We Collect' },
  { id: 'how-we-use', label: 'How We Use Your Information' },
  { id: 'cookies', label: 'Cookies & Tracking' },
  { id: 'third-party', label: 'Third-Party Services' },
  { id: 'data-sharing', label: 'Data Sharing & Disclosure' },
  { id: 'data-security', label: 'Data Security' },
  { id: 'data-retention', label: 'Data Retention' },
  { id: 'your-rights', label: 'Your Rights' },
  { id: 'international-transfers', label: 'International Transfers' },
  { id: 'childrens-privacy', label: "Children's Privacy" },
  { id: 'changes', label: 'Changes to This Policy' },
  { id: 'contact', label: 'Contact Us' },
]

export default function PrivacyPolicyPage() {
  return (
    <ArticleLayout
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]}
      title="Privacy Policy"
      subtitle="Last updated: May 2026"
      toc={toc}
    >
      <h2 id="introduction">Introduction</h2>
      <p>
        SecurityGrowth (&quot;SecurityGrowth&quot;, &quot;we&quot;, &quot;us&quot; or &quot;our&quot;) operates the website at
        securityblogs.com.au and provides AI visibility, search engine optimisation and digital
        marketing services tailored to the security industry. This Privacy Policy explains how we
        collect, use, disclose and safeguard your personal information when you visit our website,
        complete a form, subscribe to our marketing communications, or engage us as a client.
      </p>
      <p>
        We are committed to handling your personal information in accordance with the Australian
        Privacy Principles (APPs) contained in the Privacy Act 1988 (Cth), and, where applicable, the
        European Union General Data Protection Regulation (GDPR) and the California Consumer Privacy
        Act (CCPA). By using our website or services, you acknowledge that you have read and understood
        this Privacy Policy.
      </p>

      <h2 id="information-we-collect">Information We Collect</h2>
      <p>
        We collect personal information that you provide directly to us, as well as information that
        is gathered automatically as you interact with our website. The types of information we may
        collect include:
      </p>
      <ul>
        <li><strong>Contact details</strong> you submit through our enquiry, strategy-call booking or contact forms, such as your name, email address, phone number, company name and job title.</li>
        <li><strong>Marketing preferences</strong> when you subscribe to our newsletter or marketing emails.</li>
        <li><strong>Project and account information</strong> shared during the course of a service engagement, including website access, analytics access and campaign objectives.</li>
        <li><strong>Usage and device data</strong> automatically collected through analytics tools, such as IP address, browser type, device identifiers, pages visited, referring URLs and time spent on pages.</li>
        <li><strong>Communications</strong> you exchange with us by email, phone or messaging platforms.</li>
      </ul>

      <h2 id="how-we-use">How We Use Your Information</h2>
      <p>We use the personal information we collect for the following purposes:</p>
      <ul>
        <li>To respond to enquiries, schedule strategy calls and provide quotations.</li>
        <li>To deliver, manage and improve the services you have engaged us to provide.</li>
        <li>To send marketing emails, newsletters and service updates where you have opted in, and to measure the performance of those communications.</li>
        <li>To analyse website traffic and user behaviour so we can improve our content and user experience.</li>
        <li>To process payments, manage invoicing and maintain accurate business records.</li>
        <li>To comply with our legal, regulatory and contractual obligations.</li>
      </ul>
      <p>
        Where we rely on consent (for example, to send marketing emails), you may withdraw that consent
        at any time. Every marketing email we send includes an unsubscribe link.
      </p>

      <h2 id="cookies">Cookies &amp; Tracking</h2>
      <p>
        Our website uses cookies and similar tracking technologies to operate effectively, remember
        your preferences and understand how visitors use the site. Cookies are small text files stored
        on your device. We use both first-party cookies and third-party cookies set by analytics and
        advertising providers.
      </p>
      <p>
        You can control or disable cookies through your browser settings. Please note that disabling
        certain cookies may affect the functionality of the website. Where required by law, we will
        request your consent before placing non-essential cookies.
      </p>

      <h2 id="third-party">Third-Party Services</h2>
      <p>
        We use reputable third-party service providers to help us operate our website and deliver our
        services. These may include website analytics platforms (such as Google Analytics), email
        marketing platforms, customer relationship management software, payment processors and cloud
        hosting providers. These providers process personal information on our behalf and are bound by
        their own privacy and security obligations.
      </p>

      <h2 id="data-sharing">Data Sharing &amp; Disclosure</h2>
      <p>
        We do not sell your personal information. We may disclose your information in the following
        limited circumstances:
      </p>
      <ul>
        <li>To trusted service providers and contractors who assist us in operating our business, under confidentiality obligations.</li>
        <li>To professional advisers such as accountants, auditors and lawyers where reasonably necessary.</li>
        <li>Where required by law, regulation, legal process or a valid government request.</li>
        <li>In connection with a merger, acquisition or sale of business assets, subject to appropriate confidentiality protections.</li>
      </ul>

      <h2 id="data-security">Data Security</h2>
      <p>
        We take reasonable technical and organisational measures to protect your personal information
        against loss, misuse, unauthorised access, disclosure, alteration and destruction. These
        measures include encryption in transit, access controls, secure hosting environments and staff
        confidentiality obligations. However, no method of transmission or storage is completely secure,
        and we cannot guarantee absolute security.
      </p>

      <h2 id="data-retention">Data Retention</h2>
      <p>
        We retain personal information only for as long as is necessary to fulfil the purposes for which
        it was collected, including to satisfy any legal, accounting or reporting requirements. When
        personal information is no longer required, we will take reasonable steps to de-identify or
        securely delete it.
      </p>

      <h2 id="your-rights">Your Rights (GDPR / CCPA / Australian Privacy Principles)</h2>
      <p>
        Depending on your location, you may have certain rights in relation to your personal information,
        including the right to:
      </p>
      <ul>
        <li>Access the personal information we hold about you and request a copy.</li>
        <li>Request correction of inaccurate or incomplete information.</li>
        <li>Request deletion or erasure of your personal information, subject to legal exceptions.</li>
        <li>Object to or restrict certain processing, including direct marketing.</li>
        <li>Request data portability where technically feasible (GDPR).</li>
        <li>Opt out of the sale or sharing of personal information (CCPA) — noting that we do not sell personal information.</li>
        <li>Lodge a complaint with a supervisory authority, such as the Office of the Australian Information Commissioner (OAIC).</li>
      </ul>
      <p>
        To exercise any of these rights, please contact us using the details below. We will respond
        within the timeframes required by applicable law.
      </p>

      <h2 id="international-transfers">International Transfers</h2>
      <p>
        SecurityGrowth serves clients in Australia, the United States, the United Kingdom, the United
        Arab Emirates and Singapore. As a result, your personal information may be transferred to, stored
        in, or processed in countries other than the one in which you reside. Where we transfer personal
        information internationally, we take reasonable steps to ensure it receives an adequate level of
        protection consistent with this Privacy Policy and applicable law.
      </p>

      <h2 id="childrens-privacy">Children&apos;s Privacy</h2>
      <p>
        Our website and services are intended for businesses and professionals and are not directed at
        children under the age of 16. We do not knowingly collect personal information from children. If
        you believe a child has provided us with personal information, please contact us so that we can
        delete it.
      </p>

      <h2 id="changes">Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time to reflect changes in our practices, technology,
        legal requirements or other factors. When we make material changes, we will update the &quot;Last
        updated&quot; date at the top of this page and, where appropriate, notify you by other means. We
        encourage you to review this policy periodically.
      </p>

      <h2 id="contact">Contact Us</h2>
      <p>
        If you have any questions, concerns or requests regarding this Privacy Policy or our handling of
        your personal information, please contact us at{' '}
        <a href="mailto:hello@securityblogs.com.au">hello@securityblogs.com.au</a>. You can also reach us
        through our <a href="/contact/">contact page</a>.
      </p>
    </ArticleLayout>
  )
}
