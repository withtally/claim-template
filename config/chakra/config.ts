import { Button } from '~/config/chakra/components/button'
import { UIconfig } from '~/config/UIconfig'
import { StyleFunctionProps } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
import { tabsTheme } from '~/config/chakra/components/tabs'

const { toastBg, primary } = UIconfig

export const themeConfig = {
  // config,
  components:{
    Button,
    Tabs:tabsTheme
  },
  breakpoints: {
    xxs: '1px',
    xs: '400px',
    xsm: '440px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  colors:{
    toastBg,
    primary
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: mode("white","black")(props),
        color: mode("black","white")(props),
      },
      h1:{
        fontFamily: "Poppins, sans-serif"
      },
    })
  },
}