import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, LineChart, History,
  BookOpen, Calculator, Lock, Vault, LogOut, Settings,
} from 'lucide-react'
import { ROUTES } from '@/constants/routes'
import { useAuthStore } from '@/stores/authStore'
import type { AccountTier } from '@/types/auth.types'

const NAV_ITEMS = [
  { label: 'Dashboard',       to: ROUTES.DASHBOARD,     icon: LayoutDashboard },
  { label: 'Market Terminal', to: ROUTES.MARKET,        icon: LineChart },
  { label: 'Trade History',   to: ROUTES.TRADE_HISTORY, icon: History },
  { label: 'Research',        to: ROUTES.APP_RESEARCH,  icon: BookOpen },
  { label: 'Mutual Funds',    to: ROUTES.FUNDS,         icon: Vault },
  { label: 'Calculators',     to: ROUTES.CALCULATORS,   icon: Calculator },
  { label: 'The Vault',       to: ROUTES.VAULT,         icon: Vault },
  { label: 'Compliance',      to: ROUTES.COMPLIANCE,    icon: Lock },
] as const

const TIER_LABELS: Record<AccountTier, string> = {
  STANDARD:      'Standard Tier',
  PREMIUM:       'Premium Tier',
  INSTITUTIONAL: 'Institutional',
  HNW:           'HNW Tier',
}

interface SidebarProps {
  open?: boolean
  onClose?: () => void
}

export function Sidebar({ open = false, onClose }: SidebarProps) {
  const user   = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate(ROUTES.LOGIN, { replace: true })
  }

  const initials = user?.fullName
    ? user.fullName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : 'EA'

  return (
    <>
      {/* Backdrop — only visible on mobile when drawer is open */}
      <div
        className={`sidebar-backdrop${open ? ' open' : ''}`}
        onClick={onClose}
      />

      <aside className={`sidebar${open ? ' open' : ''}`}>
        {/* Brand */}
        <div className="brand brand-lg" style={{ padding: '0 8px 8px', marginBottom: 24 }}>
          <span className="brand-logo">CA</span>
          <span className="brand-text">CAPITAL ASSETS</span>
        </div>

        {/* Nav */}
        <nav className="sidebar-nav">
          {NAV_ITEMS.map(({ label, to, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              title={label}
              onClick={onClose}
              className={({ isActive }) => `side-item${isActive ? ' active' : ''}`}
            >
              <Icon size={18} className="ico" />
              <span className="label-text">{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="sidebar-foot">
          {user && (
            <div className="user-card" style={{ marginBottom: 4 }}>
              <div className="avatar">{initials}</div>
              <div className="meta">
                <div className="name">{user.fullName}</div>
                <div className="tier">{TIER_LABELS[user.tier] ?? 'Member'}</div>
              </div>
            </div>
          )}

          <NavLink
            to={ROUTES.SETTINGS}
            onClick={onClose}
            className={({ isActive }) => `side-item${isActive ? ' active' : ''}`}
            style={{ marginTop: 4 }}
          >
            <Settings size={18} className="ico" />
            <span className="label-text">Settings</span>
          </NavLink>

          <button onClick={handleLogout} className="logout" style={{ width: '100%' }}>
            <LogOut size={16} />
            <span className="lbl">Logout</span>
          </button>
        </div>
      </aside>
    </>
  )
}
