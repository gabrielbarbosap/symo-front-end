const config = {
  darkMode: 'class',
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        light: {
          primary: '#8C6BFA',
          secondary: '#E9EEFF',
          dark: '#2E2170',
          gray: '#91949F',
          mediumgray: '#B2B7C7',
          lightgray: '#EBEDF6',
          terciaria: '#12D1DE',
        },
        dark: {
          primary: '#8C6BFA',
          secondary: '#E9EEFF',
          dark: '#2E2170',
          gray: '#91949F',
          mediumgray: '#B2B7C7',
          lightgray: '#EBEDF6',
          terciaria: '#12D1DE',
        },
      },
    },
  },
  plugins: [],
};

export default config;
