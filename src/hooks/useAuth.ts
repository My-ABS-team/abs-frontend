/**
 * Top-level auth hook — validates the stored session on app load.
 * Call this once in a high-level component (e.g. App.tsx or a wrapper).
 * If the access token is expired the Axios interceptor handles the redirect.
 */
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '@/stores/authStore'
import { authApi } from '@/services/api/auth'

export function useSessionValidation() {
  const { isAuthenticated, setUser, logout } = useAuthStore()

  // Only run if we think we're authenticated (have a stored token)
  useQuery({
    queryKey: ['session'],
    queryFn:  authApi.getMe,
    enabled:  isAuthenticated,
    // Run once on mount — the Axios interceptor handles 401s per-request
    staleTime: Infinity,
    retry: false,
    // Update the user object in case profile data changed since last session
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    select: (user) => { setUser(user); return user },
  })
}
