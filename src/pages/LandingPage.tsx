import { Link } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { Shield, Zap, LineChart, ArrowRight, TrendingUp, TrendingDown } from 'lucide-react'
import { PublicFooter } from '@/components/layout/PublicFooter'

interface TickerItem {
  label: string
  value: string
  change?: string
  up?: boolean
}

const TICKER_ITEMS: TickerItem[] = [
  { label: 'NGX ASI', value: '152,571.99' },
  { label: 'MTNN', value: '₦245.50', change: '1.2%', up: true },
  { label: 'DANGCEM', value: '₦450.00', change: '0.5%', up: false },
  { label: 'FGN BOND 2029', value: '11.5% YIELD' },
  { label: 'ZENITHBANK', value: '₦35.20', change: '0.8%', up: true },
  { label: 'GTCO', value: '₦48.90', change: '2.1%', up: true },
  { label: 'SEPLAT', value: '₦3,800', change: '0.3%', up: false },
  { label: 'ACCESS', value: '₦21.50', change: '1.5%', up: true },
  { label: 'AIRTELAFRI', value: '₦2,150', change: '0.6%', up: true },
]

const FEATURES = [
  {
    Icon: Shield,
    title: '25+ Years Market Leadership',
    body: 'Established authority in the Nigerian financial markets. We are a fully SEC Regulated entity and an active NGX Dealing Member.',
  },
  {
    Icon: Zap,
    title: 'MERN-Powered Trading Terminal',
    body: 'Experience ultra-low latency execution on our high-performance platform, designed for both institutional and retail traders.',
  },
  {
    Icon: LineChart,
    title: 'In-Depth Market Research',
    body: 'Gain an edge with our weekly market analysis, quarterly corporate results reviews, and macroeconomic forecasting from lead analysts.',
  },
]

const SERVICES = [
  { title: 'Investment Banking', bg: 'linear-gradient(155deg, #1E3560 0%, #040C18 100%)' },
  { title: 'Asset Management',   bg: 'linear-gradient(155deg, #2A4A7F 0%, #060F20 100%)' },
  { title: 'Securities Dealing', bg: 'linear-gradient(155deg, #162848 0%, #040C18 100%)' },
  { title: 'Advisory Services',  bg: 'linear-gradient(155deg, #1E3560 0%, #091428 100%)' },
]

const SECTOR_QUOTES = [
  { ticker: 'ZENITHBANK', sector: 'BANKING',   change: '+1.4%', up: true  },
  { ticker: 'SEPLAT',     sector: 'OIL & GAS', change: '-0.3%', up: false },
  { ticker: 'GTCO',       sector: 'FINTECH',   change: '+2.1%', up: true  },
]

const CHART_BARS = [38, 42, 36, 50, 44, 58, 52, 64, 56, 70, 62, 78, 70, 85, 76, 90, 82, 94, 86, 98, 90, 96, 88, 100]

