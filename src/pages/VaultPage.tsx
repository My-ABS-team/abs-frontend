import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Download, Plus, Search, Calendar, TrendingUp, TrendingDown, ArrowRightLeft, DollarSign } from 'lucide-react'
import { ROUTES } from '@/constants/routes'

const TRANSACTIONS = [
  { date: 'May 20', year: '2026', ticker: 'MTNN',       type: 'Buy Trade',  desc: 'Purchase of 1,000 units @ ₦235.50',        ref: '9801', amount: -235500,   status: 'Settled', icon: 'buy'      },
  { date: 'May 18', year: '2026', ticker: 'DIVIDEND',    type: 'Dividend',   desc: 'Interim dividend from ZENITHBANK holding',  ref: '9802', amount: 48200,    status: 'Settled', icon: 'dividend' },
  { date: 'May 15', year: '2026', ticker: 'WALLET',      type: 'Inflow',     desc: 'Bank transfer from Zenith Bank NG',          ref: '9803', amount: 500000,   status: 'Settled', icon: 'inflow'   },
  { date: 'May 12', year: '2026', ticker: 'AIRTELAFRI',  type: 'Sell Trade', desc: 'Sale of 200 units @ ₦1,250.00',             ref: '9804', amount: 250000,   status: 'Settled', icon: 'sell'     },
  { date: 'May 10', year: '2026', ticker: 'WITHDRAWAL',  type: 'Outflow',    desc: 'Withdrawal to Zenith Bank PLC •••• 4902',   ref: '9805', amount: -100000,  status: 'Settled', icon: 'outflow'  },
  { date: 'May 08', year: '2026', ticker: 'GTCO',        type: 'Buy Trade',  desc: 'Purchase of 5,000 units @ ₦41.20 (T+3)',    ref: '9806', amount: -206000,  status: 'Pending', icon: 'buy'      },
]

const TYPE_ICONS: Record<string, React.ReactNode> = {
  buy:      <TrendingUp size={16} />,
  sell:     <TrendingDown size={16} />,
  dividend: <DollarSign size={16} />,
  inflow:   <ArrowRightLeft size={16} />,
  outflow:  <ArrowRightLeft size={16} />,
}

const FILTERS = ['all', 'inflow', 'outflow', 'dividends', 'trades']

