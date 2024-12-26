import { useState, useEffect } from 'react'
import { GeolocationCoordinates } from '@/types/Location.types'

type Location = { lat: number; lon: number } | null
type FetchWeatherParams = { query?: string; location?: Location }

const useCurrentWeather = () => {
  const [query, setQuery] = useState<string>('') // 검색어
  const [favorite, setFavorite] = useState<string | null>(null) // 즐겨찾기
  const [location, setLocation] = useState<Location>(null) // 현재 위치
  const [currentWeatherData, setCurrentWeatherData] =
    useState<CurrentWeatherData | null>(null)

  // 날씨 데이터를 가져오는 함수
  const fetchWeatherData = async ({ query, location }: FetchWeatherParams) => {
    try {
      let url = ''
      if (query) {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=YOUR_API_KEY`
      } else if (location) {
        const { lat, lon } = location
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=YOUR_API_KEY`
      }
      const response = await fetch(url)
      const data = await response.json()
      setCurrentWeatherData(data)
    } catch (error) {
      console.error('Error fetching weather data:', error)
    }
  }

  // 검색어 변경 시 날씨 데이터 가져오기
  useEffect(() => {
    if (query) fetchWeatherData({ query })
  }, [query])

  // 즐겨찾기 변경 시 날씨 데이터 가져오기
  useEffect(() => {
    if (favorite) fetchWeatherData({ query: favorite })
  }, [favorite])

  // 현재 위치 변경 시 날씨 데이터 가져오기
  useEffect(() => {
    if (location) fetchWeatherData({ location })
  }, [location])

  return {
    currentWeatherData,
    setQuery,
    setFavorite,
    setLocation,
  }
}

export default useCurrentWeather
