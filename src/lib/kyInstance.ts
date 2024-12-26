import ky from 'ky'
import { WEATHER_MAP_BASE_URL } from '@/constants/api/weatherApi'
import { API_ROUTE_BASE_URL } from '@/constants/api'

export const weatherKy = ky.create({
  prefixUrl: WEATHER_MAP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  hooks: {
    beforeRequest: [
      (request) => {
        console.log('Request URL:', request.url)
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        if (!response.ok) {
          console.error('Response error:', response.status)
        }
      },
    ],
  },
})

export const apiRouteKy = ky.create({
  prefixUrl: API_ROUTE_BASE_URL,
})
