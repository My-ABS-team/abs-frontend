import { Link } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-navy-950 flex flex-col items-center justify-center text-center px-4">
      {/* Candlestick illustration */}
      <div className="relative mb-8">
        <div className="w-48 h-40 mx-auto flex items-end justify-center gap-3 opacity-60">
          {[
            { body: 'h-20', wick: 'h-8', color: 'bg-market-up' },
            { body: 'h-14', wick: 'h-12', color: 'bg-market-down' },
            { body: 'h-24', wick: 'h-6', color: 'bg-market-up' },
            { body: 'h-10', wick: 'h-16', color: 'bg-market-down' },
            { body: 'h-18', wick: 'h-10', color: 'bg-market-up' },
          ].map(({ body, wick, color }, i) => (
            <div key={i} className="flex flex-col items-center gap-0">
              <div className={`w-0.5 ${wick} ${color} opacity-50`} />
              <div className={`w-4 ${body} ${color} rounded-sm`} />
            </div>
          ))}
        </div>
        {/* Search icon overlay */}
        <div className="absolute -bottom-3 right-8 w-10 h-10 bg-gold rounded-full flex items-center justify-center">
          <span className="text-navy-950 text-lg">🔍</span>
        </div>
      </div>

      <h1 className="text-5xl font-bold text-white mb-3">404: Asset Not Found</h1>
      <p className="text-navy-300 text-base mb-8 max-w-sm">
        The page you are looking for has been delisted or moved.
        Let's get you back to the trading floor.
      </p>

      <div className="flex gap-3">
        <Link to={ROUTES.DASHBOARD} className="btn-primary">
          Back to Dashboard
        </Link>
        <button onClick={() => history.back()} className="btn-secondary">
          ← Previous Page
        </button>
      </div>

      <div className="mt-12 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-market-up animate-pulse" />
        <span className="text-label text-navy-300 tracking-widest uppercase">Market Systems Online</span>
      </div>
      <p className="text-label text-navy-500 mt-2">ERROR CODE: ERR_ASSET_UNREACHABLE_04</p>
    </div>
  )
}
