import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { useVideoItems } from '../../hooks/useVideoItems'
import { cn } from '../../lib/utils'
import { Button, LinkButton } from '../ui/Button'
import { QueryBoundary } from '../ui/QueryBoundary'
import { SectionHeading } from '../ui/SectionHeading'
import { VideoCard } from './VideoCard'
import { VideoPlayer } from './VideoPlayer'
import { VideoSkeleton } from './VideoSkeleton'
import type { VideoItem } from '../../schemas/videoItem'

const PREVIEW_COUNT = 3
type ViewMode = 'grid' | 'player'

function ViewModeToggle({ mode, onChange }: { mode: ViewMode; onChange: (mode: ViewMode) => void }) {
  const options: { value: ViewMode; label: string }[] = [
    { value: 'grid', label: 'Grid' },
    { value: 'player', label: 'Player' },
  ]

  return (
    <div className="inline-flex rounded-full border border-line p-1">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          aria-pressed={mode === option.value}
          className={cn(
            'rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] transition',
            mode === option.value ? 'bg-cyan/15 text-cyan shadow-glow-cyan' : 'text-ink-muted hover:text-ink',
          )}
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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {preview.map((item, i) => (
          <VideoCard key={item.id} item={item} index={i} />
        ))}
      </div>

      {hasMore && (
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="video-drawer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-3">
                {rest.map((item, i) => (
                  <VideoCard key={item.id} item={item} index={i + PREVIEW_COUNT} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {hasMore && (
        <div className="mt-8 flex justify-center">
          <Button type="button" variant="outline" onClick={() => setExpanded((v) => !v)} aria-expanded={expanded}>
            {expanded ? 'Show less' : 'Show more'}
            <motion.svg
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="h-3.5 w-3.5"
            >
              <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </Button>
        </div>
      )}
    </div>
  )
}

export function Videos() {
  const query = useVideoItems()
  const [mode, setMode] = useState<ViewMode>('grid')

  return (
    <section id="videos" className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow="Watch" title="Music Videos" align="center" />

        <div className="mt-8 flex justify-center">
          <ViewModeToggle mode={mode} onChange={setMode} />
        </div>

        <div className="mt-12">
          <QueryBoundary
            query={query}
            skeleton={<VideoSkeleton />}
            emptyMessage="No videos are available right now — check back soon."
          >
            {(items) => (mode === 'grid' ? <VideoGrid items={items} /> : <VideoPlayer items={items} />)}
          </QueryBoundary>
        </div>

        <div className="mt-8 flex justify-center">
          <LinkButton
            href="https://www.youtube.com/@moroiimusic/videos"
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
          >
            More on YouTube ↗
          </LinkButton>
        </div>
      </div>
    </section>
  )
}
