import express from 'express'
import pkg from 'pg'

const { Pool } = pkg

const app = express()
const port = 3000

app.use(express.json())

const pool = new Pool({
  host: 'postgres',
  user: 'postgres',
  password: 'postgres',
  database: 'notesdb',
})

app.get('/api/notes', async (req, res) => {
  const result = await pool.query('SELECT * FROM notes ORDER BY id DESC')
  res.json(result.rows)
})

app.post('/api/notes', async (req, res) => {
  const { content } = req.body

  if (!content) {
    return res.status(400).json({ error: 'Content is required' })
  }

  const result = await pool.query(
    'INSERT INTO notes (content) VALUES ($1) RETURNING *',
    [content]
  )

  res.status(201).json(result.rows[0])
})

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`)
})
