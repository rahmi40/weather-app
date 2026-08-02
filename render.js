// render.js - Draws everything on the screen using PNG icons

const statusBox = document.getElementById("statusBox");
const weatherBox = document.getElementById("weatherBox");
const weatherIcon = document.getElementById("weatherIcon");
const tempDisplay = document.getElementById("tempDisplay");
const cityDisplay = document.getElementById("cityDisplay");
const humidityDisplay = document.getElementById("humidityDisplay");
const windDisplay = document.getElementById("windDisplay");
const forecastGrid = document.getElementById("forecastGrid");

function getMainIcon(code) {
  if (code === 0) return "sun.png";
  if (code === 1 || code === 2) return "cloud + sun.png";
  if (code === 3) return "cloud.png";
  if (code === 45 || code === 48) return "cloud + fog lines.png";
  if (code >= 51 && code <= 55) return "cloud + rain drops.png";
  if (code >= 61 && code <= 67) return "cloud + rain drops.png";
  if (code >= 71 && code <= 77) return "cloud + snowflakes.png";
  if (code >= 95 && code <= 99) return "cloud + lightning.png";
  return "cloud + sun + rain.png";
}

function getSmallIcon(code) {
  if (code === 0) return "sun.png";
  if (code === 1 || code === 2) return "cloud + sun.png";
  if (code === 3) return "cloud.png";
  if (code === 45 || code === 48) return "fog lines.png";
  if (code >= 51 && code <= 55) return "rain drops.png";
  if (code >= 61 && code <= 67) return "rain drops.png";
  if (code >= 71 && code <= 77) return "snow.png";
  if (code >= 95 && code <= 99) return "lightning bolt.png";
  return "cloud + sun + rain.png";
}

function formatDay(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { weekday: "short" });
}

export function renderLoading() {
  weatherBox.classList.add("hidden");
  statusBox.classList.remove("hidden");
  statusBox.innerHTML = `
        <div class="flex flex-col items-center gap-3 py-4">
            <img src="images/spinning circle.png" alt="Loading" class="w-10 h-10 spin">
            <p class="text-white/70 text-sm">Loading...</p>
        </div>
    `;
}

export function renderError(message) {
  weatherBox.classList.add("hidden");
  statusBox.classList.remove("hidden");
  statusBox.innerHTML = `
        <div class="flex flex-col items-center gap-2 py-4 text-white/80">
            <img src="images/circle with exclamation.png" alt="Error" class="w-10 h-10">
            <p class="text-sm">${message}</p>
        </div>
    `;
}

export function renderIdle() {
  weatherBox.classList.add("hidden");
  statusBox.classList.remove("hidden");
  statusBox.innerHTML = `<p class="text-white/60 text-sm py-4">Type a city name and search</p>`;
}

export function renderCurrentWeather(current, cityName, country) {
  const iconFile = getMainIcon(current.weather_code);
  weatherIcon.innerHTML = `<img src="images/${iconFile}" alt="Weather" class="w-36 h-36 object-contain fade-in">`;
  tempDisplay.textContent = Math.round(current.temperature_2m) + "°C";
  cityDisplay.textContent = cityName + ", " + country;
  humidityDisplay.textContent = current.relative_humidity_2m + "%";
  windDisplay.textContent = current.wind_speed_10m + " km/h";
}

export function renderForecast(daily) {
  forecastGrid.innerHTML = "";

  for (let i = 1; i <= 5; i++) {
    const day = formatDay(daily.time[i]);
    const max = Math.round(daily.temperature_2m_max[i]);
    const min = Math.round(daily.temperature_2m_min[i]);
    const iconFile = getSmallIcon(daily.weather_code[i]);

    const card = document.createElement("div");
    card.className =
      "forecast-card bg-white/5 rounded-xl p-2 text-center fade-in";
    card.style.animationDelay = i * 0.06 + "s";

    card.innerHTML = `
            <p class="text-white/60 text-xs mb-1">${day}</p>
            <div class="flex justify-center mb-1">
                <img src="images/${iconFile}" alt="${day}" class="w-9 h-9 object-contain">
            </div>
            <p class="text-white text-sm font-semibold">${max}°</p>
            <p class="text-white/40 text-xs">${min}°</p>
        `;

    forecastGrid.appendChild(card);
  }
}

export function showWeatherSection() {
  statusBox.classList.add("hidden");
  weatherBox.classList.remove("hidden");
}
