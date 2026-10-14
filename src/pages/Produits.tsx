import { useRef, useState, type MouseEvent, type ReactNode } from 'react'
import { Container, SectionTitle } from '../design-system/Card'
import { SplitTitle } from '../components/SplitTitle'
import { Button } from '../design-system/Button'
import { produits } from '../data/produits'

function TiltCard({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [style, setStyle] = useState({})

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    setStyle({ transform: `perspective(600px) rotateX(${py * -10}deg) rotateY(${px * 10}deg) translateZ(10px)` })
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setStyle({ transform: 'perspective(600px) rotateX(0) rotateY(0)' })}
      style={{ transition: 'transform 0.2s ease-out', ...style }}
      className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5"
    >
      {children}
    </div>
  )
}

export default function Produits() {
  return (
    <div className="py-16">
      <Container>
        <SplitTitle text="Catalogue météo" className="text-4xl font-bold sm:text-5xl" />
        <p className="mt-4 max-w-2xl text-black/60 dark:text-white/60">
          Bulletins sectoriels, attestations officielles, données climatologiques et études sur mesure.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {produits.map((p) => (
            <TiltCard key={p.slug}>
              <span className="text-xs font-semibold uppercase tracking-wide text-(--color-sky)">{p.categorie}</span>
              <h3 className="mt-2 font-display text-lg font-semibold">{p.nom}</h3>
              <p className="mt-2 text-sm text-black/60 dark:text-white/60">{p.description}</p>
              <div className="mt-4 flex justify-between text-sm">
                <span className="text-black/50 dark:text-white/50">Délai : {p.delai}</span>
                <span className="font-semibold">{p.prixIndicatif}</span>
              </div>
            </TiltCard>
          ))}
        </div>

        <SectionTitle eyebrow="Devis" title="Demander un produit sur mesure" />
        <FormDevis />
      </Container>
    </div>
  )
}

function FormDevis() {
  const [envoye, setEnvoye] = useState(false)
  return (
    <div className="max-w-xl rounded-2xl border border-black/10 p-6 dark:border-white/10">
      {envoye ? (
        <p className="text-sm font-medium text-(--color-forest)">✓ Demande envoyée (simulation). Notre équipe commerciale fictive vous répondra sous 48h.</p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            setEnvoye(true)
          }}
          className="space-y-3"
        >
          <input required placeholder="Nom complet" className="w-full rounded-lg border border-black/10 px-4 py-2 text-sm dark:border-white/10 dark:bg-white/5" />
          <input required type="email" placeholder="Email" className="w-full rounded-lg border border-black/10 px-4 py-2 text-sm dark:border-white/10 dark:bg-white/5" />
          <textarea required placeholder="Décrivez votre besoin" rows={3} className="w-full rounded-lg border border-black/10 px-4 py-2 text-sm dark:border-white/10 dark:bg-white/5" />
          <Button type="submit">Envoyer la demande</Button>
        </form>
      )}
    </div>
  )
}
