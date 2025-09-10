import { NextResponse } from 'next/server'
import { users } from './users'
import bcrypt from 'bcryptjs'

export async function POST(req) {
  // Vars
  const { email, password } = await req.json()
    const user = await prisma.user.findUnique({ where: { email } });
  let response = null

    if (user && user.email && user.id) {
    const { password: _, ...filteredUserData } = user

    response = {
      ...filteredUserData
    }

    return NextResponse.json(response)
  } else {
      // Busca el campo password en la tabla User, si lo tienes, o usa otro campo personalizado
      // Aquí asumimos que tienes un campo 'password' en User (debes agregarlo si no existe)
      if (!user.password) {
        return NextResponse.json({ message: ['No password set for this user'] }, { status: 401, statusText: 'Unauthorized Access' });
      }
      const valid = await bcrypt.compare(password, user.password);
      if (valid) {
        const { password: _, ...filteredUserData } = user;
        return NextResponse.json(filteredUserData);
      }
  }
    return NextResponse.json(
      { message: ['Email or Password is invalid'] },
      { status: 401, statusText: 'Unauthorized Access' }
    );
}
