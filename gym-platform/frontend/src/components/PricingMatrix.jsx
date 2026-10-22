import { useState } from 'react'
import client from '../api/client'

const tiers = [
  { name: 'Basic', price: 29, features: ['Gym access', 'Locker room', '1 class/week'] },
  { name: 'Performance', price: 59, features: ['Gym access', 'Unlimited classes', '1 PT session/mo'] },
  { name: 'VIP', price: 99, features: ['24/7 access', 'Unlimited classes', '4 PT sessions/mo', 'Nutrition plan'], popular: true },
]

export default function PricingMatrix() {
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')

  const checkout = async (tier) => {
    try {
      const res = await client.post('/checkout', { email, tier: tier.name })
      setMsg(res.data?.url ? 'Redirecting...' : 'Checkout created')
      if (res.data?.url) window.location.href = res.data.url
    } catch (e) {
      setMsg(e.response?.data?.message || 'Checkout failed')
    }
  }

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <h2 className="section-heading">Pricing</h2>
      <div className="mb-6 max-w-md mx-auto">
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com"
          className="input-dark" />
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {tiers.map((t) => (
          <div key={t.name} className={`card-dark ${t.popular ? 'border-gold ring-1 ring-gold/50' : 'border-slate-800'} p-6`}>
            {t.popular && <div className="text-xs font-bold text-gold mb-2 tracking-wider uppercase">Most Popular</div>}
            <h3 className="text-xl font-bold text-white">{t.name}</h3>
            <div className="text-3xl font-extrabold text-gold mt-2">${t.price}<span className="text-sm text-slate-400">/mo</span></div>
            <ul className="mt-4 space-y-2">
              {t.features.map((f) => <li key={f} className="text-slate-300 text-sm flex items-center gap-2"><span className="text-gold">?</span> {f}</li>)}
            </ul>
            <button onClick={() => checkout(t)} className="mt-6 w-full min-h-[44px] rounded-lg bg-gold text-black font-medium hover:bg-yellow-400 transition">
              Get Started
            </button>
          </div>
        ))}
      </div>
      {msg && <p className="text-center text-slate-300 mt-4 text-sm">{msg}</p>}
    </section>
  )
}
