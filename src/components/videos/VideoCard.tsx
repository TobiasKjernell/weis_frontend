import { useState } from 'react'
import type { VideoItem } from '../../schemas/videoItem'

export function VideoCard({ item }: { item: VideoItem; index: number }) {
  const [playing, setPlaying] = useState(false)

  if (playing) {
    return (
      <div>
        <div className="aspect-video w-full bg-well">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${item.youtubeId}?autoplay=1&rel=0`}
            title={item.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
        <p className="title mt-3">{item.title}</p>
      </div>
    )
  }

  return (
    <button type="button" onClick={() => setPlaying(true)} className="plate group">
      <div className="relative aspect-video w-full overflow-hidden bg-well">
        <img
          src={`https://i.ytimg.com/vi/${item.youtubeId}/hqdefault.jpg`}
          alt={item.title}
          loading="lazy"
          className="print h-full w-full object-cover"
        />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-14 w-14 items-center justify-center border border-fibre bg-ground text-fibre transition-colors group-hover:bg-safelight group-hover:border-safelight group-hover:text-safelight-ink">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 translate-x-0.5" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </span>
      </div>
      <span className="title mt-3 block">{item.title}</span>
    </button>
  )
}
