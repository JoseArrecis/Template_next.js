'use client'

import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'

// Component Imports
import AddEditAddress from '@components/dialogs/add-edit-address'
import OpenDialogOnElementClick from '@components/dialogs/OpenDialogOnElementClick'

const initialData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@gmail.com',
  country: 'US',
  address1: '100 Water Plant Avenue,',
  address2: 'Building 1303 Wake Island',
  landmark: 'Near Water Plant',
  city: 'New York',
  state: 'Capholim',
  zipCode: '403114',
  taxId: 'TAX-875623',
  vatNumber: 'SDF754K77',
  contact: '+1(609) 933-44-22'
}

const BillingAddress = () => {
  const [address, setAddress] = useState(initialData)

  const handleUpdateAddress = updated => {
    setAddress(updated)
  }

  const buttonProps = {
    variant: 'contained',
    children: 'Edit Address',
    size: 'small',
    startIcon: <i className='tabler-edit' />
  }

  return (
    <Card>
      <CardHeader
        title='Billing Address'
        action={
          <OpenDialogOnElementClick
            element={Button}
            elementProps={buttonProps}
            dialog={AddEditAddress}
            dialogProps={{
              data: address,
              onUpdate: handleUpdateAddress
            }}
          />
        }
      />
      <CardContent>
        <Grid container>
          <Grid size={{ xs: 12, md: 6 }}>
            <table>
              <tbody>
                <tr>
                  <td className='p-1 pis-0 is-[150px]'>
                    <Typography className='font-medium'>Name:</Typography>
                  </td>
                  <td className='p-1'>
                    <Typography>{`${address.firstName} ${address.lastName}`}</Typography>
                  </td>
                </tr>
                <tr>
                  <td className='p-1 pis-0 is-[150px]'>
                    <Typography className='font-medium'>Billing Email:</Typography>
                  </td>
                  <td className='p-1'>
                    <Typography>{address.email}</Typography>
                  </td>
                </tr>
                <tr>
                  <td className='p-1 pis-0 is-[150px]'>
                    <Typography className='font-medium'>Tax ID:</Typography>
                  </td>
                  <td className='p-1'>
                    <Typography>{address.taxId}</Typography>
                  </td>
                </tr>
                <tr>
                  <td className='p-1 pis-0 is-[150px]'>
                    <Typography className='font-medium'>Billing Address:</Typography>
                  </td>
                  <td className='p-1'>
                    <Typography>{`${address.address1} ${address.address2}`}</Typography>
                  </td>
                </tr>
              </tbody>
            </table>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <table>
              <tbody>
                <tr>
                  <td className='p-1 pis-0 is-[150px]'>
                    <Typography className='font-medium'>City:</Typography>
                  </td>
                  <td className='p-1'>
                    <Typography>{address.city}</Typography>
                  </td>
                </tr>
                <tr>
                  <td className='p-1 pis-0 is-[150px]'>
                    <Typography className='font-medium'>State:</Typography>
                  </td>
                  <td className='p-1'>
                    <Typography>{address.state}</Typography>
                  </td>
                </tr>
                <tr>
                  <td className='p-1 pis-0 is-[150px]'>
                    <Typography className='font-medium'>Zip Code:</Typography>
                  </td>
                  <td className='p-1'>
                    <Typography>{address.zipCode}</Typography>
                  </td>
                </tr>
              </tbody>
            </table>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default BillingAddress
