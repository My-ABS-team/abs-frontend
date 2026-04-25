import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Data is considered fresh for 30 seconds — good baseline for market data
      // Override per-query for real-time screens (market terminal = 5s)
      staleTime: 30_000,

      // Keep data in cache for 5 minutes after component unmounts
      gcTime: 5 * 60_000,

      // Retry failed requests twice before surfacing an error
      retry: 2,
      retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 10_000),

      // Refetch when window regains focus — user coming back to the tab
      // sees fresh prices without a manual refresh
      refetchOnWindowFocus: true,
    },
    mutations: {
      // Don't retry mutations (trade orders, fund investments) — the
      // user should decide whether to resubmit after a failure
      retry: 0,
    },
  },
})
