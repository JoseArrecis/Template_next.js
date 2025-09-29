'use client'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import { useColorScheme } from '@mui/material/styles'
import classnames from 'classnames'
import OptionMenu from '@core/components/option-menu'
import tableStyles from '@core/styles/table.module.css'
import jsPDF from 'jspdf'
import { useState } from 'react'

// Datos de prueba
const initialData = [
  { trend: '+$1,678', status: 'verified', cardType: 'Credit', cardNumber: '*4230', imgName: 'visa', date: `17 Mar ${new Date().getFullYear()}` },
  { trend: '-$839', status: 'rejected', cardType: 'Credit', cardNumber: '*5578', imgName: 'mastercard', date: `12 Feb ${new Date().getFullYear()}` },
  { trend: '+$435', cardType: 'ATM', status: 'verified', cardNumber: '*4567', imgName: 'american-express', date: `28 Feb ${new Date().getFullYear()}` },
  { trend: '+$2,345', status: 'pending', cardType: 'Credit', cardNumber: '*5699', imgName: 'visa', date: `08 Jan ${new Date().getFullYear()}` },
  { trend: '+$1,758', status: 'rejected', cardType: 'Credit', cardNumber: '*2451', imgName: 'visa', date: `19 Oct ${new Date().getFullYear()}` }
]

const statusObj = {
  rejected: { text: 'Rejected', color: 'error' },
  pending: { text: 'Pending', color: 'secondary' },
  'on-hold': { text: 'On hold', color: 'warning' },
  verified: { text: 'Verified', color: 'success' }
}

const cardTypes = ['Credit', 'ATM']
const cardImages = { Credit: ['visa', 'mastercard'], ATM: ['american-express'] }
const statuses = ['verified','rejected','pending','on-hold']

const LastTransaction = ({ serverMode }) => {
  const [progressData, setProgressData] = useState(initialData)
  const { mode } = useColorScheme()
  const _mode = (mode === 'system' ? serverMode : mode) || serverMode

  const handleMenuAction = (action) => {
    if (action === 'Refresh') {
      setProgressData(prev =>
        prev.map(row => ({
          ...row,
          trend: (Math.random() > 0.5 ? '+' : '-') + '$' + Math.floor(Math.random() * 5000),
          date: `${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')} ${
            ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][Math.floor(Math.random()*12)]
          } ${new Date().getFullYear()}`
        }))
      )
    } else if (action === 'Add') {
      const cardType = cardTypes[Math.floor(Math.random()*cardTypes.length)]
      const newRow = {
        trend: (Math.random() > 0.5 ? '+' : '-') + '$' + Math.floor(Math.random() * 5000),
        status: statuses[Math.floor(Math.random()*statuses.length)],
        cardType,
        cardNumber: '*' + Math.floor(1000 + Math.random()*9000),
        imgName: cardImages[cardType][Math.floor(Math.random()*cardImages[cardType].length)],
        date: `${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')} ${
          ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][Math.floor(Math.random()*12)]
        } ${new Date().getFullYear()}`
      }
      setProgressData(prev => [newRow, ...prev])
    }
  }

  const handleDownloadPDF = () => {
    const doc = new jsPDF()
    doc.setFontSize(16)
    doc.text('Reporte de Transacciones', 20, 20)

    let y = 40
    progressData.forEach((row, i) => {
      doc.setFontSize(12)
      doc.text(
        `${i + 1}. ${row.cardType} ${row.cardNumber} | ${row.date} | ${statusObj[row.status].text} | ${row.trend}`,
        20,
        y
      )
      y += 10
    })

    doc.save('transacciones.pdf')
  }

  return (
    <Card>
      <CardHeader
        title='Last Transaction'
        action={
          <OptionMenu
            options={[
              { text: 'Add', menuItemProps: { onClick: () => handleMenuAction('Add') } },
              { text: 'Refresh', menuItemProps: { onClick: () => handleMenuAction('Refresh') } }
            ]}
          />
        }
      />

      <div className='overflow-x-auto'>
        <table className={tableStyles.table}>
          <thead className='uppercase'>
            <tr className='border-be'>
              <th className='leading-6 plb-4 pis-6 pli-2'>Card</th>
              <th className='leading-6 plb-4 pli-2'>Date</th>
              <th className='leading-6 plb-4 pli-2'>Status</th>
              <th className='leading-6 plb-4 pie-6 pli-2 text-right'>Trend</th>
            </tr>
          </thead>
          <tbody>
            {progressData.map((row, index) => (
              <tr key={index} className='border-0'>
                <td className='pis-6 pli-2 plb-3'>
                  <div className='flex items-center gap-4'>
                    <Avatar
                      variant='rounded'
                      className={classnames('is-[50px] bs-[30px]', {
                        'bg-white': _mode === 'dark',
                        'bg-actionHover': _mode === 'light'
                      })}
                    >
                      <img width={30} alt={row.imgName} src={`/images/logos/${row.imgName}.png`} />
                    </Avatar>
                    <div className='flex flex-col'>
                      <Typography color='text.primary'>{row.cardNumber}</Typography>
                      <Typography variant='body2' color='text.disabled'>
                        {row.cardType}
                      </Typography>
                    </div>
                  </div>
                </td>
                <td className='pli-2 plb-3'>
                  <div className='flex flex-col'>
                    <Typography color='text.primary'>Sent</Typography>
                    <Typography variant='body2' color='text.disabled'>{row.date}</Typography>
                  </div>
                </td>
                <td className='pli-2 plb-3'>
                  <Chip
                    variant='tonal'
                    size='small'
                    label={statusObj[row.status].text}
                    color={statusObj[row.status].color}
                  />
                </td>
                <td className='pli-2 plb-3 pie-6 text-right'>
                  <Typography color='text.primary'>{row.trend}</Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='flex justify-end p-4'>
        <Button variant='contained' color='primary' onClick={handleDownloadPDF}>
          Descargar PDF
        </Button>
      </div>
    </Card>
  )
}

export default LastTransaction
