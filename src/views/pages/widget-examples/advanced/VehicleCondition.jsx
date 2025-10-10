'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Chip from '@mui/material/Chip'

// Components Imports
import OptionMenu from '@core/components/option-menu'
import { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'

// Vars
const initialData = [
  { title: 'Incorrect address', subtitle: 'All exceptions', progress: 83, color: 'success', chipLabel: '+10' },
  { title: 'Good', subtitle: '24 Vehicles', progress: 11, color: 'info', chipLabel: '+9.1' },
  { title: 'Average', subtitle: '14 Vehicles', progress: 8, color: 'primary', chipLabel: '+2.5' },
  { title: 'Bad', subtitle: '8 Vehicles', progress: 6, color: 'warning', chipLabel: '-3.4' },
  { title: 'Not Working', subtitle: '4 Vehicles', progress: 2, color: 'error', chipLabel: '-12.6' }
]

const VehicleCondition = () => {
  const [progressData, setProgressData] = useState(initialData)

  // Estado para Update
  const [openUpdate, setOpenUpdate] = useState(false)
  const [editData, setEditData] = useState(initialData)

  const handleMenuAction = (action) => {
    if (action === 'Refresh') {
      setProgressData(prev => 
        prev.map(item => ({
          ...item,
          progress: `$${Math.floor(Math.random() * 100) + 1}`,
          chipLabel: `${Math.floor(Math.random() * 10) + 10}`
        }))
      )
    } else if (action === 'Update') {
      setEditData(progressData)
      setOpenUpdate(true)
    } else if (action === 'Share') {
      if (navigator.share) {
        navigator.share({
          title: 'Total Earning',
          text: 'Check total earnings',
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
      [field]: field === 'amount' && !isNaN(value) ? Number(value) : value
    }
    setEditData(updated)
  }

  return (
    <>
      <Card>
        <CardHeader 
          title='Vehicles Condition' 
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
        <CardContent className='flex flex-col gap-8'>
          {progressData.map((item, i) => (
            <div key={i} className='flex items-center gap-4'>
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
              <div className='flex justify-between items-center is-full gap-4'>
                <div>
                  <Typography className='font-medium mbe-1.5' color={`${item.color}.main`}>
                    {item.title}
                  </Typography>
                  <Typography variant='body2'>{item.subtitle}</Typography>
                </div>
                <Chip variant='tonal' size='small' label={`${item.chipLabel}%`} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Modal Update */}
      <Dialog open={openUpdate} onClose={() => setOpenUpdate(false)}>
        <DialogTitle>Update Vehicle Condition</DialogTitle>
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
                label='Subtitle'
                fullWidth
                value={item.subtitle}
                onChange={(e) => handleEditChange(i, 'subtitle', e.target.value)}
              />
              <TextField 
                label='Progress (%)'
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

export default VehicleCondition
