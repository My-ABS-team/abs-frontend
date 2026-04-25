import { cn } from '@/lib/utils'

type Status = 'SETTLED' | 'PENDING' | 'PARTIAL' | 'OPEN' | 'FAILED' | 'VERIFIED' | 'REJECTED'

const STATUS_CLASSES: Record<Status, string> = {
  SETTLED:  'badge-settled',
  VERIFIED: 'badge-settled',
  PENDING:  'badge-pending',
  PARTIAL:  'badge-partial',
  OPEN:     'badge-open',
  FAILED:   'inline-flex items-center px-2 py-0.5 rounded-chip text-label font-medium bg-market-downBg text-market-down',
  REJECTED: 'inline-flex items-center px-2 py-0.5 rounded-chip text-label font-medium bg-market-downBg text-market-down',
}

interface StatusBadgeProps {
  status:    Status
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span className={cn(STATUS_CLASSES[status], className)}>
      {status}
    </span>
  )
}
