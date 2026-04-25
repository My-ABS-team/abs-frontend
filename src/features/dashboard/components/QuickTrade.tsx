import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Search } from 'lucide-react'
import { useQuickTrade } from '../hooks/useDashboard'
import { CurrencyDisplay } from '@/components/shared/CurrencyDisplay'
import { calculateFees, formatNaira } from '@/lib/utils'
import { cn } from '@/lib/utils'

const schema = z.object({
  ticker:    z.string().min(2, 'Enter a ticker symbol').toUpperCase(),
  amountKobo: z.coerce.number().min(100_00, 'Minimum ₦100'),  // 100 naira in kobo
})
type FormValues = z.infer<typeof schema>

// Mocked price lookup — replace with useQuery(getQuote(ticker)) once ready
const MOCK_PRICES: Record<string, number> = {
  MTNN: 24550_00, ZENITHBANK: 3820_00, AIRTELAFRI: 125000_00,
  DANGCEM: 45000_00, GTCO: 4115_00, SEPLAT: 210000_00,
}

export function QuickTrade() {
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
    placeOrder({
      ticker:    values.ticker,
      side,
      type:      'LIMIT',
      quantity:  estUnits,
      priceKobo,
    })
  }

  return (
    <div className="card p-5 space-y-4">
      <h2 className="text-sm font-semibold text-white">Quick Trade</h2>

      {/* BUY / SELL toggle */}
      <div className="grid grid-cols-2 gap-1 bg-navy-900 rounded-chip p-1">
        {(['BUY', 'SELL'] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setSide(s)}
            className={cn(
              'py-2 text-sm font-bold rounded-chip transition-all duration-150',
              side === s && s === 'BUY'  && 'bg-market-up text-white',
              side === s && s === 'SELL' && 'bg-market-down text-white',
              side !== s && 'text-navy-400 hover:text-white'
            )}
          >
            {s}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        {/* Asset search */}
        <div>
          <label className="label">Select Asset</label>
          <div className="relative">
            <input
              {...register('ticker')}
              placeholder="e.g. MTNN"
              className={cn('input pr-8 uppercase', errors.ticker && 'border-market-down')}
            />
            <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-400" />
          </div>
          {errors.ticker && (
            <p className="text-label text-market-down mt-1">{errors.ticker.message}</p>
          )}
        </div>

        {/* Amount */}
        <div>
          <label className="label">Amount (₦)</label>
          <input
            {...register('amountKobo')}
            type="number"
            placeholder="0.00"
            className={cn('input', errors.amountKobo && 'border-market-down')}
          />
          {errors.amountKobo && (
            <p className="text-label text-market-down mt-1">{errors.amountKobo.message}</p>
          )}
        </div>

        {/* Estimated units */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-navy-400">Est. Units</span>
          <span className="text-white font-mono font-medium tabular-nums">
            {estUnits.toLocaleString('en-NG')}
          </span>
        </div>

        {/* Fee preview */}
        {fees && (
          <div className="bg-navy-900 rounded-chip px-3 py-2.5 space-y-1.5 text-label">
            <div className="flex justify-between">
              <span className="text-navy-400">Consideration</span>
              <CurrencyDisplay kobo={fees.considerationKobo} className="text-navy-200" />
            </div>
            <div className="flex justify-between">
              <span className="text-navy-400">Brokerage (1.35%)</span>
              <CurrencyDisplay kobo={fees.brokerageKobo} className="text-navy-200" />
            </div>
            <div className="flex justify-between border-t border-navy-700 pt-1.5">
              <span className="text-white font-medium">Total</span>
              <CurrencyDisplay kobo={fees.totalKobo} className="text-gold font-bold" />
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isPending || estUnits < 1}
          className={cn(
            'w-full py-3 text-sm font-bold rounded-chip transition-all duration-150',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            side === 'BUY'
              ? 'bg-gold text-navy-950 hover:bg-gold-300'
              : 'bg-market-down text-white hover:bg-red-500'
          )}
        >
          {isPending ? 'Placing order…' : `${side} NOW`}
        </button>
      </form>
    </div>
  )
}
