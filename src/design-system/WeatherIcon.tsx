import type { Condition } from '../lib/weather-sim'
import clsx from 'clsx'

export function WeatherIcon({ condition, className }: { condition: Condition; className?: string }) {
  const size = clsx('h-8 w-8', className)
  switch (condition) {
    case 'ensoleille':
      return (
        <svg viewBox="0 0 48 48" className={size}>
          <circle cx="24" cy="24" r="10" fill="#F77F00" />
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={i}
              x1="24" y1="24"
              x2={24 + Math.cos((i * Math.PI) / 4) * 20}
              y2={24 + Math.sin((i * Math.PI) / 4) * 20}
              stroke="#F77F00" strokeWidth="2" strokeLinecap="round"
              className="origin-center animate-pulse"
              style={{ animationDuration: '3s', animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </svg>
      )
    case 'nuageux':
      return (
        <svg viewBox="0 0 48 48" className={size}>
          <ellipse cx="20" cy="28" rx="14" ry="9" fill="#9fb3c8" />
          <ellipse cx="30" cy="24" rx="11" ry="8" fill="#cbd8e5" />
        </svg>
      )
    case 'pluie':
      return (
        <svg viewBox="0 0 48 48" className={size}>
          <ellipse cx="22" cy="18" rx="13" ry="8" fill="#9fb3c8" />
          {[14, 22, 30].map((x, i) => (
            <line key={x} x1={x} y1="28" x2={x - 3} y2="40" stroke="#1E88E5" strokeWidth="2.5" strokeLinecap="round" className="animate-pulse" style={{ animationDuration: '1s', animationDelay: `${i * 0.15}s` }} />
          ))}
        </svg>
      )
    case 'orage':
      return (
        <svg viewBox="0 0 48 48" className={size}>
          <ellipse cx="22" cy="16" rx="13" ry="8" fill="#5d6b7a" />
          <polygon points="22,22 16,34 22,34 18,44 30,28 23,28 27,22" fill="#F77F00" className="animate-pulse" style={{ animationDuration: '1.4s' }} />
        </svg>
      )
    case 'harmattan':
      return (
        <svg viewBox="0 0 48 48" className={size}>
          <circle cx="24" cy="20" r="7" fill="#F5F1E8" opacity="0.6" />
          {[20, 27, 34].map((y, i) => (
            <line key={y} x1="8" y1={y} x2="40" y2={y} stroke="#c9b699" strokeWidth="2" strokeLinecap="round" opacity={0.7 - i * 0.15} />
          ))}
        </svg>
      )
    case 'nuit-claire':
    default:
      return (
        <svg viewBox="0 0 48 48" className={size}>
          <path d="M30 10a14 14 0 1 0 8 25 12 12 0 0 1-8-25z" fill="#22D3EE" />
          <circle cx="16" cy="14" r="1.4" fill="#fff" />
          <circle cx="12" cy="22" r="1" fill="#fff" />
          <circle cx="20" cy="10" r="1" fill="#fff" />
        </svg>
      )
  }
}
