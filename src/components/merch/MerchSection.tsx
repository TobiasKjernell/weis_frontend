import { useMerchItems } from '../../hooks/useMerchItems'
import { QueryBoundary } from '../ui/QueryBoundary'
import { SectionHeading } from '../ui/SectionHeading'
import { MerchCard } from './MerchCard'
import { MerchSkeleton } from './MerchSkeleton'
import { ReservationModal } from './ReservationModal'

export function MerchSection() {
  const query = useMerchItems()

  return (
    <section id="merch" className="section scroll-mt-16">
      <div className="container">
        <SectionHeading
          title="Merch"
          description="Wear the static. Limited drops, reserved by hand — pick a piece and we'll follow up to confirm."
        />

        <div className="mt-(--space-2xl)">
          <QueryBoundary
            query={query}
            skeleton={<MerchSkeleton />}
            emptyMessage="Merch drop is still loading in the lab — check back soon."
          >
            {(items) => (
              <div className="grid grid-cols-2 gap-x-(--gap-columns) gap-y-(--space-xl) lg:grid-cols-4">
                {items.map((item, i) => (
                  <MerchCard key={item.id} item={item} index={i} />
                ))}
              </div>
            )}
          </QueryBoundary>
        </div>
      </div>

      {query.data && <ReservationModal items={query.data} />}
    </section>
  )
}
