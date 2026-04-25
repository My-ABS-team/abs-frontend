import { cn, formatNaira, formatNairaCompact, formatPct, priceClass } from '@/lib/utils'

// ─── ₦ value display ──────────────────────────────────────────────────────────

interface CurrencyDisplayProps {
  /** Amount in KOBO (integer). Always pass kobo — the component converts. */
  kobo:      number
  /** Show compact form: ₦68.5M instead of ₦68,450,900.25 */
  compact?:  boolean
  className?: string
}

export function CurrencyDisplay({ kobo, compact = false, className }: CurrencyDisplayProps) {
  const formatted = compact ? formatNairaCompact(kobo) : formatNaira(kobo)
  return <span className={cn('font-mono tabular-nums', className)}>{formatted}</span>
}

// ─── Price change badge (+1.24% ▲) ───────────────────────────────────────────

interface ChangeBadgeProps {
  /** Percentage value e.g. 1.24 or -0.5 */
  pct:       number
  /** Also show the raw kobo change alongside the % */
  kobo?:     number
  className?: string
}

export function ChangeBadge({ pct, kobo, className }: ChangeBadgeProps) {
  const isUp   = pct > 0
  const isDown = pct < 0
  const arrow  = isUp ? '▲' : isDown ? '▼' : '—'

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 text-sm font-medium tabular-nums',
        priceClass(pct),
        className
      )}
    >
      <span className="text-xs">{arrow}</span>
      {kobo !== undefined && (
        <span>{formatNaira(Math.abs(kobo))}</span>
      )}
      <span>{formatPct(pct)}</span>
    </span>
  )
}

// ─── Inline price chip (used in Market Watch table rows) ──────────────────────

interface PriceChipProps {
  ticker:       string
  priceKobo:    number
  changePct:    number
  className?:   string
}

export function PriceChip({ ticker, priceKobo, changePct, className }: PriceChipProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className="text-sm font-bold text-white">{ticker}</span>
      <CurrencyDisplay kobo={priceKobo} className="text-sm text-white" />
      <ChangeBadge pct={changePct} className="text-xs" />
    </div>
  )
}
