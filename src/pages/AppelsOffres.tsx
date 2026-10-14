import { useState } from 'react'
import { Container, SectionTitle } from '../design-system/Card'
import { SplitTitle } from '../components/SplitTitle'

type AO = { id: string; titre: string; type: string; dateLimite: string; statut: 'ouvert' | 'clos' }

const appels: AO[] = [
  { id: 'ao-01', titre: 'Fourniture de matériel radar météorologique', type: 'Fourniture', dateLimite: '2026-11-30', statut: 'ouvert' },
  { id: 'ao-02', titre: 'Travaux de réhabilitation — Aéroport de Man', type: 'Travaux', dateLimite: '2026-12-15', statut: 'ouvert' },
  { id: 'ao-03', titre: 'Audit de sûreté aéroportuaire', type: 'Service', dateLimite: '2026-10-20', statut: 'clos' },
  { id: 'ao-04', titre: 'Fourniture de stations météorologiques automatiques', type: 'Fourniture', dateLimite: '2026-09-10', statut: 'clos' },
]

export default function AppelsOffres() {
  const [statut, setStatut] = useState<'tous' | 'ouvert' | 'clos'>('tous')
  const liste = appels.filter((a) => statut === 'tous' || a.statut === statut)

  return (
    <div className="py-16">
      <Container>
        <SplitTitle text="Appels d’offres" className="text-4xl font-bold sm:text-5xl" />

        <div className="mt-6 flex gap-2">
          {(['tous', 'ouvert', 'clos'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatut(s)}
              className={`rounded-full border px-4 py-2 text-sm capitalize ${statut === s ? 'border-(--color-sky) bg-(--color-sky) text-white' : 'border-black/10 dark:border-white/10'}`}
            >
              {s}
            </button>
          ))}
        </div>

        <SectionTitle title={`${liste.length} appels d’offres`} />
        <div className="space-y-3">
          {liste.map((a) => (
            <div key={a.id} className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-black/10 p-5 dark:border-white/10">
              <div>
                <h3 className="font-semibold">{a.titre}</h3>
                <p className="text-sm text-black/60 dark:text-white/60">{a.type} · date limite {a.dateLimite}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${a.statut === 'ouvert' ? 'bg-(--color-forest) text-white' : 'bg-black/10 dark:bg-white/10'}`}>
                  {a.statut === 'ouvert' ? 'Ouvert' : 'Clos'}
                </span>
                <a href="#" onClick={(e) => e.preventDefault()} className="text-sm font-semibold text-(--color-sky)">Dossier ⬇</a>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}
