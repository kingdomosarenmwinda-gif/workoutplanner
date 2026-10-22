import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  const linkCls = ({ isActive }) =>
    `px-3 py-2.5 rounded-md text-sm font-medium transition min-h-[44px] inline-flex items-center ${isActive ? 'text-gold' : 'text-slate-300 hover:text-gold'}`
  return (
    <nav className="sticky top-0 z-40 bg-black/80 backdrop-blur border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="font-bold text-gold text-lg tracking-tight">GymPlatform</Link>
        <div className="flex gap-1 flex-wrap">
          <NavLink to="/" className={linkCls} end>Home</NavLink>
          <NavLink to="/sixpack" className={linkCls}>Six Pack</NavLink>
          <NavLink to="/chest" className={linkCls}>Chest</NavLink>
          <NavLink to="/strength" className={linkCls}>Strength</NavLink>
          <NavLink to="/flexibility" className={linkCls}>Flexibility</NavLink>
          <NavLink to="/classes" className={linkCls}>Classes</NavLink>
          <NavLink to="/pricing" className={linkCls}>Pricing</NavLink>
          <NavLink to="/admin" className={linkCls}>Admin</NavLink>
        </div>
      </div>
    </nav>
  )
}
