const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

export async function searchCity(cityName) {
  try {
    const url = `${GEO_URL}?name=${encodeURIComponent(cityName)}&count=1`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to search for city");
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      throw new Error("City not found. Please check the spelling.");
    }

    return data.results[0];
  } catch (error) {
    throw error;
  }
}

export async function getWeather(lat, lon) {
  try {
    const params = new URLSearchParams({
      latitude: lat,
      longitude: lon,
      current:
        "temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m",
      daily: "weather_code,temperature_2m_max,temperature_2m_min",
      timezone: "auto",
      forecast_days: "6",
    });

    const response = await fetch(`${WEATHER_URL}?${params}`);

    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
