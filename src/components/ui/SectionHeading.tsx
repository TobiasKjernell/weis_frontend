import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  description?: ReactNode
  align?: 'left' | 'center'
}

export function SectionHeading({ eyebrow, title, description, align = 'left' }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={align === 'center' ? 'text-center' : 'text-left'}
    >
      <span className="font-mono text-xs uppercase tracking-[0.3em] text-cyan text-glow-cyan">{eyebrow}</span>
      <h2 className="mt-3 font-display text-3xl uppercase tracking-wide text-ink sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className={`mt-4 max-w-2xl text-ink-muted ${align === 'center' ? 'mx-auto' : ''}`}>{description}</p>
      ) : null}
    </motion.div>
  )
}
