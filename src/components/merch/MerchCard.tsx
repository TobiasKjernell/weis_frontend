import { motion } from 'framer-motion'
import type { MerchItem } from '../../schemas/merchItem'
import { MerchPlaceholderArt } from './MerchPlaceholderArt'

const tagStyles: Record<NonNullable<MerchItem['tag']>, string> = {
  new: 'border-cyan/60 text-cyan',
  preorder: 'border-violet/60 text-violet',
  'sold-out': 'border-blood/50 text-blood',
}

export function MerchCard({ item, index }: { item: MerchItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      className="group overflow-hidden rounded-lg border border-line bg-surface/40 transition hover:border-magenta/40"
    >
      <div className="relative">
        <MerchPlaceholderArt index={index} />
        {item.tag && (
          <span
            className={`absolute left-3 top-3 rounded-full border bg-void/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest ${tagStyles[item.tag]}`}
          >
            {item.tag.replace('-', ' ')}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between gap-3 p-4">
        <div>
          <p className="font-display text-sm uppercase tracking-wide text-ink">{item.name}</p>
          <p className="mt-1 font-mono text-sm text-ink-muted">
            {item.price.toLocaleString('en-US', { style: 'currency', currency: item.currency })}
          </p>
        </div>
        <button
          type="button"
          disabled={!item.available}
          title="Store coming soon"
          className="shrink-0 rounded-full border border-line px-4 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-muted transition hover:border-magenta/50 hover:text-magenta disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line disabled:hover:text-ink-muted"
        >
          {item.available ? 'Notify me' : 'Unavailable'}
        </button>
      </div>
    </motion.div>
  )
}
