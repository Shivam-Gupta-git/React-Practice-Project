import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { ChevronDown, ChevronUp, Copy, Check, Download, Code2 } from 'lucide-react'
import { useDashboard } from '../hooks/useDashboard'

export default function CodeViewer({ code, filename = 'Component.jsx' }) {
  const [expanded, setExpanded] = useState(true)
  const [copied, setCopied] = useState(false)
  const { showToast } = useDashboard()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      showToast(`Copied ${filename} code to clipboard!`)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      showToast('Failed to copy code', 'error')
    }
  }

  const handleDownload = () => {
    try {
      const blob = new Blob([code], { type: 'text/javascript' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      showToast(`Downloaded ${filename}`)
    } catch {
      showToast('Failed to download file', 'error')
    }
  }

  return (
    <section className="space-y-4" aria-labelledby="code-section-title">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <h2 id="code-section-title" className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Full Source Code
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Complete, ready-to-use React component. Copy or download to use in your projects.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Copy full component code"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span className="font-bold text-emerald-200">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Full Code</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium border border-slate-200 dark:border-slate-700/80 transition-colors"
            title="Download file"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Download</span>
          </button>

          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium border border-slate-200 dark:border-slate-700/80 transition-colors"
            aria-expanded={expanded}
          >
            {expanded ? (
              <>
                <ChevronUp className="w-4 h-4" />
                <span className="hidden sm:inline">Collapse</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                <span className="hidden sm:inline">Expand Code</span>
              </>
            )}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800/80 shadow-2xl bg-slate-950 backdrop-blur-2xl animate-fade-in">
          {/* Top header bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-xs font-mono text-slate-300 font-semibold ml-2">{filename}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-slate-500">
                {code.split('\n').length} lines · Scrollable
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy Code'}
              </button>
            </div>
          </div>

          <div className="max-h-[500px] overflow-auto custom-scrollbar">
            <SyntaxHighlighter
              language="jsx"
              style={oneDark}
              customStyle={{
                margin: 0,
                padding: '1.25rem',
                fontSize: '0.8125rem',
                lineHeight: 1.6,
                background: 'transparent',
                fontFamily: 'var(--font-mono)',
              }}
              showLineNumbers
              wrapLongLines
            >
              {code}
            </SyntaxHighlighter>
          </div>
        </div>
      )}
    </section>
  )
}
