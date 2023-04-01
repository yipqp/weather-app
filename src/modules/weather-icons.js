import sunny from "../assets/white-balance-sunny.svg";
import partlyCloudy from "../assets/weather-partly-cloudy.svg";
import cloudy from "../assets/weather-cloudy.svg";
import foggy from "../assets/weather-fog.svg";
import lightning from "../assets/weather-lightning.svg";
import rainy from "../assets/weather-rainy.svg";
import snowy from "../assets/weather-snowy.svg";

export default function getWeatherIcon(data) {
  const condition = data.conditionText.toLowerCase();

  if (condition.includes("sunny") || condition.includes("clear")) {
    return sunny;
  }
  if (condition.includes("partly cloudy")) {
    return partlyCloudy;
  }
  if (condition.includes("cloudy") || condition.includes("overcast")) {
    return cloudy;
  }
  if (condition.includes("fog") || condition.includes("mist")) {
    return foggy;
  }
  if (condition.includes("thunder")) {
    return lightning;
  }
  if (
    condition.includes("rain") ||
    condition.includes("sleet") ||
    condition.includes("drizzle")
  ) {
    return rainy;
  }
  return snowy;
}
