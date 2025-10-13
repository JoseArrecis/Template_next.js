'use client'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'
import Chip from '@mui/material/Chip'

// Third Party Imports
import classnames from 'classnames'

// Components Imports
import OptionMenu from '@core/components/option-menu'
import CustomAvatar from '@core/components/mui/Avatar'
import { useState } from 'react'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { MoreVerticalIcon } from 'lucide-react'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

const periodData = {
  lastWeek: {
    series: [{ data: [37, 76, 65, 41, 99, 53, 70] }],
    data: [
      {
        title: 'Earnings',
        progress: 64,
        stats: '$545.69',
        progressColor: 'primary',
        avatarColor: 'primary',
        avatarIcon: 'tabler-currency-dollar'
      },
      {
        title: 'Profit',
        progress: 59,
        stats: '$256.34',
        progressColor: 'info',
        avatarColor: 'info',
        avatarIcon: 'tabler-chart-pie-2'
      },
      {
        title: 'Expense',
        progress: 22,
        stats: '$74.19',
        progressColor: 'error',
        avatarColor: 'error',
        avatarIcon: 'tabler-brand-paypal'
      }
    ]
  },
  lastMonth: {
    series: [{ data: [50, 65, 80, 90, 70, 60, 75] }],
    data: [
      { 
        title: 'Earnings', 
        progress: 70, 
        stats: '$1,256', 
        progressColor: 'primary', 
        avatarColor: 'primary',
        avatarIcon: 'tabler-currency-dollar', 
        chip: '+8.4%', 
        chipColor: 'success' 
      },
      { 
        title: 'Profit', 
        progress: 62, 
        stats: '$876', 
        progressColor: 'info',
        avatarColor: 'info', 
        avatarIcon: 'tabler-chart-pie-2', 
        chip: '+3.5%', 
        chipColor: 'success' 
      },
      { 
        title: 'Expense', 
        progress: 30, 
        stats: '$432', 
        progressColor: 'error', 
        avatarColor: 'error', 
        avatarIcon: 'tabler-brand-paypal', 
        chip: '-1.2%', 
        chipColor: 'error' 
      }
    ]
  },
  lastYear: {
    series: [{ data: [120, 135, 110, 145, 130, 150, 125] }],
    data: [
      { 
        title: 'Earnings', 
        progress: 85, 
        stats: '$15,468', 
        progressColor: 'primary', 
        avatarColor: 'primary', 
        avatarIcon: 'tabler-currency-dollar', 
        chip: '+15%', 
        chipColor: 'success' 
      },
      { 
        title: 'Profit', 
        progress: 78, 
        stats: '$9,256', 
        progressColor: 'info', 
        avatarColor: 'info', 
        avatarIcon: 'tabler-chart-pie-2', 
        chip: '+10%', 
        chipColor: 'success' 
      },
      { 
        title: 'Expense', 
        progress: 40, 
        stats: '$4,432', 
        progressColor: 'error', 
        avatarColor: 'error', 
        avatarIcon: 'tabler-brand-paypal', 
        chip: '-5%', 
        chipColor: 'error' 
      }
    ]
  }
}

const EarningReports = () => {
  const [period, setPeriod] = useState('lastMonth')
  const { series, data } = periodData[period]

  const maxValue = Math.max(...series[0].data)
  const colors = series[0].data.map(v =>
    v === maxValue ? 'var(--mui-palette-primary-main)' : 'var(--mui-palette-primary-lightOpacity)'
  )

  const options = {
    chart: { parentHeightOffset: 0, toolbar: { show: false } },
    tooltip: { enabled: false },
    grid: { show: false, padding: { top: -31, left: 0, right: 0, bottom: -9 } },
    plotOptions: { bar: { borderRadius: 4, distributed: true, columnWidth: '42%' } },
    legend: { show: false },
    dataLabels: { enabled: false },
    colors,
    states: { hover: { filter: { type: 'none' } }, active: { filter: { type: 'none' } } },
    xaxis: {
      categories: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
      axisTicks: { show: false },
      axisBorder: { show: false },
      labels: { style: { fontSize: '13px', colors: 'var(--mui-palette-text-disabled)' } }
    },
    yaxis: { show: false }
  }

  const PeriodMenu = ({ onChange }) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const handleClick = (event) => setAnchorEl(event.currentTarget)
    const handleClose = () => setAnchorEl(null)
    const handleSelect = (period) => {
      onChange(period)
      handleClose()
    }

    return (
      <>
        <IconButton onClick={handleClick}>
          <MoreVerticalIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={() => handleSelect('lastWeek')}>Last Week</MenuItem>
          <MenuItem onClick={() => handleSelect('lastMonth')}>Last Month</MenuItem>
          <MenuItem onClick={() => handleSelect('lastYear')}>Last Year</MenuItem>
        </Menu>
      </>
    )
  }

  return (
    <Card>
      <CardHeader
        title='Earning Reports'
        subheader={
          period === 'lastWeek' ? 'LastWeek' : period === 'lastMonth' ? 'lastMonth' : 'Last Year'
        }
        action={<PeriodMenu onChange={setPeriod} />}
        className='pbe-0'
      />
      <CardContent className='flex flex-col gap-5 max-md:gap-5 max-[1015px]:gap-[62px] max-[1051px]:gap-10 max-[1200px]:gap-5 max-[1310px]:gap-10'>
        <div className='flex flex-col sm:flex-row items-center justify-between gap-8'>
          <div className='flex flex-col gap-3 is-full sm:is-[unset]'>
            <div className='flex items-center gap-2.5'>
              <Typography variant='h2'>{data[0].stats}</Typography>
              <Chip size='small' variant='tonal' color={data[0].chipColor} label={data[0].chip} />
            </div>
            <Typography variant='body2' className='text-balance'>
              You informed of this week compared to last week
            </Typography>
          </div>
          <AppReactApexCharts type='bar' height={163} width='100%' series={series} options={options} />
        </div>
        <div className='flex flex-col sm:flex-row gap-6 p-5 border rounded'>
          {data.map((item, index) => (
            <div key={index} className='flex flex-col gap-2 is-full'>
              <div className='flex items-center gap-2'>
                <CustomAvatar skin='light' variant='rounded' color={item.avatarColor} size={26}>
                  <i className={classnames(item.avatarIcon, 'text-lg')} />
                </CustomAvatar>
                <Typography variant='h6' className='leading-6 font-normal'>
                  {item.title}
                </Typography>
              </div>
              <Typography variant='h4'>{item.stats}</Typography>
              <LinearProgress
                value={item.progress}
                variant='determinate'
                color={item.progressColor}
                className='max-bs-1'
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default EarningReports
