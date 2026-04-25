import { Link, NavLink } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Services',  to: ROUTES.HOME },
  { label: 'Research',  to: ROUTES.RESEARCH },
  { label: 'Advisory',  to: ROUTES.ADVISORY },
  { label: 'About',     to: '/#about' },
  { label: 'Contact',   to: ROUTES.CONTACT },
] as const

export function PublicNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-navy-700 bg-navy-950/90 backdrop-blur-md">
      <div className="page-container flex h-[60px] items-center justify-between">

        {/* Logo */}
        <Link to={ROUTES.HOME} className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gold-400">
            <span className="text-xs font-bold text-navy-950">CA</span>
          </div>
          <span className="text-sm font-bold tracking-wider text-white uppercase">
            Capital Assets <span className="font-normal text-white/50">Limited</span>
          </span>
        </Link>

        {/* Nav links — hidden on mobile */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map(({ label, to }) => (
            <NavLink
              key={label}
              to={to}
              className={({ isActive }) =>
                cn(
                  'px-3 py-1.5 text-sm rounded-md transition-colors duration-150',
                  isActive
                    ? 'text-gold-400 font-medium'
                    : 'text-white/60 hover:text-white',
                )
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* CTA buttons */}
        <div className="flex items-center gap-3">
          <Link
            to={ROUTES.LOGIN}
            className="hidden text-sm text-white/70 transition-colors hover:text-white sm:block"
          >
            Login
          </Link>
          <Link to={ROUTES.REGISTER} className="btn-gold py-2 px-4 text-sm">
            Create Account
          </Link>
        </div>

      </div>
    </header>
  )
}
