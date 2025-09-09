// src/app/api/forgot-password/route.js
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

const SECRET_KEY = process.env.JWT_SECRET || 'supersecretkey'

export async function POST(req) {
  try {
    const { email } = await req.json()

    if (!email) {
      return new Response(JSON.stringify({ error: 'Email required' }), { status: 400 })
    }

    // Generar token válido por 1h
    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' })

    // Link a la página del reset-password-v2
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/pages/auth/reset-password-v2?token=${token}`

    // Configuración de Nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    })

    // Enviar correo
    await transporter.sendMail({
      from: `"MyApp" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Reset your password',
      html: `
        <p>Hello,</p>
        <p>Click <a href="${resetUrl}">here</a> to reset your password.</p>
        <p>This link will expire in 1 hour.</p>
      `
    })

    return new Response(JSON.stringify({ message: 'Reset link sent ✅' }), { status: 200 })
  } catch (err) {
    console.error('ForgotPassword error:', err)
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 })
  }
}
