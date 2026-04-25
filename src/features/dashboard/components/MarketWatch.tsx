import { useNavigate } from 'react-router-dom'
import { RefreshCw } from 'lucide-react'
import { useMarketWatch } from '../hooks/useDashboard'
import { useUIStore } from '@/stores/uiStore'
import { ChangeBadge, CurrencyDisplay } from '@/components/shared/CurrencyDisplay'
import { TableSkeleton } from '@/components/shared/SectionLoader'
import { ROUTES } from '@/constants/routes'
import { cn } from '@/lib/utils'

// Tiny sparkline bar chart — 7 bars representing the 7D trend
function SparkBars({ positive }: { positive: boolean }) {
  const heights = [40, 55, 35, 70, 45, 80, positive ? 95 : 30]
  return (
    <div className="flex items-end gap-px h-6 w-12">
      {heights.map((h, i) => (
        <div
          key={i}
          className={cn(
            'flex-1 rounded-sm',
            positive ? 'bg-market-up' : 'bg-market-down',
            i < heights.length - 1 && 'opacity-50'
          )}
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  )
}

export function MarketWatch() {
  const navigate      = useNavigate()
  const setTicker     = useUIStore((s) => s.setActiveTicker)
  const { data, isLoading, isFetching, refetch } = useMarketWatch()

  function handleRowClick(ticker: string) {
    setTicker(ticker)
    navigate(ROUTES.MARKET_TICKER(ticker))
  }

  return (
    <div className="card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-navy-700">
        <h2 className="text-sm font-semibold text-white">Market Watch</h2>
        <button
          onClick={() => refetch()}
          className={cn('text-navy-400 hover:text-white transition-colors', isFetching && 'animate-spin')}
          aria-label="Refresh market data"
        >
          <RefreshCw size={14} />
        </button>
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr] px-5 py-2.5 border-b border-navy-700">
        {['SYMBOL', 'LAST PRICE', 'CHANGE (%)', '7D TREND'].map((h) => (
          <span key={h} className="text-label text-navy-400 uppercase tracking-widest">{h}</span>
        ))}
      </div>

      {/* Rows */}
      {isLoading ? (
        <TableSkeleton rows={3} cols={4} />
      ) : (
        <div>
          {(data ?? []).map((quote) => (
            <button
              key={quote.ticker}
              onClick={() => handleRowClick(quote.ticker)}
              className="w-full grid grid-cols-[2fr_1fr_1fr_1fr] px-5 py-3.5 border-b border-navy-700
                         hover:bg-navy-700/50 transition-colors text-left group"
            >
              <div>
                <p className="text-sm font-semibold text-white group-hover:text-gold transition-colors">
                  {quote.ticker}
                </p>
                <p className="text-label text-navy-400 truncate">{quote.companyName}</p>
              </div>
              <CurrencyDisplay
                kobo={quote.lastPriceKobo}
                className="text-sm text-white self-center"
              />
              <ChangeBadge
                pct={quote.changePct}
                className="text-sm self-center"
              />
              <div className="self-center">
                <SparkBars positive={quote.changePct >= 0} />
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Footer link */}
      <button
        onClick={() => navigate(ROUTES.MARKET)}
        className="w-full px-5 py-3.5 text-left text-sm text-navy-300 hover:text-gold
                   transition-colors flex items-center gap-1"
      >
        View Full Market Terminal →
      </button>
    </div>
  )
}
