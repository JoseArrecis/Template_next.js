'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'

// Components Imports
import OptionMenu from '@core/components/option-menu'
import { useState } from 'react'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { MoreVerticalIcon } from 'lucide-react'

// Vars
const dataSets = {
  lastDays: [
    {
      title: 'Google Chrome',
      progress: 22,
      percentage: '23.45%',
      progressColor: 'primary',
      imgSrc: '/images/logos/google-chrome.png'
    },
    {
      title: 'Apple Safari',
      progress: 15,
      percentage: '11.51%',
      progressColor: 'success',
      imgSrc: '/images/logos/safari.png'
    },
    {
      title: 'Mozilla Firefox',
      progress: 12,
      percentage: '3.29',
      progressColor: 'secondary',
      imgSrc: '/images/logos/mozilla-firefox.png'
    },
    {
      title: 'Opera Mini',
      progress: 9,
      percentage: '5.63',
      progressColor: 'info',
      imgSrc: '/images/logos/opera-mini.png'
    },
    {
      title: 'Internet Explorer',
      progress: 6,
      percentage: '1.56',
      progressColor: 'warning',
      imgSrc: '/images/logos/internet-explorer.png'
    },
    {
      title: 'Brave',
      progress: 6,
      percentage: '0.071',
      progressColor: 'error',
      imgSrc: '/images/logos/brave.png'
    }
  ],
  lastMonth: [
    {
      title: 'Google Chrome',
      progress: 67,
      percentage: '54.4%',
      progressColor: 'primary',
      imgSrc: '/images/logos/google-chrome.png'
    },
    {
      title: 'Apple Safari',
      progress: 40,
      percentage: '14.6%',
      progressColor: 'success',
      imgSrc: '/images/logos/safari.png'
    },
    {
      title: 'Mozilla Firefox',
      progress: 30,
      percentage: '6.1%',
      progressColor: 'secondary',
      imgSrc: '/images/logos/mozilla-firefox.png'
    },
    {
      title: 'Opera Mini',
      progress: 20,
      percentage: '8.0%',
      progressColor: 'info',
      imgSrc: '/images/logos/opera-mini.png'
    },
    {
      title: 'Internet Explorer',
      progress: 15,
      percentage: '4.2%',
      progressColor: 'warning',
      imgSrc: '/images/logos/internet-explorer.png'
    },
    {
      title: 'Brave',
      progress: 15,
      percentage: '0.3%',
      progressColor: 'error',
      imgSrc: '/images/logos/brave.png'
    }
  ],
  lastYear: [
    {
      title: 'Google Chrome',
      progress: 110,
      percentage: '78.48',
      progressColor: 'primary',
      imgSrc: '/images/logos/google-chrome.png'
    },
    {
      title: 'Apple Safari',
      progress: 80,
      percentage: '40.10',
      progressColor: 'success',
      imgSrc: '/images/logos/safari.png'
    },
    {
      title: 'Mozilla Firexos',
      progress: 70,
      percentage: '23.57',
      progressColor: 'secondary',
      imgSrc: '/images/logos/mozilla-firefox.png'
    },
    {
      title: 'Opera Mini',
      progress: 60,
      percentage: '27.80',
      progressColor: 'info',
      imgSrc: '/images/logos/opera-mini.png'
    },
    {
      title: 'Internet Explorer',
      progress: 55,
      percentage: '9.2',
      progressColor: 'warning',
      imgSrc: '/images/logos/internet-explorer.png'
    },
    {
      title: 'Brave',
      progress: 55,
      percentage: '2.36',
      progressColor: 'error',
      imgSrc: '/images/logos/brave.png'
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
        <MenuItem onClick={() => handleSelect('lastDays')}>Last 28 Days</MenuItem>
        <MenuItem onClick={() => handleSelect('lastMonth')}>Last Month</MenuItem>
        <MenuItem onClick={() => handleSelect('lastYear')}>Last Year</MenuItem>
      </Menu>
    </>
  )
}

const BrowserStates = () => {
  const [period, setPeriod] = useState('lastMonth')

  return (
    <Card>
      <CardHeader
        title='Browser States'
        subheader='Counter April 2022'
        action={<PeriodMenu onChange={setPeriod} />}/>
      <CardContent className='flex flex-col gap-8'>
        {dataSets[period].map((item, index) => (
          <div key={index} className='flex items-center gap-4'>
            <img src={item.imgSrc} alt={item.title} width={28} />
            <div className='flex flex-wrap justify-between items-center gap-x-4 gap-y-1 is-full'>
              <Typography className='font-medium' color='text.primary'>
                {item.title}
              </Typography>
              <div className='flex items-center gap-4'>
                <Typography>{item.percentage}</Typography>
                <div className='flex relative'>
                  <CircularProgress
                    variant='determinate'
                    size={26}
                    value={100}
                    thickness={5}
                    sx={{ position: 'absolute', color: 'var(--mui-palette-customColors-trackBg)' }}
                  />
                  <CircularProgress
                    variant='determinate'
                    size={26}
                    value={item.progress}
                    thickness={5}
                    color={item.progressColor}
                    sx={{ '& .MuiCircularProgress-circle': { strokeLinecap: 'round' } }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default BrowserStates
