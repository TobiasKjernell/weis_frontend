export function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-start gap-2 border border-hair bg-well px-6 py-10">
      <h3>Nothing here yet</h3>
      <p className="text-fibre-2">{message}</p>
    </div>
  )
}
