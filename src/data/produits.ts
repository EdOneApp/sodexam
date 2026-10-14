export type Produit = {
  slug: string
  nom: string
  categorie: string
  description: string
  delai: string
  prixIndicatif: string
}

export const produits: Produit[] = [
  { slug: 'bulletin-sectoriel-agro', nom: 'Bulletin agrométéorologique décadaire', categorie: 'Agriculture', description: 'Cumuls de pluie, bilan hydrique et conseils culturaux tous les 10 jours.', delai: '48h', prixIndicatif: 'Sur devis' },
  { slug: 'attestation-meteo', nom: 'Attestation météorologique officielle', categorie: 'Assurance & juridique', description: 'Document officiel de constat météorologique pour sinistres ou contrats.', delai: '5 jours ouvrés', prixIndicatif: 'À partir de 25 000 FCFA' },
  { slug: 'donnees-climato', nom: 'Données climatologiques historiques', categorie: 'Recherche', description: 'Séries de données par station, formats CSV/API pour chercheurs et bureaux d’études.', delai: '10 jours ouvrés', prixIndicatif: 'Sur devis' },
  { slug: 'etude-impact-climatique', nom: 'Étude d’impact climatique', categorie: 'Études', description: 'Analyse climatique approfondie pour projets d’infrastructure ou d’aménagement.', delai: '4 à 6 semaines', prixIndicatif: 'Sur devis' },
  { slug: 'bulletin-marine', nom: 'Bulletin météo-marine', categorie: 'Maritime', description: 'Houle, vent et visibilité pour la navigation côtière et portuaire.', delai: '24h', prixIndicatif: 'Abonnement mensuel' },
  { slug: 'metar-taf-flux', nom: 'Flux METAR/TAF temps réel', categorie: 'Aéronautique', description: 'Accès API aux messages METAR/TAF/SIGMET des aérodromes ivoiriens.', delai: 'Immédiat', prixIndicatif: 'Sur devis' },
]
