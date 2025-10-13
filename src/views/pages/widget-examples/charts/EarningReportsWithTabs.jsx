'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

// Third Party Imports
import classnames from 'classnames'

// Components Imports
import CustomAvatar from '@core/components/mui/Avatar'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))


const EarningReportsWithTabs = () => {
  const [tabData, setTabData] = useState([
    { 
      type: 'orders', 
      avatarIcon: 'tabler-shopping-cart', 
      series: [{ data: [28, 10, 46, 38, 15, 30, 35, 28, 8, 25, 12, 5] }] 
    },
    { 
      type: 'sales', 
      avatarIcon: 'tabler-chart-bar', 
      series: [{ data: [35, 25, 15, 40, 42, 25, 48, 8, 30, 41, 55, 24] }] 
    },
    { 
      type: 'profit', 
      avatarIcon: 'tabler-currency-dollar', 
      series: [{ data: [10, 22, 27, 33, 42, 32, 27, 22, 8, 51, 42, 25] }] 
    },
    {
      type: 'income',
      avatarIcon: 'tabler-chart-pie-2',
      series: [{ data: [5, 9, 12, 18, 20, 25, 30, 36, 48] }]
    }
  ])
  
  // States
  const [value, setValue] = useState('orders')
  const [open, setOpen] = useState(false)
  const [editIndex, setEditIndex] = useState(null)
  const [formData, setFormData] = useState({ type: '', series: '' }) 

  const theme = useTheme()
  const disabledText = 'var(--mui-palette-text-disabled)'

  const handleChange = (event, newValue) => {
    if (newValue === 'add') {
      setFormData({ type: '', series: '' })
      setEditIndex(null)
      setOpen(true)
    } else {
      setValue(newValue)
    }
  }

  const handleEdit = (index) => {
    setFormData({
      type: tabData[index].type,
      series: tabData[index].series[0].data.join(',')
    })
    setEditIndex(index)
    setOpen(true)
  }

  const handleSave = () => {
    const newSeries = formData.series.split(',').map(v => Number(v.trim()))
    let updated = [...tabData]

    if (editIndex !== null) {
      updated[editIndex] = { ...updated[editIndex], type: formData.type, series: [{ data: newSeries }] }
      setValue(formData.type)
    } else {
      updated.push({ type: formData.type, avatarIcon: 'tabler-chart-bar', series: [{ data: newSeries }] })
      setValue(formData.type)
    }

    setTabData(updated)
    setOpen(false)
  }

  const baseOptions = {
    chart: { parentHeightOffset: 0, toolbar: { show: false } },
    plotOptions: { bar: { borderRadius: 6, distributed: true, columnWidth: '33%' } },
    legend: { show: false },
    tooltip: { enabled: false },
    dataLabels: { enabled: false },
    grid: { show: false },
    xaxis: {
      categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      labels: { style: { colors: disabledText, fontFamily: theme.typography.fontFamily } }
    },
    yaxis: { labels: { style: { colors: disabledText, fontFamily: theme.typography.fontFamily } } }
  }

  return (
    <Card>
      <CardHeader title="Earning Reports" subheader="Manage and Edit Charts" />
      <CardContent>
        <TabContext value={value}>
          <TabList onChange={handleChange} variant="scrollable" scrollButtons="auto" className="!border-0 mbe-10">
            {tabData.map((item, index) => (
              <Tab
                key={index}
                value={item.type}
                label={
                  <div className="flex flex-col items-center justify-center gap-2 is-[110px] bs-[100px] border rounded-xl relative">
                    <CustomAvatar variant="rounded" skin="light" size={38}>
                      <i className={classnames('text-[22px]', item.avatarIcon)} />
                    </CustomAvatar>
                    <Typography>{item.type}</Typography>
                    <span
                      className="absolute top-2 right-2 cursor-pointer text-gray-500 hover:text-gray-800"
                      onClick={(e) => { e.stopPropagation(); handleEdit(index) }}
                    >
                      <i className="tabler-edit text-sm" />
                    </span>
                  </div>
                }
              />
            ))}
            <Tab
              value="add"
              label={
                <div className="flex flex-col items-center justify-center is-[110px] bs-[100px] border border-dashed rounded-xl">
                  <CustomAvatar variant="rounded" size={34}>
                    <i className="tabler-plus text-textSecondary" />
                  </CustomAvatar>
                </div>
              }
            />
          </TabList>

          {tabData.map((item, index) => {
            const data = item.series[0].data
            const maxValue = Math.max(...data)
            const dynamicColors = data.map(v =>
              v === maxValue ? 'var(--mui-palette-primary-main)' : 'var(--mui-palette-primary-lightOpacity)'
            )
            const dynamicOptions = { ...baseOptions, colors: dynamicColors }

            return (
              <TabPanel key={index} value={item.type} className="!p-0">
                <AppReactApexCharts type="bar" height={233} options={dynamicOptions} series={item.series} />
              </TabPanel>
            )
          })}
        </TabContext>
      </CardContent>

      {/* Modal para agregar/editar gráfica */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth='sm'>
        <DialogTitle>{editIndex !== null ? 'Edit Chart' : 'Add Chart'}</DialogTitle>
        <DialogContent>
          <TextField 
            fullWidth
            margin='normal'
            label='Chart Name'
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          />
          <TextField 
            fullWidth
            margin='normal'
            label='Values (comma separated)'
            value={formData.series}
            onChange={(e) => setFormData({ ...formData, series: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant='contained' onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

export default EarningReportsWithTabs
