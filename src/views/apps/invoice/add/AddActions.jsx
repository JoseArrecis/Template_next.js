'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid2'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Switch from '@mui/material/Switch'

// Component Imports
import SendInvoiceDrawer from '@views/apps/invoice/shared/SendInvoiceDrawer'
import CustomTextField from '@core/components/mui/TextField'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

const AddActions = () => {
  const [sendDrawerOpen, setSendDrawerOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const { lang: locale } = useParams()
  const router = useRouter()

  const invoiceData = {
    id: Date.now(),
    dueDate: new Date().toISOString().split('T')[0],
    client: {
      name: 'Jhon Doe',
      email: '',
      company: 'ABC Corporation',
      address: '123 Main St, City, Country'
    },
    items: [
      { Item: 'Premium Branding Package', Description: 'Branding & Promotion', Hours: 48, Qty: 1, Total: 32 },
      { Item: 'Social Media', Description: 'Social media templates', Hours: 42, Qty: 1, Total: 28 },
      { Item: 'Web Design', Description: 'Web designing package', Hours: 46, Qty: 1, Total: 24 },
      { Item: 'SEO', Description: 'Search engine optimization', Hours: 40, Qty: 1, Total: 22 }
    ],
    subtotal: 106,
    taxRate: 10,
    taxAmount: 10.6,
    total: 116.6,
    notes: 'Thank you for your business!',
    terms: 'Payment is due within 15 days.',
    status: 'Draft'
  }

  const handleAdd = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/apps/invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(invoiceData)
      })

      if (!res.ok) throw new Error('Error adding invoice.')

      const newInvoice = await res.json()

      router.push(getLocalizedUrl(`/apps/invoice/edit/${newInvoice.id}`, locale))
    } catch (err) {
      console.error(err)
      alert('Error adding invoice.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <Card>
          <CardContent className='flex flex-col gap-4'>
            <Button
              fullWidth
              variant='contained'
              className='capitalize'
              startIcon={<i className='tabler-send' />}
              onClick={() => setSendDrawerOpen(true)}
            >
              Send Invoice
            </Button>

            <Button
              fullWidth
              component={Link}
              color='secondary'
              variant='tonal'
              className='capitalize'
              href={getLocalizedUrl('/apps/invoice/preview/5036', locale)}
            >
              Preview
            </Button>

            <Button
              fullWidth
              color='secondary'
              variant='tonal'
              className='capitalize'
              onClick={handleAdd}
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add'}
            </Button>
          </CardContent>
        </Card>

        <SendInvoiceDrawer open={sendDrawerOpen} handleClose={() => setSendDrawerOpen(false)} />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <CustomTextField select fullWidth defaultValue='Internet Banking' label='Accept payments via'>
          <MenuItem value='Internet Banking'>Internet Banking</MenuItem>
          <MenuItem value='Debit Card'>Debit Card</MenuItem>
          <MenuItem value='Credit Card'>Credit Card</MenuItem>
          <MenuItem value='Paypal'>Paypal</MenuItem>
          <MenuItem value='UPI Transfer'>UPI Transfer</MenuItem>
        </CustomTextField>

        <div className='flex items-center justify-between mbs-3'>
          <InputLabel htmlFor='invoice-edit-payment-terms' className='cursor-pointer'>
            Payment Terms
          </InputLabel>
          <Switch defaultChecked id='invoice-edit-payment-terms' />
        </div>

        <div className='flex items-center justify-between'>
          <InputLabel htmlFor='invoice-edit-client-notes' className='cursor-pointer'>
            Client Notes
          </InputLabel>
          <Switch id='invoice-edit-client-notes' />
        </div>

        <div className='flex items-center justify-between'>
          <InputLabel htmlFor='invoice-edit-payment-stub' className='cursor-pointer'>
            Payment Stub
          </InputLabel>
          <Switch id='invoice-edit-payment-stub' />
        </div>
      </Grid>
    </Grid>
  )
}

export default AddActions
