import React, { useRef, useState } from 'react'
import { HardDrive, CheckCircle2, Mail, Lock, Zap } from 'lucide-react'

export default function UncontrolledCompDemo() {
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const [submittedData, setSubmittedData] = useState(null)
  const [keystrokeCount, setKeystrokeCount] = useState(0)

  const handleSubmit = (e) => {
    e.preventDefault()
    const email = emailRef.current?.value || ''
    const password = passwordRef.current?.value || ''
    setSubmittedData({ email, password })
  }

  const handleInputTyping = () => {
    setKeystrokeCount((c) => c + 1)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Uncontrolled Form */}
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-7 p-6 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-xl space-y-4"
        >
          <div className="space-y-1 border-b border-slate-200/60 dark:border-slate-800/60 pb-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-purple-500" />
                Uncontrolled Form Input (DOM Ref)
              </h3>
              <span className="text-xs font-mono font-bold text-purple-500 bg-purple-50 dark:bg-purple-950/60 px-2.5 py-0.5 rounded-full border border-purple-200/50 dark:border-purple-800/50">
                DOM Managed
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Form inputs store their own state in DOM nodes. React reads values using <code className="text-purple-400">ref.current.value</code> on submit.
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                Email Address (ref)
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  ref={emailRef}
                  onInput={handleInputTyping}
                  defaultValue="dev@uncontrolled.io"
                  placeholder="Enter email"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-600 dark:text-slate-300 font-bold mb-1">
                Password (ref)
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  ref={passwordRef}
                  onInput={handleInputTyping}
                  defaultValue="domRefPassword2026"
                  placeholder="Enter password"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 active:scale-98 text-white font-bold text-xs shadow-md shadow-purple-600/20 transition-all flex items-center justify-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Read DOM Refs & Submit</span>
          </button>
        </form>

        {/* DOM Ref Monitor */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 text-slate-100 space-y-3 font-mono text-xs shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400 font-sans font-bold flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-purple-400" /> DOM Keystrokes (Zero Re-renders)
              </span>
              <span className="text-xs text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/60 font-bold">
                {keystrokeCount} DOM Typed
              </span>
            </div>

            <p className="text-[11px] font-sans text-slate-400">
              Notice: Typing into input fields updates the browser DOM directly without triggering React component re-renders!
            </p>
          </div>

          {submittedData && (
            <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs space-y-1 animate-fade-in font-mono">
              <p className="font-bold font-sans flex items-center gap-1 text-purple-400">
                <CheckCircle2 className="w-4 h-4" /> Read from ref.current.value on Submit:
              </p>
              <pre className="text-[10px] bg-slate-950 p-2 rounded-lg border border-purple-800/40 text-purple-200">
{JSON.stringify(submittedData, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}