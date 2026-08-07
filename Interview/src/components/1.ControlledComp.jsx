import React, { useState } from 'react'
import { Sparkles, CheckCircle2, User, Mail, Lock, Layers } from 'lucide-react'

export default function ControlledCompDemo() {
  const [name, setName] = useState('Sarah Connor')
  const [email, setEmail] = useState('sarah@cyberdyne.dev')
  const [password, setPassword] = useState('resistance2026')
  const [renderCount, setRenderCount] = useState(1)
  const [submittedData, setSubmittedData] = useState(null)

  const handleNameChange = (e) => {
    setName(e.target.value)
    setRenderCount((c) => c + 1)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    setRenderCount((c) => c + 1)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    setRenderCount((c) => c + 1)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmittedData({ name, email, password })
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controlled Form */}
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-7 p-6 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-xl space-y-4"
        >
          <div className="space-y-1 border-b border-slate-200/60 dark:border-slate-800/60 pb-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-500" />
                Controlled Form Input
              </h3>
              <span className="text-xs font-mono font-bold text-indigo-500 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-0.5 rounded-full border border-indigo-200/50 dark:border-indigo-800/50">
                Single Source of Truth
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              React state controls the input value via <code className="text-indigo-400">value={'{state}'}</code> and <code className="text-indigo-400">onChange</code>.
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-98 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Submit Controlled Form</span>
          </button>
        </form>

        {/* Live Re-render & State Mirror */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 text-slate-100 space-y-3 font-mono text-xs shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400 font-sans font-bold flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-400" /> Component Re-renders
              </span>
              <span className="text-xs text-indigo-400 bg-indigo-950/60 px-2.5 py-0.5 rounded border border-indigo-800/60 font-bold">
                {renderCount} Renders
              </span>
            </div>

            <p className="text-[11px] font-sans text-slate-400">
              Every keystroke updates React state, forcing a re-render to reflect the new UI.
            </p>

            <pre className="p-3 rounded-xl bg-slate-900 text-emerald-400 border border-slate-800 text-[11px] overflow-auto">
{JSON.stringify({ name, email, password }, null, 2)}
            </pre>
          </div>

          {submittedData && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs space-y-1 animate-fade-in font-mono">
              <p className="font-bold font-sans flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Submitted Controlled State:
              </p>
              <pre className="text-[10px] bg-slate-950 p-2 rounded-lg border border-emerald-800/40 text-emerald-200">
{JSON.stringify(submittedData, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}