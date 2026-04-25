/**
 * Skeleton loader rows — used inside tables and card lists while
 * TanStack Query fetches data. Matches the height of real rows so
 * the layout doesn't jump when data arrives.
 */
import { cn } from '@/lib/utils'

interface TableSkeletonProps {
  rows?:    number
  cols?:    number
  className?: string
}

export function TableSkeleton({ rows = 4, cols = 4, className }: TableSkeletonProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex gap-4 px-4 py-3 border-b border-navy-700">
          {Array.from({ length: cols }).map((_, c) => (
            <div
              key={c}
              className={cn('skeleton h-4 rounded flex-1', c === 0 && 'max-w-[80px]')}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

interface CardGridSkeletonProps {
  count?:   number
  className?: string
}

export function CardGridSkeleton({ count = 3, className }: CardGridSkeletonProps) {
  return (
    <div className={cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card p-5 space-y-3">
          <div className="skeleton h-3 w-20 rounded" />
          <div className="skeleton h-8 w-36 rounded" />
          <div className="skeleton h-3 w-28 rounded" />
        </div>
      ))}
    </div>
  )
}
