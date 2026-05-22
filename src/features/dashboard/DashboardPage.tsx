import { useNavigate } from 'react-router-dom'
import { Download, Plus } from 'lucide-react'
import { usePortfolioSummary } from './hooks/useDashboard'
import { PortfolioChart }  from './components/PortfolioChart'
import { SectorExposure }  from './components/SectorExposure'
import { MarketWatch }     from './components/MarketWatch'
import { QuickTrade }      from './components/QuickTrade'
import { ROUTES }          from '@/constants/routes'

export function DashboardPage() {
  const navigate = useNavigate()
  const { data: summary, isLoading } = usePortfolioSummary()
  const totalValue = summary ? (summary.totalInvestmentValue / 100) : 0
  const walletBal  = summary ? (summary.walletBalance / 100) : 0
  const ytd        = summary?.ytdPerformance ?? 0
  const benchmark  = summary?.ytdBenchmark ?? 8.2
  const dividends  = summary ? ((summary as any).realizedDividends ?? 0) / 100 : 0

  return (
    <div>
      {/* Page header */}
      <div className="page-title-row">
        <div>
          <div className="eyebrow" style={{ marginBottom: 6 }}>Sovereign Wealth Management</div>
          <h1 className="h2" style={{ margin: 0 }}>Institutional Portfolio</h1>
          <p className="muted" style={{ marginTop: 4, fontSize: 13 }}>
            Real-time view of your holdings, exposure, and execution capacity across NGX and NASD markets.
          </p>
        </div>
        <div className="row gap-2">
          <button className="btn btn-secondary btn-sm hide-mobile">
            <Download size={14} /> Statement
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => navigate(ROUTES.MARKET)}>
            <Plus size={14} /> New Trade
          </button>
        </div>
      </div>

      {/* KPI row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginBottom: 24 }}>
        {/* Total Investment Value */}
        <div className="kpi">
          <div className="kpi-label">Total Investment Value</div>
          {isLoading ? (
            <div className="skeleton" style={{ height: 32, width: '60%', marginTop: 8 }} />
          ) : (
            <>
              <div className="kpi-value">
                ₦{totalValue.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="kpi-delta">+6.5% MoM</div>
              <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>₦4.2M since last month</div>
            </>
          )}
        </div>

        {/* Wallet Balance */}
        <div className="kpi">
          <div className="kpi-label">Wallet Balance</div>
          {isLoading ? (
            <div className="skeleton" style={{ height: 32, width: '50%', marginTop: 8 }} />
          ) : (
            <>
              <div className="kpi-value gold">
                ₦{walletBal.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="row gap-2" style={{ marginTop: 12 }}>
                <button className="btn btn-secondary btn-sm grow">Add Funds</button>
                <button className="btn btn-ghost btn-sm grow">Withdraw</button>
              </div>
            </>
          )}
        </div>

        {/* YTD Performance */}
        <div className="kpi">
          <div className="kpi-label">YTD Performance</div>
          {isLoading ? (
            <div className="skeleton" style={{ height: 32, width: '40%', marginTop: 8 }} />
          ) : (
            <>
              <div className="kpi-value green">+{ytd}%</div>
              <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>Benchmark NGX-30: +{benchmark}%</div>
              <div style={{ marginTop: 12, height: 5, background: 'var(--bg-4)', borderRadius: 99, overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${Math.min((ytd / (benchmark * 1.5)) * 100, 100)}%`,
                  background: 'var(--green-300)',
                  borderRadius: 99,
                  transition: 'width 0.5s ease',
                }} />
              </div>
            </>
          )}
        </div>

        {/* Realized Dividends */}
        <div className="kpi">
          <div className="kpi-label">Realized Dividends (YTD)</div>
          {isLoading ? (
            <div className="skeleton" style={{ height: 32, width: '55%', marginTop: 8 }} />
          ) : (
            <>
              <div className="kpi-value">
                ₦{dividends > 0
                  ? dividends.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                  : '487,200.00'}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>From 14 instruments</div>
              <div className="kpi-delta" style={{ marginTop: 4 }}>Next: Apr 28</div>
            </>
          )}
        </div>
      </div>

      {/* Portfolio Growth + Sector Exposure */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: 16, marginBottom: 24 }}
           className="dashboard-main-grid">
        <PortfolioChart />
        <SectorExposure />
      </div>

      {/* Market Watch + Quick Trade */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: 16 }}
           className="dashboard-main-grid">
        <MarketWatch />
        <QuickTrade />
      </div>
    </div>
  )
}
