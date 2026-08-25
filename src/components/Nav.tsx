import { motion, AnimatePresence } from 'framer-motion'
import { useUIStore } from '../store/useUIStore'
import logo from '../assets/brand/moroii-logo-white.png'

const links = [
  { href: '#about', label: 'About' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#videos', label: 'Videos' },
  { href: '#tour', label: 'Tour' },
  { href: '#merch', label: 'Merch' },
]

export function Nav() {
  const mobileNavOpen = useUIStore((s) => s.mobileNavOpen)
  const toggleMobileNav = useUIStore((s) => s.toggleMobileNav)
  const closeMobileNav = useUIStore((s) => s.closeMobileNav)

  // The menu's own close animation (height collapse) cancels an in-flight
  // smooth scroll if started in the same tick — including the browser's
  // native hash-scroll. Close first, then scroll once that animation ends.
  function handleMobileNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault()
    closeMobileNav()
    window.history.pushState(null, '', href)
    window.setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }, 260)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/60 bg-void/70 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-2" onClick={closeMobileNav}>
          <img src={logo} alt="Moroii" className="h-6 w-auto opacity-90" />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-mono text-xs uppercase tracking-[0.2em] text-ink-muted transition-colors hover:text-cyan hover:text-glow-cyan"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#tour"
          className="hidden rounded-full border border-magenta/60 px-5 py-2 font-mono text-xs uppercase tracking-[0.2em] text-magenta transition hover:bg-magenta/10 hover:shadow-glow-magenta md:inline-flex"
        >
          Tickets
        </a>

        <button
          type="button"
          onClick={toggleMobileNav}
          aria-expanded={mobileNavOpen}
          aria-label="Toggle menu"
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-px w-6 bg-ink transition-transform ${mobileNavOpen ? 'translate-y-[3.5px] rotate-45' : ''}`}
          />
          <span className={`h-px w-6 bg-ink transition-opacity ${mobileNavOpen ? 'opacity-0' : ''}`} />
          <span
            className={`h-px w-6 bg-ink transition-transform ${mobileNavOpen ? '-translate-y-[3.5px] -rotate-45' : ''}`}
          />
        </button>
      </nav>

      <AnimatePresence>
        {mobileNavOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-b border-line/60 bg-void/95 md:hidden"
          >
            <ul className="flex flex-col gap-1 px-5 py-4">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleMobileNavClick(e, link.href)}
                    className="block py-3 font-mono text-sm uppercase tracking-[0.2em] text-ink-muted hover:text-cyan"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#tour"
                  onClick={(e) => handleMobileNavClick(e, '#tour')}
                  className="mt-2 block rounded-full border border-magenta/60 px-5 py-3 text-center font-mono text-xs uppercase tracking-[0.2em] text-magenta"
                >
                  Tickets
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
