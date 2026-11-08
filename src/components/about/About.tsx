import { motion } from 'framer-motion'
import aboutBg from '../../assets/brand/about-bg.jpg'
import { SectionHeading } from '../ui/SectionHeading'

const influences = ['John Carpenter', 'VHS horror', 'Kavinsky', 'Perturbator', 'CRT static', 'Midnight drives', 'Carpenter Brut']

export function About() {
  return (
    <section id="about" className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 md:grid-cols-2 md:items-center md:gap-16">
        <div>
          <SectionHeading
            eyebrow="Who is Moroii"
            title="Synth horror for the after-hours"
          />
          <div className="mt-6 space-y-4 text-ink-muted">
            <p>
             Moroii is a Stockholm-based darksynth project steeped in 80s synth and the dread of horror cinema. Vintage hardware emulations meet the force of modern production, setting glossy retro against raw distortion.   
            </p>
            <p>
              Live, the set becomes a ritual — fog, strobing LED walls, and a hooded silhouette 
              hunched over a wall of keys. It&apos;s less a concert than a transmission from
              somewhere you shouldn&apos;t be able to receive it.
            </p>
          </div>

          <ul className="mt-8 flex flex-wrap gap-2">
            {influences.map((item) => (
              <li
                key={item}
                className="rounded-full border border-line bg-surface/60 px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-ink-muted"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative aspect-[4/5] overflow-hidden rounded-lg border border-line"
        >
          <img src={aboutBg} alt="Moroii live, backlit on stage" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent" />''
          <div className="grain-overlay" />
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_50px_rgba(139,92,246,0.25)]" />
        </motion.div>
      </div>
    </section>
  )
}
