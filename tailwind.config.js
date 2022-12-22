/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: '#121212',
        light: 'var(--light-background)',
        'txt-dark': '#a1c2e8',
        'txt-light': 'var(--light-text)',
      },
      screens: { xs: '300px' },
    },
  },
  plugins: [],
};
