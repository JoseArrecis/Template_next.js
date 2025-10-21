'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useState } from 'react'

const UserProfileHeader = ({ data }) => {
  const [status, setStatus] = useState('connected')

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected':
        return 'bg-green-600 hover:bg-green-700'
      case 'disconnected':
        return 'bg-gray-500 hover:bg-gray-600'
      case 'busy':
        return 'bg-yellow-600 hover:bg-yellow-700'
      default:
        return 'bg-gray-400'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'connected':
        return 'Connected'
      case 'disconnected':
        return 'Disconnected'
      case 'busy':
        return 'Busy'
      default:
        return 'Unknown'
    }
  }

  return (
    <Card>
      <CardMedia image={data?.coverImg} className='h-[250px]' />
      <CardContent className='flex gap-5 justify-center flex-col items-center md:items-end md:flex-row !pt-0 md:justify-start'>
        <div className='flex rounded-full border-[5px] border-backgroundPaper bg-backgroundPaper'>
          <img height={120} width={120} src={data?.profileImg} className='rounded-full' alt='Profile' />
        </div>
        <div className='flex flex-col items-center sm:items-start gap-2'>
          <Typography variant='h4'>{data?.fullName}</Typography>
          <div className='flex flex-wrap gap-6 justify-center sm:justify-start'>
            {data?.designation && (
              <div className='flex items-center gap-2'>
                {data?.designationIcon && <i className={data?.designationIcon} />}
                <Typography className='font-medium'>{data?.designation}</Typography>
              </div>
            )}
            {data?.location && (
              <div className='flex items-center gap-2'>
                <i className='tabler-map-pin' />
                <Typography className='font-medium'>{data?.location}</Typography>
              </div>
            )}
            {data?.joiningDate && (
              <div className='flex items-center gap-2'>
                <i className='tabler-calendar' />
                <Typography className='font-medium'>{data?.joiningDate}</Typography>
              </div>
            )}
          </div>
          <Button
            variant='contained'
            className={`mt-4 flex gap-2 ${getStatusColor(status)}`}
            onClick={() => {
              const nextStatus = status === 'connected' ? 'busy' : status === 'busy' ? 'disconnected' : 'connected'
              setStatus(nextStatus)
            }}
          >
            <i className='tabler-user-check !text-base'></i>
            <span>{getStatusText(status)}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default UserProfileHeader
