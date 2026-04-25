import { useState } from 'react'
import { User, Building2, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { AccountType } from '@/types/auth.types'

interface Step2Props {
  onNext: (accountType: AccountType) => void
  onBack: () => void
  isLoading: boolean
}

const ACCOUNT_TYPES: {
  type:        AccountType
  icon:        React.ElementType
  label:       string
  description: string
}[] = [
  {
    type:        'INDIVIDUAL',
    icon:        User,
    label:       'Individual Investor',
    description: 'For personal wealth management, mutual funds, and stock trading.',
  },
  {
    type:        'INSTITUTIONAL_CORPORATE',
    icon:        Building2,
    label:       'Institutional / Corporate',
    description: 'For pension funds, insurance companies, and corporate brokerage accounts.',
  },
]

export function Step2AccountType({ onNext, onBack, isLoading }: Step2Props) {
  const [selected, setSelected] = useState<AccountType>('INDIVIDUAL')

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        {ACCOUNT_TYPES.map(({ type, icon: Icon, label, description }) => {
          const isActive = selected === type
          return (
            <button
              key={type}
              type="button"
              onClick={() => setSelected(type)}
              className={cn(
                'w-full flex items-start gap-4 p-4 rounded-card border text-left',
                'transition-all duration-150',
                isActive
                  ? 'border-gold bg-gold/10'
                  : 'border-navy-700 bg-navy-800 hover:border-navy-500'
              )}
            >
              <div
                className={cn(
                  'w-10 h-10 rounded-chip flex items-center justify-center shrink-0',
                  isActive ? 'bg-gold/20 text-gold' : 'bg-navy-700 text-navy-300'
                )}
              >
                <Icon size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={cn('text-sm font-semibold', isActive ? 'text-white' : 'text-navy-200')}>
                  {label}
                </p>
                <p className="text-label text-navy-400 mt-0.5">{description}</p>
              </div>
              <div className="shrink-0 mt-0.5">
                {isActive ? (
                  <CheckCircle2 size={18} className="text-gold" />
                ) : (
                  <div className="w-[18px] h-[18px] rounded-full border-2 border-navy-600" />
                )}
              </div>
            </button>
          )
        })}
      </div>

      <div className="space-y-2">
        <button
          onClick={() => onNext(selected)}
          disabled={isLoading}
          className="btn-primary w-full py-3"
        >
          {isLoading ? 'Setting up your account…' : 'Continue'}
        </button>
        <button
          type="button"
          onClick={onBack}
          disabled={isLoading}
          className="w-full text-center text-sm text-navy-400 hover:text-white py-2 transition-colors"
        >
          ← Go Back
        </button>
      </div>
    </div>
  )
}
