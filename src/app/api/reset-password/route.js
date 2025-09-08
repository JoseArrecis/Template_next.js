import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const SECRET_KEY = process.env.JWT_SECRET || 'supersecretkey';

export async function POST(req) {
  try {
    const { email, lang } = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });

    const userLang = lang || 'en';

    const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/${userLang}/pages/auth/change-password-v2?token=${token}`;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, 
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Support" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Reset your password',
      html: `
        <h2>Reset your password</h2>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}" target="_blank">${resetLink}</a>
        <p>This link expires in 1 hour.</p>
      `
    });

    return new Response(
      JSON.stringify({ message: '✅ Reset link sent to your email!' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
