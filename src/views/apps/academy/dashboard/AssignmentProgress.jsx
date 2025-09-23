'use client'

import { useState } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import CustomIconButton from '@core/components/mui/IconButton'
import OptionMenu from '@core/components/option-menu'
import DirectionalIcon from '@components/DirectionalIcon'

const data = [
  { 
    title: 'User Experience Design', 
    tasks: 120, 
    progress: 72, 
    color: 'primary',
    details: 'This includes wireframes, prototypes, and user testing.'
  },
  { 
    title: 'Basic fundamentals', 
    tasks: 32, 
    progress: 48,
    color: 'success',
    details: 'Covers basic principles, theory, and examples.'
  },
  { 
    title: 'React Native components', 
    tasks: 182, 
    progress: 15, 
    color: 'error',
    details: 'Building blocks of React Native apps.'
  },
  { 
    title: 'Basic of music theory', 
    tasks: 56, 
    progress: 24, 
    color: 'info',
    details: 'Learning scales, chords, and rhythm patterns.'
  }
]

const AssignmentProgress = () => {
  const [expandedIndex, setExpandedIndex] = useState(null)

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <Card>
      <CardHeader 
        title='Assignment Progress' 
        action={<OptionMenu options={['Refresh', 'Update', 'Share']} />} 
      />
      <CardContent className='flex flex-col gap-4'>
        {data.map((item, i) => (
          <div key={i} className='flex flex-col gap-2 border-b pb-2'>
            <div className='flex items-center justify-between gap-4'>
              <div className='flex items-center gap-4'>
                <div className='relative flex items-center justify-center'>
                  <CircularProgress
                    variant='determinate'
                    size={54}
                    value={100}
                    thickness={3}
                    className='absolute text-[var(--mui-palette-customColors-trackBg)]'
                  />
                  <CircularProgress
                    variant='determinate'
                    size={54}
                    value={item.progress}
                    thickness={3}
                    color={item.color}
                    sx={{ '& .MuiCircularProgress-circle': { strokeLinecap: 'round' } }}
                  />
                  <Typography className='absolute font-medium' color='text.primary'>
                    {`${item.progress}%`}
                  </Typography>
                </div>
                <div>
                  <Typography className='font-medium mbe-1.5' color='text.primary'>
                    {item.title}
                  </Typography>
                  <Typography variant='body2'>{`${item.tasks} Tasks`}</Typography>
                </div>
              </div>
              <CustomIconButton 
                size='small' 
                variant='tonal' 
                color='secondary' 
                onClick={() => toggleExpand(i)}
              >
                <DirectionalIcon 
                  ltrIconClass={expandedIndex === i ? 'tabler-chevron-down' : 'tabler-chevron-right'} 
                  rtlIconClass={expandedIndex === i ? 'tabler-chevron-down' : 'tabler-chevron-left'} 
                />
              </CustomIconButton>
            </div>

            {expandedIndex === i && (
              <Typography variant='body2' color='text.secondary' className='pl-16'>
                {item.details}
              </Typography>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default AssignmentProgress
