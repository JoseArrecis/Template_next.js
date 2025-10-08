'use client'

// React Imports
import { useState, useMemo, useCallback } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import TablePagination from '@mui/material/TablePagination'

// Third-party Imports
import classnames from 'classnames'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'

// Component Imports
import OptionMenu from '@core/components/option-menu'
import CustomAvatar from '@core/components/mui/Avatar'
import CustomTextField from '@core/components/mui/TextField'
import TablePaginationComponent from '@components/TablePaginationComponent'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

// Style Imports
import tableStyles from '@core/styles/table.module.css'
import jsPDF from 'jspdf'
import * as XLSX from 'xlsx'

const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)
  addMeta({ itemRank })
  return itemRank.passed
}

const invoiceStatusObj = {
  Sent: { color: 'secondary', icon: 'tabler-send-2' },
  Paid: { color: 'success', icon: 'tabler-check' },
  Draft: { color: 'primary', icon: 'tabler-mail' },
  'Partial Payment': { color: 'warning', icon: 'tabler-chart-pie-2' },
  'Past Due': { color: 'error', icon: 'tabler-alert-circle' },
  Downloaded: { color: 'info', icon: 'tabler-arrow-down' }
}

const columnHelper = createColumnHelper()
const generateAndDownloadPDF = (row) => {
  try {
    const doc = new jsPDF()

    doc.setFontSize(16)
    doc.text(`Invoice #${row.id}`, 20, 20)

    doc.setFontSize(12)
    doc.text(`Company: ${row.company ?? ''}`, 20, 40)
    doc.text(`Name: ${row.name ?? ''}`, 20, 50)
    doc.text(`Service: ${row.service ?? ''}`, 20, 60)
    doc.text(`Total: ${row.total ?? ''}`, 20, 70)
    doc.text(`Status: ${row.invoiceStatus ?? ''}`, 20, 80)
    doc.text(`Issued Date: ${row.issuedDate ?? ''}`, 20, 90)
    doc.text(`Due Date: ${row.dueDate ?? ''}`, 20, 100)
    doc.text(`Balance: ${row.balance ?? ''}`, 20, 110)
    doc.text(`Address: ${row.address ?? ''}`, 20, 120)
    doc.text(`Contact: ${row.contact ?? ''}`, 20, 130)
    doc.text(`Email: ${row.email ?? ''}`, 20, 140)
    doc.text(`Country: ${row.country ?? ''}`, 20, 150)

    doc.save(`invoice-${row.id}.pdf`)
  } catch (err) {
    console.error('Error generating PDF:', err)
    alert('No se pudo generar el PDF.')
  }
}

// Exportacion en PDF
const exportPDF = (data) => {
  const doc = new jsPDF()
  doc.setFontSize(18)
  doc.text('Invoice List', 14, 20)
  doc.setFontSize(12)

  let y = 40
  data.forEach((row, i) => {
    doc.text(`ID: ${row.id} | Name: ${row.name} | Total: $${row.total} | Status: ${row.invoiceStatus}`, 14, y)
    y += 10
    if (y > 280) {
      doc.addPage()
      y = 20
    }
  })
  doc.save('invoices.pdf')
}

// Exportacion en XLSX
const exportXLSX = (data) => {
  const ws = XLSX.utils.json_to_sheet(data)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Invoices')
  XLSX.writeFile(wb, 'invoices.xlsx')
}

