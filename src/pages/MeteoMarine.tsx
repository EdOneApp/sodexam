import { Container, Card, SectionTitle } from '../design-system/Card'
import { SplitTitle } from '../components/SplitTitle'
import { villesCotieres } from '../data/villes'
import { meteoMarine } from '../lib/weather-sim'

export default function MeteoMarine() {
  return (
    <div className="py-16">
      <Container>
        <SplitTitle text="Météo marine" className="text-4xl font-bold sm:text-5xl" />
        <p className="mt-4 max-w-2xl text-black/60 dark:text-white/60">
          Houle, vent et marées pour les localités côtières : Abidjan, San-Pédro, Sassandra, Grand-Lahou et Assinie.
        </p>

        <SectionTitle title="Conditions côtières" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {villesCotieres.map((v) => {
            const m = meteoMarine(v.slug)
            return (
              <Card key={v.slug}>
                <h3 className="font-display text-lg font-semibold">{v.nom}</h3>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl bg-(--color-sky)/10 p-3">
                    <div className="text-black/50 dark:text-white/50">Houle</div>
                    <div className="font-mono-data text-lg font-bold text-(--color-sky)">{m.houleM} m</div>
                  </div>
                  <div className="rounded-xl bg-(--color-radar)/10 p-3">
                    <div className="text-black/50 dark:text-white/50">Période</div>
                    <div className="font-mono-data text-lg font-bold">{m.periodeS} s</div>
                  </div>
                  <div className="rounded-xl bg-black/[0.03] p-3 dark:bg-white/5">
                    <div className="text-black/50 dark:text-white/50">Vent</div>
                    <div className="font-mono-data text-lg font-bold">{m.ventKmh} km/h</div>
                  </div>
                  <div className="rounded-xl bg-black/[0.03] p-3 dark:bg-white/5">
                    <div className="text-black/50 dark:text-white/50">Marées</div>
                    <div className="font-mono-data text-sm font-semibold">↑{m.mareeHaute} ↓{m.mareeBasse}</div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </Container>
    </div>
  )
}
