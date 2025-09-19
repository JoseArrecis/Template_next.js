'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

// MUI Imports
import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import LinearProgress from '@mui/material/LinearProgress'
import MenuItem from '@mui/material/MenuItem'
import Pagination from '@mui/material/Pagination'
import Select from '@mui/material/Select'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'
import { useParams } from 'next/navigation'
import Image from 'next/image'

const chipColor = {
  Web: { color: 'primary' },
  Art: { color: 'success' },
  'UI/UX': { color: 'error' },
  Psychology: { color: 'warning' },
  Design: { color: 'info' }
}

const Courses = ({ courseData, searchValue }) => {
  const [course, setCourse] = useState('All')
  const [hideCompleted, setHideCompleted] = useState(true)
  const [data, setData] = useState([])
  const [activePage, setActivePage] = useState(0)

  const { lang: locale } = useParams()

  useEffect(() => {
    let newData =
      courseData?.filter(courseItem => {
        if (course === 'All') return !hideCompleted || courseItem.completedTasks !== courseItem.totalTasks
        return courseItem.tags === course && (!hideCompleted || courseItem.completedTasks !== courseItem.totalTasks)
      }) ?? []

    if (searchValue) {
      newData = newData.filter(item =>
        item.courseTitle.toLowerCase().includes(searchValue.toLowerCase())
      )
    }

    if (activePage > Math.ceil(newData.length / 6)) setActivePage(0)
    setData(newData)
  }, [searchValue, activePage, course, hideCompleted, courseData])

  const handleChange = e => {
    setHideCompleted(e.target.checked)
    setActivePage(0)
  }

  return (
    <Card>
      <CardContent className='flex flex-col gap-6'>
        {/* Header */}
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
                <MenuItem value='Art'>Art</MenuItem>
                <MenuItem value='UI/UX'>UI/UX</MenuItem>
                <MenuItem value='Psychology'>Psychology</MenuItem>
                <MenuItem value='Design'>Design</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel
              control={<Switch onChange={handleChange} checked={hideCompleted} />}
              label='Hide completed'
            />
          </div>
        </div>

        {/* Courses Grid */}
        {data.length > 0 ? (
          <Grid container spacing={6}>
            {data.slice(activePage * 6, activePage * 6 + 6).map((item, index) => {
              const courseNumber = activePage * 6 + index + 1
              return (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={courseNumber}>
                  <div className='border rounded bs-full'>
                    <div className='pli-2 pbs-2'>
                      <Link href={`/apps/academy/course-details/${item.id}`} legacyBehavior>
                        <a>
                          <Image
                            src={item.image} 
                            alt={item.courseTitle}
                            width={400}
                            height={250}
                            className="rounded"
                          />
                        </a>
                      </Link>
                    </div>
                    <div className='flex flex-col gap-4 p-5'>
                      <div className='flex items-center justify-between'>
                        <Chip label={item.tags} variant='tonal' size='small' color={chipColor[item.tags]?.color || 'primary'} />
                        <div className='flex items-start'>
                          <Typography className='font-medium mie-1'>{item.rating}</Typography>
                          <i className='tabler-star-filled text-warning mie-2' />
                          <Typography>{`(${item.ratingCount})`}</Typography>
                        </div>
                      </div>
                      <div className='flex flex-col gap-1'>
                        <Typography
                          variant='h5'
                          component={Link}
                          href={getLocalizedUrl(`/apps/academy/course-details/${courseNumber}`, locale)}
                          className='hover:text-primary'
                        >
                          {item.courseTitle}
                        </Typography>
                        <Typography>{item.desc}</Typography>
                      </div>
                    </div>
                  </div>
                </Grid>
              )
            })}
          </Grid>
        ) : (
          <Typography className='text-center'>No courses found</Typography>
        )}

        <div className='flex justify-center'>
          <Pagination
            count={Math.ceil(data.length / 6)}
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

export default Courses
