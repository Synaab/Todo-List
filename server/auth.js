import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { connectDB } from './db.js'

const router = express.Router()
const SECRET = 'my_super_secret' 

const initDB = async () => {
    const db = await connectDB()
    await db.exec(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    )`)
}
initDB()

router.post('/signup', async (req, res) => {
    const { username, password } = req.body
    const db = await connectDB()

    try {
        const hashed = await bcrypt.hash(password, 10)
        await db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, hashed])
        res.json({ message: 'User registered successfully' })
    } catch (err) {
        res.status(400).json({ error: 'Username already exists' })
    }
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body
    const db = await connectDB()

    const user = await db.get(`SELECT * FROM users WHERE username = ?`, [username])
    if (!user) return res.status(401).json({ error: 'User not found' })

    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(401).json({ error: 'Wrong password' })

    const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '1h' })
    res.json({ token })
})

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) return res.sendStatus(401)

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

router.get('/me', authenticateToken, async (req, res) => {
  const db = await connectDB()
  const user = await db.get(`SELECT id, username FROM users WHERE id = ?`, [req.user.id])
  if (!user) return res.status(404).json({ error: 'User not found' })
  res.json(user)
})
export default router
