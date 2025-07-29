import express from 'express'
import { connectDB } from './db.js'
import jwt from 'jsonwebtoken'

const router = express.Router()
const SECRET = 'my_super_secret'

// middleware برای چک کردن توکن و شناسایی کاربر
function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization
    if (!authHeader) return res.status(401).json({ error: 'No token provided' })

    const token = authHeader.split(' ')[1]
    if (!token) return res.status(401).json({ error: 'Malformed token' })

    try {
        const decoded = jwt.verify(token, SECRET)
        req.userId = decoded.id
        next()
    } catch {
        return res.status(401).json({ error: 'Invalid token' })
    }
}

// گرفتن لیست تسک‌ها برای کاربر لاگین شده
router.get('/', authMiddleware, async (req, res) => {
    const db = await connectDB()
    const tasks = await db.all(`SELECT * FROM tasks WHERE userId = ?`, [req.userId])
    res.json(tasks)
})

// اضافه کردن تسک جدید
router.post('/', authMiddleware, async (req, res) => {
    const { title } = req.body
    if (!title) return res.status(400).json({ error: 'Title is required' })

    const db = await connectDB()
    await db.run(`INSERT INTO tasks (userId, title) VALUES (?, ?)`, [req.userId, title])
    res.json({ message: 'Task added' })
})
// تغییر وضعیت انجام شده یک تسک
router.put('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params
    const { done } = req.body
    const db = await connectDB()

    // فقط تسک‌های کاربر خودش رو تغییر می‌ده
    await db.run(
        `UPDATE tasks SET done = ? WHERE id = ? AND userId = ?`,
        [done ? 1 : 0, id, req.userId]
    )
    res.json({ message: 'Task updated' })
})

// حذف تسک
router.delete('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params
    const db = await connectDB()

    // فقط تسک‌های کاربر خودش رو حذف می‌کنه
    await db.run(`DELETE FROM tasks WHERE id = ? AND userId = ?`, [id, req.userId])
    res.json({ message: 'Task deleted' })
})


// ساخت جدول tasks اگر وجود نداره
const initTasksTable = async () => {
    const db = await connectDB()
    await db.exec(`CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER,
  title TEXT,
  done INTEGER DEFAULT 0
)`)

}
initTasksTable()

export default router
