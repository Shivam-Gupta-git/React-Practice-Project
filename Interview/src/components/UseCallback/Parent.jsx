import React, { useCallback, useState } from 'react'
import Child from './Child'
import { RefreshCw, Zap, ShieldCheck } from 'lucide-react'

export default function UseCallbackParentDemo() {
  const [parentCount, setParentCount] = useState(0)
  const [childCount, setChildCount] = useState(0)

  // useCallback memoizes function reference identity across parent re-renders
  const childHandler = useCallback(() => {
    // Handler logic
  }, [])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Parent Controls */}
        <div className="md:col-span-6 p-6 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-xl space-y-5">
          <div className="space-y-1 border-b border-slate-200/60 dark:border-slate-800/60 pb-3">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-indigo-500" />
              useCallback Function Reference Identity
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Prevents function re-creation on parent re-renders to preserve <code className="text-indigo-400">React.memo</code> in children.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200/50 dark:border-indigo-800/40 text-center space-y-2">
            <span className="text-xs font-bold text-slate-500">Parent Unrelated Counter</span>
            <div className="text-4xl font-extrabold font-mono text-indigo-500">{parentCount}</div>
          </div>

          <button
            type="button"
            onClick={() => setParentCount((c) => c + 1)}
            className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-indigo-600/20 transition"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Re-render Parent ({parentCount})</span>
          </button>
        </div>

        {/* Memoized Child */}
        <div className="md:col-span-6 space-y-4">
          <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 text-slate-100 space-y-3 font-mono text-xs shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400 font-sans font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Child Component (Memoized)
              </span>
              <button
                type="button"
                onClick={() => setChildCount((c) => c + 1)}
                className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-sans font-bold text-[11px]"
              >
                + Child State ({childCount})
              </button>
            </div>

            <Child countChild={childCount} childHandeler={childHandler} />
          </div>
        </div>
      </div>
    </div>
  )
}