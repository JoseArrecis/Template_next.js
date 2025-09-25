'use client'

// React Imports
import { useState, useMemo } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Checkbox from '@mui/material/Checkbox'
import LinearProgress from '@mui/material/LinearProgress'
import TablePagination from '@mui/material/TablePagination'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

// Third-party Imports
import classnames from 'classnames'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'

// Components Imports
import CustomAvatar from '@core/components/mui/Avatar'
import OptionMenu from '@core/components/option-menu'
import TablePaginationComponent from '@components/TablePaginationComponent'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

// Colores de chip
export const chipColor = {
  'No Warnings': { color: 'success' },
  'Fuel Problems': { color: 'primary' },
  'Temperature Not Optimal': { color: 'warning' },
  'Ecu Not Responding': { color: 'error' },
  'Oil Leakage': { color: 'info' }
}

// Filtro difuso
const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)
  addMeta({ itemRank })
  return itemRank.passed
}

// Columnas
const columnHelper = createColumnHelper()

const LogisticsOverviewTable = ({ vehicleData }) => {
  const [rowSelection, setRowSelection] = useState({})
  const [data, setData] = useState(vehicleData)
  const { lang: locale } = useParams()

  // Función para manejar acciones del menú
  const handleMenuAction = action => {
    if (action === 'Refresh') {
      // Generar nuevos valores aleatorios manteniendo la página actual
      setData(prev =>
        prev.map(item => ({
          ...item,
          progress: Math.floor(Math.random() * 100)
        }))
      )
    } else if (action === 'Update') {
      alert('Feature Update Coming Soon 🚀')
    } else if (action === 'Share') {
      if (navigator.share) {
        navigator
          .share({
            title: 'Vehicle Overview',
            text: 'Check out this vehicle data',
            url: window.location.href
          })
          .catch(err => console.log('Share canceled', err))
      } else {
        alert('Sharing is not supported in this browser ❌')
      }
    }
  }

  const columns = useMemo(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler()
            }}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler()
            }}
          />
        )
      },
      columnHelper.accessor('location', {
        header: 'Location',
        cell: ({ row }) => (
          <div className='flex items-center gap-4'>
            <CustomAvatar skin='light' color='secondary'>
              <i className='tabler-car text-[28px]' />
            </CustomAvatar>
            <Typography
              component={Link}
              href={getLocalizedUrl('/apps/logistics/fleet', locale)}
              className='font-medium hover:text-primary'
              color='text.primary'
            >
              VOL-{row.original.location}
            </Typography>
          </div>
        )
      }),
      columnHelper.accessor('startCity', {
        header: 'Starting Route',
        cell: ({ row }) => (
          <Typography>{`${row.original.startCity}, ${row.original.startCountry}`}</Typography>
        )
      }),
      columnHelper.accessor('endCity', {
        header: 'Ending Route',
        cell: ({ row }) => (
          <Typography>{`${row.original.endCity}, ${row.original.endCountry}`}</Typography>
        )
      }),
      columnHelper.accessor('warnings', {
        header: 'Warnings',
        cell: ({ row }) => (
          <Chip
            variant='tonal'
            label={row.original.warnings}
            size='small'
            color={chipColor[row.original.warnings].color}
          />
        )
      }),
      columnHelper.accessor('progress', {
        header: 'Progress',
        cell: ({ row }) => (
          <div className='flex items-center gap-2 min-is-48'>
            <LinearProgress
              color='primary'
              value={row.original.progress}
              variant='determinate'
              className='bs-2 is-full'
            />
            <Typography>{`${row.original.progress}%`}</Typography>
          </div>
        )
      })
    ],
    [locale]
  )

  const table = useReactTable({
    data,
    columns,
    filterFns: { fuzzy: fuzzyFilter },
    state: { rowSelection },
    initialState: { pagination: { pageSize: 5 } },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  return (
    <Card>
      <CardHeader
        title='Vehicles Overview'
        action={
          <OptionMenu
            options={[
              { text: 'Refresh', menuItemProps: { onClick: () => handleMenuAction('Refresh') } },
              { text: 'Update', menuItemProps: { onClick: () => handleMenuAction('Update') } },
              { text: 'Share', menuItemProps: { onClick: () => handleMenuAction('Share') } }
            ]}
          />
        }
      />
      <div className='overflow-x-auto'>
        <table className={tableStyles.table}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
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

export default LogisticsOverviewTable
