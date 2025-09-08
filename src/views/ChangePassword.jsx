'use client'

import { useState } from 'react'
import { useSearchParams, useParams, useRouter } from 'next/navigation'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import CustomTextField from '@core/components/mui/TextField'
import Link from 'next/link'
import { getLocalizedUrl } from '@/utils/i18n'

const ChangePassword = () => {
  const params = useParams()
  const locale = params.lang
  const searchParams = useSearchParams()
  const router = useRouter()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  const token = searchParams.get('token') 

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
        body: JSON.stringify({ token, password }),
        cache: 'no-store'
      });

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

  return (
    <div className='flex justify-center items-center min-h-screen p-6 bg-backgroundPaper'>
      <div className='flex flex-col gap-6 w-full max-w-md'>
        <Typography variant='h4'>Reset Password 🔑</Typography>
        <Typography>Enter your new password</Typography>

        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <CustomTextField type='password' label='New Password' value={password} onChange={e => setPassword(e.target.value)} fullWidth />
          <CustomTextField type='password' label='Confirm Password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} fullWidth />

          <Button type='submit' variant='contained' disabled={loading}>
            {loading ? 'Saving...' : 'Change Password'}
          </Button>

          {error && <Alert severity='error'>{error}</Alert>}
          {message && <Alert severity='success'>{message}</Alert>}

          <Typography className='flex justify-center items-center' color='primary.main'>
            <Link href={getLocalizedUrl('/login', locale)}>Back to login</Link>
          </Typography>
        </form>
      </div>
    </div>
  )
}

export default ChangePassword
