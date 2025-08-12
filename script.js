const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const weatherResult = document.getElementById("weather-result");
const errorMessage = document.getElementById("error-message");

const cityName = document.getElementById("city-name");
const localTime = document.getElementById("local-time");
const weatherIcon = document.getElementById("weather-icon");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const pressure = document.getElementById("pressure");
const visibility = document.getElementById("visibility");
const uvIndex = document.getElementById("uv-index");

const API_KEY =  '185d7b7a240a468e92c163333251208'; 
const BASE_URL = "https://api.weatherapi.com/v1/current.json";

async function getWeather(city) {
    try {
        const response = await fetch(`${BASE_URL}?key=${API_KEY}&q=${city}&lang=pt`);
        
        if (!response.ok) {
            throw new Error("Cidade não encontrada");
        }

        const data = await response.json();

        cityName.textContent = `${data.location.name}, ${data.location.country}`;
        localTime.textContent = `Hora local: ${data.location.localtime}`;
        weatherIcon.src = `https:${data.current.condition.icon}`;
        temperature.textContent = `${data.current.temp_c}°C`;
        condition.textContent = data.current.condition.text;
        feelsLike.textContent = `${data.current.feelslike_c}°C`;
        humidity.textContent = `${data.current.humidity}%`;
        windSpeed.textContent = `${data.current.wind_kph} km/h`;
        pressure.textContent = `${data.current.pressure_mb} hPa`;
        visibility.textContent = `${data.current.vis_km} km`;
        uvIndex.textContent = data.current.uv;

        weatherResult.classList.remove("hidden");
        errorMessage.classList.add("hidden");

    } catch (error) {
        weatherResult.classList.add("hidden");
        errorMessage.classList.remove("hidden");
    }
}

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city !== "") {
        getWeather(city);
    }
});

cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchBtn.click();
    }
});
