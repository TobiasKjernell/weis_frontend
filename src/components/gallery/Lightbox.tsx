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
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-label={item.alt}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-void/95 p-4 backdrop-blur-sm" 
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-5 top-5 font-mono text-xs uppercase tracking-[0.2em] text-ink-muted hover:text-cyan"
          >
            Close ✕
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onStep(-1)
            }}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-line p-3 text-ink-muted hover:border-cyan/60 hover:text-cyan sm:left-6"
          >
            ‹
          </button>

          <motion.img
            key={item.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            src={item.src}
            alt={item.alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-[90vw] rounded-md border border-line object-contain shadow-black/80 shadow-2xl"
          />

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onStep(1)
            }}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-line p-3 text-ink-muted hover:border-cyan/60 hover:text-cyan sm:right-6"
          >
            ›
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
