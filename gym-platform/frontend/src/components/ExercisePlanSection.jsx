import { useState } from 'react'
import ExerciseModal from './ExerciseModal'

export default function ExercisePlanSection({ plan }) {
  const [selected, setSelected] = useState(null)

  return (
    <section className="py-8 px-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gold mb-2">{plan.name}</h1>
      <p className="text-slate-400 mb-6">Frequency: {plan.frequency}</p>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {plan.exercises.map((e, i) => (
          <div key={i} className="card-dark border border-slate-800 p-4 rounded-2xl flex flex-col">
            <h2 className="font-semibold text-white text-lg break-words">{e.name}</h2>

            <div className="text-sm text-slate-400 mt-1">
              Target: <span className="text-gold font-medium">{e.muscle}</span> &middot; Sets:{' '}
              <span className="text-slate-200">{e.sets}</span> &middot; Reps:{' '}
              <span className="text-slate-200">{e.reps}</span>
            </div>

            <div className="mt-3 mb-4">
              <span className="badge-gold">{`Duration: ${e.duration}`}</span>
            </div>

            <button
              type="button"
              onClick={() => setSelected(e)}
              className="btn-outline-gold w-full sm:w-auto mt-auto inline-flex items-center justify-center gap-2"
            >
              &#9654; Watch Demo
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 card-dark border border-slate-800 p-4 rounded-2xl">
        <h2 className="text-gold font-semibold mb-2">Diet Plan</h2>
        <ul className="list-disc pl-5 text-slate-300 space-y-1">
          {plan.diet.map((x, i) => (
            <li key={i}>{x}</li>
          ))}
        </ul>
      </div>

      <ExerciseModal exercise={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
