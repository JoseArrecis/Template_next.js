'use client'

import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'

// Component Imports
import BillingCard from '@components/dialogs/billing-card'
import OpenDialogOnElementClick from '@components/dialogs/OpenDialogOnElementClick'

const initialData = [
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
    imgAlt: 'Visa card',
    expiryDate: '02/24',
    name: 'Mildred Wagner',
    cardNumber: '4532 3616 2070 5678',
    imgSrc: '/images/logos/visa.png'
  },
  {
    cardCvv: '3845',
    expiryDate: '08/20',
    badgeColor: 'error',
    cardStatus: 'Expired',
    name: 'Lester Jennings',
    imgAlt: 'American Express card',
    cardNumber: '3700 000000 00002',
    imgSrc: '/images/logos/american-express.png'
  }
]

const PaymentMethod = () => {
  const [cards, setCards] = useState(initialData)
  const [creditCard, setCreditCard] = useState(null)

  // 🔹 Add or update card
  const handleUpdateCard = updatedCard => {
    setCards(prevCards => {
      if (creditCard !== null && creditCard >= 0) {
        const updated = [...prevCards]
        updated[creditCard] = updatedCard
        return updated
      } else {
        return [...prevCards, updatedCard]
      }
    })
    setCreditCard(null)
  }

  // 🔹 Add new card
  const handleAddCard = () => {
    setCreditCard(-1)
  }

  // 🔹 Open edit dialog
  const handleClickOpen = index => {
    setCreditCard(index)
  }

  const addButtonProps = {
    variant: 'contained',
    children: 'Add Card',
    size: 'small',
    color: 'primary',
    startIcon: <i className='tabler-plus' />,
    onClick: handleAddCard
  }

  const editButtonProps = index => ({
    variant: 'tonal',
    children: 'Edit',
    size: 'small',
    onClick: () => handleClickOpen(index)
  })

  return (
    <Card>
      <CardHeader
        title='Payment Methods'
        action={
          <OpenDialogOnElementClick
            element={Button}
            elementProps={addButtonProps}
            dialog={BillingCard}
            dialogProps={{
              onUpdate: handleUpdateCard
            }}
          />
        }
      />
      <CardContent className='flex flex-col gap-4'>
        {cards.map((item, index) => (
          <div
            key={index}
            className='flex justify-between border rounded sm:items-center p-6 flex-col !items-start sm:flex-row gap-2'
          >
            <div className='flex flex-col items-start gap-2'>
              <img src={item.imgSrc} alt={item.imgAlt} height={25} />
              <div className='flex items-center gap-2'>
                <Typography className='font-medium' color='text.primary'>
                  {item.name}
                </Typography>
                {item.cardStatus ? (
                  <Chip color={item.badgeColor} label={item.cardStatus} size='small' variant='tonal' />
                ) : null}
              </div>
              <Typography>
                {item.cardNumber &&
                  item.cardNumber.slice(0, -4).replace(/[0-9]/g, '*') + item.cardNumber.slice(-4)}
              </Typography>
            </div>
            <div className='flex flex-col gap-4'>
              <div className='flex items-center justify-end gap-4'>
                <OpenDialogOnElementClick
                  element={Button}
                  elementProps={editButtonProps(index)}
                  dialog={BillingCard}
                  dialogProps={{
                    data: cards[index],
                    onUpdate: handleUpdateCard
                  }}
                />
                <Button
                  variant='tonal'
                  color='error'
                  size='small'
                  onClick={() => setCards(cards.filter((_, i) => i !== index))}
                >
                  Delete
                </Button>
              </div>
              <Typography variant='body2'>Card expires at {item.expiryDate}</Typography>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default PaymentMethod
