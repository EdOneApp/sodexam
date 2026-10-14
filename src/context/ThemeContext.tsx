import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type SkyPhase = 'aube' | 'zenith' | 'coucher' | 'nuit'
export type ThemeMode = 'auto' | 'light' | 'dark'

function phaseForHour(h: number): SkyPhase {
  if (h >= 5 && h < 8) return 'aube'
  if (h >= 8 && h < 17) return 'zenith'
  if (h >= 17 && h < 19) return 'coucher'
  return 'nuit'
}

export const skyGradients: Record<SkyPhase, string> = {
  aube: 'linear-gradient(135deg, #151009 0%, #8a3a16 45%, #F15A24 100%)',
  zenith: 'linear-gradient(135deg, #0b7a42 0%, #0a6334 100%)',
  coucher: 'linear-gradient(135deg, #151009 0%, #8a3a16 55%, #F15A24 100%)',
  nuit: 'linear-gradient(135deg, #0b0905 0%, #151009 100%)',
}

type ThemeContextValue = {
  mode: ThemeMode
  setMode: (m: ThemeMode) => void
  isDark: boolean
  skyPhase: SkyPhase
  liteMode: boolean
  setLiteMode: (v: boolean) => void
  reducedMotion: boolean
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>(() => (localStorage.getItem('sodexam-theme') as ThemeMode) || 'auto')
  const [liteMode, setLiteModeState] = useState<boolean>(() => localStorage.getItem('sodexam-lite') === '1')
  const [hour, setHour] = useState(() => new Date().getHours())
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = () => setReducedMotion(mq.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    const id = setInterval(() => setHour(new Date().getHours()), 60_000)
    return () => clearInterval(id)
  }, [])

  const skyPhase = phaseForHour(hour)
  const isDark = mode === 'dark' || (mode === 'auto' && (skyPhase === 'nuit' || skyPhase === 'coucher'))

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    document.documentElement.classList.toggle('reduce-motion', reducedMotion)
  }, [isDark, reducedMotion])

  function setMode(m: ThemeMode) {
    localStorage.setItem('sodexam-theme', m)
    setModeState(m)
  }

  function setLiteMode(v: boolean) {
    localStorage.setItem('sodexam-lite', v ? '1' : '0')
    setLiteModeState(v)
  }

  const value = useMemo<ThemeContextValue>(
    () => ({ mode, setMode, isDark, skyPhase, liteMode, setLiteMode, reducedMotion }),
    [mode, isDark, skyPhase, liteMode, reducedMotion],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
