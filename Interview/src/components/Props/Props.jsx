import React, { useState } from 'react'
import { User, GraduationCap, Phone, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react'

export default function PropsDemo() {
  const [studentData, setStudentData] = useState({
    name: 'Rohan Sharma',
    age: 22,
    course: 'B.Tech Computer Science',
    contact: '+91 98765 43210',
    role: 'Full Stack Learner',
  })

  return (
    <div className="space-y-6">
      {/* Visual Pipeline Banner */}
      <div className="flex items-center justify-between p-3 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200/50 dark:border-indigo-800/40 text-xs font-semibold">
        <span className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-300">
          <Sparkles className="w-4 h-4" />
          <span>Parent Component (State Owner)</span>
        </span>
        <div className="flex items-center gap-1 text-slate-400">
          <span>Passes Props</span>
          <ArrowRight className="w-3.5 h-3.5 animate-pulse text-indigo-500" />
        </div>
        <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-300">
          <ShieldCheck className="w-4 h-4" />
          <span>Child Component (Read-Only)</span>
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Parent Controls */}
        <div className="lg:col-span-6 p-5 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 shadow-md space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-200/60 dark:border-slate-800/60 pb-3">
            <span className="w-2 h-2 rounded-full bg-indigo-500" />
            Parent State Controls
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-500 font-semibold mb-1">Student Name</label>
              <input
                type="text"
                value={studentData.name}
                onChange={(e) => setStudentData({ ...studentData, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-500 font-semibold mb-1">Age</label>
                <input
                  type="number"
                  value={studentData.age}
                  onChange={(e) => setStudentData({ ...studentData, age: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-500 font-semibold mb-1">Role Title</label>
                <input
                  type="text"
                  value={studentData.role}
                  onChange={(e) => setStudentData({ ...studentData, role: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-500 font-semibold mb-1">Course Enrolled</label>
              <input
                type="text"
                value={studentData.course}
                onChange={(e) => setStudentData({ ...studentData, course: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
              />
            </div>
          </div>
        </div>

        {/* Child Profile Card */}
        <div className="lg:col-span-6">
          <StudentProfileCard data={studentData} />
        </div>
      </div>
    </div>
  )
}

function StudentProfileCard({ data }) {
  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-900/40 via-slate-900 to-purple-950 border border-indigo-500/30 text-white shadow-xl space-y-4 relative overflow-hidden">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-indigo-500/30 shrink-0">
          {data.name.charAt(0) || 'S'}
        </div>
        <div>
          <h4 className="text-lg font-bold leading-tight">{data.name || 'Anonymous Student'}</h4>
          <span className="inline-block px-2.5 py-0.5 mt-1 rounded-full text-[11px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            {data.role}
          </span>
        </div>
      </div>

      <div className="space-y-2.5 pt-2 border-t border-slate-800 text-xs font-mono">
        <div className="flex justify-between items-center p-2 rounded-xl bg-slate-950/60 border border-slate-800">
          <span className="text-slate-400 flex items-center gap-1.5 font-sans">
            <User className="w-3.5 h-3.5 text-indigo-400" /> Age
          </span>
          <span className="font-bold text-indigo-300">{data.age} years old</span>
        </div>

        <div className="flex justify-between items-center p-2 rounded-xl bg-slate-950/60 border border-slate-800">
          <span className="text-slate-400 flex items-center gap-1.5 font-sans">
            <GraduationCap className="w-3.5 h-3.5 text-purple-400" /> Course
          </span>
          <span className="font-bold text-purple-300">{data.course}</span>
        </div>

        <div className="flex justify-between items-center p-2 rounded-xl bg-slate-950/60 border border-slate-800">
          <span className="text-slate-400 flex items-center gap-1.5 font-sans">
            <Phone className="w-3.5 h-3.5 text-emerald-400" /> Contact
          </span>
          <span className="font-bold text-emerald-300">{data.contact}</span>
        </div>
      </div>
    </div>
  )
}