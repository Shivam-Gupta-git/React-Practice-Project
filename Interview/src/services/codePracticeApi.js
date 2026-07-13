/**
 * API client for the Code Practice backend.
 * In dev, Vite proxies /api → http://localhost:3001
 */

const API_BASE = import.meta.env.VITE_API_URL || '/api'

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })

  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`)
  }

  return data
}

export async function fetchHealth() {
  return request('/health')
}

export async function fetchProblems() {
  return request('/problems')
}

export async function fetchProblem(id) {
  return request(`/problems/${id}`)
}

export async function runCode({ sourceCode, language, stdin }) {
  return request('/execute/run', {
    method: 'POST',
    body: JSON.stringify({ sourceCode, language, stdin }),
  })
}

export async function testCode({ sourceCode, language, problemId }) {
  return request('/execute/test', {
    method: 'POST',
    body: JSON.stringify({ sourceCode, language, problemId }),
  })
}

export async function explainCode({ sourceCode, language, problemTitle }) {
  return request('/ai/explain', {
    method: 'POST',
    body: JSON.stringify({ sourceCode, language, problemTitle }),
  })
}

export async function analyzeCode({ sourceCode, language, problemTitle }) {
  return request('/ai/analyze', {
    method: 'POST',
    body: JSON.stringify({ sourceCode, language, problemTitle }),
  })
}
