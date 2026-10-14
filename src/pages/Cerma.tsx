import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Container, Card, SectionTitle } from '../design-system/Card'
import { Button } from '../design-system/Button'
import { SplitTitle } from '../components/SplitTitle'
import { Icon } from '../design-system/Icon'
import { seededRandom } from '../lib/rng'
import cermaImage from '../assets/photos/cerma-entree.jpg'

const etapes = [
  { titre: 'Prise de rendez-vous', texte: 'Choisissez votre classe d’examen et un créneau disponible en ligne.' },
  { titre: 'Dossier et pièces', texte: 'Déposez vos pièces justificatives et votre dossier médical.' },
  { titre: 'Consultation CERMA', texte: 'Visite médicale réalisée par un médecin examinateur agréé.' },
  { titre: 'Résultat et aptitude', texte: 'Délivrance du certificat d’aptitude ou orientation complémentaire.' },
]

const examens = [
  { classe: 'Classe 1', public: 'Pilotes professionnels', tarif: '75 000 FCFA' },
  { classe: 'Classe 2', public: 'Pilotes privés', tarif: '45 000 FCFA' },
  { classe: 'Classe 3', public: 'Contrôleurs aériens', tarif: '50 000 FCFA' },
]

function creneauxDisponibles(jourOffset: number) {
  const rand = seededRandom(`cerma-${jourOffset}`)
  const heures = ['08h00', '09h30', '11h00', '14h00', '15h30']
  return heures.filter(() => rand() > 0.35)
}

export default function Cerma() {
  const [classe, setClasse] = useState(examens[0].classe)
  const [jourIndex, setJourIndex] = useState(0)
  const [creneau, setCreneau] = useState<string | null>(null)
  const [confirme, setConfirme] = useState(false)

  const jours = useMemo(() => {
    const today = new Date()
    return Array.from({ length: 6 }).map((_, i) => {
      const d = new Date(today)
      d.setDate(today.getDate() + i + 1)
      return d
    })
  }, [])

  function reserver() {
    if (!creneau) return
    setConfirme(true)
  }

  return (
    <div className="py-16">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <SplitTitle text="CERMA" className="text-4xl font-bold sm:text-5xl" />
            <p className="mt-4 max-w-2xl text-black/60 dark:text-white/60">
              Centre d’Expertise et de Recherche en Médecine Aéronautique — visites médicales d’aptitude du personnel
              navigant et des candidats aux métiers aéronautiques.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl">
            <img src={cermaImage} alt="Entrée du Centre Régional de Médecine Aéronautique et Aéroportuaire" className="h-56 w-full object-cover sm:h-64" />
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-4">
          {etapes.map((e, i) => (
            <motion.div
              key={e.titre}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="relative rounded-2xl border border-black/10 p-5 dark:border-white/10"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-(--color-sky) font-mono-data font-bold text-white">{i + 1}</div>
              <h3 className="mt-3 font-display text-sm font-semibold">{e.titre}</h3>
              <p className="mt-1 text-xs text-black/60 dark:text-white/60">{e.texte}</p>
            </motion.div>
          ))}
        </div>

        <SectionTitle eyebrow="Tarifs" title="Classes d’examen" />
        <div className="grid gap-4 sm:grid-cols-3">
          {examens.map((e) => (
            <Card key={e.classe}>
              <h3 className="font-display text-lg font-semibold">{e.classe}</h3>
              <p className="mt-1 text-sm text-black/60 dark:text-white/60">{e.public}</p>
              <p className="mt-3 font-mono-data text-xl font-bold text-(--color-sky)">{e.tarif}</p>
            </Card>
          ))}
        </div>

        <SectionTitle eyebrow="En ligne" title="Prendre rendez-vous" />
        <Card className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            {!confirme ? (
              <motion.div key="form" exit={{ opacity: 0 }}>
                <label className="text-sm font-semibold">Classe d’examen</label>
                <div className="mt-2 flex gap-2">
                  {examens.map((e) => (
                    <button
                      key={e.classe}
                      onClick={() => setClasse(e.classe)}
                      className={`rounded-full border px-4 py-2 text-sm ${classe === e.classe ? 'border-(--color-sky) bg-(--color-sky) text-white' : 'border-black/10 dark:border-white/10'}`}
                    >
                      {e.classe}
                    </button>
                  ))}
                </div>

                <label className="mt-6 block text-sm font-semibold">Jour</label>
                <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
                  {jours.map((d, i) => (
                    <button
                      key={i}
                      onClick={() => { setJourIndex(i); setCreneau(null) }}
                      className={`min-w-[72px] rounded-xl border px-3 py-2 text-center text-xs ${jourIndex === i ? 'border-(--color-sky) bg-(--color-sky) text-white' : 'border-black/10 dark:border-white/10'}`}
                    >
                      <div className="font-semibold">{d.toLocaleDateString('fr-FR', { weekday: 'short' })}</div>
                      <div>{d.getDate()}/{d.getMonth() + 1}</div>
                    </button>
                  ))}
                </div>

                <label className="mt-6 block text-sm font-semibold">Créneau</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {creneauxDisponibles(jourIndex).map((h) => (
                    <button
                      key={h}
                      onClick={() => setCreneau(h)}
                      className={`rounded-full border px-4 py-2 text-sm ${creneau === h ? 'border-(--color-ivory-orange) bg-(--color-ivory-orange) text-white' : 'border-black/10 dark:border-white/10'}`}
                    >
                      {h}
                    </button>
                  ))}
                  {creneauxDisponibles(jourIndex).length === 0 && <span className="text-sm text-black/50 dark:text-white/50">Aucun créneau ce jour, choisissez un autre jour.</span>}
                </div>

                <Button className="mt-6" onClick={reserver}>Confirmer le rendez-vous</Button>
              </motion.div>
            ) : (
              <motion.div key="confirm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center py-10 text-center">
                <motion.div
                  initial={{ x: -40, y: 20, rotate: -20, opacity: 0 }}
                  animate={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-(--color-forest)/10"
                >
                  <Icon name="check" className="h-8 w-8 text-(--color-forest)" strokeWidth={2} />
                </motion.div>
                <h3 className="mt-4 font-display text-xl font-semibold">Rendez-vous confirmé</h3>
                <p className="mt-2 text-sm text-black/60 dark:text-white/60">
                  {classe} — {jours[jourIndex].toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })} à {creneau}
                </p>
                <p className="mt-1 text-xs text-black/40 dark:text-white/40">Confirmation fictive — un vrai SMS serait envoyé en production.</p>
                <button onClick={() => { setConfirme(false); setCreneau(null) }} className="mt-4 text-sm text-(--color-sky) underline">Prendre un autre rendez-vous</button>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        <div className="mt-10 rounded-xl border border-black/10 p-5 text-sm dark:border-white/10">
          Personnel navigant ou candidat ? <Link to="/login" className="font-semibold text-(--color-sky) underline">Accédez à votre espace CERMA</Link> pour suivre vos rendez-vous.
        </div>
      </Container>
    </div>
  )
}
