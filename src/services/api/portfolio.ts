import { apiClient, type ApiResponse } from './client'
import type { PortfolioSummary, SectorExposure, PortfolioDataPoint, Holding } from '@/types/portfolio.types'

export type PortfolioRange = '1M' | '6M' | '1Y' | 'ALL'

export const portfolioApi = {
  /** GET /portfolio/summary */
  getSummary: async (): Promise<PortfolioSummary> => {
    const { data } = await apiClient.get<ApiResponse<PortfolioSummary>>('/portfolio/summary')
    return data.data
  },

  /** GET /portfolio/growth?range=6M */
  getGrowthHistory: async (range: PortfolioRange): Promise<PortfolioDataPoint[]> => {
    const { data } = await apiClient.get<ApiResponse<PortfolioDataPoint[]>>(
      '/portfolio/growth',
      { params: { range } }
    )
    return data.data
  },

  /** GET /portfolio/sectors */
  getSectorExposure: async (): Promise<SectorExposure[]> => {
    const { data } = await apiClient.get<ApiResponse<SectorExposure[]>>('/portfolio/sectors')
    return data.data
  },

  /** GET /portfolio/holdings */
  getHoldings: async (): Promise<Holding[]> => {
    const { data } = await apiClient.get<ApiResponse<Holding[]>>('/portfolio/holdings')
    return data.data
  },
}
