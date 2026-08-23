import { motion } from 'framer-motion'
import { useGalleryItems } from '../../hooks/useGalleryItems'
import { useUIStore } from '../../store/useUIStore'
import { QueryBoundary } from '../ui/QueryBoundary'
import { SectionHeading } from '../ui/SectionHeading'
import { GallerySkeleton } from './GallerySkeleton'
import { Lightbox } from './Lightbox'
import type { GalleryItem } from '../../schemas/galleryItem'

function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const openLightbox = useUIStore((s) => s.openLightbox)

  return (
    <div className="columns-2 gap-4 sm:columns-3">
      {items.map((item, i) => (
        <motion.button
          key={item.id}
          type="button"
          onClick={() => openLightbox(i)}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
          className="group hover:border-[rgba(255,46,136,0.5)] relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-md border border-line focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan"
        >
          <img  
            src={item.thumbSrc}
            alt={item.alt}
            loading="lazy"
            className="w-full object-cover transition duration-500 group-hover:scale-105 group-hover:opacity-90"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
         {/* * <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,46,136,0)] transition group-hover:shadow-[inset_0_0_0_1px_rgba(255,46,136,0.5)]" /> */}
        </motion.button>
      ))}
    </div>
  )
}

export function Gallery() {
  const query = useGalleryItems()
  const lightboxIndex = useUIStore((s) => s.lightboxIndex)
  const closeLightbox = useUIStore((s) => s.closeLightbox)
  const stepLightbox = useUIStore((s) => s.stepLightbox)

  return (
    <section id="gallery" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow="Visuals" title="From the fog" align="center" />

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
