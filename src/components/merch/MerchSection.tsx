import { useMerchItems } from '../../hooks/useMerchItems'
import { QueryBoundary } from '../ui/QueryBoundary'
import { SectionHeading } from '../ui/SectionHeading'
import { MerchCard } from './MerchCard'
import { MerchSkeleton } from './MerchSkeleton'

export function MerchSection() {
  const query = useMerchItems()

  return (
    <section id="merch" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Merch"
          title="Wear the static"
          description="Storefront is on its way — this is a preview of what's coming."
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
    </section>
  )
}
