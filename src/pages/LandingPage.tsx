import { Link } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { Shield, Zap, TrendingUp, Headphones, ArrowRight } from 'lucide-react'
import { PublicFooter } from '@/components/layout/PublicFooter'
import { MarketTickerTape } from '@/components/shared/MarketTickerTape'

const TOP_MOVERS = [
  { ticker: 'MTNN',      sector: 'Telecom',  price: '245.50',   change: '+2.4%', up: true,  spark: [220,225,222,228,230,236,232,240,242,245] },
  { ticker: 'ZENITHBANK',sector: 'Banking',  price: '38.20',    change: '-0.8%', up: false, spark: [42,41.5,40.8,40,39.5,39,38.6,38.4,38.2,38] },
  { ticker: 'GTCO',      sector: 'Banking',  price: '41.15',    change: '+0.8%', up: true,  spark: [39,39.5,40,40.5,41,41.2,41,41.1,41.15,41] },
  { ticker: 'SEPLAT',    sector: 'Oil & Gas',price: '2,100.00', change: '0.0%',  up: true,  spark: [2080,2095,2105,2090,2110,2105,2098,2102,2100,2100] },
]

const FEATURES = [
  { Icon: Shield,     title: '25+ Years Market Leadership',   body: 'Established authority in the Nigerian financial markets. We are an SEC-Regulated entity and active NGX Dealing Member.' },
  { Icon: Zap,        title: 'Ultra-Low Latency Terminal',     body: 'Experience institutional-grade execution on our high-performance platform, designed for both retail and institutional traders.' },
  { Icon: TrendingUp, title: 'In-Depth Market Research',      body: 'Gain an edge with weekly market analysis, quarterly corporate reviews, and macroeconomic forecasting from our lead analysts.' },
  { Icon: Headphones, title: 'White-Glove Advisory',          body: 'Direct line to a dedicated portfolio manager. Your wealth deserves precision attention, not a queue ticket.' },
]

const SERVICES = [
  { name: 'Stockbroking',       body: 'Execute trades on NGX & NASD with brokerage as low as 1.35%.',                             img: 'linear-gradient(135deg, #103966, #1B2640)' },
  { name: 'Mutual Funds',       body: 'Six curated funds across risk profiles, managed by our investment committee.',              img: 'linear-gradient(135deg, #2A1F0E, #4E4639)' },
  { name: 'Investment Banking', body: 'Capital raising, M&A advisory, and IPO underwriting for corporates.',                      img: 'linear-gradient(135deg, #143818, #2A6B2C)' },
  { name: 'Wealth Advisory',    body: 'Bespoke portfolio construction for HNW and institutional clients.',                        img: 'linear-gradient(135deg, #1B2640, #050912)' },
]

