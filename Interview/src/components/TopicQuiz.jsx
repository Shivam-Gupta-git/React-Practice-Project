import React, { useState } from 'react'
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Award, Sparkles, Loader2, ChevronLeft, ChevronRight, Check } from 'lucide-react'
import { topicQuizzes } from '../data/topicQuizzes'
import { generateAIQuiz } from '../services/codePracticeApi'
import { useDashboard } from '../hooks/useDashboard'

export default function TopicQuiz({ topicId, topicTitle }) {
  const { showToast } = useDashboard()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [aiQuestions, setAiQuestions] = useState(null)
  const [loadingAI, setLoadingAI] = useState(false)
  const [useAiMode, setUseAiMode] = useState(false)

  // Generate 10 standard fallback questions for topics without explicit arrays
  const create10DefaultQuestions = (title) => [
    {
      question: `How does ${title} fit into React's unidirectional data flow?`,
      options: [
        'By allowing child components to mutate parent state directly',
        'By keeping state and props flow top-down, predictable, and traceable',
        'By bypassing virtual DOM reconciliation',
        'By disabling event listeners on window resize',
      ],
      correct: 1,
      explanation: `${title} enforces clean top-down data architecture, ensuring state flow remains predictable across child components.`,
    },
    {
      question: `Which scenario represents a major anti-pattern when implementing ${title}?`,
      options: [
        'Validating component parameters with TypeScript or PropTypes',
        'Mutating state objects directly inside render or handler bodies',
        'Keeping component functions pure and side-effect free during render',
        'Using functional state updates when calculating new state',
      ],
      correct: 1,
      explanation: 'Direct state mutation bypasses React setter detection, skipping reconciliation and causing silent UI bugs.',
    },
    {
      question: `What is the recommended strategy for testing components built with ${title}?`,
      options: [
        'Inspecting private state variables via internal component instances',
        'Using React Testing Library to test user-centric DOM interactions',
        'Disabling test suites in production builds',
        'Relying solely on manual browser reloads',
      ],
      correct: 1,
      explanation: 'React Testing Library advocates testing components from the user perspective (screen.getByRole / userEvent).',
    },
    {
      question: `How does React 18 Concurrent Rendering impact ${title}?`,
      options: [
        'It executes all renders in a single synchronous blocking loop',
        'It breaks rendering into yieldable units to keep the UI input responsive',
        'It disables component mounting',
        'It converts React JSX into server-side PHP scripts',
      ],
      correct: 1,
      explanation: 'React 18 Concurrent mode enables interruptible rendering so urgent user keystrokes take priority over heavy renders.',
    },
    {
      question: `What happens when component dependencies related to ${title} are omitted in hooks?`,
      options: [
        'Callbacks capture stale closures referencing outdated state or prop values',
        'React injects dependencies automatically at build time',
        'The application crashes with a compiler error',
        'Browser garbage collection is paused',
      ],
      correct: 0,
      explanation: 'Omitting hook dependencies creates stale closures, causing function handlers to reference old state variables.',
    },
    {
      question: `Why is immutability crucial when updating state in ${title}?`,
      options: [
        'It allows React to perform instantaneous reference equality checks (old !== new)',
        'It prevents JavaScript garbage collection',
        'It turns components into static HTML files',
        'It speeds up CSS transition animations',
      ],
      correct: 0,
      explanation: 'Immutability allows React to compare references shallowly (`prev !== next`) to trigger reconciliation instantly.',
    },
    {
      question: `How does React.memo optimize components utilizing ${title}?`,
      options: [
        'By shallowly comparing incoming props and skipping re-renders if unchanged',
        'By performing a 100-level deep recursive check on all variables',
        'By storing component state in browser cookies',
        'By removing component DOM nodes permanently',
      ],
      correct: 0,
      explanation: 'React.memo performs shallow prop comparisons (`prevProps === nextProps`) to skip unnecessary render cycles.',
    },
    {
      question: `What is the best practice for managing side-effects alongside ${title}?`,
      options: [
        'Isolating side-effects in useEffect or handler functions instead of the render body',
        'Executing API calls directly inside the JSX return statement',
        'Modifying document.title during component reconciliation',
        'Using sync while loops inside render',
      ],
      correct: 0,
      explanation: 'Side-effects (data fetching, DOM subscriptions) must be kept out of pure render logic and placed inside useEffect.',
    },
    {
      question: `How should you structure complex nested data structures in ${title}?`,
      options: [
        'Keep state normalized (flattened) to avoid deep nested mutation bugs',
        'Nest state arrays 10 levels deep inside single objects',
        'Store everything in global window variables',
        'Use stringified HTML blocks',
      ],
      correct: 0,
      explanation: 'Normalized (flat) state structures simplify updating individual items without cloning deeply nested objects.',
    },
    {
      question: `When should you refactor or optimize components using ${title}?`,
      options: [
        'Prematurely on every component before writing logic',
        'After measuring real performance bottlenecks using React DevTools Profiler',
        'Never under any circumstances',
        'Only when changing CSS frameworks',
      ],
      correct: 1,
      explanation: 'Always profile rendering bottlenecks using React DevTools Profiler before adding memoization utilities.',
    },
  ]

  const get10StandardQuestions = () => {
    const existing = topicQuizzes[topicId] || []
    if (existing.length >= 10) return existing.slice(0, 10)
    const defaults = create10DefaultQuestions(topicTitle)
    return [...existing, ...defaults.slice(existing.length)].slice(0, 10)
  }

  const standard10 = get10StandardQuestions()
  const activeQuestions = useAiMode && aiQuestions?.length > 0 ? aiQuestions.slice(0, 10) : standard10

  const handleSelect = (oIdx) => {
    if (submitted) return
    setSelectedAnswers((prev) => ({ ...prev, [currentIndex]: oIdx }))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, activeQuestions.length - 1))
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  const score = Object.keys(selectedAnswers).reduce((acc, qIdx) => {
    return selectedAnswers[qIdx] === activeQuestions[qIdx]?.correct ? acc + 1 : acc
  }, 0)

  const handleReset = () => {
    setSelectedAnswers({})
    setSubmitted(false)
    setCurrentIndex(0)
  }

  const handleGenerateAI = async () => {
    setLoadingAI(true)
    try {
      const data = await generateAIQuiz({ topicTitle })
      if (data.questions?.length > 0) {
        setAiQuestions(data.questions)
        setUseAiMode(true)
        setSelectedAnswers({})
        setSubmitted(false)
        setCurrentIndex(0)
        showToast(data.source === 'llm' ? 'Generated 10 AI Interview Questions!' : 'Generated 10 Fallback AI Questions!')
      }
    } catch (err) {
      showToast(err.message, 'error')
    } finally {
      setLoadingAI(false)
    }
  }

  const answeredCount = Object.keys(selectedAnswers).length
  const currentQ = activeQuestions[currentIndex]
  const userSel = selectedAnswers[currentIndex]
  const isCorrect = userSel === currentQ?.correct

  return (
    <section className="space-y-4" aria-labelledby="quiz-section-title">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 id="quiz-section-title" className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Test Your Understanding (10 Questions Drill)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Interactive Carousel Quiz. Answer 10 questions for {topicTitle}.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {aiQuestions?.length > 0 && (
            <button
              type="button"
              onClick={() => {
                setUseAiMode((m) => !m)
                setSelectedAnswers({})
                setSubmitted(false)
                setCurrentIndex(0)
              }}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition"
            >
              {useAiMode ? 'Switch to Standard 10 Deck' : 'Switch to AI 10 Deck ✨'}
            </button>
          )}

          <button
            type="button"
            onClick={handleGenerateAI}
            disabled={loadingAI}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white disabled:opacity-50 transition shadow-md shadow-purple-600/20"
          >
            {loadingAI ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 text-purple-200" />}
            <span>{loadingAI ? 'Generating 10 AI Questions...' : 'AI Generate 10 Questions ✨'}</span>
          </button>

          {submitted && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono font-bold">
              <Award className="w-4 h-4 text-indigo-400" /> Score: {score} / {activeQuestions.length}
            </div>
          )}
        </div>
      </div>

      {/* Carousel Container */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-xl space-y-6 relative overflow-hidden">
        {/* Step Indicator Bar */}
        <div className="flex items-center justify-between gap-1 overflow-x-auto pb-2 border-b border-slate-200/60 dark:border-slate-800/60">
          {activeQuestions.map((_, idx) => {
            const isAnswered = selectedAnswers[idx] !== undefined
            const isCurrent = idx === currentIndex
            const isRight = submitted && selectedAnswers[idx] === activeQuestions[idx].correct

            return (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`flex-1 min-w-[32px] py-1.5 rounded-xl text-xs font-mono font-bold transition-all duration-200 flex items-center justify-center gap-1 ${
                  isCurrent
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 scale-105'
                    : isRight
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : isAnswered
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700/80 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <span>{idx + 1}</span>
                {isAnswered && !submitted && <Check className="w-3 h-3 text-indigo-400" />}
              </button>
            )
          })}
        </div>

        {/* Carousel Active Question Slide */}
        <div className="space-y-5 animate-fade-in min-h-[260px]">
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs font-mono font-bold text-indigo-500 uppercase tracking-wider">
              Question {currentIndex + 1} of {activeQuestions.length}
            </span>
            <div className="flex items-center gap-2">
              {useAiMode && (
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  AI Generated
                </span>
              )}
              <span className="text-xs font-mono text-slate-400">
                {selectedAnswers[currentIndex] !== undefined ? 'Answered ✓' : 'Unanswered'}
              </span>
            </div>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
            {currentQ?.question}
          </h3>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQ?.options.map((opt, oIdx) => {
              let btnStyle = 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700/80 hover:border-indigo-500/50'

              if (userSel === oIdx) {
                btnStyle = 'bg-indigo-600 text-white border-indigo-600 font-semibold shadow-md shadow-indigo-600/20'
              }

              if (submitted) {
                if (oIdx === currentQ.correct) {
                  btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                } else if (userSel === oIdx) {
                  btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-300 font-bold'
                }
              }

              return (
                <button
                  key={oIdx}
                  type="button"
                  onClick={() => handleSelect(oIdx)}
                  disabled={submitted}
                  className={`w-full p-3.5 rounded-2xl border text-left text-xs transition-all duration-200 flex items-center justify-between gap-2.5 ${btnStyle}`}
                >
                  <span className="leading-relaxed">{opt}</span>
                  {submitted && oIdx === currentQ.correct && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  )}
                  {submitted && userSel === oIdx && oIdx !== currentQ.correct && (
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  )}
                </button>
              )
            })}
          </div>

          {/* Answer Explanation Box */}
          {submitted && (
            <div
              className={`p-4 rounded-2xl text-xs space-y-1 animate-fade-in ${
                isCorrect
                  ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-300'
                  : 'bg-rose-500/10 border border-rose-500/20 text-rose-300'
              }`}
            >
              <p className="font-bold flex items-center gap-1.5">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Correct!
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-rose-400" /> Incorrect
                  </>
                )}
              </p>
              <p className="text-slate-300 leading-relaxed text-[11px]">{currentQ.explanation}</p>
            </div>
          )}
        </div>

        {/* Carousel Bottom Navigation & Submit Bar */}
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-200/60 dark:border-slate-800/60">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-40 text-slate-700 dark:text-slate-200 transition"
              title="Previous question"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={currentIndex === activeQuestions.length - 1}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-40 text-slate-700 dark:text-slate-200 transition"
              title="Next question"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="text-xs font-mono text-slate-500 hidden sm:block">
            {answeredCount === 10 ? 'All 10 answered!' : `${answeredCount} of 10 answered`}
          </div>

          <div className="flex items-center gap-2">
            {submitted ? (
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake Drill</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setSubmitted(true)}
                disabled={answeredCount === 0}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition"
              >
                <span>Submit & Evaluate ({answeredCount}/10)</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
