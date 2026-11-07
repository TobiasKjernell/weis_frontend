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
    <div className="space-y-(--space-xl)">
      {groups.map((group) => (
        <div key={group.year}>
          <p className="label num mb-2">{group.year}</p>
          <div className="rows">
            {group.items.map((date) => (
              <TourDateRow key={date.id} tourDate={date} isPast={isPast} />
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
    <section id="tour" className="section well grained scroll-mt-16">
      <div className="container">
        <SectionHeading title="Tour dates" />

        <div className="mt-(--space-2xl)">
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
                <div className="space-y-(--space-3xl)">
                  {upcoming.length > 0 && <YearGroups groups={groupByYear(upcoming)} isPast={false} />}

                  {past.length > 0 && (
                    <div>
                      <h3 className="mb-(--space-lg) text-(length:--text-2xl)">Previously played</h3>
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
