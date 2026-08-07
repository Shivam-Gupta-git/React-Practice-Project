import React from 'react'
import useToggle from './useToggle'
import { Star, Eye, EyeOff, Sparkles, Layers } from 'lucide-react'

export default function CustomHookDemo() {
  const [showParagraph, toggleParagraph] = useToggle(true)
  const [showCard, toggleCard] = useToggle(true)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Toggle 1 Card */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-xl space-y-4">
          <div className="space-y-1 border-b border-slate-200/60 dark:border-slate-800/60 pb-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-500" />
                Custom Hook 1: useToggle(true)
              </h3>
              <span className="text-[11px] font-mono font-bold text-indigo-500 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-200/50">
                Reusable Hook Instance A
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            <button
              type="button"
              onClick={() => toggleParagraph()}
              className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
            >
              {showParagraph ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>Toggle State ({showParagraph ? 'Visible' : 'Hidden'})</span>
            </button>
            <button
              type="button"
              onClick={() => toggleParagraph(true)}
              className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition"
            >
              Force True
            </button>
            <button
              type="button"
              onClick={() => toggleParagraph(false)}
              className="px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold transition"
            >
              Force False
            </button>
          </div>

          {showParagraph && (
            <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold animate-fade-in flex items-center gap-2">
              <Star className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>Custom Hooks encapsulate reusable stateful logic cleanly!</span>
            </div>
          )}
        </div>

        {/* Toggle 2 Card */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-xl space-y-4">
          <div className="space-y-1 border-b border-slate-200/60 dark:border-slate-800/60 pb-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-500" />
                Custom Hook 2: Independent Instance B
              </h3>
              <span className="text-[11px] font-mono font-bold text-purple-500 bg-purple-50 dark:bg-purple-950/60 px-2 py-0.5 rounded border border-purple-200/50">
                Isolated State
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            <button
              type="button"
              onClick={() => toggleCard()}
              className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition flex items-center gap-1.5 shadow-md shadow-purple-600/20"
            >
              {showCard ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>Toggle Instance B</span>
            </button>
            <button
              type="button"
              onClick={() => toggleCard(true)}
              className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition"
            >
              Show
            </button>
            <button
              type="button"
              onClick={() => toggleCard(false)}
              className="px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold transition"
            >
              Hide
            </button>
          </div>

          {showCard && (
            <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold animate-fade-in flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
              <span>Each component/call gets its own isolated state scope!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}