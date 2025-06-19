import { CurrentWeatherInfo } from "./types.js";

const weatherDisplay = document.getElementById("weather__display") as HTMLElement;
const adviceDisplay = document.querySelector("#weather__advice") as HTMLElement;

// Funciones auxiliares para mostrar o mensajes o mensajes de error
export const showError = (mensaje: string): void => {
    weatherDisplay.innerHTML= "";

    const error = document.createElement("p");
    error.textContent = mensaje;
    error.className = 'text-red-400 mt-2 font-medium';
    weatherDisplay.appendChild(error);
}
export const mostrarMessage = (mensaje: string): void  => {
    weatherDisplay.innerHTML= "";

    const msg = document.createElement("p");
    msg.textContent = mensaje;
    msg.className = 'text-gray-500 mt-2 font-medium';
    weatherDisplay.appendChild(msg);
}

// Recibe el CurrentWeatherInfo(info curada) de types y actualiza el HTML
export function showWeather(weather: CurrentWeatherInfo): void {
    if (!weatherDisplay) return;

    const icon = getWeatherIcon(weather.weather_code);

    weatherDisplay.innerHTML = `
    <div class="flex flex-row justify-center items-center text-[#272727] gap-5 px-4 pt-2">
        <div class="text-5xl">${icon}</div>
        <div class="text-[#272727] text-lg leading-tight">
            <p><span class="font-medium">🌡️ Temperature:</span> ${weather.temperature}°C</p>
            <p><span class="font-medium">🌧️ Rainfall:</span> ${weather.precipitation_probability}% • 
            <span class="font-medium">🔆 UV Index:</span> ${weather.uv_index}</p>
        </div>
    </div>
    `;
}

export function showTomorrowAdvice(code: number): void{
    if (!adviceDisplay) return;

    const message = getAdviceFromCode(code);
    adviceDisplay.innerHTML = message;
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
