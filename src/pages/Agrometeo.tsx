import { Container, Card, SectionTitle } from '../design-system/Card'
import { SplitTitle } from '../components/SplitTitle'
import { seededRandom } from '../lib/rng'

const cultures = ['Cacao', 'Hévéa', 'Anacarde', 'Riz', 'Igname', 'Coton']
const regionsAgro = ['Bas-Sassandra', 'Gôh-Djiboua', 'Savanes', 'Woroba', 'Comoé', 'Montagnes']

export default function Agrometeo() {
  const saisonRand = seededRandom('agro-saison-2026')
  const debutPluies = `${10 + Math.floor(saisonRand() * 10)} mars 2026`
  const finPluies = `${5 + Math.floor(saisonRand() * 15)} novembre 2026`

  return (
    <div className="py-16">
      <Container>
        <SplitTitle text="Agrométéo et climat" className="text-4xl font-bold sm:text-5xl" />
        <p className="mt-4 max-w-2xl text-black/60 dark:text-white/60">
          Prévisions saisonnières, cumuls de pluie et normales climatiques pour accompagner l’agriculture, la pêche et le BTP.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <Card className="bg-(--color-forest)/10">
            <div className="text-sm text-black/50 dark:text-white/50">Début estimé de la saison des pluies</div>
            <div className="mt-2 font-display text-2xl font-bold text-(--color-forest)">{debutPluies}</div>
          </Card>
          <Card className="bg-(--color-ivory-orange)/10">
            <div className="text-sm text-black/50 dark:text-white/50">Fin estimée de la saison des pluies</div>
            <div className="mt-2 font-display text-2xl font-bold text-(--color-ivory-orange)">{finPluies}</div>
          </Card>
        </div>

        <SectionTitle eyebrow="Bulletins décadaires" title="Cumuls de pluie par région" />
        <div className="space-y-3">
          {regionsAgro.map((r) => {
            const rand = seededRandom(`agro-${r}`)
            const cumul = Math.round(40 + rand() * 160)
            return (
              <div key={r} className="flex items-center gap-4">
                <span className="w-40 text-sm font-medium">{r}</span>
                <div className="relative h-3 flex-1 rounded-full bg-black/5 dark:bg-white/10">
                  <div className="h-3 rounded-full bg-gradient-to-r from-(--color-forest) to-(--color-sky)" style={{ width: `${Math.min(100, cumul / 2)}%` }} />
                </div>
                <span className="w-20 text-right font-mono-data text-sm">{cumul} mm</span>
              </div>
            )
          })}
        </div>

        <SectionTitle eyebrow="Conseils culturaux" title="Cultures suivies" />
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {cultures.map((c) => (
            <div key={c} className="rounded-xl border border-black/10 p-4 text-center text-sm font-semibold dark:border-white/10">{c}</div>
          ))}
        </div>
      </Container>
    </div>
  )
}
