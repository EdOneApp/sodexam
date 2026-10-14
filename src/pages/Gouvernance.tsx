import { Container, Card, SectionTitle } from '../design-system/Card'
import { SplitTitle } from '../components/SplitTitle'
import { conseilAdministration, comiteDirection, rapportsAnnuels } from '../data/gouvernance'

export default function Gouvernance() {
  return (
    <div className="py-16">
      <Container>
        <SplitTitle text="Gouvernance" className="text-4xl font-bold sm:text-5xl" />

        <SectionTitle eyebrow="Instance" title="Conseil d’administration" />
        <div className="grid gap-4 sm:grid-cols-2">
          {conseilAdministration.map((m) => (
            <Card key={m.nom} className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-(--color-sky)/10 font-display font-bold text-(--color-sky)">
                {m.nom.split(' ').map((w) => w[0]).slice(0, 2).join('')}
              </div>
              <div>
                <div className="font-semibold">{m.nom}</div>
                <div className="text-sm text-black/60 dark:text-white/60">{m.fonction}</div>
              </div>
            </Card>
          ))}
        </div>

        <SectionTitle eyebrow="Exécutif" title="Comité de direction" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {comiteDirection.map((m) => (
            <Card key={m.nom} className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-(--color-ivory-orange)/10 font-display font-bold text-(--color-ivory-orange)">
                {m.nom.split(' ').map((w) => w[0]).slice(0, 2).join('')}
              </div>
              <div>
                <div className="font-semibold">{m.nom}</div>
                <div className="text-sm text-black/60 dark:text-white/60">{m.fonction}</div>
              </div>
            </Card>
          ))}
        </div>

        <SectionTitle eyebrow="Transparence" title="Rapports annuels" />
        <div className="grid gap-4 sm:grid-cols-3">
          {rapportsAnnuels.map((r) => (
            <a
              key={r.annee}
              href="#"
              onClick={(e) => e.preventDefault()}
              className="flex items-center justify-between rounded-xl border border-black/10 p-5 transition hover:border-(--color-sky) dark:border-white/10"
            >
              <div>
                <div className="font-semibold">{r.titre}</div>
                <div className="text-xs text-black/50 dark:text-white/50">PDF · fictif</div>
              </div>
              <span>⬇</span>
            </a>
          ))}
        </div>
      </Container>
    </div>
  )
}
