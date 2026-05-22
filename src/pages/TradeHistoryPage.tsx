import { useState } from 'react'
import { Download, Search } from 'lucide-react'

const TRADES = [
  { date: 'May 20, 2026', ticker: 'MTNN',       side: 'BUY',  type: 'Limit',  qty: 1000,  price: 235.50, total:  238_185.75, status: 'Filled',   time: '14:23:05' },
  { date: 'May 19, 2026', ticker: 'ZENITHBANK',  side: 'SELL', type: 'Limit',  qty: 5000,  price: 36.10,  total:  179_117.25, status: 'Filled',   time: '11:08:42' },
  { date: 'May 15, 2026', ticker: 'GTCO',        side: 'BUY',  type: 'Market', qty: 2000,  price: 41.20,  total:   83_246.00, status: 'Filled',   time: '09:31:18' },
  { date: 'May 12, 2026', ticker: 'AIRTELAFRI',  side: 'BUY',  type: 'Limit',  qty: 200,   price: 1250.00,total:  253_375.00, status: 'Cancelled',time: '15:44:51' },
  { date: 'May 08, 2026', ticker: 'DANGCEM',     side: 'SELL', type: 'Limit',  qty: 500,   price: 448.00, total:  220_626.50, status: 'Filled',   time: '10:22:33' },
  { date: 'May 05, 2026', ticker: 'SEPLAT',      side: 'BUY',  type: 'Market', qty: 100,   price: 2100.00,total:  213_858.00, status: 'Filled',   time: '13:55:09' },
  { date: 'Apr 30, 2026', ticker: 'BUACEMENT',   side: 'BUY',  type: 'Limit',  qty: 1500,  price: 114.80, total:  174_711.00, status: 'Filled',   time: '09:04:27' },
  { date: 'Apr 28, 2026', ticker: 'ACCESSCORP',  side: 'SELL', type: 'Limit',  qty: 10000, price: 22.50,  total:  221_737.50, status: 'Filled',   time: '12:17:40' },
]

const STATUS_CHIP: Record<string, string> = {
  Filled:    'chip-green',
  Cancelled: 'chip-red',
  Rejected:  'chip-red',
  Partial:   'chip-gold',
}

function fmtN(n: number) {
  return '₦' + n.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export function TradeHistoryPage() {
  const [search, setSearch] = useState('')

  const filtered = TRADES.filter((t) =>
    t.ticker.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="page-title-row">
        <div>
          <div className="eyebrow" style={{ marginBottom: 6 }}>Execution Log</div>
          <h1 className="h2" style={{ margin: 0 }}>Trade History</h1>
          <p className="muted" style={{ marginTop: 4, fontSize: 13 }}>
            Complete record of all executed, cancelled, and rejected orders across NGX and NASD markets.
          </p>
        </div>
        <button className="btn btn-secondary btn-sm hide-mobile">
          <Download size={14} /> Export CSV
        </button>
      </div>

      {/* Summary KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div className="kpi">
          <div className="kpi-label">Total Trades (30D)</div>
          <div className="kpi-value">24</div>
          <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>16 buys · 8 sells</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Total Consideration</div>
          <div className="kpi-value gold">₦8.4M</div>
          <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>Across all executed trades</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Avg Trade Size</div>
          <div className="kpi-value">₦350K</div>
          <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>Per executed order</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Fill Rate</div>
          <div className="kpi-value green">87.5%</div>
          <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>21 of 24 fully filled</div>
        </div>
      </div>

      {/* Filter bar */}
      <div className="card card-padded" style={{ marginBottom: 16 }}>
        <div className="row gap-3 wrap">
          <div className="input-with-icon" style={{ flex: '1 1 280px' }}>
            <Search size={16} className="icon" />
            <input
              className="input"
              placeholder="Search by ticker…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select className="select" style={{ width: 160 }}>
            <option>All Sides</option>
            <option>Buy</option>
            <option>Sell</option>
          </select>
          <select className="select" style={{ width: 160 }}>
            <option>All Statuses</option>
            <option>Filled</option>
            <option>Cancelled</option>
          </select>
        </div>
      </div>

      {/* Trades table */}
      <div className="card" style={{ overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="table">
            <thead>
              <tr>
                <th style={{ paddingLeft: 24 }}>Date</th>
                <th>Ticker</th>
                <th>Side</th>
                <th>Type</th>
                <th style={{ textAlign: 'right' }}>Qty</th>
                <th style={{ textAlign: 'right' }}>Price (₦)</th>
                <th style={{ textAlign: 'right' }}>Total Value</th>
                <th>Status</th>
                <th style={{ paddingRight: 24 }}>Time</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t, i) => (
                <tr key={i} className="row-hover">
                  <td style={{ paddingLeft: 24, fontSize: 13, color: 'var(--text-2)', whiteSpace: 'nowrap' }}>{t.date}</td>
                  <td style={{ fontWeight: 700, color: 'var(--text-0)' }}>{t.ticker}</td>
                  <td style={{ fontWeight: 700, color: t.side === 'BUY' ? 'var(--green-300)' : 'var(--red-100)' }}>{t.side}</td>
                  <td style={{ color: 'var(--text-2)', fontSize: 13 }}>{t.type}</td>
                  <td className="mono" style={{ textAlign: 'right' }}>{t.qty.toLocaleString()}</td>
                  <td className="mono" style={{ textAlign: 'right' }}>{t.price.toFixed(2)}</td>
                  <td className="mono" style={{ textAlign: 'right', fontWeight: 600, color: 'var(--text-0)' }}>{fmtN(t.total)}</td>
                  <td><span className={`chip ${STATUS_CHIP[t.status] ?? 'chip-blue'}`}>{t.status}</span></td>
                  <td className="mono muted" style={{ paddingRight: 24, fontSize: 12 }}>{t.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="row between" style={{ padding: '16px 24px', borderTop: '1px solid var(--line)' }}>
          <span className="muted" style={{ fontSize: 12 }}>Showing {filtered.length} of {TRADES.length} trades</span>
          <div className="row gap-2">
            <button className="btn btn-ghost btn-sm">Previous</button>
            <button className="btn btn-secondary btn-sm">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}
