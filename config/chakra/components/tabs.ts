import { tabsAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tabsAnatomy.keys)

const baseStyle = definePartsStyle((props) => ({
  tab: {
    color: 'red !important',
    _selected: {
      // color: mode('yellow', 'primary.600')(props),
      color: 'primary.600',
    },
  },
}))

export const tabsTheme = defineMultiStyleConfig({ baseStyle })