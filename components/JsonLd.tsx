// Renders a JSON-LD <script> tag for structured data. Scripts of type
// application/ld+json are inert in the browser (search engines and LLMs
// parse them; nothing else evaluates them).
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
