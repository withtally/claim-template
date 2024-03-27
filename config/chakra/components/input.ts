import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { UIconfig } from '~/config/UIconfig'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys)

const baseStyle = definePartsStyle({
  field: {
    _focusVisible:{
      'border-color': `${UIconfig.colors.primary} !important`,
      'box-shadow': `0 0 0 1px ${UIconfig.colors.primary} !important`
    }
  },
})

export const inputTheme = defineMultiStyleConfig({ baseStyle })
