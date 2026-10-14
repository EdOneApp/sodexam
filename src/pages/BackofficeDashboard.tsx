import { Navigate } from 'react-router-dom'
import { Container, Card, SectionTitle } from '../design-system/Card'
import { Button } from '../design-system/Button'
import { useAuth } from '../context/AuthContext'
import { historiqueVigilance } from '../data/vigilance'
import { actualites } from '../data/actualites'
import { StatCounter } from '../design-system/StatCounter'

export default function BackofficeDashboard() {
  const { session, deconnecter } = useAuth()
  if (!session || session.espace !== 'backoffice') return <Navigate to="/login" replace />

  return (
    <div className="bg-(--color-sand) py-16 dark:bg-(--color-night)">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="rounded-full bg-orange-500/15 px-3 py-1 text-xs font-semibold text-orange-600">DÉMO — données fictives</span>
            <h1 className="mt-2 font-display text-3xl font-bold">Bonjour {session.nom}</h1>
            <p className="text-sm text-black/60 dark:text-white/60">{session.role}</p>
          </div>
          <Button variant="ghost" onClick={deconnecter}>Se déconnecter</Button>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
          <StatCounter value={4821} label="Visiteurs (30j)" />
          <StatCounter value={37} label="Demandes reçues" />
          <StatCounter value={12} label="Rendez-vous aujourd’hui" />
          <StatCounter value={8} label="Actualités publiées" />
        </div>

        <SectionTitle eyebrow="Vigilance" title="Dernières publications" />
        <div className="space-y-2">
          {historiqueVigilance.map((b) => (
            <Card key={b.id} className="flex items-center justify-between">
              <div>
                <div className="font-semibold">{b.titre}</div>
                <div className="text-sm text-black/60 dark:text-white/60">{b.date}</div>
              </div>
              <span className="rounded-full bg-black/10 px-3 py-1 text-xs font-semibold dark:bg-white/10">Niveau {b.niveauMax}</span>
            </Card>
          ))}
        </div>

        <SectionTitle eyebrow="Éditorial" title="File de validation" />
        <div className="space-y-2">
          {actualites.slice(0, 4).map((a) => (
            <Card key={a.slug} className="flex items-center justify-between">
              <div className="font-medium">{a.titre}</div>
              <div className="flex gap-2">
                <button className="rounded-full bg-(--color-forest) px-3 py-1.5 text-xs font-semibold text-white">Valider</button>
                <button className="rounded-full bg-black/10 px-3 py-1.5 text-xs font-semibold dark:bg-white/10">Modifier</button>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  )
}
