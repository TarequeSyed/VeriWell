/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Bio-Clinical Obsidian & Deep Forest
        forest: {
          950: '#071914', // Ultra-high contrast editorial text
          900: '#0A221C', // Signature deep obsidian borders & cards
          800: '#12382E', // Primary brand deep forest
          700: '#1A4F42',
          600: '#256656',
        },
        // On-Device Bio-Emerald Signature Tint ("The VeriWell Signature")
        emerald: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981', // Luminescent on-device hero mint
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
          950: '#022C22',
        },
        // Clinical Sage & Mint Accents
        sage: {
          50: '#F5FAF7',
          100: '#EBF4EF',
          200: '#D7EBDF', // Soft sage accent
          300: '#BEDECB',
          400: '#9BC7AC',
          500: '#6FA881',
        },
        // Warm Clinical Parchment Canvas
        cream: {
          50: '#FAF9F5', // Card and input background
          100: '#F4F2E9', // Signature warm parchment body background
          200: '#EAE7D8',
          300: '#DDD9C5',
          400: '#C7C2AA',
        },
        // Cloud Intelligence Atmospheric Sky
        sky: {
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          400: '#38BDF8',
          500: '#0EA5E9',
          600: '#0284C7',
          700: '#0369A1',
          900: '#0C4A6E',
          950: '#082F49',
        },
        // Clinical Nuance & Caution Amber
        caution: {
          amber: '#D97706',
          red: '#DC2626',
          green: '#059669',
        }
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Poppins', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
