import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { useVideoItems } from '../../hooks/useVideoItems'
import { Button, LinkButton } from '../ui/Button'
import { QueryBoundary } from '../ui/QueryBoundary'
import { VideoCard } from './VideoCard'
import { VideoPlayer } from './VideoPlayer'
import { VideoSkeleton } from './VideoSkeleton'
import type { VideoItem } from '../../schemas/videoItem'

const PREVIEW_COUNT = 3
type ViewMode = 'grid' | 'player'

function ViewModeToggle({ mode, onChange }: { mode: ViewMode; onChange: (mode: ViewMode) => void }) {
  const options: { value: ViewMode; label: string }[] = [
    { value: 'player', label: 'Player' },
    { value: 'grid', label: 'Grid' },
  ]

  return (
    <div className="inline-flex">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          aria-pressed={mode === option.value}
          className="cell"
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

function VideoGrid({ items }: { items: VideoItem[] }) {
  const [expanded, setExpanded] = useState(false)
  const hasMore = items.length > PREVIEW_COUNT
  const preview = items.slice(0, PREVIEW_COUNT)
  const rest = items.slice(PREVIEW_COUNT)

  return (
    <div>
      <div className="grid grid-cols-1 gap-x-(--gap-columns) gap-y-(--space-xl) sm:grid-cols-3">
        {preview.map((item, i) => (
          <VideoCard key={item.id} item={item} index={i} />
        ))}
      </div>

      {hasMore && (
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="video-drawer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.42, ease: 'easeOut' }}
            >
              <div className="grid grid-cols-1 gap-x-(--gap-columns) gap-y-(--space-xl) pt-(--space-xl) sm:grid-cols-3">
                {rest.map((item, i) => (
                  <VideoCard key={item.id} item={item} index={i + PREVIEW_COUNT} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {hasMore && (
        <div className="mt-(--space-xl)">
          <Button type="button" variant="outline" onClick={() => setExpanded((v) => !v)} aria-expanded={expanded}>
            {expanded ? 'Show less' : 'Show more'}
          </Button>
        </div>
      )}
    </div>
  )
}

export function Videos() {
  const query = useVideoItems()
  const [mode, setMode] = useState<ViewMode>('player')

  return (
    <section id="videos" className="section scroll-mt-16">
      <div className="container">
        <div className="flex flex-col gap-(--space-lg) md:flex-row md:items-end md:justify-between">
          <h2>Music videos</h2>
          <ViewModeToggle mode={mode} onChange={setMode} />
        </div>

        <div className="mt-(--space-2xl)">
          <QueryBoundary
            query={query}
            skeleton={<VideoSkeleton />}
            emptyMessage="No videos are available right now — check back soon."
          >
            {(items) => (mode === 'grid' ? <VideoGrid items={items} /> : <VideoPlayer items={items} />)}
          </QueryBoundary>
        </div>

        <div className="mt-(--space-xl)">
          <LinkButton
            href="https://www.youtube.com/@moroiimusic/videos"
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
          >
            More on YouTube
          </LinkButton>
        </div>
      </div>
    </section>
  )
}
