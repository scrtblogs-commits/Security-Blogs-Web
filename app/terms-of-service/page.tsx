import ArticleLayout from '@/components/ui/ArticleLayout'

export const metadata = {
  title: 'Terms of Service',
  description: 'The terms and conditions governing your use of the SecurityBlogs website and our AI visibility and SEO services for the security industry.',
  alternates: { canonical: '/terms-of-service/' },
  openGraph: { url: '/terms-of-service/' },
}

const toc = [
  { id: 'introduction', label: 'Introduction & Acceptance' },
  { id: 'definitions', label: 'Definitions' },
  { id: 'use-of-services', label: 'Use of Our Services' },
  { id: 'accounts', label: 'Accounts & Registration' },
  { id: 'engagements', label: 'Service Engagements & Payments' },
  { id: 'intellectual-property', label: 'Intellectual Property' },
  { id: 'client-responsibilities', label: 'Client Responsibilities' },
  { id: 'disclaimers', label: 'Disclaimers' },
  { id: 'liability', label: 'Limitation of Liability' },
  { id: 'indemnification', label: 'Indemnification' },
  { id: 'termination', label: 'Termination' },
  { id: 'governing-law', label: 'Governing Law' },
  { id: 'changes', label: 'Changes to Terms' },
  { id: 'contact', label: 'Contact' },
]

