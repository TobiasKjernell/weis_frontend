import { useState } from 'react'
import { cn } from '../../lib/utils'
import type { VideoItem } from '../../schemas/videoItem'

export function VideoPlayer({ items }: { items: VideoItem[] }) {
  const [selected, setSelected] = useState(0)
  const [hasInteracted, setHasInteracted] = useState(false)
  const current = items[selected]

  function selectVideo(index: number) {
    setSelected(index)
    setHasInteracted(true)
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-stretch">
      <div className="lg:col-span-2">
        <div className="aspect-video w-full overflow-hidden rounded-md border border-line bg-void">
          <iframe
            key={current.id}
            src={`https://www.youtube-nocookie.com/embed/${current.youtubeId}?rel=0${hasInteracted ? '&autoplay=1' : ''}`}
            title={current.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.15em] text-ink">{current.title}</p>
      </div>

      <div className="flex max-h-[70vh] flex-col gap-1 overflow-y-auto rounded-md border border-line bg-surface/40 p-2 lg:max-h-none">
        {items.map((item, i) => {
          const active = i === selected
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => selectVideo(i)}
              aria-current={active}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2.5 text-left transition',
                active ? 'bg-magenta/10 text-magenta' : 'text-ink-muted hover:bg-surface-2 hover:text-ink',
              )}
            >
              <span className="w-5 shrink-0 font-mono text-[10px] tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="flex-1 truncate font-mono text-xs uppercase tracking-[0.1em]">{item.title}</span>
              {active && <span className="h-2 w-2 shrink-0 rounded-full bg-magenta shadow-glow-magenta" />}
            </button>
          )
        })}
      </div>
    </div>
  )
}
