import { useState } from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import { Container, Card, SectionTitle } from '../design-system/Card'
import { SplitTitle } from '../components/SplitTitle'
import { VigilanceBadge } from '../design-system/VigilanceBadge'
import { zonesVigilance, historiqueVigilance, niveauConseil, type ZoneVigilance } from '../data/vigilance'

const niveauBg: Record<string, string> = {
  vert: 'bg-(--color-vigilance-green)',
  jaune: 'bg-(--color-vigilance-yellow)',
  orange: 'bg-(--color-vigilance-orange)',
  rouge: 'bg-(--color-vigilance-red)',
}

export default function Vigilance() {
  const [selection, setSelection] = useState<ZoneVigilance>(zonesVigilance[0])

  return (
    <div className="py-16">
      <Container>
        <SplitTitle text="Vigilance météorologique" className="text-4xl font-bold sm:text-5xl" />
        <p className="mt-4 max-w-2xl text-black/60 dark:text-white/60">
          Carte schématique des régions de Côte d’Ivoire, colorée selon le niveau de vigilance en vigueur. Chaque
          niveau combine toujours une couleur, une icône et un mot, jamais la couleur seule.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <div className="mx-auto grid max-w-md gap-2" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
              {zonesVigilance.map((z) => (
                <motion.button
                  key={z.code}
                  onClick={() => setSelection(z)}
                  whileHover={{ scale: 1.06 }}
                  style={{ gridColumnStart: z.col + 1, gridRowStart: z.row + 1 }}
                  className={clsx(
                    'relative flex aspect-square flex-col items-center justify-center rounded-xl p-1 text-center text-[10px] font-semibold text-white shadow',
                    niveauBg[z.niveau],
                    selection.code === z.code && 'ring-4 ring-white/70',
                    (z.niveau === 'orange' || z.niveau === 'rouge') && 'animate-pulse-alert',
                  )}
                >
                  {z.nom}
                </motion.button>
              ))}
            </div>
            <p className="mt-6 text-center text-xs text-black/40 dark:text-white/40">
              Carte schématique (grille) à but illustratif — non cartographique.
            </p>
          </div>

          <Card>
            <h3 className="font-display text-xl font-semibold">{selection.nom}</h3>
            <div className="mt-3"><VigilanceBadge niveau={selection.niveau} pulse /></div>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-black/50 dark:text-white/50">Phénomène</dt><dd className="font-medium">{selection.phenomene}</dd></div>
              <div className="flex justify-between"><dt className="text-black/50 dark:text-white/50">Validité</dt><dd className="font-medium">{selection.validite}</dd></div>
            </dl>
            <p className="mt-4 rounded-xl bg-black/[0.03] p-4 text-sm dark:bg-white/5">{niveauConseil[selection.niveau]}</p>
          </Card>
        </div>

        <SectionTitle eyebrow="Archives" title="Historique des bulletins" />
        <div className="space-y-3">
          {historiqueVigilance.map((b) => (
            <div key={b.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-black/10 p-4 dark:border-white/10">
              <div>
                <div className="font-semibold">{b.titre}</div>
                <div className="text-sm text-black/60 dark:text-white/60">{b.resume}</div>
                <div className="text-xs text-black/40 dark:text-white/40">{b.date}</div>
              </div>
              <VigilanceBadge niveau={b.niveauMax} small />
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}
