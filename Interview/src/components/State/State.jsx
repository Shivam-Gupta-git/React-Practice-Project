import React, { useState } from 'react'
import { Plus, Minus, RotateCcw, Activity, Layers } from 'lucide-react'

export default function StateDemo() {
  const [count, setCount] = useState(0)
  const [history, setHistory] = useState([0])
  const [step, setStep] = useState(1)

  const updateCount = (delta) => {
    const next = count + delta
    setCount(next)
    setHistory((prev) => [next, ...prev].slice(0, 5))
  }

  const handleReset = () => {
    setCount(0)
    setHistory([0])
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Main Counter Card */}
        <div className="md:col-span-7 p-6 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-xl flex flex-col items-center justify-between text-center space-y-6">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-800/50">
              <Activity className="w-3.5 h-3.5" />
              useState Hook State Owner
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Interactive State Counter
            </h3>
          </div>

          {/* Big Counter Ring */}
          <div className="relative w-36 h-36 rounded-full bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-emerald-500/20 p-2 flex items-center justify-center border border-indigo-500/30 shadow-inner">
            <div className="w-full h-full rounded-full bg-white dark:bg-slate-950 flex flex-col items-center justify-center shadow-lg">
              <span className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent font-mono">
                {count}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Current State</span>
            </div>
          </div>

          {/* Controls */}
          <div className="w-full space-y-3">
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => updateCount(-step)}
                className="flex-1 max-w-[120px] py-2.5 px-4 rounded-xl bg-rose-500 hover:bg-rose-600 active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-rose-500/20 transition-all"
              >
                <Minus className="w-4 h-4" />
                <span>-{step}</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition"
                title="Reset counter"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => updateCount(step)}
                className="flex-1 max-w-[120px] py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>+{step}</span>
              </button>
            </div>

            {/* Step size selector */}
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-500 pt-2">
              <span>Step Size:</span>
              {[1, 5, 10].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStep(s)}
                  className={`px-2.5 py-1 rounded-lg transition ${
                    step === s
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                  }`}
                >
                  ±{s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* State Inspector & History Log */}
        <div className="md:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-slate-100 space-y-3 font-mono text-xs shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400 font-sans font-bold flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-400" /> State Inspector
              </span>
              <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                Live Re-render Active
              </span>
            </div>

            <pre className="p-3 rounded-xl bg-slate-900/80 text-emerald-400 border border-slate-800 text-[11px] overflow-auto">
{JSON.stringify({ count, step, historyLength: history.length }, null, 2)}
            </pre>
          </div>

          <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 space-y-2">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Recent State History
            </h4>
            <div className="flex items-center gap-1.5 flex-wrap">
              {history.map((val, idx) => (
                <span
                  key={idx}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold border ${
                    idx === 0
                      ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700/60'
                  }`}
                >
                  {val}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}