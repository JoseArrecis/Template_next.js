// src/app/api/forgot-password/route.js
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const SECRET_KEY = process.env.JWT_SECRET || 'supersecretkey';

let users = [
  { email: 'andre.arrecisvargas@gmail.com', password: 'oldhashedpassword' }
];

// Configuración de Nodemailer (puedes usar Gmail o cualquier SMTP)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const user = users.find(u => u.email === email);
    if (!user) {
      return new Response(
        JSON.stringify({ error: 'User not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Generar token temporal de 1 hora
    const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1h' });

    // Crear URL para reset de contraseña
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/pages/auth/reset-password-v2?token=${token}`;

    // Enviar correo con Nodemailer
    await transporter.sendMail({
      from: `"Support" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Password Reset',
      html: `
        <p>Hello,</p>
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>This link will expire in 1 hour.</p>
      `
    });

    return new Response(
      JSON.stringify({ message: 'Reset link sent successfully ✅' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
