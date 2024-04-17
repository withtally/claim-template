export function convertNumberToHumanReadableFormat(number: number) {
  // Define the suffixes for each magnitude
  const suffixes = ['', 'K', 'M', 'B', 'T'];

  // Find the appropriate suffix based on the magnitude of the number
  const magnitude = Math.floor(Math.log10(Math.abs(number)) / 3);
  const suffix = suffixes[magnitude];

  // Convert the number to a string with one decimal place
  const formattedNumber = (number / Math.pow(10, magnitude * 3)).toFixed(1);

  // Return the formatted number with the appropriate suffix
  return formattedNumber + suffix;
}