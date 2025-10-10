'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

// Third-party Imports
import classnames from 'classnames'

// Components Imports
import OptionMenu from '@core/components/option-menu'
import { useState } from 'react'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { MoreVerticalIcon } from 'lucide-react'

// Vars
const dataSets = {
  today: [
    {
      title: '1.20k',
      subtitle: 'UnitedStates',
      trendNumber: 10.2,
      imgSrc: '/images/cards/us.png'
    },
    {
      title: '$1.1k',
      subtitle: 'Brazil',
      trendNumber: 8.35,
      imgSrc: '/images/cards/brazil.png'
    },
    {
      title: '$952.71',
      subtitle: 'India',
      trendNumber: 7.9,
      imgSrc: '/images/cards/india.png'
    },
    {
      title: '$731.42',
      subtitle: 'Australia',
      trendNumber: 6.85,
      imgSrc: '/images/cards/australia.png'
    },
    {
      title: '$635.71',
      subtitle: 'France',
      trendNumber: 6.5,
      imgSrc: '/images/cards/france.png'
    },
    {
      title: '$557.14',
      subtitle: 'China',
      trendNumber: '6',
      imgSrc: '/images/cards/china.png'
    }
  ],
  lastWeek: [
    {
      title: '$8.45k',
      subtitle: 'United States',
      trendNumber: 25.8,
      imgSrc: '/images/cards/us.png'
    },
    {
      title: '$7.78k',
      subtitle: 'Brazil',
      trendNumber: 16.2,
      trend: 'negative',
      imgSrc: '/images/cards/brazil.png'
    },
    {
      title: '$6.48k',
      subtitle: 'India',
      trendNumber: 12.3,
      imgSrc: '/images/cards/india.png'
    },
    {
      title: '$5.12k',
      subtitle: 'Australia',
      trendNumber: 11.9,
      trend: 'negative',
      imgSrc: '/images/cards/australia.png'
    },
    {
      title: '$4.45k',
      subtitle: 'France',
      trendNumber: 16.2,
      imgSrc: '/images/cards/france.png'
    },
    {
      title: '$3.90k',
      subtitle: 'China',
      trendNumber: 14.8,
      imgSrc: '/images/cards/china.png'
    }
  ],
  lastMonth: [
    {
      title: '$50.45k',
      subtitle: 'United States',
      trendNumber: 45.1,
      imgSrc: '/images/cards/us.png'
    },
    {
      title: '$45.81k',
      subtitle: 'Brazil',
      trendNumber: '35.6',
      trend: 'negative',
      imgSrc: '/images/cards/brazil.png'
    },
    {
      title: '$40.11k',
      subtitle: 'India',
      trendNumber: 31.9,
      imgSrc: '/images/cards/india.png'
    },
    {
      title: '$35.60k',
      subtitle: 'Australia',
      trendNumber: 28.6,
      imgSrc: '/images/cards/australia.png'
    },
    {
      title: '$30.50k',
      subtitle: 'France',
      trendNumber: 25,
      trend: 'negative',
      imgSrc: '/images/cards/france.png'
    },
    {
      title: '$20.45k',
      subtitle: 'China',
      trendNumber: 21.10,
      imgSrc: '/images/cards/china.png'
    },
  ],
  lastYear: [
      {
        title: '$159.23k',
        subtitle: 'United States',
        trendNumber: 98.45,
        imgSrc: '/images/cards/us.png'
      },
        {
        title: '$146.95k',
        subtitle: 'Brazil',
        trendNumber: 88.2,
        trend: 'negative',
        imgSrc: '/images/cards/brazil.png'
      },
      {
        title: '$140.5k',
        subtitle: 'India',
        trendNumber: 80.2,
        imgSrc: '/images/cards/india.png'
      },
      {
        title: '$136.91k',
        subtitle: 'Australia',
        trendNumber: 76.71,
        imgSrc: '/images/cards/australia.png'
      },
      {
        title: '$127.5k',
        subtitle: 'France',
        trendNumber: 69.2,
        trend: 'negative',
        imgSrc: '/images/cards/france.png'
      },
      {
        title: '$111.5k',
        subtitle: 'China',
        trendNumber: 60,
        imgSrc: '/images/cards/china.png'
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
        <MenuItem onClick={() => handleSelect('today')}>Today</MenuItem>
        <MenuItem onClick={() => handleSelect('lastWeek')}>Last Week</MenuItem>
        <MenuItem onClick={() => handleSelect('lastMonth')}>Last Month</MenuItem>
        <MenuItem onClick={() => handleSelect('lastYear')}>Last Year</MenuItem>
      </Menu>
    </>
  )
}

const SalesByCountries = () => {
  const [period, setPeriod] = useState('lastMonth')

  return (
    <Card>
      <CardHeader
        title='Sales by Countries'
        subheader='Monthly Sales Overview'
        action={<PeriodMenu onChange={setPeriod} />}
      />
      <CardContent className='flex flex-col gap-4'>
        {dataSets[period].map((item, index) => (
          <div key={index} className='flex items-center gap-4'>
            <img src={item.imgSrc} alt={item.subtitle} width={34} />
            <div className='flex flex-wrap justify-between items-center gap-x-4 gap-y-1 is-full'>
              <div className='flex flex-col'>
                <Typography className='font-medium' color='text.primary'>
                  {item.title}
                </Typography>
                <Typography variant='body2'>{item.subtitle}</Typography>
              </div>
              <div className='flex items-center gap-1'>
                <i
                  className={classnames(
                    item.trend === 'negative' ? 'tabler-chevron-down text-error' : 'tabler-chevron-up text-success',
                    'text-xl'
                  )}
                />
                <Typography
                  variant='h6'
                  color={`${item.trend === 'negative' ? 'error' : 'success'}.main`}
                >{`${item.trendNumber}%`}</Typography>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default SalesByCountries
