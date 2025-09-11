
import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';
import prisma from '../../../prisma/prismaClient';

export async function POST(req) {
  try {
    const { username, email, password } = await req.json()

    if (!username || !email || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
    }

    const hashedPassword = await hash(password, 12);
    const user = await prisma.user.create({
      data: {
        name: username,
        email,
        password: hashedPassword
      }
    });

    return NextResponse.json({ user: { id: user.id, username: user.name, email: user.email } }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}
