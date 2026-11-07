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
    <div className="grid grid-cols-1 gap-(--space-xl) lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] lg:gap-(--gap-columns)">
      <div>
        <div className="aspect-video w-full bg-well">
          {hasInteracted ? (
            <iframe
              key={current.id}
              src={`https://www.youtube-nocookie.com/embed/${current.youtubeId}?rel=0&autoplay=1`}
              title={current.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          ) : (
            <button
              type="button"
              onClick={() => setHasInteracted(true)}
              aria-label={`Play ${current.title}`}
              className="plate group relative h-full"
            >
              <img
                src={`https://i.ytimg.com/vi/${current.youtubeId}/hqdefault.jpg`}
                alt=""
                className="print h-full w-full object-cover"
              />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-16 w-16 items-center justify-center border border-fibre bg-ground text-fibre transition-colors group-hover:border-safelight group-hover:bg-safelight group-hover:text-safelight-ink">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 translate-x-0.5" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </span>
            </button>
          )}
        </div>
        <h3 className="mt-(--space-md) max-w-none">{current.title}</h3>
      </div>

      <ol className="rows max-h-[70vh] overflow-y-auto lg:max-h-none">
        {items.map((item, i) => {
          const active = i === selected
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => selectVideo(i)}
                aria-current={active}
                className={cn(
                  'flex w-full items-baseline gap-4 py-3 text-left transition-colors hover:text-fibre',
                  active ? 'text-fibre' : 'text-dim',
                )}
              >
                <span className={cn('label num w-6 shrink-0', active && 'text-safelight')}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="title flex-1">{item.title}</span>
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
