import { Link } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { Twitter, Linkedin, Mail } from 'lucide-react'

const COMPANY_LINKS = [
  { label: 'About', to: ROUTES.CONTACT },
  { label: 'Leadership', to: ROUTES.CONTACT },
  { label: 'Careers', to: ROUTES.CONTACT },
  { label: 'Newsroom', to: ROUTES.CONTACT },
] as const

const COMPLIANCE_LINKS = [
  { label: 'Privacy Policy', to: '#' },
  { label: 'Terms of Service', to: '#' },
  { label: 'Whistleblowing', to: '#' },
  { label: 'Data Protection', to: '#' },
] as const

export function PublicFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">

        {/* Brand */}
        <div>
          <div className="brand brand-lg" style={{ marginBottom: 16 }}>
            <span className="brand-logo">CA</span>
            <span className="brand-text">CAPITAL ASSETS</span>
          </div>
          <p style={{ marginTop: 0, maxWidth: 320, fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6 }}>
            Premium brokerage and financial advisory licensed by the Securities & Exchange
            Commission, regulated by NGX.
          </p>
          <div className="row gap-2" style={{ marginTop: 16 }}>
            {(['SEC', 'NGX', 'NASD'] as const).map((badge) => (
              <span key={badge} className="chip" style={{ fontSize: 10 }}>{badge}</span>
            ))}
          </div>
        </div>

        {/* Company */}
        <div>
          <h5>Company</h5>
          {COMPANY_LINKS.map(({ label, to }) => (
            <Link key={label} to={to}>{label}</Link>
          ))}
        </div>

        {/* Compliance */}
        <div>
          <h5>Compliance</h5>
          {COMPLIANCE_LINKS.map(({ label, to }) => (
            <Link key={label} to={to}>{label}</Link>
          ))}
        </div>

        {/* Offices */}
        <div>
          <h5>Offices</h5>
          <p>
            <strong style={{ color: 'var(--gold-300)' }}>Lagos Head Office</strong><br />
            St. Nicholas House, 10th Floor<br />
            Catholic Mission Street, Lagos
          </p>
          <p style={{ marginTop: 12 }}>
            <strong style={{ color: 'var(--gold-300)' }}>Abuja Branch</strong><br />
            Wuse II, FCT, Abuja
          </p>
        </div>

      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Capital Assets Limited. Regulated by SEC, NGX, and NASD.</span>
        <div className="row gap-3">
          <a href="https://twitter.com" aria-label="Twitter" style={{ color: 'var(--text-3)', transition: 'color .15s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-0)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-3)')}>
            <Twitter size={16} />
          </a>
          <a href="https://linkedin.com" aria-label="LinkedIn" style={{ color: 'var(--text-3)', transition: 'color .15s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-0)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-3)')}>
            <Linkedin size={16} />
          </a>
          <a href="mailto:info@capitalassets.com.ng" aria-label="Email" style={{ color: 'var(--text-3)', transition: 'color .15s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-0)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-3)')}>
            <Mail size={16} />
          </a>
        </div>
      </div>
    </footer>
  )
}
