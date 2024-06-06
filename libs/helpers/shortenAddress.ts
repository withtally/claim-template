export const shortenAddress = (address: string): string => {
  if (address.length < 20) {
    return address
  }

  const prefixLength = 6
  const suffixLength = 4

  const prefix = address.slice(0, prefixLength)
  const suffix = address.slice(-suffixLength)

  return `${prefix}...${suffix}`
}
