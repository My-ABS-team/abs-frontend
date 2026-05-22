import { useSectorExposure } from '../hooks/useDashboard'
import type { Sector } from '@/types/portfolio.types'

const SECTOR_COLOURS: Record<Sector, string> = {
  BANKING:        'var(--blue-400)',
  OIL_GAS:        'var(--gold-400)',
  FINTECH:        'var(--green-300)',
  AGRICULTURE:    '#6BCB77',
  CONSUMER_GOODS: '#C084FC',
  INDUSTRIALS:    '#FB923C',
  TELECOMS:       '#22D3EE',
  HEALTHCARE:     '#F472B6',
}

const SECTOR_LABELS: Record<Sector, string> = {
  BANKING:        'Banking',
  OIL_GAS:        'Oil & Gas',
  FINTECH:        'Fintech',
  AGRICULTURE:    'Agriculture',
  CONSUMER_GOODS: 'Consumer',
  INDUSTRIALS:    'Industrials',
  TELECOMS:       'Telecoms',
  HEALTHCARE:     'Healthcare',
}

export function SectorExposure() {
  const { data, isLoading } = useSectorExposure()

  return (
    <div className="card card-padded" style={{ padding: 20 }}>
      <div style={{ fontWeight: 600, color: 'var(--text-0)', fontSize: 15, marginBottom: 4 }}>Sector Exposure</div>
      <div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 20 }}>Allocation by industry</div>

      {isLoading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[38, 22, 14, 10].map((w, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div className="skeleton" style={{ height: 28, flex: 1, maxWidth: `${w}%`, borderRadius: 4 }} />
              <div className="skeleton" style={{ height: 12, width: 32, borderRadius: 4 }} />
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {(data ?? []).map(({ sector, percentage }) => (
            <div key={sector}>
              <div className="row between" style={{ marginBottom: 4, fontSize: 12 }}>
                <span style={{ color: 'var(--text-2)' }}>{SECTOR_LABELS[sector as Sector]}</span>
                <span className="mono" style={{ fontWeight: 600, color: 'var(--text-0)' }}>{percentage}%</span>
              </div>
              <div style={{ height: 28, background: 'var(--bg-4)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${percentage}%`,
                  background: SECTOR_COLOURS[sector as Sector] ?? 'var(--gold-400)',
                  borderRadius: 4,
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: 8,
                  transition: 'width 0.5s ease',
                }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(0,0,0,0.7)', whiteSpace: 'nowrap', overflow: 'hidden' }}>
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
