import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'

import { PublicLayout }  from '@/components/layout/PublicLayout'
import { AuthLayout }    from '@/components/layout/AuthLayout'
import { AppLayout }     from '@/components/layout/AppLayout'
import { ProtectedRoute } from '@/components/shared/ProtectedRoute'
import { AuthRedirect }  from '@/components/shared/AuthRedirect'
import { ROUTES }        from '@/constants/routes'
import { NotFoundPage }  from '@/pages/NotFoundPage'

// ── Lazy-loaded pages ─────────────────────────────────────────────────────────
// Each page is its own chunk — only downloaded when the user navigates to it.
// The Market Terminal bundle is the largest (TradingView charts).

// Public pages
const LandingPage    = lazy(() => import('@/pages/LandingPage').then((m) => ({ default: m.LandingPage })))
const ResearchPage   = lazy(() => import('@/pages/ResearchPage').then((m) => ({ default: m.ResearchPage })))
const AdvisoryPage   = lazy(() => import('@/pages/AdvisoryPage').then((m) => ({ default: m.AdvisoryPage })))
const ContactPage    = lazy(() => import('@/pages/ContactPage').then((m) => ({ default: m.ContactPage })))
const ComingSoonPage = lazy(() => import('@/pages/ComingSoonPage').then((m) => ({ default: m.ComingSoonPage })))

// Auth pages
const LoginPage      = lazy(() => import('@/pages/LoginPage').then((m) => ({ default: m.LoginPage })))
const RegisterPage   = lazy(() => import('@/pages/RegisterPage').then((m) => ({ default: m.RegisterPage })))

// App pages
const DashboardPage      = lazy(() => import('@/pages/DashboardPage').then((m) => ({ default: m.DashboardPage })))
const MarketTerminalPage = lazy(() => import('@/pages/MarketTerminalPage').then((m) => ({ default: m.MarketTerminalPage })))
const VaultPage          = lazy(() => import('@/pages/VaultPage').then((m) => ({ default: m.VaultPage })))
const MutualFundsPage    = lazy(() => import('@/pages/MutualFundsPage').then((m) => ({ default: m.MutualFundsPage })))
const AppResearchPage    = lazy(() => import('@/pages/AppResearchPage').then((m) => ({ default: m.AppResearchPage })))
const CalculatorsPage    = lazy(() => import('@/pages/CalculatorsPage').then((m) => ({ default: m.CalculatorsPage })))
const CompliancePage     = lazy(() => import('@/pages/CompliancePage').then((m) => ({ default: m.CompliancePage })))
const TradeHistoryPage   = lazy(() => import('@/pages/TradeHistoryPage').then((m) => ({ default: m.TradeHistoryPage })))
const SettingsPage       = lazy(() => import('@/pages/SettingsPage').then((m) => ({ default: m.SettingsPage })))

// ── Page loading fallback ──────────────────────────────────────────────────────
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="space-y-3 w-64">
        <div className="skeleton h-4 w-3/4" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-2/3" />
      </div>
    </div>
  )
}

// ── Router definition ─────────────────────────────────────────────────────────
const router = createBrowserRouter([
  // ── Public routes — visible without login ──────────────────────────────────
  {
    element: <PublicLayout />,
    children: [
      { path: ROUTES.HOME,     element: <Suspense fallback={<PageLoader />}><LandingPage /></Suspense> },
      { path: ROUTES.RESEARCH,    element: <Suspense fallback={<PageLoader />}><ResearchPage /></Suspense> },
      { path: ROUTES.ADVISORY,    element: <Suspense fallback={<PageLoader />}><AdvisoryPage /></Suspense> },
      { path: ROUTES.CONTACT,     element: <Suspense fallback={<PageLoader />}><ContactPage /></Suspense> },
      { path: '/coming-soon',     element: <Suspense fallback={<PageLoader />}><ComingSoonPage /></Suspense> },
    ],
  },

  // ── Auth routes — redirect to dashboard if already logged in ───────────────
  {
    element: <AuthRedirect />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: ROUTES.LOGIN,            element: <Suspense fallback={<PageLoader />}><LoginPage /></Suspense> },
          { path: ROUTES.REGISTER,         element: <Suspense fallback={<PageLoader />}><RegisterPage /></Suspense> },
          // Step 2 of registration reuses RegisterPage with a different URL
          // so deep-linking to step 2 works correctly
          { path: ROUTES.REGISTER_ACCOUNT, element: <Suspense fallback={<PageLoader />}><RegisterPage /></Suspense> },
        ],
      },
    ],
  },

  // ── Protected routes — require authentication ──────────────────────────────
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: ROUTES.APP,
        element: <AppLayout />,
        children: [
          // /app redirects to /app/dashboard
          { index: true, element: <Navigate to={ROUTES.DASHBOARD} replace /> },
          {
            path: ROUTES.DASHBOARD,
            element: <Suspense fallback={<PageLoader />}><DashboardPage /></Suspense>,
          },
          {
            // :ticker is optional — page defaults to MTNN if omitted
            path: `${ROUTES.MARKET}/:ticker?`,
            element: <Suspense fallback={<PageLoader />}><MarketTerminalPage /></Suspense>,
          },
          {
            path: ROUTES.VAULT,
            element: <Suspense fallback={<PageLoader />}><VaultPage /></Suspense>,
          },
          {
            path: ROUTES.FUNDS,
            element: <Suspense fallback={<PageLoader />}><MutualFundsPage /></Suspense>,
          },
          {
            path: ROUTES.APP_RESEARCH,
            element: <Suspense fallback={<PageLoader />}><AppResearchPage /></Suspense>,
          },
          {
            path: ROUTES.CALCULATORS,
            element: <Suspense fallback={<PageLoader />}><CalculatorsPage /></Suspense>,
          },
          {
            path: ROUTES.COMPLIANCE,
            element: <Suspense fallback={<PageLoader />}><CompliancePage /></Suspense>,
          },
          {
            path: ROUTES.TRADE_HISTORY,
            element: <Suspense fallback={<PageLoader />}><TradeHistoryPage /></Suspense>,
          },
          {
            path: ROUTES.SETTINGS,
            element: <Suspense fallback={<PageLoader />}><SettingsPage /></Suspense>,
          },
        ],
      },
    ],
  },

  // ── 404 — catches everything else ──────────────────────────────────────────
  { path: '*', element: <NotFoundPage /> },
])

export function App() {
  return <RouterProvider router={router} />
}
