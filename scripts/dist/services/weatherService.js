import { fetchData } from "./apiService.js";
import { API_URLS } from "../utils/env.js";
export async function getWeather(lat, lon) {
    const url = `${API_URLS.weatherBase}?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,uv_index,precipitation_probability&daily=weather_code&forecast_days=3&timezone=auto`;
    try {
        const data = await fetchData(url);
        return data;
    }
    catch (error) {
        console.error("Error loading weather data:", error);
        return null;
    }
}
export function extractCurrentWeatherInfo(data) {
    const now = getCurrentDate(); // Recupero la fecha de hoy con formato que entiende la API
    const index = data.hourly.time.findIndex((t) => t.startsWith(now)); // Buscamos la hora actual en el índice
    if (index === -1)
        return null;
    return {
        temperature: data.hourly.temperature_2m[index],
        uv_index: data.hourly.uv_index[index],
        precipitation_probability: data.hourly.precipitation_probability[index],
        weather_code: data.daily.weather_code[0],
    };
}
// recuperar la fecha con la hora en formato YY-MM-DDTHH
const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hour = String(now.getHours()).padStart(2, "0");
    const finalDate = `${year}-${month}-${day}T${hour}`;
    return finalDate;
};
