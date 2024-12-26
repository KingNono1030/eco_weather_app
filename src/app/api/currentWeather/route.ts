import { NextRequest, NextResponse } from 'next/server'
import { weatherKy } from '@/lib/kyInstance'
import {
  WEATHER_MAP_API_KEY,
  WEATHER_MAP_DEFAULT_LANGUAGE,
} from '@/constants/api/weatherApi'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const lat = searchParams.get('lat')
  const lon = searchParams.get('lon')

  if (!lat || !lon) {
    return NextResponse.json(
      { message: '위도와 경도가 입력되지 않았습니다.' },
      { status: 400 }
    )
  }

  try {
    const data = await weatherKy
      .get('weather', {
        searchParams: {
          lat,
          lon,
          appid: WEATHER_MAP_API_KEY,
          lang: WEATHER_MAP_DEFAULT_LANGUAGE,
        },
      })
      .json()

    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.error('날씨 데이터 요청 중 에러가 발생했습니다:', error)
    return NextResponse.json(
      { message: '날씨 데이터를 조회하는데 실패했습니다.' },
      { status: 500 }
    )
  }
}
