import { useEffect } from 'react'
import ExerciseAnimation from './ExerciseAnimation'

function buildEmbedUrl(url) {
  if (!url) return ''
  let base = url.split('?')[0]
  let id = ''
  if (base.includes('/embed/')) {
    id = base.split('/embed/')[1]
  } else if (base.includes('youtu.be/')) {
    id = base.split('youtu.be/')[1]
    base = `https://www.youtube.com/embed/${id}`
  } else {
    return url
  }
  if (!id) return url
  return `${base}?autoplay=1&playsinline=1&loop=1&rel=0&playlist=${id}`
}

function formatDuration(duration) {
  if (duration === null || duration === undefined || duration === '') return ''
  if (typeof duration === 'number') return `${duration} min`
  const match = String(duration).match(/\d+/)
  return match ? `${match[0]} min` : String(duration)
}

export default function ExerciseModal({ exercise, onClose }) {
  useEffect(() => {
    if (!exercise) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [exercise, onClose])

  if (!exercise) return null

  const videoSrc = exercise.videoUrl || exercise.video_url
  const embedSrc = buildEmbedUrl(videoSrc)
  const duration = formatDuration(exercise.duration)
  const muscle = exercise.target_muscle || exercise.muscle
  const instructions = exercise.instructions || []

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${exercise.name} exercise details`}
    >
      <div
        className="card-dark w-full max-w-2xl bg-slate-900 border border-gold/30 shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 p-4 border-b border-slate-800">
          <div className="min-w-0">
            <h3 className="text-xl font-bold text-white break-words">{exercise.name}</h3>
            {muscle && <p className="text-sm text-gold mt-0.5">{`Target: ${muscle}`}</p>}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {duration && <span className="badge-gold whitespace-nowrap">{`Duration: ${duration}`}</span>}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-slate-400 hover:text-gold hover:bg-gold/10 transition"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="aspect-video w-full rounded-xl bg-black overflow-hidden mb-4 border border-slate-800">
            <ExerciseAnimation type={exercise.animationType} />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 text-sm">
            {muscle && (
              <div className="col-span-2 sm:col-span-1 card-dark border border-slate-800 px-3 py-2">
                <span className="block text-xs uppercase tracking-wide text-slate-500">Target</span>
                <span className="text-gold font-semibold">{muscle}</span>
              </div>
            )}
            {exercise.sets != null && (
              <div className="card-dark border border-slate-800 px-3 py-2">
                <span className="block text-xs uppercase tracking-wide text-slate-500">Sets</span>
                <span className="text-white font-semibold">{exercise.sets}</span>
              </div>
            )}
            {exercise.reps != null && (
              <div className="card-dark border border-slate-800 px-3 py-2">
                <span className="block text-xs uppercase tracking-wide text-slate-500">Reps</span>
                <span className="text-white font-semibold">{exercise.reps}</span>
              </div>
            )}
            {exercise.difficulty && (
              <div className="card-dark border border-slate-800 px-3 py-2">
                <span className="block text-xs uppercase tracking-wide text-slate-500">Difficulty</span>
                <span className="badge-gold">{exercise.difficulty}</span>
              </div>
            )}
          </div>

          {instructions.length > 0 && (
            <div>
              <h4 className="text-gold font-semibold mb-2">How to Perform</h4>
              <ol className="space-y-2">
                {instructions.map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm text-slate-300 leading-relaxed">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-gold text-black text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
