# Capital Assets Limited — Frontend

Premium Stockbroking & Asset Management platform for the Nigerian market (NGX / NASD).

## Quick start

```bash
cp .env.example .env.local     # fill in VITE_API_BASE_URL etc.
npm install
npm run dev                    # http://localhost:5173
```

## Tech stack

| Layer            | Library                        | Why                                              |
|------------------|--------------------------------|--------------------------------------------------|
| Build            | Vite + TypeScript              | Fast HMR, type safety for financial data         |
| Routing          | React Router DOM v6            | `createBrowserRouter`, nested layouts            |
| Server state     | TanStack Query v5              | Polling, caching, optimistic updates             |
| Client state     | Zustand                        | Auth session, sidebar, active ticker             |
| Styling          | Tailwind CSS v3                | Custom navy/gold token config                    |
| Forms            | React Hook Form + Zod          | Schema validation, no re-renders on input        |
| Charts           | Recharts (area/pie) + Lightweight Charts (OHLCV) | Right tool per chart type  |
| HTTP             | Axios                          | Interceptors for auth token + 401 redirect       |
| Maths            | decimal.js                     | Precise NGX fee calculations (no float errors)   |
| Icons            | Lucide React                   | Tree-shakeable SVGs                              |

## Project structure

```
src/
├── components/
│   ├── layout/     # PublicLayout, AppLayout, AuthLayout, Navbar, Sidebar
│   ├── shared/     # StatCard, StatusBadge, CurrencyDisplay, MarketTickerTape, …
│   └── ui/         # shadcn/ui primitives (add as needed: npx shadcn@latest add button)
├── constants/      # routes.ts — single source of truth for all paths
├── features/       # One folder per screen: dashboard/, auth/, market-terminal/, …
│   └── dashboard/
│       ├── components/   # PortfolioChart, SectorExposure, MarketWatch, QuickTrade
│       ├── hooks/        # useDashboard.ts — all TanStack Query hooks for this screen
│       └── DashboardPage.tsx
├── hooks/          # useSessionValidation, useDebounce, useMediaQuery
├── lib/            # utils.ts (formatNaira, calculateFees, cn), queryClient.ts
├── pages/          # Thin re-exports — real code lives in features/
├── services/api/   # client.ts (axios), auth.ts, portfolio.ts, market.ts
├── stores/         # authStore.ts, uiStore.ts (Zustand)
└── types/          # auth.types.ts, portfolio.types.ts, market.types.ts
```

## Key conventions

### Money is always stored as kobo (integers)
```ts
// ✅ Correct — pass kobo to formatNaira
formatNaira(6845090025)  // → "₦68,450,900.25"

// ❌ Never do raw naira maths
const total = 0.1 + 0.2  // → 0.30000000000000004
```

### Use `calculateFees()` for NGX trade cost estimation
```ts
import { calculateFees } from '@/lib/utils'
const fees = calculateFees(priceKobo, quantity)
// → { considerationKobo, brokerageKobo (1.35%), vatKobo (7.5%), cscsKobo (0.30%), stampDutyKobo (0.075%), totalKobo }
```

### Use route constants, never string literals
```ts
import { ROUTES } from '@/constants/routes'
navigate(ROUTES.MARKET_TICKER('MTNN'))   // → /app/market/MTNN
// Not: navigate('/app/market/MTNN')
```

### TanStack Query owns server state, Zustand owns UI state
- Data that comes from an API endpoint → TanStack Query
- Sidebar open/closed, active ticker, notifications → Zustand

## Adding a new page

1. Create `src/features/new-feature/NewFeaturePage.tsx`
2. Create `src/features/new-feature/hooks/useNewFeature.ts`
3. Add the route constant to `src/constants/routes.ts`
4. Add the route to `src/App.tsx` (choose the right layout group)
5. Add the nav item to `src/components/layout/Sidebar.tsx`
6. Create `src/pages/NewFeaturePage.tsx` as a thin re-export

## Adding shadcn/ui components

```bash
npx shadcn@latest add dialog
npx shadcn@latest add select
npx shadcn@latest add sheet    # for mobile sidebar drawer
```

Components are copied into `src/components/ui/` — you own the source.

## Environment variables

```env
VITE_API_BASE_URL=http://localhost:3000/api   # Backend REST API
VITE_WS_URL=ws://localhost:3000/ws/market     # Live price WebSocket
VITE_MARKET_DATA_KEY=...                      # NGX data provider key
VITE_APP_ENV=development                      # Enables React Query DevTools
```
