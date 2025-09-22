'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'

// Third-party Imports
import classnames from 'classnames'

// Components Imports
import OptionMenu from '@core/components/option-menu'
import CustomAvatar from '@core/components/mui/Avatar'
import { useState } from 'react'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { MoreVerticalIcon } from 'lucide-react'

// Vars
const dataSets = {
  lastWeek: [
    {
      title: 'Direct Source',
      subtitle: 'Direct link click',
      amount: '1.2k',
      trendNumber: 4.2,
      icon: 'tabler-shadow'
    },
    {
      title: 'Social Networks',
      subtitle: 'Social Channels',
      amount: '31.5k',
      trendNumber: 8.2,
      icon: 'tabler-globe'
    },
    {
      title: 'Email Newsletter',
      subtitle: 'Mail Campaigns',
      amount: '893',
      trendNumber: 2.4,
      icon: 'tabler-mail'
    },
    {
      title: 'Referrals',
      subtitle: 'Impact Radius Visits',
      amount: '342',
      trendNumber: 0.4,
      trend: 'negative',
      icon: 'tabler-external-link'
    },
    {
      title: 'ADVT',
      subtitle: 'Google ADVT',
      amount: '2.15k',
      trendNumber: 9.1,
      icon: 'tabler-ad'
    },
    {
      title: 'Other',
      subtitle: 'Many Sources',
      amount: '12.5k',
      trendNumber: 6.2,
      icon: 'tabler-star'
    }
  ],
  lastMonth: [
    {
      title: 'Direct Source',
      subtitle: 'Direct link click',
      amount: '4.8k',
      trendNumber: 6.8,
      icon: 'tabler-shadow'
    },
    {
      title: 'Email Networks',
      subtitle: 'Social Channels',
      amount: '126k',
      trendNumber: 15.7,
      icon: 'tabler-globe'
    },
    {
      title: 'Email Newsletter',
      subtitle: 'Mail Campaigns',
      amount: '3.5k',
      trendNumber: 5.3,
      icon: 'tabler-mail'
    },
    {
      title: 'Referrals',
      subtitle: 'Impact Radius Visits',
      amount: '1.3k',
      trendNumber: 2.1,
      trend: 'negative',
      icon: 'tabler-external-link'
    },
    {
      title: 'ADVT',
      subtitle: 'Google ADVT',
      amount: '8.6k',
      trendNumber: 16.2,
      icon: 'tabler-ad'
    },
    {
      title: 'Other',
      subtitle: 'Many Sources',
      amount: '50k',
      trendNumber: 10.3,
      icon: 'tabler-star'
    }
  ],
  lastYear: [
    {
      title: 'Direct Source',
      subtitle: 'Direct link click',
      amount: '52.8k',
      trendNumber: 11.5,
      icon: 'tabler-shadow'
    },
    {
      title: 'Email Networks',
      subtitle: 'Social Channels',
      amount: '1.3M',
      trendNumber: 25.3,
      icon: 'tabler-globe',
    },
    {
      title: 'Email Newsletter',
      subtitle: 'Mail Campaigns',
      amount: '38.5k',
      trendNumber: 9.6,
      icon: 'tabler-mail',
    },
    {
      title: 'Referrals',
      subtitle: 'Impact Radius Visits',
      amount: '94.6k',
      trendNumber: 5.3,
      trend: 'negative',
      icon: 'tabler-external-link'
    },
    {
      title: 'ADVT',
      subtitle: 'Google ADVT',
      amount: '94.6k',
      trendNumber: 21.3,
      icon: 'tabler-ad'
    },
    {
      title: 'Other',
      subtitle: 'Many Sources',
      amount: '550k',
      trendNumber: 14.1,
      icon: 'tabler-star'
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
        <MenuItem onClick={() => handleSelect('lastWeek')}>Last Week</MenuItem>
        <MenuItem onClick={() => handleSelect('lastMonth')}>Last Month</MenuItem>
        <MenuItem onClick={() => handleSelect('lastYear')}>Last Year</MenuItem>
      </Menu>
    </>
  )
}

const SourceVisits = () => {
  const [period, setPeriod] = useState('lastMonth')

  return (
    <Card>
      <CardHeader
        title='Source Visits'
        subheader='38.4k Visitors'
        action={<PeriodMenu onChange={setPeriod}/>}
      />
      <CardContent className='flex flex-col gap-6 md:gap-[1.0875rem] lg:gap-[1.5875rem]'>
        {dataSets[period].map((item, index) => (
          <div key={index} className='flex items-center gap-4'>
            <CustomAvatar skin='light' variant='rounded' size={34}>
              <i className={classnames(item.icon, 'text-[22px] text-textSecondary')} />
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
                <Chip
                  variant='tonal'
                  size='small'
                  color={item.trend === 'negative' ? 'error' : 'success'}
                  label={`${item.trend === 'negative' ? '-' : '+'}${item.trendNumber}%`}
                />
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default SourceVisits
