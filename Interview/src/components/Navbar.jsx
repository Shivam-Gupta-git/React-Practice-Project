import { useDashboard } from '../hooks/useDashboard'
import { SidebarToggle } from './Sidebar'
import { Moon, Sun, Star, CheckCircle2, ChevronLeft, ChevronRight, Search } from 'lucide-react'
import { getTopicIndex, topics } from '../data/topics'

export default function Navbar() {
  const {
    activeTopic,
    theme,
    toggleTheme,
    toggleFavorite,
    toggleCompleted,
    favoriteTopics,
    completedTopics,
    goToPrevious,
    goToNext,
    activeTopicId,
    setCommandPaletteOpen,
    masteryRank,
  } = useDashboard()

  const idx = getTopicIndex(activeTopicId)
  const isFavorite = favoriteTopics.includes(activeTopicId)
  const isCompleted = completedTopics.includes(activeTopicId)

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 shadow-xs">
      <div className="flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center gap-3 min-w-0">
          <SidebarToggle />
          <nav aria-label="Breadcrumb" className="min-w-0">
            <ol className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
              <li className="hover:text-slate-900 dark:hover:text-slate-200 transition">DevStudio</li>
              <li aria-hidden="true" className="text-slate-300 dark:text-slate-600">/</li>
              <li className="text-slate-600 dark:text-slate-300">{activeTopic.category}</li>
              <li aria-hidden="true" className="text-slate-300 dark:text-slate-600">/</li>
              <li
                className="font-bold text-slate-900 dark:text-white truncate bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent"
                aria-current="page"
              >
                {activeTopic.title}
              </li>
            </ol>
          </nav>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/50 dark:border-slate-700/50 text-slate-800 dark:text-slate-200"
            title={`Current Mastery Rank: ${masteryRank.title}`}
          >
            <span>{masteryRank.icon}</span>
            <span>{masteryRank.title}</span>
          </div>

          <button
            type="button"
            onClick={() => setCommandPaletteOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100/70 dark:bg-slate-800/70 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 border border-slate-200/50 dark:border-slate-700/50 transition-colors"
            title="Open Command Palette (⌘K)"
          >
            <Search className="w-3.5 h-3.5 text-indigo-500" />
            <span className="hidden md:inline">Search...</span>
            <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono font-semibold text-slate-400 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700">
              ⌘K
            </kbd>
          </button>

          <div className="w-px h-5 bg-slate-200 dark:bg-slate-800 mx-0.5 hidden sm:block" />

          <button
            type="button"
            onClick={() => toggleFavorite(activeTopicId)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 ${
              isFavorite
                ? 'text-amber-600 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/60 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 bg-slate-100/70 dark:bg-slate-800/70 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 border border-slate-200/50 dark:border-slate-700/50'
            }`}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            aria-pressed={isFavorite}
          >
            <Star className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current text-amber-500' : ''}`} />
            <span className="hidden sm:inline">{isFavorite ? 'Starred' : 'Star'}</span>
          </button>

          <button
            type="button"
            onClick={() => toggleCompleted(activeTopicId)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${
              isCompleted
                ? 'text-emerald-600 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 bg-slate-100/70 dark:bg-slate-800/70 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 border border-slate-200/50 dark:border-slate-700/50'
            }`}
            aria-label={isCompleted ? 'Mark as incomplete' : 'Mark as completed'}
            aria-pressed={isCompleted}
          >
            <CheckCircle2 className={`w-3.5 h-3.5 ${isCompleted ? 'text-emerald-500' : ''}`} />
            <span className="hidden sm:inline">{isCompleted ? 'Completed' : 'Done'}</span>
          </button>

          <div className="w-px h-5 bg-slate-200 dark:bg-slate-800 mx-0.5" />

          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-500 dark:text-slate-400 bg-slate-100/70 dark:bg-slate-800/70 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 border border-slate-200/50 dark:border-slate-700/50 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>
        </div>
      </div>

      {/* Prev / Next Pagination Sub-bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-2 bg-slate-50/50 dark:bg-slate-950/50 border-t border-slate-200/60 dark:border-slate-800/60 gap-2">
        <button
          type="button"
          onClick={goToPrevious}
          disabled={idx === 0}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 hover:shadow-xs border border-transparent hover:border-slate-200 dark:hover:border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          aria-label="Previous topic"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Previous</span>
        </button>

        <div className="flex items-center gap-2 text-[11px] font-medium text-slate-400">
          <span className="px-2 py-0.5 rounded-full bg-slate-200/60 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-bold">
            {idx + 1} of {topics.length}
          </span>
          <span className="hidden md:inline text-slate-400 dark:text-slate-500">
            Press <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-[10px] text-slate-600 dark:text-slate-300 font-mono">⌘←</kbd> / <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-[10px] text-slate-600 dark:text-slate-300 font-mono">⌘→</kbd>
          </span>
        </div>

        <button
          type="button"
          onClick={goToNext}
          disabled={idx === topics.length - 1}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 hover:shadow-xs border border-transparent hover:border-slate-200 dark:hover:border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          aria-label="Next topic"
        >
          <span>Next</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  )
}
