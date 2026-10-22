import { useState, useEffect } from 'react'
import client from '../api/client'
import exercises from '../data/exercises'
import ExerciseModal from './ExerciseModal'

const placeholder = exercises

const localByName = placeholder.reduce((acc, e) => {
  acc[e.name] = e
  return acc
}, {})

function mergeExercises(list) {
  if (!Array.isArray(list) || list.length === 0) return placeholder
  return list.map((ex) => {
    const local = localByName[ex.name]
    return {
      ...local,
      ...ex,
      id: ex.id ?? local?.id,
      duration: local?.duration ?? ex.duration ?? '3 min',
      videoUrl: local?.videoUrl ?? ex.videoUrl ?? ex.video_url,
      instructions: local?.instructions ?? ex.instructions ?? [],
    }
  })
}

export default function ExerciseLibrary() {
  const [exercisesList, setExercises] = useState(placeholder)
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    client.get('/exercises')
      .then((r) => setExercises(mergeExercises(r.data?.data || r.data)))
      .catch(() => setError('Using placeholder data'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <h2 className="section-heading">Exercise Library</h2>
      {loading && <p className="text-slate-400">Loading...</p>}
      {error && <p className="text-amber-400 text-sm mb-4">{error}</p>}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {exercisesList.map((ex) => (
          <div
            key={ex.id ?? ex.name}
            className="card-dark p-4 border border-slate-800 hover:border-gold hover:shadow-[0_0_15px_rgba(212,175,55,0.15)] transition flex flex-col"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="font-semibold text-white break-words">{ex.name}</div>
              <span className="badge-gold shrink-0">{ex.difficulty}</span>
            </div>
            <div className="text-sm text-slate-400 mt-1">Target: {ex.target_muscle}</div>
            <div className="mt-3 mb-4 flex flex-wrap gap-2">
              <span className="badge-gold">Duration: {ex.duration}</span>
            </div>
            <button
              type="button"
              onClick={() => setSelected(ex)}
              className="btn-outline-gold w-full sm:w-auto mt-auto inline-flex items-center justify-center gap-2"
            >
              &#9654; Watch Demo
            </button>
          </div>
        ))}
      </div>
      <ExerciseModal exercise={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
