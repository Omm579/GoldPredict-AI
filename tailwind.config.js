/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FFFBF0',
          100: '#FFF3D4',
          200: '#FFE4A8',
          300: '#FFD177',
          400: '#FFBE46',
          500: '#D4AF37',
          600: '#B8941F',
          700: '#9C7A12',
          800: '#7A5E0B',
          900: '#5C4608'
        },
        copper: {
          50: '#FDF4F0',
          100: '#F9E5DB',
          200: '#F2CCB7',
          300: '#E8B092',
          400: '#DD936D',
          500: '#CD7F32',
          600: '#B86D23',
          700: '#9C5B1A',
          800: '#7A4813',
          900: '#5C360E'
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-subtle': 'bounce 2s infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #D4AF37, 0 0 10px #D4AF37, 0 0 15px #D4AF37' },
          '100%': { boxShadow: '0 0 10px #D4AF37, 0 0 20px #D4AF37, 0 0 30px #D4AF37' }
        }
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #B8860B 100%)',
        'gradient-copper': 'linear-gradient(135deg, #CD7F32 0%, #FF8C00 50%, #B8700B 100%)',
        'gradient-dark': 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)'
      }
    },
  },
  plugins: [],
};