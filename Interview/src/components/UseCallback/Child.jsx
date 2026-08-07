import React, { memo } from 'react'
import { ShieldCheck, Zap } from 'lucide-react'

function Child({ countChild, childHandeler }) {
  return (
    <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 space-y-3 font-sans">
      <div className="flex items-center justify-between text-xs font-bold">
        <span className="flex items-center gap-1 text-emerald-400">
          <ShieldCheck className="w-4 h-4" /> Memoized Child (React.memo)
        </span>
        <span className="text-[10px] bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800 text-emerald-300 font-mono">
          Ref Preserved
        </span>
      </div>

      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-300">Child State Value:</span>
        <span className="font-mono font-bold text-white text-base">{countChild}</span>
      </div>

      <button
        type="button"
        onClick={childHandeler}
        className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 transition"
      >
        <Zap className="w-3.5 h-3.5" />
        <span>Invoke Memoized Callback</span>
      </button>

      <p className="text-[11px] text-slate-400 text-center">
        Child does NOT re-render when Parent counter updates because <code className="text-emerald-400">useCallback</code> retains function reference.
      </p>
    </div>
  )
}

export default memo(Child)