export function LandingPage() {
  return (
    <div className="bg-navy-950 overflow-x-hidden">

      {/* ─── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden lg:min-h-[calc(100vh-4rem)] flex flex-col">

        {/* Gold orb — scales with viewport */}
        <div
          className="pointer-events-none absolute -top-20 -right-20 h-[280px] w-[280px] sm:-top-32 sm:-right-32 sm:h-[400px] sm:w-[400px] lg:-top-40 lg:-right-40 lg:h-[560px] lg:w-[560px] rounded-full"
          style={{
            background:
              'radial-gradient(circle at center, rgba(201,168,76,0.9) 0%, rgba(201,168,76,0.5) 30%, rgba(201,168,76,0.15) 55%, transparent 70%)',
          }}
        />

        <div className="relative flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-10 sm:py-14 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* Left — copy */}
          <div className="space-y-6 sm:space-y-8">
            <h1 className="text-[32px] leading-[1.1] sm:text-[40px] sm:leading-[1.08] lg:text-[50px] lg:leading-[1.07] font-bold tracking-tight">
              <span className="text-white">Invest in the Future:</span>
              <br />
              <span className="text-gradient-gold">Premium</span>
              <br />
              <span className="text-gradient-gold">Stockbroking</span>
              <span className="text-white"> &</span>
              <br />
              <span className="text-white">Asset Management</span>
              <br />
              <span className="text-white">in Nigeria</span>
            </h1>

            <p className="text-navy-200 text-[15px] leading-relaxed max-w-[420px]">
              Access the Nigerian Stock Exchange (NGX) and NASD OTC with a trusted,
              SEC-regulated partner. We manage funds, raise capital, and grow your
              wealth through expert advisory.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                to={ROUTES.REGISTER}
                className="btn-secondary px-6 py-3 text-sm min-h-[44px] flex items-center"
              >
                <span className="sm:hidden">Open Account</span>
                <span className="hidden sm:inline whitespace-nowrap">Get Started: Open Your Account</span>
              </Link>
              <Link
                to={ROUTES.HOME}
                className="flex items-center gap-2 text-sm font-medium text-gold hover:text-gold-300 transition-colors min-h-[44px]"
              >
                View Market Rates <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          {/* Right — market widget, capped on tablet */}
          <div className="w-full max-w-lg mx-auto lg:max-w-none">
            <div className="rounded-xl border border-navy-700 overflow-hidden shadow-modal">

              {/* NGX ASI */}
              <div className="bg-navy-800 px-6 py-5 border-b border-navy-700">
                <p className="text-label text-navy-400 uppercase tracking-widest mb-2">
                  NGX ALL-SHARE INDEX
                </p>
                <div className="flex items-baseline gap-3">
                  <span className="text-[30px] font-bold text-white leading-none tracking-tight">
                    152,571.99
                  </span>
                  <span className="flex items-center gap-1 text-sm font-semibold text-market-up">
                    <TrendingUp size={14} /> +1.24%
                  </span>
                </div>
              </div>

              {/* Simulated area chart */}
              <div className="bg-navy-900 border-b border-navy-700 px-4 pt-4 pb-0 h-28 flex items-end gap-[2px]">
                {CHART_BARS.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-[2px]"
                    style={{
                      height: `${h}%`,
                      background: `rgba(29,158,117,${0.12 + (i / CHART_BARS.length) * 0.38})`,
                    }}
                  />
                ))}
              </div>

              {/* Sector quotes — 2 cols on mobile, 3 on tablet+ */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-navy-700">
                {SECTOR_QUOTES.map((q) => (
                  <div key={q.ticker} className="bg-navy-800 px-5 py-4">
                    <p className="text-label text-navy-400 uppercase tracking-widest mb-1">
                      {q.sector}
                    </p>
                    <p className="text-white font-semibold text-sm">{q.ticker}</p>
                    <p className={`text-xs font-medium mt-0.5 ${q.up ? 'text-market-up' : 'text-market-down'}`}>
                      {q.change}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Ticker tape */}
        <div className="border-t border-navy-700 bg-navy-900 py-3 overflow-hidden ticker-wrap shrink-0">
          <div className="flex gap-8 animate-ticker whitespace-nowrap">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <span key={i} className="inline-flex items-center gap-2 text-ticker">
                <span className="text-navy-300 font-medium">{item.label}</span>
                <span className="text-white">{item.value}</span>
                {item.change !== undefined && (
                  <span className={`flex items-center gap-0.5 ${item.up ? 'text-market-up' : 'text-market-down'}`}>
                    {item.up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                    {item.change}
                  </span>
                )}
                <span className="text-navy-700 ml-2">|</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Why Choose Capital Assets ────────────────────────────────────── */}
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-white text-center mb-10 sm:mb-16">
            Why Choose Capital Assets?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURES.map(({ Icon, title, body }) => (
              <div key={title} className="card p-6 sm:p-8 space-y-5">
                <div className="w-11 h-11 rounded-lg bg-navy-750 border border-navy-700 flex items-center justify-center">
                  <Icon size={20} className="text-gold" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-white font-semibold text-[15px]">{title}</h3>
                  <p className="text-navy-200 text-sm leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Our Financial Suite ──────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 lg:py-24 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6 mb-8 lg:mb-10">
            <div className="max-w-xs space-y-3">
              <h2 className="text-3xl font-bold text-white">Our Financial Suite</h2>
              <p className="text-navy-200 text-sm leading-relaxed">
                Tailored solutions for wealth creation and capital preservation in
                the Nigerian market.
              </p>
            </div>
            <button className="btn-secondary text-sm self-start sm:self-center">
              Explore All Services
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICES.map(({ title, bg }) => (
              <div
                key={title}
                className="group relative rounded-xl overflow-hidden cursor-pointer aspect-[3/5] sm:aspect-[3/4]"
              >
                <div className="absolute inset-0" style={{ background: bg }} />
                <div className="absolute inset-0 bg-navy-950/0 group-hover:bg-navy-950/25 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                  <p className="text-white font-semibold text-sm mb-3">{title}</p>
                  <div className="h-0.5 w-8 bg-gold transition-all duration-300 group-hover:w-14" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                Ready to Take Control of<br />Your Financial Future?
              </h2>
              <p className="text-navy-200 text-[15px]">
                Open your account in minutes and start trading on Nigeria's premier exchanges.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to={ROUTES.REGISTER} className="btn-primary px-8 py-3 text-sm min-h-[44px]">
                Open Account Now
              </Link>
              <button className="btn-secondary px-8 py-3 text-sm min-h-[44px]">
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  )
}
