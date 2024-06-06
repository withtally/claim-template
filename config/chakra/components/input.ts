import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { UIconfig } from '~/config/UIconfig'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(inputAnatomy.keys)

const baseStyle = definePartsStyle({
  field: {
    _focus: {
      borderColor: `${UIconfig.colors.primary} !important`,
      boxShadow: `0 0 0 1px ${UIconfig.colors.primary} !important`,

      _invalid: {
        borderColor: `${UIconfig.modal.errorColor} !important`,
        boxShadow: `0 0 0 1px ${UIconfig.modal.errorColor} !important`,

      }
    },
    _invalid: {
      borderColor: `${UIconfig.modal.errorColor} !important`,
      boxShadow: `0 0 0 1px ${UIconfig.modal.errorColor} !important`,
      _hover: {
        border: `1px solid  ${UIconfig.modal.errorColor} !important`,
      },
    }
  },
})

export const inputTheme = defineMultiStyleConfig({ baseStyle })
