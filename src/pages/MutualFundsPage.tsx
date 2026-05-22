import { useState } from 'react'
import { ArrowRight, Filter, TrendingUp, Shield, Zap, Users } from 'lucide-react'

const FUNDS = [
  { name: 'Aggressive Growth Fund',  risk: 'High',     riskColor: 'red',  price: '₦182.40', ytd: '+24.8%', trend: [30,35,32,40,38,45,50,48,55,60] },
  { name: 'Balanced Income Fund',    risk: 'Moderate', riskColor: 'gold', price: '₦145.20', ytd: '+14.2%', trend: [40,42,41,44,43,46,45,48,50,52] },
  { name: 'Capital Preservation',    risk: 'Low',      riskColor: 'blue', price: '₦110.80', ytd: '+8.6%',  trend: [46,47,46,48,47,49,48,50,51,52] },
  { name: 'Fixed Income Bond Fund',  risk: 'Low',      riskColor: 'blue', price: '₦120.50', ytd: '+11.4%', trend: [44,46,45,47,46,49,48,51,52,54] },
  { name: 'Real Estate Trust Fund',  risk: 'Moderate', riskColor: 'gold', price: '₦165.30', ytd: '+17.9%', trend: [35,36,40,38,42,44,42,46,48,50] },
  { name: 'NGX Top 30 Index Fund',   risk: 'High',     riskColor: 'red',  price: '₦204.60', ytd: '+21.3%', trend: [28,32,30,36,34,42,40,46,50,54] },
]

const FILTER_OPTIONS: [string, string][] = [
  ['all', 'All Funds'], ['low', 'Low Risk'], ['moderate', 'Moderate'],
  ['high', 'High Risk'], ['bonds', 'Bonds'], ['equity', 'Equity'],
]

const WHY_PILLARS = [
  { Icon: Users,      title: 'Professional Management', body: 'Portfolio managers leverage deep market intelligence to optimize returns while navigating NGX volatility.' },
  { Icon: TrendingUp, title: 'Instant Diversification', body: 'A single fund entry provides exposure across multiple asset classes, mitigating individual security risk.' },
  { Icon: Shield,     title: 'SEC Regulated',           body: 'All funds are strictly regulated by the Securities & Exchange Commission, ensuring investor protection.' },
  { Icon: Zap,        title: 'Liquidity Access',        body: 'Flexible entry and exit points designed for both short-term parking and long-term wealth creation.' },
]