// Exportacion en CSV
const exportCSV = (data) => {
  const ws = XLSX.utils.json_to_sheet(data)
  const csv = XLSX.utils.sheet_to_csv(ws)
  const blob = new Blob ([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = 'invoices.csv'
  link.click()
}

const InvoiceListTable = ({ invoiceData = [] }) => {
  // States
  const [rowSelection, setRowSelection] = useState({})
  const [data, setData] = useState(Array.isArray(invoiceData) ? invoiceData : [])
  const [globalFilter, setGlobalFilter] = useState('')
  const [anchorEl, setAnchorEl] = useState(null)

  // Vars
  const open = Boolean(anchorEl)
  const { lang: locale } = useParams()

  // stable callbacks
  const handleDelete = useCallback(
    (idToDelete) => {
      setData(prev => prev.filter(inv => inv.id !== idToDelete))
    },
    [setData]
  )

  const handleDownload = useCallback((invoice) => {
    generateAndDownloadPDF(invoice)
  }, [])

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: '#',
        cell: ({ row }) => (
          <Typography
            component={Link}
            href={getLocalizedUrl(`/apps/invoice/preview/${row.original.id}`, locale)}
            color='primary.main'
          >
            {`#${row.original.id}`}
          </Typography>
        )
      }),
      columnHelper.accessor('invoiceStatus', {
        header: 'Status',
        cell: ({ row }) => {
          const statusKey = row.original.invoiceStatus ?? 'Draft'
          const mapping = invoiceStatusObj[statusKey] ?? invoiceStatusObj.Draft
          return (
            <Tooltip
              title={
                <div>
                  <Typography variant='body2' component='span' className='text-inherit'>
                    {row.original.invoiceStatus}
                  </Typography>
                  <br />
                  <Typography variant='body2' component='span' className='text-inherit'>
                    Balance:
                  </Typography>{' '}
                  {row.original.balance}
                  <br />
                  <Typography variant='body2' component='span' className='text-inherit'>
                    Due Date:
                  </Typography>{' '}
                  {row.original.dueDate}
                </div>
              }
            >
              <CustomAvatar skin='light' color={mapping.color} size={28}>
                <i className={classnames('text-base', mapping.icon)} />
              </CustomAvatar>
            </Tooltip>
          )
        }
      }),
      columnHelper.accessor('total', {
        header: 'Total',
        cell: ({ row }) => <Typography>{`$${row.original.total ?? 0}`}</Typography>
      }),
      columnHelper.accessor('issuedDate', {
        header: 'Issued Date',
        cell: ({ row }) => <Typography>{row.original.issuedDate}</Typography>
      }),
      columnHelper.accessor('action', {
        id: 'action', // ensure id is 'action' for checks in header/cell rendering
        header: 'Action',
        cell: ({ row }) => (
          <div className='flex items-center gap-1'>
            {/* Direct delete icon */}
            <IconButton
              size='small'
              onClick={() => {
                // confirm before delete
                if (confirm(`Eliminar factura #${row.original.id}?`)) {
                  handleDelete(row.original.id)
                }
              }}
              aria-label={`delete-invoice-${row.original.id}`}
            >
              <i className='tabler-trash text-textSecondary' />
            </IconButton>

            <IconButton size='small' aria-label={`view-invoice-${row.original.id}`}>
              <Link href={getLocalizedUrl(`/apps/invoice/preview/${row.original.id}`, locale)} className='flex'>
                <i className='tabler-eye text-textSecondary' />
              </Link>
            </IconButton>

            <OptionMenu
              iconButtonProps={{ size: 'small' }}
              iconClassName='text-textSecondary'
              options={[
                {
                  text: 'Download',
                  icon: 'tabler-download',
                  menuItemProps: {
                    onClick: () => handleDownload(row.original),
                    className: 'flex items-center gap-2 text-textSecondary'
                  }
                },
                {
                  text: 'Edit',
                  icon: 'tabler-edit',
                  href: getLocalizedUrl(`/apps/invoice/edit/${row.original.id}`, locale),
                  linkProps: {
                    className: classnames('flex items-center plb-2 pli-4 is-full gap-2 text-textSecondary')
                  }
                },
                {
                  text: 'Duplicate',
                  icon: 'tabler-copy',
                  menuItemProps: {
                    onClick: () => {
                      // duplicate item: create a new id & push to state
                      const copy = { ...row.original, id: Date.now() }
                      setData(prev => [copy, ...prev])
                      alert(`Duplicated invoice #${row.original.id} as #${copy.id}`)
                    },
                    className: 'flex items-center gap-2 text-textSecondary'
                  }
                }
              ]}
            />
          </div>
        ),
        enableSorting: false
      })
    ],
    [locale, handleDelete, handleDownload]
  )

  // react-table instance
  const table = useReactTable({
    data,
    columns,
    filterFns: { fuzzy: fuzzyFilter },
    state: { rowSelection, globalFilter },
    initialState: { pagination: { pageSize: 10 } },
    enableRowSelection: true,
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  const handleClick = (event) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  // small export menu (header)
  const [anchorExportEl, setAnchorExportEl] = useState(null)
  const openExport = Boolean(anchorExportEl)
  const handleExportClick = (e) => setAnchorExportEl(e.currentTarget)
  const handleExportClose = () => setAnchorExportEl(null)

  return (
    <Card>
      <CardHeader
        title='Invoice List'
        sx={{ '& .MuiCardHeader-action': { m: 0 } }}
        className='flex items-center justify-between flex-wrap gap-4'
        action={
          <div className='flex items-center gap-4 flex-wrap'>
            <div className='flex items-center gap-2'>
              <Typography>Show</Typography>
              <CustomTextField
                select
                value={table.getState().pagination.pageSize}
                onChange={e => table.setPageSize(Number(e.target.value))}
                className='is-[70px]'
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </CustomTextField>
            </div>

            <Button
              variant='tonal'
              aria-haspopup='true'
              onClick={handleExportClick}
              color='secondary'
              endIcon={<i className='tabler-upload' />}
              aria-controls={openExport ? 'invoice-export-menu' : undefined}
              aria-expanded={openExport ? 'true' : undefined}
            >
              Export
            </Button>

            <Menu
              open={openExport}
              anchorEl={anchorExportEl}
              onClose={handleExportClose}
              id='invoice-export-menu'
            >
              <MenuItem onClick={() => { exportPDF(data); handleClose() }}>PDF</MenuItem>
              <MenuItem onClick={() => { exportXLSX(data); handleClose() }}>XLSX</MenuItem>
              <MenuItem onClick={() => { exportCSV(data); handleClose() }}>CSV</MenuItem>
            </Menu>
          </div>
        }
      />

      <div className='overflow-x-auto'>
        <table className={tableStyles.table}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} {...(header.id === 'action' && { className: 'is-24' })}>
                    {header.isPlaceholder ? null : (
                      <div
                        className={classnames({
                          'flex items-center': header.column.getIsSorted(),
                          'cursor-pointer select-none': header.column.getCanSort()
                        })}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: <i className='tabler-chevron-up text-xl' />,
                          desc: <i className='tabler-chevron-down text-xl' />
                        }[header.column.getIsSorted()] ?? null}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table
              .getRowModel()
              .rows.slice(0, table.getState().pagination.pageSize)
              .map(row => (
                <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} {...(cell.column.id === 'action' && { className: 'is-24' })}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <TablePagination
        component={() => <TablePaginationComponent table={table} />}
        count={table.getFilteredRowModel().rows.length}
        rowsPerPage={table.getState().pagination.pageSize}
        page={table.getState().pagination.pageIndex}
        onPageChange={(_, page) => table.setPageIndex(page)}
      />
    </Card>
  )
}

export default InvoiceListTable
