import { ForecastWeatherData } from '@/types/Weather.types'
export const getProcessedWeatherData = (
  weatherDatas: ForecastWeatherData[]
) => {
  return weatherDatas.map((weatherData: ForecastWeatherData) => ({
    time: formatDateShort(weatherData.dt_txt),
    temperature: Number((weatherData.main.temp - 273.15).toFixed(1)),
    feels_like: Number((weatherData.main.feels_like - 273.15).toFixed(1)),
    windSpeed: weatherData.wind.speed,
  }))
}

export const formatDate = (dt: number): string => {
  const date = new Date(dt)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const dayOfWeek = date.toLocaleDateString('ko-KR', { weekday: 'long' })
  const hours = String(date.getHours()).padStart(2, '0')

  return `${year}년 ${month}월 ${day}일, ${dayOfWeek} ${hours}시`
}

export const formatDateShort = (str: string): string => {
  const date = new Date(str)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${month}-${day} ${hours}:${minutes}`
}
