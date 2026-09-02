import { motion } from 'framer-motion'
import { useUIStore } from '../../store/useUIStore'
import type { MerchItem } from '../../schemas/merchItem'
import { MerchPlaceholderArt } from './MerchPlaceholderArt'

export function MerchCard({ item, index }: { item: MerchItem; index: number }) {
  const openReservation = useUIStore((s) => s.openReservation)
  const totalStock = item.variants.reduce((sum, variant) => sum + variant.stock, 0)
  const soldOut = totalStock <= 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      className="group overflow-hidden rounded-lg border border-line bg-surface/40 transition hover:border-magenta/40"
    >
      <div className="relative">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            loading="lazy"
            className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <MerchPlaceholderArt index={index} />
        )}
        {soldOut && (
          <span className="absolute left-3 top-3 rounded-full border border-blood/50 bg-void/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-blood">
            Sold out
          </span>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 p-4">
        <div className="min-w-0">
          <p className="font-display text-sm uppercase tracking-wide text-ink">{item.name}</p>
          <p className="mt-1 font-mono text-sm text-ink-muted">
            {item.price.toLocaleString('en-US', { style: 'currency', currency: item.currency })}
          </p>
        </div>
        <button
          type="button"
          disabled={soldOut}
          onClick={() => openReservation(item.id)}
          className="shrink-0 rounded-full border border-line px-4 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-muted transition hover:border-magenta/50 hover:text-magenta disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line disabled:hover:text-ink-muted"
        >
          {soldOut ? 'Sold out' : 'Reserve'}
        </button>
      </div>
    </motion.div>
  )
}
