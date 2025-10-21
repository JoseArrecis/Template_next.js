import { hash } from 'bcryptjs'
import prisma from '@/prisma/prismaClient'
import nodemailer from 'nodemailer'

export async function POST(req) {
  try {
    const { username, email, password } = await req.json()

    if (!username || !email || !password) {
      return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 })
    }

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return new Response(JSON.stringify({ error: 'Email already registered' }), { status: 400 })
    }

    const hashedPassword = await hash(password, 12)

    const user = await prisma.user.create({
      data: { name: username, email, password: hashedPassword, emailVerified: null },
    })

    const code = Math.random().toString(36).substring(2, 8).toUpperCase()

    const expires = new Date(Date.now() + 2 * 60 * 1000) 
    await prisma.verificationToken.create({
      data: { identifier: email, token: code, expires },
    })

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    const html = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f7fa; padding: 40px; text-align: center;">
        <div style="max-width: 520px; margin: auto; background: #ffffff; padding: 35px; border-radius: 16px; box-shadow: 0 8px 24px rgba(0,0,0,0.08);">
          <h2 style="color: #7367f0; margin-bottom: 10px;">¡Hola!</h2>
          <p style="color: #4a4a4a; font-size: 16px; margin-bottom: 25px;">
            Gracias por registrarte. Para completar el proceso de verificación, por favor ingresa el siguiente código:
          </p>
          <div style="
            background-color: #7367f0;
            color: white;
            padding: 18px 35px;
            border-radius: 10px;
            font-size: 28px;
            font-weight: bold;
            letter-spacing: 4px;
            display: inline-block;
            margin: 20px 0;
            box-shadow: 0 4px 10px rgba(115,103,240,0.3);
          ">
            ${code}
          </div>
          <p style="color: #4a4a4a; font-size: 14px; margin-top: 10px;">
            Este código expirará en <strong>2 minutos</strong>. Asegúrate de ingresarlo a tiempo.
          </p>
          <p style="font-size: 13px; color: #777; margin-top: 25px; line-height: 1.6;">
            Si no solicitaste este código, por favor ignora este mensaje.<br>
            Este es un mensaje automático. No es necesario responder.
          </p>
        </div>
      </div>
    `

    await transporter.sendMail({
      from: `"Verificación Vuexy" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Código de verificación',
      html,
    })

    return new Response(JSON.stringify({ success: true, message: 'Verification email sent' }), { status: 200 })
  } catch (err) {
    console.error('Signup error:', err)
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 })
  }
}
