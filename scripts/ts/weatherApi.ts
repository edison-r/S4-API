import { WeatherResponse, CurrentWeatherInfo } from "./types.js"; 
import { mostrarError, showWeather } from "./ui.js";

// Intenta obtener la localización real del usuario; si no, usa la de Barcelona
export async function getUserLocation(): Promise<void> {
    let lat = 41.3888, lon = 2.159; // Barcelona por defecto
    if (navigator.geolocation) {
        try {
            const position = await new Promise<GeolocationPosition>((resolve, reject) =>
                navigator.geolocation.getCurrentPosition(resolve, reject)
            );
            lat = position.coords.latitude;
            lon = position.coords.longitude;
        } catch {
            // Si falla, usa Barcelona
        }
    }
    await fetchCurrentWeather(lat, lon);
}

// recoge los datos de fetchWeatherData(), filtra x los relevantes y los devuelve como objeto (datos de hoy)
export async function fetchCurrentWeather(lat: number, lon: number): Promise<CurrentWeatherInfo | null> {
    const data = await fetchWeatherData(lat, lon);
    if (!data) return null;

    const now = getCurrentDate(); // Recupero la fecha de hoy con formato que entiende la API
    const index = data.hourly.time.findIndex((t) => t.startsWith(now)); // Buscamos la hora actual en el índice
    if(index === -1) return null;

    return {
        temperature: data.hourly.temperature_2m[index],
        uv_index: data.hourly.uv_index[index],
        precipitation_probability: data.hourly.precipitation_probability[index],
        weather_code: data.daily.weather_code[0],
    };
}

// función para previsión de mañana
export async function getTomorrowWeather(lat: number, lon: number): Promise<number | null>{
    const data = await fetchWeatherData(lat, lon);
    if (!data) return null;
    return data.daily.weather_code[1] ?? null;
}

// conexión a la API de open-meteo y retorno los datos en bruto
async function fetchWeatherData(latitude: number, longitude: number): Promise<WeatherResponse | null> {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,uv_index,precipitation_probability&daily=weather_code&forecast_days=3&timezone=auto`;
    try {
        const res = await fetch(url);
        if(!res.ok) throw new Error("No nos hemos podido conectar a la API del tiempo");
        return await res.json();        
    } catch(error){
        mostrarError("Error: No se pudo cargar el tiempo");
        console.log(error);
        return null;
    }
}

// recuperar la fecha con la hora en formato YY-MM-DDTHH 
const getCurrentDate = (): string =>{
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hour = String(now.getHours()).padStart(2, "0");

    const finalDate = `${year}-${month}-${day}T${hour}`;
    return finalDate;
}
