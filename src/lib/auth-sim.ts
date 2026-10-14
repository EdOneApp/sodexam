// Authentification simulée côté client — AUCUN backend réel.
// Les identifiants ci-dessous sont volontairement affichés sur les pages de
// connexion : ce site est une vitrine de démonstration à données fictives.

export type EspaceDemo = 'backoffice' | 'cerma'

export type CompteDemo = {
  email: string
  motDePasse: string
  role: string
  nom: string
}

export const comptesDemo: Record<EspaceDemo, CompteDemo> = {
  backoffice: {
    email: 'admin@sodexam.ci',
    motDePasse: 'demo1234',
    role: 'Administrateur éditorial',
    nom: 'Aya Konan',
  },
  cerma: {
    email: 'pilote@sodexam.ci',
    motDePasse: 'cerma2026',
    role: 'Personnel navigant',
    nom: 'Capitaine Yao Brou',
  },
}

const STORAGE_KEY = 'sodexam-demo-session'

type Session = { espace: EspaceDemo; nom: string; role: string }

export function seConnecter(espace: EspaceDemo, email: string, motDePasse: string): Session | null {
  const compte = comptesDemo[espace]
  if (email.trim().toLowerCase() === compte.email && motDePasse === compte.motDePasse) {
    const session: Session = { espace, nom: compte.nom, role: compte.role }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
    return session
  }
  return null
}

export function sessionActuelle(): Session | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Session) : null
  } catch {
    return null
  }
}

export function seDeconnecter() {
  localStorage.removeItem(STORAGE_KEY)
}
