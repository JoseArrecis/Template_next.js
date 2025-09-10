import { NextResponse } from 'next/server';
import prisma from '../../../prisma/prismaClient';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  const { email, password } = await req.json();
  const user = await prisma.user.findUnique({ where: { email } });
  if (user && user.password) {
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      const { password: _, ...filteredUserData } = user;
      return NextResponse.json(filteredUserData);
    }
    return NextResponse.json(
      { message: ['Email or Password is invalid'] },
      { status: 401, statusText: 'Unauthorized Access' }
    );
  } else {
    return NextResponse.json(
      { message: ['Email or Password is invalid'] },
      { status: 401, statusText: 'Unauthorized Access' }
    );
  }
}
