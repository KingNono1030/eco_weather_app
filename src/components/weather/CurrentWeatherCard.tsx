import { Card, CardContent, Typography, Box } from '@mui/material'
import Grid from '@mui/material/Grid2' // Grid2 사용
import Image from 'next/image'

import { WiStrongWind, WiHumidity, WiThermometer } from 'react-icons/wi'
import { CurrentWeatherData } from '@/types/Weather.types'
import { formatDate } from '@/lib/utils'

const CurrentWeatherCard = ({ data }: { data: CurrentWeatherData }) => {
  const { name, sys, weather, main, wind, dt } = data

  const temperatureC = (main.temp - 273.15).toFixed(1)
  const feelsLikeC = (main.feels_like - 273.15).toFixed(1)

  return (
    <Card
      sx={{ maxWidth: 400, m: 'auto', p: 2, borderRadius: 4, boxShadow: 3 }}
    >
      <CardContent>
        <Typography variant='h5' component='div' gutterBottom align='center'>
          {name}, {sys.country}
        </Typography>
        <Typography variant='h6' component='div' gutterBottom align='center'>
          {formatDate(dt * 1000)}
        </Typography>

        <Box display='flex' justifyContent='center' alignItems='center' mb={2}>
          <Image
            width={50}
            height={50}
            src={`http://openweathermap.org/img/wn/${weather[0].icon}.png`}
            alt={weather[0].description}
          />
          <Typography variant='h6' ml={1}>
            {weather[0].description}
          </Typography>
        </Box>

        <Typography variant='h4' align='center' gutterBottom>
          {temperatureC}°C
        </Typography>
        <Typography variant='body2' align='center' gutterBottom>
          체감 온도 {feelsLikeC}°C
        </Typography>

        <Grid container spacing={2} mt={2} sx={{ justifyContent: 'center' }}>
          <Grid
            xs={4}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <WiThermometer size={32} />
            <Typography variant='body2'>
              최고 온도: {(main.temp_max - 273.15).toFixed(1)}°C
            </Typography>
            <Typography variant='body2'>
              최저 온도: {(main.temp_min - 273.15).toFixed(1)}°C
            </Typography>
          </Grid>
          <Grid
            xs={4}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <WiHumidity size={32} />
            <Typography variant='body2'>습도: {main.humidity}%</Typography>
          </Grid>
          <Grid
            xs={4}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <WiStrongWind size={32} />
            <Typography variant='body2'>풍속: {wind.speed} m/s</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default CurrentWeatherCard
