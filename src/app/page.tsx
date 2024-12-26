'use client'

import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { getGeoLocation } from '@/services/geoLocationService'
import {
  getCurrentWeatherData,
  getForecastWeatherData,
} from '@/services/openWeatherMapService'
import { Button } from '@mui/material'
import {
  DEFAULT_CITY,
  locationArray,
  locationCoordinatesMap,
  City,
} from '@/constants/location'
import { useEffect, useState } from 'react'
import WeatherLineChart from '@/components/weather/WeatherTabs'
import CurrentWeatherCard from '@/components/weather/CurrentWeatherCard'
import Favorites from '@/components/favorite'
import { CurrentWeatherData, ForecastWeatherData } from '@/types/Weather.types'

export default function Home() {
  const [searchValue, setSearchValue] = useState<string | null>(DEFAULT_CITY)
  const coordinates = locationCoordinatesMap[searchValue as City]
  const [currentWeatherData, setCurrentWeatherData] =
    useState<CurrentWeatherData | null>(null)
  const [forcaseWeatherData, setForecastWeatherData] = useState<
    ForecastWeatherData[]
  >([])
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    const fetchCurrentWeatherData = async () => {
      try {
        if (!coordinates) return
        const weather: CurrentWeatherData =
          await getCurrentWeatherData(coordinates)

        setCurrentWeatherData(weather)
      } catch (error) {
        throw error
      }
    }
    fetchCurrentWeatherData()
  }, [coordinates])

  useEffect(() => {
    const fetchForecastWeatherData = async () => {
      try {
        if (!coordinates) return
        const weathers: ForecastWeatherData[] =
          await getForecastWeatherData(coordinates)
        console.log(weathers)
        setForecastWeatherData(weathers)
      } catch (error) {
        throw error
      }
    }
    fetchForecastWeatherData()
  }, [coordinates])

  return (
    <div className='bg-gray-100 min-h-screen p-4'>
      <header className='flex justify-between items-center bg-white p-4 rounded shadow'>
        <h1 className='text-xl font-bold text-blue-600'>WeatherNow</h1>
        <div className='flex gap-2'>
          <Autocomplete
            sx={{ width: 300 }}
            disablePortal
            options={locationArray}
            onChange={(_, newValue) => setSearchValue(newValue)}
            renderInput={(params) => <TextField {...params} label='도시' />}
            value={searchValue}
            defaultValue={DEFAULT_CITY}
          />
          <Button
            variant='outlined'
            onClick={() => {
              console.log(searchValue)
            }}
          >
            검색
          </Button>
        </div>
        <button
          onClick={() => {
            console.log(searchValue)
          }}
          className='text-yellow-500 font-bold'
        >
          ★ 즐겨찾기
        </button>
      </header>
      <section className='bg-white p-4 mt-4 rounded shadow flex'>
        <Favorites />
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
      </section>
      <section className='bg-white p-4 mt-4 rounded shadow'>
        <h2 className='text-lg font-semibold text-gray-600'>
          {`🌍 현재 날씨 (${searchValue})`}
        </h2>
        {currentWeatherData && <CurrentWeatherCard data={currentWeatherData} />}
      </section>
      <section className='bg-white p-4 mt-4 rounded shadow'>
        <h2 className='text-lg font-semibold text-gray-600'>
          {`⏰ 시간대별 날씨 (${searchValue})`}
        </h2>
        <div className='flex space-x-4 mt-2'>
          <WeatherLineChart data={forcaseWeatherData.slice(0, 8)} />
        </div>
      </section>
    </div>
  )
}
