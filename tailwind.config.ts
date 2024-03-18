import { UIconfig } from './config/UIconfig'

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './utils/**/*.{js,ts,jsx,tsx}',
    './hooks/**/*.{js,ts,jsx,tsx}',
    './context/**/*.{js,ts,jsx,tsx}',
  ],
  // important: "#root",
  theme: {
    screens: {
      // Used to override main styles
      xxs: '1px',
      xs: '400px',
      xsm: '440px',
      sm: '640px',
      md: '768px',
      xmd: '850px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      transitionDuration: {
        DEFAULT: '300ms',
      },
      borderColor: {
        DEFAULT: '#1e69ff',
      },
      colors: {
        green: '#4EC272',
        blue: UIconfig.buttonBgColor(),
        'blue-grey': '#262b33',
        'blue-grey-lighter': '#3d424d',
        'card-background': '#262b33cc',
      },
    },
    fontFamily: {
      sans: ["'Poppins'", 'sans-serif'],
      caption: ["'Barlow Semi Condensed'", 'sans-serif'],
    },
  },
}
