'use client'

// React Imports
import { useRef, useState } from 'react'

// Next Imports
import dynamic from 'next/dynamic'

// Mui Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grow from '@mui/material/Grow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Popper from '@mui/material/Popper'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import ButtonGroup from '@mui/material/ButtonGroup'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import { useTheme } from '@mui/material/styles'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

// Style Imports
import './styles.css'

const monthOptions = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

const MonthButton = ({ selectedIndex, onChange }) => {
  const [open, setOpen] = useState(false)
  //Ref
  const anchorRef = useRef(null)

  const handleMenuItemClick = (event, index) => {
    onChange(index) 
    setOpen(false)
  }

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <ButtonGroup variant='tonal' ref={anchorRef} aria-label='split button' size='small'>
        <Button>{monthOptions[selectedIndex]}</Button>
        <Button
          className='pli-0 plb-[5px]'
          aria-haspopup='menu'
          onClick={handleToggle}
          aria-label='select merge strategy'
          aria-expanded={open ? 'true' : undefined}
          aria-controls={open ? 'split-button-menu' : undefined}
        >
          <i className='tabler-chevron-down text-xl' />
        </Button>
      </ButtonGroup>
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition placement='bottom-end'>
        {({ TransitionProps, placement }) => (
          <Grow {...TransitionProps} style={{ transformOrigin: placement === 'bottom-end' ? 'right top' : 'left top' }}>
            <Paper className='shadow-lg'>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id='split-button-menu'>
                  {monthOptions.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={event => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )
}

const monthlyData = {
  January: {
    categories: ['1 Jan', '2 Jan', '3 Jan', '4 Jan', '5 Jan', '6 Jan', '7 Jan', '8 Jan', '9 Jan', '10 Jan'],
    series: [
      { name: 'Shipment', type: 'column', data: [38, 45, 33, 38, 32, 48, 45, 40, 42, 37] },
      { name: 'Delivery', type: 'line', data: [23, 28, 23, 32, 25, 42, 32, 32, 26, 24] }
    ]
  },
  February: {
    categories: ['1 Feb', '2 Feb', '3 Feb', '4 Feb', '5 Feb', '6 Feb', '7 Feb', '8 Feb', '9 Feb', '10 Feb'],
    series: [
      { name: 'Shipment', type: 'column', data: [25, 30, 28, 35, 40, 32, 36, 30, 28, 26] },
      { name: 'Delivery', type: 'line', data: [20, 22, 25, 28, 30, 29, 27, 24, 22, 21] }
    ]
  },
  March: {
    categories: ['1 Mar', '2 Mar', '3 Mar', '4 Mar', '5 Mar', '6 Mar', '7 Mar', '8 Mar', '9 Mar', '10 Mar'],
    series: [
      { name: 'Shipment', type: 'column', data: [45, 50, 42, 40, 38, 55, 53, 47, 49, 52] },
      { name: 'Delivery', type: 'line', data: [30, 32, 31, 35, 33, 37, 39, 36, 34, 32] }
    ]
  },
  April: {
    categories: ['1 Apr', '2 Apr', '3 Apr', '4 Apr', '5 Apr', '6 Apr', '7 Apr', '8 Apr', '9 Apr', '10 Apr'],
    series: [
      { name: 'Shipment', type: 'column', data: [50, 55, 48, 52, 60, 58, 54, 57, 53, 56] },
      { name: 'Delivery', type: 'line', data: [35, 38, 36, 40, 42, 41, 39, 37, 34, 33] }
    ]
  },
  May: {
    categories: ['1 May', '2 May', '3 May', '4 May', '5 May', '6 May', '7 May', '8 May', '9 May', '10 May'],
    series: [
      { name: 'Shipment', type: 'column', data: [60, 65, 62, 68, 70, 72, 75, 73, 71, 69] },
      { name: 'Delivery', type: 'line', data: [40, 42, 45, 48, 50, 49, 47, 44, 43, 41] }
    ]
  },
  June: {
    categories: ['1 Jun', '2 Jun', '3 Jun', '4 Jun', '5 Jun', '6 Jun', '7 Jun', '8 Jun', '9 Jun', '10 Jun'],
    series: [
      { name: 'Shipment', type: 'column', data: [55, 58, 60, 62, 65, 63, 61, 59, 57, 56] },
      { name: 'Delivery', type: 'line', data: [38, 40, 42, 44, 46, 45, 43, 41, 39, 37] }
    ]
  },
  July: {
    categories: ['1 Jul', '2 Jul', '3 Jul', '4 Jul', '5 Jul', '6 Jul', '7 Jul', '8 Jul', '9 Jul', '10 Jul'],
    series: [
      { name: 'Shipment', type: 'column', data: [70, 75, 72, 78, 80, 82, 85, 83, 81, 79] },
      { name: 'Delivery', type: 'line', data: [50, 52, 55, 58, 60, 59, 57, 54, 53, 51] }
    ]
  },
  August: {
    categories: ['1 Aug', '2 Aug', '3 Aug', '4 Aug', '5 Aug', '6 Aug', '7 Aug', '8 Aug', '9 Aug', '10 Aug'],
    series: [
      { name: 'Shipment', type: 'column', data: [65, 68, 70, 72, 75, 73, 71, 69, 67, 66] },
      { name: 'Delivery', type: 'line', data: [45, 47, 49, 51, 53, 52, 50, 48, 46, 44] }
    ]
  },
  September: {
    categories: ['1 Sep', '2 Sep', '3 Sep', '4 Sep', '5 Sep', '6 Sep', '7 Sep', '8 Sep', '9 Sep', '10 Sep'],
    series: [
      { name: 'Shipment', type: 'column', data: [60, 62, 65, 68, 70, 69, 67, 64, 63, 61] },
      { name: 'Delivery', type: 'line', data: [40, 42, 44, 46, 48, 47, 45, 43, 41, 39] }
    ]
  },
  October: {
    categories: ['1 Oct', '2 Oct', '3 Oct', '4 Oct', '5 Oct', '6 Oct', '7 Oct', '8 Oct', '9 Oct', '10 Oct'],
    series: [
      { name: 'Shipment', type: 'column', data: [55, 58, 60, 62, 65, 63, 61, 59, 57, 56] },
      { name: 'Delivery', type: 'line', data: [38, 40, 42, 44, 46, 45, 43, 41, 39, 37] }
    ]
  },
  November: {
    categories: ['1 Nov', '2 Nov', '3 Nov', '4 Nov', '5 Nov', '6 Nov', '7 Nov', '8 Nov', '9 Nov', '10 Nov'],
    series: [
      { name: 'Shipment', type: 'column', data: [50, 52, 55, 58, 60, 59, 57, 54, 53, 51] },
      { name: 'Delivery', type: 'line', data: [35, 37, 39, 41, 43, 42, 40, 38, 36, 34] }
    ]
  },
  December: {
    categories: ['1 Dec', '2 Dec', '3 Dec', '4 Dec', '5 Dec', '6 Dec', '7 Dec', '8 Dec', '9 Dec', '10 Dec'],
    series: [
      { name: 'Shipment', type: 'column', data: [45, 48, 50, 52, 55, 53, 51, 49, 47, 46] },
      { name: 'Delivery', type: 'line', data: [30, 32, 34, 36, 38, 37, 35, 33, 31, 29] }
    ]
  }
}

const LogisticsShipmentStatistics = () => {
  const theme = useTheme()

  const [selectedMonth, setSelectedMonth] = useState(0)

  const monthName = monthOptions[selectedMonth]
  const { categories, series } = monthlyData[monthName] || monthlyData['January']

  const chartOptions = {
    chart: {
      type: 'line',
      stacked: false,
      parentHeightOffset: 0,
      toolbar: { show: false },
      zoom: { enabled: false }
    },
    markers: {
      size: 5,
      colors: '#fff',
      strokeColors: 'var(--mui-palette-primary-main)',
      hover: { size: 6 },
      radius: 4
    },
    stroke: { curve: 'smooth', width: [0, 3], lineCap: 'round' },
    legend: {
      show: true,
      position: 'bottom',
      markers: { width: 8, height: 8, offsetY: 1, offsetX: theme.direction === 'rtl' ? 8 : -4 },
      height: 40,
      itemMargin: { horizontal: 10, vertical: 0 },
      fontSize: '15px',
      fontFamily: 'Open Sans',
      fontWeight: 400,
      labels: { colors: 'var(--mui-palette-text-primary)' },
      offsetY: 10
    },
    grid: { strokeDashArray: 8, borderColor: 'var(--mui-palette-divider)' },
    colors: ['var(--mui-palette-warning-main)', 'var(--mui-palette-primary-main)'],
    fill: { opacity: [1, 1] },
    plotOptions: { bar: { columnWidth: '30%', borderRadius: 4, borderRadiusApplication: 'end' } },
    dataLabels: { enabled: false },
    xaxis: {
      categories,
      tickAmount: 10,
      labels: {
        style: {
          colors: 'var(--mui-palette-text-disabled)',
          fontSize: '13px',
          fontWeight: 400
        }
      },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: {
      tickAmount: 5,
      labels: {
        style: {
          colors: 'var(--mui-palette-text-disabled)',
          fontSize: '13px',
          fontWeight: 400
        }
      }
    }
  }

  return (
    <Card>
      <CardHeader
        title='Shipment Statistics'
        subheader={`Total number of deliveries (${monthName})`}
        action={<MonthButton selectedIndex={selectedMonth} onChange={setSelectedMonth} />}
      />
      <CardContent>
        <AppReactApexCharts
          id='shipment-statistics'
          type='line'
          height={310}
          width='100%'
          series={series}
          options={chartOptions}
        />
      </CardContent>
    </Card>
  )
}

export default LogisticsShipmentStatistics
