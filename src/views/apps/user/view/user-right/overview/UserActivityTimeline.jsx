'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import { styled } from '@mui/material/styles'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import Typography from '@mui/material/Typography'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import MuiTimeline from '@mui/lab/Timeline'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'
import { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import OptionMenu from '@/@core/components/option-menu'

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

const UserActivityTimeLine = () => {
  const [events, setEvents] = useState([
    {
      color: 'primary',
      title: 'Invoices paid',
      time: '12 min ago',
      description: 'Invoices have been paid successfully',
      file: 'invoices.pdf',
      icon: '/images/icons/pdf-document.png'
    },
    {
      color: 'success',
      title: 'Client Meeting',
      time: '45 min ago',
      description: 'Meeting with John @10:15am',
      client: { name: 'Lester McCarthy', role: 'CEO of Pixinvent', avatar: '/images/avatars/1.png' }
    },
    {
      color: 'info',
      title: 'New project created',
      time: '2 days ago',
      description: '6 team members assigned',
      members: ['/images/avatars/1.png', '/images/avatars/4.png', '/images/avatars/2.png']
    }
  ])

  const [modal, setModal] = useState({ open: false, type: '', data: null })
  const [input, setInput] = useState({ title: '', time: '', description: '', bug: '' })
  const [bugs, setBugs] = useState([])

  const handleMenuAction = (type) => {
    if (type === 'add') {
      setInput({ title: '', time: '', description: '' })
      setModal({ open: true, type })
    } else if (type === 'update') {
      setModal({ open: true, type, data: [...events] })
    } else if (type === 'bug') {
      setInput({ bug: '' })
      setModal({ open: true, type })
    }
  }

  const handleClose = () => setModal({ open: false, type: '', data: null })

  const handleAdd = () => {
    setEvents(prev => [
      { color: 'warning', title: input.title, time: input.time, description: input.description },
      ...prev
    ])
    handleClose()
  }

  const handleUpdate = () => {
    setEvents(modal.data)
    handleClose()
  }

  const handleBug = () => {
    setBugs(prev => [
      { text: input.bug, date: new Date().toLocaleString() },
      ...prev
    ])
    handleClose()
  }

  const renderModalContent = () => {
    switch (modal.type) {
      case 'add':
        return(
          <DialogContent className='flex flex-col gap-3'>
            <TextField label='Title' value={input.title} onChange={e => setInput({ ...input, title: e.target.value })} />
            <TextField label='Time' value={input.time} onChange={e => setInput({ ...input, time: e.target.value })} />
            <TextField label='Description' value={input.description} onChange={e => setInput({ ...input, description: e.target.value })} />
          </DialogContent>
        )
      case 'update':
        return (
          <DialogContent className='flex flex-col gap-3'>
            {modal.data.map((ev, i) => (
              <div key={i} className='border p-2 rounded'>
                <TextField 
                  label='Title'
                  fullWidth
                  value={ev.title}
                  onChange={e => {
                    const newData = [...modal.data]
                    newData[i].title = e.target.value
                    setModal({ ...modal, data: newData })
                  }}
                  sx={{ mb: 1 }}
                />
                <TextField
                  label='Time'
                  fullWidth
                  value={ev.time}
                  onChange={e => {
                    const newData = [...modal.data]
                    newData[i].time = e.target.value
                    setModal({ ...modal, data: newData })
                  }}
                  sx={{ mb: 1 }}
                />
                <TextField
                  label='Description'
                  fullWidth
                  value={ev.description}
                  onChange={e => {
                    const newData = [...modal.data]
                    newData[i].description = e.target.value
                    setModal({ ...modal, data: newData })
                  }}
                />
              </div>
            ))}
          </DialogContent>
        )
      case 'bug':
        return (
          <DialogContent>
            <Typography mb={2}>Describe the bug</Typography>
            <textarea 
              value={input.bug}
              onChange={e => setInput({ ...input, bug: e.target.value })}
              rows={4}
              style={{
                width: '100%',
                background: '#23243a',
                color: '#fff',
                border: '1px solid #f44336',
                borderRadius: 8,
                padding: 10,
                fontSize: 16,
                resize: 'vertical'
              }}
              placeholder='Describe the bug...'
            />
          </DialogContent>
        )
      default:
        return null
    }
  }

  return (
    <>
      <Card sx={{ background: '#2e3147', color: '#fff' }}> 
        <CardHeader 
          title='User Activity Timeline' 
          action={
            <OptionMenu 
              options={[
                { text: 'Add Event', menuItemProps: { onClick: () => handleMenuAction('add') } },
                { text: 'Update All', menuItemProps: { onClick: () => handleMenuAction('update') } },
                { text: 'Report Bug', menuItemProps: { onClick: () => handleMenuAction('bug') } }
              ]}
            /> 
          }
        />
        <CardContent>
          <Timeline>
            {events.map((event, i) => (
              <TimelineItem key={i}>
                <TimelineSeparator>
                  <TimelineDot color={event.color} />
                  {i < events.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <Typography variant='h6'>{event.title}</Typography>
                  <Typography variant='caption' color='gray'>{event.time}</Typography>
                  <Typography variant='body2'>{event.description}</Typography>

                  {event.client && (
                    <div className='flex items-center gap-2 mt-2'>
                      <Avatar src={event.client.avatar} />
                      <Typography>{event.client.name} - {event.client.role}</Typography>
                    </div>
                  )}

                  {event.members && (
                    <AvatarGroup total={event.members.length}>
                      {event.members.map((m, j) => <Avatar key={j} src={m} />)}
                    </AvatarGroup>
                  )}
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>

          {bugs.length > 0 && (
            <>
              <Typography variant='subtitle2' color='error.main' sx={{ mt: 3 }}>Reported Bugs:</Typography>
              {bugs.map((b, i) => (
                <Typography key={i} variant='body2' sx={{ color: '#ccc' }}>
                  {b.text} <span style={{ fontSize: 12, color: '#888' }}>({b.date})</span>
                </Typography>
              ))}
            </>
          )}
        </CardContent>
      </Card>

      {/* Dialog Global */}
      <Dialog open={modal.open} onClose={handleClose} maxWidth='sm' fullWidth> 
        <DialogTitle>
          {modal.type === 'add' && 'Add Event'}
          {modal.type === 'update' && 'Update Event'}
          {modal.type === 'bug' && 'Report bug'}
        </DialogTitle>
        {renderModalContent()}
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
            {modal.type === 'add' && <Button variant='contained' onClick={handleAdd} disabled={!input.title.trim()}>Add</Button>}  
            {modal.type === 'update' && <Button variant='contained' onClick={handleUpdate}>Save Changes</Button>}  
            {modal.type === 'bug' && <Button variant='contained' onClick={handleBug} disabled={!input.bug.trim()}>Report</Button>}      
        </DialogActions>
      </Dialog>
    </>
  )
}

export default UserActivityTimeLine
