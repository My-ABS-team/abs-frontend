export type AssetClass = 'EQUITY' | 'BOND' | 'MUTUAL_FUND' | 'CASH'

export type Sector =
  | 'BANKING'
  | 'OIL_GAS'
  | 'FINTECH'
  | 'AGRICULTURE'
  | 'CONSUMER_GOODS'
  | 'INDUSTRIALS'
  | 'TELECOMS'
  | 'HEALTHCARE'

export interface PortfolioSummary {
  totalInvestmentValue: number  // Kobo — use formatNaira() before displaying
  walletBalance:        number  // Kobo
  ytdPerformance:       number  // Percentage e.g. 12.4
  ytdBenchmark:         number  // Percentage e.g. 8.2
  changeFromLastMonth:  number  // Kobo, can be negative
}

export interface SectorExposure {
  sector:     Sector
  percentage: number
  value:      number  // Kobo
}

export interface PortfolioDataPoint {
  date:  string  // ISO date string
  value: number  // Kobo
}

export interface Holding {
  ticker:          string
  companyName:     string
  sector:          Sector
  assetClass:      AssetClass
  quantity:        number
  averageCostKobo: number
  currentPriceKobo:number
  marketValueKobo: number
  unrealisedPnL:   number  // Kobo, can be negative
  unrealisedPnLPct:number  // Percentage
}
