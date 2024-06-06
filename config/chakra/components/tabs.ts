import { tabsAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(tabsAnatomy.keys)

const baseStyle = definePartsStyle(() => ({
  tab: {
    borderColor: 'transparent',
    _selected: {
      color: 'primary.600 !important',
    },
  },
}))

export const tabsTheme = defineMultiStyleConfig({ baseStyle })
