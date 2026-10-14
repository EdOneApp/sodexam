import { useParams, Navigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Container, Card, SectionTitle } from '../design-system/Card'
import { getAeroport } from '../data/aeroports'
import { meteoActuelle, metarFactice } from '../lib/weather-sim'
import { WeatherIcon } from '../design-system/WeatherIcon'
import { actualites } from '../data/actualites'

export default function AeroportDetail() {
  const { code = '' } = useParams()
  const aeroport = getAeroport(code)
  if (!aeroport) return <Navigate to="/aeroports" replace />

  const meteo = meteoActuelle(aeroport.code)
  const metar = metarFactice(aeroport.code)
  const actusLiees = actualites.filter((a) => a.plateforme === aeroport.ville).slice(0, 2)

  return (
    <div className="py-16">
      <Container>
        <Link to="/aeroports" className="text-sm text-(--color-sky)">← Retour aux aéroports</Link>

        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mt-6 flex h-56 items-center justify-center rounded-3xl bg-gradient-to-br from-(--color-sky) to-(--color-night) text-6xl text-white/70 sm:h-72"
        >
          ✈️
        </motion.div>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="font-mono-data text-sm text-(--color-sky)">{aeroport.codeIata} · {aeroport.code}</div>
            <h1 className="font-display text-3xl font-bold sm:text-4xl">{aeroport.nom}</h1>
          </div>
          <WeatherIcon condition={meteo.condition} />
        </div>
        <p className="mt-4 max-w-2xl text-black/60 dark:text-white/60">{aeroport.description}</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['Piste', `${aeroport.pisteLongueurM} m`],
            ['Revêtement', aeroport.pisteRevetement],
            ['Statut', aeroport.statut],
            ['Météo terrain', `${meteo.tempC}°C`],
          ].map(([label, val]) => (
            <Card key={label}>
              <div className="text-xs text-black/50 dark:text-white/50">{label}</div>
              <div className="mt-1 font-mono-data text-lg font-bold">{val}</div>
            </Card>
          ))}
        </div>

        {aeroport.avancement !== undefined && (
          <div className="mt-8">
            <div className="mb-2 flex justify-between text-sm"><span>Avancement du chantier</span><span className="font-mono-data">{aeroport.avancement}%</span></div>
            <div className="h-3 rounded-full bg-black/5 dark:bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${aeroport.avancement}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="h-3 rounded-full bg-(--color-ivory-orange)"
              />
            </div>
          </div>
        )}

        <SectionTitle eyebrow="Compagnies" title="Liaisons disponibles" />
        <div className="flex flex-wrap gap-2">
          {aeroport.compagnies.length === 0 && <span className="text-sm text-black/50 dark:text-white/50">Aucune liaison commerciale active pour le moment.</span>}
          {aeroport.compagnies.map((c) => (
            <a key={c} href="#" onClick={(e) => e.preventDefault()} className="rounded-full border border-black/10 px-4 py-2 text-sm hover:border-(--color-sky) dark:border-white/10">
              {c} ↗
            </a>
          ))}
        </div>

        <SectionTitle eyebrow="Services" title="Services sur place" />
        <div className="flex flex-wrap gap-2">
          {aeroport.services.map((s) => (
            <span key={s} className="rounded-full bg-black/[0.04] px-4 py-2 text-sm dark:bg-white/10">{s}</span>
          ))}
        </div>

        <SectionTitle eyebrow="METAR" title="Météo aéronautique du terrain" />
        <Card className="font-mono-data text-sm text-(--color-sky)"><div className="rounded-lg bg-(--color-night) p-4">{metar.brut}</div></Card>

        {actusLiees.length > 0 && (
          <>
            <SectionTitle eyebrow="Actualités" title="Sur cette plateforme" />
            <div className="grid gap-4 sm:grid-cols-2">
              {actusLiees.map((a) => (
                <Link key={a.slug} to={`/actualites/${a.slug}`} className="rounded-xl border border-black/10 p-4 text-sm hover:border-(--color-sky) dark:border-white/10">
                  {a.titre}
                </Link>
              ))}
            </div>
          </>
        )}
      </Container>
    </div>
  )
}