export default function TermsOfServicePage() {
  return (
    <ArticleLayout
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Terms of Service' }]}
      title="Terms of Service"
      subtitle="Last updated: May 2026"
      toc={toc}
    >
      <h2 id="introduction">Introduction &amp; Acceptance</h2>
      <p>
        These Terms of Service (&quot;Terms&quot;) govern your access to and use of the website at
        securityblogs.com.au and the services provided by SecurityBlogs (&quot;SecurityBlogs&quot;,
        &quot;we&quot;, &quot;us&quot; or &quot;our&quot;). By accessing our website, engaging our
        services, or otherwise interacting with us, you agree to be bound by these Terms. If you do not
        agree, you must not use our website or services.
      </p>
      <p>
        These Terms operate alongside any separate written agreement, proposal or statement of work
        between you and SecurityBlogs. Where there is a conflict, the terms of the signed engagement
        agreement will prevail.
      </p>

      <h2 id="definitions">Definitions</h2>
      <ul>
        <li><strong>&quot;Client&quot;</strong> means any individual or organisation that engages SecurityBlogs to provide services.</li>
        <li><strong>&quot;Services&quot;</strong> means the AI visibility, search engine optimisation, content, web and digital marketing services we provide.</li>
        <li><strong>&quot;Deliverables&quot;</strong> means the reports, content, code, recommendations and other materials produced as part of an engagement.</li>
        <li><strong>&quot;Website&quot;</strong> means securityblogs.com.au and any associated subdomains and pages.</li>
        <li><strong>&quot;Engagement&quot;</strong> means a defined scope of Services agreed in a proposal or statement of work.</li>
      </ul>

      <h2 id="use-of-services">Use of Our Services</h2>
      <p>
        You agree to use our website and Services only for lawful purposes and in accordance with these
        Terms. You must not misuse our website, attempt to gain unauthorised access, interfere with its
        operation, or use it in any way that could damage, disable or impair the site or interfere with
        any other party&apos;s use of it.
      </p>

      <h2 id="accounts">Accounts &amp; Registration</h2>
      <p>
        Certain features, dashboards or client portals may require you to register an account or provide
        access credentials. You are responsible for maintaining the confidentiality of your account
        details and for all activity that occurs under your account. You agree to provide accurate and
        current information and to notify us promptly of any unauthorised use or security breach.
      </p>

      <h2 id="engagements">Service Engagements &amp; Payments</h2>
      <p>
        The specific scope, deliverables, timelines and fees for any Engagement will be set out in a
        proposal or statement of work agreed between the parties. Unless otherwise stated:
      </p>
      <ul>
        <li>Fees are quoted in the currency specified in your proposal and are exclusive of applicable taxes (including GST where relevant).</li>
        <li>Invoices are payable within the period stated on the invoice, typically 14 days from the invoice date.</li>
        <li>Recurring or retainer Services are billed in advance for each billing period.</li>
        <li>We reserve the right to suspend Services where invoices remain unpaid after their due date.</li>
        <li>Fees already paid are non-refundable except as expressly agreed or required by law.</li>
      </ul>

      <h2 id="intellectual-property">Intellectual Property</h2>
      <p>
        All content on our website, including text, graphics, logos, designs and software, is owned by or
        licensed to SecurityBlogs and is protected by intellectual property laws. You may not reproduce,
        distribute or create derivative works without our prior written consent.
      </p>
      <p>
        Ownership of Deliverables produced during an Engagement transfers to the Client upon full payment,
        unless otherwise agreed. We retain ownership of our pre-existing tools, methodologies, templates
        and know-how, and may retain copies of Deliverables for our records and portfolio.
      </p>

      <h2 id="client-responsibilities">Client Responsibilities</h2>
      <p>To enable us to deliver Services effectively, the Client agrees to:</p>
      <ul>
        <li>Provide timely access to websites, analytics platforms, hosting and other required systems.</li>
        <li>Supply accurate information, approvals and feedback within agreed timeframes.</li>
        <li>Ensure that all materials provided to us do not infringe third-party rights and comply with applicable laws.</li>
        <li>Maintain appropriate backups of their own systems and content.</li>
      </ul>

      <h2 id="disclaimers">Disclaimers</h2>
      <p>
        Our Services are provided on a professional best-efforts basis. Search engine and AI platform
        rankings and visibility are influenced by many factors outside our control, including algorithm
        changes, competitor activity and third-party platform decisions. Accordingly, <strong>we do not
        guarantee any specific rankings, traffic levels, placement in AI-generated answers, leads or
        revenue outcomes.</strong> Any forecasts or projections are estimates only and not promises of
        results.
      </p>
      <p>
        Our website and Services are provided &quot;as is&quot; and &quot;as available&quot; without
        warranties of any kind, whether express or implied, except to the extent that such warranties
        cannot be excluded under applicable law.
      </p>

      <h2 id="liability">Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, SecurityBlogs will not be liable for any indirect,
        incidental, special, consequential or punitive damages, or for any loss of profits, revenue, data
        or goodwill, arising out of or in connection with your use of our website or Services. Where our
        liability cannot be excluded, our total aggregate liability is limited to the amount of fees paid
        by you to us for the relevant Services in the three months preceding the event giving rise to the
        claim.
      </p>

      <h2 id="indemnification">Indemnification</h2>
      <p>
        You agree to indemnify and hold harmless SecurityBlogs, its officers, employees and contractors
        from and against any claims, liabilities, damages, losses and expenses (including reasonable legal
        fees) arising out of your breach of these Terms, your misuse of the Services, or any content or
        materials you provide to us that infringe the rights of a third party.
      </p>

      <h2 id="termination">Termination</h2>
      <p>
        Either party may terminate an Engagement in accordance with the notice provisions set out in the
        applicable proposal or statement of work. We may suspend or terminate your access to our website
        or Services immediately if you breach these Terms. Upon termination, you remain responsible for
        any fees accrued up to the termination date. Provisions that by their nature should survive
        termination (including intellectual property, liability and indemnification) will continue to apply.
      </p>

      <h2 id="governing-law">Governing Law</h2>
      <p>
        These Terms are governed by and construed in accordance with the laws of Australia. You agree to
        submit to the exclusive jurisdiction of the courts of Australia in respect of any dispute arising
        out of or in connection with these Terms or your use of our website and Services.
      </p>

      <h2 id="changes">Changes to Terms</h2>
      <p>
        We may revise these Terms from time to time. When we make changes, we will update the &quot;Last
        updated&quot; date at the top of this page. Your continued use of our website or Services after any
        changes take effect constitutes your acceptance of the revised Terms.
      </p>

      <h2 id="contact">Contact</h2>
      <p>
        If you have any questions about these Terms, please contact us at{' '}
        <a href="mailto:hello@securityblogs.com.au">hello@securityblogs.com.au</a> or via our{' '}
        <a href="/contact/">contact page</a>.
      </p>
    </ArticleLayout>
  )
}
