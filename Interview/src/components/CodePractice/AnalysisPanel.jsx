import { BookOpen, Sparkles } from 'lucide-react'

/**
 * Renders markdown-like AI explanation (simple formatting without extra deps).
 */
function renderMarkdown(text) {
  if (!text) return null

  return text.split('\n').map((line, i) => {
    if (line.startsWith('## ')) {
      return (
        <h3 key={i} className="text-sm font-bold text-slate-800 dark:text-slate-100 mt-4 mb-1">
          {line.replace('## ', '')}
        </h3>
      )
    }
    if (line.startsWith('### ')) {
      return (
        <h4 key={i} className="text-sm font-semibold text-slate-700 dark:text-slate-200 mt-3 mb-1">
          {line.replace('### ', '')}
        </h4>
      )
    }
    if (line.startsWith('- ') || line.startsWith('* ')) {
      return (
        <li key={i} className="text-sm text-slate-600 dark:text-slate-300 ml-4 list-disc">
          {line.replace(/^[-*] /, '')}
        </li>
      )
    }
    if (/^\d+\.\s/.test(line)) {
      return (
        <li key={i} className="text-sm text-slate-600 dark:text-slate-300 ml-4 list-decimal">
          {line.replace(/^\d+\.\s/, '')}
        </li>
      )
    }
    if (line.trim() === '') return <br key={i} />
    // Bold inline
    const formatted = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    return (
      <p
        key={i}
        className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: formatted }}
      />
    )
  })
}

export default function AnalysisPanel({ title, icon, content, source, loading, emptyMessage }) {
  const IconComponent = icon
  if (loading) {
    return (
      <div className="flex items-center justify-center h-32 text-sm text-slate-500">
        <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
        <span className="animate-pulse">Generating {title.toLowerCase()}...</span>
      </div>
    )
  }

  if (!content) {
    return (
      <p className="text-sm text-slate-400 text-center py-8">{emptyMessage}</p>
    )
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <IconComponent className="w-4 h-4 text-indigo-500" />
        <span className="text-xs text-slate-400">
          {source === 'llm' ? 'AI-generated' : 'Template (add API key for AI)'}
        </span>
      </div>
      <div className="prose-sm max-h-[400px] overflow-y-auto pr-2">
        {renderMarkdown(content)}
      </div>
    </div>
  )
}

export function ExplanationPanel(props) {
  return (
    <AnalysisPanel
      title="Explanation"
      icon={BookOpen}
      emptyMessage='Click "Explain Code" to get a step-by-step breakdown.'
      {...props}
      content={props.explanation}
    />
  )
}

export function EfficiencyPanel(props) {
  return (
    <AnalysisPanel
      title="Efficiency Analysis"
      icon={Sparkles}
      emptyMessage='Click "Analyze Efficiency" to see Big O complexity and optimization tips.'
      {...props}
      content={props.analysis}
    />
  )
}
