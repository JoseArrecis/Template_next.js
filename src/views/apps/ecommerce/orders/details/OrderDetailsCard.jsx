'use client'

// React Imports
import { useState, useMemo, useEffect } from 'react'

// MUI Imports
import {
  Card,
  CardHeader,
  CardContent,
  Checkbox,
  Typography,
  Drawer,
  Button,
  TextField,
  Divider
} from '@mui/material'

// Third-party Imports
import classnames from 'classnames'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'

import jsPDF from 'jspdf'
import { useRouter } from 'next/navigation'

// Styles
import tableStyles from '@core/styles/table.module.css'
import OptionMenu from '@/@core/components/option-menu'

const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)
  addMeta({ itemRank })
  return itemRank.passed
}

const initialOrderData = [
  {
    id: 1,
    productName: 'OnePlus 7 Pro',
    productImage: '/images/apps/ecommerce/product-21.png',
    brand: 'OnePlus',
    price: 799,
    quantity: 1,
    total: 799
  },
  {
    id: 2,
    productName: 'Magic Mouse',
    productImage: '/images/apps/ecommerce/product-22.png',
    brand: 'Google',
    price: 89,
    quantity: 1,
    total: 89
  },
  {
    id: 3,
    productName: 'Wooden Chair',
    productImage: '/images/apps/ecommerce/product-23.png',
    brand: 'Insofar',
    price: 289,
    quantity: 2,
    total: 578
  },
  {
    id: 4,
    productName: 'Air Jordan',
    productImage: '/images/apps/ecommerce/product-24.png',
    brand: 'Nike',
    price: 299,
    quantity: 2,
    total: 598
  }
]

const columnHelper = createColumnHelper()

const EditOrderDrawer = ({ open, handleClose, products, setProducts, setOrderDetails }) => {
  const [editedProducts, setEditedProducts] = useState([])

  useEffect(() => {
    if (open) setEditedProducts(products)
  }, [open, products])

  const subtotal = editedProducts.reduce((sum, p) => sum + p.price * p.quantity, 0)
  const shipping = 15
  const tax = Math.round(subtotal * 0.05)
  const total = subtotal + shipping + tax

  const handleChange = (index, field, value) => {
    const newProducts = [...editedProducts]
    newProducts[index][field] = Number(value)
    newProducts[index].total = newProducts[index].price * newProducts[index].quantity
    setEditedProducts(newProducts)
  }

  const handleSubmit = () => {
    setProducts(editedProducts)
    setOrderDetails({ subtotal, shipping, tax, total })
    handleClose()
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      onClose={handleClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: 400,
          backgroundColor: '#1A1C2E',
          color: '#fff',
          padding: '2rem'
        }
      }}
    >
      <Typography variant='h6' sx={{ mb: 1 }}>
        Edit Products
      </Typography>
      <Typography variant='body2' sx={{ mb: 4, color: 'rgba(255,255,255,0.6)' }}>
        Updating product details will automatically update totals.
      </Typography>

      {editedProducts.map((product, index) => (
        <div key={product.id} style={{ marginBottom: '2rem' }}>
          <Typography variant='subtitle1' sx={{ mb: 2, fontWeight: 600 }}>
            {product.productName}
          </Typography>
          <TextField
            label='Price ($)'
            type='number'
            fullWidth
            value={product.price}
            onChange={e => handleChange(index, 'price', e.target.value)}
            margin='normal'
            InputLabelProps={{ style: { color: '#B0B0C3' } }}
            InputProps={{
              style: { color: 'white', backgroundColor: '#2A2C3E', borderRadius: 8 }
            }}
          />
          <TextField
            label='Quantity'
            type='number'
            fullWidth
            value={product.quantity}
            onChange={e => handleChange(index, 'quantity', e.target.value)}
            margin='normal'
            InputLabelProps={{ style: { color: '#B0B0C3' } }}
            InputProps={{
              style: { color: 'white', backgroundColor: '#2A2C3E', borderRadius: 8 }
            }}
          />
          <TextField
            label='Total ($)'
            fullWidth
            value={product.total}
            disabled
            margin='normal'
            InputLabelProps={{ style: { color: '#B0B0C3' } }}
            InputProps={{
              style: { color: 'white', backgroundColor: '#2A2C3E', borderRadius: 8 }
            }}
          />
        </div>
      ))}

      <Divider className='border-gray-700' />

      <div style={{ marginTop: '2rem' }}>
        <div className='flex justify-between mb-2'>
          <Typography>Subtotal:</Typography>
          <Typography>${subtotal}</Typography>
        </div>
        <div className='flex justify-between mb-2'>
          <Typography>Shipping:</Typography>
          <Typography>${shipping}</Typography>
        </div>
        <div className='flex justify-between mb-2'>
          <Typography>Tax (5%):</Typography>
          <Typography>${tax}</Typography>
        </div>
        <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.1)' }} />
        <div className='flex justify-between'>
          <Typography variant='subtitle1'>Total:</Typography>
          <Typography variant='subtitle1' fontWeight='bold'>
            ${total}
          </Typography>
        </div>
      </div>

      <div className='flex justify-end gap-2 mt-6'>
        <Button
          variant='contained'
          onClick={handleSubmit}
          sx={{
            backgroundColor: '#7367f0',
            textTransform: 'none',
            '&:hover': { backgroundColor: '#5a52d0' }
          }}
        >
          Save
        </Button>
        <Button
          variant='outlined'
          onClick={handleClose}
          sx={{
            borderColor: '#B0B0C3',
            color: '#B0B0C3',
            textTransform: 'none',
            '&:hover': { borderColor: '#ffffff', color: '#ffffff' }
          }}
        >
          Cancel
        </Button>
      </div>
    </Drawer>
  )
}

