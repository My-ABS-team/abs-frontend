import { useState, useMemo } from 'react'
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'

export function CalculatorsPage() {
  const [tool,       setTool]       = useState('Growth Simulator')
  const [principal,  setPrincipal]  = useState(50_000_000)
  const [assetClass, setAssetClass] = useState('Equities')
  const [yieldPct,   setYieldPct]   = useState(14.2)
  const [horizon,    setHorizon]    = useState(10)

  const compoundData = useMemo(() => {
    return Array.from({ length: horizon + 1 }, (_, i) => ({
      year: `Yr ${i}`,
      value: (principal * Math.pow(1 + yieldPct / 100, i)) / 1e6,
    }))
  }, [principal, yieldPct, horizon])

  const finalValue = compoundData[compoundData.length - 1].value * 1e6
  const profit     = finalValue - principal
  const roi        = (profit / principal) * 100

  const fmtN = (n: number) => '₦' + n.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  const costRows = [
    ['Brokerage Fee',           '1.35% + Fixed Commission',     principal * 0.0135,         'Capital Assets Ltd'],
    ['Value Added Tax (VAT)',    '7.5% on Brokerage',            principal * 0.0135 * 0.075, 'FIRS'],
    ['CSCS Trade Fee',           '0.30% of Gross Value',         principal * 0.003,          'CSCS PLC'],
    ['Stamp Duty',               '0.075% of Consideration',      principal * 0.00075,        'SEC / NSE'],
  ] as const

  const totalCost = principal * (0.0135 + 0.0135 * 0.075 + 0.003 + 0.00075)

  return (
    <div>
      <div className="page-title-row">
        <div>
          <div className="eyebrow" style={{ marginBottom: 6 }}>Capital Advisory Tools</div>
          <h1 className="h2" style={{ margin: 0 }}>Portfolio Projection</h1>
          <p className="muted" style={{ marginTop: 4, fontSize: 13 }}>
            Simulate potential returns and analyze transaction costs across NGX and NASD markets with institutional precision.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1fr) minmax(0, 2fr)', gap: 16, marginBottom: 24 }} className="calc-grid">
        {/* Input panel */}
        <div className="card" style={{ overflow: 'hidden' }}>
          <div style={{ padding: 24 }}>
            <div className="field" style={{ marginBottom: 18 }}>
              <label className="field-label">Select Calculation Tool</label>
              <select className="select" value={tool} onChange={(e) => setTool(e.target.value)}>
                <option>Growth Simulator</option>
                <option>Transaction Cost</option>
                <option>Tax Estimator</option>
                <option>Retirement Planner</option>
              </select>
            </div>

            <div className="field" style={{ marginBottom: 18 }}>
              <label className="field-label">Principal Investment Amount</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--gold-300)', fontWeight: 700 }}>₦</span>
                <input
                  className="input mono"
                  style={{ paddingLeft: 28 }}
                  value={principal.toLocaleString()}
                  onChange={(e) => setPrincipal(parseInt(e.target.value.replace(/[^0-9]/g, '') || '0'))}
                />
              </div>
            </div>

            <div className="field" style={{ marginBottom: 18 }}>
              <label className="field-label">Investment Asset Class</label>
              <div className="row gap-2">
                {['Equities', 'Bonds', 'REITs'].map((c) => (
                  <button
                    key={c}
                    onClick={() => setAssetClass(c)}
                    className={`btn grow ${assetClass === c ? 'btn-outline-gold' : 'btn-ghost'}`}
                    style={{ fontSize: 13, padding: '10px 0' }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="field" style={{ marginBottom: 18 }}>
              <div className="row between">
                <label className="field-label">Target Annual Yield (%)</label>
                <span className="mono gold" style={{ fontWeight: 700, fontSize: 14 }}>{yieldPct.toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min="2" max="30" step="0.1"
                value={yieldPct}
                onChange={(e) => setYieldPct(parseFloat(e.target.value))}
                style={{ accentColor: 'var(--gold-400)', width: '100%', marginTop: 8 }}
              />
            </div>

            <div className="field" style={{ marginBottom: 24 }}>
              <label className="field-label">Investment Horizon (Years)</label>
              <input
                type="number"
                className="input mono"
                value={horizon}
                onChange={(e) => setHorizon(Math.max(1, parseInt(e.target.value) || 1))}
              />
            </div>

            <button className="btn btn-primary btn-block btn-lg">Calculate Projection</button>
          </div>
        </div>

        {/* Results */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Growth chart */}
          <div className="card card-padded" style={{ padding: 20 }}>
            <div className="row between" style={{ marginBottom: 16 }}>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text-0)', fontSize: 15 }}>Projected Portfolio Growth</div>
                <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>{horizon}-year compounding simulation</div>
              </div>
              <span className="chip chip-gold">
                <span className="chip-dot" style={{ background: 'var(--gold-300)' }} />
                Market Trend
              </span>
            </div>

            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={compoundData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="calcGold" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="var(--gold-300)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--gold-300)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="year" tick={{ fill: 'var(--text-3)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'var(--text-3)', fontSize: 10 }} axisLine={false} tickLine={false} width={55} tickFormatter={(v) => `₦${v.toFixed(0)}M`} />
                <Tooltip
                  contentStyle={{ background: 'var(--bg-3)', border: '1px solid var(--line)', borderRadius: 8, fontSize: 12 }}
                  formatter={(v: any) => [`₦${Number(v).toFixed(2)}M`, 'Value']}
                  labelStyle={{ color: 'var(--text-3)' }}
                />
                <Area type="monotone" dataKey="value" stroke="var(--gold-300)" strokeWidth={2} fill="url(#calcGold)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>

            <div className="row between" style={{ marginTop: 12, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-3)' }}>
              <span>Year 0</span>
              <span>Year {Math.floor(horizon / 4)}</span>
              <span>Year {Math.floor(horizon / 2)}</span>
              <span>Year {Math.floor((3 * horizon) / 4)}</span>
              <span>Year {horizon}</span>
            </div>
          </div>

          {/* KPI results */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
            <div className="kpi">
              <div className="kpi-label">Estimated Final Value</div>
              <div className="kpi-value">₦{(finalValue / 1e6).toFixed(1)}M</div>
              <div style={{ fontSize: 12, color: 'var(--green-300)', marginTop: 2 }}>+{roi.toFixed(1)}% Net ROI</div>
            </div>
            <div className="kpi">
              <div className="kpi-label">Total Net Profit</div>
              <div className="kpi-value gold">₦{(profit / 1e6).toFixed(1)}M</div>
              <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>After estimated fees</div>
            </div>
            <div className="kpi">
              <div className="kpi-label">Effective Annual Growth</div>
              <div className="kpi-value green">{yieldPct.toFixed(1)}%</div>
              <div style={{ marginTop: 12, height: 4, background: 'var(--bg-4)', borderRadius: 99, overflow: 'hidden' }}>
                <div style={{ width: `${(yieldPct / 30) * 100}%`, height: '100%', background: 'var(--green-300)', borderRadius: 99 }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cost analysis table */}
      <div className="card" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--line)' }}>
          <div style={{ fontWeight: 600, color: 'var(--text-0)', fontSize: 15 }}>Institutional Transaction Cost Analysis</div>
          <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>Calculated based on standard SEC, NGX, and CSCS rates</div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="table">
            <thead>
              <tr>
                <th style={{ paddingLeft: 24 }}>Fee Component</th>
                <th>Rate Basis</th>
                <th style={{ textAlign: 'right' }}>Estimated Amount</th>
                <th style={{ paddingRight: 24, textAlign: 'right' }}>Regulatory Authority</th>
              </tr>
            </thead>
            <tbody>
              {costRows.map(([name, basis, amt, auth]) => (
                <tr key={name} className="row-hover">
                  <td style={{ paddingLeft: 24, fontWeight: 600, color: 'var(--text-0)' }}>{name}</td>
                  <td className="muted" style={{ fontSize: 13 }}>{basis}</td>
                  <td className="mono" style={{ textAlign: 'right', fontWeight: 600, color: 'var(--text-0)' }}>{fmtN(amt)}</td>
                  <td className="muted" style={{ paddingRight: 24, textAlign: 'right', fontSize: 13 }}>{auth}</td>
                </tr>
              ))}
              <tr style={{ background: 'rgba(221,176,96,0.05)' }}>
                <td style={{ paddingLeft: 24, fontWeight: 700, color: 'var(--gold-300)' }}>Total Estimated Transaction Cost</td>
                <td className="muted" style={{ fontSize: 13 }}>Applicable on Buy / Sell</td>
                <td className="mono" style={{ textAlign: 'right', fontWeight: 800, color: 'var(--gold-300)', fontSize: 16 }}>{fmtN(totalCost)}</td>
                <td className="gold" style={{ paddingRight: 24, textAlign: 'right', fontWeight: 600, fontSize: 13 }}>Net Position Impact</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
