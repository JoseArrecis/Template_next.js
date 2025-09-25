'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'

// Third-party Imports
import classnames from 'classnames'

// Components Imports
import OptionMenu from '@core/components/option-menu'

// Style Imports
import tableStyles from '@core/styles/table.module.css'
import styles from './styles.module.css'
import { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'

const initialData = [
  {
    icon: 'tabler-car',
    heading: 'On the way',
    time: '2hr 10min',
    progressColor: 'action',
    progressColorVariant: 'hover',
    progressData: '39.7%',
    widthClass: 'is-[39.7%]'
  },
  {
    icon: 'tabler-circle-arrow-down',
    heading: 'Unloading',
    time: '3hr 15min',
    progressColor: 'primary',
    progressColorVariant: 'main',
    progressData: '28.3%',
    widthClass: 'is-[28.3%]'
  },
  {
    icon: 'tabler-circle-arrow-up',
    heading: 'Loading',
    time: '1hr 24min',
    progressColor: 'info',
    progressColorVariant: 'main',
    progressData: '17.4%',
    widthClass: 'is-[17.4%]'
  },
  {
    icon: 'tabler-clock',
    heading: 'Waiting',
    time: '5hr 19min',
    progressColor: 'SnackbarContent',
    progressColorVariant: 'bg',
    progressData: '14.6%',
    widthClass: 'is-[14.6%]'
  }
]

const LogisticsVehicleOverview = () => {
  const [progressData, setProgressData] = useState(initialData)

  // Estado para  Update
  const [openUpdate, setOpenUpdate] = useState(false)
  const [editData, setEditData] = useState(initialData)

  // Acciones de Menú
  const handleMenuAction = (action) => {
    if (action === 'Refresh') {
      setProgressData(prev =>
        prev.map(item => {
          const randomValue = Math.floor(Math.random() * 100)
          return {
            ...item,
            progressData: `${randomValue}%`,
            widthClass: `is-[${randomValue}%]`
          }
        })
      )
    } else if (action === 'Update') {
      setEditData(progressData)
      setOpenUpdate(true)
    } else if(action === 'Share') {
      if (navigator.share) {
        navigator.share({
          title: 'Total Vehicle Overview',
          text: 'Check total vehicles',
          url: window.location.href
        }).catch(err => console.log('Share canceled', err))
      } else {
        alert('Sharing is not supported in this browser')
      }
    } 
  }

  // Guardar cambios desde el modal
  const handleUpdateSave = () => {
    setProgressData(editData)
    setOpenUpdate(false)
  }

  // Cambiar valores en inputs del modal
  const handleEditChange = (index, field, value) => {
    const updated = [...editData]
    updated[index] = {
      ...updated[index],
      [field]: field === 'progressData' ? `${value}%` : value
    }
    setEditData(updated)
  }

  return (
    <>
      <Card>
        <CardHeader
          title='Vehicle Overview'
          subheader='Weekly Earnings Overview'
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
        <CardContent>
          <div className='flex flex-col gap-6'>
            <div className='flex is-full'>
              {progressData.map((item, index) => (
                <div
                  key={index}
                  className={classnames(item.widthClass, styles.linearRound, 'flex flex-col gap-[34px] relative')}
                >
                  <Typography className={classnames(styles.header, 'relative max-sm:hidden')}>{item.heading}</Typography>
                  <LinearProgress
                    variant='determinate'
                    value={-1}
                    className={classnames('bs-[46px]')}
                    // eslint-disable-next-line lines-around-comment
                    // @ts-ignore
                    sx={{
                      backgroundColor: `var(--mui-palette-${item.progressColor}-${item.progressColorVariant})`,
                      borderRadius: 0
                    }}
                  />
                  <Typography
                    variant='body2'
                    className='absolute bottom-3 start-2 font-medium'
                    sx={{
                      color: theme =>
                        index === 0
                          ? 'var(--mui-palette-text-primary)'
                          : item.progressColor === 'info'
                            ? 'var(--mui-palette-common-white)'
                            : theme.palette.getContrastText(theme.palette[item.progressColor][item.progressColorVariant])
                    }}
                  >
                    {item.progressData}
                  </Typography>
                </div>
              ))}
            </div>
            <div className='overflow-x-auto'>
              <table className={tableStyles.table}>
                <tbody>
                  {progressData.map((item, index) => (
                    <tr key={index}>
                      <td className='flex items-center gap-2 pis-0'>
                        <i className={classnames(item.icon, 'text-textPrimary text-[1.5rem]')} />
                        <Typography color='text.primary'>{item.heading}</Typography>
                      </td>
                      <td className='text-end'>
                        <Typography color='text.primary' className='font-medium'>
                          {item.time}
                        </Typography>
                      </td>
                      <td className='text-end pie-0'>
                        <Typography>{item.progressData}</Typography>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal Update */}
      <Dialog open={openUpdate} onClose={() => setOpenUpdate(false)} maxWidth='md' fullWidth>
        <DialogTitle>Update Vehicle Overview</DialogTitle>
        <DialogContent className='flex flex-col gap-4 mt-2'>
          {editData.map((item, index) => (
            <div key={index} className='flex flex-col gap-4 mt-2'>
              <TextField 
                label='Heading'
                fullWidth
                value={item.heading}
                onChange={(e) => handleEditChange(index, 'heading', e.target.value)}
              />
              <TextField 
                label='Time'
                fullWidth
                value={item.time}
                onChange={(e) => handleEditChange(index, 'time', e.target.value)}
              />
              <TextField 
                label='Progress Data'
                fullWidth
                value={parseFloat(item.progressData)}
                onChange={(e) => handleEditChange(index, 'progressData', e.target.value)}
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

export default LogisticsVehicleOverview
