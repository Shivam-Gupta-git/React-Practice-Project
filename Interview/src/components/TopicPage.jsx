import { useDashboard } from '../hooks/useDashboard'
import Workflow from './Workflow'
import CodeViewer from './CodeViewer'
import TopicQuiz from './TopicQuiz'
import TopicNotes from './TopicNotes'
import TopicFlashcards from './TopicFlashcards'
import { getTopicCode } from '../data/topicCode'
import { AlertCircle, Lightbulb, ThumbsUp, ThumbsDown, HelpCircle, Clock } from 'lucide-react'

export default function TopicPage() {
  const { activeTopic } = useDashboard()
  const DemoComponent = activeTopic.component
  const code = getTopicCode(activeTopic.id)
  const { keyPoints } = activeTopic
  const Icon = activeTopic.icon

  const difficultyColor =
    activeTopic.difficulty === 'Beginner'
      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/50'
      : activeTopic.difficulty === 'Advanced'
      ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 border-rose-200 dark:border-rose-800/50'
      : 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-300 border-amber-200 dark:border-amber-800/50'

  return (
    <article
      key={activeTopic.id}
      className="max-w-5xl mx-auto space-y-8 animate-fade-in pb-12"
      aria-labelledby="topic-title"
    >
      {/* Hero card */}
      <div className="rounded-3xl p-6 sm:p-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-start gap-5 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/30 shrink-0">
            <Icon className="w-6 h-6" aria-hidden="true" />
          </div>
          <div className="space-y-2 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-800/50">
                {activeTopic.category}
              </span>
              {activeTopic.difficulty && (
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${difficultyColor}`}>
                  {activeTopic.difficulty}
                </span>
              )}
              {activeTopic.readTime && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700/80">
                  <Clock className="w-3 h-3" />
                  {activeTopic.readTime}
                </span>
              )}
            </div>
            <h1
              id="topic-title"
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight"
            >
              {activeTopic.title}
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
              {activeTopic.description}
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Demo */}
      <section className="space-y-4" aria-labelledby="demo-section-title">
        <div className="flex items-center justify-between">
          <h2 id="demo-section-title" className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Interactive Playground
          </h2>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Live preview of {activeTopic.title} behavior
          </span>
        </div>
        <div className="p-4 sm:p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl min-h-[220px]">
          <DemoComponent />
        </div>
      </section>

      {/* Workflow Diagram */}
      <Workflow workflow={activeTopic.workflow} topicTitle={activeTopic.title} />

      {/* Code Viewer */}
      <CodeViewer code={code} codePath={activeTopic.codePath} topicTitle={activeTopic.title} />

      {/* Key points & summary */}
      <section className="space-y-4" aria-labelledby="key-points-title">
        <h2 id="key-points-title" className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
          Key Concepts & Interview Takeaways
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <KeyPointCard
            icon={Lightbulb}
            title="Core Purpose & Usage"
            content={keyPoints.why}
            color="amber"
          />
          <KeyPointCard
            icon={ThumbsUp}
            title="Advantages & Strengths"
            items={keyPoints.advantages}
            color="emerald"
          />
          <KeyPointCard
            icon={ThumbsDown}
            title="Trade-offs & Limitations"
            items={keyPoints.limitations}
            color="purple"
          />
          <KeyPointCard
            icon={HelpCircle}
            title="Frequent Interview Questions"
            items={keyPoints.interviewQuestions}
            color="indigo"
          />
          {keyPoints.mistakes && (
            <KeyPointCard
              icon={AlertCircle}
              title="Pitfalls & Anti-Patterns"
              items={keyPoints.mistakes}
              color="rose"
              className="sm:col-span-2"
            />
          )}
        </div>
      </section>

      {/* Self-Assessment Quiz */}
      <TopicQuiz topicId={activeTopic.id} topicTitle={activeTopic.title} />

      {/* Interview Flashcards Drill */}
      <TopicFlashcards
        topicId={activeTopic.id}
        topicTitle={activeTopic.title}
        questions={keyPoints?.interviewQuestions}
        keyPoints={keyPoints}
      />

      {/* Personal Study Notes & Scratchpad */}
      <TopicNotes topicId={activeTopic.id} topicTitle={activeTopic.title} />
    </article>
  )
}

function KeyPointCard({ icon: IconComponent, title, content, items, color = 'indigo', className = '' }) {
  const colorStyles = {
    indigo: 'bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-200/60 dark:border-indigo-800/40 text-indigo-600 dark:text-indigo-400',
    emerald: 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200/60 dark:border-emerald-800/40 text-emerald-600 dark:text-emerald-400',
    amber: 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-200/60 dark:border-amber-800/40 text-amber-600 dark:text-amber-400',
    purple: 'bg-purple-50/50 dark:bg-purple-950/20 border-purple-200/60 dark:border-purple-800/40 text-purple-600 dark:text-purple-400',
    rose: 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-200/60 dark:border-rose-800/40 text-rose-600 dark:text-rose-400',
  }

  const activeStyle = colorStyles[color] || colorStyles.indigo

  return (
    <div
      className={`rounded-2xl p-5 border backdrop-blur-xl transition-all duration-200 hover:shadow-md ${activeStyle.split(' ').slice(0, 4).join(' ')} ${className}`}
    >
      <div className="flex items-center gap-2.5 mb-2.5">
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${activeStyle.split(' ').slice(0, 2).join(' ')} ${activeStyle.split(' ').slice(-2).join(' ')}`}>
          <IconComponent className="w-4 h-4" aria-hidden="true" />
        </div>
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">{title}</h3>
      </div>
      {content && (
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{content}</p>
      )}
      {items && (
        <ul className="space-y-1.5 mt-2">
          {items.map((item) => (
            <li key={item} className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 flex items-start gap-2">
              <span className="text-indigo-400 dark:text-indigo-500 font-bold text-xs mt-0.5" aria-hidden="true">
                ✓
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
