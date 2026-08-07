import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { Wrench, Sparkles, Focus, RotateCcw, AlertTriangle } from 'lucide-react'

// Custom input component exposing custom imperative methods
const CustomInput = forwardRef((props, ref) => {
  const inputRef = useRef()
  const [isShaking, setIsShaking] = useState(false)

  useImperativeHandle(ref, () => ({
    focusInput: () => {
      inputRef.current?.focus()
    },
    clearInput: () => {
      if (inputRef.current) inputRef.current.value = ''
    },
    shakeInput: () => {
      setIsShaking(true)
      setTimeout(() => setIsShaking(false), 600)
    },
    getValue: () => inputRef.current?.value || '',
  }))

  return (
    <div className={`transition-transform ${isShaking ? 'animate-bounce' : ''}`}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Type here or use parent buttons..."
        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm font-mono"
      />
    </div>
  )
})

CustomInput.displayName = 'CustomInput'

export default function UseImperativeHandleDemo() {
  const customInputRef = useRef()
  const [retrievedValue, setRetrievedValue] = useState('')

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-100">useImperativeHandle Demo</h3>
            <p className="text-xs text-slate-400">Exposing custom methods (focus, clear, shake) via ref</p>
          </div>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Child Input Component
        </label>

        <CustomInput ref={customInputRef} />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2">
          <button
            onClick={() => customInputRef.current?.focusInput()}
            className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-medium transition-colors"
          >
            <Focus className="w-3.5 h-3.5" /> .focusInput()
          </button>
          <button
            onClick={() => customInputRef.current?.clearInput()}
            className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> .clearInput()
          </button>
          <button
            onClick={() => customInputRef.current?.shakeInput()}
            className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 text-xs font-medium transition-colors"
          >
            <AlertTriangle className="w-3.5 h-3.5" /> .shakeInput()
          </button>
          <button
            onClick={() => setRetrievedValue(customInputRef.current?.getValue() || '(empty)')}
            className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-xs font-medium transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" /> .getValue()
          </button>
        </div>

        {retrievedValue && (
          <div className="mt-3 p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 flex items-center justify-between">
            <span className="text-slate-400">Retrieved via Ref:</span>
            <strong className="text-emerald-400">{retrievedValue}</strong>
          </div>
        )}
      </div>
    </div>
  )
}
