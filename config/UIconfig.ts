export const UIconfig = {
  primaryWithOpacity: (opacity: number = 100) => `rgb(0 153 204 / ${opacity}%)`,
  primary:{
    100: 'hsl(195 100% 90%)',
    200: 'hsl(195 100% 80%)',
    300: 'hsl(195 100% 70%)',
    400: 'hsl(195 100% 60%)',
    500: 'hsl(195 100% 50%)',
    600: 'hsl(195 100% 40%)', /* Base color */
    700: 'hsl(195 100% 30%)',
    800: 'hsl(195 100% 20%)',
    900: 'hsl(195 100% 10%)',
  },
  toastBg:{
    success: '#9AE6B4',
    error: '#FEB2B2',
    info: '#90cdf4',
    warning: '#FBD38D',
    loading: '#90cdf4'
  }
}