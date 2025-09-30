'use client'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

// Components Imports
import OptionMenu from '@core/components/option-menu'
import CustomAvatar from '@core/components/mui/Avatar'
import { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

// Datos iniciales
const initialSeries = [
  { data: [2000, 2000, 4000, 4000, 3050, 3050, 2050, 2050, 3050, 3050, 4700, 4700, 2750, 2750, 5700, 5700] }
]

const initialData = [
  {
    title: 'Donates',
    trend: 'negative',
    amount: '$756.26',
    trendDiff: 139.34
  },
  {
    title: 'Podcasts',
    trendDiff: 576.24,
    amount: '$2,207.03'
  }
]

const ProjectStatus = () => {
  const [progressData, setProgressData] = useState(initialData)
  const [seriesData, setSeriesData] = useState(initialSeries) // ✅ Ahora la gráfica es dinámica

  // Estado para Update (todos los items)
  const [openUpdate, setOpenUpdate] = useState(false)
  const [editData, setEditData] = useState(progressData)

  // Hooks
  const theme = useTheme()
  const warningColor = theme.palette.warning.main

  const options = {
    chart: { parentHeightOffset: 0, toolbar: { show: false }, zoom: { enabled: false } },
    tooltip: { enabled: false },
    dataLabels: { enabled: false },
    stroke: { width: 4, curve: 'straight' },
    fill: {
      type: 'gradient',
      gradient: {
        opacityTo: 0,
        opacityFrom: 1,
        shadeIntensity: 1,
        stops: [0, 100],
        colorStops: [
          [
            {
              offset: 0,
              opacity: 0.4,
              color: warningColor
            },
            {
              offset: 100,
              opacity: 0.1,
              color: 'var(--mui-palette-background-paper)'
            }
          ]
        ]
      }
    },
    theme: {
      monochrome: { enabled: true, shadeTo: 'light', shadeIntensity: 1, color: warningColor }
    },
    grid: { show: false, padding: { top: -40, left: 0, right: 0, bottom: 32 } },
    xaxis: { labels: { show: false }, axisTicks: { show: false }, axisBorder: { show: false } },
    yaxis: { show: false }
  }

  // ✅ Refrescar datos + gráfica
  const handleMenuAction = (action) => {
    if (action === 'Refresh') {
      // Actualizar datos de texto
      setProgressData(prev =>
        prev.map(item => ({
          ...item,
          amount: `$${(Math.random() * 5000).toFixed(2)}`,
          trendDiff: (Math.random() * 1000).toFixed(2)
        }))
      )

      // ✅ Actualizar gráfica con nuevos datos aleatorios
      const newSeries = [
        {
          data: Array.from({ length: 16 }, () => Math.floor(Math.random() * 6000) + 1000)
        }
      ]
      setSeriesData(newSeries)
    } else if (action === 'Update') {
      setEditData(progressData)
      setOpenUpdate(true)
    } else if (action === 'Share') {
      if (navigator.share) {
        navigator.share({
          title: 'Assignment Progress',
          text: 'Check out my assignment progress',
          url: window.location.href
        }).catch(err => console.log('Share canceled', err))
      } else {
        alert('Sharing is not supported in this browser.')
      }
    }
  }

  const handleUpdateSave = () => {
    setProgressData(editData)
    setOpenUpdate(false)
  }

  const handleEditChange = (index, field, value) => {
    const updated = [...editData]
    updated[index] = { ...updated[index], [field]: field === 'amount' ? Number(value) : value }
    setEditData(updated)
  }

  return (
    <>
      <Card>
        <CardHeader
          title='Project Status'
          action={
            <OptionMenu
              options={[
                { text: 'Refresh', menuItemProps: { onClick: () => handleMenuAction('Refresh') } },
                { text: 'Update', menuItemProps: { onClick: () => handleMenuAction('Update') } },
                { text: 'Share', menuItemProps: { onClick: () => handleMenuAction('Share') } }
              ]}
            />
          }
        />
        <CardContent className='flex flex-col gap-6'>
          <div className='flex items-center gap-4'>
            <CustomAvatar skin='light' variant='rounded' color='warning'>
              <i className='tabler-currency-dollar' />
            </CustomAvatar>
            <div className='flex justify-between items-center is-full'>
              <div className='flex flex-col'>
                <Typography className='font-medium' color='text.primary'>
                  $4,3742
                </Typography>
                <Typography variant='body2'>Your Earnings</Typography>
              </div>
              <Typography className='font-medium' color='success.main'>
                +10.2%
              </Typography>
            </div>
          </div>

          {/* ✅ Gráfica dinámica */}
          <AppReactApexCharts
            type='area'
            height={198}
            width='100%'
            series={seriesData}
            options={options}
          />

          <div className='flex flex-col gap-4'>
            {progressData.map((item, index) => (
              <div key={index} className='flex items-center justify-between gap-4'>
                <Typography className='font-medium' color='text.primary'>
                  {item.title}
                </Typography>
                <div className='flex items-center gap-4'>
                  <Typography>{item.amount}</Typography>
                  <Typography color={`${item.trend === 'negative' ? 'error' : 'success'}.main`}>
                    {`${item.trend === 'negative' ? '-' : '+'}${item.trendDiff}`}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Modal Update */}
      <Dialog open={openUpdate} onClose={() => setOpenUpdate(false)} maxWidth='sm' fullWidth>
        <DialogTitle>Update All Topics</DialogTitle>
        <DialogContent className='flex flex-col gap-4 mt-2'>
          {editData.map((item, index) => (
            <div key={index} className='flex gap-4 items-center'>
              <TextField
                label='title'
                fullWidth
                value={item.title}
                onChange={(e) => handleEditChange(index, 'title', e.target.value)}
              />
              <TextField
                label='Value'
                type='number'
                value={item.amount}
                onChange={(e) => handleEditChange(index, 'amount', e.target.value)}
                style={{ width: '120px' }}
              />
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUpdate(false)}>Cancel</Button>
          <Button variant='contained' onClick={handleUpdateSave}>Save All</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ProjectStatus
