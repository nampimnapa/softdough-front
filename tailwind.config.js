/** @type {import('tailwindcss').Config} */
const {nextui} = require("@nextui-org/react");

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './layouts/***/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements-react/dist/js/**/*.js",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: '#73664B',
        secondary: '#C5B182',
        tertiary: '#73664B',
        fourth: '#FFFFDD'
        // Add more custom colors as needed
      },
    },
  },
  plugins: [require("tw-elements-react/dist/plugin.cjs"),
  require("daisyui"),
  nextui({
    themes: {
      light: {
        colors: {
          primary: '#73664B',
          secondary: '#C5B182',
          tertiary: '#F2B461',
          fourth: '#FFFFDD'
        },
      },
      dark: {
        colors: {
          primary: '#73664B',
          secondary: '#C5B182',
          tertiary: '#F2B461',
          fourth: '#FFFFDD'
        },
      },
    }
  })
  ]
  ,
}
