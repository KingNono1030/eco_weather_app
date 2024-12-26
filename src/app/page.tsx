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
import { GeolocationCoordinates } from '@/types/Location.types'
export default function Home() {
  const [searchValue, setSearchValue] = useState<string | null>(DEFAULT_CITY)
  const [location, setLocation] = useState<string | null>(DEFAULT_CITY)

  const coordinates = locationCoordinatesMap[location as City]
  const [currentWeatherData, setCurrentWeatherData] =
    useState<CurrentWeatherData | null>(null)
  const [forcaseWeatherData, setForecastWeatherData] = useState<
    ForecastWeatherData[]
  >([])
  const [favorites, setFavorites] = useState<(string | null)[]>([])

  const addFavorite = (newFavorite: string | null) => {
    setFavorites((prev) => {
      const updatedFavorites = [...new Set([...prev, newFavorite])]
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
      return updatedFavorites
    })
  }

  const deleteFavorite = (favoriteToRemove: string | null) => {
    setFavorites((prev) => {
      const updatedFavorites = prev.filter((item) => item !== favoriteToRemove)
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
      return updatedFavorites
    })
  }

  const getCurrentLocationWeather = async () => {
    try {
      const currentLocation: GeolocationCoordinates = await getGeoLocation()
      const [currentWeather, forecastWeather] = await Promise.all([
        getCurrentWeatherData(currentLocation),
        getForecastWeatherData(currentLocation),
      ])

      setCurrentWeatherData(currentWeather)
      setForecastWeatherData(forecastWeather)
    } catch (error) {
      console.error('현재 위치 날씨 데이터 가져오는데 실패 :', error)
    }
  }

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

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites')
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }
  }, [])

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
              setLocation(searchValue)
            }}
          >
            검색
          </Button>
        </div>
        <div className='flex gap-3'>
          <button
            onClick={getCurrentLocationWeather}
            className='text-green-500 font-bold'
          >
            📍 현재 위치 검색
          </button>
          <button
            onClick={() => {
              addFavorite(location)
            }}
            className='text-yellow-500 font-bold'
          >
            ★ 즐겨찾기
          </button>
        </div>
      </header>
      <section className='bg-white p-4 mt-4 rounded shadow'>
        <h2 className='text-lg font-semibold text-gray-600 mb-2'>
          {'⭐ 즐겨찾기'}
        </h2>
        <Favorites
          favorites={favorites}
          onFavoriteChange={deleteFavorite}
          onLocationChange={setLocation}
        />
      </section>
      <section className='bg-white p-4 mt-4 rounded shadow'>
        <h2 className='text-lg font-semibold text-gray-600'>
          {`🌍 현재 날씨 (${location})`}
        </h2>
        {currentWeatherData && <CurrentWeatherCard data={currentWeatherData} />}
      </section>
      <section className='bg-white p-4 mt-4 rounded shadow'>
        <h2 className='text-lg font-semibold text-gray-600'>
          {`⏰ 시간대별 날씨 (${location})`}
        </h2>
        <div className='flex space-x-4 mt-2'>
          {forcaseWeatherData.length && (
            <WeatherLineChart data={forcaseWeatherData.slice(0, 8)} />
          )}
        </div>
      </section>
    </div>
  )
}
