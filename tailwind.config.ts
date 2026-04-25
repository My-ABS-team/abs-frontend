import type { Config } from 'tailwindcss'

const config: Config = {
  // Only process files that actually use Tailwind — keeps builds fast
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  darkMode: 'class', // Toggle dark via a 'dark' class on <html>
  theme: {
    extend: {
      // ─── Brand colours ────────────────────────────────────────────────────
      colors: {
        // Dark navy palette — background layers stack from outermost to innermost
        navy: {
          950: '#040C18', // Outermost page background (nearly black)
          900: '#060F20', // Sidebar / left panel
          850: '#091428', // Secondary sidebar areas
          800: '#0C1A30', // Card backgrounds
          750: '#0F2040', // Elevated cards / modals
          700: '#162848', // Borders, dividers
          600: '#1E3560', // Hover states on dark surfaces
          500: '#2A4A7F', // Subtle highlights
          400: '#3A6099', // Muted text on dark
          300: '#5C80B0', // Secondary text
          200: '#8AABCC', // Tertiary text / icons
          100: '#B8CEDF', // Disabled states
        },

        // Gold — primary accent colour throughout the design
        gold: {
          DEFAULT: '#C9A84C', // Primary CTA buttons, active nav, accents
          50:  '#FDF8EC',
          100: '#F8ECC8',
          200: '#F0D78A',
          300: '#E5C05C',
          400: '#C9A84C', // ← default
          500: '#B08A35',
          600: '#8C6A22',
          700: '#6A4E15',
          800: '#48340B',
          900: '#291D05',
        },

        // Market state colours
        market: {
          up:    '#1D9E75', // Positive change — green
          upBg:  '#0A2E22', // Background for positive badges
          down:  '#E24B4A', // Negative change — red
          downBg:'#2E0F0F', // Background for negative badges
          flat:  '#8AABCC', // Unchanged
        },

        // Semantic — maps to the navy palette for dark-mode consistency
        border: {
          DEFAULT: '#162848', // navy-700
          subtle:  '#0F2040', // navy-750
          strong:  '#1E3560', // navy-600
        },
      },

      // ─── Typography ───────────────────────────────────────────────────────
      fontFamily: {
        // Use system font stack in dev; swap to 'DM Sans' or 'Geist' later
        sans: [
          '"DM Sans"',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'sans-serif',
        ],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'ui-monospace', 'monospace'],
      },

      fontSize: {
        // Financial UI needs precise type scale for stat numbers
        'ticker': ['11px', { lineHeight: '1.2', letterSpacing: '0.04em' }],
        'label':  ['12px', { lineHeight: '1.4', letterSpacing: '0.02em' }],
        'stat':   ['28px', { lineHeight: '1.1', fontWeight: '700' }],
        'stat-lg':['36px', { lineHeight: '1',   fontWeight: '700' }],
      },

      // ─── Spacing ──────────────────────────────────────────────────────────
      spacing: {
        'sidebar':        '240px', // Desktop sidebar width
        'sidebar-collapsed': '64px', // Icon-only collapsed state
        'topbar':         '56px',  // Top bar height
      },

      // ─── Border radius ────────────────────────────────────────────────────
      borderRadius: {
        card: '12px',  // Standard card radius
        chip: '6px',   // Badges, tags, status chips
      },

      // ─── Box shadow ───────────────────────────────────────────────────────
      // Keep subtle — the dark design relies on colour layering not shadows
      boxShadow: {
        'card':   '0 1px 3px rgba(0, 0, 0, 0.4)',
        'modal':  '0 8px 32px rgba(0, 0, 0, 0.6)',
        'glow-gold': '0 0 20px rgba(201, 168, 76, 0.25)',
      },

      // ─── Background gradients ─────────────────────────────────────────────
      backgroundImage: {
        // Subtle radial glow used on hero section and CTA cards
        'hero-glow': 'radial-gradient(ellipse 80% 60% at 50% -20%, rgba(201,168,76,0.12) 0%, transparent 70%)',
        // Card surface gradient for depth on elevated panels
        'card-surface': 'linear-gradient(145deg, #0F2040 0%, #0C1A30 100%)',
      },

      // ─── Animations ───────────────────────────────────────────────────────
      keyframes: {
        // Ticker tape scrolls left continuously
        'ticker-scroll': {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        // Subtle pulse for live price updates
        'price-flash': {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.5' },
        },
        // Fade in from below for panels / modals
        'slide-up': {
          '0%':   { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        // Shimmer for skeleton loaders
        'shimmer': {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition:  '200% 0' },
        },
      },
      animation: {
        'ticker':      'ticker-scroll 40s linear infinite',
        'price-flash': 'price-flash 0.4s ease-in-out',
        'slide-up':    'slide-up 0.2s ease-out',
        'shimmer':     'shimmer 1.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
