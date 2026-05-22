import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Maximize2, Settings, X, Download } from 'lucide-react'
import { useUIStore } from '@/stores/uiStore'

const TICKERS = [
  { ticker: 'MTNN',      price: 235.50, change: 1.45,  up: true  },
  { ticker: 'ZENITHBANK',price: 36.20,  change: -0.82, up: false },
  { ticker: 'GTCO',      price: 41.30,  change: 2.11,  up: true  },
  { ticker: 'AIRTELAFRI',price: 1250.00,change: 0.64,  up: true  },
  { ticker: 'DANGCEM',   price: 450.00, change: -1.30, up: false },
  { ticker: 'SEPLAT',    price: 2100.00,change: 3.20,  up: true  },
  { ticker: 'BUACEMENT', price: 115.40, change: -0.52, up: false },
  { ticker: 'ACCESSCORP',price: 22.80,  change: 1.80,  up: true  },
]

const CHART_DATA = Array.from({ length: 50 }, (_, i) => ({
  t: `${String(9 + Math.floor(i / 6)).padStart(2, '0')}:${String((i % 6) * 10).padStart(2, '0')}`,
  v: 220 + Math.sin(i * 0.3) * 12 + i * 0.3 + (Math.random() - 0.48) * 6,
}))

const ORDERS = [
  { tick: 'MTNN',       type: 'Limit',  side: 'BUY',  price: 235.45, qty: 1000, filled: 450,  status: 'Partial', time: '14:23:05' },
  { tick: 'ZENITHBANK', type: 'Limit',  side: 'SELL', price: 36.10,  qty: 5000, filled: 0,    status: 'Open',    time: '13:45:12' },
  { tick: 'GTCO',       type: 'Market', side: 'BUY',  price: 41.20,  qty: 2000, filled: 2000, status: 'Filled',  time: '12:18:55' },
]

