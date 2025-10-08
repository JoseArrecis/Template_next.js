'use client'

// MUI Imports
import { useState } from 'react'
import Grid from '@mui/material/Grid2'
import Avatar from '@mui/material/Avatar'
import Chip from '@mui/material/Chip'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

// Component Imports
import OptionMenu from '@core/components/option-menu'
import Link from '@components/Link'
import CustomIconButton from '@core/components/mui/IconButton'

const Connections = ({ data }) => {
  const [connections, setConnections] = useState(data)

  // Función para manejar las acciones del menú
  const handleOptionClick = (option, item) => {
    switch (option) {
      case 'Share Connection':
        alert(`Compartiendo conexión con ${item.name}`)
        break
      case 'Block Connection':
        alert(`${item.name} ha sido bloqueado.`)
        setConnections(prev =>
          prev.map(conn =>
            conn.name === item.name ? { ...conn, isBlocked: true } : conn
          )
        )
        break
      case 'Delete':
        if (confirm(`¿Seguro que deseas eliminar a ${item.name}?`)) {
          setConnections(prev => prev.filter(conn => conn.name !== item.name))
        }
        break
      default:
        break
    }
  }

  return (
    <Grid container spacing={6}>
      {connections &&
        connections.map((item, index) => {
          return (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Card className='relative'>
                <OptionMenu
                  iconClassName='text-textDisabled'
                  options={[
                    {
                      text: 'Share Connection',
                      menuItemProps: {
                        onClick: () => handleOptionClick('Share Connection', item)
                      }
                    },
                    {
                      text: 'Block Connection',
                      menuItemProps: {
                        onClick: () => handleOptionClick('Block Connection', item)
                      }
                    },
                    { divider: true },
                    {
                      text: 'Delete',
                      menuItemProps: {
                        className: 'text-error hover:bg-[var(--mui-palette-error-lightOpacity)]',
                        onClick: () => handleOptionClick('Delete', item)
                      }
                    }
                  ]}
                  iconButtonProps={{
                    className: 'absolute top-6 end-5 text-textDisabled'
                  }}
                />
                <CardContent className='flex items-center flex-col gap-6'>
                  <Avatar src={item.avatar} className='!mbs-5 bs-[100px] is-[100px]' />
                  <div className='flex flex-col items-center'>
                    <Typography variant='h5'>{item.name}</Typography>
                    <Typography>{item.designation}</Typography>
                  </div>

                  <div className='flex items-center gap-4'>
                    {item.chips.map((chip, index) => (
                      <Link key={index}>
                        <Chip
                          variant='tonal'
                          label={chip.title}
                          color={chip.color}
                          size='small'
                        />
                      </Link>
                    ))}
                  </div>

                  <div className='flex is-full items-center justify-around flex-wrap'>
                    <div className='flex items-center flex-col'>
                      <Typography variant='h5'>{item.projects}</Typography>
                      <Typography>Projects</Typography>
                    </div>
                    <div className='flex items-center flex-col'>
                      <Typography variant='h5'>{item.tasks}</Typography>
                      <Typography>Tasks</Typography>
                    </div>
                    <div className='flex items-center flex-col'>
                      <Typography variant='h5'>{item.connections}</Typography>
                      <Typography>Connections</Typography>
                    </div>
                  </div>

                  <div className='flex items-center gap-4'>
                    <Button
                      variant={item.isConnected ? 'contained' : 'tonal'}
                      startIcon={
                        <i
                          className={
                            item.isConnected
                              ? 'tabler-user-check'
                              : 'tabler-user-plus'
                          }
                        />
                      }
                    >
                      {item.isConnected ? 'Connected' : 'Connect'}
                    </Button>
                    <CustomIconButton variant='tonal' color='secondary'>
                      <i className='tabler-mail' />
                    </CustomIconButton>
                  </div>

                  {item.isBlocked && (
                    <Typography color='error' className='mt-2'>
                      Blocked
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          )
        })}
    </Grid>
  )
}

export default Connections
