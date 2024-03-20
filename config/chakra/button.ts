import { defineStyleConfig } from '@chakra-ui/react'
import { UIconfig } from '~/config/UIconfig'

export const Button = defineStyleConfig({
  // The styles all button have in common
  baseStyle: {
    fontWeight: 500,
    textTransform: 'none',
    borderRadius: '9999px', // <-- border radius is same for all variants and sizes
  },
  // Two sizes: sm and md
  sizes: {
    sm: {
      fontSize: 'sm',
      px: 4, // <-- px is short for paddingLeft and paddingRight
      py: 3, // <-- py is short for paddingTop and paddingBottom
    },
    md: {
      fontSize: 'md',
      px: 6, // <-- these values are tokens from the design system
      py: 4, // <-- these values are tokens from the design system
    },
    lg:{
      fontSize: 'md',
      px: 8, // <-- these values are tokens from the design system
      py: '25px', // <-- these values are tokens from the design system
    }
  },
  // Two variants: outline and solid
  variants: {
    outline: {
      border: '2px solid',
      borderColor: UIconfig.buttonBgColor(),
      color: 'purple.500',

    },
    solid: {
      bg: UIconfig.buttonBgColor(),
      color: 'white',
      _hover: {
        bg: UIconfig.buttonBgColor(60),
      },
    },
    secondary: {
      border: '1px solid',
      borderColor: UIconfig.SecondaryButtonColor(),
      borderRadius: '5px'
    },
  },
  // The default size and variant values
  defaultProps: {
    size: 'lg',
    variant: 'solid',
  },

})