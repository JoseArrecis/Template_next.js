'use client'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { useTheme } from '@mui/material/styles'
import { useState } from 'react'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { MoreVertical as MoreVerticalIcon } from 'lucide-react'

const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

const dataSets = {
  lastMonth: {
    series: [
      { name: 'Sales', data: [12, 18, 14, 20] },
      { name: 'Visits', data: [10, 15, 12, 18] }
    ],
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4']
  },
  last6Months: {
    series: [
      { name: 'Sales', data: [32, 27, 27, 30, 25, 25] },
      { name: 'Visits', data: [25, 35, 20, 20, 20, 20] }
    ],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
  },
  lastYear: {
    series: [
      { name: 'Sales', data: [200, 180, 150, 170, 160, 140, 120, 130, 110, 150, 170, 190] },
      { name: 'Visits', data: [150, 170, 140, 130, 120, 110, 100, 90, 95, 130, 140, 160] }
    ],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  }
}

const RadarSalesChart = () => {
  const theme = useTheme()
  const [period, setPeriod] = useState('last6Months')

  const { series, labels } = dataSets[period]

  const textDisabled = 'var(--mui-palette-text-disabled)'
  const divider = 'var(--mui-palette-divider)'

  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    colors: ['var(--mui-palette-primary-main)', 'var(--mui-palette-info-main)'],
    plotOptions: {
      radar: {
        polygons: {
          connectorColors: divider,
          strokeColors: divider
        }
      }
    },
    stroke: { width: 0 },
    fill: {
      opacity: [1, 0.85]
    },
    labels,
    markers: { size: 0 },
    legend: {
      fontSize: '13px',
      labels: { colors: 'var(--mui-palette-text-secondary)' },
      markers: { offsetY: -1, offsetX: theme.direction === 'rtl' ? 7 : -4 },
      itemMargin: { horizontal: 9 }
    },
    grid: { show: false },
    xaxis: {
      labels: {
        show: true,
        style: {
          fontSize: '13px',
          colors: labels.map(() => textDisabled)
        }
      }
    },
    yaxis: { show: false }
  }

  const PeriodMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const handleClick = (event) => setAnchorEl(event.currentTarget)
    const handleClose = () => setAnchorEl(null)
    const handleSelect = (value) => {
      setPeriod(value)
      handleClose()
    }

    return (
      <>
        <IconButton onClick={handleClick}>
          <MoreVerticalIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={() => handleSelect('lastMonth')}>Last Month</MenuItem>
          <MenuItem onClick={() => handleSelect('last6Months')}>Last 6 Months</MenuItem>
          <MenuItem onClick={() => handleSelect('lastYear')}>Last Year</MenuItem>
        </Menu>
      </>
    )
  }

  return (
    <Card>
      <CardHeader
        title='Sales'
        subheader={
          period === 'lastMonth'
            ? 'Last Month'
            : period === 'last6Months'
            ? 'Last 6 Months'
            : 'Last Year'
        }
        action={<PeriodMenu />}
      />
      <CardContent>
        <AppReactApexCharts type='radar' height={373} width='100%' series={series} options={options} />
      </CardContent>
    </Card>
  )
}

export default RadarSalesChart
