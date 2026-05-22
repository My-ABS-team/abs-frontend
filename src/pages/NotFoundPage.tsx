import { Link, useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { Search, LayoutDashboard, ArrowLeft } from 'lucide-react'

export function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-0)', display: 'flex', flexDirection: 'column' }}>
      <header style={{ padding: '20px clamp(24px, 5vw, 64px)', textAlign: 'center' }}>
        <div className="brand brand-lg" style={{ justifyContent: 'center' }}>
          <span className="brand-logo">CA</span>
          <span className="brand-text">CAPITAL ASSETS</span>
        </div>
      </header>

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center', position: 'relative' }}>
        {/* Decorative cards */}
        <div className="hide-mobile" style={{ position: 'absolute', top: '10%', right: '10%', width: 120, height: 120, border: '1px solid var(--line)', borderRadius: 16, opacity: 0.4 }} />
        <div className="hide-mobile" style={{ position: 'absolute', bottom: '12%', left: '8%', width: 80, height: 80, border: '1px solid var(--line)', borderRadius: 12, opacity: 0.4 }} />

        {/* Chart art */}
        <div style={{
          width: 180, height: 180, borderRadius: 24,
          background: 'linear-gradient(180deg, var(--bg-2), var(--bg-1))',
          border: '1px solid var(--line)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 48, position: 'relative',
        }}>
          <svg width="100" height="100" viewBox="0 0 100 100">
            <rect x="14" y="50" width="14" height="36" rx="2" fill="var(--green-300)" opacity="0.9" />
            <rect x="32" y="32" width="14" height="54" rx="2" fill="var(--green-300)" />
            <rect x="50" y="58" width="14" height="28" rx="2" fill="var(--red-300)" opacity="0.9" />
            <rect x="68" y="44" width="14" height="42" rx="2" fill="var(--red-300)" opacity="0.7" />
            <line x1="10" y1="20" x2="90" y2="76" stroke="var(--gold-300)" strokeWidth="2" strokeLinecap="round" />
            <circle cx="50" cy="48" r="4" fill="var(--gold-300)" />
          </svg>
          <div style={{
            position: 'absolute', bottom: -16, right: -16,
            width: 56, height: 56, borderRadius: 12,
            background: 'linear-gradient(135deg, var(--gold-300), var(--gold-500))',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1A1404',
          }}>
            <Search size={24} />
          </div>
        </div>

        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(32px, 5vw, 60px)', margin: 0, letterSpacing: '-0.02em', maxWidth: 720, lineHeight: 1.05, color: 'var(--text-0)' }}>
          404 · Asset Not Found
        </h1>
        <p className="muted" style={{ fontSize: 16, maxWidth: 480, margin: '16px auto 32px', lineHeight: 1.5 }}>
          The page you are looking for has been delisted or moved. Let's get you back to the trading floor.
        </p>

        <div className="row gap-3 wrap" style={{ justifyContent: 'center' }}>
          <Link to={ROUTES.DASHBOARD} className="btn btn-primary btn-lg">
            <LayoutDashboard size={14} /> Back to Dashboard
          </Link>
          <button className="btn btn-ghost btn-lg" onClick={() => navigate(-1)}>
            <ArrowLeft size={14} /> Previous Page
          </button>
        </div>

        <div style={{ marginTop: 64, padding: '12px 24px', borderRadius: 99, border: '1px solid var(--line)', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <span className="chip-dot pulse" style={{ background: 'var(--green-300)' }} />
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--green-300)' }}>Market Systems Online</span>
          <span className="muted" style={{ fontSize: 11, marginLeft: 12 }}>ERR_ASSET_UNREACHABLE_04</span>
        </div>
      </main>
    </div>
  )
}
