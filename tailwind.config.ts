/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FED361',
        'primary-100': '#FFFBF4',
        'primary-200': '#FFF7E8',
        'primary-300': '#FFEECF',
        'primary-400': '#FEE6B2',
        'primary-500': '#FEDD8F',
        'primary-600': '#FED361',
        'primary-700': '#E3BD57',
        'primary-800': '#C5A34B',
        'primary-900': '#A1853D',
      },
    },
  },
  plugins: [],
}

