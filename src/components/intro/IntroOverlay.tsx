import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import logo from '../../assets/brand/moroii-logo-white.png'

type Phase = 'dark' | 'logo' | 'exit'

const PREFERS_REDUCED = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Low-res random greyscale noise redrawn ~20x/s: the dead-channel look.
function StaticNoise({ calm }: { calm: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return
    const ctx: CanvasRenderingContext2D = context
    const img = ctx.createImageData(canvas.width, canvas.height)
    let last = 0
    let raf = 0
    function frame(t: number) {
      raf = requestAnimationFrame(frame)
      if (t - last < 50) return
      last = t
      const d = img.data
      for (let i = 0; i < d.length; i += 4) {
        const v = Math.random() * 255
        d[i] = d[i + 1] = d[i + 2] = v
        d[i + 3] = 255
      }
      ctx.putImageData(img, 0, 0)
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <>
      <canvas
        ref={ref}
        width={1920}
        height={1080}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full transition-opacity duration-1000 [image-rendering:pixelated]"
        style={{ opacity: calm ? 0.1 : 0.5 }}
      />
      <div aria-hidden="true" className="static-roll pointer-events-none absolute inset-x-0 top-0 h-1/4" />
    </>
  )
}

export function IntroOverlay({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<Phase>('dark')
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (PREFERS_REDUCED) {
      const t = setTimeout(() => setDismissed(true), 400)
      return () => clearTimeout(t)
    }

    const timers = [
      setTimeout(() => setPhase('logo'), 500),
      setTimeout(() => setPhase('exit'), 2600),
      setTimeout(() => setDismissed(true), 3200),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    if (!dismissed) return
    const t = setTimeout(onComplete, 500)
    return () => clearTimeout(t)
  }, [dismissed, onComplete])

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setDismissed(true)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="grained fixed inset-0 z-(--z-toast) flex flex-col items-center justify-center bg-ground"
          role="dialog"
          aria-label="Intro animation"
        >
          {!PREFERS_REDUCED && <StaticNoise calm={phase !== 'dark'} />}

          <div className="relative flex flex-col items-center px-6">
            {/* a print coming up in the tray: opacity only */}
            <motion.img
              src={logo}
              alt="Moroii"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === 'dark' ? 0 : 1 }}
              transition={{ duration: 1.4, ease: 'easeOut' }}
              className="h-28 w-auto sm:h-40"
            />
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: phase === 'dark' ? 0 : 1 }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 h-px w-48 origin-left bg-safelight"
            />
          </div>

          <button type="button" onClick={() => setDismissed(true)} className="btn btn--sm absolute bottom-8 right-(--gutter)">
            Skip intro
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
