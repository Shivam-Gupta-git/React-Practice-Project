import React, { Suspense, lazy, useState } from 'react'
import { Layers, Download, Loader2, Sparkles, CheckCircle2 } from 'lucide-react'

const Values = lazy(() => import('./Values'))

export default function LazyLoadingDemo() {
  const [load, setLoad] = useState(false)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Main Controls Card */}
        <div className="md:col-span-6 p-6 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-xl space-y-5">
          <div className="space-y-1 border-b border-slate-200/60 dark:border-slate-800/60 pb-3">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-500" />
              Code-Splitting via React.lazy & Suspense
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Loads bundle chunks on demand when components are rendered.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setLoad(true)}
            disabled={load}
            className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 transition"
          >
            <Download className="w-4 h-4" />
            <span>{load ? 'Chunk Module Loaded ✓' : 'Fetch & Load Values Chunk'}</span>
          </button>
        </div>

        {/* Suspense Container */}
        <div className="md:col-span-6">
          {load ? (
            <Suspense
              fallback={
                <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 text-slate-100 flex items-center justify-center gap-2 text-xs font-mono">
                  <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                  <span>Downloading Component Chunk...</span>
                </div>
              }
            >
              <Values />
            </Suspense>
          ) : (
            <div className="p-6 rounded-3xl bg-slate-100/60 dark:bg-slate-950/60 border border-dashed border-slate-300 dark:border-slate-800 text-center space-y-2">
              <Sparkles className="w-6 h-6 text-slate-400 mx-auto" />
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Component bundle chunk is not loaded yet. Click the button to fetch dynamically.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}