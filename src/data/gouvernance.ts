export type Membre = {
  nom: string
  fonction: string
}

export const conseilAdministration: Membre[] = [
  { nom: 'Abdul Adam Sylla', fonction: 'Directeur Général' },
  { nom: 'Président du Conseil d’administration', fonction: 'Représentant de l’État' },
  { nom: 'Représentant du Ministère des Transports', fonction: 'Administrateur' },
  { nom: 'Représentant du Ministère de l’Économie et des Finances', fonction: 'Administrateur' },
  { nom: 'Représentant du personnel', fonction: 'Administrateur' },
]

export const comiteDirection: Membre[] = [
  { nom: 'Abdul Adam Sylla', fonction: 'Directeur Général' },
  { nom: 'Directeur de la Météorologie Nationale', fonction: 'Direction métier' },
  { nom: 'Directeur de la Navigation Aérienne', fonction: 'Direction métier' },
  { nom: 'Directeur des Aérodromes et de la Sûreté', fonction: 'Direction métier' },
  { nom: 'Directeur du CERMA', fonction: 'Direction métier' },
  { nom: 'Directeur Administratif et Financier', fonction: 'Direction support' },
  { nom: 'Directeur des Systèmes d’Information', fonction: 'Direction support' },
]

export type RapportAnnuel = {
  annee: string
  titre: string
}

export const rapportsAnnuels: RapportAnnuel[] = [
  { annee: '2025', titre: 'Rapport annuel d’activités 2025' },
  { annee: '2024', titre: 'Rapport annuel d’activités 2024' },
  { annee: '2023', titre: 'Rapport annuel d’activités 2023' },
]

export const frise = [
  { annee: '1997', titre: 'Création de la SODEXAM', texte: 'Décret n°97-228 du 16 avril 1997 portant création de la société d’État.' },
  { annee: '2003', titre: 'Modernisation des aérodromes régionaux', texte: 'Premiers programmes de réhabilitation des pistes de l’intérieur du pays.' },
  { annee: '2020', titre: 'Certification ISO 9001:2015', texte: 'La météorologie nationale obtient sa certification qualité internationale.' },
  { annee: '2023', titre: 'Lancement de VIGICLIMM', texte: 'Démarrage du projet de modernisation de la météorologie, financé par l’AFD (26,6 M€).' },
  { annee: '2026', titre: 'Radar météo et nouvelle direction', texte: 'Premier radar météo à Abidjan en test, nouveau Directeur Général confirmé, chantier de Kong en cours.' },
]
