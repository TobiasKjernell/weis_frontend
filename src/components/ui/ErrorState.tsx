interface ErrorStateProps {
  message: string
  onRetry: () => void
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div role="alert" className="flex flex-col items-start gap-4 border border-hair bg-well px-6 py-10">
      <h3>Signal lost</h3>
      <p className="text-fibre-2">{message}</p>
      <button type="button" onClick={onRetry} className="btn">
        Retry
      </button>
    </div>
  )
}
