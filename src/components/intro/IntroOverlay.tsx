import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import logo from '../../assets/brand/moroii-logo-white.png'

type Phase = 'static' | 'logo' | 'tagline' | 'exit'

const PREFERS_REDUCED = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function IntroOverlay({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<Phase>('static')
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (PREFERS_REDUCED) {
      const t = setTimeout(() => setDismissed(true), 400)
      return () => clearTimeout(t)
    }

    const timers = [
      setTimeout(() => setPhase('logo'), 420),
      setTimeout(() => setPhase('tagline'), 1500),
      setTimeout(() => setPhase('exit'), 2900),
      setTimeout(() => setDismissed(true), 3500),
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
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-void"
          role="dialog"
          aria-label="Intro animation"
        >
          {!PREFERS_REDUCED && (
            <>
              <motion.div
                className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.08)_0,rgba(255,255,255,0.08)_1px,transparent_1px,transparent_3px)]"
                initial={{ opacity: 0.5 }}
                animate={{ opacity: [0.5, 0.15, 0.4, 0.1] }}
                transition={{ duration: 0.4, repeat: phase === 'static' ? Infinity : 0 }}
              />
              <div className="grain-overlay opacity-20" />
            </>
          )}

          <div className="relative flex flex-col items-center px-6">
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={
                phase === 'static'
                  ? { opacity: 0 }
                  : { opacity: 1, scale: 1 }
              }
              transition={{ duration: 0.5 }}
            >
              <img
                src={logo}
                alt="Moroii"
                className="relative h-24 w-auto drop-shadow-[0_0_30px_rgba(255,46,136,0.55)] sm:h-32"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={phase === 'tagline' || phase === 'exit' ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mt-6 font-mono text-xs uppercase tracking-[0.4em] text-cyan text-glow-cyan"
            >
              Entering the nightdrive
            </motion.p>
          </div>

          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="absolute bottom-8 right-6 font-mono text-xs uppercase tracking-[0.2em] text-ink-dim transition-colors hover:text-ink sm:right-10"
          >
            Skip intro →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
