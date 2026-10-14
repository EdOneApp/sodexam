import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, SectionTitle } from '../design-system/Card'
import { SplitTitle } from '../components/SplitTitle'
import { WeatherIcon } from '../design-system/WeatherIcon'
import { villes } from '../data/villes'
import { meteoActuelle } from '../lib/weather-sim'

export default function Meteo() {
  const [filtre, setFiltre] = useState('')
  const listees = villes.filter((v) => v.nom.toLowerCase().includes(filtre.toLowerCase()))

  return (
    <div className="py-16">
      <Container>
        <SplitTitle text="Prévisions par ville" className="text-4xl font-bold sm:text-5xl" />
        <p className="mt-4 max-w-2xl text-black/60 dark:text-white/60">
          Actuel, heure par heure et 7 jours pour plus de 30 localités de Côte d’Ivoire.
        </p>
        <input
          value={filtre}
          onChange={(e) => setFiltre(e.target.value)}
          placeholder="Rechercher une ville…"
          className="mt-6 w-full max-w-sm rounded-full border border-black/10 px-5 py-3 text-sm outline-none focus:border-(--color-sky) dark:border-white/10 dark:bg-white/5"
        />

        <SectionTitle title={`${listees.length} villes`} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {listees.map((v) => {
            const m = meteoActuelle(v.slug)
            return (
              <Link
                key={v.slug}
                to={`/meteo/${v.slug}`}
                className="flex items-center justify-between rounded-2xl border border-black/5 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-white/5"
              >
                <div>
                  <div className="font-display font-semibold">{v.nom}</div>
                  <div className="text-xs text-black/50 dark:text-white/50">{v.region}</div>
                </div>
                <div className="flex items-center gap-2">
                  <WeatherIcon condition={m.condition} className="h-7 w-7" />
                  <span className="font-mono-data text-lg font-bold">{m.tempC}°</span>
                </div>
              </Link>
            )
          })}
        </div>
      </Container>
    </div>
  )
}
