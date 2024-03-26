import config from './ui-config.json'
const { generateColorObject } = require("../utils/generateColorObject")

export const UIconfig = {
  ...config,
  colors:{
    ...config.colors,
    gray: generateColorObject(config.colors.subtext)
  }
}