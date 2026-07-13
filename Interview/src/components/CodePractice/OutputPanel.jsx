import { Terminal, AlertCircle, CheckCircle2 } from 'lucide-react'

/**
 * Displays stdout, stderr, and execution errors from a single code run.
 */
export default function OutputPanel({ result, customInput, onCustomInputChange, loading }) {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-32 text-sm text-slate-500">
        <span className="animate-pulse">Running code...</span>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="space-y-3">
        <label className="block text-xs font-medium text-slate-500 dark:text-slate-400">
          Custom Input (stdin)
        </label>
        <textarea
          value={customInput}
          onChange={(e) => onCustomInputChange(e.target.value)}
          placeholder="Enter input for your program..."
          rows={3}
          className="w-full px-3 py-2 text-sm font-mono rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-y"
        />
        <p className="text-xs text-slate-400">Click &quot;Run Code&quot; to see output here.</p>
      </div>
    )
  }

  const hasError = Boolean(result.error || result.compileOutput || result.stderr)

  return (
    <div className="space-y-3">
      {/* Status badge */}
      <div className="flex items-center gap-2">
        {result.success ? (
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
        ) : (
          <AlertCircle className="w-4 h-4 text-rose-500" />
        )}
        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
          {result.status}
        </span>
        {result.time && (
          <span className="text-xs text-slate-400 ml-auto">{result.time}s · {result.memory}KB</span>
        )}
      </div>

      {/* Custom input used */}
      {customInput && (
        <div>
          <p className="text-xs font-medium text-slate-500 mb-1">Input</p>
          <pre className="text-xs font-mono p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
            {customInput}
          </pre>
        </div>
      )}

      {/* Stdout */}
      {result.stdout && (
        <div>
          <p className="text-xs font-medium text-slate-500 mb-1 flex items-center gap-1">
            <Terminal className="w-3 h-3" /> Output
          </p>
          <pre className="text-sm font-mono p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-200 whitespace-pre-wrap border border-emerald-200/50 dark:border-emerald-800/50">
            {result.stdout}
          </pre>
        </div>
      )}

      {/* Errors */}
      {hasError && (
        <div>
          <p className="text-xs font-medium text-rose-500 mb-1">Error</p>
          <pre className="text-sm font-mono p-3 rounded-lg bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 whitespace-pre-wrap border border-rose-200/50 dark:border-rose-800/50 max-h-48 overflow-auto">
            {result.error || result.compileOutput || result.stderr}
          </pre>
        </div>
      )}

      {!result.stdout && !hasError && (
        <p className="text-sm text-slate-400 italic">No output produced.</p>
      )}
    </div>
  )
}
