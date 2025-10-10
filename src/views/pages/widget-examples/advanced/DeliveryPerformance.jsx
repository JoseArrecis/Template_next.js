'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

// Third-party Imports
import classnames from 'classnames'

// Components Imports
import OptionMenu from '@core/components/option-menu'
import CustomAvatar from '@core/components/mui/Avatar'
import { useState } from 'react'

const initialData = [
  { title: 'Packages in transit', value: '10k', change: 25.8, icon: 'tabler-box', color: 'primary' },
  { title: 'Packages out for delivery', value: '5k', change: 4.3, icon: 'tabler-truck', color: 'info' },
  { title: 'Packages delivered', value: '15k', change: -12.5, icon: 'tabler-circle-check', color: 'success' },
  { title: 'Delivery success rate', value: '95%', change: 35.6, icon: 'tabler-percentage', color: 'warning' },
  { title: 'Average delivery time', value: '2.5 Days', change: -2.15, icon: 'tabler-clock', color: 'secondary' },
  { title: 'Customer satisfaction', value: '4.5/5', change: 5.7, icon: 'tabler-users', color: 'error' }
]

const DeliveryPerformance = () => {
  const [progressData, setProgressData] = useState(initialData) 

  const handleMenuAction = (action) => {
    if (action === 'Refresh') {
      const newData = progressData.map(item => ({
        ...item,
        change: parseFloat((Math.random() * 100 - 50).toFixed(2)),
        value: item.value.includes('%')
          ? `${Math.floor(Math.random() * 100)}%`
          : item.value.includes('/')
          ? `${(Math.random() * 5).toFixed(1)}/5`
          : `${Math.floor(Math.random() * 20)}`
      }))
      setProgressData(newData)
    } else if (action === 'Select All') {
      const allSelected = progressData.map(item => ({
        ...item,
        value: '100%',
        change: 100
      }))
      setProgressData(allSelected)
    } else if (action === 'Share') {
      if (navigator.share) {
        navigator.share({
          title: 'Delivery Performance',
          text: 'Check the total delivery performance',
          url: window.location.href
        }).catch(err => console.log('Share canceled', err))
      } else {
        alert('Sharing is not supported in this browser.')
      }
    }
  }

  return (
    <Card>
      <CardHeader
        title='Delivery Performance'
        subheader='12% increase in this month'
        action={
          <OptionMenu 
            options={[
              { text: 'Select All', menuItemProps: { onClick: () => handleMenuAction('Select All') }}, 
              { text: 'Refresh', menuItemProps: { onClick: () => handleMenuAction('Refresh') } }, 
              { text: 'Share', menuItemProps: { onClick: () => handleMenuAction('Share') } }
            ]} 
          />
        }
      />
      <CardContent className='flex flex-col gap-[30px]'>
        {progressData.map((data, index) => (
          <div key={index} className='flex items-center gap-4'>
            <CustomAvatar skin='light' color={data.color} variant='rounded' size={38}>
              <i className={data.icon} />
            </CustomAvatar>
            <div className='flex justify-between items-center gap-4 is-full'>
              <div>
                <Typography color='text.primary' className='line-clamp-1'>
                  {data.title}
                </Typography>
                <div className='flex items-center gap-1'>
                  <i
                    className={classnames(
                      'text-xl',
                      data.change > 0 ? 'tabler-chevron-up text-success' : 'tabler-chevron-down text-error'
                    )}
                  />
                  <Typography variant='body2' color={data.change > 0 ? 'success.main' : 'error.main'}>
                    {data.change}%
                  </Typography>
                </div>
              </div>
              <Typography color='text.primary' className='font-medium'>
                {data.value}
              </Typography>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default DeliveryPerformance
