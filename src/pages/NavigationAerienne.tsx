import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Container, Card, SectionTitle } from '../design-system/Card'
import { SplitTitle } from '../components/SplitTitle'
import { Icon } from '../design-system/Icon'

const etapes = [
  { titre: 'Décollage — Abidjan FIR', texte: 'Le contrôle d’approche guide l’appareil depuis la piste jusqu’à l’espace aérien supérieur.' },
  { titre: 'Montée initiale', texte: 'Transfert vers le contrôle régional, séparation avec les autres trafics ivoiriens et sous-régionaux.' },
  { titre: 'Croisière en FIR Abidjan', texte: 'Surveillance continue par les centres de contrôle, coordination avec les FIR voisines (ASECNA).' },
  { titre: 'Approche et atterrissage', texte: 'Guidage final vers la plateforme de destination, en lien avec la tour de contrôle locale.' },
]

export default function NavigationAerienne() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '92%'])
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [0, 10, 0])

  return (
    <div className="py-16">
      <Container>
        <SplitTitle text="Navigation aérienne" className="text-4xl font-bold sm:text-5xl" />
        <p className="mt-4 max-w-2xl text-black/60 dark:text-white/60">
          Suivez un vol fictif traversant l’espace aérien ivoirien, étape par étape.
        </p>

        <div ref={ref} className="relative mt-12 h-[70vh] overflow-hidden rounded-3xl bg-gradient-to-b from-(--color-sky) to-(--color-night) p-8">
          <div className="absolute left-8 right-8 top-1/2 h-px bg-white/30" />
          <motion.div style={{ left: x, rotate }} className="absolute top-1/2 -translate-y-1/2">
            <Icon name="plane" className="h-9 w-9 text-(--color-ivory-orange)" strokeWidth={1.2} />
          </motion.div>
          <div className="grid h-full grid-cols-1 content-center gap-6 sm:grid-cols-4">
            {etapes.map((e, i) => (
              <motion.div
                key={e.titre}
                initial={{ opacity: 0.3 }}
                whileInView={{ opacity: 1 }}
                viewport={{ amount: 0.6 }}
                className="glass rounded-2xl p-4 text-white"
              >
                <div className="font-mono-data text-xs text-(--color-radar)">Étape {i + 1}</div>
                <h3 className="mt-1 font-display text-sm font-semibold">{e.titre}</h3>
                <p className="mt-2 text-xs text-white/70">{e.texte}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <SectionTitle eyebrow="Coordination" title="Un espace aérien sous surveillance continue" />
        <Card>
          <p className="text-sm text-black/60 dark:text-white/60">
            La Direction de la Navigation Aérienne assure la gestion du trafic aérien dans la FIR (Flight Information
            Region) d’Abidjan, en coordination avec les organismes régionaux comme l’ASECNA, afin de garantir la
            sécurité et la fluidité de la circulation aérienne.
          </p>
        </Card>
      </Container>
    </div>
  )
}
