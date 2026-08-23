import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import heroBg from '../../assets/brand/hero-bg.jpg'
import logo from '../../assets/brand/moroii-logo-white.png'

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section id="top" ref={ref} className="relative flex h-[100svh] min-h-[640px] w-full items-end overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <img src={heroBg} alt="" className="h-[120%] w-full object-cover object-[50%_28%]" />
        <div className="absolute inset-0 bg-gradient-to-b from-void/70 via-void/40 to-void" />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent" />
        <div className="absolute inset-0 bg-void/20 mix-blend-multiply" style={{ backgroundColor: 'rgba(139,92,246,0.15)' }} />
      </motion.div>

      <div className="bg-grid-horizon pointer-events-none absolute inset-x-0 bottom-0 h-40 [mask-image:linear-gradient(to_top,black,transparent)] sm:h-56" />

      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-20 sm:px-8 sm:pb-28"
      >
        <motion.img
          src={logo}
          alt="Moroii"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-16 w-auto drop-shadow-[0_0_40px_rgba(255,46,136,0.5)] sm:h-24"
        />
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-5 max-w-lg font-mono text-sm uppercase tracking-[0.25em] text-cyan text-glow-cyan sm:text-base"
        >
          80&apos;s horror-inspired darksynth
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-4 max-w-xl text-ink-muted"
        >
          Analog synths, midnight highways, and the static between channels. Moroii soundtracks the
          world after the credits roll.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-8 flex flex-wrap gap-4"
        >
          <a
            href="#tour"
            className="rounded-full bg-magenta px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-void shadow-glow-magenta transition hover:bg-magenta-soft"
          >
            See tour dates
          </a>
          <a
            href="#gallery"
            className="rounded-full border border-cyan/60 px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-cyan transition hover:bg-cyan/10 hover:shadow-glow-cyan"
          >
            View gallery
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
