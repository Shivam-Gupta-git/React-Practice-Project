import axios from 'axios'

/**
 * LLM service for code explanation and efficiency analysis.
 * Uses any OpenAI-compatible chat completions API.
 * Falls back to a structured offline response when no API key is set.
 */

function getClient() {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey || apiKey === 'your_api_key_here') return null

  return axios.create({
    baseURL: process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    timeout: 60000,
  })
}

async function chatCompletion(systemPrompt, userPrompt) {
  const client = getClient()
  if (!client) return null

  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini'

  const { data } = await client.post('/chat/completions', {
    model,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    temperature: 0.3,
    max_tokens: 2000,
  })

  return data.choices[0]?.message?.content?.trim() || ''
}

/**
 * Generate a beginner-friendly step-by-step explanation of the code.
 */
export async function explainCode({ sourceCode, language, problemTitle }) {
  const systemPrompt = `You are a friendly programming tutor. Explain code clearly for beginners and intermediate learners.
Structure your response with these sections using markdown:
## Overview
## Step-by-Step Breakdown
## Key Concepts
## Tips for Beginners
Keep explanations concise but thorough. Use simple language.`

  const userPrompt = `Explain this ${language} solution for the problem "${problemTitle}":

\`\`\`${language}
${sourceCode}
\`\`\``

  const llmResponse = await chatCompletion(systemPrompt, userPrompt)

  if (llmResponse) {
    return { explanation: llmResponse, source: 'llm' }
  }

  // Offline fallback when no API key is configured
  return {
    explanation: `## Overview
This ${language} program solves **${problemTitle}**. Add an \`OPENAI_API_KEY\` to your server \`.env\` file to get AI-powered step-by-step explanations.

## Step-by-Step Breakdown
1. **Read input** — The program reads data from standard input (stdin).
2. **Process** — It applies the logic required by the problem (calculations, loops, conditions).
3. **Output** — Results are printed to stdout, which Judge0 captures for testing.

## Key Concepts
- **stdin/stdout**: Standard way competitive programming problems receive input and return output.
- **Variables**: Store intermediate values during computation.
- **Control flow**: \`if/else\` and loops direct which code runs.

## Tips for Beginners
- Run the code with the example inputs first before submitting.
- Read error messages carefully — compilation errors show the line number.
- Test edge cases like empty input, negative numbers, or single-element arrays.`,
    source: 'fallback',
  }
}

/**
 * Analyze time/space complexity and suggest optimizations.
 */
export async function analyzeEfficiency({ sourceCode, language, problemTitle }) {
  const systemPrompt = `You are a senior software engineer specializing in algorithms and code optimization.
Analyze the given code and respond in markdown with these sections:
## Time Complexity
State Big O notation and explain why.
## Space Complexity
State Big O notation and explain why.
## Inefficiencies
List specific inefficient patterns found (or state none found).
## Suggested Improvements
Give concrete alternative approaches or optimizations.
Be specific and educational.`

  const userPrompt = `Analyze the efficiency of this ${language} solution for "${problemTitle}":

\`\`\`${language}
${sourceCode}
\`\`\``

  const llmResponse = await chatCompletion(systemPrompt, userPrompt)

  if (llmResponse) {
    return { analysis: llmResponse, source: 'llm' }
  }

  return {
    analysis: `## Time Complexity
**O(n)** — Typical for problems that process each input element once. Configure \`OPENAI_API_KEY\` for precise analysis of your specific code.

## Space Complexity
**O(1)** to **O(n)** — Depends on whether extra arrays or data structures are allocated.

## Inefficiencies
- **Nested loops**: If you have loops inside loops, consider whether a hash map or sorting could reduce complexity.
- **Redundant computation**: Avoid recalculating the same value inside loops.
- **Unnecessary memory**: Don't store all intermediate results if only the final answer is needed.

## Suggested Improvements
1. Use built-in functions (\`max()\`, \`Math.max()\`) when they fit.
2. Early-exit loops when the answer is found.
3. Choose the right data structure (Set for lookups, Map for counting).`,
    source: 'fallback',
  }
}

export function isLlmConfigured() {
  const key = process.env.OPENAI_API_KEY
  return Boolean(key && key !== 'your_api_key_here')
}
