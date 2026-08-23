import { motion } from 'framer-motion'
import type { TourDate } from '../../schemas/tourDate'

const dateFormatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit' })

export function TourDateRow({ tourDate, delay }: { tourDate: TourDate; delay: number }) {
  const parsed = new Date(`${tourDate.date}T00:00:00`)
  const [month, day] = dateFormatter.format(parsed).split(' ')

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay }}
      className="group flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-md border border-line bg-surface/60 font-mono leading-none text-ink transition group-hover:border-magenta/50">
          <span className="text-[10px] uppercase tracking-widest text-magenta">{month}</span>
          <span className="text-lg font-semibold">{day}</span>
        </div>
        <div>
          <p className="font-display text-lg uppercase tracking-wide text-ink">
            {tourDate.city}, <span className="text-ink-muted">{tourDate.country}</span>
          </p>
          <p className="text-sm text-ink-dim">{tourDate.venue}</p>
        </div>
      </div>

      {tourDate.soldOut ? (
        <span className="inline-flex w-fit items-center justify-center rounded-full border border-blood/50 px-5 py-2 font-mono text-xs uppercase tracking-[0.2em] text-blood">
          Sold out
        </span>
      ) : (
        <a
          href={tourDate.ticketUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-fit items-center justify-center rounded-full border border-cyan/60 px-5 py-2 font-mono text-xs uppercase tracking-[0.2em] text-cyan transition hover:bg-cyan/10 hover:shadow-glow-cyan"
        >
          Tickets
        </a>
      )}
    </motion.div>
  )
}
