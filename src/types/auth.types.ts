export type AccountTier = 'STANDARD' | 'PREMIUM' | 'INSTITUTIONAL' | 'HNW'

export type AccountType = 'INDIVIDUAL' | 'INSTITUTIONAL_CORPORATE'

export type KYCStatus = 'UNVERIFIED' | 'PENDING' | 'VERIFIED' | 'REJECTED'

export interface User {
  id:          string
  fullName:    string
  email:       string
  phone:       string
  tier:        AccountTier
  accountType: AccountType
  kycStatus:   KYCStatus
  memberSince: string   // ISO date string
  avatarUrl?:  string
}

export interface AuthTokens {
  accessToken:  string
  refreshToken: string
  expiresAt:    number  // Unix timestamp ms
}

export interface LoginCredentials {
  email:    string
  password: string
}

export interface RegisterStep1 {
  fullName:        string
  email:           string
  phone:           string
  password:        string
  confirmPassword: string
}

export interface RegisterStep2 {
  accountType: AccountType
}

export interface AuthState {
  user:         User | null
  tokens:       AuthTokens | null
  isLoading:    boolean
  isAuthenticated: boolean
}
