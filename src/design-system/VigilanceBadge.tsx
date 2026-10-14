import clsx from 'clsx'
import type { NiveauVigilance } from '../data/vigilance'
import { niveauLabel } from '../data/vigilance'
import { Icon, type IconName } from './Icon'

const colors: Record<NiveauVigilance, string> = {
  vert: 'bg-(--color-vigilance-green) text-white',
  jaune: 'bg-(--color-vigilance-yellow) text-black',
  orange: 'bg-(--color-vigilance-orange) text-white',
  rouge: 'bg-(--color-vigilance-red) text-white',
}

const icons: Record<NiveauVigilance, IconName> = {
  vert: 'circle-dot',
  jaune: 'alert-triangle',
  orange: 'alert-triangle',
  rouge: 'alert-octagon',
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
      <Icon name={icons[niveau]} className={small ? 'h-3.5 w-3.5' : 'h-4 w-4'} strokeWidth={2.25} />
      {niveauLabel[niveau]}
    </span>
  )
}
