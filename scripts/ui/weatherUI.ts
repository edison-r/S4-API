import { getWeather, extractCurrentWeatherInfo } from "../services/weatherService.js";
import { CurrentWeatherInfo } from "../types/types.js";
import { getUserLocation } from "../services/userLocation.js";

const weatherDisplay = document.getElementById("weather__display") as HTMLElement;
const adviceDisplay = document.querySelector("#weather__advice") as HTMLElement;

// Recibe el CurrentWeatherInfo(info curada) de types y actualiza el HTML
export async function renderWeather(lat: number, lon: number): Promise<void> {
    const data = await getWeather(lat, lon);
    if (!data || !weatherDisplay) return;

    const current: CurrentWeatherInfo | null = extractCurrentWeatherInfo(data);
    if(!current){
        weatherDisplay.textContent = "⚠️ Unable to extract weather data";
        return;
    };
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

export function showTomorrowAdvice(code: number): void{
    if (!adviceDisplay) return;

    const message = getAdviceFromCode(code);
    adviceDisplay.innerHTML = message;
}

export async function startWeather() {
    const { lat, lon } = await getUserLocation();
    renderWeather(lat, lon);
}

// Funciones auxiliares que mandan un icono o un mensaje según los datos de la API
const getWeatherIcon = (code: number): string => {
    if (code === 0) return "☀️";
    if ([1, 2, 3].includes(code)) return "⛅";
    if ([45, 48].includes(code)) return "🌫️";
    if ([51, 53, 55, 61, 63, 65].includes(code)) return "🌧️";
    if ([66, 67, 71, 73, 75].includes(code)) return "❄️";
    return "❓";
}
function getAdviceFromCode(code: number): string {
    if (code === 0) return "☀️ It will be sunny tomorrow. Let's go to the";
    if ([1, 2, 3].includes(code)) return "🌤️ It will be partly cloudy tomorrow.";
    if ([45, 48].includes(code)) return "🌫️ There will be fog tomorrow. Drive carefully.";
    if ([51, 53, 55, 61, 63, 65].includes(code)) return "🌧️ Rain is expected tomorrow. Don't forget your umbrella!!";
    if ([66, 67, 71, 73, 75].includes(code)) return "❄️ Snow is coming. Dress warmly.";
    return "🤷‍♂️ Tomorrow's weather is uncertain.";
}
