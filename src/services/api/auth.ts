import { apiClient, type ApiResponse } from './client'
import type { User, AuthTokens, LoginCredentials, RegisterStep1, RegisterStep2 } from '@/types/auth.types'

export interface LoginResponse {
  user:   User
  tokens: AuthTokens
}

export interface RegisterStep1Response {
  sessionToken: string   // Temporary token passed to step 2
  message:      string
}

export const authApi = {
  /** POST /auth/login */
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const { data } = await apiClient.post<ApiResponse<LoginResponse>>('/auth/login', credentials)
    return data.data
  },

  /** POST /auth/register — Step 1: create account credentials */
  registerStep1: async (payload: RegisterStep1): Promise<RegisterStep1Response> => {
    const { data } = await apiClient.post<ApiResponse<RegisterStep1Response>>(
      '/auth/register/step1',
      payload
    )
    return data.data
  },

  /** POST /auth/register/account-type — Step 2: choose account type */
  registerStep2: async (
    payload: RegisterStep2,
    sessionToken: string
  ): Promise<LoginResponse> => {
    const { data } = await apiClient.post<ApiResponse<LoginResponse>>(
      '/auth/register/step2',
      payload,
      { headers: { 'X-Session-Token': sessionToken } }
    )
    return data.data
  },

  /** POST /auth/logout */
  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout')
  },

  /** POST /auth/refresh — called automatically by the Axios interceptor */
  refreshTokens: async (refreshToken: string): Promise<AuthTokens> => {
    const { data } = await apiClient.post<ApiResponse<AuthTokens>>('/auth/refresh', {
      refreshToken,
    })
    return data.data
  },

  /** GET /auth/me — fetch the current user (used on app load to validate session) */
  getMe: async (): Promise<User> => {
    const { data } = await apiClient.get<ApiResponse<User>>('/auth/me')
    return data.data
  },
}
