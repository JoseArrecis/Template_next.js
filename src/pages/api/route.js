import { hash } from 'bcryptjs'
import { NextResponse } from 'next/server'

export async function POST(req) {
  try {
    const { username, email, password } = await req.json()

    if (!username || !email || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const existingUser = false
    if (existingUser) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 400 })
    }

    const hashedPassword = await hash(password, 12)
    const user = { id: Date.now(), username, email, password: hashedPassword }

    return NextResponse.json({ user: { id: user.id, username, email } }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}
