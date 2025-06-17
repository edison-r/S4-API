import { WeatherResponse } from "./types.js";
import { bringWeather } from "./weatherApi.js"

const weatherDisplay = document.getElementById("weather__display") as HTMLElement;

export const mostrarError = (mensaje: string): void => {
    weatherDisplay.innerHTML= "";

    const error = document.createElement("p");
    error.textContent = mensaje;
    error.className = 'text-red-400 mt-2 font-medium';
    weatherDisplay.appendChild(error);
}

export const mostrarMensaje = (mensaje: string): void  => {
    weatherDisplay.innerHTML= "";

    const msg = document.createElement("p");
    msg.textContent = mensaje;
    msg.className = 'text-gray-500 mt-2 font-medium';
    weatherDisplay.appendChild(msg);
}

export const showWeather = (weatherData: WeatherResponse): void => {
    const weatherDisplay = document.getElementById("weather__display");
    const weatherAdvice = document.getElementById("weather__advice");

    const temp = weatherData.
};