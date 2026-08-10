/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          950: '#0B0F19',
          900: '#111827',
          800: '#1E293B',
        },
        emerald: {
          400: '#34D399',
          500: '#10B981',
        },
        blue: {
          400: '#60A5FA',
          500: '#3B82F6',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
