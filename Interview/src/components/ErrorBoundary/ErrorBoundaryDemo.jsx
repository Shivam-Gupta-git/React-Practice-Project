import React, { Component, useState } from 'react'
import { ShieldAlert, RefreshCw, AlertOctagon, Bug } from 'lucide-react'

// Error Boundary Class Component
class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  resetError = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-slate-100 space-y-4">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-6 h-6 text-rose-400" />
            <div>
              <h4 className="font-semibold text-rose-300">Error Boundary Intercepted Crash</h4>
              <p className="text-xs text-rose-400/80">The rest of your application remains safe and interactive.</p>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-slate-950 font-mono text-xs text-rose-300/90 overflow-x-auto">
            {this.state.error?.toString() || 'Uncaught JavaScript Error in Component Tree'}
          </div>
          <button
            onClick={this.resetError}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset Error Boundary
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

// Buggy Counter Component that throws an error when count exceeds threshold
function BuggyCounter() {
  const [count, setCount] = useState(0)

  if (count === 5) {
    throw new Error('Simulated Crash: Counter reached threshold (5)!')
  }

  return (
    <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bug className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Protected Child Component
          </span>
        </div>
        <span className="text-xs font-mono text-slate-400">Crash Threshold: 5</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-3xl font-mono font-bold text-slate-100">{count}</div>
        <button
          onClick={() => setCount((prev) => prev + 1)}
          className="flex items-center gap-2 py-2 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors"
        >
          Increment (Crash at 5)
        </button>
      </div>

      <p className="text-xs text-slate-400">
        Click increment until count reaches 5 to trigger an uncaught render error.
      </p>
    </div>
  )
}

export default function ErrorBoundaryDemo() {
  return (
    <div className="space-y-6">
      <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <AlertOctagon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-100">Error Boundary Pattern</h3>
            <p className="text-xs text-slate-400">Catching render crashes and showing fallback UI</p>
          </div>
        </div>
      </div>

      <ErrorBoundary>
        <BuggyCounter />
      </ErrorBoundary>
    </div>
  )
}
