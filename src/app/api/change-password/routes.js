import jwt from 'jsonwebtoken'
import { hash } from 'bcryptjs'
import { users } from '@/path-to-your-users'

const SECRET_KEY = process.env.JWT_SECRET

export async function POST(req) {
  const { token, password } = await req.json()
  if (!token || !password) return new Response(JSON.stringify({ error: 'Token and password required' }), { status: 400 })

  let payload
  try {
    payload = jwt.verify(token, SECRET_KEY)
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid or expired token' }), { status: 400 })
  }

  const user = await users.findOne({ email: payload.email })
  if (!user) return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 })

  user.password = await hash(password, 10)
  await user.save()

  return new Response(JSON.stringify({ message: 'Password updated successfully' }), { status: 200 })
}
