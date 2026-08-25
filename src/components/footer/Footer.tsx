import type { SVGProps } from 'react'
import logo from '../../assets/brand/moroii-logo-white.png'

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  )
}

function SpotifyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M7 10.5c3.2-1 6.8-.7 9.5.9M7.5 13.5c2.6-.8 5.5-.5 7.7.8M8 16.3c2-.6 4.3-.4 6 .6" />
    </svg>
  )
}

function YoutubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" {...props}>
      <rect x="3" y="6" width="18" height="12" rx="4" />
      <path d="M10.5 9.8v4.4l4-2.2z" fill="currentColor" stroke="none" />
    </svg>
  )
}

const socials = [
  { label: 'Instagram', Icon: InstagramIcon, href: 'https://www.instagram.com/moroiimusic/' },
  {
    label: 'Spotify',
    Icon: SpotifyIcon,
    href: 'https://open.spotify.com/artist/3tN8ryBWonMvlKsOFOhvKt?si=74iT9709Q3WpSQzWEbBk4g',
  },
  { label: 'YouTube', Icon: YoutubeIcon, href: 'https://www.youtube.com/@moroiimusic' },
]

export function Footer() {
  return (
    <footer className="relative border-t border-line/70 bg-void-2">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="flex flex-col items-center gap-6 text-center">
          <img src={logo} alt="Moroii" className="h-8 w-auto opacity-80" />

          <div className="flex items-center gap-3">
            {socials.map(({ label, Icon, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-muted transition hover:border-cyan/60 hover:text-cyan hover:shadow-glow-cyan"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          <p className="max-w-md text-sm text-ink-dim">
            For booking &amp; press inquiries, reach out through the socials above.
          </p>

          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-dim">
            © {new Date().getFullYear()} Moroii. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
