import { motion } from 'framer-motion'
import { useState } from 'react'
import type { VideoItem } from '../../schemas/videoItem'

export function VideoCard({ item, index }: { item: VideoItem; index: number }) {
  const [playing, setPlaying] = useState(false)

  if (playing) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-md border border-line bg-void">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${item.youtubeId}?autoplay=1&rel=0`}
          title={item.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    )
  }

  return (
    <motion.button
      type="button"
      onClick={() => setPlaying(true)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      className="group hover:border-[rgba(255,46,136,0.5)] relative block aspect-video w-full overflow-hidden rounded-md border border-line text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan"
    >
      <img
        src={`https://i.ytimg.com/vi/${item.youtubeId}/hqdefault.jpg`}
        alt={item.title}
        loading="lazy"
        className="h-full w-full object-cover transition duration-500 group-hover:scale-105 group-hover:opacity-80"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/90 via-void/10 to-transparent" />

      <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-magenta/70 bg-void/60 text-magenta shadow-glow-magenta transition group-hover:scale-110">
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 translate-x-0.5">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>

      <span className="pointer-events-none absolute inset-x-0 bottom-0 p-3 font-mono text-xs uppercase tracking-[0.15em] text-ink">
        {item.title}
      </span>
    </motion.button>
  )
}
