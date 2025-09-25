'use client'

import { useState } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import CustomIconButton from '@core/components/mui/IconButton'
import OptionMenu from '@core/components/option-menu'
import DirectionalIcon from '@components/DirectionalIcon'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

const initialData = [
  { 
    title: 'User Experience Design', 
    tasks: 120, 
    progress: 72, 
    color: 'primary',
    details: 'This includes wireframes, prototypes, and user testing.'
  },
  { 
    title: 'Basic fundamentals', 
    tasks: 32, 
    progress: 48,
    color: 'success',
    details: 'Covers basic principles, theory, and examples.'
  },
  { 
    title: 'React Native components', 
    tasks: 182, 
    progress: 15, 
    color: 'error',
    details: 'Building blocks of React Native apps.'
  },
  { 
    title: 'Basic of music theory', 
    tasks: 56, 
    progress: 24, 
    color: 'info',
    details: 'Learning scales, chords, and rhythm patterns.'
  }
]

const AssignmentProgress = () => {
  const [expandedIndex, setExpandedIndex] = useState(null)
  const [progressData, setProgressData] = useState(initialData)

  // Estado para Update
  const [openUpdate, setOpenUpdate] = useState(false)
  const [editData, setEditData] = useState(progressData)

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

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
        alert('Sharing is not supported in this browser.')
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
      [field]: field === 'progress' || field === 'tasks' ? Number(value) : value
    }
    setEditData(updated)
  }

  return (
    <>
      <Card>
        <CardHeader 
          title='Assignment Progress' 
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
          {progressData.map((item, i) => (
            <div key={i} className='flex flex-col gap-2 border-b pb-2'>
              <div className='flex items-center justify-between gap-4'>
                <div className='flex items-center gap-4'>
                  <div className='relative flex items-center justify-center'>
                    <CircularProgress
                      variant='determinate'
                      size={54}
                      value={100}
                      thickness={3}
                      className='absolute text-[var(--mui-palette-customColors-trackBg)]'
                    />
                    <CircularProgress
                      variant='determinate'
                      size={54}
                      value={item.progress}
                      thickness={3}
                      color={item.color}
                      sx={{ '& .MuiCircularProgress-circle': { strokeLinecap: 'round' } }}
                    />
                    <Typography className='absolute font-medium' color='text.primary'>
                      {`${item.progress}%`}
                    </Typography>
                  </div>
                  <div>
                    <Typography className='font-medium mbe-1.5' color='text.primary'>
                      {item.title}
                    </Typography>
                    <Typography variant='body2'>{`${item.tasks} Tasks`}</Typography>
                  </div>
                </div>
                <CustomIconButton 
                  size='small' 
                  variant='tonal' 
                  color='secondary' 
                  onClick={() => toggleExpand(i)}
                >
                  <DirectionalIcon 
                    ltrIconClass={expandedIndex === i ? 'tabler-chevron-down' : 'tabler-chevron-right'} 
                    rtlIconClass={expandedIndex === i ? 'tabler-chevron-down' : 'tabler-chevron-left'} 
                  />
                </CustomIconButton>
              </div>

              {expandedIndex === i && (
                <Typography variant='body2' color='text.secondary' className='pl-16'>
                  {item.details}
                </Typography>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Modal Update */}
      <Dialog open={openUpdate} onClose={() => setOpenUpdate(false)}>
        <DialogTitle>Update Assignment</DialogTitle>
        <DialogContent className='flex flex-col gap-4 mt-2'>
          {editData.map((item, i) => (
            <div key={i} className='flex gap-4 items-center'>
              <TextField 
                label='Title' 
                fullWidth 
                value={item.title} 
                onChange={(e) => handleEditChange(i, 'title', e.target.value)} 
              />
              <TextField 
                label='Progress (%)' 
                type='number' 
                fullWidth 
                value={item.progress} 
                onChange={(e) => handleEditChange(i, 'progress', e.target.value)} 
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

export default AssignmentProgress
