import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { ROUTES } from '@/constants/routes'

/**
 * Wraps all /app routes.
 * Redirects to /login if the user is not authenticated, preserving
 * the attempted URL so we can send them back after login.
 */
export function ProtectedRoute() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const location = useLocation()

  if (!isAuthenticated) {
    return (
      <Navigate
        to={ROUTES.LOGIN}
        replace
        state={{ from: location }}  // LoginPage reads this to redirect back
      />
    )
  }

  return <Outlet />
}
