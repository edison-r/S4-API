// Definición de los tipos de datos que recibimos de la API y validamos su estructura

export interface CurrentWeatherInfo {
  temperature: number
  precipitation_probability: number
  uv_index: number
  weather_code: number
}

export interface WeatherData {
  daily: {
    time: string[]
    weather_code: number[]
  }
  hourly: {
    precipitation_probability: number[]
    temperature_2m: number[]
    time: string[]
    uv_index: number[]
  }
};

/**
 * weather_code: qué tipo de clima (0 despejado, 61 lluvia, 71 nieve, etc...)
 */

export interface MeowFactResponse {
  data: string[]
}

export interface DogFactResponse {
  data: {
    id: string
    attributes: {
      body: string
    }
  }[]
}

export interface CatImageResponse {
    url: string
}

export interface CardContent {
    fact: string
    imageUrl: string
}

export interface RatedFact {
  text: string
  liked: boolean
  timestamp: number
}