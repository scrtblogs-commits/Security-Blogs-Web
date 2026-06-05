import type { CmsBlock } from '@/lib/cmsTypes'
import HeroBlock           from './blocks/HeroBlock'
import CapabilitiesBlock   from './blocks/CapabilitiesBlock'
import StatsBlock          from './blocks/StatsBlock'
import FaqsBlock           from './blocks/FaqsBlock'
import CtaBandBlock        from './blocks/CtaBandBlock'
import RichTextBlock       from './blocks/RichTextBlock'
import ImageBlock          from './blocks/ImageBlock'
import ProcessStepsBlock   from './blocks/ProcessStepsBlock'
import ValuesBlock         from './blocks/ValuesBlock'

// ─────────────────────────────────────────────────────────────────────
// ModuleRenderer — dispatcher that turns a Page's `modules` array
// (Payload "blocks" field) into rendered React.
//
// Adding a new block type is two-step:
//   1. Add the Block to cms/src/collections/Pages.ts with a slug.
//   2. Add a component to components/modules/blocks/<Name>Block.tsx
//      and switch on its slug below.
//
// Unknown block types render nothing in production, but log a console
// warning during development so a typo or missing component is caught.
// ─────────────────────────────────────────────────────────────────────

type Props = { modules?: CmsBlock[] | null }

export default function ModuleRenderer({ modules }: Props) {
  if (!modules?.length) return null

  return (
    <>
      {modules.map((block, i) => {
        const key = `${block.blockType}-${i}`
        switch (block.blockType) {
          case 'hero':           return <HeroBlock           key={key} {...(block as never)} />
          case 'capabilities':   return <CapabilitiesBlock   key={key} {...(block as never)} />
          case 'stats':          return <StatsBlock          key={key} {...(block as never)} />
          case 'faqs':           return <FaqsBlock           key={key} {...(block as never)} />
          case 'cta-band':       return <CtaBandBlock        key={key} {...(block as never)} />
          case 'rich-text':      return <RichTextBlock       key={key} {...(block as never)} />
          case 'image':          return <ImageBlock          key={key} {...(block as never)} />
          case 'process-steps':  return <ProcessStepsBlock   key={key} {...(block as never)} />
          case 'values':         return <ValuesBlock         key={key} {...(block as never)} />
          default:
            if (process.env.NODE_ENV !== 'production') {
              console.warn(`[ModuleRenderer] Unknown blockType: ${block.blockType}`)
            }
            return null
        }
      })}
    </>
  )
}
