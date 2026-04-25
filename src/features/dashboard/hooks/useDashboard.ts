import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { portfolioApi, type PortfolioRange } from '@/services/api/portfolio'
import { marketApi, type PlaceOrderPayload } from '@/services/api/market'
import { useUIStore } from '@/stores/uiStore'

// ── Query key factory — keeps cache keys consistent ───────────────────────────
// Change a key here and every query using it invalidates correctly.
export const dashboardKeys = {
  all:         ['dashboard'] as const,
  summary:     () => [...dashboardKeys.all, 'summary'] as const,
  growth:      (range: PortfolioRange) => [...dashboardKeys.all, 'growth', range] as const,
  sectors:     () => [...dashboardKeys.all, 'sectors'] as const,
  marketWatch: () => ['marketWatch'] as const,
  activeOrders:() => ['activeOrders'] as const,
}

/** Portfolio summary — total value, wallet, YTD */
export function usePortfolioSummary() {
  return useQuery({
    queryKey: dashboardKeys.summary(),
    queryFn:  portfolioApi.getSummary,
  })
}

/** Historical portfolio growth for the chart. Re-fetches when range changes. */
export function usePortfolioGrowth(range: PortfolioRange) {
  return useQuery({
    queryKey: dashboardKeys.growth(range),
    queryFn:  () => portfolioApi.getGrowthHistory(range),
    // Growth history rarely changes — stay fresh for 5 minutes
    staleTime: 5 * 60_000,
  })
}

/** Sector exposure pie/treemap data */
export function useSectorExposure() {
  return useQuery({
    queryKey: dashboardKeys.sectors(),
    queryFn:  portfolioApi.getSectorExposure,
    staleTime: 5 * 60_000,
  })
}

/**
 * Market Watch — live prices for the watchlist table.
 * Polls every 15 seconds so prices update without a page refresh.
 */
export function useMarketWatch() {
  return useQuery({
    queryKey: dashboardKeys.marketWatch(),
    queryFn:  marketApi.getMarketWatch,
    refetchInterval: 15_000,
    // Continue polling even when the tab is backgrounded
    refetchIntervalInBackground: false,
  })
}

/** Active open orders in the orders table */
export function useActiveOrders() {
  return useQuery({
    queryKey: dashboardKeys.activeOrders(),
    queryFn:  marketApi.getActiveOrders,
    refetchInterval: 30_000,
  })
}

/**
 * Quick Trade mutation.
 * On success: invalidates market watch, active orders, and portfolio summary
 * so all three widgets refresh with the new position.
 */
export function useQuickTrade() {
  const queryClient   = useQueryClient()
  const showNotification = useUIStore((s) => s.showNotification)

  return useMutation({
    mutationFn: (payload: PlaceOrderPayload) => marketApi.placeOrder(payload),
    onSuccess: (order) => {
      showNotification('success', `Order placed — ${order.ticker} ${order.side} ${order.quantity.toLocaleString()} units`)
      // Invalidate affected caches
      queryClient.invalidateQueries({ queryKey: dashboardKeys.summary() })
      queryClient.invalidateQueries({ queryKey: dashboardKeys.marketWatch() })
      queryClient.invalidateQueries({ queryKey: dashboardKeys.activeOrders() })
    },
    onError: (err: Error) => {
      showNotification('error', err.message ?? 'Order failed — please try again')
    },
  })
}

/** Convenience hook that bundles the range toggle state with the growth query */
export function usePortfolioChart() {
  const [range, setRange] = useState<PortfolioRange>('6M')
  const query = usePortfolioGrowth(range)
  return { range, setRange, ...query }
}
