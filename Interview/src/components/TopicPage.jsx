import { useDashboard } from '../context/DashboardContext'
import Workflow from './Workflow'
import CodeViewer from './CodeViewer'
import { getTopicCode } from '../data/topicCode'
import { AlertCircle, Lightbulb, ThumbsUp, ThumbsDown, HelpCircle } from 'lucide-react'

export default function TopicPage() {
  const { activeTopic } = useDashboard()
  const DemoComponent = activeTopic.component
  const code = getTopicCode(activeTopic.id)
  const { keyPoints } = activeTopic
  const Icon = activeTopic.icon

  return (
    <article
      key={activeTopic.id}
      className="max-w-5xl mx-auto animate-fade-in"
      aria-labelledby="topic-title"
    >
      {/* Hero card */}
      <div className="rounded-3xl p-6 sm:p-8 mb-6 bg-white/60 dark:bg-slate-800/40 backdrop-blur-md border border-white/50 dark:border-slate-700/50 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-linear-to-br from-[#90e0ef] to-[#00b4d8] text-white shadow-lg shrink-0">
            <Icon className="w-7 h-7" aria-hidden="true" />
          </div>
          <div>
            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 mb-2">
              {activeTopic.category}
            </span>
            <h1
              id="topic-title"
              className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2"
            >
              {activeTopic.title}
            </h1>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
              {activeTopic.description}
            </p>
          </div>
        </div>
      </div>

      {/* Live Demo */}
      <section aria-labelledby="demo-title">
        <h2
          id="demo-title"
          className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
          Live Demo
        </h2>
        <div className="rounded-2xl overflow-hidden border border-slate-200/60 dark:border-slate-700/60 bg-white/40 dark:bg-slate-900/30 backdrop-blur-sm shadow-inner">
          <div className="demo-wrapper overflow-auto max-h-[70vh]">
            <DemoComponent />
          </div>
        </div>
      </section>

      <Workflow workflow={activeTopic.workflow} />

      {code && <CodeViewer code={code} filename={`${activeTopic.title.replace(/\s+/g, '')}.jsx`} />}

      {/* Key Points */}
      <section className="mt-8" aria-labelledby="key-points-title">
        <h2 id="key-points-title" className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">
          Key Points
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <KeyPointCard
            icon={Lightbulb}
            title="Why Use It"
            content={keyPoints.why}
            color="black"
          />
          <KeyPointCard
            icon={ThumbsUp}
            title="Advantages"
            items={keyPoints.advantages}
            color="black"
          />
          <KeyPointCard
            icon={ThumbsDown}
            title="Limitations"
            items={keyPoints.limitations}
            color="black"
          />
          <KeyPointCard
            icon={HelpCircle}
            title="Interview Questions"
            items={keyPoints.interviewQuestions}
            color="black"
          />
          {keyPoints.mistakes && (
            <KeyPointCard
              icon={AlertCircle}
              title="Common Mistakes"
              items={keyPoints.mistakes}
              color="black"
              className="sm:col-span-2"
            />
          )}
        </div>
      </section>
    </article>
  )
}

function KeyPointCard({ icon: Icon, title, content, items, color, className = '' }) {
  const colors = {
    indigo: 'from-indigo-500/10 to-indigo-500/5 border-indigo-200/50 dark:border-indigo-800/50',
    emerald: 'from-emerald-500/10 to-emerald-500/5 border-emerald-200/50 dark:border-emerald-800/50',
    amber: 'from-amber-500/10 to-amber-500/5 border-amber-200/50 dark:border-amber-800/50',
    purple: 'from-purple-500/10 to-purple-500/5 border-purple-200/50 dark:border-purple-800/50',
    rose: 'from-rose-500/10 to-rose-500/5 border-rose-200/50 dark:border-rose-800/50',
  }

  const iconColors = {
    indigo: 'text-indigo-600 dark:text-indigo-400',
    emerald: 'text-emerald-600 dark:text-emerald-400',
    amber: 'text-amber-600 dark:text-amber-400',
    purple: 'text-purple-600 dark:text-purple-400',
    rose: 'text-rose-600 dark:text-rose-400',
  }

  return (
    <div
      className={`rounded-2xl p-5 bg-linear-to-br ${colors[color]} border backdrop-blur-sm ${className}`}
    >
      <div className="flex items-center gap-2 mb-2">
        <Icon className={`w-4 h-4 ${iconColors[color]}`} aria-hidden="true" />
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">{title}</h3>
      </div>
      {content && (
        <p className="text-sm text-slate-600 dark:text-slate-700 leading-relaxed">{content}</p>
      )}
      {items && (
        <ul className="space-y-1.5 mt-1">
          {items.map((item) => (
            <li key={item} className="text-sm text-slate-600 dark:text-slate-700 flex items-start gap-2">
              <span className="text-slate-300 dark:text-slate-600 mt-0.5" aria-hidden="true">
                •
              </span>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
