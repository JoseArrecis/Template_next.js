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

// Vars
const initialData = [
  {
    title: 'New Tickets',
    subtitle: '142',
    avatarColor: 'primary',
    avatarIcon: 'tabler-ticket'
  },
  {
    title: 'Open Tickets',
    subtitle: '28',
    avatarColor: 'info',
    avatarIcon: 'tabler-check'
  },
  {
    title: 'Response Time',
    subtitle: '1 Day',
    avatarColor: 'warning',
    avatarIcon: 'tabler-clock'
  }
]

const SupportTracker = () => {
  const [progressData, setProgressData] = useState(initialData)
  const [chartValue, setChartValue] = useState(85) 

  const [openUpdate, setOpenUpdate] = useState(false)
  const [editData, setEditData] = useState(progressData)

  // Hooks
  const theme = useTheme()

  // Vars
  const disabledText = 'var(--mui-palette-text-disabled)'

  const options = {
    stroke: { dashArray: 10 },
    labels: ['Completed Task'],
    colors: ['var(--mui-palette-primary-main)'],
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        opacityTo: 0.5,
        opacityFrom: 1,
        shadeIntensity: 0.5,
        stops: [30, 70, 100],
        inverseColors: false,
        gradientToColors: ['var(--mui-palette-primary-main)']
      }
    },
    plotOptions: {
      radialBar: {
        endAngle: 130,
        startAngle: -140,
        hollow: { size: '60%' },
        track: { background: 'transparent' },
        dataLabels: {
          name: {
            offsetY: -24,
            color: disabledText,
            fontFamily: theme.typography.fontFamily,
            fontSize: theme.typography.body2.fontSize
          },
          value: {
            offsetY: 8,
            fontWeight: 500,
            formatter: value => `${value}%`,
            color: 'var(--mui-palette-text-primary)',
            fontFamily: theme.typography.fontFamily,
            fontSize: theme.typography.h2.fontSize
          }
        }
      }
    },
    grid: {
      padding: {
        top: -18,
        left: 0,
        right: 0,
        bottom: 14
      }
    }
  }

  const handleMenuAction = (action) => {
    if (action === 'Refresh') {
      setProgressData(prev =>
        prev.map(item => ({
          ...item,
          subtitle: Math.floor(Math.random() * 100) + 1
        }))
      )

      setChartValue(Math.floor(Math.random() * 100) + 1)
    } else if (action === 'Update') {
      setEditData(progressData)
      setOpenUpdate(true)
    } else if (action === 'Share') {
      if (navigator.share) {
        navigator.share({
          title: 'Support Tracker',
          text: 'Check support tracker',
          url: window.location.href
        }).catch(err => console.log('Share canceled', err))
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
      [field]: field === 'subtitle' && !isNaN(value) ? Number(value) : value
    }
    setEditData(updated)
  }

  return (
    <>
      <Card>
        <CardHeader
          title='Support Tracker'
          subheader='Last 7 Days'
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
        <CardContent className='flex flex-col sm:flex-row items-center justify-between gap-7'>
          <div className='flex flex-col gap-6 is-full sm:is-[unset]'>
            <div className='flex flex-col'>
              <Typography variant='h2'>164</Typography>
              <Typography>Total Tickets</Typography>
            </div>
            <div className='flex flex-col gap-4 is-full'>
              {progressData.map((item, index) => (
                <div key={index} className='flex items-center gap-4'>
                  <CustomAvatar skin='light' variant='rounded' color={item.avatarColor} size={34}>
                    <i className={classnames(item.avatarIcon, 'text-[22px]')} />
                  </CustomAvatar>
                  <div className='flex flex-col'>
                    <Typography className='font-medium' color='text.primary'>
                      {item.title}
                    </Typography>
                    <Typography variant='body2'>{item.subtitle}</Typography>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <AppReactApexCharts
            type='radialBar'
            height={350}
            width='100%'
            series={[chartValue]}
            options={options}
          />
        </CardContent>
      </Card>

      {/* Modal Updated */}
      <Dialog open={openUpdate} onClose={() => setOpenUpdate(false)}>
        <DialogTitle>Update Tracker</DialogTitle>
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
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUpdate(false)}>Cancel</Button>
          <Button variant='contained' onClick={handleUpdateSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default SupportTracker
