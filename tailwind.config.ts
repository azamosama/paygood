import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        pg: {
          primary: '#0F766E', // deep teal/green
          primaryDark: '#0B5E57',
          accent: '#D4A373', // gold/amber
          background: '#F8FAFC',
          card: '#FFFFFF',
          success: '#16A34A',
          text: '#111827',
          mutedText: '#6B7280'
        }
      },
      borderRadius: {
        lg: '12px',
        md: '10px',
        sm: '8px'
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', 'Inter', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol']
      }
    }
  },
  plugins: []
} satisfies Config;

