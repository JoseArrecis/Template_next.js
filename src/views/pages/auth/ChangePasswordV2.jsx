'use client'

// Next Imports
import Link from 'next/link'
import { useParams, useSearchParams, useRouter } from 'next/navigation'

// MUI Imports
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import Alert from '@mui/material/Alert'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import Logo from '@components/layout/shared/Logo'
import DirectionalIcon from '@components/DirectionalIcon'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'
import classnames from 'classnames'
import { useSettings } from '@core/hooks/useSettings'
import { useState } from 'react'

const MaskImg = styled('img')({
  blockSize: 'auto',
  maxBlockSize: 355,
  inlineSize: '100%',
  position: 'absolute',
  insetBlockEnd: 0,
  zIndex: -1
})

const ChangePasswordV2 = ({ mode }) => {
  const { lang: locale } = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const { settings } = useSettings()
  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  const token = searchParams.get('token')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    setError(null)
    setMessage(null)

    if (!password || !confirmPassword) {
      setError('Please fill all fields')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password })
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong')

      setMessage('✅ Password changed successfully!')
      setTimeout(() => router.push(getLocalizedUrl('/login', locale)), 2000)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const bgImage = mode === 'dark' ? '/images/pages/auth-mask-dark.png' : '/images/pages/auth-mask-light.png'

  return (
    <div className='flex bs-full justify-center relative min-bs-[100dvh]'>
      {!hidden && <MaskImg src={bgImage} alt='mask' />}
      <div className='flex justify-center items-center bs-full bg-backgroundPaper p-6 md:p-12 md:is-[480px]'>
        <Link href={getLocalizedUrl('/', locale)} className='absolute block-start-5 sm:block-start-[33px] inline-start-6 sm:inline-start-[38px]'>
          <Logo />
        </Link>
        <div className='flex flex-col gap-6'>
          <Typography variant='h4'>Reset Password 🔑</Typography>
          <Typography>Enter your new password</Typography>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <CustomTextField
              type='password'
              label='New Password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              fullWidth
              autoFocus
            />
            <CustomTextField
              type='password'
              label='Confirm Password'
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              fullWidth
            />
            <Button type='submit' variant='contained' fullWidth disabled={loading}>
              {loading ? 'Saving...' : 'Change Password'}
            </Button>
            {error && <Alert severity='error'>{error}</Alert>}
            {message && <Alert severity='success'>{message}</Alert>}
            <Typography className='flex justify-center items-center mt-4' color='primary.main'>
                <Link href={getLocalizedUrl('/pages/auth/login-v2', locale)} className='flex items-center gap-1.5'>
                    <DirectionalIcon ltrIconClass='tabler-chevron-left' rtlIconClass='tabler-chevron-right' className='text-xl' />
                    <span>Back to login</span>
                </Link>
            </Typography>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ChangePasswordV2
