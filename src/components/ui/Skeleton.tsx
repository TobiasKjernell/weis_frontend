import { cn } from '../../lib/utils'

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-gradient-to-r from-surface via-surface-2 to-surface bg-[length:200%_100%]',
        className,
      )}
    />
  )
}
