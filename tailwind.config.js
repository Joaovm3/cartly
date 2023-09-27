/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        gray: {
          100: '#FEFEFE',
          200: '#F8F8F8',
          300: '#DBDCDD',
          400: '#A8A8B3',
          600: '#737380',
          700: '#47474C',
          800: '#313134',
          900: '#29292E'
        },

        orange: {
          500: '#FBAF00',
        },

        green: {
          500: '#4CB944',
        },

        red: {
          500: '#DB2B39'
        }
      }
    },
  },
  plugins: [],
}

