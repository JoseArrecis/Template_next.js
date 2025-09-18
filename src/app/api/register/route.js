// src/app/api/signup/route.js
import { hash } from 'bcryptjs';
import prisma from '@/prisma/prismaClient'; // si usas prisma

export async function POST(req) {
  try {
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });
    }

    // Aquí verificas si el usuario ya existe, usando prisma u otra base
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return new Response(JSON.stringify({ error: 'Email already registered' }), { status: 400 });
    }

    const hashedPassword = await hash(password, 12);

    const user = await prisma.user.create({
      data: { username, email, password: hashedPassword },
    });

    return new Response(JSON.stringify({ user: { id: user.id, username, email } }), { status: 201 });
  } catch (err) {
    console.error('Signup error:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
