import { useTourDates } from '../../hooks/useTourDates'
import { QueryBoundary } from '../ui/QueryBoundary'
import { SectionHeading } from '../ui/SectionHeading'
import { TourDateRow } from './TourDateRow'
import { TourSkeleton } from './TourSkeleton'
import type { TourDate } from '../../schemas/tourDate'

function parseDate(date: string) {
  return new Date(date.includes('T') ? date : `${date}T00:00:00`)
}

function groupByYear(dates: TourDate[]) {
  const groups: { year: number; items: TourDate[] }[] = []
  for (const date of dates) {
    const year = parseDate(date.date).getFullYear()
    const last = groups[groups.length - 1]
    if (last && last.year === year) {
      last.items.push(date)
    } else {
      groups.push({ year, items: [date] })
    }
  }
  return groups
}

function YearGroups({ groups, isPast }: { groups: { year: number; items: TourDate[] }[]; isPast: boolean }) {
  return (
    <div className="space-y-8">
      {groups.map((group) => (
        <div key={group.year}>
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-ink-dim">{group.year}</p>
          <div className="divide-y divide-line/70 border-y border-line/70">
            {group.items.map((date, i) => (
              <TourDateRow key={date.id} tourDate={date} delay={Math.min(i, 5) * 0.05} isPast={isPast} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

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
            {(dates) => {
              const now = new Date()
              const upcoming = dates.filter((d) => parseDate(d.date) >= now)
              const past = dates
                .filter((d) => parseDate(d.date) < now)
                .sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime())

              return (
                <div className="space-y-16">
                  {upcoming.length > 0 && <YearGroups groups={groupByYear(upcoming)} isPast={false} />}

                  {past.length > 0 && (
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.3em] text-magenta text-glow-magenta">
                        Archive
                      </p>
                      <h3 className="mt-2 mb-8 font-display text-2xl uppercase tracking-wide text-ink">
                        Previously played
                      </h3>
                      <YearGroups groups={groupByYear(past)} isPast />
                    </div>
                  )}
                </div>
              )
            }}
          </QueryBoundary>
        </div>
      </div>
    </section>
  )
}
