import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Container } from '../design-system/Card'
import { Button } from '../design-system/Button'
import { useAuth } from '../context/AuthContext'
import { comptesDemo, type EspaceDemo } from '../lib/auth-sim'

export default function Login() {
  const [espace, setEspace] = useState<EspaceDemo>('backoffice')
  const [email, setEmail] = useState('')
  const [motDePasse, setMotDePasse] = useState('')
  const [erreur, setErreur] = useState(false)
  const { connecter } = useAuth()
  const navigate = useNavigate()

  const compte = comptesDemo[espace]

  function remplirDemo() {
    setEmail(compte.email)
    setMotDePasse(compte.motDePasse)
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    const ok = connecter(espace, email, motDePasse)
    if (ok) navigate(espace === 'backoffice' ? '/backoffice' : '/cerma/espace')
    else setErreur(true)
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-(--color-night) py-16 text-white">
      <Container className="max-w-md">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <h1 className="font-display text-2xl font-bold">Connexion</h1>
          <p className="mt-2 text-sm text-white/60">
            Site de démonstration : aucun compte réel n’existe. Choisissez un espace et utilisez les identifiants
            fictifs affichés ci-dessous.
          </p>

          <div className="mt-6 flex gap-2">
            {(['backoffice', 'cerma'] as const).map((e) => (
              <button
                key={e}
                onClick={() => { setEspace(e); setErreur(false) }}
                className={`flex-1 rounded-full border px-4 py-2 text-sm font-medium ${espace === e ? 'border-(--color-sky) bg-(--color-sky)' : 'border-white/15'}`}
              >
                {e === 'backoffice' ? 'Back-office éditorial' : 'Espace CERMA'}
              </button>
            ))}
          </div>

          <motion.div
            key={espace}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 rounded-xl border border-dashed border-(--color-radar)/50 bg-(--color-radar)/10 p-4 text-sm"
          >
            <div className="font-semibold text-(--color-radar)">Identifiants de démonstration</div>
            <div className="mt-1 font-mono-data">{compte.email}</div>
            <div className="font-mono-data">{compte.motDePasse}</div>
            <button type="button" onClick={remplirDemo} className="mt-2 text-xs underline">Remplir automatiquement</button>
          </motion.div>

          <form onSubmit={onSubmit} className="mt-6 space-y-3">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full rounded-lg border border-white/15 bg-transparent px-4 py-2.5 text-sm outline-none placeholder:text-white/40"
            />
            <input
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              type="password"
              placeholder="Mot de passe"
              className="w-full rounded-lg border border-white/15 bg-transparent px-4 py-2.5 text-sm outline-none placeholder:text-white/40"
            />
            {erreur && <p className="text-sm text-red-300">Identifiants incorrects — utilisez les identifiants de démonstration ci-dessus.</p>}
            <Button type="submit" className="w-full">Se connecter</Button>
          </form>
        </div>
      </Container>
    </div>
  )
}
