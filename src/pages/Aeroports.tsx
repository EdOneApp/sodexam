import { useState } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { Container, SectionTitle } from '../design-system/Card'
import { SplitTitle } from '../components/SplitTitle'
import { AirportsMap } from '../components/AirportsMap'
import { MapBoundary } from '../components/MapBoundary'
import { aeroports, type StatutAeroport } from '../data/aeroports'
import sanPedroImage from '../assets/photos/san-pedro-aerogare.jpg'
import yamoussoukroImage from '../assets/photos/yamoussoukro-aerogare.jpg'

const photosParCode: Record<string, string> = {
  DIYO: yamoussoukroImage,
  DISP: sanPedroImage,
}

const statutLabel: Record<StatutAeroport, string> = { service: 'En service', travaux: 'En travaux', projet: 'Projet' }
const statutColor: Record<StatutAeroport, string> = {
  service: 'bg-(--color-forest) text-white',
  travaux: 'bg-(--color-radar) text-black',
  projet: 'bg-black/20 text-white',
}

export default function Aeroports() {
  const [filtre, setFiltre] = useState<StatutAeroport | 'tous'>('tous')
  const listes = aeroports.filter((a) => filtre === 'tous' || a.statut === filtre)

  return (
    <div className="py-16">
      <Container>
        <SplitTitle text="Nos aéroports" className="text-4xl font-bold sm:text-5xl" />
        <p className="mt-4 max-w-2xl text-black/60 dark:text-white/60">
          Huit plateformes aéroportuaires, du littoral au nord du pays, en service, en travaux ou en projet.
        </p>

        <div className="mt-8 overflow-hidden rounded-2xl">
          <img src={sanPedroImage} alt="Aérogare de San-Pédro" className="h-64 w-full object-cover sm:h-80" />
        </div>

        <div className="mt-8">
          <MapBoundary>
            <AirportsMap />
          </MapBoundary>
        </div>

        <div className="mt-8 flex gap-2">
          {(['tous', 'service', 'travaux', 'projet'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFiltre(s)}
              className={clsx(
                'rounded-full border px-4 py-2 text-sm font-medium',
                filtre === s ? 'border-(--color-sky) bg-(--color-sky) text-white' : 'border-black/10 dark:border-white/10',
              )}
            >
              {s === 'tous' ? 'Toutes' : statutLabel[s]}
            </button>
          ))}
        </div>

        <SectionTitle title={`${listes.length} plateformes`} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {listes.map((a, i) => (
            <Link
              key={a.code}
              to={`/aeroports/${a.code}`}
              style={{ transform: `translateY(${(i % 3) * 4}px)` }}
              className="group relative overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/5"
            >
              <div className="h-36 w-full overflow-hidden bg-gradient-to-br from-(--color-sky) to-(--color-night)">
                {photosParCode[a.code] && (
                  <img src={photosParCode[a.code]} alt={a.nom} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                )}
              </div>
              <div className="p-5">
                <span className={clsx('absolute right-4 top-4 rounded-full px-2.5 py-1 text-[10px] font-semibold', statutColor[a.statut])}>
                  {statutLabel[a.statut]}
                </span>
                <div className="font-mono-data text-xs text-(--color-sky)">{a.codeIata} · {a.code}</div>
                <h3 className="mt-1 font-display text-lg font-semibold">{a.nom}</h3>
                <p className="mt-2 text-sm text-black/60 dark:text-white/60">{a.description}</p>
                <div className="mt-4 text-sm text-black/40 dark:text-white/40">Piste {a.pisteLongueurM} m · {a.pisteRevetement}</div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  )
}
