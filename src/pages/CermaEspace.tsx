import { Navigate, Link } from 'react-router-dom'
import { Container, Card, SectionTitle } from '../design-system/Card'
import { Button } from '../design-system/Button'
import { useAuth } from '../context/AuthContext'

const historiqueFictif = [
  { date: '2026-10-20', classe: 'Classe 1', statut: 'À venir' },
  { date: '2026-04-11', classe: 'Classe 1', statut: 'Aptitude délivrée' },
  { date: '2025-10-02', classe: 'Classe 1', statut: 'Aptitude délivrée' },
]

export default function CermaEspace() {
  const { session, deconnecter } = useAuth()
  if (!session || session.espace !== 'cerma') return <Navigate to="/login" replace />

  return (
    <div className="py-16">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="rounded-full bg-orange-500/15 px-3 py-1 text-xs font-semibold text-orange-600">DÉMO — données fictives</span>
            <h1 className="mt-2 font-display text-3xl font-bold">Bonjour {session.nom}</h1>
            <p className="text-sm text-black/60 dark:text-white/60">{session.role} · Espace CERMA</p>
          </div>
          <Button variant="ghost" onClick={deconnecter}>Se déconnecter</Button>
        </div>

        <SectionTitle eyebrow="Suivi" title="Mes visites médicales" />
        <div className="space-y-2">
          {historiqueFictif.map((h, i) => (
            <Card key={i} className="flex items-center justify-between">
              <div>
                <div className="font-semibold">{h.classe}</div>
                <div className="text-sm text-black/60 dark:text-white/60">{h.date}</div>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${h.statut === 'À venir' ? 'bg-(--color-sky) text-white' : 'bg-(--color-forest) text-white'}`}>
                {h.statut}
              </span>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <Link to="/cerma" className="font-semibold text-(--color-sky) underline">Prendre un nouveau rendez-vous →</Link>
        </div>
      </Container>
    </div>
  )
}
