import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const SECRET_KEY = process.env.JWT_SECRET || 'supersecretkey';

export async function POST(req) {
  const { email } = await req.json();

  if (!email) {
    return new Response(JSON.stringify({ error: 'Email required' }), { status: 400 });
  }

  // Generar token temporal
  const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });

  // URL para reset password v2
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/pages/auth/reset-password-v2?token=${token}`;

  // Configurar transporte de correo
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  // Enviar correo
  await transporter.sendMail({
    from: `"MyApp" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetUrl}">here</a> to reset your password</p>`,
  });

  return new Response(JSON.stringify({ message: 'Reset link sent ✅' }), { status: 200 });
}
