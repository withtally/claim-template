const { hexToHsl: convertHexToHsl } = require('./hexToHsl')

const generateColorObject = (color: string) => {
  return {
    100: convertHexToHsl(color, 0.9),
    200: convertHexToHsl(color, 0.8),
    300: convertHexToHsl(color, 0.7),
    400: convertHexToHsl(color, 0.6),
    500: convertHexToHsl(color, 0.5),
    600: convertHexToHsl(color),
    700: convertHexToHsl(color, 0.3),
    800: convertHexToHsl(color, 0.2),
    900: convertHexToHsl(color, 0.1),
  }
}

module.exports = {
  generateColorObject,
}
