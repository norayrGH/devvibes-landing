/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        dv: {
          // Primary accent
          electric: '#6C5CE7',
          electricSoft: '#A29BFE',
          cyan: '#00D2FF',
          // Dark scale
          ink: '#0A0A0F',
          dark: '#111118',
          charcoal: '#1A1A24',
          // Mid grays
          gray: '#6B6B80',
          slate: '#3D3D50',
          // Light scale
          paper: '#FAFAFE',
          surface: '#F0F0F8',
          stone: '#E0E0EC',
          mute: '#B8B8C8',
          // Keywords
          keyword: '#8888A0',
          keywordSoft: '#C4C4D4',
          // Accents
          green: '#00E676',
          orange: '#FF9100',
          red: '#FF5252',
        },
      },
      animation: {
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glow: {
          '0%': { opacity: '0.4' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
