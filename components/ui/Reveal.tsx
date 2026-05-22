'use client'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 0.8, 0.2, 1] } },
}

export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

export default function Reveal({
  children, delay = 0, y = 28, className, style,
}: { children: ReactNode; delay?: number; y?: number; className?: string; style?: React.CSSProperties }) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function Stagger({ children, className, style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <motion.div className={className} style={style} variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}>
      {children}
    </motion.div>
  )
}

export function Item({ children, className, style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
  return <motion.div className={className} style={style} variants={fadeUp}>{children}</motion.div>
}
