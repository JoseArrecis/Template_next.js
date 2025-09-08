'use client'

// Next Imports
import Link from 'next/link'
import { useParams, useSearchParams, useRouter } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import Logo from '@components/layout/shared/Logo'
import DirectionalIcon from '@components/DirectionalIcon'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

// Wrapper
import AuthIllustrationWrapper from './AuthIllustrationWrapper'
import { useState } from 'react'

const ChangePasswordV1 = () => {
  const { lang: locale } = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
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

    return (
        <div className="flex justify-center items-center min-h-screen bg-backgroundPaper">
            <div className="w-full max-w-md bg-surface rounded-2xl shadow-lg p-8">
            <Typography variant="h4" align="center" gutterBottom>
                Reset Password 🔑
            </Typography>
            <Typography align="center" className="mb-4">
                Enter your new password
            </Typography>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <CustomTextField
                type="password"
                label="New Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                fullWidth
                />
                <CustomTextField
                type="password"
                label="Confirm Password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                fullWidth
                />

                <Button type="submit" variant="contained" fullWidth disabled={loading}>
                {loading ? 'Saving...' : 'Change Password'}
                </Button>

                {error && <Alert severity="error">{error}</Alert>}
                {message && <Alert severity="success">{message}</Alert>}

                <Typography align="center" className="mt-4" color="primary.main">
                <Link href={getLocalizedUrl('/login', locale)} className="flex items-center justify-center gap-1.5">
                    <DirectionalIcon ltrIconClass="tabler-chevron-left" rtlIconClass="tabler-chevron-right" className="text-xl" />
                    <span>Back to login</span>
                </Link>
                </Typography>
            </form>
            </div>
        </div>
    )
}

export default ChangePasswordV1
