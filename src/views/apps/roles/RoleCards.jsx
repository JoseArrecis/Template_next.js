'use client'

import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Snackbar from '@mui/material/Snackbar'
import Tooltip from '@mui/material/Tooltip'

const RoleCards = () => {
  const [roles, setRoles] = useState([
    { totalUsers: 4, title: 'Administrator', avatars: ['1.png', '2.png', '3.png', '4.png'] },
    { totalUsers: 7, title: 'Editor', avatars: ['5.png', '6.png', '7.png'] },
    { totalUsers: 5, title: 'Users', avatars: ['4.png', '5.png', '6.png'] },
    { totalUsers: 6, title: 'Support', avatars: ['1.png', '2.png', '3.png'] },
    { totalUsers: 10, title: 'Restricted User', avatars: ['4.png', '5.png', '6.png'] }
  ])

  const [newRole, setNewRole] = useState({ title: '', totalUsers: '' })
  const [snackbar, setSnackbar] = useState({ open: false, message: '' })

  const handleAddRole = () => {
    if (!newRole.title || !newRole.totalUsers) {
      setSnackbar({ open: true, message: 'Please fill all fields!' })
      return
    }

    const exists = roles.find(role => role.title.toLowerCase() === newRole.title.toLowerCase())
    if (exists) {
      setSnackbar({ open: true, message: 'Role already exists!' })
      return
    }

    const newRoleData = {
      title: newRole.title,
      totalUsers: parseInt(newRole.totalUsers),
      avatars: []
    }

    setRoles([...roles, newRoleData])
    setSnackbar({ open: true, message: `Role "${newRole.title}" added!` })
    setNewRole({ title: '', totalUsers: '' })
  }

  const handleDeleteRole = (title) => {
    setRoles(roles.filter(role => role.title !== title))
    setSnackbar({ open: true, message: `Role "${title}" deleted!` })
  }

  const handleUpdateRole = (title) => {
    const newTitle = prompt('Enter the new name for the role:', title)
    if (!newTitle) return

    setRoles(roles.map(role => (role.title === title ? { ...role, title: newTitle } : role)))
    setSnackbar({ open: true, message: `Role "${title}" updated to "${newTitle}"!` })
  }

  const handleCopy = async (title) => {
    try {
      await navigator.clipboard.writeText(title)
      setSnackbar({ open: true, message: `Copied "${title}" to clipboard!` })
    } catch (err) {
      console.error('Copy failed', err)
    }
  }

  return (
    <>
      <Grid container spacing={6}>
        {roles.map((item, index) => (
          <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={index}>
            <Card>
              <CardContent className='flex flex-col gap-4'>
                <div className='flex items-center justify-between'>
                  <Typography className='flex-grow'>{`Total ${item.totalUsers} users`}</Typography>
                  <AvatarGroup total={item.totalUsers}>
                    {item.avatars.map((img, i) => (
                      <Avatar key={i} alt={item.title} src={`/images/avatars/${img}`} />
                    ))}
                  </AvatarGroup>
                </div>
                <div className='flex justify-between items-center'>
                  <div className='flex flex-col items-start gap-1'>
                    <Typography variant='h5'>{item.title}</Typography>
                    <div className='flex gap-2 mt-2'>
                      <Button
                        size='small'
                        variant='outlined'
                        color='primary'
                        onClick={() => handleUpdateRole(item.title)}
                      >
                        Edit
                      </Button>
                      <Button
                        size='small'
                        variant='outlined'
                        color='error'
                        onClick={() => handleDeleteRole(item.title)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                  <Tooltip title='Copy role name'>
                    <IconButton onClick={() => handleCopy(item.title)}>
                      <i className='tabler-copy text-secondary' />
                    </IconButton>
                  </Tooltip>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}

        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <Card>
            <CardContent className='flex flex-col gap-4 items-center text-center'>
              <Typography variant='h6'>Add New Role</Typography>
              <TextField
                label='Role Name'
                size='small'
                value={newRole.title}
                onChange={(e) => setNewRole({ ...newRole, title: e.target.value })}
                fullWidth
              />
              <TextField
                label='Total Users'
                size='small'
                type='number'
                value={newRole.totalUsers}
                onChange={(e) => setNewRole({ ...newRole, totalUsers: e.target.value })}
                fullWidth
              />
              <Button variant='contained' color='primary' onClick={handleAddRole}>
                Add Role
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </>
  )
}

export default RoleCards
