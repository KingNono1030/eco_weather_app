import { GeolocationCoordinates } from '@/types/Location.types'

export const getGeoLocation = async (): Promise<GeolocationCoordinates> => {
  return new Promise<GeolocationCoordinates>((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser.'))
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude }: GeolocationCoordinates = position.coords
        resolve({ latitude, longitude })
      },
      (error) => {
        reject(error)
      }
    )
  })
}
