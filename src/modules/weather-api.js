const APIKey = "331ebbdb44a940bba2922231233003";

export default async function getWeatherData(location) {
  try {
    const curWeatherResp = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${location}`,
      { mode: "cors" }
    );
    const curWeatherJSON = await curWeatherResp.json();
    const weatherData = {
      tempF: Math.round(curWeatherJSON.current.temp_f),
      tempC: Math.round(curWeatherJSON.current.temp_c),
      feelsLikeF: Math.round(curWeatherJSON.current.feelslike_f),
      feelsLikeC: Math.round(curWeatherJSON.current.feelslike_c),
      conditionText: curWeatherJSON.current.condition.text,
      windMPH: Math.round(curWeatherJSON.current.wind_mph),
      humidity: curWeatherJSON.current.humidity,
      country: curWeatherJSON.location.country,
      region: curWeatherJSON.location.region,
      name: curWeatherJSON.location.name,
      timeEPOCH: curWeatherJSON.location.localtime_epoch,
    };
    return weatherData;
  } catch (e) {
    return null;
  }
}
