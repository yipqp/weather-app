export function convertToDate(timeEPOCH) {
  const milliseconds = timeEPOCH * 1000;
  const dateObject = new Date(milliseconds);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = dateObject.toLocaleDateString("en-US", options);
  return formattedDate;
}

export function isNight(timeEPOCH) {
  const milliseconds = timeEPOCH * 1000;
  const dateObject = new Date(milliseconds);
  const hour = dateObject.getHours() + 1;
  if (hour >= 6 || hour < 6) return true;
  return false;
}
