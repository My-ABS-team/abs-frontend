import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { ROUTES } from '@/constants/routes'

// Base Axios instance — all API calls go through this
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
  timeout: 15_000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// ─── Request interceptor ─────────────────────────────────────────────────────
// Attach the auth token from localStorage to every outgoing request
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const raw = localStorage.getItem('ca_tokens')
    if (raw) {
      try {
        const tokens = JSON.parse(raw) as { accessToken: string }
        config.headers.Authorization = `Bearer ${tokens.accessToken}`
      } catch {
        // Corrupt token data — will be cleared by the response interceptor
      }
    }
    return config
  },
  (error) => Promise.reject(error)
)

// ─── Response interceptor ────────────────────────────────────────────────────
// Handle 401 (expired/invalid token) globally — redirect to login
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Clear stored credentials and redirect to login
      localStorage.removeItem('ca_tokens')
      localStorage.removeItem('ca_user')
      window.location.href = ROUTES.LOGIN
    }
    return Promise.reject(error)
  }
)

// ─── Typed API response wrapper ──────────────────────────────────────────────
// Your backend should return { data: T, message?: string }
export interface ApiResponse<T> {
  data:     T
  message?: string
}

export type ApiError = {
  message: string
  code?:   string
  errors?: Record<string, string[]>
}
