import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { Eye, EyeOff, User, Mail, Phone, Lock } from 'lucide-react'

export function RegisterPage() {
  const [step, setStep] = useState(1)
  const [accountType, setAccountType] = useState<'individual' | 'corporate'>('individual')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="split-shell">

      {/* ─── Aside ─────────────────────────────────────────────────────────── */}
      <aside className="split-aside" style={{
        background: step === 1
          ? 'linear-gradient(135deg, #050912 0%, #0D1B2A 60%, #1B2640 100%)'
          : 'linear-gradient(135deg, #050912 0%, #0B1F33 60%, #1A3550 100%)',
      }}>
        {/* Decorative overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            radial-gradient(circle at 30% 30%, rgba(221,176,96,0.08), transparent 30%),
            radial-gradient(circle at 70% 80%, rgba(87,129,222,0.10), transparent 30%),
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: 'auto, auto, 60px 60px, 60px 60px',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Link to={ROUTES.HOME} style={{ textDecoration: 'none' }}>
            <div className="brand brand-lg">
              <span className="brand-logo">CA</span>
              <span className="brand-text">CAPITAL ASSETS</span>
            </div>
          </Link>

          <div style={{ flex: 1 }} />

          <div style={{ maxWidth: 520 }}>
            <span className="chip chip-gold" style={{ marginBottom: 20 }}>
              <span className="chip-dot pulse" style={{ background: 'var(--gold-300)' }} />
              Institutional Grade Security
            </span>
            <h2 className="h1" style={{ fontSize: 'clamp(36px, 5vw, 56px)', margin: 0, lineHeight: 1.05 }}>
              {step === 1 ? 'Secure your capital.\nElevate your wealth.' : 'Tailored for your\nspecific goals.'}
            </h2>
            <p className="muted" style={{ marginTop: 20, fontSize: 15, lineHeight: 1.6, maxWidth: 480 }}>
              {step === 1
                ? 'Licensed by SEC, regulated by NGX. Your premium gateway to Nigerian capital markets and institutional-grade wealth management.'
                : 'Whether growing personal wealth or managing corporate assets, our platform adapts to your scale and risk appetite.'}
            </p>
          </div>

          <div style={{ marginTop: 48 }}>
            <div className="row gap-8 wrap">
              {[
                { l: 'Member', v: 'NGX Group' },
                { l: 'Regulated by', v: 'SEC Nigeria' },
                { l: 'Custody', v: 'CSCS PLC' },
              ].map(({ l, v }) => (
                <div key={l}>
                  <div className="label">{l}</div>
                  <div style={{ marginTop: 4, color: 'var(--text-0)', fontWeight: 600 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* ─── Form ──────────────────────────────────────────────────────────── */}
      <main className="split-main">
        <div className="row between" style={{ marginBottom: 32 }}>
          <span className="label">Step {step} of 2</span>
          <span className="label">Verified Access</span>
        </div>

        {/* Progress bar */}
        <div className="row gap-2" style={{ marginBottom: 32 }}>
          <div style={{ flex: 1, height: 3, borderRadius: 3, background: 'var(--gold-300)' }} />
          <div style={{ flex: 1, height: 3, borderRadius: 3, background: step === 2 ? 'var(--gold-300)' : 'var(--bg-3)' }} />
        </div>

        {step === 1 ? (
          <div style={{ maxWidth: 440 }}>
            <h2 className="h2" style={{ margin: '0 0 8px' }}>Create your Capital Assets account</h2>
            <p className="muted" style={{ margin: '0 0 32px' }}>Step 1: Account credentials</p>

            <div className="col gap-4">
              <div className="field">
                <label className="field-label">Full Name</label>
                <div className="input-with-icon">
                  <User size={16} className="icon" />
                  <input className="input" placeholder="Enter your legal name" />
                </div>
              </div>

              <div className="field">
                <label className="field-label">Email Address</label>
                <div className="input-with-icon">
                  <Mail size={16} className="icon" />
                  <input className="input" type="email" placeholder="name@example.com" />
                </div>
              </div>

              <div className="field">
                <label className="field-label">Phone Number</label>
                <div className="row gap-2">
                  <div className="row gap-2" style={{ padding: '12px 14px', background: 'var(--bg-3)', border: '1px solid var(--line)', borderRadius: 'var(--r-sm)', color: 'var(--text-1)', flexShrink: 0 }}>
                    <Phone size={14} />
                    <span style={{ fontSize: 14 }}>+234</span>
                  </div>
                  <input className="input" placeholder="800 000 0000" />
                </div>
              </div>

              <div className="field">
                <label className="field-label">Password</label>
                <div className="input-with-icon">
                  <Lock size={16} className="icon" />
                  <input
                    className="input" style={{ paddingRight: 48 }}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(v => !v)}
                    style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-3)', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="field">
                <label className="field-label">Confirm Password</label>
                <div className="input-with-icon">
                  <Lock size={16} className="icon" />
                  <input className="input" type="password" placeholder="Re-enter your password" />
                </div>
              </div>

              <button className="btn btn-primary btn-block btn-lg" onClick={() => setStep(2)} style={{ marginTop: 8 }}>
                Continue
              </button>

              <div className="text-center muted" style={{ fontSize: 13, marginTop: 16 }}>
                Already have an account?{' '}
                <Link to={ROUTES.LOGIN} className="gold" style={{ fontWeight: 600 }}>Login here.</Link>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ maxWidth: 480 }}>
            <h2 className="h2" style={{ margin: '0 0 8px' }}>Choose your account type</h2>
            <p className="muted" style={{ margin: '0 0 32px' }}>Step 2: We tailor your dashboard and compliance journey based on this.</p>

            <div className="col gap-3">
              {[
                { key: 'individual' as const, Icon: User,   title: 'Individual Investor',       body: 'Personal wealth management, mutual funds, and stock trading.' },
                { key: 'corporate'  as const, Icon: null,   title: 'Institutional / Corporate',  body: 'For pension funds, insurance companies, and corporate brokerage accounts.' },
              ].map(opt => {
                const isActive = accountType === opt.key
                return (
                  <div
                    key={opt.key}
                    onClick={() => setAccountType(opt.key)}
                    className="card"
                    style={{
                      padding: 20, cursor: 'pointer',
                      borderColor: isActive ? 'var(--gold-300)' : 'var(--line)',
                      background: isActive ? 'rgba(221,176,96,0.05)' : 'var(--bg-2)',
                      transition: 'all .15s ease',
                    }}
                  >
                    <div className="row gap-3" style={{ alignItems: 'flex-start' }}>
                      <div style={{
                        width: 48, height: 48, borderRadius: 10,
                        background: isActive ? 'var(--gold-300)' : 'var(--bg-3)',
                        color: isActive ? '#1A1404' : 'var(--text-2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      }}>
                        <User size={20} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4 className="h4" style={{ margin: '0 0 4px' }}>{opt.title}</h4>
                        <p className="muted" style={{ fontSize: 13, margin: 0, lineHeight: 1.5 }}>{opt.body}</p>
                      </div>
                      <div style={{
                        width: 20, height: 20, borderRadius: '50%',
                        border: `2px solid ${isActive ? 'var(--gold-300)' : 'var(--line-strong)'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      }}>
                        {isActive && <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--gold-300)' }} />}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <button
              className="btn btn-primary btn-block btn-lg"
              onClick={() => navigate(ROUTES.DASHBOARD)}
              style={{ marginTop: 24 }}
            >
              Continue to Verification
            </button>
            <button className="btn btn-ghost btn-block btn-sm" onClick={() => setStep(1)} style={{ marginTop: 8 }}>
              ← Go back
            </button>
          </div>
        )}

        <div style={{ marginTop: 'auto', fontSize: 11, color: 'var(--text-3)', textAlign: 'center', padding: '32px 0 0', lineHeight: 1.6 }}>
          © {new Date().getFullYear()} Capital Assets Limited · Regulated by SEC, NGX, and NASD<br />
          All rights reserved. Professionalism. Integrity. Growth.
        </div>
      </main>
    </div>
  )
}
