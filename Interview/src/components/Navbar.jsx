import { useDashboard } from '../context/DashboardContext'
import { SidebarToggle } from './Sidebar'
import { Moon, Sun, Star, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react'
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
  } = useDashboard()

  const idx = getTopicIndex(activeTopicId)
  const isFavorite = favoriteTopics.includes(activeTopicId)
  const isCompleted = completedTopics.includes(activeTopicId)

  return (
    <header className="sticky top-0 z-30 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-700/60">
      <div className="flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center gap-3 min-w-0">
          <SidebarToggle />
          <nav aria-label="Breadcrumb" className="min-w-0">
            <ol className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
              <li>React Learn</li>
              <li aria-hidden="true">/</li>
              <li className="text-slate-400">{activeTopic.category}</li>
              <li aria-hidden="true">/</li>
              <li
                className="font-semibold text-slate-800 dark:text-slate-100 truncate"
                aria-current="page"
              >
                {activeTopic.title}
              </li>
            </ol>
          </nav>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            type="button"
            onClick={() => toggleFavorite(activeTopicId)}
            className={`p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${
              isFavorite
                ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/30'
                : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            aria-pressed={isFavorite}
          >
            <Star className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>

          <button
            type="button"
            onClick={() => toggleCompleted(activeTopicId)}
            className={`p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${
              isCompleted
                ? 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30'
                : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            aria-label={isCompleted ? 'Mark as incomplete' : 'Mark as completed'}
            aria-pressed={isCompleted}
          >
            <CheckCircle2 className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Prev / Next */}
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 pb-3 gap-2">
        <button
          type="button"
          onClick={goToPrevious}
          disabled={idx === 0}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          aria-label="Previous topic"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Previous</span>
        </button>
        <span className="text-xs text-slate-400">
          {idx + 1} / {topics.length}
          <span className="hidden sm:inline text-slate-300 dark:text-slate-600 mx-2">·</span>
          <span className="hidden sm:inline">⌘← / ⌘→ to navigate</span>
        </span>
        <button
          type="button"
          onClick={goToNext}
          disabled={idx === topics.length - 1}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          aria-label="Next topic"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </header>
  )
}
