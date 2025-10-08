'use client'

// MUI Imports
import Grid from '@mui/material/Grid2'
import Chip from '@mui/material/Chip'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import LinearProgress from '@mui/material/LinearProgress'
import AvatarGroup from '@mui/material/AvatarGroup'
import Tooltip from '@mui/material/Tooltip'

// Component Imports
import OptionMenu from '@core/components/option-menu'
import CustomAvatar from '@core/components/mui/Avatar'
import Link from '@components/Link'
import { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, TextField } from '@mui/material'

const Projects = ({ data: initialData }) => {
  const [data, setData] = useState(initialData)
  const [openRename, setOpenRename] = useState(false)
  const [renameValue, setRenameValue] = useState('')
  const [selectedProject, setSelectedProject] = useState(null)
  const [snackbar, setSnackBar] = useState({ open: false, message: '' })

  const handleMenuClick = (option, project) => {
    switch (option) {
      case 'Rename Project':
        setSelectedProject(project)
        setRenameValue(project.title)
        setOpenRename(true)
        break
      case 'View Details':
        window.alert(`Viewing details for: ${project.title}\nClient: ${project.client}\nDescription: ${project.description}`)
        break
      case 'Add to favorite':
        setData(prev =>
          prev.map(t =>
            t.title === project.title ? { ...t, favorite: !t.favorite } : t
          )
        )
        setSnackBar({
          open: true,
          message: `${project.title} ${project.favorite ? 'remove from' : 'added to favorites'}`
        })
        break
      case 'Leave Project':
        if (confirm(`Are you sure you want to leave ${project.title}?`)) {
          setData(prev => prev.filter(t => t.title !== project.title))
          setSnackBar({ open: true, message: `You have left ${project.title}` })
        }
        break
    }
  }

  const handleRename = () => {
    setData(prev =>
      prev.map(t => 
        t.title === selectedProject.title ? { ...t, title: renameValue } : t
      )
    )
    setOpenRename(false)
    setSnackBar({ open: true, mesage: 'Project renamed succesfully' })
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
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-4'>
                        <CustomAvatar src={item.avatar} size={38} />
                        <div>
                          <Typography variant='h5' component={Link} className='hover:text-primary'>
                            {item.title}
                            {item.favorite && <i className='tabler-star text-warning ms-2' />}
                          </Typography>
                          <Typography>
                            <span className='font-medium'>Client: </span>
                            {item.client}
                          </Typography>
                        </div>
                      </div>
                      <OptionMenu
                        iconClassName='text-textDisabled'
                        options={[
                          { 
                            text: 'Rename Project', 
                            menuItemProps: { onClick: () => handleMenuClick('Rename Project', item) }
                          },
                          { 
                            text: 'View Details',
                            menuItemProps: { onClick: () => handleMenuClick('View Details', item) } 
                          },
                          { 
                            text: 'Add to Favorite',
                            menuItemProps: { onClick: () => handleMenuClick('Add to favorite', item) }
                          },
                          { divider: true },
                          {
                            text: 'Leave Project',
                            menuItemProps: { 
                              className: 'text-error hover:bg-[var(--mui-palette-error-lightOpacity)]',
                              onClick: () => handleMenuClick('Leave Project', item) 
                            }
                          }
                        ]}
                      />
                    </div>
                    <div className='flex items-center justify-between flex-wrap gap-4'>
                      <div className='rounded bg-actionHover plb-2 pli-3'>
                        <div className='flex'>
                          <Typography className='font-medium' color='text.primary'>
                            {item.budgetSpent}
                          </Typography>
                          <Typography>{`/${item.budget}`}</Typography>
                        </div>
                        <Typography>Total Budget</Typography>
                      </div>
                      <div className='flex flex-col'>
                        <div className='flex'>
                          <Typography className='font-medium' color='text.primary'>
                            Start Date:
                          </Typography>
                          <Typography>{item.startDate}</Typography>
                        </div>
                        <div className='flex'>
                          <Typography className='font-medium' color='text.primary'>
                            Deadline:
                          </Typography>
                          <Typography>{item.deadline}</Typography>
                        </div>
                      </div>
                    </div>
                    <Typography>{item.description}</Typography>
                  </CardContent>
                  <Divider />
                  <CardContent className='flex flex-col gap-4'>
                    <div className='flex items-center justify-between '>
                      <div className='flex'>
                        <Typography className='font-medium' color='text.primary'>
                          All Hours:
                        </Typography>
                        <Typography>{item.hours}</Typography>
                      </div>
                      <Chip variant='tonal' size='small' color={item.chipColor} label={`${item.daysLeft} days left`} />
                    </div>
                    <div>
                      <div className='flex items-center justify-between mbe-2'>
                        <Typography
                          variant='caption'
                          className='text-textSecondary'
                        >{`Tasks: ${item.completedTask}/${item.totalTask}`}</Typography>
                        <Typography
                          variant='caption'
                          className='text-textSecondary'
                        >{`${Math.round((item.completedTask / item.totalTask) * 100)}% Completed`}</Typography>
                      </div>
                      <LinearProgress
                        color='primary'
                        variant='determinate'
                        value={Math.round((item.completedTask / item.totalTask) * 100)}
                        className='bs-2'
                      />
                    </div>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center flex-grow gap-3'>
                        <AvatarGroup className='items-center pull-up'>
                          {item.avatarGroup.map((person, index) => {
                            return (
                              <Tooltip key={index} title={person.name}>
                                <CustomAvatar src={person.avatar} alt={person.name} size={32} />
                              </Tooltip>
                            )
                          })}
                        </AvatarGroup>
                        <Typography variant='body2' className='flex-grow'>
                          {item.members}
                        </Typography>
                      </div>
                      <div className='flex items-center gap-1'>
                        <i className='tabler-message-dots' />
                        <Typography>{item.comments}</Typography>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            )
          })}
      </Grid>

      <Dialog open={openRename} onClose={() => setOpenRename(false)}>
          <DialogTitle>Rename Project</DialogTitle>
          <DialogContent>
            <TextField 
              fullWidth
              margin='dense'
              label='Project Name'
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

export default Projects
