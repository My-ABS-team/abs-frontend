import { useState } from 'react'
import { Globe, TrendingUp, Diamond, Briefcase, Plus, ArrowRight, Download } from 'lucide-react'

const CATEGORIES = [
  { key: 'macro',  label: 'Macro Analysis',    count: 24,  Icon: Globe      },
  { key: 'equity', label: 'Equity Research',   count: 156, Icon: TrendingUp },
  { key: 'fi',     label: 'Fixed Income',      count: 89,  Icon: Diamond    },
  { key: 'corp',   label: 'Corporate Actions', count: 42,  Icon: Briefcase  },
]

const ARTICLES = [
  {
    tag: 'Sector Outlook',
    time: '2 hours ago',
    title: 'Nigerian Banking Sector: Navigating the New Interest Rate Regime',
    sub:   "A deep-dive into how the CBN's hawkish pivot affects tier-1 bank earnings and dividend sustainability in H2 2026.",
    featured: true,
    author: 'Dr. Aminu Kewa',
    role: 'Chief Economist',
  },
  {
    tag: 'Corporate Action',
    time: '1 day ago',
    title: 'MTNN Q1 2026 Earnings: Subscriber Growth Offsets ARPU Decline',
    sub:   'MTN Nigeria reports 8.4% YoY revenue growth driven by data monetization despite headwinds from naira devaluation.',
    featured: false,
  },
  {
    tag: 'Fixed Income',
    time: '3 days ago',
    title: 'FGN Bond Auction: Yields Compress as Demand Surges',
    sub:   'Oversubscription of 240% in the April FGN bond auction signals sustained institutional appetite for sovereign paper.',
    featured: false,
  },
  {
    tag: 'Macro',
    time: '1 week ago',
    title: "Inflation Trajectory: CBN's Dual Mandate Under Pressure",
    sub:   'With food inflation at 31.7%, the Central Bank faces growing pressure to recalibrate its tightening stance.',
    featured: false,
  },
]

const NEWSFEED = [
  { time: '09:14 AM', text: 'NGX ASI opens 0.3% higher as banking stocks rally ahead of dividend season.' },
  { time: 'Yesterday', text: 'SEPLAT reports record 2025 annual output; raises full-year production guidance.' },
  { time: 'May 19', text: 'CBN holds MPR at 26.75% — analysts expect a cut at the July MPC meeting.' },
  { time: 'May 18', text: 'Dangote Cement set to list on NASD following landmark secondary offering.' },
]

function DonutSentiment({ value = 75 }: { value?: number }) {
  const r = 70, cx = 90, cy = 90, stroke = 14
  const circ = 2 * Math.PI * r
  const filled = (value / 100) * circ
  return (
    <svg width={180} height={180} viewBox="0 0 180 180">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--bg-4)" strokeWidth={stroke} />
      <circle
        cx={cx} cy={cy} r={r} fill="none"
        stroke="var(--gold-300)" strokeWidth={stroke}
        strokeDasharray={`${filled} ${circ}`}
        strokeDashoffset={circ * 0.25}
        strokeLinecap="round"
        style={{ transition: 'stroke-dasharray 0.5s ease' }}
      />
      <text x={cx} y={cy - 8} textAnchor="middle" fontFamily="var(--font-display)" fontSize={26} fontWeight={800} fill="var(--text-0)">{value}%</text>
      <text x={cx} y={cy + 14} textAnchor="middle" fontSize={13} fill="var(--text-3)">Bullish</text>
    </svg>
  )
}

