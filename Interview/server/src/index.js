import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import problemsRouter from './routes/problems.js'
import executeRouter from './routes/execute.js'
import aiRouter from './routes/ai.js'
import { isJudge0Configured } from './services/judge0.js'
import { isLlmConfigured } from './services/llm.js'

const app = express()
const PORT = process.env.PORT || 3001

// CORS — allow Vite dev server and production frontend
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
    methods: ['GET', 'POST'],
  }),
)

app.use(express.json({ limit: '100kb' }))

// Rate limit code execution to prevent abuse
const executeLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  message: { error: 'Too many execution requests. Please wait a minute.' },
})

const aiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: { error: 'Too many AI requests. Please wait a minute.' },
})

// Health check — shows which services are configured
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    services: {
      judge0: isJudge0Configured(),
      llm: isLlmConfigured(),
    },
  })
})

app.use('/api/problems', problemsRouter)
app.use('/api/execute', executeLimiter, executeRouter)
app.use('/api/ai', aiLimiter, aiRouter)

// Global error handler
app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`Code Practice API running on http://localhost:${PORT}`)
  console.log(`  Judge0: ${isJudge0Configured() ? 'configured' : 'NOT configured'}`)
  console.log(`  LLM:    ${isLlmConfigured() ? 'configured' : 'using fallback responses'}`)
})