function Sparkline({ data, width = 80, height = 28, color = 'var(--green-300)' }: { data: number[]; width?: number; height?: number; color?: string }) {
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * width},${height - ((v - min) / range) * height}`)
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" style={{ overflow: 'visible' }}>
      <polyline points={pts.join(' ')} stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function HeroAreaChart() {
  const d = [150400,150800,151200,150900,151500,151900,151700,152100,152400,152200,152571]
  const min = Math.min(...d); const max = Math.max(...d); const range = max - min
  const w = 500; const h = 80
  const pts = d.map((v, i) => ({ x: (i / (d.length - 1)) * w, y: h - ((v - min) / range) * h }))
  const linePath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ')
  const fillPath = `${linePath} L${w},${h} L0,${h} Z`
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="heroGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--gold-300)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--gold-300)" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={fillPath} fill="url(#heroGrad)" />
      <path d={linePath} stroke="var(--gold-300)" strokeWidth="2" fill="none" />
    </svg>
  )
}

export function LandingPage() {
  return (
    <div style={{ background: 'var(--bg-1)', overflow: 'hidden' }}>

      {/* ─── Hero ──────────────────────────────────────────────────────────── */}
      <section style={{
        position: 'relative',
        padding: 'clamp(48px, 8vw, 96px) clamp(24px, 5vw, 80px)',
        background: `
          radial-gradient(ellipse at top left, rgba(0, 25, 76, 0.4), transparent 50%),
          radial-gradient(ellipse at bottom right, rgba(221, 176, 96, 0.06), transparent 40%),
          var(--bg-1)`,
        overflow: 'hidden',
      }}>
        {/* Decorative grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
          pointerEvents: 'none',
        }} />

        <div className="hero-grid" style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)', gap: 64, alignItems: 'center', maxWidth: 1320, margin: '0 auto' }}>

          {/* Left — copy */}
          <div>
            <div className="row gap-2" style={{ marginBottom: 24 }}>
              <span className="chip chip-gold">
                <span className="chip-dot pulse" style={{ background: 'var(--gold-300)' }} />
                SEC Licensed · NGX Dealing Member
              </span>
            </div>

            <h1 style={{
              fontFamily: 'var(--font-display)', fontWeight: 800,
              letterSpacing: '-0.025em', fontSize: 'clamp(40px, 6vw, 80px)',
              lineHeight: 1.02, color: 'var(--text-0)', margin: 0,
            }}>
              Premium Stockbroking<br />
              <span style={{ background: 'linear-gradient(135deg, var(--gold-100), var(--gold-400))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                &amp; Asset Management
              </span><br />
              in Nigeria.
            </h1>

            <p style={{ marginTop: 24, fontSize: 'clamp(15px, 1.4vw, 18px)', color: 'var(--text-2)', lineHeight: 1.6, maxWidth: 580 }}>
              Direct access to the Nigerian Exchange (NGX) and NASD OTC with a trusted,
              SEC-regulated partner. We manage funds, raise capital, and grow wealth through expert advisory.
            </p>

            <div className="row gap-3 wrap" style={{ marginTop: 36 }}>
              <Link to={ROUTES.REGISTER} className="btn btn-primary btn-lg">
                Open Your Account <ArrowRight size={14} />
              </Link>
              <Link to={ROUTES.HOME} className="btn btn-ghost btn-lg">
                View Market Rates
              </Link>
            </div>

            {/* Stats row */}
            <div className="row gap-8 wrap" style={{ marginTop: 48 }}>
              {[
                { v: '25+ Yrs', l: 'Market Leadership' },
                { v: '₦400B+',  l: 'AUM Stewarded' },
                { v: '98%',     l: 'Client Retention' },
              ].map(s => (
                <div key={s.l}>
                  <div className="kpi-value gold" style={{ fontSize: 28 }}>{s.v}</div>
                  <div className="label" style={{ marginTop: 4 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — floating market widget */}
          <div style={{ position: 'relative' }}>
            <div className="card" style={{
              padding: 24,
              background: 'linear-gradient(180deg, rgba(27,38,64,0.7), rgba(13,28,42,0.95))',
              backdropFilter: 'blur(12px)',
              borderColor: 'var(--gold-700)',
              boxShadow: '0 40px 100px -40px rgba(0,0,0,0.8)',
            }}>
              <div className="row between" style={{ marginBottom: 16 }}>
                <div>
                  <div className="label" style={{ marginBottom: 4 }}>NGX All-Share Index</div>
                  <div className="row gap-3" style={{ alignItems: 'baseline' }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 32, color: 'var(--text-0)' }}>
                      152,571.99
                    </span>
                    <span className="chip chip-green">↗ +1.24%</span>
                  </div>
                </div>
                <span className="chip chip-green">
                  <span className="chip-dot pulse" style={{ background: 'var(--green-300)' }} />
                  Live
                </span>
              </div>

              <div style={{ height: 80, marginBottom: 16 }}>
                <HeroAreaChart />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {TOP_MOVERS.map(t => (
                  <div key={t.ticker} style={{ padding: 12, borderRadius: 8, background: 'rgba(0,0,0,0.25)', border: '1px solid var(--line)' }}>
                    <div className="row between" style={{ marginBottom: 8 }}>
                      <div className="label" style={{ fontSize: 9 }}>{t.sector}</div>
                      <Sparkline data={t.spark} width={40} height={16} color={t.up ? 'var(--green-300)' : 'var(--red-100)'} />
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--text-0)' }}>{t.ticker}</div>
                    <div className="row between mono" style={{ fontSize: 12, marginTop: 2 }}>
                      <span style={{ color: 'var(--text-2)' }}>₦{t.price}</span>
                      <span style={{ color: t.up ? 'var(--green-300)' : 'var(--red-100)' }}>{t.change}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* NGX badge */}
            <div className="hide-mobile" style={{
              position: 'absolute', top: -20, right: -20,
              width: 80, height: 80, borderRadius: 16,
              background: 'linear-gradient(135deg, var(--gold-300), var(--gold-600))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#1A1404', fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800,
              transform: 'rotate(8deg)', boxShadow: 'var(--shadow-gold)',
            }}>
              NGX
            </div>
          </div>

        </div>
      </section>

      {/* ─── Ticker tape ──────────────────────────────────────────────────── */}
      <MarketTickerTape />

      {/* ─── Why Choose Capital Assets ────────────────────────────────────── */}
      <section style={{ padding: '80px clamp(24px, 5vw, 80px)', maxWidth: 1320, margin: '0 auto' }}>
        <div className="text-center" style={{ marginBottom: 48 }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>Our Edge</div>
          <h2 className="h2" style={{ margin: 0 }}>Why Choose Capital Assets?</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {FEATURES.map(({ Icon, title, body }) => (
            <div key={title} className="card card-padded">
              <div style={{
                width: 48, height: 48, borderRadius: 12,
                background: 'rgba(221,176,96,0.1)', border: '1px solid var(--gold-700)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--gold-300)', marginBottom: 20,
              }}>
                <Icon size={22} />
              </div>
              <h4 className="h4" style={{ margin: '0 0 8px' }}>{title}</h4>
              <p className="muted" style={{ fontSize: 14, margin: 0, lineHeight: 1.55 }}>{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Our Financial Suite ──────────────────────────────────────────── */}
      <section style={{ padding: '40px clamp(24px, 5vw, 80px) 80px', maxWidth: 1320, margin: '0 auto' }}>
        <div className="row between wrap" style={{ marginBottom: 32, gap: 16 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 12 }}>Our Financial Suite</div>
            <h2 className="h2" style={{ margin: 0, maxWidth: 600 }}>
              Tailored solutions for wealth creation in the Nigerian market.
            </h2>
          </div>
          <button className="btn btn-outline-gold">Explore All Services <ArrowRight size={14} /></button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
          {SERVICES.map(s => (
            <div
              key={s.name}
              className="card"
              style={{ overflow: 'hidden', cursor: 'pointer', transition: 'transform .2s ease', padding: 0 }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'none' }}
            >
              <div style={{ height: 160, background: s.img, position: 'relative', overflow: 'hidden' }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
                  backgroundSize: '30px 30px',
                }} />
                <div style={{ position: 'absolute', bottom: 16, left: 20, fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, color: 'var(--text-0)' }}>
                  {s.name}
                </div>
              </div>
              <div style={{ padding: 20 }}>
                <p className="muted" style={{ fontSize: 13, margin: '0 0 16px', lineHeight: 1.5 }}>{s.body}</p>
                <span className="gold" style={{ fontSize: 13, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  Learn more <ArrowRight size={12} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────────────────── */}
      <section style={{ padding: '80px clamp(24px, 5vw, 80px)', maxWidth: 1320, margin: '0 auto' }}>
        <div className="card" style={{
          padding: 'clamp(40px, 8vw, 80px)', textAlign: 'center',
          background: `
            radial-gradient(circle at 50% 0%, rgba(221, 176, 96, 0.18), transparent 40%),
            radial-gradient(circle at 50% 100%, rgba(0, 25, 76, 0.4), transparent 50%),
            var(--bg-2)`,
          borderColor: 'var(--gold-700)', position: 'relative', overflow: 'hidden',
        }}>
          <div className="eyebrow" style={{ marginBottom: 16 }}>Ready to begin</div>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: 'clamp(28px, 4vw, 48px)', margin: '0 auto 16px',
            maxWidth: 800, letterSpacing: '-0.02em', color: 'var(--text-0)',
          }}>
            Take control of your financial future.
          </h2>
          <p className="muted" style={{ fontSize: 16, maxWidth: 560, margin: '0 auto 32px', lineHeight: 1.5 }}>
            Open your account in minutes and start trading on Nigeria's premier exchanges.
            Onboarding completes in under 8 minutes with valid BVN.
          </p>
          <div className="row gap-3 wrap" style={{ justifyContent: 'center' }}>
            <Link to={ROUTES.REGISTER} className="btn btn-primary btn-lg">Open Account Now</Link>
            <button className="btn btn-ghost btn-lg">Download Brochure</button>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  )
}
