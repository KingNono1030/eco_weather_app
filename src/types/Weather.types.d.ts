type Coord = {
  lon: number
  lat: number
}

type MainData = {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  humidity: number
  sea_level?: number
  grnd_level?: number
}

type WeatherDescription = {
  id: number
  main: string
  description: string
  icon: string
}

type WindData = {
  speed: number
  deg: number
  gust?: number
}

type CloudData = {
  all: number
}

type SysData = {
  type?: number
  id?: number
  country?: string
  sunrise?: number
  sunset?: number
  pod?: string
}

export type ForecastWeatherData = {
  dt: number
  main: MainData
  weather: WeatherDescription[]
  clouds: CloudData
  wind: WindData
  visibility: number
  pop?: number
  sys: SysData
  dt_txt: string
}

export type CurrentWeatherData = {
  coord: Coord
  weather: WeatherDescription[]
  base: string
  main: MainData
  visibility: number
  wind: WindData
  clouds: CloudData
  dt: number
  sys: SysData
  timezone: number
  id: number
  name: string
  cod: number
}
