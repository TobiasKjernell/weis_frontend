import { Skeleton } from '../ui/Skeleton'

export function VideoSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="aspect-video w-full" />
      ))}
    </div>
  )
}
