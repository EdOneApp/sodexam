import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container, Card, SectionTitle } from '../design-system/Card'
import { Button } from '../design-system/Button'
import { StatCounter } from '../design-system/StatCounter'
import { SplitTitle } from '../components/SplitTitle'
import { Icon } from '../design-system/Icon'
import { metiers, offres } from '../data/metiers'
import engagementImage from '../assets/photos/korhogo-jme.jpg'

export default function Carrieres() {
  const [index, setIndex] = useState(0)
  const [candidature, setCandidature] = useState<string | null>(null)

  return (
    <div className="py-16">
      <Container>
        <SplitTitle text="Carrières" className="text-4xl font-bold sm:text-5xl" />
        <p className="mt-4 max-w-2xl text-black/60 dark:text-white/60">
          Rejoignez les métiers de la météorologie, de l’aéroportuaire et de la médecine aéronautique.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
          <StatCounter value={1200} suffix="+" label="Agents" />
          <StatCounter value={8} label="Plateformes" />
          <StatCounter value={45} suffix="%" label="Femmes dans l’effectif" />
          <StatCounter value={120} suffix="+" label="Recrutements / an" />
        </div>

        <div className="relative mt-10 h-64 overflow-hidden rounded-3xl sm:h-80">
          <img src={engagementImage} alt="Engagement SODEXAM sur une plateforme régionale" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <p className="absolute bottom-5 left-5 text-sm font-medium text-white">Journée de sensibilisation sur une plateforme SODEXAM</p>
        </div>

        <SectionTitle eyebrow="Métiers" title="Nos métiers en vitrine" />
        <div className="relative overflow-hidden rounded-3xl bg-(--color-night) p-8 text-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={metiers[index].slug}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-(--color-radar)">{metiers[index].famille}</span>
              <h3 className="mt-2 font-display text-2xl font-bold">{metiers[index].nom}</h3>
              <p className="mt-3 max-w-lg text-white/70">{metiers[index].description}</p>
            </motion.div>
          </AnimatePresence>
          <div className="mt-6 flex gap-2">
            {metiers.map((m, i) => (
              <button key={m.slug} onClick={() => setIndex(i)} className={`h-2 w-8 rounded-full ${i === index ? 'bg-(--color-ivory-orange)' : 'bg-white/20'}`} />
            ))}
          </div>
        </div>

        <SectionTitle eyebrow="Recrutement" title="Offres d’emploi" />
        <div className="space-y-3">
          {offres.map((o) => (
            <Card key={o.id} className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="font-display font-semibold">{o.titre}</h3>
                <p className="text-sm text-black/60 dark:text-white/60">{o.lieu} · {o.type} · date limite {o.dateLimite}</p>
              </div>
              <Button variant="secondary" onClick={() => setCandidature(o.id)}>Postuler</Button>
            </Card>
          ))}
        </div>

        <AnimatePresence>
          {candidature && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
              <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="w-full max-w-md rounded-2xl bg-white p-6 dark:bg-(--color-night)">
                <h3 className="font-display text-lg font-semibold">Candidature (démo)</h3>
                <form className="mt-4 space-y-3" onSubmit={(e) => { e.preventDefault(); setCandidature(null) }}>
                  <input required placeholder="Nom complet" className="w-full rounded-lg border border-black/10 px-4 py-2 text-sm dark:border-white/10 dark:bg-white/5" />
                  <input required type="email" placeholder="Email" className="w-full rounded-lg border border-black/10 px-4 py-2 text-sm dark:border-white/10 dark:bg-white/5" />
                  <div className="flex items-center gap-2 text-sm text-black/50 dark:text-white/50">
                    <Icon name="paperclip" className="h-4 w-4" />
                    CV (simulation, aucun fichier n’est envoyé)
                  </div>
                  <div className="flex justify-end gap-2">
                    <button type="button" onClick={() => setCandidature(null)} className="rounded-full px-4 py-2 text-sm">Annuler</button>
                    <Button type="submit">Envoyer</Button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <SectionTitle eyebrow="Jeunesse" title="Bourse d’excellence Dominique Ouattara" />
        <Card>
          <p className="text-sm text-black/60 dark:text-white/60">
            Campagne 2026-2027 ouverte pour les filières aéronautiques et météorologiques. Candidature en ligne à venir.
          </p>
        </Card>
      </Container>
    </div>
  )
}
