/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          900: '#0F2923',
          800: '#153B32', // Primary brand deep forest
          700: '#1E4D42',
          600: '#2A6658',
        },
        sage: {
          100: '#F0F6F2',
          200: '#DDECE2', // Soft sage accent
          300: '#C2DEC9',
          400: '#99C4A6',
          500: '#6FA881',
        },
        cream: {
          50: '#FDFCF9',
          100: '#F6F5EF', // Warm background cream
          200: '#EFECE1',
          300: '#E3DFD0',
        },
        caution: {
          amber: '#B45309',
          red: '#B91C1C',
          green: '#15803D',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
