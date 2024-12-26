'use client'

import React, { useState } from 'react'
import { Box, Tabs, Tab } from '@mui/material'
import { LineChart } from '@mui/x-charts'
import { ForecastWeatherData } from '@/types/Weather.types'
import { getProcessedWeatherData } from '@/lib/utils'
type TabIndex = 0 | 1 | 2

const WeatherTabs = ({ data }: { data: ForecastWeatherData[] }) => {
  const [activeTab, setActiveTab] = useState<TabIndex>(0)

  const handleTabChange = (_: React.SyntheticEvent, newValue: TabIndex) => {
    setActiveTab(newValue)
  }

  const processedData = getProcessedWeatherData(data)

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
        <LineChart
          width={1200}
          height={400}
          dataset={processedData}
          xAxis={[
            {
              dataKey: 'time',
              label: '시간',
              scaleType: 'band',
            },
          ]}
          series={[
            {
              dataKey: chartData[activeTab].dataKey,
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
