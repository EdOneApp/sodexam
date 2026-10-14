import { Link } from 'react-router-dom'
import { zonesVigilance, niveauOrdre, niveauLabel, type NiveauVigilance } from '../data/vigilance'
import { VigilanceBadge } from '../design-system/VigilanceBadge'

export function niveauNational(): NiveauVigilance {
  let max: NiveauVigilance = 'vert'
  for (const z of zonesVigilance) {
    if (niveauOrdre.indexOf(z.niveau) > niveauOrdre.indexOf(max)) max = z.niveau
  }
  return max
}

export function VigilanceBar() {
  const niveau = niveauNational()
  const zoneCritique = zonesVigilance.find((z) => z.niveau === niveau)
  if (niveau === 'vert') {
    return (
      <div className="bg-(--color-vigilance-green)/90 py-1.5 text-center text-xs font-medium text-white">
        {niveauLabel.vert} — aucun phénomène dangereux significatif sur le territoire
      </div>
    )
  }
  return (
    <Link
      to="/vigilance"
      className="block bg-black/90 py-2 text-center text-sm font-medium text-white transition hover:bg-black"
    >
      <span className="inline-flex flex-wrap items-center justify-center gap-2 px-4">
        <VigilanceBadge niveau={niveau} pulse small />
        <span>{zoneCritique?.phenomene} — {zoneCritique?.nom}</span>
        <span className="underline">Voir la carte →</span>
      </span>
    </Link>
  )
}
