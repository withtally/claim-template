import { UIconfig } from './config/UIconfig'

const { colors, site, modal } = UIconfig;

module.exports = {
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
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
        green: colors.selected,
        blue: colors.primary,
        'blue-grey': modal.bgColor,
        'blue-grey-lighter': colors.infoBlockBgColor,
        navbar: site.bgColor,
        maintext: site.textColor,
        gray: UIconfig.colors.gray
      },
    },
    fontFamily: {
      sans: UIconfig.fonts.main,
      caption: UIconfig.fonts.caption,
    },
  },
}
