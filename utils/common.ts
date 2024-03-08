import { Breakpoints } from '~/config/breakpoints'

export const disableScroll = (): string => (document.body.style.overflowY = 'hidden')
export const enableScroll = (): void => document.body.removeAttribute('style')

export const isMobile = (): boolean => window.innerWidth < Breakpoints['xl']
export const getCurrentYear = (): number => new Date().getFullYear()

export const hideScrollbars = (): void => {
  document.body.classList.add('scrollbar-hidden')
}

export const showScrollbars = (): void => {
  document.body.classList.remove('scrollbar-hidden')
}

export const shortenAddress = (address: string): string => {
  if (address.length < 20) {
    return address
  }

  const prefixLength = 6;
  const suffixLength = 4; 

  const prefix = address.slice(0, prefixLength);
  const suffix = address.slice(-suffixLength);

  return `${prefix}...${suffix}`;
}