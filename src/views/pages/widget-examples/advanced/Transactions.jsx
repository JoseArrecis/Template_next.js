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
import jsPDF from 'jspdf'
import { Button } from '@mui/material'

// Vars
const initialData = [
  {
    title: 'Wallet',
    subtitle: 'Starbucks',
    amount: 75,
    amountDiff: 'negative',
    avatarColor: 'primary',
    avatarIcon: 'tabler-wallet'
  },
  {
    title: 'Bank Transfer',
    subtitle: 'Add Money',
    amount: 480,
    avatarColor: 'success',
    avatarIcon: 'tabler-browser-check'
  },
  {
    title: 'PayPal',
    subtitle: 'Client Payment',
    amount: 268,
    avatarColor: 'error',
    avatarIcon: 'tabler-brand-paypal'
  },
  {
    title: 'Master Card',
    subtitle: 'Ordered iPhone 13',
    amount: 699,
    amountDiff: 'negative',
    avatarColor: 'secondary',
    avatarIcon: 'tabler-credit-card'
  },
  {
    title: 'Bank Transaction',
    subtitle: 'Refund',
    amount: 98,
    avatarColor: 'info',
    avatarIcon: 'tabler-currency-dollar'
  },
  {
    title: 'PayPal',
    subtitle: 'Client Payment',
    amount: 126,
    avatarColor: 'error',
    avatarIcon: 'tabler-brand-paypal'
  },
  {
    title: 'Bank Transfer',
    subtitle: 'Pay Office Rent',
    amount: 1290,
    amountDiff: 'negative',
    avatarColor: 'success',
    avatarIcon: 'tabler-browser-check'
  }
]

const Transactions = () => {
  const [progressData, setProgressData] = useState(initialData)

  const handleRefresh = () => {
    const updated = progressData.map(item => ({
      ...item,
      amount: Math.floor(Math.random() * 1500) + 50
    }))
    setProgressData(updated)
  }

  const handleAddTransaction = () => {
    const randomAmount = Math.floor(Math.random() * 1000) + 50
    const newTransaction = {
      title: 'New Payment',
      subtitle: 'Amazon Q',
      amount: randomAmount,
      amountDiff: Math.random() > 0.5 ? 'negative' : 'positive',
      avatarColor: 'warning',
      avatarIcon: 'tabler-cash'
    }
    setProgressData(prev => [newTransaction, ...prev])
  }

  const handleDownloadPDF = () => {
    const doc = new jsPDF()
    doc.setFontSize(16)
    doc.text('Transactions Report', 20, 20)
    doc.setFontSize(12)

    let y = 40
    progressData.forEach((row, i) => {
      const sign = row.amountDiff === 'negative' ? '-' : '+'
      const color = row.amountDiff === 'negative' ? 'Gasto' : 'Ingreso'
      doc.text(
        `${i + 1}. ${row.title} - ${row.subtitle} | ${color}: ${sign}$${row.amount}`,
        20,
        y
      )
      y += 10
    })

    doc.save('Transactions.pdf')
  }

  return (
    <Card>
      <CardHeader
        title='Transactions'
        subheader='Total 58 transaction done in month'
        action={
          <OptionMenu 
            options={[
              { text: 'Refresh', menuItemProps: { onClick: handleRefresh } },
              { text: 'Make Payment', menuItemProps: { onClick: handleAddTransaction } }
            ]} 
          />
        }
      />
      <CardContent className='flex flex-col gap-[1.125rem]'>
        {progressData.map((item, index) => (
          <div key={index} className='flex items-center gap-4'>
            <CustomAvatar skin='light' variant='rounded' color={item.avatarColor} size={34}>
              <i className={classnames(item.avatarIcon, 'text-[22px]')} />
            </CustomAvatar>
            <div className='flex flex-wrap justify-between items-center gap-x-4 gap-y-1 is-full'>
              <div className='flex flex-col'>
                <Typography className='font-medium' color='text.primary'>
                  {item.title}
                </Typography>
                <Typography variant='body2'>{item.subtitle}</Typography>
              </div>
              <Typography
                variant='h6'
                color={`${item.amountDiff === 'negative' ? 'error' : 'success'}.main`}
              >{`${item.amountDiff === 'negative' ? '-' : '+'}${item.amount}`}</Typography>
            </div>
          </div>
        ))}
      </CardContent>

      {/* Boto para descargar PDF */}
      <div className='flex justify-end p-4'>
        <Button variant='contained' color='primary' onClick={handleDownloadPDF}>
          Descargar PDF
        </Button>
      </div>
    </Card>

  )
}

export default Transactions
