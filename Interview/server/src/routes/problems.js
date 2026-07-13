import { Router } from 'express'
import { problems, getProblemById } from '../data/problems.js'

const router = Router()

/** GET /api/problems — list all practice problems */
router.get('/', (_req, res) => {
  const list = problems.map(({ id, title, difficulty, category, description, examples }) => ({
    id,
    title,
    difficulty,
    category,
    description,
    examples,
  }))
  res.json({ problems: list })
})

/** GET /api/problems/:id — full problem with starter code & public test cases */
router.get('/:id', (req, res) => {
  const problem = getProblemById(req.params.id)
  if (!problem) {
    return res.status(404).json({ error: 'Problem not found' })
  }

  // Return test cases without hidden flag values for client display
  res.json({
    problem: {
      ...problem,
      testCases: problem.testCases.map((tc) => ({
        input: tc.input,
        expectedOutput: tc.expectedOutput,
      })),
    },
  })
})

export default router
