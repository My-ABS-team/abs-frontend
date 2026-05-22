import { useNavigate } from 'react-router-dom'
import { Filter, RefreshCw, ArrowRight } from 'lucide-react'
import { useMarketWatch } from '../hooks/useDashboard'
import { useUIStore } from '@/stores/uiStore'
import { ROUTES } from '@/constants/routes'

function Sparkline({ positive }: { positive: boolean }) {
  const pts = positive
    ? [0,8,5,12,9,18,14,22,18,28]
    : [28,22,25,18,20,12,16,10,12,5]
  const w = 80, h = 28
  const xs = pts.map((_, i) => (i / (pts.length - 1)) * w)
  const mn = Math.min(...pts), mx = Math.max(...pts)
  const ys = pts.map(v => h - ((v - mn) / (mx - mn || 1)) * h)
  const d = xs.map((x, i) => `${i === 0 ? 'M' : 'L'} ${x} ${ys[i]}`).join(' ')
  const color = positive ? 'var(--green-300)' : 'var(--red-100)'
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <path d={d} stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
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
    <div className="card" style={{ overflow: 'hidden' }}>
      <div className="row between" style={{ padding: '16px 20px', borderBottom: '1px solid var(--line)' }}>
        <div>
          <div style={{ fontWeight: 600, color: 'var(--text-0)', fontSize: 15 }}>Market Watch</div>
          <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>Top holdings & watchlist</div>
        </div>
        <div className="row gap-2">
          <button className="btn-icon" style={{ width: 32, height: 32 }}><Filter size={14} /></button>
          <button
            className="btn-icon"
            style={{ width: 32, height: 32 }}
            onClick={() => refetch()}
            aria-label="Refresh"
          >
            <RefreshCw size={14} style={{ animation: isFetching ? 'spin 1s linear infinite' : 'none' }} />
          </button>
        </div>
      </div>

      <div style={{ overflowX: 'auto', padding: '0 8px 16px' }}>
        <table className="table" style={{ minWidth: 500 }}>
          <thead>
            <tr>
              <th style={{ paddingLeft: 16 }}>Symbol</th>
              <th>Last Price</th>
              <th>Change</th>
              <th>7D Trend</th>
              <th style={{ paddingRight: 16 }}></th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    <td style={{ paddingLeft: 16 }}><div className="skeleton" style={{ height: 14, width: 80 }} /></td>
                    <td><div className="skeleton" style={{ height: 14, width: 60 }} /></td>
                    <td><div className="skeleton" style={{ height: 14, width: 50 }} /></td>
                    <td><div className="skeleton" style={{ height: 14, width: 80 }} /></td>
                    <td />
                  </tr>
                ))
              : (data ?? []).map((quote) => (
                  <tr
                    key={quote.ticker}
                    className="row-hover"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleRowClick(quote.ticker)}
                  >
                    <td style={{ paddingLeft: 16 }}>
                      <div style={{ fontWeight: 700, color: 'var(--text-0)' }}>{quote.ticker}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        {quote.companyName}
                      </div>
                    </td>
                    <td className="mono" style={{ fontWeight: 600, color: 'var(--text-0)' }}>
                      ₦{(quote.lastPriceKobo / 100).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="mono" style={{ fontWeight: 600, color: quote.changePct >= 0 ? 'var(--green-300)' : 'var(--red-100)' }}>
                      {quote.changePct >= 0 ? '+' : ''}{quote.changePct}%
                    </td>
                    <td>
                      <Sparkline positive={quote.changePct >= 0} />
                    </td>
                    <td style={{ paddingRight: 16, textAlign: 'right' }}>
                      <ArrowRight size={14} style={{ color: 'var(--text-3)' }} />
                    </td>
                  </tr>
                ))
            }
          </tbody>
        </table>
      </div>

      <div style={{ padding: '12px 24px', borderTop: '1px solid var(--line)' }}>
        <button
          onClick={() => navigate(ROUTES.MARKET)}
          style={{ color: 'var(--gold-300)', fontSize: 13, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6 }}
        >
          View Full Market Terminal <ArrowRight size={12} />
        </button>
      </div>
    </div>
  )
}
