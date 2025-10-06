'use client'

import { startTransition, useState, useTransition } from 'react'

// MUI Imports
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

// Vars
const initialData = {
  from: 'cabalolalala@gmail.com',
  to: 'andre.arrecisvargas@gmail.com',
  subject: 'Invoice of purchased Admin Templates',
  message: `Hello Andre,

  Please find attached the invoice for your recent purchase of our admin templates. 

  If you have any questions or need further assistance, feel free to reach out.

  Thank you for your business!

  Best regards,
  Jose Arrecis`
}

const invoiceData = [
  { Item: 'Premium Branding Package', Description: 'Branding & Promotion', Hours: 48, Qty: 1, Total: 32 },
  { Item: 'Social Media', Description: 'Social media templates', Hours: 42, Qty: 1, Total: 28 },
  { Item: 'Web Design', Description: 'Web designing package', Hours: 46, Qty: 1, Total: 24 },
  { Item: 'SEO', Description: 'Search engine optimization', Hours: 40, Qty: 1, Total: 22 }
]

const SendInvoiceDrawer = ({ open, handleClose }) => {
  const [formData, setFormData] = useState(initialData)
  const [isPending, setIsPending] = useTransition()

  const handleSubmit = async e => {
    e.preventDefault()
    startTransition(async () => {
      try {
        const res = await fetch('/api/apps/send-invoice', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            invoiceId: Date.now(),
            invoiceData
          })
        })

        const result = await res.json()
        if (result.success) {
          alert('Invoice sent successfully!')
        } else {
          alert('Failed: ' + result.message)
        }
      } catch (err) {
        console.error(err)
        alert('Error sending email.')
      } finally {
        handleClose()
        setFormData(initialData)
      }
    })
  }

  return (
    <Drawer open={open} anchor='right' variant='temporary' onClose={handleClose}>
      <div className='flex items-center justify-between plb-5 pli-6'>
        <Typography variant='h5'>Send Invoice</Typography>
        <IconButton size='small' onClick={handleClose}>
          <i className='tabler-x text-2xl text-textPrimary' />
        </IconButton>
      </div>
      <Divider />
      <div className='p-6'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
          <CustomTextField fullWidth label='From' value={formData.from} onChange={e => setFormData({ ...formData, from: e.target.value })} />
          <CustomTextField fullWidth label='To' value={formData.to} onChange={e => setFormData({ ...formData, to: e.target.value })} />
          <CustomTextField fullWidth label='Subject' value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} />
          <CustomTextField fullWidth label='Message' multiline rows={8} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} />
          <Chip size='small' color='primary' variant='tonal' className='rounded' label='Invoice Attached' icon={<i className='tabler-link' />} />
          <div className='flex items-center gap-4'>
            <Button variant='contained' color='primary' type='submit' disabled={isPending}>
              {isPending ? 'Sending...' : 'Send'}
            </Button>
            <Button variant='tonal' color='error' onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Drawer>
  )
}

export default SendInvoiceDrawer
