'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { getLocalizedUrl } from '@/utils/i18n'

export default function VerifyPage() {
  const { lang: locale } = useParams()

  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email')

  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [timeLeft, setTimeLeft] = useState(120) 
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleChange = (value, index) => {
    if (/^[A-Za-z0-9]?$/.test(value)) {
      const newCode = [...code]
      newCode[index] = value.toUpperCase()
      setCode(newCode)

      if (value && index < 5) {
        document.getElementById(`code-${index + 1}`).focus()
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    const fullCode = code.join('')
    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: fullCode })
      })

      const data = await res.json()

      if (res.ok) {
        setMessage({ type: 'success', text: 'Cuenta verificada con éxito. Redirigiendo...' })
        setTimeout(() => router.push('/login'), 2500)
      } else {
        setMessage({ type: 'error', text: data.error || 'Código inválido o expirado.' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error del servidor. Intenta de nuevo.' })
    }

    setLoading(false)
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-100 to-blue-50">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-[420px] border border-white-100">
        <h1 className="text-center text-3xl font-semibold text-indigo-700 mb-3">
          Verifica tu correo
        </h1>
        <p className="text-center text-gray-600 text-sm mb-6">
          Ingresa el código de 6 dígitos enviado a <br />
          <span className="font-medium text-white-800">{email}</span>
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-5">
          <div className="flex justify-center gap-3">
            {code.map((digit, i) => (
            <input
            key={i}
            id={`code-${i}`}
            type="text"
            value={digit}
            onChange={(e) => handleChange(e.target.value, i)}
            maxLength={1}
            className="w-11 h-12 text-center border border-gray-300 rounded-lg text-lg font-semibold text-white bg-gray-700 focus:outline-none focus:border-indigo-500 transition-all"
            />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading || timeLeft === 0}
            className={`w-full py-3 rounded-full text-white font-medium transition-all ${
              loading || timeLeft === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 shadow-md'
            }`}
          >
            {loading ? 'Verificando...' : 'Verificar'}
          </button>

          <button
            type='button'
            onClick={() => router.push(getLocalizedUrl('/register', locale))}
            disabled={loading}
            className={`w-full py-3 rounded-full text-white font-medium transition-all ${
                loading || timeLeft === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 shadow-md'
            }`}
          >
          Back to Register
          </button>

          <p className="text-sm text-gray-500">
            Tiempo restante:{' '}
            <span className="font-medium">
              {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
            </span>
          </p>

          {message && (
            <p
              className={`text-sm text-center font-medium ${
                message.type === 'error' ? 'text-red-500' : 'text-green-600'
              }`}
            >
              {message.text}
            </p>
          )}
        </form>
      </div>
    </div>
  )
}
