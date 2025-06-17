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

export type CurrentWeatherInfo = {
    temperature: number;
    uv_index: number;
    precipitationProbability: number;
    weatherCode: number;
    hour: string;
};

export type WeatherResponse = {
  hourly: HourlyData;
  daily: DailyData;
  current: CurrentWeatherInfo;
};
