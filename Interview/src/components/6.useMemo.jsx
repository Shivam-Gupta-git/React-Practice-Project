import React, { useMemo, useState } from 'react'
import { Cpu, RefreshCw, ShieldCheck, Layers } from 'lucide-react'

const ExpensiveChildComponent = () => {
  const total = useMemo(() => {
    let i = 0
    for (i = 0; i <= 10000000; i++) {
      // Simulate heavy work
    }
    return i.toLocaleString()
  }, [])

  return (
    <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 border border-indigo-500/30 text-white space-y-3 shadow-xl">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
          <Cpu className="w-4 h-4 text-emerald-400" /> Memoized Child Calculation
        </span>
        <span className="text-[10px] text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60 font-bold">
          Cached Result
        </span>
      </div>

      <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center space-y-1">
        <span className="text-3xl font-extrabold font-mono text-emerald-400">{total}</span>
        <p className="text-[11px] text-slate-400">Loop computed only once on mount</p>
      </div>
    </div>
  )
}

export default function MemoParentComponent() {
  const [parentCount, setParentCount] = useState(0)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Main Parent Card */}
        <div className="md:col-span-7 p-6 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-xl space-y-5">
          <div className="space-y-1 border-b border-slate-200/60 dark:border-slate-800/60 pb-3">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-500" />
              Parent Component State Owner
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Re-rendering the parent component does not re-execute expensive child loops!
            </p>
          </div>

          <ExpensiveChildComponent />

          <button
            type="button"
            onClick={() => setParentCount((c) => c + 1)}
            className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-indigo-600/20 transition"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Re-render Parent Component ({parentCount})</span>
          </button>
        </div>

        {/* Render Monitor */}
        <div className="md:col-span-5 space-y-4">
          <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 text-slate-100 space-y-3 font-mono text-xs shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400 font-sans font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Render Optimization Tracker
              </span>
              <span className="text-xs text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                0ms Delay
              </span>
            </div>

            <div className="space-y-2 text-[11px] font-sans">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Parent Re-renders:</span>
                <span className="text-indigo-400 font-mono font-bold">{parentCount}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Child Computation:</span>
                <span className="text-emerald-400 font-mono font-bold">1 (Cached)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}