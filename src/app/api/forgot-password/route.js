// src/app/api/forgot-password/route.js
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

const SECRET_KEY = process.env.JWT_SECRET || 'supersecretkey'

export async function POST(req) {
  try {
    console.log('ForgotPassword: request received');
    const { email } = await req.json();
    console.log('ForgotPassword: email received', email);

    if (!email) {
      console.log('ForgotPassword: email required');
      return new Response(JSON.stringify({ error: 'Email required' }), { status: 400 });
    }

    // Generar token válido por 1h
    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
    console.log('ForgotPassword: token generated', token);

    // Link a la página del reset-password-v2 (ajustado a la ruta real y con idioma por defecto 'en')
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/en/pages/auth/reset-password-v2?token=${token}`;
    console.log('ForgotPassword: resetUrl', resetUrl);

    // Configuración de Nodema
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    });
    console.log('ForgotPassword: transporter created');

    // Enviar correo real
    await transporter.sendMail({
      from: `"MyApp" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Reset your password',
      html: `
        <p>Hello,</p>
        <p>Click <a href="${resetUrl}">here</a> to reset your password.</p>
        <p>This link will expire in 1 hour.</p>
      `
    });
    console.log('ForgotPassword: email sent');

    return new Response(JSON.stringify({ message: 'Reset link sent ✅' }), { status: 200 });
  } catch (err) {
    console.error('ForgotPassword error:', err);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
