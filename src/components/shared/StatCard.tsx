import { cn } from '@/lib/utils'
import { CurrencyDisplay, ChangeBadge } from './CurrencyDisplay'
import type { ReactNode } from 'react'

interface StatCardProps {
  label:       string
  /** Pass either children or kobo — kobo renders a CurrencyDisplay */
  kobo?:       number
  children?:   ReactNode
  /** Optional change badge below the value */
  changePct?:  number
  changeKobo?: number
  changeLabel?: string
  /** Accent colour for the label line */
  accent?:     'gold' | 'green' | 'red' | 'default'
  className?:  string
}

const ACCENT_CLASSES = {
  gold:    'text-gold',
  green:   'text-market-up',
  red:     'text-market-down',
  default: 'text-navy-300',
} as const

export function StatCard({
  label,
  kobo,
  children,
  changePct,
  changeKobo,
  changeLabel,
  accent = 'default',
  className,
}: StatCardProps) {
  return (
    <div className={cn('card p-5 space-y-2', className)}>
      <p className={cn('text-label uppercase tracking-widest', ACCENT_CLASSES[accent])}>
        {label}
      </p>

      <div>
        {kobo !== undefined ? (
          <CurrencyDisplay
            kobo={kobo}
            className={cn(
              'text-stat font-bold',
              accent === 'gold'  && 'text-gold',
              accent === 'green' && 'text-market-up',
              accent === 'red'   && 'text-market-down',
              accent === 'default' && 'text-white',
            )}
          />
        ) : (
          children
        )}
      </div>

      {(changePct !== undefined || changeLabel) && (
        <div className="flex items-center gap-2">
          {changePct !== undefined && (
            <ChangeBadge pct={changePct} kobo={changeKobo} className="text-sm" />
          )}
          {changeLabel && (
            <span className="text-label text-navy-400">{changeLabel}</span>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Skeleton version shown during data loading ────────────────────────────

export function StatCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('card p-5 space-y-3', className)}>
      <div className="skeleton h-3 w-24 rounded" />
      <div className="skeleton h-8 w-40 rounded" />
      <div className="skeleton h-3 w-32 rounded" />
    </div>
  )
}
