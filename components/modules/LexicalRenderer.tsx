// ─────────────────────────────────────────────────────────────────────
// Minimal Lexical → JSX renderer.
//
// Payload's `richText` field stores a Lexical JSON state, NOT HTML. We
// could pull in @payloadcms/richtext-lexical/react for a fully-featured
// converter, but that ships ~30KB of editor toolbar code we don't need
// for read-only display.
//
// Instead this walker handles the node types our editors actually
// produce: paragraph, heading (h2-h4), list (ul/ol), listitem, link,
// quote, autolink, text (with bold/italic/underline/strikethrough/code
// formats), linebreak. Anything outside this set renders the text
// child if present, or falls through silently.
//
// If editors start needing exotic nodes (collapsibles, callouts, custom
// blocks) — swap to the official react converter package and delete
// this file.
// ─────────────────────────────────────────────────────────────────────

import type { JSX } from 'react'

type LexicalRoot = { root: { children: LexicalNode[] } }
type LexicalNode = {
  type: string
  version?: number
  tag?: string
  listType?: 'bullet' | 'number'
  url?: string
  text?: string
  format?: number | string
  children?: LexicalNode[]
}

// Lexical text-format bitmask flags.
const F_BOLD = 1, F_ITALIC = 2, F_STRIKETHROUGH = 4, F_UNDERLINE = 8, F_CODE = 16

function renderText(node: LexicalNode, key: string): JSX.Element | string {
  let el: JSX.Element | string = node.text ?? ''
  const f = typeof node.format === 'number' ? node.format : 0
  if (f & F_CODE)          el = <code key={key}>{el}</code>
  if (f & F_BOLD)          el = <strong key={key}>{el}</strong>
  if (f & F_ITALIC)        el = <em key={key}>{el}</em>
  if (f & F_UNDERLINE)     el = <u key={key}>{el}</u>
  if (f & F_STRIKETHROUGH) el = <s key={key}>{el}</s>
  return el
}

function renderChildren(children: LexicalNode[] | undefined, keyPrefix: string): React.ReactNode[] {
  if (!children) return []
  return children.map((c, i) => renderNode(c, `${keyPrefix}-${i}`))
}

function renderNode(node: LexicalNode, key: string): React.ReactNode {
  switch (node.type) {
    case 'paragraph':
      return <p key={key}>{renderChildren(node.children, key)}</p>
    case 'heading': {
      const Tag = (node.tag ?? 'h3') as keyof JSX.IntrinsicElements
      return <Tag key={key}>{renderChildren(node.children, key)}</Tag>
    }
    case 'list': {
      const Tag = node.listType === 'number' ? 'ol' : 'ul'
      return <Tag key={key}>{renderChildren(node.children, key)}</Tag>
    }
    case 'listitem':
      return <li key={key}>{renderChildren(node.children, key)}</li>
    case 'quote':
      return <blockquote key={key}>{renderChildren(node.children, key)}</blockquote>
    case 'link':
    case 'autolink':
      return (
        <a key={key} href={node.url ?? '#'} target={node.url?.startsWith('http') ? '_blank' : undefined} rel={node.url?.startsWith('http') ? 'noopener noreferrer' : undefined}>
          {renderChildren(node.children, key)}
        </a>
      )
    case 'linebreak':
      return <br key={key} />
    case 'text':
      return renderText(node, key)
    default:
      // Unknown node — render children if any, else nothing.
      return node.children?.length ? renderChildren(node.children, key) : null
  }
}

export default function LexicalRenderer({ state }: { state: unknown }) {
  if (!state || typeof state !== 'object') return null
  const root = state as LexicalRoot
  if (!root.root?.children) return null
  return <>{root.root.children.map((n, i) => renderNode(n, `n-${i}`))}</>
}