function Sparkline({ data }: { data: number[] }) {
  const w = 240, h = 50
  const mn = Math.min(...data), mx = Math.max(...data)
  const xs = data.map((_, i) => (i / (data.length - 1)) * w)
  const ys = data.map((v) => h - ((v - mn) / (mx - mn || 1)) * h)
  const line = xs.map((x, i) => `${i === 0 ? 'M' : 'L'} ${x} ${ys[i]}`).join(' ')
  const area = [...xs.map((x, i) => `${i === 0 ? 'M' : 'L'} ${x} ${ys[i]}`), `L ${w} ${h} L 0 ${h} Z`].join(' ')
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="fundSparkGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="var(--gold-300)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="var(--gold-300)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#fundSparkGrad)" />
      <path d={line} stroke="var(--gold-300)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function MutualFundsPage() {
  const [filter, setFilter] = useState('all')

  return (
    <div>
      <div className="page-title-row">
        <div>
          <div className="eyebrow" style={{ marginBottom: 6 }}>Fund Anthology</div>
          <h1 className="h2" style={{ margin: 0 }}>Curated Managed Assets</h1>
          <p className="muted" style={{ marginTop: 4, fontSize: 13 }}>
            Institutional-grade portfolios stewarded by our Lagos and Abuja investment committees.
          </p>
        </div>
        <div className="row gap-2">
          <button className="btn btn-secondary btn-sm"><Filter size={14} /> Compare</button>
          <button className="btn btn-primary btn-sm">Invest Now</button>
        </div>
      </div>

      {/* Featured fund banner */}
      <div className="card" style={{
        padding: 32, marginBottom: 24,
        background: `
          radial-gradient(circle at 90% 50%, rgba(221,176,96,0.18), transparent 50%),
          radial-gradient(circle at 0% 0%, rgba(0,25,76,0.4), transparent 60%),
          var(--bg-2)`,
        border: '1px solid var(--line-strong)',
        overflow: 'hidden',
      }}>
        <div className="row between wrap" style={{ gap: 32, alignItems: 'flex-start' }}>
          <div style={{ flex: '1 1 480px', minWidth: 0 }}>
            <div className="eyebrow" style={{ marginBottom: 12 }}>Featured Performance</div>
            <h2 className="h2" style={{ margin: '0 0 12px' }}>Capital Assets Aggressive Growth Fund</h2>
            <p className="muted" style={{ fontSize: 15, maxWidth: 600 }}>
              Focused on the top 50 high-growth equities on the Nigerian Exchange (NGX), engineered for investors seeking long-term capital appreciation through active rotation.
            </p>
            <div className="row gap-3 wrap" style={{ marginTop: 24 }}>
              <button className="btn btn-primary btn-lg">Invest Now <ArrowRight size={14} /></button>
              <button className="btn btn-ghost btn-lg">View Factsheet</button>
            </div>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div className="kpi-value green" style={{ fontSize: 56, lineHeight: 1 }}>+24.8%</div>
            <div className="label" style={{ color: 'var(--gold-300)', marginTop: 8 }}>Yield YTD</div>
            <div className="row gap-3" style={{ marginTop: 16, justifyContent: 'flex-end' }}>
              <span style={{ fontSize: 12 }}><strong style={{ color: 'var(--text-0)' }}>₦18.7B</strong> <span className="muted">AUM</span></span>
              <span style={{ fontSize: 12 }}><strong style={{ color: 'var(--text-0)' }}>4.7★</strong> <span className="muted">Rating</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter chips */}
      <div className="row gap-2 wrap" style={{ marginBottom: 16 }}>
        {FILTER_OPTIONS.map(([k, l]) => (
          <button key={k} onClick={() => setFilter(k)} className={`chip${filter === k ? ' chip-gold' : ''}`} style={{ cursor: 'pointer' }}>{l}</button>
        ))}
      </div>

      {/* Fund grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16, marginBottom: 32 }}>
        {FUNDS.map((f, i) => (
          <div
            key={i}
            className="card card-padded"
            style={{ cursor: 'pointer', transition: 'border-color .2s ease' }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--gold-600)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = '')}
          >
            <div className="row between" style={{ marginBottom: 16 }}>
              <span className={`chip chip-${f.riskColor}`}>{f.risk} risk</span>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--bg-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-300)' }}>
                <TrendingUp size={18} />
              </div>
            </div>
            <h4 className="h4" style={{ margin: '0 0 8px' }}>{f.name}</h4>
            <div className="row gap-2" style={{ marginBottom: 16 }}>
              <span className="mono" style={{ fontWeight: 700, color: 'var(--text-0)' }}>{f.price}</span>
              <span className="muted" style={{ fontSize: 12 }}>per unit</span>
            </div>
            <div style={{ marginBottom: 16, height: 50 }}>
              <Sparkline data={f.trend} />
            </div>
            <div className="row between" style={{ paddingTop: 12, borderTop: '1px solid var(--line)' }}>
              <span style={{ fontSize: 12 }}>
                <span className="muted">YTD </span>
                <strong style={{ color: 'var(--green-300)' }}>{f.ytd}</strong>
              </span>
              <button className="btn btn-primary btn-sm">Invest</button>
            </div>
          </div>
        ))}
      </div>

      {/* Why invest */}
      <div className="card card-padded">
        <div style={{ fontWeight: 600, color: 'var(--text-0)', fontSize: 15, marginBottom: 4 }}>Why Invest in Funds?</div>
        <div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 24 }}>Four pillars of our institutional approach</div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24, marginBottom: 32 }}>
          {WHY_PILLARS.map(({ Icon, title, body }) => (
            <div key={title}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--bg-3)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-300)', marginBottom: 16 }}>
                <Icon size={20} />
              </div>
              <h4 className="h4" style={{ margin: '0 0 8px' }}>{title}</h4>
              <p className="muted" style={{ fontSize: 13, margin: 0, lineHeight: 1.5 }}>{body}</p>
            </div>
          ))}
        </div>

        <div className="card" style={{ padding: 24, background: 'var(--bg-1)', borderColor: 'var(--gold-700)' }}>
          <div className="row gap-4" style={{ alignItems: 'flex-start' }}>
            <div style={{ width: 56, height: 56, borderRadius: 12, flexShrink: 0, background: 'linear-gradient(135deg, #2A1F0E, var(--gold-700))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, color: '#1A1404' }}>MO</div>
            <div style={{ flex: 1 }}>
              <p style={{ margin: '0 0 12px', fontStyle: 'italic', fontSize: 16, color: 'var(--text-1)', lineHeight: 1.6 }}>
                "True wealth creation is not a product of chance, but of disciplined asset allocation and the courage to trust institutional expertise in emerging markets."
              </p>
              <div>
                <strong style={{ color: 'var(--text-0)' }}>Mr. M.A. Olushekun</strong>
                <span className="muted" style={{ marginLeft: 8, fontSize: 13 }}>Chief Executive Officer, Capital Assets Limited</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
