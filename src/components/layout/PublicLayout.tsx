import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'

/**
 * Wraps all public/marketing pages.
 * The ticker tape at the bottom is a nice-to-have — add it once the
 * market data service is wired up.
 */
export function PublicLayout() {
  return (
    <div className="min-h-screen bg-navy-950 flex flex-col">
      <Navbar />
      {/* pt-16 offsets the fixed navbar height */}
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      {/* TODO: <MarketTickerTape /> */}
    </div>
  )
}
