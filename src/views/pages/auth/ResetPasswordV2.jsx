'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Alert from '@mui/material/Alert'
import classnames from 'classnames'
import CustomTextField from '@core/components/mui/TextField'
import DirectionalIcon from '@components/DirectionalIcon'
import Logo from '@components/layout/shared/Logo'
import { useImageVariant } from '@core/hooks/useImageVariant'
import { useSettings } from '@core/hooks/useSettings'
import { getLocalizedUrl } from '@/utils/i18n'

const ResetPasswordIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  blockSize: 'auto',
  maxBlockSize: 650,
  maxInlineSize: '100%',
  margin: theme.spacing(12),
  [theme.breakpoints.down(1536)]: { maxBlockSize: 550 },
  [theme.breakpoints.down('lg')]: { maxBlockSize: 450 },
}))

const MaskImg = styled('img')({
  blockSize: 'auto',
  maxBlockSize: 330,
  inlineSize: '100%',
  position: 'absolute',
  insetBlockEnd: 0,
  zIndex: -1,
})

const ResetPasswordV2 = ({ mode }) => {
  const { lang: locale } = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const { settings } = useSettings()
  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  // Imagenes
  const darkImg = '/images/pages/auth-mask-dark.png'
  const lightImg = '/images/pages/auth-mask-light.png'
  const darkIllustration = '/images/illustrations/auth/v2-reset-password-dark.png'
  const lightIllustration = '/images/illustrations/auth/v2-reset-password-light.png'
  const authBackground = useImageVariant(mode, lightImg, darkImg)
  const characterIllustration = useImageVariant(mode, lightIllustration, darkIllustration)

  // States
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [token, setToken] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false)

  // Obtener token de URL
  useEffect(() => {
    const t = searchParams.get('token')
    console.log('Token from URL:', t)
    if (t) setToken(t)
  }, [searchParams])

  // Submit
  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    setMessage('')

    if (!password || !confirmPassword) return setError('Please fill all fields')
    if (password !== confirmPassword) return setError('Passwords do not match')
    if (!token) return setError('Token not found')

    setLoading(true)
    try {
  const res = await fetch(`${window.location.origin}/api/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong')
      setMessage('✅ Password changed successfully!')
      setTimeout(() => router.push(getLocalizedUrl('/pages/auth/login-v2', locale)), 2000)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex bs-full justify-center'>
      <div
        className={classnames(
          'flex bs-full items-center justify-center flex-1 min-bs-[100dvh] relative p-6 max-md:hidden',
          { 'border-ie': settings.skin === 'bordered' }
        )}
      >
        <ResetPasswordIllustration src={characterIllustration} alt='character-illustration' />
        {!hidden && <MaskImg alt='mask' src={authBackground} />}
      </div>

      <div className='flex justify-center items-center bs-full bg-backgroundPaper !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[480px]'>
        <Link
          href={getLocalizedUrl('/', locale)}
          className='absolute block-start-5 sm:block-start-[33px] inline-start-6 sm:inline-start-[38px]'
        >
          <Logo />
        </Link>

        <div className='flex flex-col gap-6 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset] mbs-11 sm:mbs-14 md:mbs-0'>
          <div className='flex flex-col gap-1'>
            <Typography variant='h4'>Reset Password 🔒</Typography>
            <Typography>
              Your new password must be different from previously used passwords
            </Typography>
          </div>

          <form noValidate autoComplete='off' onSubmit={handleSubmit} className='flex flex-col gap-6'>
            <CustomTextField
              autoFocus
              fullWidth
              label='New Password'
              placeholder='············'
              type={isPasswordShown ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={() => setIsPasswordShown(s => !s)}
                        onMouseDown={e => e.preventDefault()}
                      >
                        <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <CustomTextField
              fullWidth
              label='Confirm Password'
              placeholder='············'
              type={isConfirmPasswordShown ? 'text' : 'password'}
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={() => setIsConfirmPasswordShown(s => !s)}
                        onMouseDown={e => e.preventDefault()}
                      >
                        <i className={isConfirmPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Button fullWidth variant='contained' type='submit' disabled={loading}>
              {loading ? 'Processing...' : 'Set New Password'}
            </Button>
            {error && <Alert severity='error'>{error}</Alert>}
            {message && <Alert severity='success'>{message}</Alert>}

            <Typography className='flex justify-center items-center' color='primary.main'>
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

export default ResetPasswordV2
