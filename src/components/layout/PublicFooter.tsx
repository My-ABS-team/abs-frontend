import { Link } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'

const FOOTER_LINKS = [
  { label: 'Complaint Policy', to: '#' },
  { label: 'Data Protection',  to: '#' },
  { label: 'Wallet Top Up',    to: '#' },
  { label: 'Privacy Policy',   to: '#' },
  { label: 'Terms of Service', to: '#' },
] as const

export function PublicFooter() {
  return (
    <footer className="border-t border-navy-700 bg-navy-900">
      <div className="page-container py-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">

          {/* Brand */}
          <div>
            <p className="mb-3 text-sm font-semibold text-gold-400">Capital Assets Limited</p>
            <div className="mb-4 flex gap-2">
              {(['SEC', 'NGX', 'NASD'] as const).map((badge) => (
                <span
                  key={badge}
                  className="rounded border border-navy-600 px-2 py-0.5 text-xs text-white/50"
                >
                  {badge}
                </span>
              ))}
            </div>
            <p className="text-xs leading-relaxed text-white/40">
              © {new Date().getFullYear()} Capital Assets Limited. Regulated by SEC, NGX, and NASD.
              Registered as a Broker-Dealer and Investment Adviser.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <ul className="space-y-2">
              {FOOTER_LINKS.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-sm text-white/50 transition-colors hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Offices */}
          <div className="space-y-4 text-right">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gold-400">
                Lagos Head Office
              </p>
              <p className="text-xs leading-relaxed text-white/50">
                St. Nicholas House, 10th Floor,<br />
                Catholic Mission Street, Lagos.
              </p>
            </div>
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gold-400">
                Abuja Branch
              </p>
              <p className="text-xs leading-relaxed text-white/50">
                Wuse II, Federal Capital Territory,<br />
                Abuja, Nigeria.
              </p>
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}
