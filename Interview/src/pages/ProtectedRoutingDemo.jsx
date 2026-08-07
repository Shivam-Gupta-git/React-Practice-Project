import React, { useState, useEffect } from 'react'
import { ShieldCheck, ShieldAlert, Lock, LogOut, LogIn, Home as HomeIcon, Info, Phone, ArrowRight } from 'lucide-react'
import Home from '../components/Protected Routing/Home'
import About from '../components/Protected Routing/About'
import Contact from '../components/Protected Routing/Contact'

export default function ProtectedRoutingDemo() {
  const [currentPath, setCurrentPath] = useState('/')
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [redirectNotice, setRedirectNotice] = useState(false)

  // Sync token from localStorage
  const checkToken = () => {
    const activeToken = localStorage.getItem('token')
    setToken(activeToken)
    return activeToken
  }

  const navigateTo = (path) => {
    const isProtected = path === '/about' || path === '/contact'
    const activeToken = checkToken()

    if (isProtected && !activeToken) {
      setRedirectNotice(true)
      setCurrentPath('/login')
      setTimeout(() => setRedirectNotice(false), 3000)
    } else {
      setRedirectNotice(false)
      setCurrentPath(path)
    }
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    localStorage.setItem('token', 'simulated_jwt_token_2026')
    setToken('simulated_jwt_token_2026')
    setRedirectNotice(false)
    setCurrentPath('/about')
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setCurrentPath('/login')
  }

  return (
    <div className="space-y-6">
      {/* Simulator Pipeline Banner */}
      <div className="flex items-center justify-between p-3.5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200/50 dark:border-indigo-800/40 text-xs font-semibold">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-indigo-500" />
          <span className="text-slate-800 dark:text-slate-200">Protected Route Guard Simulator</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-mono">Auth Token:</span>
          <span className={`px-2 py-0.5 rounded-full font-mono text-[10px] font-bold ${
            token ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
          }`}>
            {token ? 'Active (Logged In ✓)' : 'Missing (Logged Out 🔒)'}
          </span>
        </div>
      </div>

      {redirectNotice && (
        <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold animate-bounce flex items-center justify-between">
          <span className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span>Access Denied! Unauthenticated user redirected to <code>/login</code> by Route Guard.</span>
          </span>
          <button
            type="button"
            onClick={() => setRedirectNotice(false)}
            className="text-rose-400 font-bold hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      {/* Demo View Container */}
      <div className="p-6 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-xl space-y-5">
        {/* Navigation Bar */}
        <header className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-slate-950 border border-slate-800 text-slate-100 text-xs">
          <div className="flex items-center gap-2 font-mono text-indigo-400 font-bold">
            <span>Route:</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-white">
              {currentPath}
            </span>
          </div>

          <nav className="flex items-center gap-1.5 font-sans">
            <button
              type="button"
              onClick={() => navigateTo('/')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                currentPath === '/' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Home (Public)
            </button>
            <button
              type="button"
              onClick={() => navigateTo('/about')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                currentPath === '/about' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Lock className="w-3 h-3 text-amber-400" /> About (Protected)
            </button>
            <button
              type="button"
              onClick={() => navigateTo('/contact')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                currentPath === '/contact' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Lock className="w-3 h-3 text-amber-400" /> Contact (Protected)
            </button>

            {token ? (
              <button
                type="button"
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30 transition flex items-center gap-1"
              >
                <LogOut className="w-3.5 h-3.5" /> Logout
              </button>
            ) : (
              <button
                type="button"
                onClick={() => navigateTo('/login')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  currentPath === '/login' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Login
              </button>
            )}
          </nav>
        </header>

        {/* Dynamic Route View */}
        <div className="p-5 rounded-2xl bg-slate-950/40 border border-slate-800/60 min-h-[200px] flex items-center justify-center">
          {currentPath === '/' && <Home />}
          {currentPath === '/about' && <About />}
          {currentPath === '/contact' && <Contact />}
          {currentPath === '/login' && (
            <div className="w-full max-w-sm p-6 rounded-2xl bg-slate-950 border border-slate-800 text-slate-100 space-y-4 text-center">
              <div className="w-10 h-10 mx-auto rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
                <Lock className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold font-sans">Simulated Login Page</h4>
              <p className="text-xs text-slate-400">
                Clicking login writes token to <code className="text-indigo-400">localStorage</code> and grants access to protected routes.
              </p>
              <button
                type="button"
                onClick={handleLoginSubmit}
                className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition flex items-center justify-center gap-1.5"
              >
                <LogIn className="w-4 h-4" />
                <span>Simulate Login (Set Token)</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
