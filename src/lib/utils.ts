import { ForecastWeatherData } from '@/types/Weather.types'

export const getProcessedWeatherData = (
  weatherDatas: ForecastWeatherData[]
) => {
  return weatherDatas.map((weatherData: ForecastWeatherData) => ({
    time: weatherData.dt_txt,
    temperature: (weatherData.main.temp - 273.15).toFixed(1),
    feels_like: (weatherData.main.feels_like - 273.15).toFixed(1),
    windSpeed: weatherData.wind.speed,
  }))
}
