function hexToHsl(hex: string, customLightness?: number) {
  hex = hex.replace(/^#/, '').toLowerCase();

  let r: number = parseInt(hex.substring(0, 2), 16) / 255;
  let g: number = parseInt(hex.substring(2, 4), 16) / 255;
  let b: number = parseInt(hex.substring(4, 6), 16) / 255;

  let max = Math.max(r, g, b);
  let min = Math.min(r, g, b);

  let lightness = (max + min) / 2;

  let hue: number, saturation: number;

  if (max === min) {
    hue = 0;
    saturation = 0;
  } else {
    let delta = max - min;

    saturation = lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);

    switch (max) {
      case r:
        hue = ((g - b) / delta + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        hue = ((b - r) / delta + 2) / 6;
        break;
      case b:
        hue = ((r - g) / delta + 4) / 6;
        break;
    }
  }

  const h = Math.round(hue * 360);
  const s = Math.round(saturation * 100);
  const l = Math.round((customLightness || lightness) * 100);

  return `hsl(${h} ${s}% ${l}%)`
}

module.exports = {
  hexToHsl
}