'use client'

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
import { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, TextField } from '@mui/material'
import { IconTrendingUp } from '@tabler/icons-react'

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

  const [modal, setModal] = useState({ open: false, type: '', context: '' })

  // Estado para Report Bug
  const [openBugModal, setOpenBugModal] = useState(false)
  const [bugValue, setBugValue] = useState('')
  const [bugs, setBugs] = useState([])
  const [openBugList, setOpenBugList] = useState(false)
  const [snackbar, setSnackbar] = useState({ open: false, message: '' })

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
      title: 'Client Metting',
      time: '45 min ago',
      description: 'Project metting with Jhon @10:15am',
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

  const handleClose = () => setModal({ open: false, type: '', context: '' })

  const handleAddEvent = () => {
    const newEvent = {
      color: 'warning',
      title: 'New task added',
      time: 'Just now',
      description: 'A new task has been added to the project'
    }
    setEvents(prev => [newEvent, ...prev])
  }

  const handleShareTimeline = () => {
    const text = `Activity Timeline:\n\n${events
      .map(e => `• ${e.title} (${e.time})`)
      .join('\n')}`
    navigator.clipboard.writeText(text)
    alert('Timeline copied to clipboard')
  }

  const handleUpdateAll = () => {
    setEditData(events.map(item => ({ ...item })))
    setOpenUpdate(true)
  }

  const handleOpenReportBug = () => {
    setOpenBugModal(true)
  }

  const handleReportBug = () => {
    if(!bugValue.trim()) {
      setSnackbar({ open: true, message: 'Please enter a description of the bug' })
      return
    }

    setBugs(prev => [
      { text: bugValue, date: new Date().toLocaleString() },
      ...prev
    ])
    setBugValue('')
    setOpenBugModal(false)
    setSnackbar({ open: true, message: 'Bug reported succesfully' })
  }

  const handleFieldChange = (index, field, value) => {
    setEditData(prev => {
      const updated = [...prev]
      updated[index][field] = value
      return updated
    })
  }

  const handleUpdateSave = () => {
    setEvents(editData)
    setOpenUpdate(false)
  }

  return (
    <>
      <Card>
        <CardHeader
          avatar={<i className='tabler-list-details text-xl' />}
          title='Activity Timeline'
          titleTypographyProps={{ variant: 'h5' }}
          action={
            <OptionMenu
              options={[
                { text: 'Add', menuItemProps: { onClick: handleAddEvent }},
                { text: 'Share timeline', menuItemProps: { onClick: handleShareTimeline } }, 
                { text: 'Update', menuItemProps: { onClick: handleUpdateAll } }, 
                { text: 'Report bug', menuItemProps: { onClick: () => setOpenBugModal(true) } },
                { text: 'View bug reports', menuItemProps: { onClick: () => setOpenBugList(true) } }
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

      {/* Modal Update */}
      <Dialog open={openUpdate} onClose={() => setOpenUpdate(false)} maxWidth='sm' fullWidth>
        <DialogTitle>Update Activity Timeline</DialogTitle>
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
          <Button variant='contained' onClick={() => setOpenUpdate(false)}>Cancel</Button>
          <Button variant='contained' onClick={handleUpdateSave} sx={{ mt: 2 }}>
            Save Changes
          </Button>
        </DialogContent>
      </Dialog>

      {/* Modal Report Bug */}
      <Dialog open={openBugModal} onClose={() => setOpenBugModal(false)} maxWidth='sm' fullWidth>
        <DialogTitle>Report Bug</DialogTitle>
        <DialogContent>
          <TextField 
            label='Describe the issue'
            multiline
            rows={4}
            fullWidth
            margin='dense'
            value={bugValue}
            onChange={e => setBugValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenBugModal(false)}>Cancel</Button>
          <Button variant='contained' onClick={handleReportBug}>Submit</Button>
        </DialogActions>
      </Dialog>

      {/* Modal para ver reportes de bugs */}
      <Dialog open={openBugList} onClose={() => setOpenBugList(false)} maxWidth='sm' fullWidth>
      <DialogTitle>Reported Bugs</DialogTitle>
      <DialogContent>
        {bugs.length === 0 ? (
          <Typography color='text.secondary'>No bugs reported yet</Typography>
        ) : (
          bugs.map((bug, index) => (
            <div key={index} className='border p-3 rounded-md mb-2'>
              <Typography variant='body1' color='text.primary'>
                {bug.text}
              </Typography>
              <Typography variant='caption' color='text.secondary'>
                Reported on: {bug.date}
              </Typography>
            </div>
          ))
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenBugList(false)}>Close</Button>
      </DialogActions>
    </Dialog>

      <Snackbar 
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </>
  )
}

export default ActivityTimeline
