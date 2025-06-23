import { fetchData } from "./apiService.js";
import { API_URLS } from "../utils/env.js";
import { WeatherData, CurrentWeatherInfo } from "../types/types.js"

export async function getWeather(lat: number, lon: number): Promise<WeatherData | null>{
    const url = `${API_URLS.weatherBase}?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,uv_index,precipitation_probability&daily=weather_code&forecast_days=3&timezone=auto`;
    try{
        const data = await fetchData<WeatherData>(url);
        return data;
    }catch(error){
        console.error("Error loading weather data:", error)
        return null;        
    }
}

export function extractCurrentWeatherInfo(data: WeatherData): CurrentWeatherInfo | null {
    const now = getCurrentDate();
    const index = data.hourly.time.findIndex((t) => t.startsWith(now));
    if(index === -1) return null;

    return {
        temperature: data.hourly.temperature_2m[index],
        uv_index: data.hourly.uv_index[index],
        precipitation_probability: data.hourly.precipitation_probability[index],
        weather_code: data.daily.weather_code[0],
    };
}

const getCurrentDate = (): string =>{
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hour = String(now.getHours()).padStart(2, "0");

    const finalDate = `${year}-${month}-${day}T${hour}`;
    return finalDate;
}