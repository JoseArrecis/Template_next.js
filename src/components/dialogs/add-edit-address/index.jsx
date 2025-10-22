'use client'

import { useEffect, useState } from 'react'

// MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid2'
import MenuItem from '@mui/material/MenuItem'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import CustomInputVertical from '@core/components/custom-inputs/Vertical'
import DialogCloseButton from '../DialogCloseButton'
import CustomTextField from '@core/components/mui/TextField'

const countries = ['Select Country', 'France', 'Russia', 'China', 'UK', 'US']

const initialAddressData = {
  firstName: '',
  lastName: '',
  country: '',
  address1: '',
  address2: '',
  landmark: '',
  city: '',
  state: '',
  zipCode: ''
}

const customInputData = [
  {
    title: 'Home',
    content: 'Delivery Time (7am - 9pm)',
    value: 'home',
    isSelected: true,
    asset: 'tabler-home'
  },
  {
    title: 'Office',
    content: 'Delivery Time (10am - 6pm)',
    value: 'office',
    asset: 'tabler-building-skyscraper'
  }
]

const AddEditAddress = ({ open, setOpen, data, onUpdate }) => {
  const initialSelected = customInputData.find(item => item.isSelected)?.value || ''
  const [selected, setSelected] = useState(initialSelected)
  const [addressData, setAddressData] = useState(initialAddressData)

  useEffect(() => {
    setAddressData(data ?? initialAddressData)
  }, [data, open])

  const handleChange = prop => {
    if (typeof prop === 'string') setSelected(prop)
    else setSelected(prop.target.value)
  }

  const handleSubmit = () => {
    if (typeof onUpdate === 'function') {
      onUpdate(addressData)
    }
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      maxWidth='md'
      scroll='body'
      onClose={() => setOpen(false)}
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <DialogTitle variant='h4' className='flex flex-col text-center'>
        {data ? 'Edit Address' : 'Add New Address'}
        <Typography component='span'>
          {data ? 'Edit Address for future billing' : 'Add address for billing address'}
        </Typography>
      </DialogTitle>

      <form onSubmit={e => e.preventDefault()}>
        <DialogContent>
          <DialogCloseButton onClick={() => setOpen(false)}>
            <i className='tabler-x' />
          </DialogCloseButton>

          <Grid container spacing={4}>
            {customInputData.map((item, index) => {
              const asset = <i className={classnames(item.asset, 'text-[28px]')} />
              return (
                <Grid size={{ xs: 12, sm: 6 }} key={index}>
                  <CustomInputVertical
                    type='radio'
                    data={{ ...item, asset }}
                    selected={selected}
                    name='addressType'
                    handleChange={handleChange}
                  />
                </Grid>
              )
            })}

            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                fullWidth
                label='First Name'
                value={addressData.firstName}
                onChange={e => setAddressData({ ...addressData, firstName: e.target.value })}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                fullWidth
                label='Last Name'
                value={addressData.lastName}
                onChange={e => setAddressData({ ...addressData, lastName: e.target.value })}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <CustomTextField
                select
                fullWidth
                label='Country'
                value={addressData.country}
                onChange={e => setAddressData({ ...addressData, country: e.target.value })}
              >
                {countries.map((item, index) => (
                  <MenuItem key={index} value={index === 0 ? '' : item}>
                    {item}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <CustomTextField
                fullWidth
                label='Address Line 1'
                value={addressData.address1}
                onChange={e => setAddressData({ ...addressData, address1: e.target.value })}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <CustomTextField
                fullWidth
                label='Address Line 2'
                value={addressData.address2}
                onChange={e => setAddressData({ ...addressData, address2: e.target.value })}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                fullWidth
                label='Landmark'
                value={addressData.landmark}
                onChange={e => setAddressData({ ...addressData, landmark: e.target.value })}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                fullWidth
                label='City'
                value={addressData.city}
                onChange={e => setAddressData({ ...addressData, city: e.target.value })}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                fullWidth
                label='State'
                value={addressData.state}
                onChange={e => setAddressData({ ...addressData, state: e.target.value })}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                fullWidth
                label='Zip Code'
                value={addressData.zipCode}
                onChange={e => setAddressData({ ...addressData, zipCode: e.target.value })}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <FormControlLabel control={<Switch defaultChecked />} label='Make this default shipping address' />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions className='justify-center'>
          <Button variant='contained' onClick={handleSubmit}>
            {data ? 'Update' : 'Submit'}
          </Button>
          <Button variant='tonal' color='secondary' onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default AddEditAddress
