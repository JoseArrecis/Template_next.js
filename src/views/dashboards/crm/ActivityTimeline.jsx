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
import { Dialog, DialogContent, DialogTitle, TextField, Button } from '@mui/material'

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
  const [openUpdate, setOpenUpdate] = useState(false)
  const [editData, setEditData] = useState([])

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

  // ➕ Agregar un nuevo evento
  const handleAddEvent = () => {
    const newEvent = {
      color: 'warning',
      title: 'New task added',
      time: 'Just now',
      description: 'A new task has been added to the project'
    }
    setEvents(prev => [newEvent, ...prev])
  }

  // 📋 Copiar timeline
  const handleShareTimeline = () => {
    const text = `📋 Activity Timeline:\n\n${events
      .map(e => `• ${e.title} (${e.time})`)
      .join('\n')}`
    navigator.clipboard.writeText(text)
    alert('✅ Timeline copied to clipboard!')
  }

  // ✏️ Abrir editor
  const handleUpdateAll = () => {
    setEditData(events.map(item => ({ ...item })))
    setOpenUpdate(true)
  }

  // 🐞 Reportar bug
  const handleReportBug = () => {
    const issueUrl = 'https://github.com/tu-repo/issues/new?title=Bug%20in%20Timeline'
    window.open(issueUrl, '_blank')
  }

  // 📝 Editar campos
  const handleFieldChange = (index, field, value) => {
    setEditData(prev => {
      const updated = [...prev]
      updated[index][field] = value
      return updated
    })
  }

  // 💾 Guardar cambios
  const handleUpdateSave = () => {
    setEvents(editData)
    setOpenUpdate(false)
  }

  return (
    <>
      <Card sx={{ backgroundColor: '#3a3d55', color: '#e0e0e0' }}>
        <CardHeader
          avatar={<i className='tabler-list-details text-xl text-[#e0e0e0]' />}
          title='Activity Timeline'
          titleTypographyProps={{ variant: 'h5' }}
          action={
            <OptionMenu
              options={[
                { text: 'Add', menuItemProps: { onClick: handleAddEvent } },
                { text: 'Share timeline', menuItemProps: { onClick: handleShareTimeline } },
                { text: 'Update', menuItemProps: { onClick: handleUpdateAll } },
                { text: 'Report bug', menuItemProps: { onClick: handleReportBug } }
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
                    <Typography className='font-medium' color='white'>
                      {event.title}
                    </Typography>
                    <Typography variant='caption' color='#b0b0b0'>
                      {event.time}
                    </Typography>
                  </div>
                  <Typography className='mbe-2' color='#d0d0d0'>
                    {event.description}
                  </Typography>

                  {event.file && (
                    <div className='flex items-center gap-2.5 is-fit rounded bg-[#2c2f3e] plb-[5px] pli-2.5'>
                      <img height={20} alt={event.file} src={event.icon} />
                      <Typography className='font-medium' color='#e0e0e0'>
                        {event.file}
                      </Typography>
                    </div>
                  )}

                  {event.client && (
                    <div className='flex items-center gap-2.5'>
                      <Avatar src={event.client.avatar} className='is-8 bs-8' />
                      <div className='flex flex-col flex-wrap'>
                        <Typography variant='body2' className='font-medium' color='white'>
                          {event.client.name}
                        </Typography>
                        <Typography variant='body2' color='#b0b0b0'>
                          {event.client.role}
                        </Typography>
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

      {/* 🧩 Modal de actualización */}
      <Dialog open={openUpdate} onClose={() => setOpenUpdate(false)} maxWidth='sm' fullWidth>
        <DialogTitle>✏️ Update Activity Timeline</DialogTitle>
        <DialogContent className='flex flex-col gap-4 mt-2'>
          {editData.map((event, index) => (
            <div key={index} className='flex flex-col gap-2 border p-3 rounded-md'>
              <TextField
                label='Title'
                fullWidth
                value={event.title}
                onChange={e => handleFieldChange(index, 'title', e.target.value)}
              />
              <TextField
                label='Time'
                fullWidth
                value={event.time}
                onChange={e => handleFieldChange(index, 'time', e.target.value)}
              />
              <TextField
                label='Description'
                fullWidth
                value={event.description}
                onChange={e => handleFieldChange(index, 'description', e.target.value)}
              />
            </div>
          ))}
          <Button variant='contained' onClick={handleUpdateSave} sx={{ mt: 2 }}>
            Save Changes
          </Button>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ActivityTimeline
