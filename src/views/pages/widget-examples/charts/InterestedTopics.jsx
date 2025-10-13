'use client'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid2'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import classnames from 'classnames'

// Components Imports
import OptionMenu from '@core/components/option-menu'
import { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

// Vars
const series = [
  {
    data: [35, 20, 14, 12, 10, 9]
  }
]

const initialData = [
  { title: 'UI Design', value: 35, colorClass: 'text-primary' },
  { title: 'UX Design', value: 20, colorClass: 'text-info' },
  { title: 'Music', value: 14, colorClass: 'text-success' },
  { title: 'Animation', value: 12, colorClass: 'text-secondary' },
  { title: 'React', value: 10, colorClass: 'text-error' },
  { title: 'SEO', value: 9, colorClass: 'text-warning' }
]

const labels = ['UI Design', 'UX Design', 'Music', 'Animation', 'React', 'SEO']

const InterestedTopics = () => {
  const [progressData, setProgressData] = useState(initialData)

  const [openUpdate, setOpenUpdate] = useState(false)
  const [editData, setEditData] = useState(progressData)

  // Hooks
  const theme = useTheme()

  const series = [
    {
      data: progressData.map(item => item.value)
    }
  ]

  const labels = progressData.map(item => item.title)

  const options = {
    chart: { parentHeightOffset: 0, toolbar: { show: false } },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '70%',
        distributed: true,
        borderRadius: 7,
        borderRadiusApplication: 'end'
      }
    },
    colors: progressData.map(item => `var(--mui-palette-${item.colorClass.split('-')[1]}-main)`),
    grid: {
      strokeDashArray: 8,
      borderColor: 'var(--mui-palette-divider)',
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: false } },
      padding: { top: -25, left: 21, right: 25, bottom: 0 }
    },
    dataLabels: {
      enabled: true,
      offsetY: 8,
      style: { colors: ['#fff'], fontWeight: 500, fontSize: '0.8125rem' },
      formatter(val, opt) {
        return labels[opt.dataPointIndex]
      }
    },
    tooltip: {
      enabled: true,
      style: { fontSize: '0.75rem' },
      onDatasetHover: { highlightDataSeries: false }
    },
    legend: { show: false },
    states: {
      hover: { filter: { type: 'none' } },
      active: { filter: { type: 'none' } }
    },
    xaxis: {
      axisTicks: { show: false },
      axisBorder: { show: false },
      labels: {
        formatter: val => `${val}%`,
        style: { fontSize: '0.8125rem', colors: 'var(--mui-palette-text-disabled)' }
      }
    },
    yaxis: {
      labels: {
        align: theme.direction === 'rtl' ? 'right' : 'left',
        style: { fontWeight: 500, fontSize: '0.8125rem', colors: 'var(--mui-palette-text-disabled)' },
        offsetX: theme.direction === 'rtl' ? -15 : -30
      }
    }
  }

  const handleMenuAction = (action) => {
    if (action === 'Refresh') {
      setProgressData(prev =>
        prev.map(item => ({
          ...item,
          value: Math.floor(Math.random() * 100) + 1
        }))
      )
    } else if (action === 'Update') {
      setEditData(progressData)
      setOpenUpdate(true)
    } else if (action === 'Share') {
      if (navigator.share) {
        navigator.share({
          title: 'Assignment Progress',
          text: 'Check out my assignment progress',
          url: window.location.href
        }).catch(err => console.log('Share Canceled', err))
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
    updated[index] = { ...updated[index], [field]: field === 'value' ? Number(value) : value }
    setEditData(updated)
  }

  return (
    <>
        <Card>
          <CardHeader
            title='Topic you are interested in'
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
          <CardContent>
            <Grid container>
              <Grid size={{ xs: 12, sm: 6 }} className='max-sm:mbe-6'>
                <AppReactApexCharts type='bar' height={296} width='100%' series={series} options={options} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }} alignSelf='center'>
                <div className='flex flex-wrap gap-6'>
                  {progressData.map((item, i) => (
                    <div key={i} className='flex gap-2 w-[45%]'>
                      <i className={classnames('tabler-circle-filled text-xs m-[5px]', item.colorClass)} />
                      <div>
                        <Typography>{item.title}</Typography>
                        <Typography variant='h5'>{`${item.value}%`}</Typography>
                      </div>
                    </div>
                  ))}
                </div>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

      {/* Modal Update */}
      <Dialog open={openUpdate} onClose={() => setOpenUpdate(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Update All Topics</DialogTitle>
        <DialogContent className='flex flex-col gap-4 mt-2'>
          {editData.map((item, i) => (
            <div key={i} className='flex gap-4 items-center'>
              <TextField
                label='Title'
                fullWidth
                value={item.title}
                onChange={(e) => handleEditChange(i, 'title', e.target.value)}
              />
              <TextField
                label='Value'
                type='number'
                value={item.value}
                onChange={(e) => handleEditChange(i, 'value', e.target.value)}
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

export default InterestedTopics
