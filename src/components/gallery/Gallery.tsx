import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { useGalleryItems } from '../../hooks/useGalleryItems'
import { useUIStore } from '../../store/useUIStore'
import { cn } from '../../lib/utils'
import { Button } from '../ui/Button'
import { QueryBoundary } from '../ui/QueryBoundary'
import { SectionHeading } from '../ui/SectionHeading'
import { GallerySkeleton } from './GallerySkeleton'
import { Lightbox } from './Lightbox'
import type { GalleryItem } from '../../schemas/galleryItem'

const PREVIEW_COUNT = 3
const GRID = 'grid grid-cols-1 gap-x-(--gap-columns) gap-y-(--space-xl) sm:grid-cols-3'

function plateNumber(index: number) {
  return `Plate ${String(index + 1).padStart(2, '0')}`
}

function GalleryTile({ item, index, onOpen }: { item: GalleryItem; index: number; onOpen: (index: number) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.42, ease: 'easeOut' }}
      className={cn(index % 3 === 1 && 'sm:mt-(--space-2xl)')}
    >
      <button type="button" onClick={() => onOpen(index)} aria-label={`Open ${plateNumber(index)}`} className="plate">
        <div className="plate-frame">
          <img src={item.src} alt={item.alt} loading="lazy" className="print" />
        </div>
        <span className="label num mt-3 block">{plateNumber(index)}</span>
      </button>
    </motion.div>
  )
}

function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const openLightbox = useUIStore((s) => s.openLightbox)
  const [expanded, setExpanded] = useState(false)
  const hasMore = items.length > PREVIEW_COUNT
  const preview = items.slice(0, PREVIEW_COUNT)
  const rest = items.slice(PREVIEW_COUNT)

  return (
    <div>
      <div className={GRID}>
        {preview.map((item, i) => (
          <GalleryTile key={item.id} item={item} index={i} onOpen={openLightbox} />
        ))}
      </div>

      {hasMore && (
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="gallery-drawer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.42, ease: 'easeOut' }}
              className={cn(GRID, 'pt-(--space-xl)')}
            >
              {rest.map((item, i) => (
                <GalleryTile key={item.id} item={item} index={i + PREVIEW_COUNT} onOpen={openLightbox} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {hasMore && (
        <div className="mt-(--space-xl)">
          <Button type="button" variant="outline" onClick={() => setExpanded((v) => !v)} aria-expanded={expanded}>
            {expanded ? 'Show less' : `Show all ${items.length} plates`}
          </Button>
        </div>
      )}
    </div>
  )
}

export function Gallery() {
  const query = useGalleryItems()
  const lightboxIndex = useUIStore((s) => s.lightboxIndex)
  const closeLightbox = useUIStore((s) => s.closeLightbox)
  const stepLightbox = useUIStore((s) => s.stepLightbox)

  return (
    <section id="gallery" className="section scroll-mt-16">
      <div className="container">
        <SectionHeading title="Live photos" />

        <div className="mt-(--space-2xl)">
          <QueryBoundary
            query={query}
            skeleton={<GallerySkeleton />}
            emptyMessage="No gallery images are available right now — check back soon."
          >
            {(items) => <GalleryGrid items={items} />}
          </QueryBoundary>
        </div>
      </div>

      {query.data && (
        <Lightbox
          items={query.data}
          index={lightboxIndex}
          onClose={closeLightbox}
          onStep={(delta) => stepLightbox(delta, query.data.length)}
        />
      )}
    </section>
  )
}
