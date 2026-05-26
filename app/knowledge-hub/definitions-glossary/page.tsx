import ArticleLayout from '@/components/ui/ArticleLayout'
import CTABand from '@/components/ui/CTABand'

export const metadata = {
  title: 'Definitions & Glossary · Knowledge Hub · SecurityBlogs',
  description: 'Plain-English definitions of AI visibility and SEO terms — AIO, AEO, GEO, SERP, schema, entity, E-E-A-T, citations and more for the security industry.',
}

const toc = [
  { id: 'aio', label: 'AIO' },
  { id: 'aeo', label: 'AEO' },
  { id: 'geo', label: 'GEO' },
  { id: 'serp', label: 'SERP' },
  { id: 'schema', label: 'Schema / Structured Data' },
  { id: 'entity', label: 'Entity' },
  { id: 'knowledge-graph', label: 'Knowledge Graph' },
  { id: 'eeat', label: 'E-E-A-T' },
  { id: 'featured-snippet', label: 'Featured Snippet' },
  { id: 'citation', label: 'Citation' },
  { id: 'nap', label: 'NAP' },
  { id: 'cwv', label: 'Core Web Vitals' },
]

const letters = ['A', 'C', 'E', 'F', 'G', 'K', 'N', 'S']

export default function GlossaryPage() {
  return (
    <>
      <ArticleLayout
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Knowledge Hub', href: '/knowledge-hub/' }, { label: 'Definitions & Glossary' }]}
        title="AI Visibility & SEO Definitions"
        subtitle="A living glossary of the terms that shape how security brands get found, cited and chosen by both search and AI answer engines."
        toc={toc}
      >
        <div className="flex flex-wrap gap-2" style={{ marginBottom: 32 }}>
          {letters.map((l) => (
            <a key={l} href={`#letter-${l}`} className="pill" style={{ minWidth: 40, textAlign: 'center' }}>{l}</a>
          ))}
        </div>

        <h2 id="aio"><span id="letter-A" />AIO — AI Optimisation</h2>
        <p>
          AIO is the practice of optimising your brand and content to be surfaced and recommended by
          AI systems. For a security company, AIO means structuring information so that when a buyer
          asks an AI tool for the best provider, your brand is part of the generated answer.
        </p>

        <h2 id="aeo">AEO — Answer Engine Optimisation</h2>
        <p>
          AEO focuses specifically on becoming the direct answer an engine returns — the quoted line
          in ChatGPT, Perplexity or Google AI Overviews. It rewards concise, well-structured,
          authoritative content that an engine can lift and present with confidence.
        </p>

        <h2 id="geo"><span id="letter-G" />GEO — Generative Engine Optimisation</h2>
        <p>
          GEO is the discipline of building enough entity authority and trust that generative engines
          treat your brand as a reliable source. It leans on knowledge-graph presence, consistent
          data and citations more than on traditional ranking factors alone.
        </p>

        <h2 id="serp"><span id="letter-S" />SERP — Search Engine Results Page</h2>
        <p>
          The SERP is the page a search engine returns for a query. Modern SERPs blend classic blue
          links with AI Overviews, local packs, featured snippets and shopping units — each a
          distinct surface a security brand can compete to own.
        </p>

        <h2 id="schema">Schema / Structured Data</h2>
        <p>
          Schema is a shared vocabulary of structured-data markup that helps engines understand the
          meaning of your content. For security sites, types like Organization, LocalBusiness,
          Service, FAQ and Review make your pages machine-readable and easier for AI to cite.
        </p>

        <h2 id="entity"><span id="letter-E" />Entity</h2>
        <p>
          An entity is a distinct, identifiable thing — a company, person, product or concept — that
          engines track in their knowledge models. Strong, consistent entity signals are how an AI
          engine reliably connects a query to your specific brand.
        </p>

        <h2 id="knowledge-graph"><span id="letter-K" />Knowledge Graph</h2>
        <p>
          A knowledge graph is a network of entities and the relationships between them. Appearing in
          a knowledge graph with accurate attributes increases the chance that AI engines understand
          and recommend your security business correctly.
        </p>

        <h2 id="eeat">E-E-A-T — Experience, Expertise, Authoritativeness, Trust</h2>
        <p>
          E-E-A-T is the quality framework engines use to assess content credibility. For security
          providers — where decisions are trust-sensitive — demonstrable experience, named experts,
          credentials and earned citations materially affect both rankings and AI trust.
        </p>

        <h2 id="featured-snippet"><span id="letter-F" />Featured Snippet</h2>
        <p>
          A featured snippet is the boxed answer that can appear at the top of a SERP, pulled directly
          from a page. Winning snippets often correlates with being quoted by AI answer engines, since
          both reward clear, structured, directly-answering content.
        </p>

        <h2 id="citation"><span id="letter-C" />Citation</h2>
        <p>
          A citation is any reference to your brand — a mention, link or source attribution. In the AI
          era, the citation rate (how often engines name you in answers) is becoming as important as
          the ranking position once was.
        </p>

        <h2 id="nap"><span id="letter-N" />NAP — Name, Address, Phone</h2>
        <p>
          NAP refers to your core business contact details. Keeping NAP perfectly consistent across
          your site, directories and profiles is foundational for local SEO and for AI engines that
          rely on consistent data to identify and trust a local security provider.
        </p>

        <h2 id="cwv">Core Web Vitals</h2>
        <p>
          Core Web Vitals are Google&apos;s metrics for real-world page experience — loading (LCP),
          interactivity (INP) and visual stability (CLS). Fast, stable pages help rankings and ensure
          crawlers can render and extract your content for AI use.
        </p>
      </ArticleLayout>

      <CTABand />
    </>
  )
}
