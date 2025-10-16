'use client'

import { useState, useMemo } from 'react'
import { useParams } from 'next/navigation'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import { Menu } from '@mui/material'
import Rating from '@mui/material/Rating'
import classnames from 'classnames'
import { createColumnHelper, flexRender, useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel } from '@tanstack/react-table'
import jsPDF from 'jspdf'
import * as XLSX from 'xlsx'

import CustomAvatar from '@core/components/mui/Avatar'
import CustomTextField from '@core/components/mui/TextField'
import OptionMenu from '@core/components/option-menu'
import TablePaginationComponent from '@components/TablePaginationComponent'
import tableStyles from '@core/styles/table.module.css'

import { db } from '@/fake-db/apps/ecommerce'

const columnHelper = createColumnHelper()

export default function ManageReviewsTable({ reviewsData = db.reviews }) {
  const { lang: locale } = useParams()
  const [data, setData] = useState(reviewsData) // <-- estado local para los datos
  const [status, setStatus] = useState('All')
  const [globalFilter, setGlobalFilter] = useState('')
  const [rowSelection, setRowSelection] = useState({})
  const [anchorExportEl, setAnchorExportEl] = useState(null)

  // --- FILTRADO SIMPLE ---
  const filteredData = useMemo(() => {
    return (data || []).filter(r =>
      (status === 'All' || r.status === status) &&
      (r.product.toLowerCase().includes(globalFilter.toLowerCase()) ||
       r.reviewer.toLowerCase().includes(globalFilter.toLowerCase()))
    )
  }, [status, globalFilter, data])

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this review?')) {
      setData(prev => prev.filter(item => item.id !== id))
    }
  }

  const columns = useMemo(() => [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllRowsSelected()}
          indeterminate={table.getIsSomeRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      )
    },
    columnHelper.accessor('product', {
      header: 'Product',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <img src={row.original.productImage} width={38} height={38} className="rounded bg-actionHover" />
          <div>
            <Typography>{row.original.product}</Typography>
            <Typography variant="body2">{row.original.companyName}</Typography>
          </div>
        </div>
      )
    }),
    columnHelper.accessor('reviewer', {
      header: 'Reviewer',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <CustomAvatar src={row.original.avatar} size={34} />
          <div>
            <Typography>{row.original.reviewer}</Typography>
            <Typography variant="body2">{row.original.email}</Typography>
          </div>
        </div>
      )
    }),
    columnHelper.accessor('review', {
      header: 'Rating',
      cell: ({ row }) => <Rating readOnly value={row.original.review} />
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: ({ row }) => (
        <Chip
          label={row.original.status}
          color={row.original.status === 'Published' ? 'success' : 'warning'}
          size="small"
        />
      )
    }),
    columnHelper.accessor('actions', {
      header: 'Actions',
      cell: ({ row }) => (
        <OptionMenu
          options={[{
            text: 'Delete',
            icon: 'tabler-trash',
            menuItemProps: {
              onClick: () => handleDelete(row.original.id)
            }
          }]}
        />
      ),
      enableSorting: false
    })
  ], [data])

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { rowSelection },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel()
  })

  const openExport = Boolean(anchorExportEl)
  const handleExportClose = () => setAnchorExportEl(null)

  const exportPDF = (data) => {
    if (!data.length) return alert('No data available')
    const doc = new jsPDF()
    doc.setFontSize(18)
    doc.text('Manage Review', 14, 22)
    doc.setFontSize(11)
    let y = 30
    data.forEach(row => {
      doc.text(
        `ID: ${row.id} | Product: ${row.product} | Company: ${row.companyName} | Reviewer: ${row.reviewer} | Email: ${row.email} | Date: ${row.date} | Status: ${row.status}`,
        14,
        y
      )
      y += 10
      if (y > 280) {
        doc.addPage()
        y = 20
      }
    })
    doc.save('manage-review.pdf')
  }

  const exportXLSX = (data) => {
    if (!data.length) return alert('No data available')
    const ws = XLSX.utils.json_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'ManageReview')
    XLSX.writeFile(wb, 'manage-review.xlsx')
  }

  const exportCSV = (data) => {
    if (!data.length) return alert('No data available')
    const ws = XLSX.utils.json_to_sheet(data)
    const csv = XLSX.utils.sheet_to_csv(ws)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'manage-review.csv'
    link.click()
  }

  return (
    <Card className="p-4">
      <div className="flex gap-4 mb-4">
        <CustomTextField
          placeholder="Search Product or Reviewer"
          value={globalFilter}
          onChange={e => setGlobalFilter(e.target.value)}
        />
        <CustomTextField select value={status} onChange={e => setStatus(e.target.value)}>
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Published">Published</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
        </CustomTextField>
        <Button variant="tonal" color="secondary" onClick={e => setAnchorExportEl(e.currentTarget)}>Export</Button>
        <Menu open={openExport} anchorEl={anchorExportEl} onClose={handleExportClose}>
          <MenuItem onClick={() => { exportPDF(filteredData); handleExportClose() }}>PDF</MenuItem>
          <MenuItem onClick={() => { exportXLSX(filteredData); handleExportClose() }}>XLSX</MenuItem>
          <MenuItem onClick={() => { exportCSV(filteredData); handleExportClose() }}>CSV</MenuItem>
        </Menu>
      </div>

      <div className="overflow-x-auto">
        <table className={tableStyles.table}>
          <thead>
            {table.getHeaderGroups().map(hg => (
              <tr key={hg.id}>
                {hg.headers.map(h => <th key={h.id}>{flexRender(h.column.columnDef.header, h.getContext())}</th>)}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr><td colSpan={columns.length} className="text-center">No data available</td></tr>
            ) : table.getRowModel().rows.map(row => (
              <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                {row.getVisibleCells().map(cell => <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <TablePaginationComponent table={table} />
    </Card>
  )
}
