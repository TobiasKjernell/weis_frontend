import { Skeleton } from '../ui/Skeleton'

export function GallerySkeleton() {
  return (
    <div className="columns-2 gap-4 sm:columns-3">
      {Array.from({ length: 7 }).map((_, i) => (
        <Skeleton key={i} className="mb-4 aspect-[2/3] w-full break-inside-avoid" />
      ))}
    </div>
  )
}
