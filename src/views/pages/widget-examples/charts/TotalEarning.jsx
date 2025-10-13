'use client'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

// Third Party Imports
import classnames from 'classnames'

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

// Vars iniciales
const initialSeries = [
  { name: 'Earning', data: [15, 10, 20, 8, 12, 18, 12, 5] },
  { name: 'Expense', data: [-7, -10, -7, -12, -6, -9, -5, -8] }
]

const initialData = [
  {
    title: 'Total Revenue',
    subtitle: 'Client Payment',
    amount: 126,
    avatarColor: 'primary',
    avatarIcon: 'tabler-brand-paypal'
  },
  {
    title: 'Total Sales',
    subtitle: 'Refund',
    amount: 98,
    avatarColor: 'secondary',
    avatarIcon: 'tabler-currency-dollar'
  }
]

const TotalEarning = () => {
  const [progressData, setProgressData] = useState(initialData)
  const [chartSeries, setChartSeries] = useState(initialSeries)

  // Estado para Update
  const [openUpdate, setOpenUpdate] = useState(false)
  const [editData, setEditData] = useState(initialData)

  // Hooks
  const theme = useTheme()

  // Opciones de gráfica
  const options = {
    chart: {
      stacked: true,
      parentHeightOffset: 0,
      toolbar: { show: false },
      zoom: { enabled: false }
    },
    legend: { show: false },
    tooltip: { enabled: false },
    dataLabels: { enabled: false },
    stroke: {
      width: 5,
      colors: ['var(--mui-palette-background-paper)']
    },
    colors: ['var(--mui-palette-primary-main)', 'var(--mui-palette-secondary-main)'],
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
      padding: { top: -56, left: -13, right: 0, bottom: -15 }
    },
    xaxis: {
      labels: { show: false },
      axisTicks: { show: false },
      crosshairs: { opacity: 0 },
      axisBorder: { show: false }
    },
    yaxis: { labels: { show: false } }
  }

  // Acciones de menú
  const handleMenuAction = (action) => {
    if (action === 'Refresh') {
      setProgressData(prev =>
        prev.map(item => ({
          ...item,
          amount: Math.floor(Math.random() * 100) + 1
        }))
      )
      setChartSeries([
        { name: 'Earning', data: Array.from({ length: 8 }, () => Math.floor(Math.random() * 20) + 5) },
        { name: 'Expense', data: Array.from({ length: 8 }, () => -(Math.floor(Math.random() * 15) + 3)) }
      ])
    } else if (action === 'Update') {
      setEditData(progressData)
      setOpenUpdate(true)
    } else if (action === 'Share') {
      if (navigator.share) {
        navigator
          .share({
            title: 'Total Earning',
            text: 'Check total earnings',
            url: window.location.href
          })
          .catch(err => console.log('Share canceled', err))
      } else {
        alert('Sharing is not supported in this browser')
      }
    }
  }

  const handleUpdateSave = () => {
    setProgressData(editData)
    setOpenUpdate(false)
  }

  const handleEditChange = (index, field, value) => {
    const updated = [...editData]
    updated[index] = {
      ...updated[index],
      [field]: field === 'amount' && !isNaN(value) ? Number(value) : value
    }
    setEditData(updated)
  }

  return (
    <>
      <Card>
        <CardHeader
          title='Total Earning'
          action={
            <OptionMenu
              options={[
                { text: 'Refresh', menuItemProps: { onClick: () => handleMenuAction('Refresh') } },
                { text: 'Update', menuItemProps: { onClick: () => handleMenuAction('Update') } },
                { text: 'Share', menuItemProps: { onClick: () => handleMenuAction('Share') } }
              ]}
            />
          }
          subheader={
            <div className='flex items-center gap-2'>
              <Typography variant='h2'>87%</Typography>
              <div className='flex items-center gap-1'>
                <i className='tabler-chevron-up text-xl text-success' />
                <Typography color='success.main'>25.8%</Typography>
              </div>
            </div>
          }
        />
        <CardContent className='flex flex-col gap-4'>
          <AppReactApexCharts type='bar' height={189} width='100%' series={chartSeries} options={options} />

          {progressData.map((item, index) => (
            <div key={index} className='flex items-center gap-4'>
              <CustomAvatar skin='light' variant='rounded' color={item.avatarColor} size={38}>
                <i className={classnames(item.avatarIcon, 'text-[22px]')} />
              </CustomAvatar>
              <div className='flex justify-between items-center is-full'>
                <div className='flex flex-col'>
                  <Typography className='font-medium' color='text.primary'>
                    {item.title}
                  </Typography>
                  <Typography variant='body2'>{item.subtitle}</Typography>
                </div>
                <Typography className='font-medium' color='success.main'>
                  ${item.amount}
                </Typography>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Modal Update */}
      <Dialog open={openUpdate} onClose={() => setOpenUpdate(false)} maxWidth='md' fullWidth>
        <DialogTitle>Update Total Earning</DialogTitle>
        <DialogContent className='flex flex-col gap-4 mt-2'>
          {editData.map((item, index) => (
            <div key={index} className='flex gap-4 items-center'>
              <TextField
                label='Title'
                fullWidth
                value={item.title}
                onChange={(e) => handleEditChange(index, 'title', e.target.value)}
              />
              <TextField
                label='Subtitle'
                fullWidth
                value={item.subtitle}
                onChange={(e) => handleEditChange(index, 'subtitle', e.target.value)}
              />
              <TextField
                label='Amount'
                value={item.amount}
                onChange={(e) => handleEditChange(index, 'amount', e.target.value)}
                style={{ width: '120px' }}
              />
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUpdate(false)}>Cancel</Button>
          <Button variant='contained' onClick={handleUpdateSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default TotalEarning
