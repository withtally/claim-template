import { selectAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { UIconfig } from '~/config/UIconfig'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(selectAnatomy.keys)

const baseStyle = definePartsStyle({
  // define the part you're going to style
  field: {
    '& >option': {
      background: UIconfig.modal.bgColor,
    },
    _focus: {
      borderColor: `${UIconfig.colors.primary} !important`,
      boxShadow: `0 0 0 1px ${UIconfig.colors.primary} !important`,
    },
  },
  icon: {},
})

export const selectTheme = defineMultiStyleConfig({ baseStyle })
