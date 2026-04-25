import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import Decimal from 'decimal.js'

/**
 * Merge Tailwind class names safely — resolves conflicts like
 * "p-2 p-4" → "p-4" and handles conditional classes cleanly.
 * Import as `cn` throughout the project.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

// ─── Monetary formatting ─────────────────────────────────────────────────────
// All monetary values are stored in KOBO (smallest unit, like cents).
// Always convert to naira before displaying.

const nairaFormatter = new Intl.NumberFormat('en-NG', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

/**
 * Format kobo integer to display Naira string.
 * @example formatNaira(6845090025) → "₦68,450,900.25"
 */
export function formatNaira(kobo: number): string {
  const naira = new Decimal(kobo).dividedBy(100).toNumber()
  return `₦${nairaFormatter.format(naira)}`
}

/**
 * Format a plain Naira amount (not kobo).
 * Use this when the backend already returns values in Naira.
 * @example formatNairaAmount(68450900.25) → "₦68,450,900.25"
 */
export function formatNairaAmount(naira: number): string {
  return `₦${nairaFormatter.format(naira)}`
}

/**
 * Compact format for large numbers in stat cards.
 * @example formatNairaCompact(6845090025) → "₦68.5M"
 */
export function formatNairaCompact(kobo: number): string {
  const naira = new Decimal(kobo).dividedBy(100).toNumber()
  if (naira >= 1_000_000_000) return `₦${(naira / 1_000_000_000).toFixed(1)}B`
  if (naira >= 1_000_000)     return `₦${(naira / 1_000_000).toFixed(1)}M`
  if (naira >= 1_000)         return `₦${(naira / 1_000).toFixed(1)}K`
  return `₦${nairaFormatter.format(naira)}`
}

// ─── Percentage formatting ────────────────────────────────────────────────────

const pctFormatter = new Intl.NumberFormat('en-NG', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 2,
  signDisplay: 'exceptZero',
})

/**
 * Format a percentage change with sign.
 * @example formatPct(1.24) → "+1.24%"  |  formatPct(-0.5) → "-0.50%"
 */
export function formatPct(value: number): string {
  return `${pctFormatter.format(value)}%`
}

// ─── Fee calculations (NGX standard) ─────────────────────────────────────────
// All inputs and outputs in KOBO.

const BROKERAGE_RATE  = new Decimal('0.0135')  // 1.35%
const VAT_RATE        = new Decimal('0.075')   // 7.5% on brokerage
const CSCS_RATE       = new Decimal('0.003')   // 0.30% gross value
const STAMP_DUTY_RATE = new Decimal('0.00075') // 0.075%

export interface FeeBreakdown {
  considerationKobo: number
  brokerageKobo:     number
  vatKobo:           number
  cscsKobo:          number
  stampDutyKobo:     number
  totalKobo:         number
}

/**
 * Calculate NGX transaction fees for a trade.
 * Uses Decimal.js to avoid floating-point errors in financial math.
 */
export function calculateFees(priceKobo: number, quantity: number): FeeBreakdown {
  const consideration = new Decimal(priceKobo).times(quantity)
  const brokerage     = consideration.times(BROKERAGE_RATE).ceil()
  const vat           = brokerage.times(VAT_RATE).ceil()
  const cscs          = consideration.times(CSCS_RATE).ceil()
  const stampDuty     = consideration.times(STAMP_DUTY_RATE).ceil()
  const total         = consideration.plus(brokerage).plus(vat).plus(cscs).plus(stampDuty)

  return {
    considerationKobo: consideration.toNumber(),
    brokerageKobo:     brokerage.toNumber(),
    vatKobo:           vat.toNumber(),
    cscsKobo:          cscs.toNumber(),
    stampDutyKobo:     stampDuty.toNumber(),
    totalKobo:         total.toNumber(),
  }
}

// ─── Date formatting ──────────────────────────────────────────────────────────

const dateFormatter = new Intl.DateTimeFormat('en-NG', {
  day:   '2-digit',
  month: 'short',
  year:  'numeric',
})

const dateTimeFormatter = new Intl.DateTimeFormat('en-NG', {
  day:    '2-digit',
  month:  'short',
  year:   'numeric',
  hour:   '2-digit',
  minute: '2-digit',
  hour12: false,
})

export function formatDate(isoString: string): string {
  return dateFormatter.format(new Date(isoString))
}

export function formatDateTime(isoString: string): string {
  return dateTimeFormatter.format(new Date(isoString))
}

// ─── Misc helpers ─────────────────────────────────────────────────────────────

/** Returns "price-up" | "price-down" | "price-flat" Tailwind class */
export function priceClass(change: number): string {
  if (change > 0) return 'price-up'
  if (change < 0) return 'price-down'
  return 'price-flat'
}

/** Returns "+ " | "- " prefix for change values */
export function changePrefix(change: number): string {
  return change >= 0 ? '+' : ''
}
