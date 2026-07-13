import { Link } from 'react-router-dom'
import { useDashboard } from '../context/DashboardContext'
import { categories } from '../data/topics'
import {
  Search,
  X,
  Menu,
  BookOpen,
  Star,
  CheckCircle2,
  ChevronRight,
  Code2,
} from 'lucide-react'

export default function Sidebar() {
  const {
    filteredTopics,
    activeTopicId,
    selectTopic,
    sidebarOpen,
    setSidebarOpen,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    completedTopics,
    favoriteTopics,
    progress,
    topics,
  } = useDashboard()

  const favoriteList = topics.filter((t) => favoriteTopics.includes(t.id))

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-72 flex flex-col bg-white/80 dark:bg-slate-900/90 backdrop-blur-xl border-r border-slate-200/60 dark:border-slate-700/60 shadow-xl transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Topic navigation"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-200/60 dark:border-slate-700/60">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#38a3a5] text-white shadow-lg">
                <BookOpen className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <h1 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                  React Learn
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">Interactive Dashboard</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress */}
          <div className="mb-4">
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Progress</span>
              <span className="text-[#38a3a5] dark:text-[#38a3a5] font-semibold">{progress}%</span>
            </div>
            <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
              <div
                className="h-full rounded-full bg-[#bc8a5f] transition-all duration-500"
                style={{ width: `${progress}%` }}
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Learning progress"
              />
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {completedTopics.length} of {topics.length} completed
            </p>
          </div>

          {/* Search */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
              aria-hidden="true"
            />
            <input
              type="search"
              placeholder="Search topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition"
              aria-label="Search topics"
            />
          </div>
        </div>

        {/* Code Practice link */}
        <div className="px-4 pt-3">
          <Link
            to="/practice"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-sm font-medium bg-linear-to-r from-indigo-500 to-purple-500 text-white shadow-md shadow-indigo-500/25 hover:shadow-lg transition"
          >
            <Code2 className="w-4 h-4" />
            Code Practice
            <ChevronRight className="w-4 h-4 ml-auto opacity-70" />
          </Link>
        </div>

        {/* Category filters */}
        <div className="px-4 py-3 flex flex-wrap gap-1.5 border-b border-slate-200/60 dark:border-slate-700/60">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoryFilter(cat)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                categoryFilter === cat
                  ? 'bg-[#a47148] text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-[#a47148]'
              }`}
              aria-pressed={categoryFilter === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1" aria-label="React topics">
          {filteredTopics.length === 0 ? (
            <p className="text-sm text-slate-500 text-center py-8">No topics found</p>
          ) : (
            filteredTopics.map((topic) => {
              const Icon = topic.icon
              const isActive = activeTopicId === topic.id
              const isCompleted = completedTopics.includes(topic.id)
              const isFavorite = favoriteTopics.includes(topic.id)

              return (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => selectTopic(topic.id)}
                  className={`group w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:[#603808] ${
                    isActive
                      ? 'bg-linear-to-r from-[#a47148] to-[#a47148] text-white shadow-md shadow-indigo-500/25'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:translate-x-0.5'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-[#6f4518] dark:text-[#a47148]'}`}
                    aria-hidden="true"
                  />
                  <span className="flex-1 text-sm font-medium truncate">{topic.title}</span>
                  <span className="flex items-center gap-1 shrink-0">
                    {isFavorite && (
                      <Star
                        className={`w-3 h-3 ${isActive ? 'text-amber-200 fill-amber-200' : 'text-amber-400 fill-amber-400'}`}
                        aria-label="Favorite"
                      />
                    )}
                    {isCompleted && (
                      <CheckCircle2
                        className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-200' : 'text-emerald-500'}`}
                        aria-label="Completed"
                      />
                    )}
                    {isActive && <ChevronRight className="w-4 h-4 opacity-70" aria-hidden="true" />}
                  </span>
                </button>
              )
            })
          )}
        </nav>

        {/* Favorites summary */}
        {favoriteList.length > 0 && (
          <div className="p-4 border-t border-slate-200/60 dark:border-slate-700/60">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" aria-hidden="true" />
              Favorites ({favoriteList.length})
            </p>
            <div className="flex flex-wrap gap-1">
              {favoriteList.slice(0, 4).map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => selectTopic(t.id)}
                  className="px-2 py-0.5 rounded-md text-xs bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 hover:bg-amber-100 transition"
                >
                  {t.title}
                </button>
              ))}
            </div>
          </div>
        )}
      </aside>
    </>
  )
}

export function SidebarToggle() {
  const { setSidebarOpen } = useDashboard()
  return (
    <button
      type="button"
      onClick={() => setSidebarOpen(true)}
      className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition"
      aria-label="Open navigation menu"
    >
      <Menu className="w-5 h-5" />
    </button>
  )
}
