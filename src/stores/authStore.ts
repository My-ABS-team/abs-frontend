import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { User, AuthTokens } from '@/types/auth.types'

interface AuthStore {
  user:            User | null
  tokens:          AuthTokens | null
  isAuthenticated: boolean

  // Actions
  setAuth:  (user: User, tokens: AuthTokens) => void
  logout:   () => void
  setUser:  (user: User) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: {
        id:          'dev-user',
        fullName:    'Emmanuel Adeniyi',
        email:       'e.adeniyi@capitalassets.ng',
        phone:       '+2348012345678',
        tier:        'PREMIUM'      as const,
        accountType: 'INDIVIDUAL'   as const,
        kycStatus:   'VERIFIED'     as const,
        memberSince: '2024-01-12',
      },
      tokens:          null,
      isAuthenticated: true, // dev bypass — all protected routes accessible

      setAuth: (user, tokens) =>
        set({ user, tokens, isAuthenticated: true }),

      logout: () =>
        set({ user: null, tokens: null, isAuthenticated: false }),

      // Update user profile without touching tokens (e.g. after KYC update)
      setUser: (user) => set({ user }),
    }),
    {
      name:    'ca_auth',        // localStorage key
      storage: createJSONStorage(() => localStorage),
      // Only persist user + tokens; isAuthenticated is derived on rehydration
      partialize: (state) => ({ user: state.user, tokens: state.tokens }),
      // Re-derive isAuthenticated when store rehydrates from localStorage
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Keep isAuthenticated true when no persisted session exists (dev bypass)
          state.isAuthenticated = !!(state.user && state.tokens) || true
        }
      },
    }
  )
)
