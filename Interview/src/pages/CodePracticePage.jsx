import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import {
  Play,
  FlaskConical,
  BookOpen,
  Sparkles,
  RotateCcw,
  ChevronLeft,
  Code2,
  Terminal,
  ListChecks,
  Moon,
  Sun,
} from 'lucide-react'
import { useDashboard } from '../context/DashboardContext'
import CodeEditorPanel from '../components/CodePractice/CodeEditorPanel'
import OutputPanel from '../components/CodePractice/OutputPanel'
import TestResultsPanel from '../components/CodePractice/TestResultsPanel'
import { ExplanationPanel, EfficiencyPanel } from '../components/CodePractice/AnalysisPanel'
import { LANGUAGES, DIFFICULTY_COLORS } from '../data/practiceConfig'
import {
  fetchProblems,
  fetchProblem,
  runCode,
  testCode,
  explainCode,
  analyzeCode,
  fetchHealth,
} from '../services/codePracticeApi'

const TABS = [
  { id: 'output', label: 'Output', icon: Terminal },
  { id: 'tests', label: 'Test Results', icon: ListChecks },
  { id: 'explain', label: 'Explanation', icon: BookOpen },
  { id: 'efficiency', label: 'Efficiency', icon: Sparkles },
]

export default function CodePracticePage() {
  const { theme, toggleTheme, showToast } = useDashboard()

  // Problem & editor state
  const [problems, setProblems] = useState([])
  const [selectedProblemId, setSelectedProblemId] = useState('')
  const [problem, setProblem] = useState(null)
  const [language, setLanguage] = useState('javascript')
  const [code, setCode] = useState('')
  const [customInput, setCustomInput] = useState('')

  // Results state
  const [activeTab, setActiveTab] = useState('output')
  const [runResult, setRunResult] = useState(null)
  const [testResult, setTestResult] = useState(null)
  const [explanation, setExplanation] = useState(null)
  const [explanationSource, setExplanationSource] = useState(null)
  const [analysis, setAnalysis] = useState(null)
  const [analysisSource, setAnalysisSource] = useState(null)

  // Loading flags
  const [loadingRun, setLoadingRun] = useState(false)
  const [loadingTest, setLoadingTest] = useState(false)
  const [loadingExplain, setLoadingExplain] = useState(false)
  const [loadingAnalyze, setLoadingAnalyze] = useState(false)
  const [services, setServices] = useState({ judge0: false, llm: false })

  // Load problem list on mount
  useEffect(() => {
    fetchProblems()
      .then((data) => {
        setProblems(data.problems)
        if (data.problems.length > 0) {
          setSelectedProblemId(data.problems[0].id)
        }
      })
      .catch(() => showToast('Failed to load problems. Is the backend running?', 'error'))

    fetchHealth()
      .then((data) => setServices(data.services))
      .catch(() => {})
  }, [showToast])

  // Load problem details when selection changes (language handled separately)
  useEffect(() => {
    if (!selectedProblemId) return

    fetchProblem(selectedProblemId)
      .then((data) => {
        setProblem(data.problem)
        setCode(data.problem.starterCode[language] || '')
        setCustomInput(data.problem.examples?.[0]?.input || '')
        setRunResult(null)
        setTestResult(null)
        setExplanation(null)
        setAnalysis(null)
      })
      .catch(() => showToast('Failed to load problem details', 'error'))
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only reload on problem change
  }, [selectedProblemId, showToast])

  // Update starter code when language changes
  const handleLanguageChange = useCallback(
    (newLang) => {
      setLanguage(newLang)
      if (problem?.starterCode?.[newLang]) {
        setCode(problem.starterCode[newLang])
      }
      setRunResult(null)
      setTestResult(null)
    },
    [problem],
  )

  const handleResetCode = () => {
    if (problem?.starterCode?.[language]) {
      setCode(problem.starterCode[language])
      showToast('Code reset to starter template')
    }
  }

  const handleRun = async () => {
    setLoadingRun(true)
    setRunResult(null)
    setActiveTab('output')
    try {
      const data = await runCode({ sourceCode: code, language, stdin: customInput })
      setRunResult(data.result)
    } catch (err) {
      showToast(err.message, 'error')
      setRunResult({ success: false, status: 'Error', error: err.message })
    } finally {
      setLoadingRun(false)
    }
  }

  const handleTest = async () => {
    setLoadingTest(true)
    setTestResult(null)
    setActiveTab('tests')
    try {
      const data = await testCode({
        sourceCode: code,
        language,
        problemId: selectedProblemId,
      })
      setTestResult(data.testResult)
      if (data.testResult.summary.allPassed) {
        showToast('All test cases passed!')
      } else {
        showToast(`${data.testResult.summary.failed} test(s) failed`, 'error')
      }
    } catch (err) {
      showToast(err.message, 'error')
    } finally {
      setLoadingTest(false)
    }
  }

  const handleExplain = async () => {
    setLoadingExplain(true)
    setExplanation(null)
    setActiveTab('explain')
    try {
      const data = await explainCode({
        sourceCode: code,
        language,
        problemTitle: problem?.title,
      })
      setExplanation(data.explanation)
      setExplanationSource(data.source)
    } catch (err) {
      showToast(err.message, 'error')
    } finally {
      setLoadingExplain(false)
    }
  }

  const handleAnalyze = async () => {
    setLoadingAnalyze(true)
    setAnalysis(null)
    setActiveTab('efficiency')
    try {
      const data = await analyzeCode({
        sourceCode: code,
        language,
        problemTitle: problem?.title,
      })
      setAnalysis(data.analysis)
      setAnalysisSource(data.source)
    } catch (err) {
      showToast(err.message, 'error')
    } finally {
      setLoadingAnalyze(false)
    }
  }

  const monacoLanguage = LANGUAGES.find((l) => l.id === language)?.monaco || 'javascript'

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-indigo-50/40 to-purple-50/30 dark:from-slate-950 dark:via-indigo-950/40 dark:to-purple-950/20">
      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-700/60">
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 max-w-[1600px] mx-auto">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-indigo-600 transition"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Dashboard</span>
            </Link>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-indigo-500 text-white">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-base font-bold text-slate-900 dark:text-white">Code Practice</h1>
                <p className="text-xs text-slate-500">Interactive coding module</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Service status indicators */}
            <span
              className={`hidden sm:inline text-xs px-2 py-0.5 rounded-full ${
                services.judge0
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                  : 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
              }`}
              title="Judge0 code execution service"
            >
              Judge0 {services.judge0 ? '✓' : '✗'}
            </span>
            <span
              className={`hidden sm:inline text-xs px-2 py-0.5 rounded-full ${
                services.llm
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                  : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
              }`}
              title="LLM for explanations"
            >
              AI {services.llm ? '✓' : 'fallback'}
            </span>
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto p-4 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
          {/* Left: Problem description */}
          <aside className="lg:col-span-3 space-y-4">
            {/* Problem selector */}
            <div className="rounded-2xl bg-white/60 dark:bg-slate-800/40 backdrop-blur-md border border-white/50 dark:border-slate-700/50 p-4 shadow-sm">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Problem
              </label>
              <select
                value={selectedProblemId}
                onChange={(e) => setSelectedProblemId(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              >
                {problems.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title} ({p.difficulty})
                  </option>
                ))}
              </select>
            </div>

            {/* Problem details */}
            {problem && (
              <div className="rounded-2xl bg-white/60 dark:bg-slate-800/40 backdrop-blur-md border border-white/50 dark:border-slate-700/50 p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                    {problem.title}
                  </h2>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${DIFFICULTY_COLORS[problem.difficulty]}`}
                  >
                    {problem.difficulty}
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {problem.description}
                </p>

                {problem.examples?.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-slate-400 uppercase">Examples</p>
                    {problem.examples.map((ex, i) => (
                      <div
                        key={i}
                        className="text-xs font-mono p-2 rounded-lg bg-slate-50 dark:bg-slate-900/50"
                      >
                        <div>
                          <span className="text-slate-400">Input: </span>
                          <span className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
                            {ex.input}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400">Output: </span>
                          <span className="text-emerald-600 dark:text-emerald-400 whitespace-pre-wrap">
                            {ex.output}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </aside>

          {/* Center: Code editor */}
          <section className="lg:col-span-5 flex flex-col gap-3">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="px-3 py-2 text-sm rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 font-medium"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.id} value={lang.id}>
                    {lang.label}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={handleResetCode}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>

              <div className="flex-1" />

              <button
                type="button"
                onClick={handleRun}
                disabled={loadingRun}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 disabled:opacity-50 transition shadow-sm"
              >
                <Play className="w-3.5 h-3.5" />
                Run Code
              </button>

              <button
                type="button"
                onClick={handleTest}
                disabled={loadingTest}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-xl bg-indigo-500 text-white hover:bg-indigo-600 disabled:opacity-50 transition shadow-sm"
              >
                <FlaskConical className="w-3.5 h-3.5" />
                Run Tests
              </button>
            </div>

            {/* Editor */}
            <div className="flex-1 min-h-[400px] lg:min-h-[500px]">
              <CodeEditorPanel
                value={code}
                onChange={setCode}
                language={monacoLanguage}
              />
            </div>

            {/* AI action buttons */}
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleExplain}
                disabled={loadingExplain}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-sm rounded-xl border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 disabled:opacity-50 transition"
              >
                <BookOpen className="w-3.5 h-3.5" />
                Explain Code
              </button>
              <button
                type="button"
                onClick={handleAnalyze}
                disabled={loadingAnalyze}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-sm rounded-xl border border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/30 disabled:opacity-50 transition"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Analyze Efficiency
              </button>
            </div>
          </section>

          {/* Right: Output / Results panels */}
          <section className="lg:col-span-4">
            <div className="rounded-2xl bg-white/60 dark:bg-slate-800/40 backdrop-blur-md border border-white/50 dark:border-slate-700/50 shadow-sm overflow-hidden">
              {/* Tab bar */}
              <div className="flex border-b border-slate-200/60 dark:border-slate-700/60 overflow-x-auto">
                {TABS.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-1.5 px-4 py-3 text-xs sm:text-sm font-medium whitespace-nowrap transition border-b-2 ${
                        activeTab === tab.id
                          ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/20'
                          : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {tab.label}
                    </button>
                  )
                })}
              </div>

              {/* Tab content */}
              <div className="p-4">
                {activeTab === 'output' && (
                  <OutputPanel
                    result={runResult}
                    customInput={customInput}
                    onCustomInputChange={setCustomInput}
                    loading={loadingRun}
                  />
                )}
                {activeTab === 'tests' && (
                  <TestResultsPanel testResult={testResult} loading={loadingTest} />
                )}
                {activeTab === 'explain' && (
                  <ExplanationPanel
                    explanation={explanation}
                    source={explanationSource}
                    loading={loadingExplain}
                  />
                )}
                {activeTab === 'efficiency' && (
                  <EfficiencyPanel
                    analysis={analysis}
                    source={analysisSource}
                    loading={loadingAnalyze}
                  />
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
