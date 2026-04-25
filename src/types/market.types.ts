export type OrderSide   = 'BUY' | 'SELL'
export type OrderType   = 'LIMIT' | 'MARKET' | 'STOP_LIMIT'
export type OrderStatus = 'OPEN' | 'PARTIAL' | 'FILLED' | 'CANCELLED' | 'REJECTED'

export interface MarketQuote {
  ticker:        string
  companyName:   string
  lastPriceKobo: number
  changeKobo:    number       // Can be negative
  changePct:     number       // Can be negative
  volume:        number
  openKobo:      number
  highKobo:      number
  lowKobo:       number
  isOpen:        boolean
}

export interface OHLCVCandle {
  time:        number  // Unix timestamp (seconds)
  open:        number  // In Naira (not kobo) — Lightweight Charts expects decimals
  high:        number
  low:         number
  close:       number
  volume:      number
}

export interface OrderBookEntry {
  priceKobo:  number
  quantity:   number
  totalUnits: number
}

export interface OrderBook {
  ticker: string
  bids:   OrderBookEntry[]  // Buy side — sorted descending by price
  asks:   OrderBookEntry[]  // Sell side — sorted ascending by price
  totalBidUnits: number
  totalAskUnits: number
}

export interface TradeOrder {
  id:          string
  ticker:      string
  companyName: string
  side:        OrderSide
  type:        OrderType
  status:      OrderStatus
  quantity:    number
  priceKobo:   number       // Limit price (0 for MARKET orders)
  filledQty:   number
  placedAt:    string       // ISO date string
  fees: {
    considerationKobo: number
    brokerageKobo:     number  // 1.35%
    vatKobo:           number  // 7.5% of brokerage
    cscsKobo:          number  // 0.30% gross value
    stampDutyKobo:     number  // 0.075%
    totalKobo:         number
  }
}

export interface TransactionRecord {
  id:           string
  refId:        string
  type:         'BUY' | 'SELL' | 'DIVIDEND' | 'DEPOSIT' | 'WITHDRAWAL'
  description:  string
  category:     string
  amountKobo:   number    // Positive = inflow, negative = outflow
  status:       'SETTLED' | 'PENDING' | 'FAILED'
  date:         string    // ISO date string
  order?:       TradeOrder
}
