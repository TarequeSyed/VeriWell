/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Modern Dribbble/ColorHunt Deep Slate & Charcoal
        forest: {
          950: '#020617', // High-contrast deep slate
          900: '#0F172A', // Primary structural slate borders & dark buttons
          800: '#1E293B', // Primary text & active card headers
          700: '#334155', // Secondary body copy
          600: '#475569', // Muted captions & secondary metadata
          500: '#64748B',
        },
        // Modern HealthTech Bio-Emerald (WCAG AAA contrast with white text)
        emerald: {
          50: '#ECFDF5',  // Soft calming mint tint
          100: '#D1FAE5', // Light mint accent
          200: '#A7F3D0', // Mint border
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981', // Luminescent accent
          600: '#059669', // Primary CTA emerald (prestigious, high-contrast)
          700: '#047857', // Hover state
          800: '#065F46', // Deep grounding emerald
          900: '#064E3B', // Dark emerald shadow & headers
          950: '#022C22',
        },
        // Fresh Clinical Canvas (Replacing dingy yellow parchment)
        cream: {
          50: '#FFFFFF',  // Pure crisp white card surface
          100: '#F8FAFC', // Ultra-clean, luminous slate-50 canvas
          200: '#F1F5F9', // Subtle divider
          300: '#E2E8F0', // Border tone
          400: '#CBD5E1',
        },
        // Clinical Sage & Mint Accents
        sage: {
          50: '#F8FAF9',
          100: '#F0FDF4',
          200: '#DCFCE7',
          300: '#BBF7D0',
          400: '#86EFAC',
          500: '#4ADE80',
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
