import { useState, useEffect } from 'react'
import client from '../api/client'

const placeholder = [
  { id: 1, title: 'Morning Yoga', coach: 'Sarah', start_time: '07:00', duration: 60, capacity: 20, booked: 18 },
  { id: 2, title: 'HIIT Blast', coach: 'Mike', start_time: '09:00', duration: 45, capacity: 15, booked: 15 },
  { id: 3, title: 'Strength 101', coach: 'John', start_time: '18:00', duration: 60, capacity: 12, booked: 5 },
]

export default function ClassSchedule() {
  const [classes, setClasses] = useState(placeholder)
  const [msg, setMsg] = useState({})

  useEffect(() => {
    client.get('/classes').then((r) => setClasses(r.data?.data || r.data || placeholder)).catch(() => {})
  }, [])

  const book = async (id) => {
    try {
      await client.post('/bookings/create', { class_id: id })
      setMsg((m) => ({ ...m, [id]: { type: 'ok', text: 'Booked!' } }))
    } catch (e) {
      setMsg((m) => ({ ...m, [id]: { type: 'err', text: e.response?.data?.message || 'Booking failed' } }))
    }
  }

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <h2 className="section-heading">Class Schedule</h2>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {classes.map((c) => {
          const full = c.booked >= c.capacity
          return (
            <div key={c.id} className="card-dark p-4 border border-slate-700">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-white">{c.title}</h3>
                {full && <span className="text-xs px-2 py-1 rounded bg-red-500/20 text-red-400 border border-red-500/30">Full</span>}
              </div>
              <p className="text-sm text-slate-400 mt-1">Coach: {c.coach}</p>
              <p className="text-sm text-slate-400">{c.start_time} • {c.duration} min • {c.booked}/{c.capacity}</p>
              <button disabled={full} onClick={() => book(c.id)}
                className="mt-3 w-full min-h-[44px] rounded-lg bg-gold text-black font-medium disabled:opacity-50 disabled:pointer-events-none hover:bg-yellow-400 transition">
                Book Now
              </button>
              {msg[c.id] && (
                <p className={`text-sm mt-2 ${msg[c.id].type === 'ok' ? 'text-gold' : 'text-red-400'}`}>{msg[c.id].text}</p>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
