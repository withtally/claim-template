import { defineStyleConfig } from "@chakra-ui/react";
import { UIconfig } from "~/config/UIconfig";

export const Button = defineStyleConfig({
  baseStyle: {
    fontWeight: 500,
    textTransform: "none",
    borderRadius: "9999px",
    color: UIconfig.site.textColor,
  },
  sizes: {
    sm: {
      fontSize: "sm",
      px: 4,
      py: 3,
    },
    md: {
      fontSize: "md",
      px: 6,
      py: 4,
    },
    lg: {
      fontSize: "md",
      px: 8,
      py: "25px",
    },
  },
  variants: {
    outline: {
      border: "2px solid",
      borderColor: UIconfig.colors.primary,
      color: UIconfig.site.textColor,
      _hover: {
        bg: 'rgba(0,0,0,.15)',
      },
    },
    solid: {
      bg: "primary.600",
      color: UIconfig.site.textColor,
      _hover: {
        bg: "primary.800",
      },
      _disabled: {
        _hover: {
          bg: "primary.600 !important",
        },
      },
    },
    secondary: {
      border: "1px solid",
      borderColor: UIconfig.colors.secondary,
    },
    connectWallet: {
      border: "1px solid",
      borderColor: "rgb(107 114 128)",
      paddingX: "15px",
      borderRadius: "10px",
      _hover: {
        borderColor: "primary.600",
      },
      // bg:"#EEE0CB"
    },
  },
  defaultProps: {
    size: "lg",
    variant: "solid",
  },
});
