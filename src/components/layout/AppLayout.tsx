import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { Sidebar } from './Sidebar'

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="app-shell">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="app-main">
        {/* Mobile header — only visible below 880px */}
        <header className="app-header show-mobile" style={{ display: 'none' }}>
          <button
            className="btn-icon"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open navigation"
          >
            <Menu size={20} />
          </button>
          <div className="brand" style={{ flex: 1, justifyContent: 'center' }}>
            <span className="brand-logo">CA</span>
            <span className="brand-text">CAPITAL ASSETS</span>
          </div>
          <div style={{ width: 36 }} />
        </header>

        <div className="app-content">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
