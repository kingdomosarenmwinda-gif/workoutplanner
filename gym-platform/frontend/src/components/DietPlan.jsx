import { useState } from 'react'

const GOALS = [
  { key: 'muscle', label: 'Muscle Gain', calories: '2,500–3,000 kcal', protein: '1.6–2.2 g/kg' },
  { key: 'fat', label: 'Fat Loss', calories: '1,800–2,200 kcal', protein: '2.0–2.4 g/kg' },
  { key: 'strength', label: 'Strength', calories: '2,200–2,700 kcal', protein: '1.6–2.0 g/kg' },
]

const PLANS = {
  muscle: {
    summary: 'Surplus of ~300–500 kcal above maintenance. Prioritize protein at every meal and carbs around training.',
    protein: '1.6–2.2 g per kg of body weight',
    meals: [
      { time: '7:00 AM', meal: 'Breakfast', items: 'Rolled oats, whey protein, banana, almond butter', calories: '600 kcal', protein: '40 g' },
      { time: '10:30 AM', meal: 'Mid-Morning Snack', items: 'Greek yogurt, berries, almonds', calories: '300 kcal', protein: '25 g' },
      { time: '1:00 PM', meal: 'Lunch (pre-workout carbs)', items: 'Grilled chicken, brown rice, broccoli, olive oil', calories: '700 kcal', protein: '45 g' },
      { time: '4:00 PM', meal: 'Pre-Workout', items: 'Rice cakes, honey, whey isolate', calories: '250 kcal', protein: '20 g' },
      { time: '7:00 PM', meal: 'Dinner (post-workout)', items: 'Salmon, sweet potato, asparagus', calories: '700 kcal', protein: '45 g' },
      { time: '9:30 PM', meal: 'Before Bed', items: 'Cottage cheese, casein shake', calories: '250 kcal', protein: '30 g' },
    ],
    total: '~2,800 kcal', totalProtein: '~205 g',
  },
  fat: {
    summary: 'Moderate deficit of ~300–500 kcal below maintenance. High protein to preserve muscle; carbs timed around workouts.',
    protein: '2.0–2.4 g per kg of body weight',
    meals: [
      { time: '7:00 AM', meal: 'Breakfast', items: '3 egg whites, 1 whole egg, spinach, berries', calories: '350 kcal', protein: '30 g' },
      { time: '10:30 AM', meal: 'Mid-Morning Snack', items: 'Apple, whey protein shake', calories: '200 kcal', protein: '25 g' },
      { time: '1:00 PM', meal: 'Lunch', items: 'Turkey breast, quinoa, mixed greens, avocado', calories: '450 kcal', protein: '35 g' },
      { time: '4:00 PM', meal: 'Pre-Workout', items: 'Banana, BCAA or electrolytes', calories: '100 kcal', protein: '2 g' },
      { time: '7:00 PM', meal: 'Dinner (post-workout)', items: 'White fish, sweet potato, green beans', calories: '450 kcal', protein: '35 g' },
      { time: '9:00 PM', meal: 'Before Bed', items: 'Casein shake, walnuts', calories: '250 kcal', protein: '25 g' },
    ],
    total: '~1,800 kcal', totalProtein: '~152 g',
  },
  strength: {
    summary: 'Maintenance to slight surplus. Carbs centered on training windows; steady protein across the day.',
    protein: '1.6–2.0 g per kg of body weight',
    meals: [
      { time: '7:00 AM', meal: 'Breakfast', items: 'Oats, eggs, whey, peanut butter', calories: '650 kcal', protein: '40 g' },
      { time: '10:30 AM', meal: 'Mid-Morning Snack', items: 'Greek yogurt, honey, granola', calories: '300 kcal', protein: '25 g' },
      { time: '1:00 PM', meal: 'Lunch (pre-workout carbs)', items: 'Lean beef, rice, roasted vegetables', calories: '700 kcal', protein: '45 g' },
      { time: '4:00 PM', meal: 'Pre-Workout', items: 'Rice cake, honey, whey isolate', calories: '200 kcal', protein: '20 g' },
      { time: '7:00 PM', meal: 'Dinner (post-workout)', items: 'Chicken thigh, potato, asparagus, butter', calories: '700 kcal', protein: '45 g' },
      { time: '9:30 PM', meal: 'Before Bed', items: 'Cottage cheese, almond butter', calories: '250 kcal', protein: '30 g' },
    ],
    total: '~2,800 kcal', totalProtein: '~205 g',
  },
}

export default function DietPlan() {
  const [goal, setGoal] = useState('muscle')
  const plan = PLANS[goal]

  return (
    <section className="py-12 px-4 max-w-4xl mx-auto">
      <div className="card-dark p-6 mb-8 border border-slate-700">
        <h2 className="section-heading mb-4">Diet Plan</h2>
        <div className="flex gap-2 md:flex-wrap" role="radiogroup" aria-label="Fitness goal">
          {GOALS.map((g) => (
            <button
              key={g.key}
              role="radio"
              aria-checked={goal === g.key}
              onClick={() => setGoal(g.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition border ${goal === g.key ? 'bg-gold text-black border-gold' : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-gold'} min-h-[44px]`}
            >
              {g.label}
            </button>
          ))}
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700">
            <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Daily Calories</div>
            <div className="text-xl font-bold text-white">{plan.calories}</div>
          </div>
          <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700">
            <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Protein Target</div>
            <div className="text-xl font-bold text-white">{plan.protein}</div>
          </div>
          <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700">
            <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Goal</div>
            <div className="text-xl font-bold text-gold">{goal.charAt(0).toUpperCase() + goal.slice(1)}</div>
          </div>
        </div>
        <p className="mt-4 text-sm text-slate-400">{plan.summary}</p>
      </div>

      <div className="card-dark p-6 border border-slate-700">
        <h3 className="text-xl font-bold text-white mb-6">Meal Timing</h3>
        <div className="space-y-3">
          {plan.meals.map((m, i) => (
            <div key={i} className="flex flex-col md:flex-row gap-4 items-start p-3 rounded-lg bg-slate-800/40 border border-slate-700/50">
              <span className="text-gold font-mono font-bold text-sm whitespace-nowrap">{m.time}</span>
              <div className="flex-1">
                <div className="font-semibold text-white">{m.meal}</div>
                <div className="text-sm text-slate-400 mt-0.5">{m.items}</div>
              </div>
              <div className="text-right text-sm">
                <div className="text-white font-semibold">{m.calories}</div>
                <div className="text-gold text-xs">{m.protein} protein</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 p-4 rounded-xl bg-gold/5 border border-gold/20">
          <h4 className="text-sm font-bold text-gold mb-2 flex items-center gap-1.5">? Carb Timing Around Workouts</h4>
          <ul className="text-sm text-slate-300 space-y-1 list-disc list-inside">
            <li><strong>60–90 min pre-workout:</strong> Fast-digesting carbs + protein (rice cakes, honey, whey) to fuel the session.</li>
            <li><strong>Within 60 min post-workout:</strong> Carbs + protein to replenish glycogen and support recovery.</li>
            <li><strong>Rest of the day:</strong> Center carbs around your training window; keep other meals protein- and fiber-focused.</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
