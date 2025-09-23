'use client'

// React Imports
import { useEffect, useState } from 'react'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid2'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

// Opciones de años disponibles
const yearOptions = [2022, 2023, 2024]

// Datos de ejemplo por año
const yearData = {
  2022: {
    barSeries: [
      { name: 'Earning', data: [120, 150, 180, 200, 220, 250, 230, 210, 190] },
      { name: 'Expense', data: [-80, -100, -120, -110, -90, -70, -60, -100, -120] }
    ],
    lineSeries: [
      { name: 'Last Month', data: [15, 20, 18, 22, 25, 19, 30, 27, 23, 20, 18] },
      { name: 'This Month', data: [30, 35, 33, 40, 38, 42, 45, 50, 47, 44, 39] }
    ],
    total: '$18,540',
    budget: '40,000'
  },
  2023: {
    barSeries: [
      { name: 'Earning', data: [150, 200, 220, 250, 280, 300, 270, 260, 240] },
      { name: 'Expense', data: [-90, -110, -130, -120, -100, -80, -70, -110, -130] }
    ],
    lineSeries: [
      { name: 'Last Month', data: [20, 25, 22, 28, 30, 26, 35, 33, 29, 25, 24] },
      { name: 'This Month', data: [40, 45, 43, 50, 55, 52, 60, 65, 62, 58, 55] }
    ],
    total: '$22,350',
    budget: '50,000'
  },
  2024: {
    barSeries: [
      { name: 'Earning', data: [200, 230, 260, 280, 310, 340, 320, 300, 280] },
      { name: 'Expense', data: [-100, -130, -150, -140, -120, -100, -90, -130, -150] }
    ],
    lineSeries: [
      { name: 'Last Month', data: [25, 30, 28, 35, 38, 33, 40, 37, 34, 30, 29] },
      { name: 'This Month', data: [50, 55, 53, 60, 65, 62, 70, 75, 72, 68, 65] }
    ],
    total: '$25,825',
    budget: '56,800'
  }
}

const RevenueReport = () => {
  // States
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedYear, setSelectedYear] = useState(2024)
  const [budget, setBudget] = useState(Number(yearData[selectedYear].budget.replace(/,/g, '')));

  useEffect (() => {
    setBudget(Number(yearData[selectedYear].budget.replace(/,/g, '')));
  }, [selectedYear])

  const increaseBudget = () => {
    setBudget(prev => prev + 1000)
  }

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (year) => {
    if (year) setSelectedYear(year)
    setAnchorEl(null)
  }

  // Hooks
  const theme = useTheme()

  // Vars
  const disabledText = 'var(--mui-palette-text-disabled)'

  const barOptions = {
    chart: {
      stacked: true,
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    tooltip: { enabled: false },
    dataLabels: { enabled: false },
    stroke: {
      width: 6,
      colors: ['var(--mui-palette-background-paper)']
    },
    colors: ['var(--mui-palette-primary-main)', 'var(--mui-palette-warning-main)'],
    legend: {
      offsetY: -4,
      offsetX: -35,
      position: 'top',
      horizontalAlign: 'left',
      fontSize: '13px',
      fontFamily: theme.typography.fontFamily,
      labels: { colors: 'var(--mui-palette-text-secondary)' },
      itemMargin: {
        horizontal: 9
      },
      markers: {
        width: 12,
        height: 12,
        radius: 10,
        offsetY: 1,
        offsetX: theme.direction === 'rtl' ? 7 : -4
      }
    },
    states: {
      hover: { filter: { type: 'none' } },
      active: { filter: { type: 'none' } }
    },
    plotOptions: {
      bar: {
        borderRadius: 7,
        columnWidth: '40%',
        borderRadiusApplication: 'around',
        borderRadiusWhenStacked: 'all'
      }
    },
    grid: {
      borderColor: 'var(--mui-palette-divider)',
      yaxis: { lines: { show: false } },
      padding: { left: -6, right: -11, bottom: -11 }
    },
    xaxis: {
      axisTicks: { show: false },
      crosshairs: { opacity: 0 },
      axisBorder: { show: false },
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      labels: {
        style: {
          colors: disabledText,
          fontFamily: theme.typography.fontFamily,
          fontSize: theme.typography.body2.fontSize
        }
      }
    },
    yaxis: {
      tickAmount: 5,
      labels: {
        offsetX: -14,
        style: {
          colors: disabledText,
          fontFamily: theme.typography.fontFamily,
          fontSize: theme.typography.body2.fontSize
        }
      }
    }
  }

  const lineOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
      zoom: { enabled: false }
    },
    stroke: {
      width: [1, 2],
      curve: 'smooth',
      dashArray: [5, 0]
    },
    colors: ['var(--mui-palette-divider)', 'var(--mui-palette-primary-main)'],
    legend: { show: false },
    grid: {
      padding: { top: -28, left: -11, right: 0, bottom: -15 },
      yaxis: { lines: { show: false } }
    },
    xaxis: {
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false }
    },
    yaxis: { labels: { show: false } }
  }

  return (
    <Card>
      <Grid container>
        <Grid size={{ xs: 12, sm: 8 }} className='border-r'>
          <CardHeader title='Revenue Report' />
          <CardContent>
            <AppReactApexCharts
              type='bar'
              height={320}
              width='100%'
              series={yearData[selectedYear].barSeries}
              options={barOptions}
            />
          </CardContent>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <CardContent className='flex flex-col items-center justify-center min-bs-full gap-8'>
            <Button
              size='small'
              variant='tonal'
              onClick={handleClick}
              endIcon={<i className='tabler-chevron-down text-xl' />}
            >
              {selectedYear}
            </Button>
            <Menu
              keepMounted
              anchorEl={anchorEl}
              onClose={() => handleClose()}
              open={Boolean(anchorEl)}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              {yearOptions.map(year => (
                <MenuItem key={year} onClick={() => handleClose(year)}>
                  {year}
                </MenuItem>
              ))}
            </Menu>
            <div className='flex flex-col items-center'>
              <Typography variant='h3'>{yearData[selectedYear].total}</Typography>
              <Typography>
                <span className='font-medium text-textPrimary'>Budget: </span>
                {budget.toLocaleString()}
              </Typography>
              <Button></Button>
            </div>
            <AppReactApexCharts
              type='line'
              height={80}
              width='100%'
              series={yearData[selectedYear].lineSeries}
              options={lineOptions}
            />
            <Button variant='contained' onClick={increaseBudget}>Increase Budget</Button>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  )
}

export default RevenueReport
