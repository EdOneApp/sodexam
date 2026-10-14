import { useState } from 'react'
import { Container, Card, SectionTitle } from '../design-system/Card'
import { SplitTitle } from '../components/SplitTitle'
import { frise } from '../data/gouvernance'
import { AirportsMap } from '../components/AirportsMap'
import { MapBoundary } from '../components/MapBoundary'

const valeurs = [
  { titre: 'Rigueur', texte: 'Des données et services conformes aux standards internationaux (OMM, OACI, ISO 9001).' },
  { titre: 'Sécurité', texte: 'La sûreté aéroportuaire et la fiabilité des prévisions avant tout.' },
  { titre: 'Proximité', texte: 'Une présence sur tout le territoire, de la métropole aux zones rurales.' },
  { titre: 'Innovation', texte: 'La modernisation continue portée par des projets comme VIGICLIMM.' },
]

const organigramme = [
  { titre: 'Direction Générale', enfants: ['Direction de la Météorologie Nationale', 'Direction de la Navigation Aérienne', 'Direction des Aérodromes et de la Sûreté', 'CERMA', 'Direction Administrative et Financière'] },
]

export default function Presentation() {
  const [ouvert, setOuvert] = useState<string | null>(null)
  return (
    <div className="py-16">
      <Container>
        <SplitTitle text="Présentation" className="text-4xl font-bold sm:text-5xl" />
        <p className="mt-4 max-w-2xl text-black/60 dark:text-white/60">
          Société d’État créée par le décret n°97-228 du 16 avril 1997, la SODEXAM gère, exploite et développe les
          aéroports, la météorologie et les activités aéronautiques de Côte d’Ivoire.
        </p>

        <SectionTitle eyebrow="Valeurs" title="Ce qui nous engage" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {valeurs.map((v) => (
            <Card key={v.titre}>
              <h3 className="font-display text-lg font-semibold">{v.titre}</h3>
              <p className="mt-2 text-sm text-black/60 dark:text-white/60">{v.texte}</p>
            </Card>
          ))}
        </div>

        <SectionTitle eyebrow="Histoire" title="Près de 30 ans au service du ciel ivoirien" />
        <div className="relative border-l border-black/10 pl-6 dark:border-white/10">
          {frise.map((f) => (
            <div key={f.annee} className="relative mb-8">
              <span className="absolute -left-[31px] flex h-5 w-5 items-center justify-center rounded-full bg-(--color-sky) text-[10px] font-bold text-white">•</span>
              <div className="font-mono-data text-sm text-(--color-sky)">{f.annee}</div>
              <h3 className="font-display text-lg font-semibold">{f.titre}</h3>
              <p className="mt-1 text-sm text-black/60 dark:text-white/60">{f.texte}</p>
            </div>
          ))}
        </div>

        <SectionTitle eyebrow="Organisation" title="Organigramme interactif" />
        <div className="space-y-2">
          {organigramme.map((bloc) => (
            <div key={bloc.titre}>
              <button
                onClick={() => setOuvert(ouvert === bloc.titre ? null : bloc.titre)}
                className="w-full rounded-xl bg-(--color-night) px-5 py-4 text-left font-semibold text-white"
              >
                {bloc.titre} {ouvert === bloc.titre ? '−' : '+'}
              </button>
              {ouvert === bloc.titre && (
                <div className="grid gap-3 p-4 sm:grid-cols-2">
                  {bloc.enfants.map((e) => (
                    <div key={e} className="rounded-lg border border-black/10 px-4 py-3 text-sm dark:border-white/10">{e}</div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <SectionTitle eyebrow="Implantations" title="Nos plateformes sur le territoire" />
        <MapBoundary height={420}>
          <AirportsMap height={420} />
        </MapBoundary>
      </Container>
    </div>
  )
}
