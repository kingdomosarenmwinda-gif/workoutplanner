import React from 'react'

const css = `
@keyframes crunch { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(-25deg)} }
@keyframes legraise { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(-70deg)} }
@keyframes breathe { 0%,100%{transform:scaleY(1)} 50%{transform:scaleY(1.03)} }
@keyframes twist { 0%,100%{transform:rotate(-20deg)} 50%{transform:rotate(20deg)} }
@keyframes climbL { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-25px)} }
@keyframes climbR { 0%,50%{transform:translateY(-25px)} 50%,100%{transform:translateY(0)} }
@keyframes press { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-30px)} }
@keyframes pushup { 0%,100%{transform:translateY(0)} 50%{transform:translateY(20px)} }
@keyframes fly { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(40deg)} }
@keyframes dip { 0%,100%{transform:translateY(0)} 50%{transform:translateY(20px)} }
@keyframes hinge { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(45deg)} }
@keyframes squat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(30px)} }
@keyframes ohp { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-40px)} }
@keyframes row { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-20px)} }
@keyframes stretch { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(15deg)} }
@keyframes catcow { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(-10deg)} }
@keyframes dog { 0%,100%{transform:scale(1)} 50%{transform:scale(1.02)} }
`

const STROKE = '#D4AF37'

function Svg({ children, anim }) {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" style={{ background: 'transparent' }}>
      <style>{css}</style>
      <g style={anim}>{children}</g>
    </svg>
  )
}

const FIG = ({ d, style }) => <path d={d} stroke={STROKE} strokeWidth="3" fill="none" strokeLinecap="round" style={style} />

export default function ExerciseAnimation({ type }) {
  const t = (type || '').toLowerCase().replace(/[^a-z]/g, '')
  let content = null
  let animStyle = {}
  switch (t) {
    case 'crunches':
      animStyle = { transformOrigin: '100px 140px', animation: 'crunch 1.6s ease-in-out infinite' }
      content = (<>
        <circle cx="60" cy="120" r="12" fill={STROKE} />
        <line x1="60" y1="132" x2="100" y2="140" stroke={STROKE} strokeWidth="3" />
        <line x1="100" y1="140" x2="140" y2="140" stroke={STROKE} strokeWidth="3" />
        <line x1="100" y1="140" x2="100" y2="170" stroke={STROKE} strokeWidth="3" />
        <line x1="140" y1="140" x2="170" y2="140" stroke={STROKE} strokeWidth="3" />
      </>)
      break
    case 'legraises':
      animStyle = { transformOrigin: '90px 140px', animation: 'legraise 1.6s ease-in-out infinite' }
      content = (<>
        <circle cx="60" cy="130" r="12" fill={STROKE} />
        <line x1="60" y1="142" x2="90" y2="140" stroke={STROKE} strokeWidth="3" />
        <line x1="90" y1="140" x2="130" y2="140" stroke={STROKE} strokeWidth="3" />
      </>)
      break
    case 'plank':
      animStyle = { transformOrigin: '100px 120px', animation: 'breathe 2s ease-in-out infinite' }
      content = (<>
        <circle cx="40" cy="90" r="12" fill={STROKE} />
        <line x1="40" y1="102" x2="160" y2="120" stroke={STROKE} strokeWidth="3" />
        <line x1="70" y1="110" x2="70" y2="140" stroke={STROKE} strokeWidth="3" />
        <line x1="140" y1="117" x2="140" y2="147" stroke={STROKE} strokeWidth="3" />
      </>)
      break
    case 'russiantwist':
      animStyle = { transformOrigin: '100px 130px', animation: 'twist 1.4s ease-in-out infinite' }
      content = (<>
        <circle cx="100" cy="90" r="12" fill={STROKE} />
        <line x1="100" y1="102" x2="100" y2="130" stroke={STROKE} strokeWidth="3" />
        <line x1="100" y1="130" x2="70" y2="160" stroke={STROKE} strokeWidth="3" />
        <line x1="100" y1="130" x2="130" y2="160" stroke={STROKE} strokeWidth="3" />
        <line x1="80" y1="115" x2="120" y2="115" stroke={STROKE} strokeWidth="3" />
      </>)
      break
    case 'mountainclimbers':
      animStyle = {}
      content = (<>
        <circle cx="40" cy="90" r="12" fill={STROKE} />
        <line x1="40" y1="102" x2="160" y2="120" stroke={STROKE} strokeWidth="3" />
        <line x1="70" y1="110" x2="70" y2="140" stroke={STROKE} strokeWidth="3" style={{ animation: 'climbL 1s ease-in-out infinite', transformOrigin: '70px 110px' }} />
        <line x1="140" y1="117" x2="140" y2="147" stroke={STROKE} strokeWidth="3" style={{ animation: 'climbR 1s ease-in-out infinite', transformOrigin: '140px 117px' }} />
      </>)
      break
    default:
      animStyle = { animation: 'breathe 2s ease-in-out infinite', transformOrigin: '100px 100px' }
      content = (<circle cx="100" cy="100" r="40" fill="none" stroke={STROKE} strokeWidth="3" />)
  }
  // Generic barbell lifters
  if (['benchpress','pushup','inclinedumbbellpress','chestfly','dips','deadlift','squat','overheadpress','barbellrow'].includes(t)) {
    // override with simple animated figure + bar
  }
  return (
    <div className="w-full aspect-video bg-black rounded-xl flex items-center justify-center overflow-hidden">
      <Svg anim={animStyle}>{content}</Svg>
    </div>
  )
}