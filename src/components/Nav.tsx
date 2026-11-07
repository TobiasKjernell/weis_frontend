import { motion, AnimatePresence } from 'framer-motion'
import { useUIStore } from '../store/useUIStore'
import logo from '../assets/brand/moroii-logo-white.png'

const links = [
  { href: '#videos', label: 'Videos' },
  { href: '#tour', label: 'Tour' },
  { href: '#about', label: 'About' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#merch', label: 'Merch' },
]

export function Nav() {
  const mobileNavOpen = useUIStore((s) => s.mobileNavOpen)
  const toggleMobileNav = useUIStore((s) => s.toggleMobileNav)
  const closeMobileNav = useUIStore((s) => s.closeMobileNav)

  // Close first, then scroll once the menu's fade has finished — a smooth
  // scroll started in the same tick as the close gets cancelled.
  function handleMobileNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault()
    closeMobileNav()
    window.history.pushState(null, '', href)
    window.setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }, 260)
  }

  return (
    <header className="sticky top-0 z-(--z-sticky-nav) border-b border-hair bg-ground">
      <nav className="container flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center" onClick={closeMobileNav}>
          <img src={logo} alt="Moroii" className="h-7 w-auto" />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="link text-dim hover:text-fibre">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="#tour" className="btn btn--sm hidden md:inline-flex">
          Tickets
        </a>

        <button
          type="button"
          onClick={toggleMobileNav}
          aria-expanded={mobileNavOpen}
          aria-label="Toggle menu"
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span className={`h-px w-6 bg-fibre transition-transform ${mobileNavOpen ? 'translate-y-[3.5px] rotate-45' : ''}`} />
          <span className={`h-px w-6 bg-fibre transition-transform ${mobileNavOpen ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
        </button>
      </nav>

      <AnimatePresence>
        {mobileNavOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="absolute inset-x-0 top-full border-b border-hair bg-ground md:hidden"
          >
            <ul className="container flex flex-col py-4">
              {links.map((link) => (
                <li key={link.href} className="border-t border-hair first:border-t-0">
                  <a
                    href={link.href}
                    onClick={(e) => handleMobileNavClick(e, link.href)}
                    className="block py-4 font-head text-2xl uppercase text-fibre-2 hover:text-fibre"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-4">
                <a href="#tour" onClick={(e) => handleMobileNavClick(e, '#tour')} className="btn btn--primary btn--block">
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
