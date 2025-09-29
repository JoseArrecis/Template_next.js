'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Checkbox from '@mui/material/Checkbox'
import LinearProgress from '@mui/material/LinearProgress'
import TablePagination from '@mui/material/TablePagination'
import Typography from '@mui/material/Typography'
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
import CustomAvatar from '@core/components/mui/Avatar'
import TablePaginationComponent from '@components/TablePaginationComponent'
import CustomTextField from '@core/components/mui/TextField'
import tableStyles from '@core/styles/table.module.css'
import { db } from '@/fake-db/apps/academy'

// Filtro difuso
const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)
  addMeta({ itemRank })
  return itemRank.passed
}

// Input con debounce
const DebouncedInput = ({ value: initialValue, onChange, debounce = 500, ...props }) => {
  const [value, setValue] = useState(initialValue)
  React.useEffect(() => setValue(initialValue), [initialValue])
  React.useEffect(() => {
    const timeout = setTimeout(() => onChange(value), debounce)
    return () => clearTimeout(timeout)
  }, [value])
  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

const columnHelper = createColumnHelper()

const CourseTable = ({ courseData }) => {
  const data = useMemo(() => (courseData && courseData.length ? courseData : db.courses), [courseData])
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')

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
          disabled={!row.getCanSelect()}
          indeterminate={row.getIsSomeSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      )
    },
    columnHelper.accessor('courseTitle', {
      header: 'Curso',
      cell: ({ row }) => (
        <div className='flex items-center gap-4'>
          {row.original.image ? (
            <img
              src={row.original.image}
              alt={row.original.courseTitle}
              className='w-10 h-10 object-cover rounded'
            />
          ) : (
            <CustomAvatar variant='rounded' skin='light' color={row.original.color}>
              <i className={classnames('text-[28px]', row.original.logo)} />
            </CustomAvatar>
          )}
          <div className='flex flex-col'>
            <Typography
              component={Link}
              href={`/apps/academy/course-details/${row.original.id}`}
              className='font-medium hover:text-primary'
              color='text.primary'
            >
              {row.original.courseTitle}
            </Typography>
            <Typography variant='body2'>{row.original.user}</Typography>
          </div>
        </div>
      )
    }),
    columnHelper.accessor('time', {
      header: 'Tiempo',
      cell: ({ row }) => <Typography>{row.original.time}</Typography>,
      enableSorting: false
    }),
    columnHelper.accessor('progressValue', {
      header: 'Progreso',
      cell: ({ row }) => {
        const progress = Math.floor((row.original.completedTasks / row.original.totalTasks) * 100)
        return (
          <div className='flex items-center gap-4'>
            <Typography>{`${progress}%`}</Typography>
            <LinearProgress value={progress} variant='determinate' className='is-full bs-2' />
            <Typography variant='body2'>{`${row.original.completedTasks}/${row.original.totalTasks}`}</Typography>
          </div>
        )
      }
    }),
    columnHelper.accessor('userCount', {
      header: 'Status',
      cell: ({ row }) => (
        <div className='flex items-center gap-5'>
          <div className='flex items-center gap-1.5'>
            <i className='tabler-users text-primary' />
            <Typography>{row.original.userCount}</Typography>
          </div>
          <div className='flex items-center gap-1.5'>
            <i className='tabler-book text-info' />
            <Typography>{row.original.note}</Typography>
          </div>
          <div className='flex items-center gap-1.5'>
            <i className='tabler-video text-error' />
            <Typography>{row.original.view}</Typography>
          </div>
        </div>
      ),
      enableSorting: false
    })
  ], [])

  const table = useReactTable({
    data,
    columns,
    filterFns: { fuzzy: fuzzyFilter },
    state: { rowSelection, globalFilter },
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

  return (
    <Card>
      <CardHeader
        title='Cursos disponibles'
        action={
          <DebouncedInput
            value={globalFilter ?? ''}
            onChange={value => setGlobalFilter(String(value))}
            placeholder='Buscar curso'
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
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                  No hay datos
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map(row => (
                <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                  ))}
                </tr>
              ))
            )}
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

export default CourseTable
