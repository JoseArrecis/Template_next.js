'use client'

import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

// Components Imports
import CustomAvatar from '@core/components/mui/Avatar'
import { MoreVerticalIcon } from 'lucide-react'

// Initial data
const initialData = [
  { name: 'Jordan Stevenson', profession: 'Business Intelligence', totalCourses: 33, avatar: '/images/avatars/1.png' },
  { name: 'Bentlee Emblin', profession: 'Digital Marketing', totalCourses: 52, avatar: '/images/avatars/2.png' },
  { name: 'Benedetto Rossiter', profession: 'UI/UX Design', totalCourses: 12, avatar: '/images/avatars/3.png' },
  { name: 'Beverlie Krabbe', profession: 'Vue', totalCourses: 8, avatar: '/images/avatars/4.png' }
]

export default function PopularInstructors() {
  const [progressData, setProgressData] = useState(initialData)

  const [anchorEl, setAnchorEl] = useState(null)
  const menuOpen = Boolean(anchorEl)
  const openMenu = (e) => setAnchorEl(e.currentTarget)
  const closeMenu = () => setAnchorEl(null)

  const [openUpdate, setOpenUpdate] = useState(false)
  const [editData, setEditData] = useState([])

  const handleRefresh = () => {
    setProgressData(prev =>
      prev.map(item => ({ ...item, totalCourses: Math.floor(Math.random() * 100) + 1 }))
    )
    closeMenu()
  }

  const handleUpdateAll = () => {
    setEditData(progressData.map(item => ({ ...item }))) 
    setOpenUpdate(true)
    closeMenu()
  }

  const handleShare = async () => {
    closeMenu()
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Popular Instructors',
          text: 'Check out these instructors and their courses!',
          url: window.location.href
        })
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(JSON.stringify(progressData, null, 2))
        alert('Data copied to clipboard (fallback)')
      } else {
        alert('Sharing not supported')
      }
    } catch (err) {
      console.error('Share failed', err)
    }
  }

  const handleFieldChange = (index, field, value) => {
    setEditData(prev => {
      const copy = [...prev]
      copy[index] = { ...copy[index], [field]: field === 'totalCourses' ? Number(value) : value }
      return copy
    })
    setProgressData(prev => {
      const copy = [...prev]
      copy[index] = { ...copy[index], [field]: field === 'totalCourses' ? Number(value) : value }
      return copy
    })
  }

  const handleUpdateSave = () => {
    setOpenUpdate(false)
  }

  return (
    <>
      <Card className='bs-full'>
        <CardHeader
          title='Popular Instructors'
          action={
            <>
              <IconButton aria-label='more' onClick={openMenu} size='large'>
                <MoreVerticalIcon />
              </IconButton>
              <Menu anchorEl={anchorEl} open={menuOpen} onClose={closeMenu}>
                <MenuItem onClick={handleRefresh}>Refresh</MenuItem>
                <MenuItem onClick={handleUpdateAll}>Update All</MenuItem>
                <MenuItem onClick={handleShare}>Share</MenuItem>
              </Menu>
            </>
          }
        />
        <Divider />
        <div className='flex justify-between plb-4 pli-6'>
          <Typography className='uppercase'>instructors</Typography>
          <Typography className='uppercase'>courses</Typography>
        </div>
        <Divider />
        <CardContent className='flex flex-col gap-4'>
          {progressData.map((item, i) => (
            <div key={i} className='flex items-center gap-4'>
              <CustomAvatar size={34} src={item.avatar} />
              <div className='flex justify-between items-center is-full gap-4'>
                <div>
                  <Typography className='font-medium' color='text.primary'>
                    {item.name}
                  </Typography>
                  <Typography variant='body2'>{item.profession}</Typography>
                </div>
                <Typography className='font-medium' color='text.primary'>
                  {item.totalCourses}
                </Typography>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Modal Update */}
      <Dialog open={openUpdate} onClose={() => setOpenUpdate(false)} maxWidth='sm' fullWidth>
        <DialogTitle>Update All Instructors</DialogTitle>
        <DialogContent className='flex flex-col gap-4 mt-2'>
          {editData.map((it, idx) => (
            <div key={idx} className='flex flex-col gap-2 border p-3 rounded-md'>
              <TextField
                label='Name'
                fullWidth
                value={it.name}
                onChange={(e) => handleFieldChange(idx, 'name', e.target.value)}
              />
              <TextField
                label='Profession'
                fullWidth
                value={it.profession}
                onChange={(e) => handleFieldChange(idx, 'profession', e.target.value)}
              />
              <TextField
                label='Total Courses'
                type='number'
                fullWidth
                value={it.totalCourses}
                onChange={(e) => handleFieldChange(idx, 'totalCourses', e.target.value)}
              />
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUpdate(false)}>Cancel</Button>
          <Button variant='contained' onClick={handleUpdateSave}>Save All</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
