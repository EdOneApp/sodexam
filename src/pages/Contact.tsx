import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container, SectionTitle } from '../design-system/Card'
import { Button } from '../design-system/Button'
import { SplitTitle } from '../components/SplitTitle'
import { AirportsMap } from '../components/AirportsMap'
import { MapBoundary } from '../components/MapBoundary'
import { Icon } from '../design-system/Icon'

export default function Contact() {
  const [envoye, setEnvoye] = useState(false)

  return (
    <div className="py-16">
      <Container>
        <SplitTitle text="Contact" className="text-4xl font-bold sm:text-5xl" />

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <MapBoundary height={420}>
            <AirportsMap height={420} />
          </MapBoundary>

          <div className="relative">
            <AnimatePresence mode="wait">
              {envoye ? (
                <motion.div
                  key="confirm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex h-full flex-col items-center justify-center rounded-2xl border border-black/10 p-10 text-center dark:border-white/10"
                >
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-(--color-forest)/10"
                  >
                    <Icon name="check" className="h-8 w-8 text-(--color-forest)" strokeWidth={2} />
                  </motion.div>
                  <h3 className="mt-4 font-display text-xl font-semibold">Message envoyé</h3>
                  <p className="mt-2 text-sm text-black/60 dark:text-white/60">Simulation — aucun message n’a réellement été transmis.</p>
                  <button onClick={() => setEnvoye(false)} className="mt-4 text-sm text-(--color-sky) underline">Envoyer un autre message</button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  exit={{ opacity: 0 }}
                  onSubmit={(e) => { e.preventDefault(); setEnvoye(true) }}
                  className="space-y-3 rounded-2xl border border-black/10 p-6 dark:border-white/10"
                >
                  <input required placeholder="Nom complet" className="w-full rounded-lg border border-black/10 px-4 py-2 text-sm dark:border-white/10 dark:bg-white/5" />
                  <input required type="email" placeholder="Email" className="w-full rounded-lg border border-black/10 px-4 py-2 text-sm dark:border-white/10 dark:bg-white/5" />
                  <input placeholder="Sujet" className="w-full rounded-lg border border-black/10 px-4 py-2 text-sm dark:border-white/10 dark:bg-white/5" />
                  <textarea required rows={4} placeholder="Votre message" className="w-full rounded-lg border border-black/10 px-4 py-2 text-sm dark:border-white/10 dark:bg-white/5" />
                  <Button type="submit">Envoyer le message</Button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>

        <SectionTitle eyebrow="Siège social" title="Nous trouver" />
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-black/10 p-5 dark:border-white/10">
            <div className="text-sm font-semibold">Adresse</div>
            <div className="mt-1 text-sm text-black/60 dark:text-white/60">Abidjan, Côte d’Ivoire (fictif)</div>
          </div>
          <div className="rounded-xl border border-black/10 p-5 dark:border-white/10">
            <div className="text-sm font-semibold">Téléphone</div>
            <div className="mt-1 text-sm text-black/60 dark:text-white/60">+225 27 XX XX XX XX (fictif)</div>
          </div>
          <div className="rounded-xl border border-black/10 p-5 dark:border-white/10">
            <div className="text-sm font-semibold">Horaires</div>
            <div className="mt-1 text-sm text-black/60 dark:text-white/60">Lun–Ven, 8h–17h</div>
          </div>
        </div>
      </Container>
    </div>
  )
}
