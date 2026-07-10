export default function Workflow({ workflow }) {
  if (!workflow) return null

  const { purpose, steps, execution, useCase, bestPractices, mistakes } = workflow

  return (
    <section className="mt-8" aria-labelledby="workflow-title">
      <h2 id="workflow-title" className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6">
        Workflow
      </h2>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Flow diagram */}
        <div className="rounded-2xl p-6 bg-white/60 dark:bg-slate-800/40 backdrop-blur-md border border-white/50 dark:border-slate-700/50 shadow-sm">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#e29578] dark:text-[#e7bc91] mb-4">
            Flow of Execution
          </h3>
          <div className="flex flex-col items-center gap-0">
            {steps.map((step, i) => (
              <div key={step} className="flex flex-col items-center w-full">
                <div className="w-full px-4 py-3 rounded-xl bg-linear-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20 border border-indigo-200/50 dark:border-indigo-700/50 text-center">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{step}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className="flex flex-col items-center py-1" aria-hidden="true">
                    <div className="w-0.5 h-4 bg-indigo-300 dark:bg-indigo-600" />
                    <span className="text-indigo-400 dark:text-indigo-500 text-xs">▼</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="space-y-4">
          <InfoBlock title="Purpose" content={purpose} />
          <InfoBlock title="Real-World Use Case" content={useCase} />
          <ListBlock title="Step-by-Step" items={execution} />
          <ListBlock title="Best Practices" items={bestPractices} variant="success" />
          <ListBlock title="Common Mistakes" items={mistakes} variant="warning" />
        </div>
      </div>
    </section>
  )
}

function InfoBlock({ title, content }) {
  return (
    <div className="rounded-xl p-4 bg-white/60 dark:bg-slate-800/40 backdrop-blur-md border border-white/50 dark:border-slate-700/50">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-1">{title}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{content}</p>
    </div>
  )
}

function ListBlock({ title, items, variant = 'default' }) {
  const dotColor =
    variant === 'success'
      ? 'bg-emerald-500'
      : variant === 'warning'
        ? 'bg-amber-500'
        : 'bg-indigo-500'

  return (
    <div className="rounded-xl p-4 bg-white/60 dark:bg-slate-800/40 backdrop-blur-md border border-white/50 dark:border-slate-700/50">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-2">{title}</h3>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
            <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${dotColor}`} aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
