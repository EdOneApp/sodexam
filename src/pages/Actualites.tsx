import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import { Container, SectionTitle } from '../design-system/Card'
import { SplitTitle } from '../components/SplitTitle'
import { Button } from '../design-system/Button'
import { Icon } from '../design-system/Icon'
import { actualites, type Actualite } from '../data/actualites'

const themes: Array<Actualite['theme'] | 'Tous'> = ['Tous', 'Météo', 'Aéroports', 'CERMA', 'Institution', 'Projet']

const tailleClasses: Record<Actualite['tailleGrille'], string> = {
  sm: '',
  md: 'sm:row-span-1 sm:col-span-1',
  lg: 'sm:col-span-2 sm:row-span-2',
}

export default function Actualites() {
  const [theme, setTheme] = useState<typeof themes[number]>('Tous')
  const [envoye, setEnvoye] = useState(false)
  const liste = actualites.filter((a) => theme === 'Tous' || a.theme === theme)

  return (
    <div className="py-16">
      <Container>
        <SplitTitle text="Actualités" className="text-4xl font-bold sm:text-5xl" />

        <div className="mt-6 flex flex-wrap gap-2">
          {themes.map((th) => (
            <button
              key={th}
              onClick={() => setTheme(th)}
              className={clsx(
                'rounded-full border px-4 py-2 text-sm font-medium transition',
                theme === th ? 'border-(--color-sky) bg-(--color-sky) text-white' : 'border-black/10 dark:border-white/10',
              )}
            >
              {th}
            </button>
          ))}
        </div>

        <div className="mt-8 grid auto-rows-[minmax(160px,auto)] gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {liste.map((a) => (
            <motion.div
              key={a.slug}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={clsx('flex flex-col justify-between rounded-2xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5', tailleClasses[a.tailleGrille])}
            >
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold uppercase tracking-wide text-(--color-sky)">{a.theme}</span>
                  <span className="text-black/40 dark:text-white/40">{a.date}</span>
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold">{a.titre}</h3>
                <p className="mt-2 text-sm text-black/60 dark:text-white/60">{a.resume}</p>
              </div>
              <Link to={`/actualites/${a.slug}`} className="mt-4 text-sm font-semibold text-(--color-sky)">Lire l’article →</Link>
            </motion.div>
          ))}
        </div>

        <SectionTitle eyebrow="Newsletter" title="Restez informé" />
        <div className="max-w-md">
          {envoye ? (
            <p className="flex items-center gap-2 text-sm font-medium text-(--color-forest)">
              <Icon name="check" className="h-4 w-4" />
              Inscription confirmée (simulation).
            </p>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setEnvoye(true) }} className="flex gap-2">
              <input required type="email" placeholder="Votre email" className="flex-1 rounded-full border border-black/10 px-4 py-2.5 text-sm dark:border-white/10 dark:bg-white/5" />
              <Button type="submit">S’abonner</Button>
            </form>
          )}
        </div>
      </Container>
    </div>
  )
}
