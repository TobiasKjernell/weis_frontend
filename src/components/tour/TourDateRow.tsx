import { cn } from '../../lib/utils'
import type { TourDate } from '../../schemas/tourDate'

const dateFormatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit' })

export function TourDateRow({ tourDate, isPast = false }: { tourDate: TourDate; isPast?: boolean }) {
  const parsed = new Date(tourDate.date.includes('T') ? tourDate.date : `${tourDate.date}T00:00:00`)
  const [month, day] = dateFormatter.format(parsed).split(' ')

  return (
    <div
      className={cn(
        'grid grid-cols-[4.5rem_minmax(0,1fr)] items-center gap-x-(--space-lg) gap-y-(--space-sm) py-(--space-lg) sm:grid-cols-[6rem_minmax(0,1fr)_auto]',
        isPast && 'text-dim',
      )}
    >
      <div className="flex flex-col">
        <span className="figure text-(length:--text-section)">{day}</span>
        <span className="label">{month}</span>
      </div>

      <div className="min-w-0">
        <h3 className="max-w-none">{tourDate.location}</h3>
        <p className="label mt-1">{tourDate.venue}</p>
      </div>

      {!isPast && (
        <div className="col-span-2 sm:col-span-1">
          {tourDate.soldOut ? (
            <span className="title text-alarm">Sold out</span>
          ) : (
            <a href={tourDate.ticketUrl} target="_blank" rel="noreferrer" className="btn btn--primary max-sm:w-full">
              Tickets
            </a>
          )}
        </div>
      )}
    </div>
  )
}
