import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { useGalleryItems } from '../../hooks/useGalleryItems'
import { useUIStore } from '../../store/useUIStore'
import { Button } from '../ui/Button'
import { QueryBoundary } from '../ui/QueryBoundary'
import { SectionHeading } from '../ui/SectionHeading'
import { GallerySkeleton } from './GallerySkeleton'
import { Lightbox } from './Lightbox'
import type { GalleryItem } from '../../schemas/galleryItem'

const PREVIEW_COUNT = 3

function GalleryTile({ item, index, onOpen }: { item: GalleryItem; index: number; onOpen: (index: number) => void }) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(index)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      className="group hover:border-[rgba(255,46,136,0.5)] relative block aspect-2/3 w-full overflow-hidden rounded-md border border-line focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan"
    >
      <img
        src={item.src}
        alt={item.alt}
        loading="lazy"
        className="h-full w-full object-cover transition duration-500 group-hover:scale-105 group-hover:opacity-90"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
    </motion.button>
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
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {preview.map((item, i) => (
          <GalleryTile key={item.id} item={item} index={i} onOpen={openLightbox} />
        ))}
      </div>

      {hasMore && (
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="gallery-drawer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-2 gap-4 pt-4 sm:grid-cols-3">
                {rest.map((item, i) => (
                  <GalleryTile key={item.id} item={item} index={i + PREVIEW_COUNT} onOpen={openLightbox} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {hasMore && (
        <div className="mt-8 flex justify-center">
          <Button
            type="button"
            variant="outline"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
          >
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

export function Gallery() {
  const query = useGalleryItems()
  const lightboxIndex = useUIStore((s) => s.lightboxIndex)
  const closeLightbox = useUIStore((s) => s.closeLightbox)
  const stepLightbox = useUIStore((s) => s.stepLightbox)

  return (
    <section id="gallery" className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow="Gallery" title="Live Photos" align="center" />

        <div className="mt-12">
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
