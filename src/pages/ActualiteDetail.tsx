import { useParams, Navigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Container } from '../design-system/Card'
import { actualites } from '../data/actualites'

export default function ActualiteDetail() {
  const { slug = '' } = useParams()
  const article = actualites.find((a) => a.slug === slug)
  if (!article) return <Navigate to="/actualites" replace />

  const autres = actualites.filter((a) => a.slug !== slug).slice(0, 3)

  return (
    <div className="py-16">
      <Container className="max-w-3xl">
        <Link to="/actualites" className="text-sm text-(--color-sky)">← Retour aux actualités</Link>
        <div className="mt-4 flex items-center gap-3 text-xs">
          <span className="font-semibold uppercase tracking-wide text-(--color-sky)">{article.theme}</span>
          <span className="text-black/40 dark:text-white/40">{article.date}</span>
        </div>
        <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{article.titre}</h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2 }}
          className="mt-6 h-1 origin-left rounded bg-gradient-to-r from-(--color-sky) to-(--color-ivory-orange)"
        />

        <p className="mt-6 text-lg text-black/70 dark:text-white/70">{article.resume}</p>
        <div className="prose mt-6 space-y-4 text-black/70 dark:text-white/70">
          <p>
            Cet article de démonstration illustre le format éditorial attendu pour les actualités SODEXAM : thème,
            date, résumé et corps de texte structuré, avec partage et articles liés.
          </p>
          <p>
            Dans la version en production, ce contenu serait alimenté par le back-office éditorial décrit dans le
            cahier des charges (rédacteur, valideur, administrateur).
          </p>
        </div>

        <div className="mt-8 flex gap-2">
          {['X', 'Facebook', 'WhatsApp'].map((s) => (
            <button key={s} className="rounded-full border border-black/10 px-4 py-2 text-sm dark:border-white/10">Partager sur {s}</button>
          ))}
        </div>

        <div className="mt-12">
          <h2 className="font-display text-xl font-semibold">Articles liés</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {autres.map((a) => (
              <Link key={a.slug} to={`/actualites/${a.slug}`} className="rounded-xl border border-black/10 p-4 text-sm hover:border-(--color-sky) dark:border-white/10">
                {a.titre}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}
