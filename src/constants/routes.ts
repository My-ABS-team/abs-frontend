/**
 * Centralised route constants.
 * Use these everywhere instead of string literals — refactoring a path
 * then only needs one change here, not a grep across the whole codebase.
 */

export const ROUTES = {
  // ── Public ──────────────────────────────────────────────────────────────
  HOME:     '/',
  RESEARCH: '/research',
  ADVISORY: '/advisory',
  CONTACT:  '/contact',

  // ── Auth ────────────────────────────────────────────────────────────────
  LOGIN:             '/login',
  REGISTER:          '/register',
  REGISTER_ACCOUNT:  '/register/account-type',

  // ── App (protected) ──────────────────────────────────────────────────────
  APP:              '/app',
  DASHBOARD:        '/app/dashboard',
  // :ticker is optional — /app/market opens with a default ticker
  MARKET:           '/app/market',
  MARKET_TICKER:    (ticker: string) => `/app/market/${ticker}`,
  PORTFOLIO:        '/app/portfolio',
  VAULT:            '/app/vault',
  FUNDS:            '/app/funds',
  APP_RESEARCH:     '/app/research',
  CALCULATORS:      '/app/calculators',
  COMPLIANCE:       '/app/compliance',
  TRADE_HISTORY:    '/app/trade-history',
} as const

// Type helper — lets you use ROUTES values as types in props
export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES]
