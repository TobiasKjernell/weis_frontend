export function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-lg border border-line bg-surface/40 px-6 py-12 text-center">
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-dim">Nothing here yet</span>
      <p className="max-w-sm text-sm text-ink-muted">{message}</p>
    </div>
  )
}
