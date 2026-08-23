interface ErrorStateProps {
  message: string
  onRetry: () => void
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border border-blood/30 bg-blood/5 px-6 py-12 text-center">
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-blood">Signal lost</span>
      <p className="max-w-sm text-sm text-ink-muted">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-1 rounded-full border border-magenta/50 px-5 py-2 font-mono text-xs uppercase tracking-[0.15em] text-magenta transition hover:bg-magenta/10 hover:shadow-glow-magenta focus-visible:outline focus-visible:outline-2 focus-visible:outline-magenta"
      >
        Retry
      </button>
    </div>
  )
}
