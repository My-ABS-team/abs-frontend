import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { usePortfolioChart } from '../hooks/useDashboard'
import { formatNairaCompact, formatDate } from '@/lib/utils'

const RANGES = ['1M', '6M', '1Y', 'ALL'] as const

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="card card-padded" style={{ padding: '8px 12px', fontSize: 12 }}>
      <div style={{ color: 'var(--text-3)' }}>{label}</div>
      <div className="mono" style={{ fontWeight: 700, color: 'var(--gold-300)' }}>
        {formatNairaCompact(payload[0].value)}
      </div>
    </div>
  )
}

export function PortfolioChart() {
  const { range, setRange, data, isLoading } = usePortfolioChart()

  return (
    <div className="card card-padded" style={{ padding: 20 }}>
      <div className="row between" style={{ marginBottom: 16 }}>
        <div>
          <div style={{ fontWeight: 600, color: 'var(--text-0)', fontSize: 15 }}>Portfolio Growth</div>
          <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>Compounded valuation across all holdings</div>
        </div>
        <div className="tabs">
          {RANGES.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`tab${range === r ? ' active' : ''}`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div style={{ height: 280 }}>
        {isLoading ? (
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 6, padding: '0 8px' }}>
            {[60, 80, 50, 90, 70].map((h, i) => (
              <div key={i} className="skeleton" style={{ height: h / 5, borderRadius: 4 }} />
            ))}
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data ?? []} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="var(--gold-300)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--gold-300)" stopOpacity={0}   />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                tickFormatter={(v) => formatDate(v).split(' ').slice(0, 2).join(' ')}
                tick={{ fill: 'var(--text-3)', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                interval="preserveStartEnd"
              />
              <YAxis
                tickFormatter={(v) => formatNairaCompact(v)}
                tick={{ fill: 'var(--text-3)', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={60}
              />
              <Tooltip content={<ChartTooltip />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="var(--gold-300)"
                strokeWidth={2}
                fill="url(#goldGradient)"
                dot={false}
                activeDot={{ r: 4, fill: 'var(--gold-300)', stroke: 'var(--bg-1)', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}
