import { create } from 'zustand'

interface UIStore {
  // Sidebar state — controls the app layout
  isSidebarOpen:     boolean
  isSidebarCollapsed: boolean  // Desktop icon-only mode
  toggleSidebar:     () => void
  setSidebarOpen:    (open: boolean) => void
  toggleSidebarCollapse: () => void

  // Active ticker in Market Terminal
  activeTicker: string
  setActiveTicker: (ticker: string) => void

  // Global notification / toast (add a proper toast library later)
  notification: { type: 'success' | 'error' | 'info'; message: string } | null
  showNotification: (type: 'success' | 'error' | 'info', message: string) => void
  clearNotification: () => void
}

export const useUIStore = create<UIStore>((set) => ({
  isSidebarOpen:      true,
  isSidebarCollapsed: false,
  toggleSidebar:      () => set((s) => ({ isSidebarOpen: !s.isSidebarOpen })),
  setSidebarOpen:     (open) => set({ isSidebarOpen: open }),
  toggleSidebarCollapse: () =>
    set((s) => ({ isSidebarCollapsed: !s.isSidebarCollapsed })),

  activeTicker:    'MTNN',
  setActiveTicker: (ticker) => set({ activeTicker: ticker }),

  notification: null,
  showNotification: (type, message) => {
    set({ notification: { type, message } })
    // Auto-clear after 4 seconds
    setTimeout(() => set({ notification: null }), 4000)
  },
  clearNotification: () => set({ notification: null }),
}))
