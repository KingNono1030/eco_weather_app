'use client'

import React, { useState } from 'react'
import { Box, Tabs, Tab, Typography } from '@mui/material'
import { LineChart } from '@mui/x-charts'

type TabIndex = 0 | 1 | 2

const WeatherTabs = () => {
  const [activeTab, setActiveTab] = useState<TabIndex>(0) // 현재 활성화된 탭 인덱스

  const handleTabChange = (event, newValue: TabIndex) => {
    setActiveTab(newValue)
  }

  const data = [
    { time: '3AM', temperature: 1.9, feels_like: -2.9, windSpeed: 5.89 },
    { time: '6AM', temperature: 0.4, feels_like: -4.2, windSpeed: 6.12 },
    { time: '9AM', temperature: -1.0, feels_like: -5.6, windSpeed: 6.89 },
    { time: '12PM', temperature: 2.5, feels_like: -0.5, windSpeed: 4.78 },
    { time: '3PM', temperature: 4.0, feels_like: 1.2, windSpeed: 3.56 },
  ]

  const chartData: Record<TabIndex, Record<string, string>> = {
    0: { dataKey: 'temperature', label: '현재 기온 (°C)', color: '#ff5722' },
    1: { dataKey: 'feels_like', label: '체감 온도 (°C)', color: '#2196f3' },
    2: { dataKey: 'windSpeed', label: '풍속 (m/s)', color: '#4caf50' },
  }

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Tabs value={activeTab} onChange={handleTabChange} centered>
        <Tab label='현재 기온' />
        <Tab label='체감 온도' />
        <Tab label='풍속' />
      </Tabs>

      <Box
        sx={{
          mt: 3,
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant='h6' align='center' gutterBottom>
          {chartData[activeTab].label}
        </Typography>
        <LineChart
          width={1200}
          height={400}
          dataset={data}
          xAxis={[
            {
              dataKey: 'time',
              label: 'Time',
              scaleType: 'band',
            },
          ]}
          series={[
            {
              dataKey: chartData[activeTab].dataKey, // 현재 선택된 탭의 데이터
              label: chartData[activeTab].label,
              color: chartData[activeTab].color,
            },
          ]}
        />
      </Box>
    </Box>
  )
}

export default WeatherTabs
