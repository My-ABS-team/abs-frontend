import { useSectorExposure } from '../hooks/useDashboard'
import { cn } from '@/lib/utils'
import type { Sector } from '@/types/portfolio.types'

const SECTOR_COLOURS: Record<Sector, string> = {
  BANKING:        'bg-blue-500',
  OIL_GAS:        'bg-amber-500',
  FINTECH:        'bg-teal-500',
  AGRICULTURE:    'bg-green-500',
  CONSUMER_GOODS: 'bg-purple-500',
  INDUSTRIALS:    'bg-orange-500',
  TELECOMS:       'bg-cyan-500',
  HEALTHCARE:     'bg-pink-500',
}

const SECTOR_LABELS: Record<Sector, string> = {
  BANKING:        'Banking',
  OIL_GAS:        'Oil & Gas',
  FINTECH:        'Fintech',
  AGRICULTURE:    'Agric',
  CONSUMER_GOODS: 'Consumer',
  INDUSTRIALS:    'Industrials',
  TELECOMS:       'Telecoms',
  HEALTHCARE:     'Healthcare',
}

export function SectorExposure() {
  const { data, isLoading } = useSectorExposure()

  return (
    <div className="card p-5 space-y-4">
      <h2 className="text-sm font-semibold text-white">Sector Exposure</h2>

      {isLoading ? (
        <div className="space-y-2">
          {[38, 22, 14, 10].map((w, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="skeleton h-3 rounded flex-1" style={{ maxWidth: `${w}%` }} />
              <div className="skeleton h-3 w-8 rounded" />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2.5">
          {(data ?? []).map(({ sector, percentage }) => (
            <div key={sector} className="space-y-1">
              <div className="flex items-center justify-between text-label">
                <span className="text-navy-200">{SECTOR_LABELS[sector as Sector]}</span>
                <span className="text-white font-medium tabular-nums">{percentage}%</span>
              </div>
              <div className="h-5 bg-navy-900 rounded-sm overflow-hidden">
                <div
                  className={cn('h-full rounded-sm transition-all duration-500', SECTOR_COLOURS[sector as Sector])}
                  style={{ width: `${percentage}%` }}
                >
                  <span className="text-ticker font-bold text-white px-2 leading-5 block truncate">
                    {SECTOR_LABELS[sector as Sector].toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
