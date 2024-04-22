import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { UIconfig } from '~/config/UIconfig'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(inputAnatomy.keys)

const baseStyle = definePartsStyle({
  field: {
    _focus: {
      borderColor: `${UIconfig.colors.primary} !important`,
      boxShadow: `0 0 0 1px ${UIconfig.colors.primary} !important`,
    },
  },
})

export const inputTheme = defineMultiStyleConfig({ baseStyle })
