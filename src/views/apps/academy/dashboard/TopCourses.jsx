'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'

// Components Imports
import CustomAvatar from '@core/components/mui/Avatar'
import { useState } from 'react'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { MoreVerticalIcon } from 'lucide-react'

// Vars
const dataSets = {
  lastDays: [
    {
      title: 'Videography Basic Design Course',
      views: '43',
      icon: 'tabler-video',
      color: 'primary'
    },
    {
      title: 'Basic Front-end Development Course',
      views: '30',
      icon: 'tabler-code',
      color: 'info'
    },
    {
      title: 'Basic Fundamentals of Photography',
      views: '132',
      icon: 'tabler-camera',
      color: 'success',
    },
    {
      title: 'Advance Dribble Base Visual Design',
      views: '89',
      icon: 'tabler-brand-dribbble', 
      color: 'warning'
    },
    {
      title: 'Your First Singin Lesson',
      views: '34',
      icon: 'tabler-microphone-2',
      color: 'error'
    }
  ],
  lastMonth: [
    { 
      title: 'Videography Basic Design Course', 
      views: '1.2k', 
      icon: 'tabler-video', 
      color: 'primary' 
    },
    { 
      title: 'Basic Front-end Development Course', 
      views: '834', 
      icon: 'tabler-code', 
      color: 'info' 
    },
    { 
      title: 'Basic Fundamentals of Photography', 
      views: '3.7k', 
      icon: 'tabler-camera', 
      color: 'success' 
    },
    { 
      title: 'Advance Dribble Base Visual Design', 
      views: '2.5k', 
      icon: 'tabler-brand-dribbble', 
      color: 'warning' 
    },
    { 
      title: 'Your First Singing Lesson', 
      views: '948', 
      icon: 'tabler-microphone-2', 
      color: 'error' 
    }
  ],
  lastYear: [
    {
      title: 'Videography Basic Design Course',
      views: '14.4k',
      icon: 'tabler-video',
      color: 'primary'
    },
    {
      title: 'Basic Front-end Development Course',
      views: '10k',
      icon: 'tabler-code',
      color: 'info'
    },
    {
      title: 'Basic Fundamentals of Photography', 
      views: '44.4k', 
      icon: 'tabler-camera', 
      color: 'success' 
    },
    {
      title: 'Advance Dribble Base Visual Design',
      views: '30k',
      icon: 'tabler-brand-dribbble',
      color: 'warning'
    },
    {
      title: 'Your First Singing Lesson',
      views: '11.3k',
      icon: 'tabler-microphone-2',
      color: 'error'
    },
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

const TopCourses = () => {
  const [period, setPeriod] = useState('lastMonth')

  return (
    <Card>
      <CardHeader 
        title='Top Courses' 
        action={<PeriodMenu onChange={setPeriod} />} 
      />
      <CardContent className='flex flex-col gap-6'>
        {dataSets[period].map((item, i) => (
          <div key={i} className='flex items-center gap-4'>
            <CustomAvatar variant='rounded' skin='light' color={item.color}>
              <i className={item.icon} />
            </CustomAvatar>
            <div className='flex justify-between items-center gap-4 is-full flex-wrap'>
              <Typography className='font-medium flex-1' color='text.primary'>
                {item.title}
              </Typography>
              <Chip label={`${item.views} Views`} variant='tonal' size='small' color='secondary' />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default TopCourses
