import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import prisma from '../../../prisma/prismaClient';

const SECRET_KEY = process.env.JWT_SECRET || 'supersecretkey';

export async function POST(req) {
  try {
    const { token, password } = await req.json();
    if (!token || !password) {
      return new Response(JSON.stringify({ error: 'Token and password required' }), { status: 400 });
    }
    const decoded = jwt.verify(token, SECRET_KEY);
    if (!decoded.email) {
      return new Response(JSON.stringify({ error: 'Token does not contain a valid email' }), { status: 400 });
    }
    const user = await prisma.user.findUnique({ where: { email: decoded.email } });
    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.update({ where: { email: decoded.email }, data: { password: hashedPassword } });
    return new Response(JSON.stringify({ message: '✅ Password reset successful' }), { status: 200 });
  } catch (err) {
    console.error('ResetPassword error:', err);
    return new Response(JSON.stringify({ error: 'Invalid or expired token' }), { status: 400 });
  }
}
