import React, { useRef, useState } from 'react'
import { Target, Focus, Eraser, Sparkles, Layers } from 'lucide-react'

export default function RefDemo() {
  const inputRef = useRef(null)
  const renderCountRef = useRef(1)
  const [dummyState, setDummyState] = useState(0)

  const handleFocus = () => {
    inputRef.current?.focus()
  }

  const handleClear = () => {
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  const handleHighlight = () => {
    if (inputRef.current) {
      inputRef.current.style.borderColor = '#8b5cf6'
      inputRef.current.style.boxShadow = '0 0 0 4px rgba(139, 92, 246, 0.3)'
    }
  }

  const triggerReRender = () => {
    renderCountRef.current += 1
    setDummyState((s) => s + 1)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* DOM Ref Control Panel */}
        <div className="md:col-span-7 p-6 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-xl space-y-5">
          <div className="space-y-1 border-b border-slate-200/60 dark:border-slate-800/60 pb-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-indigo-500" />
                Direct DOM Access via useRef
              </h3>
              <span className="text-xs font-mono font-bold text-indigo-500 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-0.5 rounded-full border border-indigo-200/50 dark:border-indigo-800/50">
                Persistent Ref Object
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Access HTML elements imperatively without triggering unnecessary re-renders.
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <label className="block text-slate-600 dark:text-slate-300 font-bold">
              Target Input Element (Attached Ref)
            </label>
            <input
              ref={inputRef}
              type="text"
              defaultValue="useRef avoids re-renders!"
              placeholder="Type or use buttons below..."
              className="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-medium text-sm focus:outline-none transition-all duration-300"
            />
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-2 pt-2">
            <button
              type="button"
              onClick={handleFocus}
              className="py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/20 transition"
            >
              <Focus className="w-4 h-4" />
              <span>.focus()</span>
            </button>

            <button
              type="button"
              onClick={handleClear}
              className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition"
            >
              <Eraser className="w-4 h-4" />
              <span>Clear Value</span>
            </button>

            <button
              type="button"
              onClick={handleHighlight}
              className="py-2.5 px-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-purple-600/20 transition"
            >
              <Sparkles className="w-4 h-4" />
              <span>Glow Style</span>
            </button>
          </div>
        </div>

        {/* Ref vs State Persistence Inspector */}
        <div className="md:col-span-5 space-y-4">
          <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 text-slate-100 space-y-3 font-mono text-xs shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400 font-sans font-bold flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-400" /> Ref Value Persistence
              </span>
              <span className="text-xs text-indigo-400 font-bold bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800/60">
                renderCount: {renderCountRef.current}
              </span>
            </div>

            <p className="text-[11px] font-sans text-slate-400">
              Unlike state, updating <code className="text-indigo-400">renderCountRef.current</code> does not trigger re-renders, but retains value across renders!
            </p>

            <button
              type="button"
              onClick={triggerReRender}
              className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-indigo-300 font-sans font-bold text-xs border border-slate-800 transition"
            >
              Trigger Re-render (State Counter: {dummyState})
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}