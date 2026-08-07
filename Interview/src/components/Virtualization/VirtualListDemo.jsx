import React, { useState, useRef } from 'react'
import { Layers, Sparkles, Cpu, ShieldCheck } from 'lucide-react'

export default function VirtualListDemo() {
  const TOTAL_ITEMS = 100000
  const ITEM_HEIGHT = 48
  const CONTAINER_HEIGHT = 300

  const [scrollTop, setScrollTop] = useState(0)
  const containerRef = useRef(null)

  const handleScroll = (e) => {
    setScrollTop(e.target.scrollTop)
  }

  // Calculate visible range
  const startIndex = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - 2)
  const endIndex = Math.min(
    TOTAL_ITEMS - 1,
    Math.floor((scrollTop + CONTAINER_HEIGHT) / ITEM_HEIGHT) + 2
  )

  const visibleItems = []
  for (let i = startIndex; i <= endIndex; i++) {
    visibleItems.push({
      index: i,
      top: i * ITEM_HEIGHT,
      label: `Virtual User #${i + 1} — (DOM Node Index ${i})`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Virtualized Container */}
        <div className="md:col-span-7 p-6 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-xl space-y-4">
          <div className="space-y-1 border-b border-slate-200/60 dark:border-slate-800/60 pb-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-500" />
                List Virtualization (Windowing)
              </h3>
              <span className="text-xs font-mono font-bold text-indigo-500 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-0.5 rounded-full border border-indigo-200/50">
                100,000 Total Dataset
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Only renders elements currently visible inside the viewport window (~10 DOM nodes).
            </p>
          </div>

          {/* Virtual Scroll Window */}
          <div
            ref={containerRef}
            onScroll={handleScroll}
            style={{ height: CONTAINER_HEIGHT }}
            className="w-full rounded-2xl bg-slate-950 border border-slate-800 overflow-y-auto relative custom-scrollbar shadow-inner"
          >
            {/* Height placeholder */}
            <div style={{ height: TOTAL_ITEMS * ITEM_HEIGHT, width: '100%' }} className="relative">
              {visibleItems.map((item) => (
                <div
                  key={item.index}
                  style={{
                    position: 'absolute',
                    top: item.top,
                    left: 0,
                    right: 0,
                    height: ITEM_HEIGHT - 4,
                  }}
                  className="mx-3 my-0.5 px-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs font-mono text-slate-200 shadow-sm"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{item.label}</span>
                  </span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                    Rendered DOM Node
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* DOM Node Monitor */}
        <div className="md:col-span-5 space-y-4">
          <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 text-slate-100 space-y-3 font-mono text-xs shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400 font-sans font-bold flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-indigo-400" /> Memory & DOM Monitor
              </span>
              <span className="text-xs text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                0ms DOM Lag
              </span>
            </div>

            <div className="space-y-2 text-[11px] font-sans">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Total Items in Memory:</span>
                <span className="text-indigo-400 font-mono font-bold">100,000</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Active DOM Nodes:</span>
                <span className="text-emerald-400 font-mono font-bold">{visibleItems.length} Nodes</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Scroll Top Offset:</span>
                <span className="text-amber-400 font-mono font-bold">{Math.round(scrollTop)}px</span>
              </div>
            </div>

            <p className="text-[11px] font-sans text-slate-400 pt-2 border-t border-slate-800">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400 inline mr-1" />
              Without virtualization, rendering 100,000 DOM nodes crashes browser RAM memory. Virtualization renders only visible items!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
