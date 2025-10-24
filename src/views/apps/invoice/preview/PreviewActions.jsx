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

// Component Imports
import AddPaymentDrawer from '@views/apps/invoice/shared/AddPaymentDrawer'
import SendInvoiceDrawer from '@views/apps/invoice/shared/SendInvoiceDrawer'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

const PreviewActions = ({ id, onButtonClick, invoiceData }) => {
  // States
  const [paymentDrawerOpen, setPaymentDrawerOpen] = useState(false)
  const [sendDrawerOpen, setSendDrawerOpen] = useState(false)

  // Hooks
  const { lang: locale } = useParams()

  const handleDownloadPDF = () => {
    if (!invoiceData || !invoiceData.items || !Array.isArray(invoiceData.items)) {
      alert('Invoice data is not loaded yet.')
      return
    }

    const doc = new jsPDF()

    doc.setFontSize(20)
    doc.text('Invoice', 14, 20)
    doc.setFontSize(12)
    doc.text(`Invoice ID: ${id}`, 14, 30)
    doc.text(`Customer: ${invoiceData.client?.name || 'Unknown Client'}`, 14, 38)
    doc.text(`Email: ${invoiceData.client?.email || 'No email provided'}`, 14, 46)

    const tableColumn = ['Item', 'Description', 'Hours', 'Qty', 'Total']
    const tableRows = []
    let subtotal = 0

    invoiceData.items.forEach(item => {
      const row = [
        item.item || '—',
        item.description || '—',
        String(item.hours || 0),
        String(item.qty || 0),
        `$${(item.total || 0).toFixed(2)}`
      ]
      tableRows.push(row)
      subtotal += (item.total || 0) * (item.qty || 0)
    })

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 55
    })

    const tax = parseFloat((subtotal * 0.05).toFixed(2))
    const shipping = 15
    const total = subtotal + tax + shipping

    let y = doc.lastAutoTable.finalY + 10
    doc.text(`Subtotal: $${subtotal.toFixed(2)}`, 140, y)
    doc.text(`Tax (5%): $${tax.toFixed(2)}`, 140, y + 8)
    doc.text(`Shipping: $${shipping.toFixed(2)}`, 140, y + 16)
    doc.setFontSize(16)
    doc.text(`Grand Total: $${total.toFixed(2)}`, 140, y + 28)

    doc.save(`invoice-${id}.pdf`)
  }

  return (
    <>
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
            color='secondary'
            variant='tonal'
            className='capitalize'
            onClick={handleDownloadPDF}
          >
            Download
          </Button>

          <div className='flex items-center gap-4'>
            <Button
              fullWidth
              color='secondary'
              variant='tonal'
              className='capitalize'
              onClick={onButtonClick}
            >
              Print
            </Button>
            <Button
              fullWidth
              component={Link}
              color='secondary'
              variant='tonal'
              className='capitalize'
              href={getLocalizedUrl(`/apps/invoice/edit/${id}`, locale)}
            >
              Edit
            </Button>
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
    </>
  )
}

export default PreviewActions
