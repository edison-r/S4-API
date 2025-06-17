import { WeatherResponse } from "./types.js"; 
import { mostrarError, mostrarMensaje } from "./ui.js";

// Recogemos la localización del usuario 
export function getUserLocation(): void{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            bringWeather(lat, lon);    
        });
    } else {
        const lat = 41.3888;
        const lon = 2.159;
        bringWeather(lat, lon);
    }
}

export async function bringWeather(latitude: number, longitude: number): Promise<WeatherResponse | null> {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,uv_index,precipitation_probability&daily=weather_code&forecast_days=3&timezone=auto`;

    try {
        const res = await fetch(url);
        
        if(!res.ok) throw new Error("No nos hemos podido conectar a la API del tiempo");
        
        const data: WeatherResponse = await res.json();
        let now = getCurrentDate(); // Recupero la fecha de hoy con formato que entiende la API
        // Buscamos la hora actual en el índice
        const index = data.hourly.time.findIndex((time) => time.startsWith(now));
        //console.log(data, now, index);

        if(index === -1) throw new Error("Hora actual no encontrada");

        return data
    } catch(error){
        mostrarError("Error: No se pudo cargar el tiempo");
        //console.log(error);
        return null;
    }
}

const getCurrentDate = (): string =>{
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hour = String(now.getHours()).padStart(2, "0");

    const finalDate = `${year}-${month}-${day}T${hour}`;
    //console.log(now, year, month, day, hour);
    return finalDate;
}
