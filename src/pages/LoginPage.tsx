import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { ROUTES } from '@/constants/routes'
import { useAuthStore } from '@/stores/authStore'
import { authApi } from '@/services/api/auth'

const schema = z.object({
  email:    z.string().email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})
type FormValues = z.infer<typeof schema>

export function LoginPage() {
  const navigate  = useNavigate()
  const location  = useLocation()
  const setAuth   = useAuthStore((s) => s.setAuth)
  const from      = (location.state as any)?.from?.pathname ?? ROUTES.DASHBOARD

  const [showPassword, setShowPassword] = useState(false)
  const [serverError,  setServerError]  = useState('')
  const [isLoading,    setIsLoading]    = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(values: FormValues) {
    setServerError('')
    setIsLoading(true)
    try {
      const { user, tokens } = await authApi.login(values)
      setAuth(user, tokens)
      navigate(from, { replace: true })
    } catch (err: any) {
      setServerError(err?.response?.data?.message ?? 'Invalid email or password.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="split-shell">

      {/* ─── Aside ─────────────────────────────────────────────────────────── */}
      <aside className="split-aside" style={{
        background: 'linear-gradient(135deg, #050912 0%, #0D1B2A 60%, #1B2640 100%)',
      }}>
        {/* Decorative overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(221,176,96,0.10), transparent 35%),
            radial-gradient(circle at 80% 75%, rgba(87,129,222,0.08), transparent 30%),
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
              NGX · SEC · NASD Licensed
            </span>
            <h2 className="h1" style={{ fontSize: 'clamp(36px, 5vw, 56px)', margin: 0, lineHeight: 1.05 }}>
              Welcome back to your capital.
            </h2>
            <p className="muted" style={{ marginTop: 20, fontSize: 15, lineHeight: 1.6, maxWidth: 480 }}>
              Access your institutional portfolio, live market data, and wealth management tools — all in one secure platform.
            </p>
          </div>

          {/* Stats row */}
          <div style={{ marginTop: 48 }}>
            <div className="row gap-8 wrap">
              {[
                { l: 'Assets Under Mgmt', v: '₦400B+' },
                { l: 'Active Investors',  v: '12,000+' },
                { l: 'Uptime',            v: '99.9%'   },
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
        <div style={{ maxWidth: 440 }}>
          <h2 className="h2" style={{ margin: '0 0 8px' }}>Sign in to your account</h2>
          <p className="muted" style={{ margin: '0 0 32px' }}>
            Don't have an account?{' '}
            <Link to={ROUTES.REGISTER} className="gold" style={{ fontWeight: 600 }}>Create one here.</Link>
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="col gap-4">

              {/* Server error */}
              {serverError && (
                <div style={{
                  padding: '12px 16px', borderRadius: 8,
                  background: 'rgba(243,116,104,0.08)',
                  border: '1px solid rgba(243,116,104,0.3)',
                  fontSize: 13, color: 'var(--red-100)',
                }}>
                  {serverError}
                </div>
              )}

              <div className="field">
                <label className="field-label">Email Address</label>
                <div className="input-with-icon">
                  <Mail size={16} className="icon" />
                  <input
                    {...register('email')}
                    className="input"
                    type="email"
                    placeholder="name@example.com"
                    autoComplete="email"
                  />
                </div>
                {errors.email && (
                  <div style={{ color: 'var(--red-300)', fontSize: 11, marginTop: 4 }}>{errors.email.message}</div>
                )}
              </div>

              <div className="field">
                <div className="row between" style={{ marginBottom: 6 }}>
                  <label className="field-label" style={{ marginBottom: 0 }}>Password</label>
                  <Link
                    to="/forgot-password"
                    style={{ fontSize: 12, color: 'var(--gold-300)', fontWeight: 600, textDecoration: 'none' }}
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="input-with-icon">
                  <Lock size={16} className="icon" />
                  <input
                    {...register('password')}
                    className="input"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    style={{ paddingRight: 48 }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    style={{
                      position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                      color: 'var(--text-3)', background: 'none', border: 'none', cursor: 'pointer',
                    }}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && (
                  <div style={{ color: 'var(--red-300)', fontSize: 11, marginTop: 4 }}>{errors.password.message}</div>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-block btn-lg"
                disabled={isLoading}
                style={{ marginTop: 8, opacity: isLoading ? 0.7 : 1 }}
              >
                {isLoading ? 'Signing in…' : 'Sign In'}
              </button>

              {/* Divider */}
              <div className="row gap-3" style={{ alignItems: 'center', margin: '4px 0' }}>
                <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
                <span style={{ fontSize: 11, color: 'var(--text-3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>or</span>
                <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
              </div>

              <Link to={ROUTES.REGISTER} style={{ textDecoration: 'none' }}>
                <button type="button" className="btn btn-outline-gold btn-block">
                  Create a new account
                </button>
              </Link>

            </div>
          </form>
        </div>

        <div style={{ marginTop: 'auto', fontSize: 11, color: 'var(--text-3)', textAlign: 'center', padding: '32px 0 0', lineHeight: 1.6 }}>
          © {new Date().getFullYear()} Capital Assets Limited · Regulated by SEC, NGX, and NASD<br />
          All rights reserved. Professionalism. Integrity. Growth.
        </div>
      </main>
    </div>
  )
}
