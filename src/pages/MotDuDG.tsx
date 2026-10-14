import { motion } from 'framer-motion'
import { Container } from '../design-system/Card'
import { SplitTitle } from '../components/SplitTitle'

const priorites = [
  'Achever la modernisation de la météorologie nationale avec le projet VIGICLIMM',
  'Désenclaver le territoire avec de nouvelles plateformes comme celle de Kong',
  'Digitaliser l’ensemble des services aux usagers et aux partenaires',
  'Renforcer la sûreté et la certification qualité de nos opérations',
]

export default function MotDuDG() {
  return (
    <div className="py-16">
      <Container className="grid gap-12 lg:grid-cols-[320px_1fr]">
        <motion.div
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          animate={{ clipPath: 'inset(0 0 0% 0)' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex h-80 w-full items-center justify-center rounded-2xl bg-gradient-to-br from-(--color-night) to-(--color-sky) text-6xl text-white/80"
        >
          👤
        </motion.div>
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-(--color-sky)">Mot du Directeur Général</span>
          <SplitTitle text="Abdul Adam Sylla" className="mt-2 text-4xl font-bold sm:text-5xl" />
          <p className="mt-2 text-sm text-black/50 dark:text-white/50">Directeur Général de la SODEXAM, confirmé par le Conseil d’administration en septembre 2026.</p>

          <motion.blockquote
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="mt-8 border-l-4 border-(--color-ivory-orange) pl-6 font-display text-xl italic"
          >
            « Notre ambition est simple : faire de la SODEXAM la référence incontestée de la météorologie et de
            l’aéroportuaire en Afrique de l’Ouest, au service de la sécurité et du développement de la Côte d’Ivoire. »
          </motion.blockquote>

          <h2 className="mt-10 font-display text-xl font-semibold">Priorités stratégiques</h2>
          <ul className="mt-4 space-y-3">
            {priorites.map((p, i) => (
              <motion.li
                key={p}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-3 rounded-xl bg-black/[0.03] p-4 text-sm dark:bg-white/5"
              >
                <span className="font-mono-data text-(--color-ivory-orange)">{String(i + 1).padStart(2, '0')}</span>
                {p}
              </motion.li>
            ))}
          </ul>
        </div>
      </Container>
    </div>
  )
}
