import heroBg from '../../assets/brand/hero-bg.jpg'
import logo from '../../assets/brand/moroii-logo-white.png'

export function Hero() {
  return (
    <section id="top" className="hero">
      <img src={heroBg} alt="" className="print rise" />
      <div className="scrim" />

      <div className="container relative z-(--z-base) pb-(--space-xl) pt-(--space-3xl) md:pb-(--space-2xl)">
        <div className="grid grid-cols-1 items-end gap-(--space-lg) md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:gap-(--gap-columns)">
          <h1 className="max-w-none">
            <img src={logo} alt="Moroii" className="h-[clamp(9rem,24vw,22rem)] w-auto max-w-none" />
          </h1>

          <div className="flex flex-col gap-(--space-lg) md:pb-3">
            <p className="lead text-fibre">
              80&apos;s horror-inspired darksynth: analog synths, midnight highways and the static between channels.
            </p>
            <div className="flex flex-wrap gap-(--space-sm)">
              <a
                href="https://open.spotify.com/artist/3tN8ryBWonMvlKsOFOhvKt?si=74iT9709Q3WpSQzWEbBk4g"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary"
              >
                Listen on Spotify
              </a>
              <a href="#tour" className="btn">
                Tour dates
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
