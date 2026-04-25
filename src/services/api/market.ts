import { apiClient, type ApiResponse } from './client'
import type { MarketQuote, OHLCVCandle, OrderBook, TradeOrder, TransactionRecord } from '@/types/market.types'
import type { OrderSide, OrderType } from '@/types/market.types'

export type ChartRange = '1D' | '1W' | '1M' | '1Y'

export interface PlaceOrderPayload {
  ticker:    string
  side:      OrderSide
  type:      OrderType
  quantity:  number
  /** Required for LIMIT and STOP_LIMIT orders. In kobo. */
  priceKobo?: number
}

export const marketApi = {
  /** GET /market/watch — top tickers for the Market Watch widget */
  getMarketWatch: async (): Promise<MarketQuote[]> => {
    const { data } = await apiClient.get<ApiResponse<MarketQuote[]>>('/market/watch')
    return data.data
  },

  /** GET /market/quote/:ticker */
  getQuote: async (ticker: string): Promise<MarketQuote> => {
    const { data } = await apiClient.get<ApiResponse<MarketQuote>>(`/market/quote/${ticker}`)
    return data.data
  },

  /** GET /market/candles/:ticker?range=1D */
  getCandles: async (ticker: string, range: ChartRange): Promise<OHLCVCandle[]> => {
    const { data } = await apiClient.get<ApiResponse<OHLCVCandle[]>>(
      `/market/candles/${ticker}`,
      { params: { range } }
    )
    return data.data
  },

  /** GET /market/orderbook/:ticker */
  getOrderBook: async (ticker: string): Promise<OrderBook> => {
    const { data } = await apiClient.get<ApiResponse<OrderBook>>(`/market/orderbook/${ticker}`)
    return data.data
  },

  /** POST /market/orders — place a trade order */
  placeOrder: async (payload: PlaceOrderPayload): Promise<TradeOrder> => {
    const { data } = await apiClient.post<ApiResponse<TradeOrder>>('/market/orders', payload)
    return data.data
  },

  /** DELETE /market/orders/:id — cancel an open order */
  cancelOrder: async (orderId: string): Promise<void> => {
    await apiClient.delete(`/market/orders/${orderId}`)
  },

  /** GET /market/orders — active open orders */
  getActiveOrders: async (): Promise<TradeOrder[]> => {
    const { data } = await apiClient.get<ApiResponse<TradeOrder[]>>('/market/orders')
    return data.data
  },

  /** GET /vault/transactions */
  getTransactions: async (params?: {
    ticker?: string
    status?: string
    from?: string
    to?: string
  }): Promise<TransactionRecord[]> => {
    const { data } = await apiClient.get<ApiResponse<TransactionRecord[]>>(
      '/vault/transactions',
      { params }
    )
    return data.data
  },
}
