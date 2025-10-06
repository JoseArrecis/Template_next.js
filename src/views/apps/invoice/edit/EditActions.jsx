'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid2'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Switch from '@mui/material/Switch'

// Component Imports
import AddPaymentDrawer from '@views/apps/invoice/shared/AddPaymentDrawer'
import SendInvoiceDrawer from '@views/apps/invoice/shared/SendInvoiceDrawer'
import CustomTextField from '@core/components/mui/TextField'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'
import { Stack } from '@mui/material'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

const EditActions = ({ id }) => {
  // States
  const [paymentDrawerOpen, setPaymentDrawerOpen] = useState(false)
  const [sendDrawerOpen, setSendDrawerOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const data = [
    { Item: 'Premium Branding Package', Description: 'Branding & Promotion', Hours: 48, Qty: 1, Total: '$32' },
    { Item: 'Social Media', Description: 'Social media templates', Hours: 42, Qty: 1, Total: '$28' },
    { Item: 'Web Design', Description: 'Web designing package', Hours: 46, Qty: 1, Total: '$24' },
    { Item: 'SEO', Description: 'Search engine optimization', Hours: 40, Qty: 1, Total: '$22' }
  ]

  // Hooks
  const { lang: locale } = useParams()

  const handleSave = async() => {
    setLoading(true)
    try {
      const doc = new jsPDF()
      doc.setFontSize(18)
      doc.text('Invoice Report', 14, 22)
      doc.setFontSize(12)
      doc.text(`Invoice ID: ${id}`, 14, 32)

      const tableColumn = ['Item', 'Description', 'Hours', 'Qty', 'Total']
      const tableRows = data.map(item => [
        item.Item,
        item.Description,
        item.Hours,
        item.Qty,
        item.Total
      ])

      autoTable(doc, {
        startY: 40,
        head: [tableColumn],
        body: tableRows
      })

      const pdfBlob = doc.output('blob')
      const arrayBuffer = await pdfBlob.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      const base64PDF = buffer.toString('base64')

      // 3️⃣ Enviar correo desde el mismo endpoint
      const res = await fetch('/api/send-invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: 'andre.arrecisvargas@gmail.com',
          subject: `Invoice #${id}`,
          text: 'Attached is your invoice PDF.',
          pdf: base64PDF
        })
      })

      if(!res.ok) throw new Error('Error sending email')

        doc.save(`invoice-${id}.pdf`)

      alert('Invoice saved and email sent successfully')
    } catch (err) {
      console.error(err)
      alert('Error saving invoice.')
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
            <div className='flex items-center gap-4'>
              <Button
                fullWidth
                component={Link}
                color='secondary'
                variant='tonal'
                className='capitalize'
                href={getLocalizedUrl(`/apps/invoice/preview/${id}`, locale)}
              >
                Preview
              </Button>
            <Stack spacing={4}>
              <Button
                variant='contained'
                color='primary'
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save'}
              </Button>
            </Stack>
            </div>
            <Button
              fullWidth
              color='success'
              variant='contained'
              className='capitalize'
              onClick={() => setPaymentDrawerOpen(true)}
              startIcon={<i className='tabler-currency-dollar' />}
            >
              Add Payment
            </Button>
          </CardContent>
        </Card>
        <AddPaymentDrawer open={paymentDrawerOpen} handleClose={() => setPaymentDrawerOpen(false)} />
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
        <div className='flex items-center justify-between gap-6 mbs-3'>
          <InputLabel htmlFor='invoice-edit-payment-terms' className='cursor-pointer'>
            Payment Terms
          </InputLabel>
          <Switch defaultChecked id='invoice-edit-payment-terms' />
        </div>
        <div className='flex items-center justify-between gap-6'>
          <InputLabel htmlFor='invoice-edit-client-notes' className='cursor-pointer'>
            Client Notes
          </InputLabel>
          <Switch id='invoice-edit-client-notes' />
        </div>
        <div className='flex items-center justify-between gap-6'>
          <InputLabel htmlFor='invoice-edit-payment-stub' className='cursor-pointer'>
            Payment Stub
          </InputLabel>
          <Switch id='invoice-edit-payment-stub' />
        </div>
      </Grid>
    </Grid>
  )
}

export default EditActions
