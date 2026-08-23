import { Skeleton } from '../ui/Skeleton'

export function TourSkeleton() {
  return (
    <div className="divide-y divide-line/70 border-y border-line/70">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center justify-between gap-4 py-5">
          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 shrink-0" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-28" />
            </div>
          </div>
          <Skeleton className="h-9 w-24 shrink-0 rounded-full" />
        </div>
      ))}
    </div>
  )
}
