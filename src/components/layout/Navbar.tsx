import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Services',  to: ROUTES.HOME },
  { label: 'Research',  to: ROUTES.RESEARCH },
  { label: 'Advisory',  to: ROUTES.ADVISORY },
  { label: 'About',     to: '#about' },
  { label: 'Contact',   to: ROUTES.CONTACT },
] as const

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', isMenuOpen)
    return () => document.body.classList.remove('overflow-hidden')
  }, [isMenuOpen])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)')

    const handleViewportChange = (event: MediaQueryListEvent | MediaQueryList) => {
      if (event.matches) {
        setIsMenuOpen(false)
      }
    }

    handleViewportChange(mediaQuery)

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleViewportChange)
      return () => mediaQuery.removeEventListener('change', handleViewportChange)
    }

    mediaQuery.addListener(handleViewportChange)
    return () => mediaQuery.removeListener(handleViewportChange)
  }, [])

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-navy-950/80 backdrop-blur-sm border-b border-navy-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* Brand — CA badge on mobile, full wordmark on md+ */}
        <Link
          to={ROUTES.HOME}
          onClick={() => setIsMenuOpen(false)}
          className="flex items-center gap-2 shrink-0"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gold md:hidden">
            <span className="text-xs font-bold text-navy-950">CA</span>
          </div>
          <span className="hidden md:block text-white font-bold text-sm tracking-[0.12em] uppercase">
            Capital Assets Limited
          </span>
        </Link>

        {/* Nav links — desktop only */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, to }) => (
            <NavLink
              key={label}
              to={to}
              className={({ isActive }) =>
                cn(
                  'px-4 py-2 text-sm rounded-chip transition-colors duration-150',
                  isActive
                    ? 'text-gold border-b-2 border-gold pb-[6px]'
                    : 'text-navy-200 hover:text-white'
                )
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-2 md:gap-3">
          <Link to={ROUTES.LOGIN} className="hidden md:inline-flex btn-ghost text-sm">
            Login
          </Link>
          <Link
            to={ROUTES.REGISTER}
            onClick={() => setIsMenuOpen(false)}
            className="btn-primary text-sm px-4 py-2 md:px-5 md:py-2.5"
          >
            Create Account
          </Link>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setIsMenuOpen(v => !v)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            className="md:hidden flex flex-col justify-center items-center w-10 min-h-[44px] gap-[5px] rounded-chip hover:bg-navy-700 transition-colors"
          >
            <span className={cn('block w-5 h-0.5 bg-white transition-transform duration-200', isMenuOpen && 'rotate-45 translate-y-[7px]')} />
            <span className={cn('block w-5 h-0.5 bg-white transition-opacity duration-200',  isMenuOpen && 'opacity-0')} />
            <span className={cn('block w-5 h-0.5 bg-white transition-transform duration-200', isMenuOpen && '-rotate-45 -translate-y-[7px]')} />
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 bg-navy-950/95 backdrop-blur-md border-b border-navy-700 animate-slide-up z-50">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {NAV_LINKS.map(({ label, to }) => (
              <NavLink
                key={label}
                to={to}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'px-4 py-3 text-sm rounded-chip transition-colors min-h-[44px] flex items-center',
                    isActive
                      ? 'text-gold bg-gold/10'
                      : 'text-navy-200 hover:text-white hover:bg-navy-700'
                  )
                }
              >
                {label}
              </NavLink>
            ))}
            <div className="border-t border-navy-700 mt-3 pt-3">
              <Link
                to={ROUTES.LOGIN}
                onClick={() => setIsMenuOpen(false)}
                className="btn-ghost text-sm w-full justify-start min-h-[44px]"
              >
                Login
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
