import getWeatherData from "./weather-api";
import getWeatherIcon from "./weather-icons";
import { convertToDate, isNight } from "./date-functions";
import nightSky from "../assets/paul-volkmer-qVotvbsuM_c-unsplash.jpg";
import daySky from "../assets/zbynek-skrceny-MSrUdvVrKEE-unsplash.jpg";

const html = document.querySelector("html");
const main = document.querySelector("main");
const searchInput = document.querySelector("#searchCity");
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const date = document.querySelector(".date");
const location = document.querySelector(".location");
const conditionText = document.querySelector(".condition");
const humidity = document.querySelector(".humidity");
const feelsLikeElement = document.querySelector(".feels-like");
const wind = document.querySelector(".wind");
const toggleUnitButton = document.querySelector(".toggle-unit-button");
const error = document.querySelector(".error");

let city = "Berlin";
let useC = false;
let bg = daySky;
let mainBGC = "var(--day-bgc)";

async function updateDisplay() {
  let { value } = searchInput;

  if (!value) {
    value = city;
  } else {
    city = value;
  }

  const data = await getWeatherData(value);

  if (!data) {
    error.innerText = `${value} is an invalid location.`;
    searchInput.focus();
    searchInput.select();
    return;
  }

  const imgURL = await getWeatherIcon(data);

  error.innerText = "";

  let temp = data.tempF;
  let feelsLike = data.feelsLikeF;
  let { country } = data;
  const { timeEPOCH } = data;

  if (useC) {
    temp = data.tempC;
    feelsLike = data.feelsLikeC;
  }

  if (country.includes("United States of America")) {
    country = data.region;
  }

  temperature.innerText = temp;
  date.innerText = convertToDate(timeEPOCH);
  location.innerText = `${data.name}, ${country}`;
  conditionText.innerText = data.conditionText;
  feelsLikeElement.innerText = feelsLike;
  wind.innerText = `${data.windMPH} MPH`;
  humidity.innerText = `${data.humidity}%`;
  weatherIcon.src = imgURL;

  if (isNight(timeEPOCH)) {
    bg = nightSky;
    mainBGC = "var(--night-bgc)";
  } else {
    bg = daySky;
    mainBGC = "var(--day-bgc)";
  }

  html.style.backgroundImage = `url(${bg})`;
  main.style.background = mainBGC;
}

searchInput.addEventListener("search", updateDisplay);

toggleUnitButton.addEventListener("click", () => {
  if (useC) {
    useC = false;
    toggleUnitButton.innerHTML = "Use &#176;C";
    updateDisplay();
    temperature.dataset.unit = "°F";
    feelsLikeElement.dataset.unit = "°F";
  } else {
    useC = true;
    toggleUnitButton.innerHTML = "Use &#176;F";
    updateDisplay();
    temperature.dataset.unit = "°C";
    feelsLikeElement.dataset.unit = "°C";
  }
});

updateDisplay();
