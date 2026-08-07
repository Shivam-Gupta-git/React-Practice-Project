import React, { useState } from 'react'
import { Shield, ShieldCheck, RefreshCw, Zap } from 'lucide-react'

// Standard Un-memoized Child
const StandardChild = ({ count }) => {
  return (
    <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 space-y-1">
      <div className="flex items-center justify-between text-xs font-bold font-sans">
        <span>Standard Component</span>
        <span className="text-[10px] bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800/60 text-rose-300 font-mono">
          Re-renders Always
        </span>
      </div>
      <p className="text-xs text-slate-300 font-mono">
        Value: <strong className="text-white">{count}</strong>
      </p>
    </div>
  )
}

// Memoized Child with React.memo
const MemoizedChild = React.memo(({ staticTitle }) => {
  return (
    <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 space-y-1">
      <div className="flex items-center justify-between text-xs font-bold font-sans">
        <span className="flex items-center gap-1.5 text-emerald-400">
          <ShieldCheck className="w-4 h-4" /> React.memo(Child)
        </span>
        <span className="text-[10px] bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60 text-emerald-300 font-mono">
          Props Unchanged ✓
        </span>
      </div>
      <p className="text-xs text-slate-300 font-mono">
        Static Title: <strong className="text-white">{staticTitle}</strong>
      </p>
    </div>
  )
})

export default function ReactMemoDemo() {
  const [parentCount, setParentCount] = useState(0)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Parent Controls */}
        <div className="md:col-span-6 p-6 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-xl space-y-5">
          <div className="space-y-1 border-b border-slate-200/60 dark:border-slate-800/60 pb-3">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-indigo-500" />
              React.memo HOC Demonstration
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Shallowly compares props to prevent unnecessary child re-renders.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200/50 dark:border-indigo-800/40 text-center space-y-2">
            <span className="text-xs font-bold text-slate-500">Parent State Counter</span>
            <div className="text-4xl font-extrabold font-mono text-indigo-500">{parentCount}</div>
          </div>

          <button
            type="button"
            onClick={() => setParentCount((c) => c + 1)}
            className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-indigo-600/20 transition"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Increment Parent State ({parentCount})</span>
          </button>
        </div>

        {/* Side-by-Side Child Components */}
        <div className="md:col-span-6 space-y-4">
          <StandardChild count={parentCount} />
          <MemoizedChild staticTitle="Fixed Header Banner" />
        </div>
      </div>
    </div>
  )
}