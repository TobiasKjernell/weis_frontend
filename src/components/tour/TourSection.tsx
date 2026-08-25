import { useTourDates } from '../../hooks/useTourDates'
import { QueryBoundary } from '../ui/QueryBoundary'
import { SectionHeading } from '../ui/SectionHeading'
import { TourDateRow } from './TourDateRow'
import { TourSkeleton } from './TourSkeleton'

export function TourSection() {
  const query = useTourDates()

  return (
    <section id="tour" className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <SectionHeading eyebrow="On the road" title="Tour dates" />

        <div className="mt-12">
          <QueryBoundary
            query={query}
            skeleton={<TourSkeleton />}
            emptyMessage="No dates on the calendar yet — follow along for announcements."
          >
            {(dates) => (
              <div className="divide-y divide-line/70 border-y border-line/70">
                {dates.map((date, i) => (
                  <TourDateRow key={date.id} tourDate={date} delay={Math.min(i, 5) * 0.05} />
                ))}
              </div>
            )}
          </QueryBoundary>
        </div>
      </div>
    </section>
  )
}
