import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const SECRET_KEY = process.env.JWT_SECRET || 'supersecretkey'

// Ejemplo de base de datos temporal
let users = [
  { email: 'jose@test.com', password: '$2a$10$xxxxxxxxxx' }
]

export async function POST(req) {
  try {
    const { token, password } = await req.json()

    if (!token || !password) {
      return new Response(JSON.stringify({ error: 'Token and password required' }), { status: 400 })
    }

    const decoded = jwt.verify(token, SECRET_KEY)
    const user = users.find(u => u.email === decoded.email)

    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 })
    }

    // Hash de la nueva contraseña
    const hashedPassword = await bcrypt.hash(password, 10)
    user.password = hashedPassword

    return new Response(JSON.stringify({ message: '✅ Password reset successful' }), { status: 200 })
  } catch (err) {
    console.error('ResetPassword error:', err)
    return new Response(JSON.stringify({ error: 'Invalid or expired token' }), { status: 400 })
  }
}
