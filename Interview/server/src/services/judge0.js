import axios from 'axios'

/**
 * Judge0 language IDs used by this project.
 * Execution is fully sandboxed inside Judge0 containers — user code never runs on our server.
 */
const LANGUAGE_IDS = {
  javascript: 63,
  python: 71,
  java: 62,
  cpp: 54,
}

const STATUS = {
  1: 'In Queue',
  2: 'Processing',
  3: 'Accepted',
  4: 'Wrong Answer',
  5: 'Time Limit Exceeded',
  6: 'Compilation Error',
  7: 'Runtime Error (SIGSEGV)',
  8: 'Runtime Error (SIGXFSZ)',
  9: 'Runtime Error (SIGFPE)',
  10: 'Runtime Error (SIGABRT)',
  11: 'Runtime Error (NZEC)',
  12: 'Runtime Error (Other)',
  13: 'Internal Error',
  14: 'Exec Format Error',
}

function getClient() {
  const baseURL = process.env.JUDGE0_BASE_URL || 'http://localhost:2358'
  const headers = { 'Content-Type': 'application/json' }

  // RapidAPI headers when using hosted Judge0
  if (process.env.JUDGE0_RAPIDAPI_KEY) {
    headers['X-RapidAPI-Key'] = process.env.JUDGE0_RAPIDAPI_KEY
    headers['X-RapidAPI-Host'] =
      process.env.JUDGE0_RAPIDAPI_HOST || 'judge0-ce.p.rapidapi.com'
  }

  return axios.create({ baseURL, headers, timeout: 30000 })
}

function decodeField(value) {
  if (!value) return ''
  try {
    return Buffer.from(value, 'base64').toString('utf8')
  } catch {
    return value
  }
}

function encodeField(value) {
  return Buffer.from(value, 'utf8').toString('base64')
}

/**
 * Submit code to Judge0 and poll until finished.
 */
export async function executeCode({ sourceCode, language, stdin = '' }) {
  const languageId = LANGUAGE_IDS[language]
  if (!languageId) {
    throw new Error(`Unsupported language: ${language}`)
  }

  const client = getClient()

  const payload = {
    source_code: encodeField(sourceCode),
    language_id: languageId,
    stdin: stdin ? encodeField(stdin) : undefined,
    // Safety limits — prevent infinite loops / memory bombs
    cpu_time_limit: 2,
    memory_limit: 128000,
    wall_time_limit: 5,
  }

  let submission
  try {
    const { data } = await client.post('/submissions?base64_encoded=true&wait=false', payload)
    submission = data
  } catch (err) {
    const msg = err.response?.data?.message || err.message
    throw new Error(
      `Judge0 unavailable. Start Judge0 with Docker or configure RapidAPI keys. Details: ${msg}`,
    )
  }

  // Poll for result (max ~15 seconds)
  let result = submission
  const token = submission.token
  for (let i = 0; i < 30; i++) {
    if (result.status && result.status.id > 2) break
    await sleep(500)
    const { data } = await client.get(`/submissions/${token}?base64_encoded=true`)
    result = data
  }

  const statusId = result.status?.id
  const stdout = decodeField(result.stdout).trimEnd()
  const stderr = decodeField(result.stderr)
  const compileOutput = decodeField(result.compile_output)
  const message = decodeField(result.message)

  return {
    status: STATUS[statusId] || 'Unknown',
    statusId,
    stdout,
    stderr,
    compileOutput,
    message,
    time: result.time,
    memory: result.memory,
    success: statusId === 3,
    error:
      statusId === 6
        ? compileOutput || 'Compilation failed'
        : statusId >= 7 && statusId <= 12
          ? stderr || message || 'Runtime error'
          : statusId === 5
            ? 'Time limit exceeded'
            : null,
  }
}

/**
 * Run code against multiple test cases and compare outputs.
 */
export async function runTestCases({ sourceCode, language, testCases }) {
  const results = []

  for (let i = 0; i < testCases.length; i++) {
    const tc = testCases[i]
    const execution = await executeCode({
      sourceCode,
      language,
      stdin: tc.input,
    })

    const actual = execution.stdout.trim()
    const expected = tc.expectedOutput.trim()
    const passed = execution.success && actual === expected

    results.push({
      index: i + 1,
      input: tc.input,
      expectedOutput: expected,
      actualOutput: actual || '(no output)',
      passed,
      error: execution.error,
      stderr: execution.stderr,
      time: execution.time,
      hidden: tc.hidden ?? false,
    })
  }

  const passedCount = results.filter((r) => r.passed).length

  return {
    results,
    summary: {
      total: results.length,
      passed: passedCount,
      failed: results.length - passedCount,
      allPassed: passedCount === results.length,
    },
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function isJudge0Configured() {
  return Boolean(process.env.JUDGE0_BASE_URL || process.env.JUDGE0_RAPIDAPI_KEY)
}
