import { menuAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { UIconfig } from "~/config/UIconfig";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys);

// define the base component styles
const baseStyle = definePartsStyle({
  // define the part you're going to style
  list: {
    bg: UIconfig.modal.bgColor,
  },
  item: {
    bg: UIconfig.modal.bgColor,
    _hover: {
      bg: "primary.800",
    },
  },
});
// export the base styles in the component theme
export const menuTheme = defineMultiStyleConfig({ baseStyle });
