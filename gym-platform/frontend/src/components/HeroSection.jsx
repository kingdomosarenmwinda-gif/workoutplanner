export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-black py-24 px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-black to-black" />
      <div className="relative max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
          Transform Your Body, Own Your Strength
        </h1>
        <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
          World-class coaching, premium facilities, results that last.
        </p>
        <button className="btn-gold text-lg">Claim Your Free Week Pass</button>
        <button className="ml-4 btn-outline-gold text-lg">View Class Schedule</button>
      </div>
    </section>
  )
}
