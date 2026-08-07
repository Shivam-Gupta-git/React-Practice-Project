import { Suspense } from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import TopicPage from './TopicPage'
import ScrollToTop from './ScrollToTop'
import LoadingSpinner from './LoadingSpinner'

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 relative overflow-x-hidden">
      {/* Background ambient gradient glow */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40 dark:opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-200 via-transparent to-purple-200 dark:from-indigo-900 dark:to-purple-950" />

      <Sidebar />
      <div className="lg:pl-72 flex flex-col min-h-screen relative z-10">
        <Navbar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto" id="main-content" role="main">
          <Suspense fallback={<LoadingSpinner message="Loading topic..." />}>
            <TopicPage />
          </Suspense>
        </main>
      </div>
      <ScrollToTop />
    </div>
  )
}

