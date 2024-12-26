import { apiRouteKy } from '@/lib/kyInstance'
import { GeolocationCoordinates } from '@/types/Location.types'

export const getCurrentWeatherData = async ({
  latitude,
  longitude,
}: GeolocationCoordinates) => {
  const response = await apiRouteKy
    .get(`api/weatherMap`, {
      searchParams: {
        lat: latitude,
        lon: longitude,
      },
    })
    .json()

  return response
}
