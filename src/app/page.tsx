'use client'

import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { getGeoLocation } from '@/services/geoLocationService'
import {
  getCurrentWeatherData,
  getForecastWeatherData,
} from '@/services/openWeatherMapService'
import { Button } from '@mui/material'
import { locationArray } from '@/constants/location'
import { useState } from 'react'
import WeatherLineChart from '@/components/weather/WeatherTabs'
import CurrentWeatherCard from '@/components/weather/CurrentWeatherCard'
import Favorites from '@/components/favorite'

export default function Home() {
  const [value, setValue] = useState<string | null>(null)

  return (
    <div className='bg-gray-100 min-h-screen p-4'>
      <header className='flex justify-between items-center bg-white p-4 rounded shadow'>
        <h1 className='text-xl font-bold text-blue-600'>WeatherNow</h1>
        <Autocomplete
          sx={{ width: 300 }}
          disablePortal
          options={locationArray}
          onChange={(_, newValue) => setValue(newValue)}
          renderInput={(params) => <TextField {...params} label='도시' />}
        />
        <button className='text-yellow-500 font-bold'>★ 즐겨찾기</button>
      </header>

      <section className='bg-white p-4 mt-4 rounded shadow flex'>
        <Favorites />
      </section>

      <section className='bg-white p-4 mt-4 rounded shadow'>
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
        <CurrentWeatherCard />
        <h2 className='text-lg font-semibold'>🌍 현재 위치: 서울 (12:00 PM)</h2>
        <div className='flex items-center mt-2'>
          <span className='text-4xl'>☀️</span>
          <span className='text-2xl ml-2'>25°C</span>
        </div>
      </section>

      <section className='bg-white p-4 mt-4 rounded shadow'>
        <h2 className='text-lg font-semibold'>시간대별 날씨</h2>
        <div className='flex space-x-4 mt-2'>
          <WeatherLineChart />
        </div>
      </section>
    </div>
  )
}