function fmtAmt(n: number) {
  const sign = n < 0 ? '−' : '+'
  return sign + '₦' + Math.abs(n).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export function VaultPage() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(0)
  const [filter, setFilter] = useState('all')

  const sel = TRANSACTIONS[selected]

  return (
    <div>
      {/* Header */}
      <div className="page-title-row">
        <div>
          <div className="eyebrow" style={{ marginBottom: 6 }}>Wealth Suite · The Vault</div>
          <h1 className="h2" style={{ margin: 0 }}>Activity Ledger</h1>
          <p className="muted" style={{ marginTop: 4, fontSize: 13 }}>
            Real-time audit of your capital flows and asset settlements across all linked accounts.
          </p>
        </div>
        <div className="row gap-2 wrap">
          <button className="btn btn-secondary btn-sm"><Download size={14} /> Export CSV</button>
          <button className="btn btn-primary btn-sm" onClick={() => navigate(ROUTES.MARKET)}>
            <Plus size={14} /> New Investment
          </button>
        </div>
      </div>

      {/* KPI summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div className="kpi">
          <div className="kpi-label">Total Inflow (30D)</div>
          <div className="kpi-value green">₦2,400,000</div>
          <div className="kpi-delta">+18% vs prev month</div>
          <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>From 8 transactions</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Total Outflow (30D)</div>
          <div className="kpi-value">₦1,100,000</div>
          <div className="kpi-delta red">−6% vs prev month</div>
          <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>From 4 transactions</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Net Position</div>
          <div className="kpi-value gold">+₦1,300,000</div>
          <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>Positive cash flow</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Pending Settlements</div>
          <div className="kpi-value">₦1,250,000</div>
          <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>1 in flight</div>
        </div>
      </div>

      {/* Filters */}
      <div className="card card-padded" style={{ marginBottom: 16 }}>
        <div className="row gap-3 wrap">
          <div className="input-with-icon" style={{ flex: '1 1 280px' }}>
            <Search size={16} className="icon" />
            <input className="input" placeholder="Ticker or transaction ID…" />
          </div>
          <select className="select" style={{ width: 180 }}>
            <option>All Asset Types</option>
            <option>Equities</option>
            <option>Bonds</option>
            <option>Mutual Funds</option>
          </select>
          <select className="select" style={{ width: 160 }}>
            <option>All Statuses</option>
            <option>Settled</option>
            <option>Pending</option>
          </select>
          <button className="btn btn-secondary btn-sm"><Calendar size={14} /> Custom Date Range</button>
        </div>
        <div className="row gap-2 wrap" style={{ marginTop: 14 }}>
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`chip${filter === f ? ' chip-gold' : ''}`}
              style={{ cursor: 'pointer', textTransform: 'capitalize' }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Ledger + Detail */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.6fr) minmax(0, 1fr)', gap: 16 }} className="vault-grid">
        {/* Transactions table */}
        <div className="card" style={{ overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--line)', fontWeight: 600, color: 'var(--text-0)' }}>
            Transactions
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="table">
              <thead>
                <tr>
                  <th style={{ paddingLeft: 24 }}>Date</th>
                  <th>Type</th>
                  <th>Description</th>
                  <th>Ref ID</th>
                  <th style={{ textAlign: 'right' }}>Amount</th>
                  <th style={{ paddingRight: 24 }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {TRANSACTIONS.map((t, i) => (
                  <tr
                    key={i}
                    className={`row-hover${selected === i ? ' row-active' : ''}`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setSelected(i)}
                  >
                    <td style={{ paddingLeft: 24, minWidth: 90 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-0)' }}>{t.date}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{t.year}</div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{
                          width: 36, height: 36, borderRadius: 8, background: 'var(--bg-3)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: t.amount > 0 ? 'var(--green-300)' : 'var(--gold-300)',
                          flexShrink: 0,
                        }}>
                          {TYPE_ICONS[t.icon]}
                        </div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-0)' }}>{t.ticker}</div>
                          <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{t.type}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ maxWidth: 200, fontSize: 13, color: 'var(--text-2)' }}>{t.desc}</td>
                    <td className="mono" style={{ fontSize: 12, color: 'var(--text-3)' }}>#{t.ref}</td>
                    <td className="mono" style={{ textAlign: 'right', fontWeight: 700, color: t.amount > 0 ? 'var(--green-300)' : 'var(--text-0)' }}>
                      {fmtAmt(t.amount)}
                    </td>
                    <td style={{ paddingRight: 24 }}>
                      <span className={`chip ${t.status === 'Settled' ? 'chip-green' : 'chip-gold'}`}>{t.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="row between" style={{ padding: '16px 24px', borderTop: '1px solid var(--line)' }}>
            <span className="muted" style={{ fontSize: 12 }}>Showing 6 of 1,247 transactions</span>
            <div className="row gap-2">
              <button className="btn btn-ghost btn-sm">Previous</button>
              <button className="btn btn-secondary btn-sm">Next</button>
            </div>
          </div>
        </div>

        {/* Detail panel */}
        <div className="card card-padded" style={{ padding: 20 }}>
          <div className="row between" style={{ marginBottom: 20 }}>
            <div style={{ fontWeight: 600, color: 'var(--text-0)', fontSize: 15 }}>Transaction Detail</div>
            <span className="mono gold" style={{ fontSize: 11 }}>#CAP-{9800 + selected}</span>
          </div>

          <div style={{ padding: 20, borderRadius: 12, background: 'var(--bg-1)', textAlign: 'center', marginBottom: 16 }}>
            <div className="label" style={{ marginBottom: 8 }}>Total Transaction Value</div>
            <div className="mono" style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-0)', fontFamily: 'var(--font-display)' }}>
              {fmtAmt(Math.abs(sel.amount))}
            </div>
          </div>

          {[
            ['Consideration (Price × Vol)', '₦235,450.00'],
            ['Brokerage Fee (1.35%)',        '₦3,178.58'],
            ['VAT on Fees',                  '₦238.39'],
            ['CSCS / Stamp Duty',            '₦185.42'],
          ].map(([label, val]) => (
            <div key={label} className="row between" style={{ padding: '10px 0', borderBottom: '1px solid var(--line)', fontSize: 13 }}>
              <span style={{ color: 'var(--text-3)' }}>{label}</span>
              <span className="mono" style={{ color: 'var(--text-2)', fontWeight: 600 }}>{val}</span>
            </div>
          ))}

          <div className="card" style={{ padding: 14, marginTop: 16, marginBottom: 16, background: 'var(--bg-1)' }}>
            <div className="row gap-3" style={{ alignItems: 'center' }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: 'linear-gradient(135deg, #2A1F0E, var(--gold-700))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 14, color: '#1A1404',
                flexShrink: 0,
              }}>
                {sel.ticker.slice(0, 2)}
              </div>
              <div>
                <div className="label">Instrument</div>
                <div style={{ fontWeight: 600, color: 'var(--text-0)' }}>{sel.ticker}</div>
              </div>
            </div>
          </div>

          <button className="btn btn-primary btn-block"><Download size={14} /> Download Receipt</button>
          <button className="btn btn-ghost btn-block btn-sm" style={{ marginTop: 8 }}>View Execution Details</button>
        </div>
      </div>
    </div>
  )
}
