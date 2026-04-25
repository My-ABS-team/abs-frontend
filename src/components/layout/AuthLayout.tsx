import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'

/**
 * Wraps /login and /register pages.
 * Split-screen layout: background image left, form right.
 * The background imagery comes from each individual page so the auth
 * layout itself stays generic.
 */
export function AuthLayout() {
  return (
    <div className="min-h-screen bg-navy-950 flex">
      <Outlet />
      {/* Footer compliance text */}
      <div className="fixed bottom-4 inset-x-0 text-center">
        <p className="text-label text-navy-400">
          © 2024 Capital Assets Limited. Regulated by SEC, NGX, and NASD.
        </p>
      </div>
    </div>
  )
}
