'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import DialogCloseButton from '../DialogCloseButton'
import ConfirmationDialog from '../confirmation-dialog'

const UpgradePlan = ({ open, setOpen }) => {
  // Estados
  const [openConfirmation, setOpenConfirmation] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState('Standard')
  const [currentPlan, setCurrentPlan] = useState('Standard')
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  const handleClose = () => setOpen(false)

  const handleUpgrade = () => {
    // Simular actualización de plan
    setCurrentPlan(selectedPlan)
    setSnackbarOpen(true)
    setTimeout(() => {
      setOpen(false)
    }, 1000)
  }

  return (
    <>
      {/* Modal principal */}
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        closeAfterTransition={false}
        sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
      >
        <DialogCloseButton onClick={() => setOpen(false)} disableRipple>
          <i className='tabler-x' />
        </DialogCloseButton>

        <DialogTitle
          variant='h4'
          className='flex flex-col gap-2 text-center sm:pbs-16 sm:pbe-6 sm:pli-16'
        >
          Upgrade Plan
          <Typography component='span' className='flex flex-col text-center'>
            Choose the best plan for user
          </Typography>
        </DialogTitle>

        <DialogContent className='overflow-visible pbs-0 sm:pli-16 sm:pbe-16'>
          <div className='flex items-end gap-4 flex-col sm:flex-row'>
            <CustomTextField
              select
              fullWidth
              label='Choose Plan'
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
            >
              <MenuItem value='Basic'>Basic - $0/month</MenuItem>
              <MenuItem value='Standard'>Standard - $99/month</MenuItem>
              <MenuItem value='Enterprise'>Enterprise - $499/month</MenuItem>
              <MenuItem value='Company'>Company - $999/month</MenuItem>
            </CustomTextField>

            <Button
              variant='contained'
              className='capitalize max-sm:is-full'
              onClick={handleUpgrade}
            >
              Upgrade
            </Button>
          </div>

          <Divider className='mlb-6' />

          <div className='flex flex-col gap-1'>
            <Typography variant='body2'>
              User current plan is {currentPlan} plan
            </Typography>
            <div className='flex items-center justify-between flex-wrap gap-2'>
              <div className='flex justify-center items-baseline gap-1'>
                <Typography component='sup' className='self-start mbs-3' color='primary.main'>
                  $
                </Typography>
                <Typography component='span' color='primary.main' variant='h1'>
                  {currentPlan === 'Basic'
                    ? 0
                    : currentPlan === 'Standard'
                    ? 99
                    : currentPlan === 'Enterprise'
                    ? 499
                    : 999}
                </Typography>
                <Typography variant='body2' component='sub' className='self-baseline'>
                  /month
                </Typography>
              </div>

              <Button
                variant='tonal'
                className='capitalize'
                color='error'
                onClick={() => setOpenConfirmation(true)}
              >
                Cancel Subscription
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de confirmación */}
      <ConfirmationDialog open={openConfirmation} setOpen={setOpenConfirmation} type='unsubscribe' />

      {/* Snackbar de éxito */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity='success'
          variant='filled'
          sx={{ width: '100%' }}
        >
          Plan upgraded successfully to {selectedPlan}!
        </Alert>
      </Snackbar>
    </>
  )
}

export default UpgradePlan
