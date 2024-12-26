import { apiRouteKy } from '@/lib/kyInstance'
import { GeolocationCoordinates } from '@/types/Location.types'
import { GetForecastWeatherDataResponse } from '@/types/Weather.types'

export const getCurrentWeatherData = async ({
  latitude,
  longitude,
}: GeolocationCoordinates) => {
  const response = await apiRouteKy
    .get(`api/currentWeather`, {
      searchParams: {
        lat: latitude,
        lon: longitude,
      },
    })
    .json()

  return response
}

export const getForecastWeatherData = async ({
  latitude,
  longitude,
}: GeolocationCoordinates) => {
  const response: GetForecastWeatherDataResponse = await apiRouteKy
    .get(`api/forecastWeather`, {
      searchParams: {
        lat: latitude,
        lon: longitude,
      },
    })
    .json()
  const { list } = response
  return list
}
