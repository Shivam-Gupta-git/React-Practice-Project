import React, { forwardRef, useRef } from 'react'
import { ArrowRight, Layers, Sparkles, Focus, ShieldCheck } from 'lucide-react'

export default function ForwardRefDemo() {
  const customInputRef = useRef(null)

  const handleApplyPreset = () => {
    if (customInputRef.current) {
      customInputRef.current.value = '$99,999 Enterprise Tier'
      customInputRef.current.focus()
      customInputRef.current.style.color = '#10b981'
      customInputRef.current.style.fontWeight = 'bold'
    }
  }

  const handleFocusOnly = () => {
    customInputRef.current?.focus()
  }

  return (
    <div className="space-y-6">
      {/* Ref Forwarding Architecture Banner */}
      <div className="flex items-center justify-between p-3 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200/50 dark:border-indigo-800/40 text-xs font-semibold">
        <span className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-300">
          <Layers className="w-4 h-4" />
          <span>Parent Component (Holds useRef)</span>
        </span>
        <div className="flex items-center gap-1 text-slate-400">
          <span>Forwards Ref</span>
          <ArrowRight className="w-3.5 h-3.5 animate-pulse text-indigo-500" />
        </div>
        <span className="flex items-center gap-1.5 text-purple-600 dark:text-purple-300">
          <ShieldCheck className="w-4 h-4" />
          <span>Child Component (forwardRef)</span>
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Parent Controls & Child Component Wrapper */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-xl space-y-5">
          <div className="space-y-1 border-b border-slate-200/60 dark:border-slate-800/60 pb-3">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              Parent Controlling Encapsulated Child Input
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              The parent invokes direct DOM methods on <code className="text-indigo-400">CustomInput</code> via forwarded ref.
            </p>
          </div>

          {/* Forwarded Child Input */}
          <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800/60 space-y-2">
            <span className="text-[11px] font-mono font-bold text-purple-400 uppercase tracking-wider block">
              Child Component UI (&lt;CustomInput ref={'{ref}'} /&gt;)
            </span>
            <CustomInput ref={customInputRef} label="Subscription Code (Forwarded Ref Input)" />
          </div>

          {/* Parent Action Controls */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={handleFocusOnly}
              className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition"
            >
              <Focus className="w-4 h-4" />
              <span>Parent Focus Child</span>
            </button>

            <button
              type="button"
              onClick={handleApplyPreset}
              className="py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/20 transition"
            >
              <Sparkles className="w-4 h-4" />
              <span>Fill Preset & Glow</span>
            </button>
          </div>
        </div>

        {/* Code Explanation */}
        <div className="lg:col-span-5 p-5 rounded-3xl bg-slate-950 border border-slate-800 text-slate-100 space-y-3 font-mono text-xs shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400 font-sans font-bold">
              forwardRef Signature
            </span>
            <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
              React HOC
            </span>
          </div>

          <pre className="p-3 rounded-xl bg-slate-900 text-purple-300 border border-slate-800 text-[11px] overflow-auto">
{`const CustomInput = forwardRef((props, ref) => {
  return <input ref={ref} {...props} />
})`}
          </pre>

          <p className="text-[11px] font-sans text-slate-400 leading-relaxed">
            By default, functional components cannot receive refs. <code className="text-indigo-400">forwardRef</code> passes the ref parameter down to DOM nodes inside.
          </p>
        </div>
      </div>
    </div>
  )
}

const CustomInput = forwardRef(({ label }, ref) => {
  return (
    <div className="space-y-1">
      <label className="block text-xs text-slate-400 font-semibold">{label}</label>
      <input
        ref={ref}
        type="text"
        placeholder="Type here..."
        className="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-medium text-sm focus:outline-none transition-all duration-300"
      />
    </div>
  )
})