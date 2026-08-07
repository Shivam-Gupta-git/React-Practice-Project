import React, { useState, useEffect } from 'react'
import { HelpCircle, RefreshCw, CheckCircle2, RotateCw, Sparkles, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { useDashboard } from '../hooks/useDashboard'
import { generateAIFlashcards } from '../services/codePracticeApi'

export default function TopicFlashcards({ topicId, topicTitle, questions, keyPoints }) {
  const { showToast } = useDashboard()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [masteredMap, setMasteredMap] = useState({})
  const [aiCards, setAiCards] = useState(null)
  const [loadingAI, setLoadingAI] = useState(false)
  const [useAiMode, setUseAiMode] = useState(false)

  // Load mastered flashcards from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`flashcards-mastered-${topicId}`)
      if (saved) {
        setMasteredMap(JSON.parse(saved))
      } else {
        setMasteredMap({})
      }
    } catch {
      setMasteredMap({})
    }
  }, [topicId])

  const activeQuestions = useAiMode && aiCards?.length > 0 ? aiCards : (questions || [])

  if (!activeQuestions || activeQuestions.length === 0) return null

  const currentItem = activeQuestions[currentIndex]
  const isMastered = Boolean(masteredMap[`${useAiMode ? 'ai-' : ''}${currentIndex}`])

  const toggleMastered = (idx) => {
    const key = `${useAiMode ? 'ai-' : ''}${idx}`
    const next = { ...masteredMap, [key]: !masteredMap[key] }
    setMasteredMap(next)
    try {
      localStorage.setItem(`flashcards-mastered-${topicId}`, JSON.stringify(next))
    } catch {}
    if (!masteredMap[key]) {
      showToast(`Question marked as Mastered! 🎉`)
    }
  }

  const handleNext = () => {
    setIsFlipped(false)
    setCurrentIndex((prev) => (prev + 1) % activeQuestions.length)
  }

  const handlePrev = () => {
    setIsFlipped(false)
    setCurrentIndex((prev) => (prev - 1 + activeQuestions.length) % activeQuestions.length)
  }

  const handleGenerateAI = async () => {
    setLoadingAI(true)
    try {
      const data = await generateAIFlashcards({ topicTitle })
      if (data.flashcards?.length > 0) {
        setAiCards(data.flashcards)
        setUseAiMode(true)
        setCurrentIndex(0)
        setIsFlipped(false)
        showToast(data.source === 'llm' ? 'AI Flashcards Generated!' : 'Generated Fallback AI Flashcards!')
      }
    } catch (err) {
      showToast(err.message, 'error')
    } finally {
      setLoadingAI(false)
    }
  }

  const masteredCount = Object.keys(masteredMap).filter((k) => masteredMap[k]).length

  // Answer formatting for Static vs AI mode
  const getAnswer = () => {
    if (useAiMode && typeof currentItem === 'object') {
      return {
        summary: currentItem.summary,
        points: currentItem.points,
      }
    }

    if (currentIndex === 0) {
      return {
        summary: keyPoints?.why || 'Core fundamental concept in React architecture.',
        points: keyPoints?.advantages || ['Enables modular components', 'Predictable data flow'],
      }
    } else if (currentIndex === 1) {
      return {
        summary: keyPoints?.limitations?.[0] || 'Requires understanding React component lifecycle and state boundaries.',
        points: keyPoints?.limitations || ['Read-only props', 'Requires lifting state up for sibling updates'],
      }
    } else {
      return {
        summary: `Key interview response for ${topicTitle}: Focus on real-world application, state immutability, and React re-render optimization.`,
        points: keyPoints?.interviewQuestions || [],
      }
    }
  }

  const questionText = typeof currentItem === 'string' ? currentItem : currentItem.question
  const answer = getAnswer()

  return (
    <section className="space-y-4" aria-labelledby="flashcards-title">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 id="flashcards-title" className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Interview Flashcard Drill
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Flip cards to test your interview memory. Space-repetition review for {topicTitle}.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {aiCards?.length > 0 && (
            <button
              type="button"
              onClick={() => {
                setUseAiMode((m) => !m)
                setCurrentIndex(0)
                setIsFlipped(false)
              }}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition"
            >
              {useAiMode ? 'Switch to Standard Deck' : 'Switch to AI Deck ✨'}
            </button>
          )}

          <button
            type="button"
            onClick={handleGenerateAI}
            disabled={loadingAI}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white disabled:opacity-50 transition shadow-md shadow-purple-600/20"
          >
            {loadingAI ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 text-purple-200" />}
            <span>{loadingAI ? 'Generating...' : 'AI Generate Questions ✨'}</span>
          </button>

          <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400 px-2.5 py-1 rounded-full bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800/50">
            {masteredCount} / {activeQuestions.length} Mastered
          </span>
        </div>
      </div>

      {/* Interactive Card */}
      <div className="relative min-h-[250px]">
        <div
          onClick={() => setIsFlipped((f) => !f)}
          className={`w-full min-h-[250px] p-6 sm:p-8 rounded-3xl cursor-pointer select-none transition-all duration-300 border shadow-xl flex flex-col justify-between relative overflow-hidden ${
            isFlipped
              ? 'bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 border-indigo-500/40 text-slate-100'
              : 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border-slate-200/80 dark:border-slate-800/80 text-slate-900 dark:text-white hover:border-indigo-500/40'
          }`}
        >
          {/* Card Top Meta */}
          <div className="flex items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-mono font-semibold text-indigo-500 uppercase tracking-wider">
                Card {currentIndex + 1} of {activeQuestions.length} {isFlipped ? '· Answer' : '· Question'}
              </span>
              {useAiMode && (
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  AI Generated
                </span>
              )}
            </div>

            <span className="text-slate-400 text-[11px] font-mono flex items-center gap-1">
              <RotateCw className="w-3 h-3 text-indigo-400" /> Click to flip
            </span>
          </div>

          {/* Card Main Content */}
          <div className="my-5">
            {!isFlipped ? (
              <div className="space-y-3 animate-fade-in">
                <span className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60">
                  Interview Question
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold leading-snug">
                  {questionText}
                </h3>
              </div>
            ) : (
              <div className="space-y-3 animate-fade-in text-slate-100">
                <span className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Senior Developer Answer
                </span>
                <p className="text-sm font-medium leading-relaxed text-slate-200">
                  {answer.summary}
                </p>
                {answer.points?.length > 0 && (
                  <ul className="space-y-1 text-xs text-slate-300">
                    {answer.points.map((pt, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-emerald-400 font-bold">✓</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          {/* Card Bottom Controls */}
          <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-200/40 dark:border-slate-800/40" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition"
                title="Previous card"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition"
                title="Next card"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => toggleMastered(currentIndex)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                isMastered
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isMastered ? 'Mastered ✓' : 'Mark Mastered'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
