'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid2'
import Radio from '@mui/material/Radio'
import Switch from '@mui/material/Switch'
import Button from '@mui/material/Button'
import RadioGroup from '@mui/material/RadioGroup'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormControlLabel from '@mui/material/FormControlLabel'

// Custom Components
import CustomTextField from '@core/components/mui/TextField'

// Datos iniciales
const initialCards = [
  {
    cardCvv: '587',
    name: 'Tom McBride',
    expiryDate: '12/24',
    imgAlt: 'Mastercard',
    badgeColor: 'primary',
    cardStatus: 'Primary',
    cardNumber: '5577 0000 5577 9865',
    imgSrc: '/images/logos/mastercard.png'
  },
  {
    cardCvv: '681',
    name: 'Mildred Wagner',
    expiryDate: '02/24',
    imgAlt: 'Visa card',
    cardNumber: '4532 3616 2070 5678',
    imgSrc: '/images/logos/visa.png'
  }
]

const PaymentMethod = () => {
  const [paymentMethod, setPaymentMethod] = useState('credit')
  const [cards, setCards] = useState(initialCards)

  const [formData, setFormData] = useState({
    cardNumber: '',
    name: '',
    expiryDate: '',
    cardCvv: ''
  })

  const [editingIndex, setEditingIndex] = useState(null) 

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    if (!formData.cardNumber || !formData.name || !formData.expiryDate || !formData.cardCvv) {
      alert('Please fill all fields before saving.')
      return
    }

    const newCard = {
      ...formData,
      imgSrc: '/images/logos/visa.png',
      imgAlt: 'Visa Card',
      cardStatus: editingIndex !== null ? 'Updated' : 'New',
      badgeColor: editingIndex !== null ? 'success' : 'secondary'
    }

    setCards(prev => {
      if (editingIndex !== null) {
        const copy = [...prev]
        copy[editingIndex] = newCard
        return copy
      }
      return [...prev, newCard]
    })

    setFormData({ cardNumber: '', name: '', expiryDate: '', cardCvv: '' })
    setEditingIndex(null)
  }

  const handleEdit = index => {
    const card = cards[index]
    setFormData({
      cardNumber: card.cardNumber,
      name: card.name,
      expiryDate: card.expiryDate,
      cardCvv: card.cardCvv
    })
    setEditingIndex(index)
  }

  const handleCancel = () => {
    setFormData({ cardNumber: '', name: '', expiryDate: '', cardCvv: '' })
    setEditingIndex(null)
  }

  const handleDelete = index => {
    setCards(prev => prev.filter((_, i) => i !== index))
    if (editingIndex === index) handleCancel()
  }

  return (
    <Card>
      <CardHeader title='Payment Method' />
      <CardContent>
        <Grid container spacing={6}>
          {/* Formulario */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Grid container spacing={6}>
              <Grid size={{ xs: 12 }}>
                <RadioGroup
                  row
                  name='payment-method-radio'
                  value={paymentMethod}
                  onChange={e => setPaymentMethod(e.target.value)}
                  className='flex gap-4'
                >
                  <FormControlLabel value='credit' control={<Radio />} label='Credit/Debit/ATM Card' />
                  <FormControlLabel value='cash' control={<Radio />} label='COD/Cheque' />
                </RadioGroup>
              </Grid>

              {paymentMethod === 'credit' ? (
                <>
                  <Grid size={{ xs: 12 }}>
                    <CustomTextField
                      fullWidth
                      name='cardNumber'
                      label='Card Number'
                      placeholder='0000 0000 0000 0000'
                      value={formData.cardNumber}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <CustomTextField
                      fullWidth
                      name='name'
                      label='Name'
                      placeholder='John Doe'
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid size={{ xs: 6, md: 3 }}>
                    <CustomTextField
                      fullWidth
                      name='expiryDate'
                      label='Expiry Date'
                      placeholder='MM/YY'
                      value={formData.expiryDate}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid size={{ xs: 6, md: 3 }}>
                    <CustomTextField
                      fullWidth
                      name='cardCvv'
                      label='CVV Code'
                      placeholder='654'
                      value={formData.cardCvv}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <FormControlLabel control={<Switch defaultChecked />} label='Save Card for future billing?' />
                  </Grid>
                </>
              ) : (
                <Grid size={{ xs: 12 }}>
                  <Typography>
                    Cash on delivery is a mode of payment where you make the payment after the goods/services are
                    received.
                  </Typography>
                  <Typography>
                    You can pay cash or make the payment via debit/credit card directly to the delivery person.
                  </Typography>
                </Grid>
              )}

              <Grid size={{ xs: 12 }} className='flex gap-4 flex-wrap'>
                <Button variant='contained' onClick={handleSave}>
                  {editingIndex !== null ? 'Update Card' : 'Save Changes'}
                </Button>
                <Button variant='tonal' color='secondary' onClick={handleCancel}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Grid>

          {/* Tarjetas guardadas */}
          <Grid size={{ xs: 12, md: 6 }} className='flex flex-col gap-6'>
            <div className='flex items-center justify-between'>
              <Typography color='text.primary' className='font-medium'>
                My Cards
              </Typography>
            </div>

            {cards.map((item, index) => (
              <div
                key={index}
                className='flex flex-col rounded bg-actionHover sm:flex-row items-start sm:justify-between max-sm:gap-4 p-6'
              >
                <div className='flex flex-col items-start gap-2'>
                  {item.imgSrc && <img src={item.imgSrc} alt={item.imgAlt} style={{ height: 28 }} />}
                  <div className='flex items-center gap-4'>
                    <Typography className='text-textPrimary font-medium'>{item.name}</Typography>
                    {item.cardStatus && (
                      <Chip color={item.badgeColor || 'primary'} variant='tonal' label={item.cardStatus} size='small' />
                    )}
                  </div>
                  <Typography>
                    {item.cardNumber &&
                      item.cardNumber.slice(0, -4).replace(/[0-9]/g, '*') + item.cardNumber.slice(-4)}
                  </Typography>
                </div>

                <div className='flex flex-col sm:items-end gap-4'>
                  <div className='flex gap-4'>
                    <Button variant='tonal' size='small' onClick={() => handleEdit(index)}>
                      Edit
                    </Button>
                    <Button variant='tonal' color='error' size='small' onClick={() => handleDelete(index)}>
                      Delete
                    </Button>
                  </div>
                  <Typography variant='body2'>Card expires at {item.expiryDate}</Typography>
                </div>
              </div>
            ))}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default PaymentMethod
