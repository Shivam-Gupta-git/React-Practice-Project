import React, { useMemo, useState } from 'react'
import { Cpu, Zap, Activity, Clock, Layers } from 'lucide-react'

export default function UseMemoDemo() {
  const [counterOne, setCounterOne] = useState(0)
  const [counterTwo, setCounterTwo] = useState(0)

  const isEven = useMemo(() => {
    let i = 0
    while (i < 10000000) i++
    return counterOne % 2 === 0
  }, [counterOne])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Main Counter Card */}
        <div className="md:col-span-7 p-6 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-xl space-y-5">
          <div className="space-y-1 border-b border-slate-200/60 dark:border-slate-800/60 pb-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Cpu className="w-4 h-4 text-indigo-500" />
                useMemo Performance Optimization
              </h3>
              <span className="text-xs font-mono font-bold text-indigo-500 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-0.5 rounded-full border border-indigo-200/50 dark:border-indigo-800/50">
                Memoized Value
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Skips expensive calculations when unrelated state updates occur.
            </p>
          </div>

          {/* Counter 1: Dependencies Trigger */}
          <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200/50 dark:border-indigo-800/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-900 dark:text-indigo-200">
                Counter 1 (Triggers Heavy Work)
              </span>
              <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md ${isEven ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
                {isEven ? 'EVEN Number' : 'ODD Number'}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setCounterOne((c) => c + 1)}
              className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-indigo-600/20 transition"
            >
              <Activity className="w-4 h-4" />
              <span>Increment Counter One ({counterOne})</span>
            </button>
          </div>

          {/* Counter 2: Unrelated State */}
          <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-950/30 border border-purple-200/50 dark:border-purple-800/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-900 dark:text-purple-200">
                Counter 2 (Unrelated State)
              </span>
              <span className="text-xs font-mono font-bold text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/60">
                Fast Re-render
              </span>
            </div>

            <button
              type="button"
              onClick={() => setCounterTwo((c) => c + 1)}
              className="w-full py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-purple-600/20 transition"
            >
              <Zap className="w-4 h-4" />
              <span>Increment Counter Two ({counterTwo})</span>
            </button>
          </div>
        </div>

        {/* Memo Inspector */}
        <div className="md:col-span-5 space-y-4">
          <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 text-slate-100 space-y-3 font-mono text-xs shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400 font-sans font-bold flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-400" /> Computation Monitor
              </span>
              <span className="text-xs text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                useMemo Active
              </span>
            </div>

            <div className="space-y-2 text-[11px] font-sans">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Counter 1 Update:</span>
                <span className="text-amber-400 font-mono font-bold">Re-calculates isEven</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Counter 2 Update:</span>
                <span className="text-emerald-400 font-mono font-bold">Returns Cached Result</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}