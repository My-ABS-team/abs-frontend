import { Bell, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { usePortfolioSummary } from './hooks/useDashboard'
import { PortfolioChart }  from './components/PortfolioChart'
import { SectorExposure }  from './components/SectorExposure'
import { MarketWatch }     from './components/MarketWatch'
import { QuickTrade }      from './components/QuickTrade'
import { StatCard, StatCardSkeleton } from '@/components/shared/StatCard'
import { useAuthStore }    from '@/stores/authStore'
import { cn }              from '@/lib/utils'

export function DashboardPage() {
  const user                    = useAuthStore((s) => s.user)
  const [balanceVisible, setBalanceVisible] = useState(true)
  const { data: summary, isLoading } = usePortfolioSummary()

  return (
    <div className="space-y-6 animate-slide-up">

      {/* ── Page header ────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-label text-navy-400 uppercase tracking-widest mb-1">
            Sovereign Wealth Management
          </p>
          <h1 className="text-2xl font-bold text-white">
            {user?.accountType === 'INSTITUTIONAL_CORPORATE'
              ? 'Institutional Portfolio'
              : 'My Portfolio'}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-market-up animate-pulse" />
            <span className="text-label text-navy-300 uppercase tracking-widest">NGX Open</span>
          </div>
          <button className="relative text-navy-400 hover:text-white transition-colors p-2">
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-gold" />
          </button>
        </div>
      </div>

      {/* ── Top stat cards ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Total Investment Value */}
        {isLoading ? (
          <StatCardSkeleton />
        ) : (
          <StatCard
            label="Total Investment Value"
            kobo={summary?.totalInvestmentValue ?? 0}
            changePct={4.8}
            changeKobo={summary?.changeFromLastMonth}
            changeLabel="since last month"
            className="relative"
          >
            {/* Balance visibility toggle */}
            <button
              onClick={() => setBalanceVisible((v) => !v)}
              className="absolute top-4 right-4 text-navy-400 hover:text-white transition-colors"
            >
              {balanceVisible ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
          </StatCard>
        )}

        {/* Wallet Balance */}
        {isLoading ? (
          <StatCardSkeleton />
        ) : (
          <StatCard label="Wallet Balance" accent="gold">
            <div className="space-y-1">
              <p
                className={cn(
                  'text-stat font-bold text-gold tabular-nums font-mono transition-all',
                  !balanceVisible && 'blur-sm select-none'
                )}
              >
                {balanceVisible
                  ? `₦${(( summary?.walletBalance ?? 0) / 100).toLocaleString('en-NG', { minimumFractionDigits: 2 })}`
                  : '₦••••••••'}
              </p>
              <div className="flex gap-2 mt-2">
                <button className="btn-primary text-xs px-3 py-1.5">Add Funds</button>
                <button className="btn-secondary text-xs px-3 py-1.5">Withdraw</button>
              </div>
            </div>
          </StatCard>
        )}

        {/* YTD Performance */}
        {isLoading ? (
          <StatCardSkeleton />
        ) : (
          <StatCard label="YTD Performance" accent="green">
            <div className="space-y-1">
              <p className="text-stat font-bold text-market-up">
                +{summary?.ytdPerformance ?? 0}%
              </p>
              {summary?.ytdBenchmark && (
                <div className="space-y-1">
                  <p className="text-label text-navy-400">
                    Benchmark: +{summary.ytdBenchmark}%
                  </p>
                  {/* Progress bar vs benchmark */}
                  <div className="h-1.5 bg-navy-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-market-up rounded-full"
                      style={{
                        width: `${Math.min((summary.ytdPerformance / (summary.ytdBenchmark * 1.5)) * 100, 100)}%`
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </StatCard>
        )}
      </div>

      {/* ── Charts row ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4">
        <PortfolioChart />
        <SectorExposure />
      </div>

      {/* ── Market Watch + Quick Trade ──────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
        <MarketWatch />
        <QuickTrade />
      </div>
    </div>
  )
}
