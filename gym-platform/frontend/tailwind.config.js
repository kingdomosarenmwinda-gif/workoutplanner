/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: '#D4AF37',
        'gold-dark': '#B8860B',
      },
    },
  },
  plugins: [],
}
