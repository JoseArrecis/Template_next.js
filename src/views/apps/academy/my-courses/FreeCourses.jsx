// MUI Imports
import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

// Third-party Imports
import ReactPlayer from '@/libs/ReactPlayer'

// Components Imports
import CustomAvatar from '@core/components/mui/Avatar'
import CustomIconButton from '@core/components/mui/IconButton'

const FreeCourses = () => {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12, md: 4 }}>
            <div className='flex flex-col items-center justify-center gap-y-4 bs-full text-center'>
              <CustomAvatar variant='rounded' skin='light' color='primary' size={52}>
                <i className='tabler-gift text-4xl' />
              </CustomAvatar>
              <Typography variant='h4'>Today&apos;s Free Courses</Typography>
              <Typography>
                We offers 284 Free Online courses from top tutors and companies to help you start or advance your career
                skills. Learn online for free and fast today!
              </Typography>
              <Button variant='contained'>Get Premium Courses</Button>
            </div>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <div className='border rounded bs-full'>
              <div className='mli-2 mbs-2 overflow-hidden rounded'>
                <ReactPlayer
                  playing
                  controls
                  url='https://www.youtube.com/watch?v=MJkdaVFHrto'
                  height={200}
                  className='bg-black !is-full'
                  light={
                    <img src='/images/apps/academy/7.png' alt='Thumbnail' className='is-full bs-full object-cover' />
                  }
                  playIcon={
                    <CustomIconButton variant='contained' color='error' className='absolute rounded-full'>
                      <i className='tabler-player-play' />
                    </CustomIconButton>
                  }
                />
              </div>
              <div className='flex flex-col gap-2 p-6'>
                <Typography variant='h5'>HTML</Typography>
                <Typography>
                  HTML es el lenguage de marcado que estructura el contenido de una página web.
                </Typography>
              </div>
            </div>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <div className='border rounded bs-full'>
              <div className='mli-2 mbs-2 overflow-hidden rounded'>
                <ReactPlayer
                  playing
                  controls
                  url='https://www.youtube.com/watch?v=wZniZEbPAzk'
                  height={200}
                  className='bg-black !is-full'
                  light={
                    <img src='/images/apps/academy/8.png' alt='Thumbnail' className='is-full bs-full object-cover' />
                  }
                  playIcon={
                    <CustomIconButton variant='contained' color='error' className='absolute rounded-full'>
                      <i className='tabler-player-play' />
                    </CustomIconButton>
                  }
                />
              </div>
              <div className='flex flex-col gap-2 p-6'>
                <Typography variant='h5'>CSS</Typography>
                <Typography>
                  CSS sirve para dar estilo a HTML (colores, tamaño, etc.).
                </Typography>
              </div>
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default FreeCourses
