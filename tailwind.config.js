const defaultTheme = require('tailwindcss/defaultTheme');

const config = {
  darkMode: 'class',
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#8C6BFA',
        secondary: '#E9EEFF',
        dark: '#2E2170',
        gray: '#91949F',
        mediumgray: '#B2B7C7',
        lightgray: '#EBEDF6',
        terciaria: '#12D1DE',
      },
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};

export default config;
