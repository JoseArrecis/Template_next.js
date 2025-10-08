'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'

// Components Imports
import OptionMenu from '@core/components/option-menu'
import { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'

// Vars
const initialData = [
  {
    title: 'Laravel',
    subtitle: 'eCommerce',
    progress: 54,
    progressColor: 'error',
    imgSrc: '/images/logos/laravel.png'
  },
  {
    title: 'Figma',
    subtitle: 'App UI Kit',
    progress: 85,
    progressColor: 'primary',
    imgSrc: '/images/logos/figma.png'
  },
  {
    title: 'VusJs',
    subtitle: 'Calendar App',
    progress: 64,
    progressColor: 'success',
    imgSrc: '/images/logos/vue.png'
  },
  {
    title: 'React',
    subtitle: 'Dashboard',
    progress: 40,
    progressColor: 'info',
    imgSrc: '/images/logos/react.png'
  },
  {
    title: 'Bootstrap',
    subtitle: 'Website',
    progress: 17,
    progressColor: 'primary',
    imgSrc: '/images/logos/bootstrap.png'
  },
  {
    title: 'Sketch',
    subtitle: 'Website Design',
    progress: 30,
    progressColor: 'warning',
    imgSrc: '/images/logos/sketch.png'
  }
]

const ActiveProjects = () => {
  const [progressData, setProgressData] = useState(initialData)

  const [openUpdate, setOpenUpdate] = useState(false)
  const [editData, setEditData] = useState(progressData)

  const handleMenuAction = (action) => {
    if (action === 'Refresh') {
      setProgressData(prev =>
        prev.map(item => ({
          ...item,
          progress: Math.floor(Math.random() * 100) + 1
        }))
      )
    } else if (action === 'Update') {
      setEditData(progressData)
      setOpenUpdate(true)
    } else if (action === 'Share') {
      if (navigator.share) {
        navigator.share({
          title: 'Assignment Progress',
          text: 'Check out my assignment progress',
          url: window.location.href
        }).catch(err => console.log('Share canceled', err))
      } else {
        alert('Sharing is not supported in this browser')
      }
    }
  }

  const handleUpdateSave = () => {
    setProgressData(editData)
    setOpenUpdate(false)
  }

  const handleEditChange = (index, field, value) => {
    const updated = [...editData]
    updated[index] = {
      ...updated[index],
      [field]: field === 'progress' && !isNaN(value) ? Number(value) : value
    }
    setEditData(updated)
  }

  return (
    <>
      <Card>
        <CardHeader
          title='Active Projects'
          subheader='Average 72% completed'
          action={
            <OptionMenu 
              options={[
                { text: 'Refresh', menuItemProps: { onClick: () => handleMenuAction('Refresh') } }, 
                { text: 'Update', menuItemProps: { onClick: () => handleMenuAction('Update') } }, 
                { text: 'Share', menuItemProps: { onClick: () => handleMenuAction('Share') } }
              ]} 
            />
          }
        />
        <CardContent className='flex flex-col gap-4'>
          {progressData.map((item, index) => (
            <div key={index} className='flex items-center gap-4'>
              <img src={item.imgSrc} alt={item.title} width={32} />
              <div className='flex flex-wrap justify-between items-center gap-x-4 gap-y-1 is-full'>
                <div className='flex flex-col'>
                  <Typography className='font-medium' color='text.primary'>
                    {item.title}
                  </Typography>
                  <Typography variant='body2'>{item.subtitle}</Typography>
                </div>
                <div className='flex justify-between items-center is-32'>
                  <LinearProgress
                    value={item.progress}
                    variant='determinate'
                    color={item.progressColor}
                    className='min-bs-2 is-20'
                  />
                  <Typography color='text.disabled'>{`${item.progress}%`}</Typography>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Modal Update */}
      <Dialog open={openUpdate} onClose={() => setOpenUpdate(false)}>
        <DialogTitle>Update Projects</DialogTitle>
        <DialogContent className='flex flex-col gap-4 mt-2'>
          {editData.map((item, index) => (
            <div key={index} className='flex gap-4 items-center'>
              <TextField 
                label='Title'
                fullWidth
                value={item.title}
                onChange={(e) => handleEditChange(index, 'title', e.target.value)}
              />
              <TextField 
                label='Progress (%)'
                type='number'
                fullWidth
                value={item.progress}
                onChange={(e) => handleEditChange(index, 'progress', e.target.value)}
              />
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUpdate(false)}>Cancel</Button>
          <Button variant='contained' onClick={handleUpdateSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ActiveProjects
