module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './utils/**/*.{js,ts,jsx,tsx}',
    './hooks/**/*.{js,ts,jsx,tsx}',
    './context/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      // Used to override main styles
      xxs: '1px',
      xs: '400px',
      xsm: '440px',
      sm: '640px',
      md: '768px',
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
        blue: '#1e69ff',
        'blue-grey': '#262b33',
        'blue-grey-lighter': '#3d424d',
      },
    },
    fontFamily: {
      sans: ["'Gilroy'", 'sans-serif'],
    },
  },
}
