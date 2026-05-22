import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Search } from 'lucide-react'
import { useQuickTrade } from '../hooks/useDashboard'
import { calculateFees } from '@/lib/utils'
import { ROUTES } from '@/constants/routes'

const schema = z.object({
  ticker:     z.string().min(2, 'Enter a ticker').toUpperCase(),
  amountKobo: z.coerce.number().min(100_00, 'Minimum ₦100'),
})
type FormValues = z.infer<typeof schema>

const MOCK_PRICES: Record<string, number> = {
  MTNN: 24550_00, ZENITHBANK: 3820_00, AIRTELAFRI: 125000_00,
  DANGCEM: 45000_00, GTCO: 4115_00, SEPLAT: 210000_00,
}

function fmt(kobo: number) {
  return '₦' + (kobo / 100).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export function QuickTrade() {
  const navigate = useNavigate()
  const [side, setSide] = useState<'BUY' | 'SELL'>('BUY')
  const { mutate: placeOrder, isPending } = useQuickTrade()

  const { register, watch, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { ticker: 'MTNN', amountKobo: 0 },
  })

  const ticker     = watch('ticker')?.toUpperCase()
  const priceKobo  = MOCK_PRICES[ticker] ?? 0
  const amountKobo = watch('amountKobo') ?? 0
  const estUnits   = priceKobo > 0 ? Math.floor(amountKobo / priceKobo) : 0
  const fees       = estUnits > 0 ? calculateFees(priceKobo, estUnits) : null

  function onSubmit(values: FormValues) {
    if (estUnits < 1) return
    placeOrder({ ticker: values.ticker, side, type: 'LIMIT', quantity: estUnits, priceKobo })
  }

  return (
    <div className="card card-padded" style={{ padding: 20 }}>
      <div style={{ fontWeight: 600, color: 'var(--text-0)', fontSize: 15, marginBottom: 16 }}>Quick Trade</div>

      {/* BUY / SELL toggle */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, background: 'var(--bg-3)', borderRadius: 8, padding: 4, marginBottom: 16 }}>
        {(['BUY', 'SELL'] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setSide(s)}
            style={{
              padding: '8px 0',
              fontSize: 13,
              fontWeight: 700,
              borderRadius: 6,
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.15s',
              background: side === s
                ? (s === 'BUY' ? 'var(--green-500)' : 'var(--red-600)')
                : 'transparent',
              color: side === s ? '#fff' : 'var(--text-3)',
            }}
          >
            {s}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="field" style={{ marginBottom: 12 }}>
          <label className="field-label">Select Asset</label>
          <div className="input-with-icon">
            <Search size={14} className="icon" />
            <input
              {...register('ticker')}
              className="input"
              placeholder="e.g. MTNN"
              style={{ textTransform: 'uppercase', paddingLeft: 36 }}
            />
          </div>
          {errors.ticker && <div style={{ color: 'var(--red-300)', fontSize: 11, marginTop: 4 }}>{errors.ticker.message}</div>}
        </div>

        <div className="field" style={{ marginBottom: 12 }}>
          <label className="field-label">Amount (₦)</label>
          <input {...register('amountKobo')} type="number" className="input mono" placeholder="0.00" />
          {errors.amountKobo && <div style={{ color: 'var(--red-300)', fontSize: 11, marginTop: 4 }}>{errors.amountKobo.message}</div>}
        </div>

        {/* Est. units row */}
        <div className="row between" style={{ padding: '10px 0', borderTop: '1px dashed var(--line)', borderBottom: '1px dashed var(--line)', marginBottom: 12 }}>
          <span style={{ fontSize: 12, color: 'var(--text-2)' }}>Est. Units</span>
          <span className="mono" style={{ fontWeight: 700, color: 'var(--text-0)' }}>{estUnits.toLocaleString('en-NG')}</span>
        </div>

        {/* Fee breakdown */}
        {fees && (
          <div style={{ background: 'var(--bg-3)', borderRadius: 8, padding: '10px 12px', marginBottom: 12, fontSize: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div className="row between">
              <span style={{ color: 'var(--text-3)' }}>Consideration</span>
              <span className="mono" style={{ color: 'var(--text-2)' }}>{fmt(fees.considerationKobo)}</span>
            </div>
            <div className="row between">
              <span style={{ color: 'var(--text-3)' }}>Brokerage (1.35%)</span>
              <span className="mono" style={{ color: 'var(--text-2)' }}>{fmt(fees.brokerageKobo)}</span>
            </div>
            <div className="row between" style={{ borderTop: '1px solid var(--line)', paddingTop: 6 }}>
              <span style={{ fontWeight: 600, color: 'var(--text-0)' }}>Total</span>
              <span className="mono" style={{ fontWeight: 700, color: 'var(--gold-300)' }}>{fmt(fees.totalKobo)}</span>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isPending || estUnits < 1}
          className="btn btn-primary btn-block btn-lg"
          style={{
            background: side === 'SELL' ? 'linear-gradient(180deg, var(--red-300), var(--red-600))' : undefined,
            opacity: isPending || estUnits < 1 ? 0.5 : 1,
          }}
        >
          {isPending ? 'Placing order…' : `${side} NOW`}
        </button>
        <button
          type="button"
          className="btn btn-ghost btn-block btn-sm"
          style={{ marginTop: 8 }}
          onClick={() => navigate(ROUTES.MARKET)}
        >
          Open Terminal
        </button>
      </form>
    </div>
  )
}
