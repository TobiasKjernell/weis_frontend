import { Skeleton } from '../ui/Skeleton'

export function TourSkeleton() {
  return (
    <div className="rows">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center justify-between gap-4 py-(--space-lg)">
          <div className="flex items-center gap-4">
            <Skeleton className="h-14 w-16 shrink-0" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
          <Skeleton className="h-12 w-28 shrink-0" />
        </div>
      ))}
    </div>
  )
}
