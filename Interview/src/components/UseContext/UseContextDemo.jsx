import React, { createContext, useContext, useState } from 'react'
import { Sun, Moon, User, ShieldCheck, Layers, ArrowRight } from 'lucide-react'

// 1. Create Contexts
const ThemeContext = createContext()
const UserContext = createContext()

// 2. Child component deep in the tree reading context directly
function UserBadge() {
  const { user, setUserRole } = useContext(UserContext)

  return (
    <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Consumer Component 1
          </span>
        </div>
        <span
          className={`text-xs px-2.5 py-0.5 rounded-full font-mono border ${
            user.role === 'admin'
              ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
              : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
          }`}
        >
          {user.role}
        </span>
      </div>

      <div className="text-sm font-medium text-slate-200">User: {user.name}</div>

      <div className="flex gap-2">
        <button
          onClick={() => setUserRole(user.role === 'admin' ? 'member' : 'admin')}
          className="flex-1 py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 transition-colors"
        >
          Toggle Role ({user.role === 'admin' ? 'Make Member' : 'Make Admin'})
        </button>
      </div>
    </div>
  )
}

function ThemeCard() {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <div
      className={`p-4 rounded-xl border transition-all ${
        theme === 'dark'
          ? 'bg-slate-950 border-slate-800 text-slate-100'
          : 'bg-indigo-50/90 border-indigo-200 text-slate-900'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold uppercase tracking-wider opacity-70">
          Consumer Component 2
        </span>
        {theme === 'dark' ? (
          <Moon className="w-4 h-4 text-indigo-400" />
        ) : (
          <Sun className="w-4 h-4 text-amber-500" />
        )}
      </div>

      <p className="text-sm font-medium mb-3">
        Active Theme Context: <strong className="capitalize">{theme} Mode</strong>
      </p>

      <button
        onClick={toggleTheme}
        className={`w-full py-1.5 px-3 rounded-lg text-xs font-medium transition-colors ${
          theme === 'dark'
            ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
            : 'bg-indigo-900 hover:bg-indigo-800 text-white'
        }`}
      >
        Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
      </button>
    </div>
  )
}

export default function UseContextDemo() {
  const [theme, setTheme] = useState('dark')
  const [user, setUser] = useState({ name: 'Shivam Gupta', role: 'admin' })

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  const setUserRole = (role) => setUser((prev) => ({ ...prev, role }))

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <UserContext.Provider value={{ user, setUserRole }}>
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-100">Top-Level Context Provider</h3>
                <p className="text-xs text-slate-400">Broadcasting theme & user state to children</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono bg-slate-800/80 px-3 py-1.5 rounded-lg text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Zero Prop Drilling
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UserBadge />
            <ThemeCard />
          </div>
        </div>
      </UserContext.Provider>
    </ThemeContext.Provider>
  )
}
