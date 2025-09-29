'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import MuiTimeline from '@mui/lab/Timeline'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import Typography from '@mui/material/Typography'

// Components Imports
import OptionMenu from '@core/components/option-menu'

// Styled Timeline component
const Timeline = styled(MuiTimeline)({
  paddingLeft: 0,
  paddingRight: 0,
  '& .MuiTimelineItem-root': {
    width: '100%',
    '&:before': {
      display: 'none'
    }
  }
})

const ActivityTimeline = () => {
  const [events, setEvents] = useState([
    {
      color: 'primary',
      title: '12 Invoices have been paid',
      time: '12 min ago',
      description: 'Invoices have been paid to the company',
      file: 'invoices.pdf',
      icon: '/images/icons/pdf-document.png'
    },
    {
      color: 'success',
      title: 'Client Meeting',
      time: '45 min ago',
      description: 'Project meeting with John @10:15am',
      client: {
        name: 'Lester McCarthy',
        role: 'CEO of Pixinvent',
        avatar: '/images/avatars/1.png'
      }
    },
    {
      color: 'info',
      title: 'Create a new project for client',
      time: '2 Day Ago',
      description: '6 team members in a project',
      members: [
        '/images/avatars/1.png',
        '/images/avatars/4.png',
        '/images/avatars/2.png'
      ]
    }
  ])

  // Función para agregar un nuevo evento
  const handleAddEvent = () => {
    const newEvent = {
      color: 'warning',
      title: 'New task added',
      time: 'Just now',
      description: 'A new task has been added to the project'
    }
    setEvents(prev => [newEvent, ...prev])
  }

  return (
    <Card>
      <CardHeader
        avatar={<i className='tabler-list-details text-xl' />}
        title='Activity Timeline'
        titleTypographyProps={{ variant: 'h5' }}
        action={
          <OptionMenu
            options={[
              { text: 'Add', menuItemProps: { onClick: handleAddEvent } },
              'Share timeline',
              'Suggest edits',
              'Report bug'
            ]}
          />
        }
        sx={{ '& .MuiCardHeader-avatar': { mr: 3 } }}
      />
      <CardContent className='flex flex-col gap-6 pbe-5'>
        <Timeline>
          {events.map((event, index) => (
            <TimelineItem key={index}>
              <TimelineSeparator>
                <TimelineDot color={event.color || 'primary'} />
                {index !== events.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent>
                <div className='flex flex-wrap items-center justify-between gap-x-2 mbe-2.5'>
                  <Typography className='font-medium' color='text.primary'>
                    {event.title}
                  </Typography>
                  <Typography variant='caption'>{event.time}</Typography>
                </div>
                <Typography className='mbe-2'>{event.description}</Typography>

                {event.file && (
                  <div className='flex items-center gap-2.5 is-fit rounded bg-actionHover plb-[5px] pli-2.5'>
                    <img height={20} alt={event.file} src={event.icon} />
                    <Typography className='font-medium'>{event.file}</Typography>
                  </div>
                )}

                {event.client && (
                  <div className='flex items-center gap-2.5'>
                    <Avatar src={event.client.avatar} className='is-8 bs-8' />
                    <div className='flex flex-col flex-wrap'>
                      <Typography variant='body2' className='font-medium'>
                        {event.client.name}
                      </Typography>
                      <Typography variant='body2'>{event.client.role}</Typography>
                    </div>
                  </div>
                )}

                {event.members && (
                  <AvatarGroup total={event.members.length} className='pull-up'>
                    {event.members.map((m, i) => (
                      <Avatar key={i} src={m} />
                    ))}
                  </AvatarGroup>
                )}
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </CardContent>
    </Card>
  )
}

export default ActivityTimeline
