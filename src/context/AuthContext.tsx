import { createContext, useContext, useState, type ReactNode } from 'react'
import { seConnecter, seDeconnecter, sessionActuelle, type EspaceDemo } from '../lib/auth-sim'

type Session = { espace: EspaceDemo; nom: string; role: string } | null

type AuthContextValue = {
  session: Session
  connecter: (espace: EspaceDemo, email: string, motDePasse: string) => boolean
  deconnecter: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session>(() => sessionActuelle())

  function connecter(espace: EspaceDemo, email: string, motDePasse: string) {
    const result = seConnecter(espace, email, motDePasse)
    if (result) {
      setSession(result)
      return true
    }
    return false
  }

  function deconnecter() {
    seDeconnecter()
    setSession(null)
  }

  return <AuthContext.Provider value={{ session, connecter, deconnecter }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
