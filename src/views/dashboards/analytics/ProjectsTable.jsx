'use client'

// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import AvatarGroup from '@mui/material/AvatarGroup'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'
import Card from '@mui/material/Card'
import Checkbox from '@mui/material/Checkbox'
import CardHeader from '@mui/material/CardHeader'
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
import TablePaginationComponent from '@/components/TablePaginationComponent'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

// Filtro difuso
const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)
  addMeta({ itemRank })
  return itemRank.passed
}

// Input con debounce
const DebouncedInput = ({ value: initialValue, onChange, debounce = 500, ...props }) => {
  const [value, setValue] = useState(initialValue)
  useEffect(() => setValue(initialValue), [initialValue])
  useEffect(() => {
    const timeout = setTimeout(() => onChange(value), debounce)
    return () => clearTimeout(timeout)
  }, [value, onChange, debounce])
  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

// Column Helper
const columnHelper = createColumnHelper()

const ProjectTables = () => {
  // Datos manuales
  const initialProjects = [
    {
      id: 1,
      title: 'Proyecto Alpha',
      subtitle: 'Sistema de ventas',
      leader: 'Juan Pérez',
      status: 75,
      avatar: '/images/avatars/1.png',
      avatarGroup: ['/images/avatars/2.png', '/images/avatars/3.png', '/images/avatars/4.png'],
      description: 'Desarrollar un sistema de ventas completo para tiendas en línea.',
      topics: ['Frontend', 'Backend', 'Base de datos']
    },
    {
      id: 2,
      title: 'Proyecto Beta',
      subtitle: 'Aplicación móvil',
      leader: 'María López',
      status: 40,
      avatar: '/images/avatars/2.png',
      avatarGroup: ['/images/avatars/1.png', '/images/avatars/3.png'],
      description: 'Crear una app móvil para seguimiento de hábitos diarios.',
      topics: ['React Native', 'API', 'UI/UX']
    },
    {
      id: 3,
      title: 'Proyecto Gamma',
      subtitle: 'Inteligencia Artificial',
      leader: 'Carlos Martínez',
      status: 90,
      avatar: '/images/avatars/3.png',
      avatarGroup: ['/images/avatars/1.png', '/images/avatars/2.png', '/images/avatars/5.png'],
      description: 'Implementar un sistema de recomendación basado en IA.',
      topics: ['Machine Learning', 'Python', 'Data Science']
    },
    {
      id: 4,
      title: 'Proyecto Delta',
      subtitle: 'Blog educativo',
      leader: 'Ana Gómez',
      status: 60,
      avatar: '/images/avatars/4.png',
      avatarGroup: ['/images/avatars/2.png', '/images/avatars/3.png'],
      description: 'Desarrollar un blog educativo con sistema de comentarios.',
      topics: ['React', 'Node.js', 'MongoDB']
    },
    {
      id: 5,
      title: 'Proyecto Épsilon',
      subtitle: 'Gestión de eventos',
      leader: 'Luis Hernández',
      status: 30,
      avatar: '/images/avatars/5.png',
      avatarGroup: ['/images/avatars/1.png', '/images/avatars/2.png'],
      description: 'Crear una plataforma para gestionar eventos y asistentes.',
      topics: ['Frontend', 'Backend', 'Integración']
    }
  ]

  const [data, setData] = useState([...initialProjects])
  const [archived, setArchived] = useState([])
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')

  // Acciones
  const handleDetails = row => {
    const project = row.original
    alert(`Detalles del proyecto:\n\nTítulo: ${project.title}\nLíder: ${project.leader}\nDescripción: ${project.description}\nTemas: ${project.topics.join(', ')}`)
  }

  const handleRefresh = (row) => {
    setData(prev =>
      prev.map(item =>
        item.id === row.original.id
          ? { ...item, status: Math.floor(Math.random() * 100) + 1 } 
          : item
      )
    )
  }

  const handleArchive = row => {
    setData(prev => prev.filter(item => item.title !== row.original.title))
    setArchived(prev => [...prev, row.original])
  }

  const handleDelete = row => {
    setData(prev => prev.filter(item => item.title !== row.original.title))
    setArchived(prev => prev.filter(item => item.title !== row.original.title))
  }

  const handleRestore = row => {
    setArchived(prev => prev.filter(item => item.title !== row.original.title))
    setData(prev => [...prev, row.original])
  }

  // Columnas
  const getColumns = (isArchived = false) => [
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
    columnHelper.accessor('title', {
      header: 'Project',
      cell: ({ row }) => (
        <div className='flex items-center gap-3'>
          <CustomAvatar src={row.original.avatar} size={34} />
          <div className='flex flex-col'>
            <Typography className='font-medium' color='text.primary'>
              {row.original.title}
            </Typography>
            <Typography variant='body2'>{row.original.subtitle}</Typography>
          </div>
        </div>
      )
    }),
    columnHelper.accessor('leader', {
      header: 'Leader',
      cell: ({ row }) => <Typography color='text.primary'>{row.original.leader}</Typography>
    }),
    columnHelper.accessor('avatarGroup', {
      header: 'Team',
      cell: ({ row }) => (
        <AvatarGroup max={4} className='flex items-center pull-up'>
          {row.original.avatarGroup.map((avatar, index) => (
            <CustomAvatar key={index} src={avatar} size={26} />
          ))}
        </AvatarGroup>
      ),
      enableSorting: false
    }),
    columnHelper.accessor('status', {
      header: 'Progress',
      cell: ({ row }) => (
        <div className='flex items-center gap-3'>
          <LinearProgress color='primary' value={row.original.status} variant='determinate' className='is-20' />
          <Typography color='text.primary'>{`${row.original.status}%`}</Typography>
        </div>
      )
    }),
    columnHelper.accessor('actions', {
      header: 'Actions',
      cell: ({ row }) => (
        <OptionMenu
          iconClassName='text-textSecondary'
          options={[
            { text: 'Details', menuItemProps: { onClick: () => handleDetails(row) } },
            !isArchived && { text: 'Archive', menuItemProps: { onClick: () => handleArchive(row) } },
            isArchived && { text: 'Restore', menuItemProps: { onClick: () => handleRestore(row) } },
            { text: 'Refresh', menuItemProps: { onClick: () => handleRefresh(row) } },
            { divider: true },
            { text: 'Delete', menuItemProps: { className: 'text-error', onClick: () => handleDelete(row, isArchived) } }
          ].filter(Boolean)}
        />
      ),
      enableSorting: false
    })
  ]

  // Tabla activa
  const tableActive = useReactTable({
    data,
    columns: getColumns(false),
    filterFns: { fuzzy: fuzzyFilter },
    state: { rowSelection, globalFilter },
    initialState: { pagination: { pageSize: 5 } },
    enableRowSelection: true,
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  // Tabla archivados
  const tableArchived = useReactTable({
    data: archived,
    columns: getColumns(true),
    state: { globalFilter },
    initialState: { pagination: { pageSize: 5 } },
    globalFilterFn: fuzzyFilter,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })

  return (
    <>
      {/* Activos */}
      <Card>
        <CardHeader
          className='flex-wrap gap-x-4 gap-y-2'
          title='Project List'
          action={
            <DebouncedInput
              value={globalFilter ?? ''}
              onChange={value => setGlobalFilter(String(value))}
              placeholder='Search Project'
            />
          }
        />
        <div className='overflow-x-auto'>
          <table className={tableStyles.table}>
            <thead>
              {tableActive.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {tableActive.getRowModel().rows.map(row => (
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
          rowsPerPageOptions={[5, 7, 10]}
          component={() => <TablePaginationComponent table={tableActive} />}
          count={tableActive.getFilteredRowModel().rows.length}
          rowsPerPage={tableActive.getState().pagination.pageSize}
          page={tableActive.getState().pagination.pageIndex}
          onPageChange={(_, page) => tableActive.setPageIndex(page)}
        />
      </Card>

      {/* Archivados */}
      {archived.length > 0 && (
        <Card className='mt-6'>
          <CardHeader title='Archived Projects' />
          <div className='overflow-x-auto'>
            <table className={tableStyles.table}>
              <thead>
                {tableArchived.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <th key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {tableArchived.getRowModel().rows.map(row => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </>
  )
}

export default ProjectTables
