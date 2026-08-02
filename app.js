import { searchCity, getWeather } from "./api.js";
import {
  renderLoading,
  renderError,
  renderIdle,
  renderCurrentWeather,
  renderForecast,
  showWeatherSection,
} from "./render.js";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

async function handleSearch() {
  const cityName = cityInput.value.trim();

  if (!cityName) {
    renderError("Please enter a city name.");
    return;
  }

  renderLoading();

  try {
    const city = await searchCity(cityName);

    const weather = await getWeather(city.latitude, city.longitude);

    renderCurrentWeather(weather.current, city.name, city.country);
    renderForecast(weather.daily);
    showWeatherSection();
  } catch (error) {
    console.error("Search failed:", error);
    renderError(error.message || "Something went wrong. Please try again.");
  }
}

searchBtn.addEventListener("click", handleSearch);

cityInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    handleSearch();
  }
});

renderIdle();
