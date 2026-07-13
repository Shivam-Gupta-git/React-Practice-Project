import { CheckCircle2, XCircle } from 'lucide-react'

/**
 * Shows pass/fail results for each test case after submission.
 */
export default function TestResultsPanel({ testResult, loading }) {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-32 text-sm text-slate-500">
        <span className="animate-pulse">Running test cases...</span>
      </div>
    )
  }

  if (!testResult) {
    return (
      <p className="text-sm text-slate-400 text-center py-8">
        Click &quot;Run Tests&quot; to check your solution against all test cases.
      </p>
    )
  }

  const { results, summary } = testResult

  return (
    <div className="space-y-4">
      {/* Summary bar */}
      <div
        className={`flex items-center justify-between p-3 rounded-xl ${
          summary.allPassed
            ? 'bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/50 dark:border-emerald-800/50'
            : 'bg-amber-50 dark:bg-amber-950/30 border border-amber-200/50 dark:border-amber-800/50'
        }`}
      >
        <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
          {summary.allPassed ? 'All tests passed!' : `${summary.failed} test(s) failed`}
        </span>
        <span className="text-sm font-mono text-slate-500">
          {summary.passed}/{summary.total} passed
        </span>
      </div>

      {/* Individual results */}
      <div className="space-y-2 max-h-[400px] overflow-y-auto">
        {results.map((tc) => (
          <div
            key={tc.index}
            className={`p-3 rounded-lg border text-sm ${
              tc.passed
                ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200/50 dark:border-emerald-800/30'
                : 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-200/50 dark:border-rose-800/30'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              {tc.passed ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              ) : (
                <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
              )}
              <span className="font-medium text-slate-700 dark:text-slate-200">
                Test Case {tc.index}
              </span>
            </div>

            <div className="grid gap-1.5 text-xs font-mono pl-6">
              <div>
                <span className="text-slate-400">Input: </span>
                <span className="text-slate-600 dark:text-slate-300 whitespace-pre-wrap">
                  {tc.input}
                </span>
              </div>
              <div>
                <span className="text-slate-400">Expected: </span>
                <span className="text-emerald-600 dark:text-emerald-400 whitespace-pre-wrap">
                  {tc.expectedOutput}
                </span>
              </div>
              {!tc.passed && (
                <div>
                  <span className="text-slate-400">Got: </span>
                  <span className="text-rose-600 dark:text-rose-400 whitespace-pre-wrap">
                    {tc.actualOutput}
                  </span>
                </div>
              )}
              {tc.error && (
                <div>
                  <span className="text-rose-500">Error: {tc.error}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
