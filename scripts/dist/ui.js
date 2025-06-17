const weatherDisplay = document.getElementById("weather__display");
const adviceDisplay = document.querySelector("#weather__advice");
// Funciones auxiliares para mostrar o mensajes o mensajes de error
export const showError = (mensaje) => {
    weatherDisplay.innerHTML = "";
    const error = document.createElement("p");
    error.textContent = mensaje;
    error.className = 'text-red-400 mt-2 font-medium';
    weatherDisplay.appendChild(error);
};
export const mostrarMessage = (mensaje) => {
    weatherDisplay.innerHTML = "";
    const msg = document.createElement("p");
    msg.textContent = mensaje;
    msg.className = 'text-gray-500 mt-2 font-medium';
    weatherDisplay.appendChild(msg);
};
// Recibe el CurrentWeatherInfo(info curada) de types y actualiza el HTML
export function showWeather(weather) {
    if (!weatherDisplay)
        return;
    const icon = getWeatherIcon(weather.weather_code);
    weatherDisplay.innerHTML = `
    <div class="flex flex-row justify-start items-center text-gray-700 gap-3 px-4 py-2">
        <div class="text-4xl">${icon}</div>
        <p>
            <span class="font-medium">🌡️ Temperatura: </span> ${weather.temperature}°C 
            &nbsp;•&nbsp;
            <span class="font-medium">🌧️ Precipitación: </span> ${weather.precipitation_probability}% 
            &nbsp;•&nbsp;
            <span class="font-medium">🔆 UV Index: </span> ${weather.uv_index}
        </p>
    </div>
    `;
}
export function showTomorrowAdvice(code) {
    if (!adviceDisplay)
        return;
    const message = getAdviceFromCode(code);
    adviceDisplay.innerHTML = message;
    adviceDisplay.className = 'text-md w-full text-gray-700 px-4 py-1';
}
// Funciones auxiliares que mandan un icono o un mensaje según los datos de la API
const getWeatherIcon = (code) => {
    if (code === 0)
        return "☀️";
    if ([1, 2, 3].includes(code))
        return "⛅";
    if ([45, 48].includes(code))
        return "🌫️";
    if ([51, 53, 55, 61, 63, 65].includes(code))
        return "🌧️";
    if ([66, 67, 71, 73, 75].includes(code))
        return "❄️";
    return "❓";
};
function getAdviceFromCode(code) {
    if (code === 0)
        return "☀️ Mañana hará sol. ¡Ideal para un paseo!";
    if ([1, 2, 3].includes(code))
        return "🌤️ Mañana estará parcialmente nublado.";
    if ([45, 48].includes(code))
        return "🌫️ Mañana habrá niebla. Ten cuidado al conducir.";
    if ([51, 53, 55, 61, 63, 65].includes(code))
        return "🌧️ Se esperan lluvias mañana. No olvides el paraguas.";
    if ([66, 67, 71, 73, 75].includes(code))
        return "❄️ Nieve a la vista. Abrígate bien.";
    return "🤷‍♂️ El clima de mañana es incierto.";
}
