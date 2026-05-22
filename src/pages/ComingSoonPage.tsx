import { useNavigate } from 'react-router-dom'
import { Shield, Compass, Sparkles, ArrowLeft, Clock } from 'lucide-react'

const FEATURES = [
  { Icon: Compass, title: 'New Architecture',  body: 'Built on a sovereign backbone for high-frequency advisory accuracy.' },
  { Icon: Shield,  title: 'Security First',    body: 'Multi-layer cold-storage protocols integrated into every transaction.' },
  { Icon: Sparkles,title: 'AI Co-Pilot',       body: 'Conversational research and trade suggestions powered by our proprietary models.' },
]

export function ComingSoonPage() {
  const navigate = useNavigate()
  return (
    <div style={{
      minHeight: '100vh',
      background: `
        radial-gradient(ellipse at center top, rgba(0, 25, 76, 0.6), transparent 50%),
        var(--bg-1)`,
      display: 'flex', flexDirection: 'column',
    }}>
      <header style={{ padding: '20px clamp(24px, 5vw, 64px)', borderBottom: '1px solid var(--line)' }}>
        <div className="brand brand-lg">
          <span className="brand-logo">CA</span>
          <span className="brand-text">CAPITAL ASSETS</span>
        </div>
      </header>

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 24px', textAlign: 'center' }}>
        <div style={{
          width: 120, height: 120, borderRadius: 24,
          background: 'linear-gradient(180deg, rgba(221,176,96,0.12), rgba(221,176,96,0.02))',
          border: '1px solid var(--gold-700)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 32, boxShadow: 'var(--shadow-gold)',
        }}>
          <Clock size={56} style={{ color: 'var(--gold-300)' }} />
        </div>

        <div className="eyebrow" style={{ marginBottom: 12 }}>2026 Innovation Roadmap</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(40px, 6vw, 72px)', margin: 0, letterSpacing: '-0.02em', maxWidth: 800, lineHeight: 1.05, color: 'var(--text-0)' }}>
          Expanding the Horizon.
        </h1>
        <p className="muted" style={{ fontSize: 16, maxWidth: 580, margin: '20px auto 32px', lineHeight: 1.55 }}>
          This feature is under development as part of our 2026 Innovation Roadmap. We are perfecting the advisory experience for institutional traders.
        </p>

        {/* Email capture */}
        <div className="card" style={{ padding: 6, display: 'flex', gap: 8, maxWidth: 480, width: '100%', borderColor: 'var(--gold-700)', background: 'rgba(13,28,42,0.8)' }}>
          <div className="input-with-icon" style={{ flex: 1 }}>
            <span className="icon" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-3)' }}>@</span>
            <input className="input" style={{ background: 'transparent', border: 'none', paddingLeft: 36 }} placeholder="Email Address" />
          </div>
          <button className="btn btn-primary">Notify Me</button>
        </div>
        <div className="row gap-2" style={{ marginTop: 16, justifyContent: 'center' }}>
          <Shield size={12} style={{ color: 'var(--gold-300)' }} />
          <span style={{ fontSize: 11, color: 'var(--text-3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Institutional Grade Security Guaranteed</span>
        </div>

        {/* Feature preview cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, maxWidth: 720, marginTop: 64, width: '100%' }}>
          {FEATURES.map(({ Icon, title, body }) => (
            <div key={title} className="card card-padded" style={{ textAlign: 'left' }}>
              <Icon size={20} style={{ color: 'var(--gold-300)', marginBottom: 12 }} />
              <h4 className="h4" style={{ margin: '0 0 8px' }}>{title}</h4>
              <p className="muted" style={{ fontSize: 13, margin: 0, lineHeight: 1.55 }}>{body}</p>
            </div>
          ))}
        </div>
      </main>

      <footer style={{ padding: '32px 24px', textAlign: 'center', borderTop: '1px solid var(--line)' }}>
        <button onClick={() => navigate(-1)} className="muted" style={{ fontSize: 13, cursor: 'pointer', fontWeight: 600, background: 'none', border: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <ArrowLeft size={12} /> Return to previous page
        </button>
      </footer>
    </div>
  )
}
