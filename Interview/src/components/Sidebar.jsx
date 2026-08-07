import { Link } from 'react-router-dom'
import { useDashboard } from '../hooks/useDashboard'
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
  FileText,
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
    topicNotes,
    progress,
    masteryRank,
    topics,
  } = useDashboard()

  const favoriteList = topics.filter((t) => favoriteTopics.includes(t.id))

  return (
    <>
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-72 flex flex-col bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border-r border-slate-200/80 dark:border-slate-800/80 shadow-2xl transition-transform duration-300 ease-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Topic navigation"
      >
        {/* Top Header */}
        <div className="p-5 border-b border-slate-200/80 dark:border-slate-800/80">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/25">
                <BookOpen className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <h1 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                  DevStudio
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">React & Algorithms</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mastery Rank & Progress Indicator */}
          <div className="mb-4 bg-slate-100/60 dark:bg-slate-800/50 p-3.5 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">{masteryRank.icon}</span>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {masteryRank.title}
                  </h4>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Level {masteryRank.level} / 5
                  </span>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/50 dark:border-indigo-800/50">
                {progress}%
              </span>
            </div>

            <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700/60 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Learning progress"
              />
            </div>

            <div className="flex justify-between items-center text-[10px] text-slate-400 dark:text-slate-500 font-medium">
              <span>{completedTopics.length} of {topics.length} completed</span>
              <span>{topics.length - completedTopics.length} remaining</span>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
              aria-hidden="true"
            />
            <input
              type="search"
              placeholder="Filter topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition"
              aria-label="Filter topics"
            />
          </div>
        </div>

        {/* Code Practice Workspace CTA */}
        <div className="px-4 pt-3">
          <Link
            to="/practice"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-2.5 w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <Code2 className="w-4 h-4" />
            Code Practice Workspace
            <ChevronRight className="w-4 h-4 ml-auto opacity-80" />
          </Link>
        </div>

        {/* Category Filters */}
        <div className="px-4 py-3 flex flex-wrap gap-1 border-b border-slate-200/80 dark:border-slate-800/80">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoryFilter(cat)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                categoryFilter === cat
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20'
                  : 'bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:bg-slate-200/80 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
              aria-pressed={categoryFilter === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Navigation Topic List */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1" aria-label="React topics">
          {filteredTopics.length === 0 ? (
            <div className="text-center py-8 px-4">
              <p className="text-xs text-slate-500 dark:text-slate-400">No matching topics found</p>
            </div>
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
                  className={`group w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 font-medium'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/70 hover:translate-x-0.5'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-400'
                    }`}
                    aria-hidden="true"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-semibold truncate">{topic.title}</span>
                      {topic.readTime && (
                        <span className={`text-[10px] font-mono shrink-0 ${isActive ? 'text-indigo-100' : 'text-slate-400 dark:text-slate-500'}`}>
                          {topic.readTime.replace(' read', '')}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="flex items-center gap-1 shrink-0">
                    {topic.difficulty && (
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          topic.difficulty === 'Beginner'
                            ? 'bg-emerald-400'
                            : topic.difficulty === 'Advanced'
                            ? 'bg-rose-400'
                            : 'bg-amber-400'
                        }`}
                        title={`Difficulty: ${topic.difficulty}`}
                      />
                    )}
                    {Boolean(topicNotes?.[topic.id]?.trim()) && (
                      <FileText
                        className={`w-3 h-3 ${isActive ? 'text-amber-200' : 'text-amber-400'}`}
                        title="Has personal notes"
                      />
                    )}
                    {isFavorite && (
                      <Star
                        className={`w-3 h-3 ${isActive ? 'text-amber-200 fill-amber-200' : 'text-amber-400 fill-amber-400'}`}
                        aria-label="Favorite"
                      />
                    )}
                    {isCompleted && (
                      <CheckCircle2
                        className={`w-3 h-3 ${isActive ? 'text-emerald-200' : 'text-emerald-500'}`}
                        aria-label="Completed"
                      />
                    )}
                    {isActive && <ChevronRight className="w-3.5 h-3.5 opacity-80" aria-hidden="true" />}
                  </span>
                </button>
              )
            })
          )}
        </nav>

        {/* Favorites Section */}
        {favoriteList.length > 0 && (
          <div className="p-4 border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" aria-hidden="true" />
              Starred ({favoriteList.length})
            </p>
            <div className="flex flex-wrap gap-1">
              {favoriteList.slice(0, 4).map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => selectTopic(t.id)}
                  className="px-2 py-1 rounded-md text-[11px] font-medium bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200/50 dark:border-amber-800/50 hover:bg-amber-100 transition"
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
