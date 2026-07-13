import { Suspense } from 'react'
import { DashboardProvider } from '../context/DashboardContext'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import TopicPage from './TopicPage'
import ScrollToTop from './ScrollToTop'
import LoadingSpinner from './LoadingSpinner'

function LayoutContent() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-indigo-50/40 to-purple-50/30 dark:from-slate-950 dark:via-indigo-950/40 dark:to-purple-950/20 transition-colors duration-300">
      <Sidebar />
      <div className="lg:pl-72 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8" id="main-content" role="main">
          <Suspense fallback={<LoadingSpinner message="Loading topic..." />}>
            <TopicPage />
          </Suspense>
        </main>
      </div>
      <ScrollToTop />
    </div>
  )
}

export default function Layout() {
  return (
    <DashboardProvider>
      <LayoutContent />
    </DashboardProvider>
  )
}
