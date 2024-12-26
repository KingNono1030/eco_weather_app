# 🌤️ 에코 웨더 앱 (Eco Weather App)

## 📌 프로젝트 소개
**에코 웨더 앱**은 사용자가 실시간 날씨 데이터를 확인하고, 시간대별 예보와 즐겨찾는 도시의 날씨를 관리할 수 있는 웹 애플리케이션입니다.  
배포링크: https://eco-weather-now.netlify.app/

---

## 🛠️ 구현한 기능

### 1️⃣ **현재 날씨 확인**
- **현재 위치** 또는 **검색한 도시**의 실시간 날씨 정보를 확인.
- 현재 온도, 체감 온도, 습도, 풍속 등의 세부 정보 제공.

### 2️⃣ **시간대별 날씨 예보**
- 선택한 도시의 3시간 간격 시간대별 날씨를 차트로 시각화.

### 3️⃣ **즐겨찾기 관리**
- 자주 조회하는 도시를 즐겨찾기로 추가 및 삭제 가능.
- 로컬 스토리지를 활용하여 즐겨찾기 데이터 유지.

---

## 📂 프로젝트 구조
```
.
├── src/
│   ├── components/             # UI 컴포넌트
│   │   ├── weather/
│   │   │   ├── CurrentWeatherCard.tsx
│   │   │   ├── WeatherTabs.tsx
│   │   ├── favorite/
│   │   │   ├── Favorites.tsx
│   ├── constants/              # 상수 정의
│   ├── services/               # API 서비스
│   │   ├── geoLocationService.ts
│   │   ├── openWeatherMapService.ts
│   ├── types/                  # 타입 정의
│   ├── app/                  # 페이지 구성
│   │   ├── page.tsx
```

---

## 🚀 실행 방법

### 1️⃣ **프로젝트 클론**
```bash
git clone https://github.com/your-username/eco-weather-app.git
cd eco-weather-app
```

### 2️⃣ 의존성 설치
```bash
npm install -g pnpm
pnpm install
```

### 3️⃣ 환경 변수 설정
- OpenWeatherMap API 키를 발급받아 .env.local 파일에 추가:

```.env
NEXT_PUBLIC_OPENWEATHER_API_KEY=YOUR_API_KEY
```

### 4️⃣ 개발 서버 실행
```
pnpm dev
```
- 브라우저에서 http://localhost:3000 열기.

### 🌐 배포 링크
- URL: [https://eco-weather.vercel.app](https://eco-weather-now.netlify.app/)

## 🔧 사용된 기술

### 🚀 **프레임워크 및 라이브러리**
- **React**: 사용자 인터페이스 개발.
- **Next.js**: 페이지 기반 라우팅 및 이미지 최적화 지원.
- **TypeScript**: 안정적인 타입 시스템을 적용하여 유지보수성 강화.

### 📡 **HTTP 클라이언트**
- **Ky**:
  - 가볍고 현대적인 HTTP 클라이언트 라이브러리.
  - OpenWeatherMap API와 통신할 때 사용.
  - `fetch`를 기반으로 추가적인 편의 기능 제공 (자동 재시도, JSON 파싱 등).
  - 예제:
    ```ts
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

    ```
### 🎨 **스타일링**
- **Tailwind CSS**: 유틸리티 기반의 CSS 프레임워크로, 직관적이고 빠른 UI 스타일링.
- **Material-UI (MUI)**:
  - React 기반의 UI 컴포넌트 라이브러리.
  - 프로젝트에서 다음과 같은 컴포넌트를 활용:
    - **Autocomplete**: 도시 검색 기능 구현.
    - **Card**: 현재 날씨와 즐겨찾기 리스트 표시.
    - **Grid**: 반응형 레이아웃 구성.
  - 예제:
    ```tsx
    import { Card, CardContent, TextField, Autocomplete } from '@mui/material';

          <Autocomplete
            sx={{ width: 300 }}
            disablePortal
            options={locationArray}
            onChange={(_, newValue) => setSearchValue(newValue)}
            renderInput={(params) => <TextField {...params} label='도시' />}
            value={searchValue}
            defaultValue={DEFAULT_CITY}
          />
    ```
## ✨ 구현 상세

### 현재 날씨 정보
- OpenWeatherMap API를 사용하여 현재 도시의 실시간 날씨 데이터를 표시합니다.
- 주요 데이터: 현재 온도, 체감 온도, 최저/최고 온도, 풍속, 습도.

https://github.com/user-attachments/assets/2ba720a7-add1-48af-b835-908bb797d506

![image](https://github.com/user-attachments/assets/f279e4da-c0d9-43c0-9c09-571c0c35448f)
- 클라이언트에서 OpenWeatherMap API 요청 보낼 시 cors 에러 반환되어 api route 로 요청을 우회하여 보냄

### 시간대별 예보
- OpenWeatherMap API에서 시간대별 예보 데이터를 가져와 3시간 단위로 차트에 렌더링합니다.

https://github.com/user-attachments/assets/b948c083-2747-486f-8375-f28ff543d058

### 즐겨찾기 기능
- 로컬 스토리지를 활용하여 즐겨찾는 도시를 유지.
- 추가 및 삭제 시 UI와 동기화.

https://github.com/user-attachments/assets/dd0881fa-8521-484f-be80-a0bbcf914309

### 현재 위치 동기화
- navigator.geolocation 을 사용하여 현재 위치 데이터 조회

https://github.com/user-attachments/assets/13d63ee5-ed0b-4b49-aafb-0ddc6fc5856f

## 📊 사용된 API

### OpenWeatherMap API
1. 현재 날씨 데이터
  - Weather API Docs
  - 사용된 엔드포인트: /data/2.5/weather
2. 시간대별 예보 데이터
  - Forecast API Docs
  - 사용된 엔드포인트: /data/2.5/forecast

