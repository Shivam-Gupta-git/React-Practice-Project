import React, { useState } from 'react'
import { LogIn, LogOut, CheckCircle2, Award, Bell, Shield } from 'lucide-react'

export default function ConditionalRenderingDemo() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [unreadCount, setUnreadCount] = useState(3)
  const [marks, setMarks] = useState(85)

  const getGrade = (score) => {
    if (score >= 90) return { grade: 'Grade A+ (Outstanding)', color: 'text-emerald-400 bg-emerald-950/60 border-emerald-800/60' }
    if (score >= 75) return { grade: 'Grade A (Excellent)', color: 'text-indigo-400 bg-indigo-950/60 border-indigo-800/60' }
    if (score >= 50) return { grade: 'Grade B (Pass)', color: 'text-amber-400 bg-amber-950/60 border-amber-800/60' }
    return { grade: 'Grade F (Needs Review)', color: 'text-rose-400 bg-rose-950/60 border-rose-800/60' }
  }

  const gradeInfo = getGrade(Number(marks))

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Pattern 1: Ternary Auth Toggle */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-xl flex flex-col justify-between space-y-4">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-800/50">
              Pattern 1: Ternary Operator
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Authentication Gate
            </h3>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-slate-100 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
              {isLoggedIn ? <Shield className="w-6 h-6 text-emerald-400" /> : <LogIn className="w-6 h-6 text-indigo-400" />}
            </div>
            <h4 className="text-base font-bold">
              {isLoggedIn ? 'Welcome Back, Senior Dev!' : 'Guest User'}
            </h4>
            <p className="text-xs text-slate-400">
              {isLoggedIn ? 'You are authenticated. Full access granted.' : 'Please sign in to access your developer portal.'}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsLoggedIn(!isLoggedIn)}
            className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition shadow-md ${
              isLoggedIn
                ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/20'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20'
            }`}
          >
            {isLoggedIn ? <LogOut className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
            <span>{isLoggedIn ? 'Sign Out (Logout)' : 'Sign In (Login)'}</span>
          </button>
        </div>

        {/* Pattern 2 & 3: Logical && & If/Else */}
        <div className="lg:col-span-6 space-y-6">
          {/* Logical && Pattern */}
          <div className="p-5 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-xl space-y-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-200/50 dark:border-purple-800/50">
              Pattern 2: Short-Circuit && Operator
            </span>
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-purple-400" />
                <span className="font-bold text-slate-200">Notification Badge:</span>
              </div>
              {unreadCount > 0 && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-purple-500 text-white shadow-md shadow-purple-500/30">
                  {unreadCount} Unread
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs">
              <button
                type="button"
                onClick={() => setUnreadCount((c) => c + 1)}
                className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-200"
              >
                + Add Alert
              </button>
              <button
                type="button"
                onClick={() => setUnreadCount(0)}
                className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 font-semibold hover:bg-slate-200"
              >
                Clear Notifications
              </button>
            </div>
          </div>

          {/* If/Else Grade Evaluator */}
          <div className="p-5 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-xl space-y-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/50">
              Pattern 3: Evaluation Guard
            </span>
            <div className="space-y-2 text-xs">
              <label className="block text-slate-500 font-semibold">Enter Score Marks (0-100)</label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={marks}
                  onChange={(e) => setMarks(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-mono font-bold focus:outline-none"
                />
                <span className={`px-3 py-2 rounded-xl text-xs font-mono font-bold border ${gradeInfo.color}`}>
                  {gradeInfo.grade}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}