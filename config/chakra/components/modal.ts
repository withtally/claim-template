import { modalAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";
import { UIconfig } from "~/config/UIconfig";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const { bgColor, overlay } = UIconfig.modal;

const baseStyle = definePartsStyle({
  dialog: {
    borderRadius: "md",
    bg: bgColor,
  },
  overlay,
});

export const modalTheme = defineMultiStyleConfig({
  baseStyle,
});
