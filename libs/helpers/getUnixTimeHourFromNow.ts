export const getUnixTimeHourFromNow = () => {
  const now = new Date(); 
  const later = new Date(now.getTime() + 60 * 60 * 24 * 7 * 1000);
  return Math.floor(later.getTime() / 1000);
};
