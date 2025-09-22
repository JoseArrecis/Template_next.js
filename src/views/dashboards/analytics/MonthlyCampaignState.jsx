'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

// Third-party Imports
import classnames from 'classnames'

// Components Imports
import CustomAvatar from '@core/components/mui/Avatar'
import { useState } from 'react'
import { MoreVerticalIcon } from 'lucide-react'
import { Menu, MenuItem, IconButton } from '@mui/material'

// Vars
const dataSets = {
  lastMonth: [
    {
      title: 'Emails',
      amount: '12,346',
      trendNumber: '0.3%',
      avatarColor: 'success',
      icon: 'tabler-mail'
    },
    {
      title: 'Opened',
      amount: '8,734',
      trendNumber: '2.1%',
      avatarColor: 'info',
      icon: 'tabler-link'
    },
    {
      title: 'Clicked',
      amount: '967',
      trendNumber: '1.4%',
      trend: 'negative',
      avatarColor: 'warning',
      icon: 'tabler-mouse'
    },
    {
      title: 'Subscribe',
      amount: '345',
      trendNumber: '8.5%',
      avatarColor: 'primary',
      icon: 'tabler-users'
    },
    {
      title: 'Complaints',
      amount: '10',
      trendNumber: '1.5%',
      trend: 'negative',
      avatarColor: 'secondary',
      icon: 'tabler-alert-triangle'
    },
    {
      title: 'Unsubscribe',
      amount: '86',
      trendNumber: '0.8%',
      avatarColor: 'error',
      icon: 'tabler-ban'
    }
  ],
  lastSixMonths: [
    {
      title: 'Emails',
      amount: '62750',
      trendNumber: 1.5,
      avatarColor: 'success',
      icon: 'tabler-mail'
    },
    {
      title: 'Opened',
      amount: '43670',
      trendNumber: '5.6',
      avatarColor: 'info',
      icon: 'tabler-link'
    },
    {
      title: 'Clicked',
      amount: '4835',
      trendNumber: '3.56',
      trend: 'negative',
      avatarColor: 'warning',
      icon: 'tabler-mouse' 
    },
    {
      title: 'Subscribe',
      amount: '1725',
      trendNumber: '12.3',
      avatarColor: 'primary',
      icon: 'tabler-users'
    },
    {
      title: 'Complaints',
      amount: '60',
      trendNumber: '5.6',
      trend: 'negative',
      avatarColor: 'secondary',
      icon: 'tabler-alert-triangle'
    },
    {
      title: 'Unsubscribe',
      amount: '430',
      trendNumber: '1.5',
      trend: 'negative',
      avatarColor: 'error',
      icon: 'tabler-ban'
    }
  ],
  lastYear: [
    {
      title: 'Emails',
      amount: '376500',
      trendNumber: 5.2,
      avatarColor: 'success',
      icon: 'tabler-mail'
    },
    {
      title: 'Opened',
      amount: '262020',
      trendNumber: '8.9',
      avatarColor: 'info',
      icon: 'tabler-link'
    },
    {
      title: 'Clicked',
      amount: '29010',
      trendNumber: '6.2',
      trend: 'negative',
      avatarColor: 'warning',
      icon: 'tabler-mouse' 
    },
    {
      title: 'Subscribe',
      amount: '10350',
      trendNumber: '21.7',
      avatarColor: 'primary',
      icon: 'tabler-users'
    },
    {
      title: 'Complaints',
      amount: '360',
      trendNumber: '10.5',
      trend: 'negative',
      avatarColor: 'secondary',
      icon: 'tabler-alert-triangle'
    },
    {
      title: 'Unsubscribe',
      amount: '2580',
      trendNumber: '4.3',
      trend: 'negative',
      avatarColor: 'error',
      icon: 'tabler-ban'
    }
  ]
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
        <MenuItem onClick={() => handleSelect('lastMonth')}>Last Month</MenuItem>
        <MenuItem onClick={() => handleSelect('lastSixMonths')}>Last 6 Months</MenuItem>
        <MenuItem onClick={() => handleSelect('lastYear')}>Last Year</MenuItem>
      </Menu>
    </>
  )
}

const MonthlyCampaignState = () => {
  const [period, setPeriod] = useState('lastSixMonths')

  return (
    <Card>
      <CardHeader
        title='Monthly Campaign State'
        subheader='8.52k Social Visitors'
        action={<PeriodMenu onChange={setPeriod}/>}
      />
      <CardContent className='flex flex-col gap-6 md:gap-[1.6875rem]'>
        {dataSets[period].map((item, index) => (
          <div key={index} className='flex items-center gap-4'>
            <CustomAvatar skin='light' variant='rounded' color={item.avatarColor} size={34}>
              <i className={classnames(item.icon, 'text-[22px]')} />
            </CustomAvatar>
            <div className='flex flex-wrap justify-between items-center gap-x-4 gap-y-1 is-full'>
              <Typography className='font-medium' color='text.primary'>
                {item.title}
              </Typography>
              <div className='flex items-center gap-4'>
                <Typography>{item.amount}</Typography>
                <Typography
                  className='flex justify-end is-11'
                  color={`${item.trend === 'negative' ? 'error' : 'success'}.main`}
                >
                  {item.trendNumber}
                </Typography>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default MonthlyCampaignState
