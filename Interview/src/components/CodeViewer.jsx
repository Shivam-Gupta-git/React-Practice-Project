import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { ChevronDown, ChevronUp, Copy, Check } from 'lucide-react'
import { useDashboard } from '../context/DashboardContext'

export default function CodeViewer({ code, filename = 'Component.jsx' }) {
  const [expanded, setExpanded] = useState(false)
  const [copied, setCopied] = useState(false)
  const { theme, showToast } = useDashboard()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      showToast('Code copied to clipboard!')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      showToast('Failed to copy code', 'error')
    }
  }

  return (
    <section className="mt-8" aria-labelledby="code-section-title">
      <div className="flex items-center justify-between gap-4 mb-4">
        <h2 id="code-section-title" className="text-xl font-bold text-slate-800 dark:text-slate-100">
          Source Code
        </h2>
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
          aria-expanded={expanded}
          aria-controls="code-viewer-panel"
        >
          {expanded ? (
            <>
              <ChevronUp className="w-4 h-4" aria-hidden="true" />
              Hide Code
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" aria-hidden="true" />
              Show Code
            </>
          )}
        </button>
      </div>

      <div
        id="code-viewer-panel"
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          expanded ? 'max-h-500 opacity-100' : 'max-h-0 opacity-0'
        }`}
        aria-hidden={!expanded}
      >
        <div className="rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-700/80 shadow-lg bg-slate-900/5 dark:bg-slate-900/50 backdrop-blur-sm">
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-100/80 dark:bg-slate-800/80 border-b border-slate-200/60 dark:border-slate-700/60">
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">{filename}</span>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Copy code to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy Code
                </>
              )}
            </button>
          </div>
          <SyntaxHighlighter
            language="jsx"
            style={theme === 'dark' ? oneDark : oneLight}
            customStyle={{
              margin: 0,
              padding: '1.25rem',
              fontSize: '0.8125rem',
              lineHeight: 1.6,
              background: theme === 'dark' ? '#0f172a' : '#f8fafc',
            }}
            showLineNumbers
            wrapLongLines
          >
            {code}
          </SyntaxHighlighter>
        </div>
      </div>
    </section>
  )
}
