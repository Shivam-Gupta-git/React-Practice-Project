import React, { useState, useTransition } from 'react'
import { Zap, Clock, Sparkles, Activity, ShieldCheck } from 'lucide-react'

export default function UseTransitionDemo() {
  const [query, setQuery] = useState('')
  const [list, setList] = useState([])
  const [isPending, startTransition] = useTransition()
  const [mode, setMode] = useState('with-transition')

  const handleChange = (e) => {
    const value = e.target.value
    setQuery(value)

    if (mode === 'with-transition') {
      // Mark heavy list filtering as non-urgent transition
      startTransition(() => {
        const items = []
        for (let i = 0; i < 8000; i++) {
          if (`Item #${i} - ${value}`.toLowerCase().includes(value.toLowerCase())) {
            items.push(`Filtered Result #${i} for "${value}"`)
          }
        }
        setList(items)
      })
    } else {
      // Synchronous blocking render
      const items = []
      for (let i = 0; i < 8000; i++) {
        if (`Item #${i} - ${value}`.toLowerCase().includes(value.toLowerCase())) {
          items.push(`Filtered Result #${i} for "${value}"`)
        }
      }
      setList(items)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input & Controls */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-xl space-y-5">
          <div className="space-y-1 border-b border-slate-200/60 dark:border-slate-800/60 pb-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-indigo-500" />
                React 18 Concurrent Rendering: useTransition
              </h3>
              <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                isPending ? 'bg-amber-500/20 text-amber-300 border-amber-500/30 animate-pulse' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
              }`}>
                {isPending ? 'Transition Pending...' : 'UI Responsive'}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Separates urgent input typing updates from non-urgent heavy list filtering.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMode('with-transition')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                mode === 'with-transition'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" /> With useTransition (Smooth)
            </button>
            <button
              type="button"
              onClick={() => setMode('without-transition')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                mode === 'without-transition'
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
              }`}
            >
              <Clock className="w-3.5 h-3.5" /> Without Transition (Blocking)
            </button>
          </div>

          <div className="space-y-2">
            <label className="block text-xs text-slate-600 dark:text-slate-300 font-bold">
              Fast Type Search (Generates 8,000 Heavy Items)
            </label>
            <input
              type="text"
              value={query}
              onChange={handleChange}
              placeholder="Type quickly to feel input responsiveness..."
              className="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>
        </div>

        {/* Results List */}
        <div className="lg:col-span-5 p-5 rounded-3xl bg-slate-950 border border-slate-800 text-slate-100 space-y-3 font-mono text-xs shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400 font-sans font-bold flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-indigo-400" /> Filtered Items ({list.length.toLocaleString()})
            </span>
            <span className="text-[10px] text-indigo-300 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800/60">
              {mode}
            </span>
          </div>

          <div className="max-h-[160px] overflow-auto space-y-1 text-[11px] text-slate-300 pr-1">
            {list.length === 0 ? (
              <p className="text-slate-500 italic p-2">Type in input above to generate 8,000 filtered items...</p>
            ) : (
              list.slice(0, 30).map((item, idx) => (
                <div key={idx} className="p-1.5 rounded bg-slate-900 border border-slate-800/60 text-slate-300 truncate">
                  {item}
                </div>
              ))
            )}
          </div>

          <p className="text-[10px] font-sans text-slate-400 pt-2 border-t border-slate-800">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 inline mr-1" />
            <code className="text-indigo-400">startTransition</code> marks updates as low priority, so browser input events are never blocked.
          </p>
        </div>
      </div>
    </div>
  )
}
