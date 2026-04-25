import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { usePortfolioChart } from '../hooks/useDashboard'
import { formatNairaCompact, formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'
import type { PortfolioRange } from '@/services/api/portfolio'

const RANGES: PortfolioRange[] = ['1M', '6M', '1Y', 'ALL']

// Custom tooltip — matches the dark card aesthetic
function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="card-elevated px-3 py-2 text-xs space-y-0.5">
      <p className="text-navy-300">{label}</p>
      <p className="text-gold font-mono font-bold">
        {formatNairaCompact(payload[0].value)}
      </p>
    </div>
  )
}

export function PortfolioChart() {
  const { range, setRange, data, isLoading } = usePortfolioChart()

  return (
    <div className="card p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-white">Portfolio Growth</h2>
        <div className="flex items-center gap-1 bg-navy-900 rounded-chip p-1">
          {RANGES.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={cn(
                'px-3 py-1 text-label rounded-chip transition-all duration-150',
                range === r
                  ? 'bg-gold text-navy-950 font-bold'
                  : 'text-navy-300 hover:text-white'
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="h-48 w-full">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <div className="space-y-2 w-full px-4">
              {[60, 80, 50, 90, 70].map((h, i) => (
                <div key={i} className="skeleton rounded" style={{ height: h / 5 }} />
              ))}
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data ?? []} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#C9A84C" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#C9A84C" stopOpacity={0}   />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                tickFormatter={(v) => formatDate(v).split(' ').slice(0, 2).join(' ')}
                tick={{ fill: '#5C80B0', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                interval="preserveStartEnd"
              />
              <YAxis
                tickFormatter={(v) => formatNairaCompact(v)}
                tick={{ fill: '#5C80B0', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={60}
              />
              <Tooltip content={<ChartTooltip />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#C9A84C"
                strokeWidth={2}
                fill="url(#goldGradient)"
                dot={false}
                activeDot={{ r: 4, fill: '#C9A84C', stroke: '#040C18', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}
