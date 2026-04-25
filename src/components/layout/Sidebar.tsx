import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, LineChart, Briefcase, History,
  BookOpen, Calculator, Lock, Vault, LogOut, Settings,
} from 'lucide-react'
import { ROUTES } from '@/constants/routes'
import { useAuthStore } from '@/stores/authStore'
import { useUIStore } from '@/stores/uiStore'
import { cn } from '@/lib/utils'
import type { AccountTier } from '@/types/auth.types'

const NAV_ITEMS = [
  { label: 'Dashboard',       to: ROUTES.DASHBOARD,     icon: LayoutDashboard },
  { label: 'Market Terminal', to: ROUTES.MARKET,        icon: LineChart },
  { label: 'Portfolio',       to: ROUTES.PORTFOLIO,     icon: Briefcase },
  { label: 'Trade History',   to: ROUTES.TRADE_HISTORY, icon: History },
  { label: 'Research',        to: ROUTES.APP_RESEARCH,  icon: BookOpen },
  { label: 'Mutual Funds',    to: ROUTES.FUNDS,         icon: Vault },
  { label: 'Calculators',     to: ROUTES.CALCULATORS,   icon: Calculator },
  { label: 'The Vault',       to: ROUTES.VAULT,         icon: Vault },
  { label: 'Compliance',      to: ROUTES.COMPLIANCE,    icon: Lock },
] as const

const TIER_COLOURS: Record<AccountTier, string> = {
  STANDARD:      'text-navy-300',
  PREMIUM:       'text-gold',
  INSTITUTIONAL: 'text-market-up',
  HNW:           'text-gold',
}

export function Sidebar() {
  const user      = useAuthStore((s) => s.user)
  const logout    = useAuthStore((s) => s.logout)
  const collapsed = useUIStore((s) => s.isSidebarCollapsed)
  const navigate  = useNavigate()

  function handleLogout() {
    logout()
    navigate(ROUTES.LOGIN, { replace: true })
  }

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-40 flex flex-col bg-navy-900 border-r border-navy-700',
        'transition-all duration-200',
        collapsed ? 'w-sidebar-collapsed' : 'w-sidebar'
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-navy-700 shrink-0">
        <span className={cn('font-bold text-white uppercase tracking-widest text-xs', collapsed && 'hidden')}>
          Capital Assets
        </span>
        {collapsed && (
          <span className="font-bold text-gold text-sm mx-auto">CA</span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
        {NAV_ITEMS.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            title={collapsed ? label : undefined}
            className={({ isActive }) =>
              cn(
                isActive ? 'nav-item-active' : 'nav-item',
                collapsed && 'justify-center px-0'
              )
            }
          >
            <Icon size={18} className="shrink-0" />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Bottom: user profile + settings + logout */}
      <div className="border-t border-navy-700 p-3 space-y-1 shrink-0">
        <button className={cn('nav-item w-full', collapsed && 'justify-center px-0')}>
          <Settings size={16} className="shrink-0" />
          {!collapsed && <span>Settings</span>}
        </button>

        {user && !collapsed && (
          <div className="flex items-center gap-2.5 px-3 py-2">
            {/* Avatar initials */}
            <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
              <span className="text-gold text-xs font-bold">
                {user.fullName.split(' ').map((n) => n[0]).join('').slice(0, 2)}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-medium truncate">{user.fullName}</p>
              <p className={cn('text-label truncate', TIER_COLOURS[user.tier])}>
                {user.tier.replace('_', ' ')} TIER
              </p>
            </div>
          </div>
        )}

        <button
          onClick={handleLogout}
          className={cn('nav-item w-full text-market-down hover:text-market-down hover:bg-market-downBg', collapsed && 'justify-center px-0')}
        >
          <LogOut size={16} className="shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  )
}
