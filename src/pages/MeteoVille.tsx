import { useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Container, Card, SectionTitle } from '../design-system/Card'
import { SplitTitle } from '../components/SplitTitle'
import { WeatherIcon } from '../design-system/WeatherIcon'
import { villes } from '../data/villes'
import { meteoActuelle, previsionsHoraires, previsions7Jours, conditionLabel } from '../lib/weather-sim'

export default function MeteoVille() {
  const { slug = '' } = useParams()
  const ville = villes.find((v) => v.slug === slug)
  if (!ville) return <Navigate to="/meteo" replace />

  const actuel = meteoActuelle(ville.slug)
  const heures = previsionsHoraires(ville.slug).slice(0, 24)
  const jours = previsions7Jours(ville.slug)
  const maxTemp = Math.max(...jours.map((j) => j.tempMax))
  const minTemp = Math.min(...jours.map((j) => j.tempMin))

  return (
    <div className="py-16">
      <Container>
        <SplitTitle text={`Météo à ${ville.nom}`} className="text-4xl font-bold sm:text-5xl" />
        <p className="mt-2 text-sm text-black/50 dark:text-white/50">{ville.region} · {ville.population} habitants (estimation)</p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass flex flex-col items-center justify-center rounded-3xl bg-gradient-to-br from-(--color-sky) to-(--color-night) p-10 text-white"
          >
            <WeatherIcon condition={actuel.condition} className="h-20 w-20" />
            <div className="mt-4 font-mono-data text-6xl font-bold">{actuel.tempC}°</div>
            <div className="text-white/80">{conditionLabel[actuel.condition]} · ressenti {actuel.ressenti}°C</div>
            <div className="mt-6 grid w-full grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl bg-white/10 p-3"><div className="text-white/60">Humidité</div><div className="font-semibold">{actuel.humidite}%</div></div>
              <div className="rounded-xl bg-white/10 p-3"><div className="text-white/60">Vent</div><div className="font-semibold">{actuel.ventKmh} km/h</div></div>
              <div className="rounded-xl bg-white/10 p-3"><div className="text-white/60">Indice UV</div><div className="font-semibold">{actuel.uv}/11</div></div>
              <div className="rounded-xl bg-white/10 p-3"><div className="text-white/60">Lever / coucher</div><div className="font-semibold">{actuel.leverSoleil} · {actuel.coucherSoleil}</div></div>
            </div>
          </motion.div>

          <Card>
            <h3 className="font-display text-lg font-semibold">Prochaines 24 heures</h3>
            <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
              {heures.map((h, i) => (
                <div key={i} className="flex min-w-[64px] flex-col items-center gap-2 rounded-xl bg-black/[0.03] p-3 dark:bg-white/5">
                  <span className="text-xs text-black/50 dark:text-white/50">{h.heure}</span>
                  <WeatherIcon condition={h.condition} className="h-6 w-6" />
                  <span className="font-mono-data text-sm font-semibold">{h.tempC}°</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <SectionTitle title="7 prochains jours" />
        <div className="space-y-2">
          {jours.map((j) => {
            const left = ((j.tempMin - minTemp) / (maxTemp - minTemp || 1)) * 100
            const width = ((j.tempMax - j.tempMin) / (maxTemp - minTemp || 1)) * 100
            return (
              <div key={j.date} className="grid grid-cols-[80px_32px_1fr_80px] items-center gap-4 rounded-xl px-2 py-2 hover:bg-black/[0.02] dark:hover:bg-white/5">
                <span className="text-sm font-medium">{j.jour}</span>
                <WeatherIcon condition={j.condition} className="h-6 w-6" />
                <div className="relative h-2 rounded-full bg-black/5 dark:bg-white/10">
                  <div
                    className="absolute h-2 rounded-full bg-gradient-to-r from-(--color-sky) to-(--color-ivory-orange)"
                    style={{ left: `${left}%`, width: `${Math.max(width, 6)}%` }}
                  />
                </div>
                <span className="text-right font-mono-data text-sm">{j.tempMin}° / {j.tempMax}°</span>
              </div>
            )
          })}
        </div>
      </Container>
    </div>
  )
}
