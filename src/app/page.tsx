'use client'

import { getGeoLocation } from '@/services/geoLocationService'
import {
  getCurrentWeatherData,
  getForecastWeatherData,
} from '@/services/openWeatherMapService'
import { Button } from '@mui/material'

export default function Home() {
  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-white'>
      <div>
        <Button
          variant='contained'
          onClick={async () => {
            const response = await getGeoLocation()
            console.log(response)
            const weather = await getCurrentWeatherData(response)
            console.log(weather)
          }}
        >
          버튼1
        </Button>
        <Button
          variant='contained'
          onClick={async () => {
            const response = await getGeoLocation()
            console.log(response)
            const weather = await getForecastWeatherData(response)
            console.log(weather)
          }}
        >
          버튼2
        </Button>
      </div>
    </div>
  )
}
