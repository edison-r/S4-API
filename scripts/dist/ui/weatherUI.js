import { getWeather, extractCurrentWeatherInfo } from "../services/weatherService.js";
import { getUserLocation } from "../services/userLocation.js";
const weatherDisplay = document.getElementById("weather__display");
const adviceDisplay = document.querySelector("#weather__advice");
export async function renderWeather(lat, lon) {
    const data = await getWeather(lat, lon);
    if (!data || !weatherDisplay)
        return;
    const current = extractCurrentWeatherInfo(data);
    if (!current) {
        weatherDisplay.textContent = "⚠️ Unable to extract weather data";
        return;
    }
    ;
    const icon = getWeatherIcon(current.weather_code);
    weatherDisplay.innerHTML = `
    <div class="flex flex-row justify-center items-center text-[#272727] gap-5 px-4 pt-2">
        <div class="text-5xl">${icon}</div>
        <div class="text-[#272727] text-lg leading-tight">
            <p><span class="font-medium">🌡️ Temperature:</span> ${current.temperature.toFixed(0)}°C</p>
            <p><span class="font-medium">🌧️ Rainfall:</span> ${current.precipitation_probability}% • 
            <span class="font-medium">🔆 UV Index:</span> ${current.uv_index.toFixed(0)}</p>
        </div>
    </div>
    `;
    showTomorrowAdvice(current.weather_code);
}
export function showTomorrowAdvice(code) {
    if (!adviceDisplay)
        return;
    const message = getAdviceFromCode(code);
    adviceDisplay.innerHTML = message;
}
export async function startWeather() {
    const { lat, lon } = await getUserLocation();
    renderWeather(lat, lon);
}
const getWeatherIcon = (code) => {
    if ([0, 1].includes(code))
        return "☀️";
    if ([2, 3].includes(code))
        return "🌤️";
    if ([45, 48].includes(code))
        return "🌫️";
    if ([51, 53, 55, 56, 57, 61, 63, 65, 80, 81, 82].includes(code))
        return "🌧️";
    if ([66, 67, 71, 73, 75, 77, 85, 86].includes(code))
        return "❄️";
    return "❓";
};
function getAdviceFromCode(code) {
    if ([0, 1].includes(code))
        return "☀️ It will be sunny tomorrow. Let's go to the";
    if ([2, 3].includes(code))
        return "🌤️ It will be partly cloudy tomorrow.";
    if ([45, 48].includes(code))
        return "🌫️ There will be fog tomorrow. Drive carefully.";
    if ([51, 53, 55, 56, 57, 61, 63, 65, 80, 81, 82].includes(code))
        return "🌧️ Rain is expected tomorrow. Don't forget your umbrella!!";
    if ([66, 67, 71, 73, 75, 77, 85, 86].includes(code))
        return "❄️ Snow is coming. Dress warmly.";
    return "🤷‍♂️ Tomorrow's weather is uncertain.";
}
