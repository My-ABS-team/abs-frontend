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
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-navy-950/80 backdrop-blur-sm border-b border-navy-700">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Brand */}
        <Link to={ROUTES.HOME} className="text-white font-bold text-sm tracking-[0.12em] uppercase">
          Capital Assets Limited
        </Link>

        {/* Nav links */}
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

        {/* CTA buttons */}
        <div className="flex items-center gap-3">
          <Link to={ROUTES.LOGIN} className="btn-ghost text-sm">
            Login
          </Link>
          <Link to={ROUTES.REGISTER} className="btn-primary text-sm">
            Create Account
          </Link>
        </div>
      </div>
    </header>
  )
}
