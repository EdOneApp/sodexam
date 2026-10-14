import { useState } from 'react'
import { Container, Card, SectionTitle } from '../design-system/Card'
import { SplitTitle } from '../components/SplitTitle'
import { VigilanceBadge } from '../design-system/VigilanceBadge'
import { VigilanceMap } from '../components/VigilanceMap'
import { MapBoundary } from '../components/MapBoundary'
import { zonesVigilance, historiqueVigilance, niveauConseil } from '../data/vigilance'

const legende = [
  { niveau: 'vert' as const, couleur: '#1b9e5a' },
  { niveau: 'jaune' as const, couleur: '#e8b800' },
  { niveau: 'orange' as const, couleur: '#f15a24' },
  { niveau: 'rouge' as const, couleur: '#d81f2a' },
]

export default function Vigilance() {
  const [districtSelectionne, setDistrictSelectionne] = useState(zonesVigilance[0].district)
  const selection = zonesVigilance.find((z) => z.district === districtSelectionne) ?? zonesVigilance[0]

  return (
    <div className="py-16">
      <Container>
        <SplitTitle text="Vigilance météorologique" className="text-4xl font-bold sm:text-5xl" />
        <p className="mt-4 max-w-2xl text-black/60 dark:text-white/60">
          Carte des 14 districts de Côte d’Ivoire, colorée selon le niveau de vigilance en vigueur. Chaque niveau
          combine toujours une couleur, une icône et un mot, jamais la couleur seule.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <MapBoundary>
              <VigilanceMap selected={districtSelectionne} onSelect={setDistrictSelectionne} />
            </MapBoundary>
            <div className="mt-4 flex flex-wrap gap-4">
              {legende.map((l) => (
                <div key={l.niveau} className="flex items-center gap-2 text-xs font-medium text-black/60 dark:text-white/60">
                  <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: l.couleur }} />
                  {l.niveau.charAt(0).toUpperCase() + l.niveau.slice(1)}
                </div>
              ))}
            </div>
            <p className="mt-2 text-xs text-black/40 dark:text-white/40">
              Limites administratives : geoBoundaries (CC BY 4.0, World Bank Group / OCHA Côte d’Ivoire).
            </p>
          </div>

          <Card>
            <h3 className="font-display text-xl font-semibold">{selection.nom}</h3>
            <div className="mt-3"><VigilanceBadge niveau={selection.niveau} pulse /></div>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-black/50 dark:text-white/50">Phénomène</dt><dd className="font-medium">{selection.phenomene}</dd></div>
              <div className="flex justify-between"><dt className="text-black/50 dark:text-white/50">Validité</dt><dd className="font-medium">{selection.validite}</dd></div>
            </dl>
            <p className="mt-4 rounded-xl bg-black/[0.03] p-4 text-sm dark:bg-white/5">{niveauConseil[selection.niveau]}</p>

            <div className="mt-6 space-y-1.5">
              {zonesVigilance.map((z) => (
                <button
                  key={z.district}
                  onClick={() => setDistrictSelectionne(z.district)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition ${
                    z.district === districtSelectionne ? 'bg-black/5 dark:bg-white/10' : 'hover:bg-black/[0.03] dark:hover:bg-white/5'
                  }`}
                >
                  <span>{z.nom}</span>
                  <VigilanceBadge niveau={z.niveau} small />
                </button>
              ))}
            </div>
          </Card>
        </div>

        <SectionTitle eyebrow="Archives" title="Historique des bulletins" />
        <div className="space-y-3">
          {historiqueVigilance.map((b) => (
            <div key={b.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-black/10 p-4 dark:border-white/10">
              <div>
                <div className="font-semibold">{b.titre}</div>
                <div className="text-sm text-black/60 dark:text-white/60">{b.resume}</div>
                <div className="text-xs text-black/40 dark:text-white/40">{b.date}</div>
              </div>
              <VigilanceBadge niveau={b.niveauMax} small />
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}
