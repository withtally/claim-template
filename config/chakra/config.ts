import { Button } from '~/config/chakra/components/button'
import { UIconfig } from '~/config/UIconfig'
import { tabsTheme } from '~/config/chakra/components/tabs'
import { modalTheme } from '~/config/chakra/components/modal'
import { inputTheme } from '~/config/chakra/components/input'
import { selectTheme } from '~/config/chakra/components/select'

const { generateColorObject } = require("../../utils/generateColorObject")

const { toastBg, site, fonts, colors } = UIconfig

export const themeConfig = {
  initialColorMode:"light",
  components:{
    Button,
    Tabs:tabsTheme,
    Modal: modalTheme,
    Input: inputTheme,
    Select: selectTheme
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
    primary: generateColorObject(colors.primary),
  },
  styles: {
    global: () => ({
      "*": {
        borderColor: site.borderColor
      },
      body: {
        bg: site.bgColor,
        color: site.textColor,
        fontFamily: fonts.main
      },
    })
  },
}