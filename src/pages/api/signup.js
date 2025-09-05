import { hash } from 'bcryptjs'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Aquí puedes agregar la lógica de usuario existente
    const existingUser = false
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' })
    }

    const hashedPassword = await hash(password, 12)

    const user = {
      id: Date.now(),
      username,
      email,
      password: hashedPassword
    }

    return res.status(201).json({ user: { id: user.id, username, email } })
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Internal server error' })
  }
}
