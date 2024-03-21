import { tabsAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tabsAnatomy.keys)

const baseStyle = definePartsStyle(() => ({
  tab: {
    color: 'red !important',
    _selected: {
      color: 'primary.600',
    },
  },
}))

export const tabsTheme = defineMultiStyleConfig({ baseStyle })