function OrderBook() {
  const bids = [[235.45, 124500], [235.40, 85200], [235.35, 312000], [235.30, 1200000]]
  const asks = [[235.55, 45000],  [235.60, 12500],  [235.65, 210000], [235.70, 550000]]
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
      <div>
        <div className="row between" style={{ marginBottom: 8 }}>
          <strong style={{ color: 'var(--green-300)', fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Bids · Buy</strong>
          <span className="mono" style={{ fontSize: 11, color: 'var(--text-3)' }}>Total: 4.5M units</span>
        </div>
        <table style={{ width: '100%', fontSize: 12, fontFamily: 'var(--font-mono)' }}>
          <thead><tr style={{ color: 'var(--text-3)' }}>
            <th style={{ textAlign: 'left', padding: '4px 0', fontWeight: 600 }}>PRICE (₦)</th>
            <th style={{ textAlign: 'right', fontWeight: 600 }}>QTY</th>
            <th style={{ textAlign: 'right', fontWeight: 600 }}>TOTAL</th>
          </tr></thead>
          <tbody>
            {bids.map(([price, qty], i) => {
              const total = bids.slice(0, i + 1).reduce((s, r) => s + r[1], 0)
              return (
                <tr key={i}>
                  <td style={{ color: 'var(--green-300)', padding: '7px 0', fontWeight: 600, position: 'relative' }}>
                    <div style={{ position: 'absolute', left: 0, top: 4, bottom: 4, width: `${(qty / 1200000) * 100}%`, background: 'rgba(112,219,157,0.08)' }} />
                    <span style={{ position: 'relative' }}>{price.toFixed(2)}</span>
                  </td>
                  <td style={{ textAlign: 'right', color: 'var(--text-2)' }}>{qty.toLocaleString()}</td>
                  <td style={{ textAlign: 'right', color: 'var(--text-3)' }}>{total.toLocaleString()}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div>
        <div className="row between" style={{ marginBottom: 8 }}>
          <strong style={{ color: 'var(--red-100)', fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Asks · Sell</strong>
          <span className="mono" style={{ fontSize: 11, color: 'var(--text-3)' }}>Spread: ₦0.10</span>
        </div>
        <table style={{ width: '100%', fontSize: 12, fontFamily: 'var(--font-mono)' }}>
          <thead><tr style={{ color: 'var(--text-3)' }}>
            <th style={{ textAlign: 'left', padding: '4px 0', fontWeight: 600 }}>PRICE (₦)</th>
            <th style={{ textAlign: 'right', fontWeight: 600 }}>QTY</th>
            <th style={{ textAlign: 'right', fontWeight: 600 }}>TOTAL</th>
          </tr></thead>
          <tbody>
            {asks.map(([price, qty], i) => {
              const total = asks.slice(0, i + 1).reduce((s, r) => s + r[1], 0)
              return (
                <tr key={i}>
                  <td style={{ color: 'var(--red-100)', padding: '7px 0', fontWeight: 600, position: 'relative' }}>
                    <div style={{ position: 'absolute', left: 0, top: 4, bottom: 4, width: `${(qty / 550000) * 100}%`, background: 'rgba(255,180,171,0.08)' }} />
                    <span style={{ position: 'relative' }}>{price.toFixed(2)}</span>
                  </td>
                  <td style={{ textAlign: 'right', color: 'var(--text-2)' }}>{qty.toLocaleString()}</td>
                  <td style={{ textAlign: 'right', color: 'var(--text-3)' }}>{total.toLocaleString()}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function CompanyProfile() {
  const stats = [
    ['Sector', 'Telecommunications'], ['Market Cap', '₦4.9T'],
    ['P/E Ratio', '12.4'], ['EPS (TTM)', '₦19.80'],
    ['Dividend Yield', '8.2%'], ['Beta', '0.78'],
    ['52W High / Low', '268.80 / 198.20'], ['Avg Volume (30D)', '11.2M'],
  ]
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20 }}>
      {stats.map(([k, v]) => (
        <div key={k}>
          <div style={{ fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{k}</div>
          <div className="mono" style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-0)' }}>{v}</div>
        </div>
      ))}
    </div>
  )
}

export function MarketTerminalPage() {
  const { ticker: urlTicker } = useParams()
  const activeTicker = useUIStore((s) => s.activeTicker)
  const symbol = urlTicker ?? activeTicker ?? 'MTNN'

  const [timeframe, setTimeframe] = useState('1D')
  const [side, setSide]           = useState<'BUY' | 'SELL'>('BUY')
  const [bottomTab, setBottomTab] = useState<'orderbook' | 'profile' | 'financials'>('orderbook')
  const [quantity, setQuantity]   = useState(1000)
  const [price, setPrice]         = useState(235.45)
  const [orderType, setOrderType] = useState('Limit Order')
  const [authorized, setAuthorized] = useState(true)

  const consideration = quantity * price
  const brokerage     = consideration * 0.0135
  const vat           = brokerage * 0.075 + consideration * 0.0018
  const total         = side === 'BUY' ? consideration + brokerage + vat : consideration - brokerage - vat

  const fmtN = (n: number) => '₦' + Math.abs(n).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  return (
    <div>
      {/* Symbol header */}
      <div className="row between wrap" style={{ marginBottom: 16, gap: 16 }}>
        <div>
          <div className="row gap-3 wrap" style={{ alignItems: 'center' }}>
            <h2 className="h2" style={{ margin: 0 }}>
              {symbol} <span style={{ color: 'var(--text-3)', fontWeight: 600 }}>·</span> MTN Nigeria PLC
            </h2>
            <span className="chip chip-green">
              <span className="chip-dot pulse" style={{ background: 'var(--green-300)' }} />
              Open
            </span>
          </div>
          <div className="row gap-4 mono" style={{ marginTop: 12, fontSize: 14, color: 'var(--text-2)', flexWrap: 'wrap' }}>
            <span style={{ color: 'var(--green-300)', fontWeight: 700, fontSize: 22 }}>₦235.50</span>
            <span style={{ color: 'var(--green-300)' }}>↑ 1.45%</span>
            <span>Vol: 12.4M</span>
            <span className="hide-mobile">52W: 198.20 — 268.80</span>
          </div>
        </div>
      </div>

      {/* Mini ticker bar */}
      <div className="card" style={{ padding: '10px 16px', marginBottom: 16, overflow: 'hidden' }}>
        <div className="row gap-6 mono" style={{ overflowX: 'auto', fontSize: 12, color: 'var(--text-2)', whiteSpace: 'nowrap' }}>
          {TICKERS.map((t) => (
            <span key={t.ticker} style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
              <strong style={{ color: 'var(--text-1)' }}>{t.ticker}</strong>
              <span>₦{t.price.toLocaleString('en-NG', { minimumFractionDigits: 2 })}</span>
              <span style={{ color: t.up ? 'var(--green-300)' : 'var(--red-100)' }}>
                {t.up ? '+' : ''}{t.change}%
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Main grid: chart + order ticket */}
      <div
        style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2.2fr) minmax(0, 1fr)', gap: 16, marginBottom: 16 }}
        className="terminal-main-grid"
      >
        {/* Chart panel */}
        <div className="card" style={{ overflow: 'hidden' }}>
          <div className="row between" style={{ padding: '16px 20px', borderBottom: '1px solid var(--line)' }}>
            <div className="tabs">
              {['1D', '1W', '1M', '1Y'].map((tf) => (
                <button key={tf} onClick={() => setTimeframe(tf)} className={`tab${timeframe === tf ? ' active' : ''}`}>{tf}</button>
              ))}
            </div>
            <div className="row gap-2">
              <button className="btn-icon" style={{ width: 32, height: 32 }} aria-label="Fullscreen"><Maximize2 size={14} /></button>
              <button className="btn-icon" style={{ width: 32, height: 32 }} aria-label="Settings"><Settings size={14} /></button>
            </div>
          </div>

          <div style={{ padding: 16 }}>
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={CHART_DATA} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="termGold" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="var(--green-300)" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="var(--green-300)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="t" tick={{ fill: 'var(--text-3)', fontSize: 10 }} axisLine={false} tickLine={false} interval={9} />
                <YAxis domain={['auto', 'auto']} tick={{ fill: 'var(--text-3)', fontSize: 10 }} axisLine={false} tickLine={false} width={50} tickFormatter={(v) => `₦${v.toFixed(0)}`} />
                <Tooltip
                  contentStyle={{ background: 'var(--bg-3)', border: '1px solid var(--line)', borderRadius: 8, fontSize: 12 }}
                  labelStyle={{ color: 'var(--text-3)' }}
                  itemStyle={{ color: 'var(--green-300)' }}
                  formatter={(v: any) => [`₦${Number(v).toFixed(2)}`, 'Price']}
                />
                <Area type="monotone" dataKey="v" stroke="var(--green-300)" strokeWidth={1.5} fill="url(#termGold)" dot={false} activeDot={{ r: 3, fill: 'var(--green-300)' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Bottom tabs */}
          <div style={{ borderTop: '1px solid var(--line)' }}>
            <div className="row gap-4" style={{ padding: '0 20px', borderBottom: '1px solid var(--line)' }}>
              {([['orderbook', 'Order Book'], ['profile', 'Company Profile'], ['financials', 'Financials']] as const).map(([k, l]) => (
                <button
                  key={k}
                  onClick={() => setBottomTab(k)}
                  style={{
                    padding: '12px 4px',
                    fontSize: 13,
                    fontWeight: 600,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: bottomTab === k ? 'var(--gold-300)' : 'var(--text-2)',
                    borderBottom: bottomTab === k ? '2px solid var(--gold-300)' : '2px solid transparent',
                    marginBottom: -1,
                  }}
                >
                  {l}
                </button>
              ))}
            </div>
            <div style={{ padding: 20 }}>
              {bottomTab === 'orderbook'  && <OrderBook />}
              {bottomTab === 'profile'    && <CompanyProfile />}
              {bottomTab === 'financials' && (
                <p className="muted" style={{ fontSize: 13 }}>Financial statements coming soon.</p>
              )}
            </div>
          </div>
        </div>

        {/* Order ticket */}
        <div className="card" style={{ overflow: 'hidden' }}>
          {/* BUY / SELL tabs */}
          <div style={{ padding: '12px 12px 0' }}>
            <div className="tabs" style={{ width: '100%' }}>
              {(['BUY', 'SELL'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSide(s)}
                  className={`tab grow${side === s ? ' active' : ''}`}
                  style={{
                    fontSize: 14,
                    padding: '10px 0',
                    textAlign: 'center',
                    color: side === s ? (s === 'BUY' ? 'var(--green-300)' : 'var(--red-100)') : undefined,
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div style={{ padding: '16px 20px 20px' }}>
            <div className="field" style={{ marginBottom: 14 }}>
              <label className="field-label">Order Type</label>
              <select className="select" value={orderType} onChange={(e) => setOrderType(e.target.value)}>
                <option>Limit Order</option>
                <option>Market Order</option>
                <option>Stop-Loss</option>
              </select>
            </div>

            <div className="field" style={{ marginBottom: 14 }}>
              <label className="field-label">Quantity</label>
              <div style={{ position: 'relative' }}>
                <input
                  className="input mono"
                  value={quantity.toLocaleString()}
                  onChange={(e) => setQuantity(parseInt(e.target.value.replace(/[^0-9]/g, '') || '0'))}
                />
                <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 11, color: 'var(--text-3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Units</span>
              </div>
            </div>

            <div className="field" style={{ marginBottom: 16 }}>
              <label className="field-label">Price (₦)</label>
              <div style={{ position: 'relative' }}>
                <input
                  className="input mono"
                  value={price}
                  onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                />
                <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 11, color: 'var(--text-3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>NGN</span>
              </div>
            </div>

            {/* Transaction estimate */}
            <div className="card" style={{ padding: 14, background: 'var(--bg-1)', marginBottom: 16 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 8 }}>
                Transaction estimate
              </div>
              {[
                ['Consideration',               fmtN(consideration)],
                ['Brokerage Fee (1.35%)',        fmtN(brokerage)],
                ['VAT / CSCS / Stamp Duty',      fmtN(vat)],
              ].map(([label, val]) => (
                <div key={label} className="row between" style={{ marginBottom: 6, fontSize: 12 }}>
                  <span style={{ color: 'var(--text-3)' }}>{label}</span>
                  <span className="mono" style={{ color: 'var(--text-2)' }}>{val}</span>
                </div>
              ))}
              <div className="row between" style={{ paddingTop: 10, borderTop: '1px solid var(--line)', marginTop: 4 }}>
                <strong style={{ fontSize: 13, color: 'var(--gold-300)' }}>Total Value</strong>
                <span className="mono" style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-0)' }}>{fmtN(total)}</span>
              </div>
            </div>

            <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 12, color: 'var(--text-2)', marginBottom: 16, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={authorized}
                onChange={(e) => setAuthorized(e.target.checked)}
                style={{ marginTop: 2, accentColor: 'var(--gold-400)', flexShrink: 0 }}
              />
              I authorize Capital Assets Ltd to execute this trade on my behalf via NGX.
            </label>

            <button
              className="btn btn-primary btn-block btn-lg"
              disabled={!authorized}
              style={{
                background: side === 'SELL'
                  ? 'linear-gradient(180deg, var(--red-100), var(--red-600))'
                  : undefined,
                opacity: !authorized ? 0.5 : 1,
              }}
            >
              Place {side === 'BUY' ? 'Buy' : 'Sell'} Order
            </button>
          </div>
        </div>
      </div>

      {/* Active Orders */}
      <div className="card" style={{ overflow: 'hidden' }}>
        <div className="row between" style={{ padding: '16px 20px', borderBottom: '1px solid var(--line)' }}>
          <div>
            <div style={{ fontWeight: 600, color: 'var(--text-0)', fontSize: 15 }}>Active Orders</div>
          </div>
          <div className="row gap-2">
            <div className="tabs">
              <button className="tab active">NGX</button>
              <button className="tab">NASD</button>
            </div>
            <button className="btn btn-ghost btn-sm">Cancel All</button>
            <button className="btn btn-ghost btn-sm hide-mobile">
              <Download size={14} /> Export
            </button>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="table">
            <thead>
              <tr>
                <th style={{ paddingLeft: 24 }}>Ticker</th>
                <th>Type</th>
                <th>Side</th>
                <th>Price (₦)</th>
                <th>Quantity</th>
                <th>Filled</th>
                <th>Status</th>
                <th>Time</th>
                <th style={{ paddingRight: 24 }}></th>
              </tr>
            </thead>
            <tbody>
              {ORDERS.map((o, i) => (
                <tr key={i} className="row-hover">
                  <td style={{ paddingLeft: 24, fontWeight: 700, color: 'var(--text-0)' }}>{o.tick}</td>
                  <td style={{ color: 'var(--text-2)' }}>{o.type}</td>
                  <td style={{ color: o.side === 'BUY' ? 'var(--green-300)' : 'var(--red-100)', fontWeight: 700 }}>{o.side}</td>
                  <td className="mono">{o.price.toFixed(2)}</td>
                  <td className="mono">{o.qty.toLocaleString()}</td>
                  <td style={{ minWidth: 120 }}>
                    <div className="mono" style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 4 }}>{o.filled}/{o.qty}</div>
                    <div style={{ height: 4, background: 'var(--line)', borderRadius: 99, overflow: 'hidden', width: 100 }}>
                      <div style={{
                        width: `${(o.filled / o.qty) * 100}%`,
                        height: '100%',
                        background: o.filled === o.qty ? 'var(--green-300)' : 'var(--gold-300)',
                        borderRadius: 99,
                      }} />
                    </div>
                  </td>
                  <td>
                    <span className={`chip ${o.status === 'Filled' ? 'chip-green' : o.status === 'Partial' ? 'chip-gold' : 'chip-blue'}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="mono muted">{o.time}</td>
                  <td style={{ paddingRight: 24, textAlign: 'right' }}>
                    {o.status !== 'Filled' && (
                      <button className="btn-icon" style={{ width: 28, height: 28, color: 'var(--red-100)' }}>
                        <X size={14} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
