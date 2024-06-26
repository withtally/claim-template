export type ButtonColours = 'primary' | 'secondary'

export const BUTTON_COLOURS: Record<ButtonColours, string> = {
  primary: 'bg-blue text-white hover:opacity-70',
  secondary: 'bg-white text-black hover:bg-white/60',
}
