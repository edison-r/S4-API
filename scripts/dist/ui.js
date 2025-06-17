const weatherDisplay = document.getElementById("weather__display");
export const mostrarError = (mensaje) => {
    weatherDisplay.innerHTML = "";
    const error = document.createElement("p");
    error.textContent = mensaje;
    error.className = 'text-red-400 mt-2 font-medium';
    weatherDisplay.appendChild(error);
};
export const mostrarMensaje = (mensaje) => {
    weatherDisplay.innerHTML = "";
    const msg = document.createElement("p");
    msg.textContent = mensaje;
    msg.className = 'text-gray-500 mt-2 font-medium';
    weatherDisplay.appendChild(msg);
};
export const showWeather = (weatherData) => {
    const weatherDisplay = document.getElementById("weather__display");
    const weatherAdvice = document.getElementById("weather__advice");
    const temp = weatherData.
    ;
};