export function AppResearchPage() {
  const [activeCategory, setActiveCategory] = useState('equity')
  const [featured, ...rest] = ARTICLES

  return (
    <div>
      <div className="page-title-row">
        <div>
          <div className="eyebrow" style={{ marginBottom: 6 }}>The Reading Room</div>
          <h1 className="h2" style={{ margin: 0 }}>Research Insights</h1>
          <p className="muted" style={{ marginTop: 4, fontSize: 13 }}>
            Weekly market analysis, quarterly corporate results reviews, and macroeconomic forecasting from our lead analyst team.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '260px minmax(0, 1fr) 280px', gap: 24, alignItems: 'flex-start' }} className="research-grid">
        {/* Sidebar categories */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card card-padded" style={{ padding: 16 }}>
            <div style={{ fontWeight: 600, color: 'var(--text-0)', fontSize: 14, marginBottom: 12 }}>Categories</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {CATEGORIES.map(({ key, label, count, Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={`side-item${activeCategory === key ? ' active' : ''}`}
                  style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}
                >
                  <Icon size={16} className="ico" />
                  <span style={{ flex: 1 }}>{label}</span>
                  <span className="mono" style={{ fontSize: 11, color: 'var(--text-3)' }}>{count}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="card card-padded" style={{ padding: 16 }}>
            <div style={{ fontWeight: 600, color: 'var(--text-0)', fontSize: 14, marginBottom: 12 }}>Saved Filters</div>
            <div className="row gap-2 wrap">
              <span className="chip chip-gold">Daily Recap</span>
              <span className="chip chip-gold">Banking 2026</span>
              <span className="chip chip-gold">High Yield Bonds</span>
              <span className="chip" style={{ cursor: 'pointer' }}><Plus size={11} /> New</span>
            </div>
          </div>
        </div>

        {/* Articles */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 0 }}>
          {/* Featured article */}
          <div className="card" style={{
            position: 'relative', overflow: 'hidden', padding: 32,
            background: 'linear-gradient(180deg, rgba(7,11,20,0.4), rgba(7,11,20,0.95)), linear-gradient(135deg, #1B2640, #050912)',
            minHeight: 320, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
            borderColor: 'var(--gold-700)',
          }}>
            <div className="row gap-2" style={{ marginBottom: 16 }}>
              <span className="chip chip-gold">{featured.tag}</span>
              <span className="chip">Macro</span>
            </div>
            <h2 className="h2" style={{ margin: 0, maxWidth: 600, fontFamily: 'var(--font-display)' }}>{featured.title}</h2>
            <div className="row between wrap" style={{ marginTop: 24, gap: 16 }}>
              <div className="row gap-3">
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--bg-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, color: 'var(--gold-300)', flexShrink: 0 }}>AK</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{featured.author}</div>
                  <div className="muted" style={{ fontSize: 11 }}>{featured.role}</div>
                </div>
              </div>
              <div className="row gap-4 muted" style={{ fontSize: 12, alignItems: 'center' }}>
                <span>12 min read</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Download size={12} /> PDF available</span>
                <button className="btn btn-primary btn-sm">Read Report</button>
              </div>
            </div>
          </div>

          {/* Article list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {rest.map((r, i) => (
              <div
                key={i}
                className="card card-padded"
                style={{ cursor: 'pointer', transition: 'border-color .15s' }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--gold-600)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = '')}
              >
                <div className="row between" style={{ marginBottom: 8 }}>
                  <span className="eyebrow">{r.tag}</span>
                  <span className="muted" style={{ fontSize: 12 }}>{r.time}</span>
                </div>
                <h3 className="h3" style={{ margin: '0 0 8px', fontFamily: 'var(--font-display)' }}>{r.title}</h3>
                <p className="muted" style={{ fontSize: 14, margin: 0, lineHeight: 1.5, maxWidth: 620 }}>{r.sub}</p>
                <div style={{ marginTop: 12 }}>
                  <span style={{ color: 'var(--gold-300)', fontSize: 13, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    Read Report <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right widgets */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }} className="hide-mobile">
          {/* News pulse */}
          <div className="card card-padded" style={{ padding: 16 }}>
            <div style={{ fontWeight: 600, color: 'var(--text-0)', fontSize: 14, marginBottom: 16 }}>News Pulse</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {NEWSFEED.map((n, i) => (
                <div key={i} style={{ paddingBottom: 12, borderBottom: i === NEWSFEED.length - 1 ? 'none' : '1px solid var(--line)' }}>
                  <div style={{ fontSize: 11, color: 'var(--gold-300)', letterSpacing: '0.08em', marginBottom: 4 }}>{n.time}</div>
                  <div style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--text-1)' }}>{n.text}</div>
                </div>
              ))}
              <span style={{ color: 'var(--gold-300)', fontSize: 12, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
                View All News <ArrowRight size={12} />
              </span>
            </div>
          </div>

          {/* Analyst sentiment donut */}
          <div className="card card-padded" style={{ padding: 16 }}>
            <div style={{ fontWeight: 600, color: 'var(--text-0)', fontSize: 14, marginBottom: 12 }}>Analyst Sentiment</div>
            <div style={{ display: 'flex', justifyContent: 'center', padding: 8 }}>
              <DonutSentiment value={75} />
            </div>
            <p className="muted" style={{ fontSize: 12, textAlign: 'center', margin: '8px 0 0', lineHeight: 1.5 }}>
              Aggregate view of 12 senior analysts for the Nigerian Exchange Group.
            </p>
          </div>

          {/* Analyst card */}
          <div className="card card-padded" style={{ background: 'linear-gradient(135deg, rgba(221,176,96,0.08), var(--bg-2))', borderColor: 'var(--gold-700)' }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--bg-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16, color: 'var(--gold-300)', marginBottom: 12 }}>AK</div>
            <h4 className="h4" style={{ margin: '0 0 4px' }}>Dr. Aminu Kewa</h4>
            <div className="muted" style={{ fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>Chief Economist</div>
            <p style={{ fontSize: 13, fontStyle: 'italic', color: 'var(--text-1)', margin: '0 0 16px', lineHeight: 1.5 }}>
              "The 2026 fiscal adjustments present a unique risk-reward symmetry for equity investors."
            </p>
            <button className="btn btn-outline-gold btn-sm btn-block">Follow Insights</button>
          </div>
        </div>
      </div>
    </div>
  )
}
