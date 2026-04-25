import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { useUIStore } from '@/stores/uiStore'
import { cn } from '@/lib/utils'

/**
 * Wraps all protected /app routes.
 * Sidebar width is driven by the Zustand uiStore so the main content
 * area shifts smoothly when sidebar collapses.
 */
export function AppLayout() {
  const collapsed = useUIStore((s) => s.isSidebarCollapsed)

  return (
    <div className="min-h-screen bg-navy-950 flex">
      <Sidebar />

      {/* Main content — offset by sidebar width */}
      <main
        className={cn(
          'flex-1 flex flex-col min-h-screen overflow-x-hidden',
          'transition-all duration-200',
          collapsed ? 'ml-sidebar-collapsed' : 'ml-sidebar'
        )}
      >
        <div className="flex-1 p-6">
          <Outlet />
        </div>

        {/* Footer */}
        <footer className="border-t border-navy-700 px-6 py-3 flex items-center justify-between">
          <p className="text-label text-navy-400">
            © 2024 Capital Assets Limited. Regulated by SEC, NGX, and NASD.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-label text-navy-400 hover:text-navy-200 transition-colors">Privacy Policy</a>
            <a href="#" className="text-label text-navy-400 hover:text-navy-200 transition-colors">Terms of Service</a>
            <a href="#" className="text-label text-navy-400 hover:text-navy-200 transition-colors">Investor Relations</a>
          </div>
        </footer>
      </main>
    </div>
  )
}
