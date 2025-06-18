// Definición de los tipos de datos que recibimos de la API y validamos su estructura

export type HourlyData = {
    temperature_2m: number[];
    uv_index: number[];
    precipitation_probability: number[];
    time: string[];
};

export type DailyData = {
    weather_code: number[];
    time: string[];
};

// Para representar el tiempo actual
export type CurrentWeatherInfo = {
    temperature: number;
    uv_index: number;
    precipitation_probability: number;
    weather_code: number;
};

// Para representar el tiempo del día siguiente
export type TomorrowWeatherInfo = {
    temperature: number;
    uv_index: number;
    precipitation_probability: number;
    weather_code: number;
}

// Respuesta completa
export type WeatherResponse = {
    hourly: HourlyData;
    daily: DailyData;
    current: CurrentWeatherInfo;
    tomorrow: TomorrowWeatherInfo;
};

/**
 * weather_code: qué tipo de clima (0 despejado, 61 lluvia, 71 nieve, etc...)
 */