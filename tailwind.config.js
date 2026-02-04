/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        crm: {
          // Palette (exact)
          primary: '#2563EB', // Blue
          nav: '#0F172A', // Dark Navy
          bg: '#F8FAFC', // Light Gray (app background)
          surface: '#FFFFFF', // Cards / Panels
          border: '#E2E8F0', // Borders / Dividers
          text: '#0F172A', // Main text
          muted: 'rgba(15, 23, 42, 0.7)',
          success: '#16A34A',
          warning: '#F59E0B',
          danger: '#EF4444',
        },
      },
      boxShadow: {
        soft: '0 1px 2px rgba(15, 23, 42, 0.08)',
      },
    },
  },
  plugins: [],
}

