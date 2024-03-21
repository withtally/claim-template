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
      borderColor: UIconfig.primaryWithOpacity(),
      color: 'purple.500',

    },
    solid: {
      bg: 'primary.600',
      color: 'white',
      _hover: {
        bg: 'primary.800',
      },
    },
  },
  // The default size and variant values
  defaultProps: {
    size: 'lg',
    variant: 'solid',
  },

})