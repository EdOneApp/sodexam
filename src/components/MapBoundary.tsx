import type { ReactNode } from 'react'
import { ErrorBoundary } from './ErrorBoundary'
import { Icon } from '../design-system/Icon'

export function MapBoundary({ children, height = 480 }: { children: ReactNode; height?: number }) {
  return (
    <ErrorBoundary
      fallback={
        <div
          style={{ height }}
          className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl bg-black/[0.04] text-black/40 dark:bg-white/5 dark:text-white/40"
        >
          <Icon name="globe" className="h-8 w-8" strokeWidth={1.2} />
          <span className="text-sm">Carte indisponible sur cet appareil</span>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  )
}
