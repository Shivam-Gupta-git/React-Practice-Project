import { useEffect } from 'react'
import { useDashboard } from '../context/DashboardContext'
import { CheckCircle2, X } from 'lucide-react'

export default function Toast() {
  const { toast } = useDashboard()

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {}, 3000)
      return () => clearTimeout(timer)
    }
  }, [toast])

  if (!toast) return null

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-md shadow-xl border border-slate-200/60 dark:border-slate-700/60 animate-slide-up"
      role="alert"
      aria-live="assertive"
    >
      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" aria-hidden="true" />
      <span className="text-sm font-medium text-slate-800 dark:text-slate-100">{toast.message}</span>
    </div>
  )
}
