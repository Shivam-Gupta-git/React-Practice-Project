import Editor from '@monaco-editor/react'
import { useDashboard } from '../../context/DashboardContext'

/**
 * Monaco Editor wrapper with syntax highlighting, line numbers, and auto-indent.
 * Theme syncs with the dashboard light/dark mode.
 */
export default function CodeEditorPanel({ value, onChange, language }) {
  const { theme } = useDashboard()

  return (
    <div className="h-full min-h-[320px] rounded-xl overflow-hidden border border-slate-200/60 dark:border-slate-700/60">
      <Editor
        height="100%"
        language={language}
        value={value}
        onChange={(val) => onChange(val ?? '')}
        theme={theme === 'dark' ? 'vs-dark' : 'light'}
        options={{
          fontSize: 14,
          lineNumbers: 'on',
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          insertSpaces: true,
          wordWrap: 'on',
          padding: { top: 12, bottom: 12 },
          renderLineHighlight: 'line',
          smoothScrolling: true,
          cursorBlinking: 'smooth',
          bracketPairColorization: { enabled: true },
        }}
        loading={
          <div className="flex items-center justify-center h-full text-sm text-slate-500">
            Loading editor...
          </div>
        }
      />
    </div>
  )
}
