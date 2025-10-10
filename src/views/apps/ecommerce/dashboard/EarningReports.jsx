'use client'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import classnames from 'classnames'

// Components Imports
import OptionMenu from '@core/components/option-menu'
import CustomAvatar from '@core/components/mui/Avatar'
import { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

// Vars
const initialSeries = [
  { name: 'Earning', data: [32, 98, 61, 41, 88, 47, 71] }
]

const initialData = [
  {
    amount: '$1,619',
    trendNumber: 18.6,
    title: 'Net Profit',
    avatarColor: 'primary',
    subtitle: '12.4k Sales',
    avatarIcon: 'tabler-chart-pie-2'
  },
  {
    amount: '$3,571',
    trendNumber: 39.6,
    title: 'Total Income',
    avatarColor: 'success',
    subtitle: 'Sales, Affiliation',
    avatarIcon: 'tabler-currency-dollar'
  },
  {
    amount: '$430',
    trendNumber: 52.8,
    title: 'Total Expenses',
    avatarColor: 'secondary',
    subtitle: 'ADVT, Marketing',
    avatarIcon: 'tabler-credit-card'
  }
]

const EarningReports = () => {
  const [progressData, setProgressData] = useState(initialData)
  const [chartSeries, setChartSeries] = useState(initialSeries)

  // Estado para Update
  const [openUpdate, setOpenUpdate] = useState(false)
  const [editData, setEditData] = useState(initialData)

  // Vars
  const primaryColorWithOpacity = 'var(--mui-palette-primary-lightOpacity)'

  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    tooltip: { enabled: false },
    grid: {
      show: false,
      padding: {
        top: -16,
        left: -18,
        right: -17,
        bottom: -11
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        distributed: true,
        columnWidth: '60%'
      }
    },
    legend: { show: false },
    dataLabels: { enabled: false },
    colors: [
      primaryColorWithOpacity,
      primaryColorWithOpacity,
      primaryColorWithOpacity,
      primaryColorWithOpacity,
      'var(--mui-palette-primary-main)',
      primaryColorWithOpacity,
      primaryColorWithOpacity
    ],
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    xaxis: {
      categories: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
      axisTicks: { show: false },
      axisBorder: { show: false },
      tickPlacement: 'on',
      labels: {
        style: {
          fontSize: '13px',
          colors: 'var(--mui-palette-text-disabled)'
        }
      }
    },
    yaxis: { show: false }
  }

  // Acciones de menú
  const handleMenuAction = (action) => {
    if (action === 'Refresh') {
      setProgressData(prev => 
        prev.map(item => ({
          ...item,
          amount: `$${Math.floor(Math.random() * 1000) + 100}`,
          trendNumber: Math.floor(Math.random() * 100) + 1
        }))
      )
      setChartSeries([
        { name: 'Earning', data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 20) + 5) }
      ])
    } else if (action === 'Update') {
      setEditData(progressData)
      setOpenUpdate(true)
    } else if (action === 'Share') {
      if (navigator.share) {
        navigator.share({
          title: 'Total Earning',
          text: 'Check total earnings',
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
      [field]: field === 'amount' && !isNaN(value) ? Number(value) : value
    }
    setEditData(updated)
  }

  return (
    <>
      <Card>
        <CardHeader
          title='Earning Reports'
          subheader='Weekly Earnings Overview'
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
        <CardContent className='flex flex-col gap-5'>
          {progressData.map((item, index) => (
            <div key={index} className='flex items-center gap-4'>
              <CustomAvatar skin='light' variant='rounded' color={item.avatarColor} size={34}>
                <i className={classnames(item.avatarIcon, 'text-[22px]')} />
              </CustomAvatar>
              <div className='flex flex-wrap justify-between items-center gap-x-4 gap-y-1 is-full'>
                <div className='flex flex-col'>
                  <Typography className='font-medium' color='text.primary'>
                    {item.title}
                  </Typography>
                  <Typography variant='body2'>{item.subtitle}</Typography>
                </div>
                <div className='flex items-center gap-4'>
                  <Typography>{item.amount}</Typography>
                  <div className='flex items-center gap-1'>
                    <i
                      className={classnames(
                        item.trend === 'negative' ? 'tabler-chevron-down text-error' : 'tabler-chevron-up text-success',
                        'text-xl'
                      )}
                    />
                    <Typography variant='body2' className='text-textDisabled'>{`${item.trendNumber}%`}</Typography>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className='pbs-[60px]'>
            <AppReactApexCharts type='bar' height={158} width='100%' series={chartSeries} options={options} />
          </div>
        </CardContent>
      </Card>

      {/* Modal Update */}
      <Dialog open={openUpdate} onClose={() => setOpenUpdate(false)} maxWidth='md' fullWidth>
        <DialogTitle>Update Earning Reports</DialogTitle>
        <DialogContent className='flex flex-col gap-4 mt-2'>
          {editData.map((item, index) => (
            <div key={index} className='flex flex-col gap-4 mt-2'>
              <TextField 
                label='Title'
                fullWidth
                value={item.title}
                onChange={(e) => handleEditChange(index, 'title', e.target.value)}
              />
              <TextField 
                label='subtitle'
                fullWidth
                value={item.subtitle}
                onChange={(e) => handleEditChange(index, 'subtitle', e.target.value)}
              />
              <TextField 
                label='amount'
                fullWidth
                value={item.amount}
                onChange={(e) => handleEditChange(index, 'amount', e.target.value)}
              />
              <TextField 
                label='trendNumber'
                fullWidth
                value={item.trendNumber}
                onChange={(e) => handleEditChange(index, 'trendNumber', e.target.value)}
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

export default EarningReports
