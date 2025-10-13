'use client'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { useTheme } from '@mui/material/styles'

// Components Imports
import OptionMenu from '@core/components/option-menu'
import { useState } from 'react'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

const LogisticsDeliveryExceptions = () => {
  const [chartData, setChartData] = useState([ 13, 25, 22, 40 ])

  // Hooks
  const theme = useTheme()

  const options = {
    labels: ['Incorrect address', 'Weather conditions', 'Federal Holidays', 'Damage during transit'],
    stroke: {
      width: 0
    },
    colors: [
      'var(--mui-palette-success-main)',
      'rgba(var(--mui-palette-success-mainChannel) / 0.8)',
      'rgba(var(--mui-palette-success-mainChannel) / 0.6)',
      'rgba(var(--mui-palette-success-mainChannel) / 0.4)'
    ],
    dataLabels: {
      enabled: false,
      formatter(val) {
        return `${Number.parseInt(val)}%`
      }
    },
    legend: {
      show: true,
      position: 'bottom',
      offsetY: 10,
      markers: {
        width: 8,
        height: 8,
        offsetY: 1,
        offsetX: theme.direction === 'rtl' ? 8 : -4
      },
      itemMargin: {
        horizontal: 15,
        vertical: 5
      },
      fontSize: '13px',
      fontWeight: 400,
      labels: {
        colors: 'var(--mui-palette-text-secondary)',
        useSeriesColors: false
      }
    },
    grid: {
      padding: {
        top: 15
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '75%',
          labels: {
            show: true,
            value: {
              fontSize: '24px',
              color: 'var(--mui-palette-text-primary)',
              fontWeight: 500,
              offsetY: -20
            },
            name: { offsetY: 20 },
            total: {
              show: true,
              fontSize: '0.9375rem',
              fontWeight: 400,
              label: 'AVG. Exceptions',
              color: 'var(--mui-palette-text-secondary)',
              formatter() {
                return '30%'
              }
            }
          }
        }
      }
    }
  }

  //Acciones de Menú
  const handleMenuAction = (action) => {
    if (action === 'Refresh') {
      const newData = chartData.map(() => Math.floor(Math.random() * 50) + 10)
      setChartData(newData)
    } else if (action === 'SelectAll') {
      const allSelected = chartData.map(() => 100)
      setChartData(allSelected)
    } else if (action === 'Share') {
      if (navigator.share) {
        navigator.share({
          title: 'Delivery Exception',
          text: 'Check total deliverys',
          url: window.location.href
        }).catch(err => console.log('Share canceled', err))
      } else { 
        alert('Sharing is not supported in this browser')
      }
    }
  }

  return (
    <Card className='bs-full'>
        <CardHeader
          title='Earning Reports'
          subheader='Weekly Earnings Overview'
          action={
            <OptionMenu
              options={[
                { text: 'Refresh', menuItemProps: { onClick: () => handleMenuAction('Refresh') } },
                { text: 'SelectAll', menuItemProps: { onClick: () => handleMenuAction('SelectAll') } },
                { text: 'Share', menuItemProps: { onClick: () => handleMenuAction('Share') } }
              ]}
            />
          }
        />
      <CardContent>
        <AppReactApexCharts
          type='donut'
          height={452}
          width='100%'
          series={chartData}
          options={options}
        />
      </CardContent>
    </Card>
  )
}

export default LogisticsDeliveryExceptions
