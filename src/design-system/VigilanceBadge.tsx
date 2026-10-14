import clsx from 'clsx'
import type { NiveauVigilance } from '../data/vigilance'
import { niveauLabel } from '../data/vigilance'

const colors: Record<NiveauVigilance, string> = {
  vert: 'bg-(--color-vigilance-green) text-white',
  jaune: 'bg-(--color-vigilance-yellow) text-black',
  orange: 'bg-(--color-vigilance-orange) text-white',
  rouge: 'bg-(--color-vigilance-red) text-white',
}

const icons: Record<NiveauVigilance, string> = {
  vert: '●',
  jaune: '▲',
  orange: '◆',
  rouge: '✕',
}

export function VigilanceBadge({ niveau, pulse = false, small = false }: { niveau: NiveauVigilance; pulse?: boolean; small?: boolean }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-2 rounded-full font-semibold',
        small ? 'px-2.5 py-1 text-xs' : 'px-4 py-2 text-sm',
        colors[niveau],
        pulse && (niveau === 'orange' || niveau === 'rouge') && 'animate-pulse-alert',
      )}
    >
      <span aria-hidden>{icons[niveau]}</span>
      {niveauLabel[niveau]}
    </span>
  )
}
