import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { GalleryItem } from '../../schemas/galleryItem'

interface LightboxProps {
  items: GalleryItem[]
  index: number | null
  onClose: () => void
  onStep: (delta: number) => void
}

export function Lightbox({ items, index, onClose, onStep }: LightboxProps) {
  const item = index !== null ? items[index] : null

  useEffect(() => {
    if (item === null) return
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onStep(1)
      if (e.key === 'ArrowLeft') onStep(-1)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [item, onClose, onStep])

  return (
    <AnimatePresence>
      {item && index !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          role="dialog"
          aria-modal="true"
          aria-label={item.alt}
          onClick={onClose}
          className="fixed inset-0 z-(--z-modal) flex flex-col bg-ground"
        >
          <div className="container flex h-16 shrink-0 items-center justify-between">
            <span className="label num">
              Plate {String(index + 1).padStart(2, '0')} of {String(items.length).padStart(2, '0')}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onClose()
              }}
              className="btn btn--sm"
            >
              Close
            </button>
          </div>

          <div className="flex min-h-0 flex-1 items-center justify-center px-(--gutter)">
            <motion.img
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.42 }}
              src={item.src}
              alt={item.alt}
              onClick={(e) => e.stopPropagation()}
              className="print max-h-full max-w-full object-contain"
            />
          </div>

          <div className="container flex h-20 shrink-0 items-center justify-between">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onStep(-1)
              }}
              className="btn btn--sm"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onStep(1)
              }}
              className="btn btn--sm"
            >
              Next
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
