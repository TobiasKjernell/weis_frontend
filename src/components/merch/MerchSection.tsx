import { useMerchItems } from '../../hooks/useMerchItems'
import { QueryBoundary } from '../ui/QueryBoundary'
import { SectionHeading } from '../ui/SectionHeading'
import { MerchCard } from './MerchCard'
import { MerchSkeleton } from './MerchSkeleton'
import { ReservationModal } from './ReservationModal'

export function MerchSection() {
  const query = useMerchItems()

  return (
    <section id="merch" className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Merch"
          title="Wear the static"
          description="Limited drops, reserved by hand — pick a piece and we'll follow up to confirm."
        />

        <div className="mt-12">
          <QueryBoundary
            query={query}
            skeleton={<MerchSkeleton />}
            emptyMessage="Merch drop is still loading in the lab — check back soon."
          >
            {(items) => (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
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
