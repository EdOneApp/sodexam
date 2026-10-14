export type Metier = {
  slug: string
  nom: string
  famille: string
  description: string
}

export const metiers: Metier[] = [
  { slug: 'controleur-aerien', nom: 'Contrôleur aérien', famille: 'Navigation aérienne', description: 'Assure la séparation et la fluidité du trafic aérien dans l’espace ivoirien.' },
  { slug: 'previsionniste', nom: 'Prévisionniste météorologue', famille: 'Météorologie', description: 'Élabore les prévisions et bulletins de vigilance à partir des données VIGICLIMM.' },
  { slug: 'technicien-radar', nom: 'Technicien radar et instrumentation', famille: 'Météorologie', description: 'Maintient et calibre les stations et le radar météorologique.' },
  { slug: 'agent-securite-aeroportuaire', nom: 'Agent de sûreté aéroportuaire', famille: 'Sûreté', description: 'Garantit la sûreté des passagers, du fret et des infrastructures aéroportuaires.' },
  { slug: 'medecin-aeronautique', nom: 'Médecin examinateur aéronautique', famille: 'CERMA', description: 'Réalise les visites médicales d’aptitude du personnel navigant.' },
  { slug: 'ingenieur-pistes', nom: 'Ingénieur infrastructures aéroportuaires', famille: 'Aérodromes', description: 'Conçoit et supervise la construction et l’entretien des pistes et aérogares.' },
]

export type Offre = {
  id: string
  titre: string
  lieu: string
  type: string
  dateLimite: string
}

export const offres: Offre[] = [
  { id: 'off-01', titre: 'Prévisionniste météorologue (H/F)', lieu: 'Abidjan', type: 'CDI', dateLimite: '2026-11-15' },
  { id: 'off-02', titre: 'Technicien radar et instrumentation', lieu: 'Abidjan', type: 'CDI', dateLimite: '2026-11-20' },
  { id: 'off-03', titre: 'Agent de sûreté aéroportuaire', lieu: 'Korhogo', type: 'CDD 12 mois', dateLimite: '2026-10-30' },
  { id: 'off-04', titre: 'Ingénieur infrastructures aéroportuaires', lieu: 'Kong', type: 'Mission projet', dateLimite: '2026-12-01' },
]
