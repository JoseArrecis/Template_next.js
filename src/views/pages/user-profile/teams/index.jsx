'use client'

// MUI Imports
import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import AvatarGroup from '@mui/material/AvatarGroup'
import Tooltip from '@mui/material/Tooltip'
import Chip from '@mui/material/Chip'

// Component Imports
import OptionMenu from '@core/components/option-menu'
import Link from '@components/Link'
import { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, TextField } from '@mui/material'

const Teams = ({ data: initialData }) => {
  const [data, setData] = useState(initialData)
  const [openRename, setOpenRename] = useState(false)
  const [renameValue, setRenameValue] = useState('')
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [snackbar, setSnackBar] = useState({ open: false, message: '' })
  
  const handleMenuClick = (option, team) => {
    switch (option) {
      case 'Rename Team':
        setSelectedTeam(team)
        setRenameValue(team.title)
        setOpenRename(true)
        break
      case 'View Details':
        window.alert(`Viewing details for: ${team.title}\nDescription: ${team.description}`)
        break
      case 'Add to Favorite':
        setData(prev =>
          prev.map(t => 
            t.title === team.title ? { ...t, favorite: !t.favorite } : t
          )
        )
        setSnackBar({
          open: true,
          message: `${team.title} ${team.favorite ? 'remove from' : 'added to'} favorites`
        })
        break
      case 'Delete Team':
        if(confirm(`Are you sure you want to delete ${team.title}?`)) {
          setData(prev => prev.filter(t => t.title !== team.title))
          setSnackBar({ open: true, message: `${team.title} deleted` })
        }
        break
    }
  }

  const handleRename = () => {
    setData(prev => 
      prev.map(t => 
        t.title === selectedTeam.title ? { ...t, title: renameValue } : t
      )
    )
    setOpenRename(false)
    setSnackBar({ open: true, message: 'Team renamed succesfully' })
  }

  return (
    <>
      <Grid container spacing={6}>
        {data &&
          data.map((item, index) => {
            return (
              <Grid size={{ xs: 12, md: 6, lg: 4 }} key={index}>
                <Card>
                  <CardContent className='flex flex-col gap-4'>
                    <div className='flex items-center justify-between gap-2'>
                      <div className='flex items-center gap-2'>
                        <Avatar src={item.avatar} className='bs-[38px] is-[38px]' />
                        <Typography variant='h5'>
                          {item.title}
                          {item.favorite && <i className='tabler-star text-warning ms-2' />}
                        </Typography>
                      </div>
                      <div className='flex items-center'>
                        <IconButton
                          onClick={() => handleMenuClick('Add to favorite', item)}
                        >
                          <i 
                            className={`tabler-star ${
                              item.favorite ? 'text-warning' : 'text-textDisabled'
                            }`} 
                          />
                        </IconButton>
                        <OptionMenu
                          iconButtonProps={{ size: 'medium' }}
                          iconClassName='text-textDisabled'
                          options={[
                            {
                              text: 'Rename Team',
                              menuItemProps: { onClick: () => handleMenuClick('Rename Team', item) }
                            },
                            {
                              text: 'View Details',
                              menuItemProps: { onClick: () => handleMenuClick('View Details', item) }
                            },
                            { 
                              text: 'Add to Favorite',
                              menuItemProps: { onClick: () => handleMenuClick('Add to Favorite', item) }
                            },
                            { divider: true },
                            {
                              text: 'Delete Team',
                              menuItemProps: { 
                                className: 'text-error hover:bg-[var(--mui-palette-error-lightOpacity)]',
                                onClick: () => handleMenuClick('Delete Team', item) 
                              }
                            }
                          ]}
                        />
                      </div>
                    </div>
                    <Typography>{item.description}</Typography>
                    <div className='flex items-center justify-between flex-wrap gap-4'>
                      <AvatarGroup
                        total={item.extraMembers ? item.extraMembers + 3 : 3}
                        sx={{ '& .MuiAvatar-root': { width: '2rem', height: '2rem', fontSize: '1rem' } }}
                        className='items-center pull-up'
                      >
                        {item.avatarGroup.map((person, index) => {
                          return (
                            <Tooltip key={index} title={person.name}>
                              <Avatar src={person.avatar} alt={person.name} />
                            </Tooltip>
                          )
                        })}
                      </AvatarGroup>
                      <div className='flex items-center gap-2'>
                        {item.chips.map((chip, index) => (
                          <Link key={index}>
                            <Chip variant='tonal' size='small' label={chip.title} color={chip.color} />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            )
          })}
      </Grid>

      <Dialog open={openRename} onClose={() => setOpenRename(false)}>
        <DialogTitle>Rename Team</DialogTitle>
        <DialogContent>
          <TextField 
            fullWidth
            margin='dense'
            label='New Team Name'
            value={renameValue}
            onChange={(e) => setRenameValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRename(false)}>Cancel</Button>
          <Button onClick={handleRename} variant='contained'>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackBar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </>
  )
}

export default Teams
