import { Breakpoints } from '~/config/breakpoints'

export const disableScroll = (): string => (document.body.style.overflowY = 'hidden')
export const enableScroll = (): void => document.body.removeAttribute('style')

export const isMobile = (): boolean => window.innerWidth < Breakpoints['xl']
export const getCurrentYear = (): number => new Date().getFullYear()

