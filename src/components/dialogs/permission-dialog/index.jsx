'use client'

// MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import DialogCloseButton from '../DialogCloseButton'
import { useState } from 'react'

const AddContent = ({ handleClose, onAddPermission }) => {
  const [name, setName] = useState('')
  const [isCore, setIsCore] = useState(false)

  const handleCreate = () => {
    if (!name.trim()) return 

    const newPermission = {
      id: Math.floor(Math.random() * 10000),
      name,
      assignedTo: isCore ? 'administrador' : 'users',
      createdData: new Date().toLocaleDateString()
    }

    onAddPermission(newPermission)
    handleClose()
  }

  return (
    <>
      <DialogContent className='overflow-visible pbs-0 sm:pli-16'>
        <CustomTextField
          fullWidth
          label='Permission Name'
          variant='outlined'
          placeholder='Enter Permission Name'
          className='mbe-2'
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <FormControlLabel 
          control={<Checkbox checked={isCore} onChange={e => setIsCore(e.target.value)} />} 
          label='Set as core permission' 
        />
      </DialogContent>
      <DialogActions className='flex justify-center pbs-0 sm-:pbe-16 sm:pli-16'>
        <Button type='submit' variant='contained' onClick={handleCreate}>
          Create Permission
        </Button>
        <Button onClick={handleClose} variant='tonal' color='secondary'>
          Discard
        </Button>
      </DialogActions>
    </>
  )
}

const EditContent = ({ handleClose, data }) => {
  return (
    <DialogContent className='overflow-visible pbs-0 sm:pli-16'>
      <Alert severity='warning' className='mbe-8'>
        <AlertTitle>Warning!</AlertTitle>
        By editing the permission name, you might break the system permissions functionality. Please ensure you&#39;re
        absolutely certain before proceeding.
      </Alert>
      <div className='flex items-end gap-4 mbe-2'>
        <CustomTextField
          fullWidth
          size='small'
          defaultValue={data}
          variant='outlined'
          label='Permission Name'
          placeholder='Enter Permission Name'
        />
        <Button variant='contained' onClick={handleClose}>
          Update
        </Button>
      </div>
      <FormControlLabel control={<Checkbox />} label='Set as core permission' />
    </DialogContent>
  )
}

const PermissionDialog = ({ open, setOpen, data, onAddPermission }) => {
  const handleClose = () => setOpen(false)

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogCloseButton onClick={handleClose}>
        <i className='tabler-x' />
      </DialogCloseButton>
      <DialogTitle>
        {data ? 'EditPermission' : 'Add New Permission'}
      </DialogTitle>
      {data
        ? <EditContent handleClose={handleClose} data={data} />
        : <AddContent handleClose={handleClose} onAddPermission={onAddPermission} />
      }
    </Dialog>
  )
}

export default PermissionDialog
