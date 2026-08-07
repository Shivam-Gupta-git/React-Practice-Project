import React, { useEffect, useState } from 'react'
import { Clock, Play, Pause, RefreshCw, Activity, ShieldCheck } from 'lucide-react'

export default function UseEffectClockDemo() {
  const [time, setTime] = useState(new Date().toLocaleTimeString())
  const [isRunning, setIsRunning] = useState(true)
  const [tickCount, setTickCount] = useState(0)
  const [log, setLog] = useState([])

  useEffect(() => {
    if (!isRunning) return

    setLog((prev) => [`[Effect Setup] setInterval started at ${new Date().toLocaleTimeString()}`, ...prev].slice(0, 5))

    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString())
      setTickCount((c) => c + 1)
    }, 1000)

    return () => {
      setLog((prev) => [`[Effect Cleanup] clearInterval executed!`, ...prev].slice(0, 5))
      clearInterval(interval)
    }
  }, [isRunning])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Main Digital Clock */}
        <div className="md:col-span-7 p-6 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-xl flex flex-col items-center justify-between text-center space-y-6">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-800/50">
              <Activity className="w-3.5 h-3.5" />
              useEffect Side-Effect Demo
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center justify-center gap-2">
              <Clock className="w-5 h-5 text-indigo-500" />
              Real-Time Digital Clock
            </h3>
          </div>

          {/* Time Display */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 border border-indigo-500/30 text-white w-full max-w-sm shadow-xl space-y-2">
            <span className="text-xs font-mono text-indigo-300 font-semibold uppercase tracking-wider block">
              Current System Time
            </span>
            <div className="text-4xl sm:text-5xl font-extrabold font-mono tracking-widest text-emerald-400">
              {time}
            </div>
            <span className="text-[11px] text-slate-400 block font-mono">
              Total Ticks: <strong className="text-white">{tickCount}</strong>
            </span>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-3 w-full max-w-sm">
            <button
              type="button"
              onClick={() => setIsRunning((r) => !r)}
              className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition shadow-md ${
                isRunning
                  ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/20'
                  : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20'
              }`}
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isRunning ? 'Pause Timer (Cleanup)' : 'Start Timer (Subscribe)'}</span>
            </button>
          </div>
        </div>

        {/* Effect Lifecycle Log */}
        <div className="md:col-span-5 space-y-4">
          <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 text-slate-100 space-y-3 font-mono text-xs shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400 font-sans font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Effect Lifecycle Log
              </span>
              <span className="text-[10px] text-slate-400">Auto-Cleanup</span>
            </div>

            <div className="space-y-1.5 max-h-48 overflow-auto">
              {log.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded-lg text-[11px] border ${
                    item.includes('Cleanup')
                      ? 'bg-rose-950/40 text-rose-300 border-rose-800/50'
                      : 'bg-emerald-950/40 text-emerald-300 border-emerald-800/50'
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}