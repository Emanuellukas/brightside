module.exports = {
  darkMode: 'selector',
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue'
  ],
  theme: {
    extend: {
      colors: {
          primary: {
            DEFAULT: '#FF8C42',
            light: '#FFB56B',
            dark: '#E6732F',
          },
          secondary: {
            DEFAULT: '#68A7AD',
            light: '#92CBD0',
            dark: '#4D7C81',
          },
        tertiary: {
          DEFAULT: '#8EBF87',
          light: '#B2D6AD',
          dark: '#6C9E65',
        },
        neutral: {
          50:  '#F9F9F9',
          100: '#F2F2F2',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
        yellowSoft: '#fefaf3',
        pinkSoft: '#F8BBD0',
        grayLight: '#E0E0E0',
        grayDark: '#616161',
        heaven: "#81D4FA",
        coral: "#ff7359",
      },
    },
  },
  plugins: [],
}