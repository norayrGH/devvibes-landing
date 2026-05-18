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
          // Core black / deep grays
          ink: '#08090C',
          black: '#000000',
          night: '#0B0D12',
          charcoal: '#14171F',
          graphite: '#1C2029',
          steel: '#2A2F3A',
          // Light grays
          paper: '#F4F5F7',
          surface: '#E8EAEE',
          fog: '#B9BDC6',
          mute: '#7C828F',
          // Deep blue
          deep: '#0A1B3D',
          royal: '#0E2A5A',
          azure: '#1E40AF',
          cobalt: '#3B6BE4',
          sky: '#6EA3FF',
          // Yellow accent (used sparingly)
          gold: '#FFD60A',
          amber: '#FACC15',
          glow: '#FFE45C',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'glow': 'glow 2.8s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'scroll-x': 'scroll-x 40s linear infinite',
        'scroll-x-rev': 'scroll-x-rev 40s linear infinite',
        'beam': 'beam 8s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glow: {
          '0%': { opacity: '0.55' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'scroll-x': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'scroll-x-rev': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        beam: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      boxShadow: {
        'glow-blue': '0 0 60px -10px rgba(59, 107, 228, 0.45)',
        'glow-gold': '0 0 50px -10px rgba(255, 214, 10, 0.5)',
        'card': '0 30px 60px -20px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04)',
        'card-hover': '0 40px 80px -20px rgba(11, 27, 61, 0.7), 0 0 0 1px rgba(110, 163, 255, 0.18)',
      },
    },
  },
  plugins: [],
};
