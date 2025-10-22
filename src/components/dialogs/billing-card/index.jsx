'use client'

import { useState, useEffect } from 'react'

// MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid2'

// Custom Components
import CustomTextField from '@core/components/mui/TextField'

const BillingCard = ({ open, setOpen, data, onUpdate }) => {
  const [cardData, setCardData] = useState({
    name: '',
    cardNumber: '',
    expiryDate: '',
    cardCvv: '',
    imgSrc: '/images/logos/visa.png',
    imgAlt: 'New Card',
    cardStatus: '',
    badgeColor: ''
  })

  useEffect(() => {
    if (data) setCardData(data)
  }, [data])

  const handleChange = e => {
    const { name, value } = e.target
    setCardData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    if (typeof onUpdate === 'function') {
      onUpdate(cardData)
      setOpen(false)
    } else {
      console.error('onUpdate is not a function')
    }
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth='sm' fullWidth>
      <DialogTitle>{data ? 'Edit Card' : 'Add New Card'}</DialogTitle>
      <DialogContent>
        <Grid container spacing={4} className='mt-2'>
          <Grid size={{ xs: 12 }}>
            <CustomTextField
              fullWidth
              label='Name on Card'
              name='name'
              value={cardData.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <CustomTextField
              fullWidth
              label='Card Number'
              name='cardNumber'
              placeholder='0000 0000 0000 0000'
              value={cardData.cardNumber}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <CustomTextField
              fullWidth
              label='Expiry Date'
              name='expiryDate'
              placeholder='MM/YY'
              value={cardData.expiryDate}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <CustomTextField
              fullWidth
              label='CVV'
              name='cardCvv'
              placeholder='123'
              value={cardData.cardCvv}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant='tonal' color='secondary' onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button variant='contained' onClick={handleSubmit}>
          {data ? 'Save Changes' : 'Add Card'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default BillingCard
