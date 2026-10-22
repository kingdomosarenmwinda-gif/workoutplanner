import { useState, useEffect } from 'react'
import client from '../api/client'

export default function AdminDashboard() {
  const [members, setMembers] = useState([])
  const [q, setQ] = useState('')
  const [authed, setAuthed] = useState(!!localStorage.getItem('token'))

  useEffect(() => {
    if (!authed) return
    client.get('/admin/members').then((r) => setMembers(r.data?.data || r.data || [])).catch(() => setMembers([]))
  }, [authed])

  const filtered = members.filter((m) =>
    (m.name || '').toLowerCase().includes(q.toLowerCase()) ||
    (m.email || '').toLowerCase().includes(q.toLowerCase())
  )

  const toggle = async (id, checked) => {
    setMembers((ms) => ms.map((m) => m.id === id ? { ...m, checked_in: checked } : m))
    try { await client.post('/admin/attendance', { member_id: id, checked_in: checked }) } catch {}
  }

  if (!authed) return <div className="p-8 text-center text-slate-400">Please log in to access admin.</div>

  return (
    <section className="py-8 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-white">Admin Dashboard</h2>
        <div className="relative w-full md:w-80">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search members..."
            className="input-dark w-full pl-9" />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">?</span>
        </div>
      </div>
      <div className="space-y-2">
        {filtered.map((m) => (
          <div key={m.id} className={`card-dark p-4 ${m.status === 'Delinquent' || !m.waiver_signed ? 'border-red-500' : 'border-slate-800'}`}>
            <div>
              <div className="font-semibold text-white">{m.name}</div>
              <div className="text-sm text-slate-400">{m.email}</div>
              <div className="flex gap-2 mt-1">
                <span className={`text-xs px-2 py-0.5 rounded ${m.status === 'Active' ? 'badge-gold' : m.status === 'Frozen' ? 'bg-slate-700 text-slate-300 border border-slate-600' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>{m.status}</span>
                {m.status === 'Delinquent' && <span className="text-xs text-red-400 font-bold">? Delinquent</span>}
                {!m.waiver_signed && <span className="text-xs text-red-400 font-bold">? Waiver Unsigned</span>}
              </div>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={!!m.checked_in} onChange={(e) => toggle(m.id, e.target.checked)} className="w-5 h-5 text-gold border-slate-600 rounded focus:ring-gold" />
              <span className="text-sm text-slate-300">Checked in</span>
            </label>
          </div>
        ))}
      </div>
    </section>
  )
}
