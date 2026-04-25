import { cn, formatNaira, formatPct, priceClass } from '@/lib/utils'

// Static seed data — replace with useQuery(() => fetchTickerTape()) once API is ready
const TICKER_DATA = [
  { ticker: 'NGX ASI',     priceKobo: 15257199_00, changePct:  1.24 },
  { ticker: 'MTNN',        priceKobo:    24550_00,  changePct:  1.20 },
  { ticker: 'DANGCEM',     priceKobo:    45000_00,  changePct: -0.50 },
  { ticker: 'FGN BOND 2029', priceKobo: 0, yield: '11.5%' },
  { ticker: 'ZENITHBANK',  priceKobo:     3820_00,  changePct: -0.80 },
  { ticker: 'GTCO',        priceKobo:     4115_00,  changePct:  1.35 },
  { ticker: 'SEPLAT',      priceKobo:   210000_00,  changePct:  0.00 },
  { ticker: 'ACCESSCORP',  priceKobo:     1845_00,  changePct: -1.10 },
  { ticker: 'NESTLE',      priceKobo:    80000_00,  changePct:  1.20 },
  { ticker: 'AIRTELAFRI',  priceKobo:   125000_00,  changePct:  1.13 },
]

function TickerItem({ ticker, priceKobo, changePct, yield: yld }: typeof TICKER_DATA[0]) {
  const isYield = yld !== undefined
  return (
    <span className="flex items-center gap-2 px-6 shrink-0">
      <span className="text-navy-300 text-ticker font-medium tracking-wider">{ticker}</span>
      {isYield ? (
        <span className="text-gold text-ticker font-mono">{yld} YIELD</span>
      ) : (
        <>
          <span className="text-white text-ticker font-mono tabular-nums">
            {formatNaira(priceKobo ?? 0)}
          </span>
          <span className={cn('text-ticker font-medium tabular-nums', priceClass(changePct ?? 0))}>
            {changePct !== undefined && (changePct >= 0 ? '▲' : '▼')}
            {changePct !== undefined && Math.abs(changePct).toFixed(1)}%
          </span>
        </>
      )}
      <span className="text-navy-600 ml-4">|</span>
    </span>
  )
}

export function MarketTickerTape({ className }: { className?: string }) {
  // Duplicate items so the seamless loop works — the second set slides in
  // as the first set exits left, then resets imperceptibly
  const items = [...TICKER_DATA, ...TICKER_DATA]

  return (
    <div
      className={cn(
        'ticker-wrap h-9 bg-navy-900 border-t border-navy-700 overflow-hidden flex items-center',
        className
      )}
    >
      <div className="flex animate-ticker whitespace-nowrap">
        {items.map((item, i) => (
          <TickerItem key={i} {...item} />
        ))}
      </div>
    </div>
  )
}
