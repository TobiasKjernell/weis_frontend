import aboutBg from '../../assets/brand/about-bg.jpg'

const influences = ['John Carpenter', 'VHS horror', 'Kavinsky', 'Perturbator', 'CRT static', 'Midnight drives']

export function About() {
  return (
    <section id="about" className="section scroll-mt-16">
      <div className="container grid grid-cols-1 gap-(--space-xl) md:grid-cols-12 md:gap-(--gap-columns)">
        <div className="md:col-span-5">
          <div className="plate-frame">
            <img src={aboutBg} alt="Moroii live, backlit on stage" loading="lazy" className="print" />
          </div>
          <p className="label mt-3">Live</p>
        </div>

        <div className="flex flex-col gap-(--space-lg) md:col-span-6 md:col-start-7">
          <h2>Who is Moroii</h2>
          <p className="lead text-fibre">Synth horror for the after-hours.</p>
          <p className="text-fibre-2">
            Moroii writes music for the hour when the neon signs are the only thing still awake. Drawing from 80&apos;s
            slasher scores and cold-wave electronics, every track is built around analog synthesizers, tape hiss, and a
            sense of dread that never quite resolves.
          </p>
          <p className="text-fibre-2">
            Live, the set becomes a ritual — fog, strobing LED walls, and a hooded silhouette hunched over a wall of
            keys. It&apos;s less a concert than a transmission from somewhere you shouldn&apos;t be able to receive it.
          </p>

          <div className="mt-(--space-md)">
            <p className="label mb-3">Influences</p>
            <ul className="grid grid-cols-1 border-b border-hair sm:grid-cols-2 sm:gap-x-(--gap-columns)">
              {influences.map((item, i) => (
                <li
                  key={item}
                  className="flex items-baseline justify-between gap-4 border-t border-hair py-3"
                >
                  <span className="title">{item}</span>
                  <span className="label num">{String(i + 1).padStart(2, '0')}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