// 🧾 Tabla de productos
const OrderTable = ({ tableData, setTableData, setOrderDetails }) => {
  const columns = useMemo(
    () => [
      columnHelper.accessor('productName', {
        header: 'Product',
        cell: ({ row }) => (
          <div className='flex items-center gap-3'>
            <img src={row.original.productImage} alt={row.original.productName} height={34} className='rounded' />
            <div>
              <Typography color='text.primary' className='font-medium'>
                {row.original.productName}
              </Typography>
              <Typography variant='body2'>{row.original.brand}</Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('price', { header: 'Price', cell: ({ row }) => `$${row.original.price}` }),
      columnHelper.accessor('quantity', { header: 'Qty', cell: ({ row }) => row.original.quantity }),
      columnHelper.accessor('total', { header: 'Total', cell: ({ row }) => `$${row.original.total}` }),
      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => (
          <OptionMenu
            iconButtonProps={{ size: 'medium' }}
            iconClassName='text-textSecondary'
            options={[
              {
                text: 'Delete',
                icon: 'tabler-trash',
                menuItemProps: {
                  onClick: () => {
                    setTableData(prev => {
                      const updated = prev.filter(item => item.id !== row.original.id)
                      const subtotal = updated.reduce((sum, p) => sum + p.price * p.quantity, 0)
                      const shipping = 15
                      const tax = Math.round(subtotal * 0.05)
                      const total = subtotal + shipping + tax
                      setOrderDetails({ subtotal, shipping, tax, total })
                      return updated
                    })
                  },
                  className: 'flex items-center'
                }
              }
            ]}
          />
        )
      })
    ],
    [setTableData, setOrderDetails]
  )

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <div className='overflow-x-auto'>
      <table className={tableStyles.table}>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const OrderDetailsCard = () => {
  const [openEdit, setOpenEdit] = useState(false)
  const [products, setProducts] = useState(initialOrderData)
  const router = useRouter()

  const subtotal = products.reduce((sum, p) => sum + p.total, 0)
  const shipping = 15
  const tax = Math.round(subtotal * 0.05)
  const total = subtotal + shipping + tax

  const [orderDetails, setOrderDetails] = useState({ subtotal, shipping, tax, total })

  const handleGoBack = () => router.back()

  const handleDownloadPDF = () => {
    const doc = new jsPDF()
    doc.setFontSize(16)
    doc.text('Detalles de la orden', 20, 20)
    let y = 40
    products.forEach((p, i) => {
      doc.text(`${i + 1}. ${p.productName} - ${p.brand} - $${p.total}`, 20, y)
      y += 10
    })
    doc.text(`Subtotal: $${orderDetails.subtotal}`, 20, y + 10)
    doc.text(`Envío: $${orderDetails.shipping}`, 20, y + 20)
    doc.text(`Impuestos: $${orderDetails.tax}`, 20, y + 30)
    doc.text(`Total: $${orderDetails.total}`, 20, y + 40)
    doc.save('order-details.pdf')
  }

  return (
    <>
      <Card>
        <CardHeader
          title='Order Details'
          action={
            <Typography
              color='primary.main'
              className='font-medium cursor-pointer'
              onClick={() => setOpenEdit(true)}
            >
              Edit
            </Typography>
          }
        />

        <OrderTable tableData={products} setTableData={setProducts} setOrderDetails={setOrderDetails} />

        <CardContent className='flex justify-end'>
          <div className='space-y-2 text-gray-300'>
            <div className='flex justify-between gap-12'>
              <Typography>Subtotal:</Typography>
              <Typography>${orderDetails.subtotal}</Typography>
            </div>
            <div className='flex justify-between'>
              <Typography>Shipping Fee:</Typography>
              <Typography>${orderDetails.shipping}</Typography>
            </div>
            <div className='flex justify-between'>
              <Typography>Tax:</Typography>
              <Typography>${orderDetails.tax}</Typography>
            </div>
            <div className='flex justify-between font-bold text-white'>
              <Typography fontWeight='bold'>Total:</Typography>
              <Typography fontWeight='bold'>${orderDetails.total}</Typography>
            </div>
          </div>
        </CardContent>
      </Card>

      <EditOrderDrawer
        open={openEdit}
        handleClose={() => setOpenEdit(false)}
        products={products}
        setProducts={setProducts}
        setOrderDetails={setOrderDetails}
      />

      <div className='flex justify-end gap-4 p-4'>
        <Button variant='contained' color='secondary' onClick={handleGoBack}>
          ← Back
        </Button>
        <Button variant='contained' color='primary' onClick={handleDownloadPDF}>
          Descargar PDF
        </Button>
      </div>
    </>
  )
}

export default OrderDetailsCard
