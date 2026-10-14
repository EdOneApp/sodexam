import { useState } from 'react'
import { Container, Card, SectionTitle } from '../design-system/Card'
import { SplitTitle } from '../components/SplitTitle'
import { aeroports } from '../data/aeroports'
import { metarFactice } from '../lib/weather-sim'

export default function MeteoAeronautique() {
  const [code, setCode] = useState(aeroports[0].code)
  const aeroport = aeroports.find((a) => a.code === code)!
  const metar = metarFactice(aeroport.code)

  return (
    <div className="py-16">
      <Container>
        <SplitTitle text="Météo aéronautique" className="text-4xl font-bold sm:text-5xl" />
        <p className="mt-4 max-w-2xl text-black/60 dark:text-white/60">
          Messages METAR et TAF décodés en clair pour chaque aérodrome ivoirien.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {aeroports.map((a) => (
            <button
              key={a.code}
              onClick={() => setCode(a.code)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                code === a.code ? 'border-(--color-sky) bg-(--color-sky) text-white' : 'border-black/10 dark:border-white/10'
              }`}
            >
              {a.codeIata} · {a.ville}
            </button>
          ))}
        </div>

        <SectionTitle title={`METAR — ${aeroport.nom}`} />
        <Card className="font-mono-data">
          <div className="overflow-x-auto rounded-lg bg-(--color-night) p-4 text-sm text-(--color-radar)">{metar.brut}</div>
          <ul className="mt-4 space-y-2 text-sm font-sans">
            {metar.decode.map((d) => (
              <li key={d} className="flex gap-2"><span className="text-(--color-sky)">▸</span>{d}</li>
            ))}
          </ul>
        </Card>

        <div className="mt-6 rounded-xl border border-orange-400/30 bg-orange-400/10 p-4 text-sm text-orange-900 dark:text-orange-200">
          Messages générés automatiquement à des fins de démonstration — ne pas utiliser pour la préparation réelle de vol.
        </div>
      </Container>
    </div>
  )
}
