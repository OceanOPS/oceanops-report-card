/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    // Safelist para colores dinámicos usados en props
    { pattern: /^(text|bg|border|fill)-(goos-(blue|cyan|orange|green|gray|white)(-[1-9]00)?)$/ },
    // Safelist para grid columns dinámicos
    'grid-cols-1',
    'grid-cols-2',
    'grid-cols-3',
    'grid-cols-4',
    'grid-cols-5',
    'grid-cols-6',
  ],
  theme: {
    extend: {
      colors: {
        goos: {
          // Colores primarios (alias a los shades principales)
          'blue': '#184596',      // → blue-700
          'cyan': '#157FD2',      // → cyan-600
          'orange': '#F38B25',    // → orange-500
          'green': '#189669',     // → green-700
          'gray': '#333333',      // → gray-800
          'white': '#F0F0F0',

          // Blue Shades (Deep Blue)
          blue: {
            900: '#0B1E42',
            800: '#12336E',
            700: '#184596',
            600: '#205BC6',
            500: '#3975DF',
            400: '#6593E6',
            300: '#91B2ED',
            200: '#BDD1F4',
            100: '#E9F0FB',
          },

          // Cyan Shades (Light Blue)
          cyan: {
            900: '#072A46',
            800: '#0C4674',
            700: '#1062A2',
            600: '#157FD2',
            500: '#2E98EA',
            400: '#5DAFEF',
            300: '#8BC6F3',
            200: '#B9DDF8',
            100: '#E8F4FD',
          },

          // Orange Shades
          orange: {
            900: '#492604',
            800: '#793F06',
            700: '#AA5909',
            600: '#DA720B',
            500: '#F48B25',
            400: '#F6A555',
            300: '#F9BF86',
            200: '#FBD8B6',
            100: '#FEF2E7',
          },

          // Green Shades
          green: {
            900: '#0B422E',
            800: '#126E4D',
            700: '#189669',
            600: '#20C68A',
            500: '#39DFA4',
            400: '#65E6B8',
            300: '#91EDCC',
            200: '#BDF4E1',
            100: '#E9FBF5',
          },

          // Gray Shades (Black/Gray scale)
          gray: {
            900: '#0D0D0D',
            800: '#333333',
            700: '#595959',
            600: '#737373',
            500: '#8C8C8C',
            400: '#A6A6A6',
            300: '#BFBFBF',
            200: '#D9D9D9',
            100: '#F2F2F2',
          },
        }
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
        'roboto-condensed': ['Roboto Condensed', 'sans-serif'],
      },
      fontSize: {
        'xs': ['12px', '16px'],
        'sm': ['14px', '20px'],
        'base': ['16px', '24px'],
        'lg': ['18px', { lineHeight: '1.5' }],
        'xl': ['20px', { lineHeight: '1.5' }],
        '2xl': ['24px', '32px'],
        '3xl': ['30px', '36px'],
        '4xl': ['36px', '40px'],
        '5xl': ['48px', { lineHeight: '1.2' }],
        '6xl': ['60px', '60px'],
        '7xl': ['72px', '72px'],
        '8xl': ['96px', '96px'],
        '9xl': ['128px', '128px'],
      }
    }
  },
  plugins: [],
}
