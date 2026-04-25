import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { ROUTES } from '@/constants/routes'

/**
 * Wraps auth routes (/login, /register).
 * Redirects to dashboard if the user is already authenticated —
 * prevents logged-in users from seeing the login screen.
 */
export function AuthRedirect() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />
  }

  return <Outlet />
}
