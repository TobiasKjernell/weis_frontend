import { Skeleton } from '../ui/Skeleton'

export function MerchSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-(--gap-columns) lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i}>
          <Skeleton className="aspect-square w-full" />
          <div className="mt-3 space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        </div>
      ))}
    </div>
  )
}
