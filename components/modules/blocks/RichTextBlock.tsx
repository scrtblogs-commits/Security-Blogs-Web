import LexicalRenderer from '../LexicalRenderer'

type Props = {
  eyebrow?: string
  title?: string
  body: unknown                       // Lexical JSON state from Payload
}

export default function RichTextBlock({ eyebrow, title, body }: Props) {
  return (
    <section className="section section-rich-text">
      <div className="container" style={{ maxWidth: 760 }}>
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        {title && <h2 className="h2" style={{ marginTop: 8 }}>{title}</h2>}
        <div className="prose" style={{ marginTop: 16 }}>
          <LexicalRenderer state={body} />
        </div>
      </div>
    </section>
  )
}
