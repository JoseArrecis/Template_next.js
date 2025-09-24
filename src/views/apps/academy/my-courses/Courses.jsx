'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// MUI Imports
import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Pagination from '@mui/material/Pagination'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'

// Mapeo manual de imágenes de cada curso
const courseImages = {
  1: '/images/courses/nextjs.png',
  2: '/images/courses/react.png',
  3: '/images/courses/html-css.png',
  4: '/images/courses/fullstack.png',
  5: '/images/courses/ai-ml.png',
  6: '/images/courses/marketing.png',
  7: '/images/courses/cybersecurity.png',
  8: '/images/courses/aws.png',
  9: '/images/courses/react-native.png',
  10: '/images/courses/ux-ui.png',
  11: '/images/courses/python.png',
  12: '/images/courses/excel.png',
  13: '/images/courses/agile.png',
  14: '/images/courses/blockchain.png',
  15: '/images/courses/ar-vr.png',
  16: '/images/courses/devops.png',
  17: '/images/courses/rpa.png',
  18: '/images/courses/iot.png',
  19: '/images/courses/virtualbox.png',
  20: '/images/courses/javascript.png',
  21: '/images/courses/ruby.png',
  22: '/images/courses/angular.png',
  23: '/images/courses/go.png',
  24: '/images/courses/mongodb.png'
}

const chipColor = {
  Web: { color: 'secondary' },
  Programming: { color: 'primary' },
  Marketing: { color: 'success' },
  AI: { color: 'error' },
  Design: { color: 'info' },
  DevOps: { color: 'warning' }
}

export default function Courses({ courseData = [], searchValue = '' }) {
  const [course, setCourse] = useState('All')
  const [hideCompleted, setHideCompleted] = useState(true)
  const [data, setData] = useState([])
  const [activePage, setActivePage] = useState(0)

  useEffect(() => {
    // Normaliza los cursos
    const normalized = (courseData || []).map(c => ({
      ...c,
      image: courseImages[c.id] || '/images/courses/nextjs.png'
    }))

    // Filtrado por categoría y completado
    let newData = normalized.filter(courseItem => {
      if (course === 'All') return !hideCompleted || courseItem.completedTasks !== courseItem.totalTasks
      return courseItem.tags === course && (!hideCompleted || courseItem.completedTasks !== courseItem.totalTasks)
    })

    // Filtrado por búsqueda
    if (searchValue) {
      newData = newData.filter(item =>
        (item.courseTitle || '').toLowerCase().includes(searchValue.toLowerCase())
      )
    }

    // Asegura que el curso 5 esté incluido, sin duplicarlo
    const course5 = normalized.find(c => c.id === 5)
    if (course5 && !newData.find(c => c.id === 5)) {
      newData.push(course5)
    }

    // Ordenar por ID
    newData.sort((a, b) => a.id - b.id)

    if (activePage > Math.ceil(newData.length / 6)) setActivePage(0)
    setData(newData)
  }, [courseData, course, hideCompleted, searchValue, activePage])

  const handleChange = e => {
    setHideCompleted(e.target.checked)
    setActivePage(0)
  }

  return (
    <Card>
      <CardContent className='flex flex-col gap-6'>
        <div className='flex flex-wrap items-center justify-between gap-4'>
          <div>
            <Typography variant='h5'>My Courses</Typography>
            <Typography>Total {courseData?.length ?? 0} courses you have purchased</Typography>
          </div>
          <div className='flex flex-wrap items-center gap-y-4 gap-x-6'>
            <FormControl fullWidth size='small' className='is-[250px] flex-auto'>
              <Select
                fullWidth
                value={course}
                onChange={e => {
                  setCourse(e.target.value)
                  setActivePage(0)
                }}
              >
                <MenuItem value='All'>All Courses</MenuItem>
                <MenuItem value='Web'>Web</MenuItem>
                <MenuItem value='Programming'>Programming</MenuItem>
                <MenuItem value='Marketing'>Marketing</MenuItem>
                <MenuItem value='AI'>AI</MenuItem>
                <MenuItem value='Design'>Design</MenuItem>
                <MenuItem value='DevOps'>DevOps</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel
              control={<Switch onChange={handleChange} checked={hideCompleted} />}
              label='Hide completed'
            />
          </div>
        </div>

        {data.length > 0 ? (
          <Grid container spacing={6}>
            {data.slice(activePage * 6, activePage * 6 + 6).map(item => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
                <Card className='overflow-hidden'>
                  <div className='relative h-[250px] w-full'>
                    <Link href={`/apps/academy/course-details/${item.id}`}>
                      <Image
                        src={item.image}
                        alt={item.courseTitle || `Course ${item.id}`}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </Link>
                  </div>
                  <CardContent className='flex flex-col gap-2'>
                    <div className='flex items-center justify-between'>
                      <Chip
                        label={item.tags}
                        variant='tonal'
                        size='small'
                        color={chipColor[item.tags]?.color || 'primary'}
                      />
                      {item.rating && (
                        <div className='flex items-center gap-1'>
                          <Typography className='font-medium'>{item.rating}</Typography>
                          <i className='tabler-star-filled text-warning' />
                          <Typography>{`(${item.ratingCount})`}</Typography>
                        </div>
                      )}
                    </div>
                    <Typography variant='h6' className='hover:text-primary'>
                      {item.courseTitle}
                    </Typography>
                    <Typography>{item.desc || item.about}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography className='text-center'>No courses found</Typography>
        )}

        <div className='flex justify-center mt-4'>
          <Pagination
            count={Math.ceil(data.length / 6) || 1}
            page={activePage + 1}
            showFirstButton
            showLastButton
            shape='rounded'
            variant='tonal'
            color='primary'
            onChange={(e, page) => setActivePage(page - 1)}
          />
        </div>
      </CardContent>
    </Card>
  )
}
