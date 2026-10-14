import { villes } from '../data/villes'
import { aeroports } from '../data/aeroports'

export type SearchItem = {
  label: string
  sousTitre?: string
  href: string
  categorie: string
}

export const pagesIndex: SearchItem[] = [
  { label: 'Accueil', href: '/', categorie: 'Page' },
  { label: 'Présentation', href: '/presentation', categorie: 'Page' },
  { label: 'Mot du Directeur Général', href: '/mot-du-dg', categorie: 'Page' },
  { label: 'Gouvernance', href: '/gouvernance', categorie: 'Page' },
  { label: 'Prévisions par ville', href: '/meteo', categorie: 'Météo' },
  { label: 'Vigilance', href: '/vigilance', categorie: 'Météo' },
  { label: 'Météo marine', href: '/meteo-marine', categorie: 'Météo' },
  { label: 'Agrométéo et climat', href: '/agrometeo', categorie: 'Météo' },
  { label: 'Météo aéronautique', href: '/meteo-aeronautique', categorie: 'Météo' },
  { label: 'Nos aéroports', href: '/aeroports', categorie: 'Aéroports' },
  { label: 'Navigation aérienne', href: '/navigation-aerienne', categorie: 'Aéroports' },
  { label: 'CERMA', href: '/cerma', categorie: 'Services' },
  { label: 'Catalogue météo', href: '/produits', categorie: 'Services' },
  { label: 'Actualités', href: '/actualites', categorie: 'Contenu' },
  { label: 'Carrières', href: '/carrieres', categorie: 'Contenu' },
  { label: 'Appels d’offres', href: '/appels-offres', categorie: 'Contenu' },
  { label: 'Contact', href: '/contact', categorie: 'Page' },
]

export function buildSearchIndex(): SearchItem[] {
  const villesItems: SearchItem[] = villes.map((v) => ({
    label: `Météo ${v.nom}`,
    sousTitre: v.region,
    href: `/meteo/${v.slug}`,
    categorie: 'Ville',
  }))
  const aeroportsItems: SearchItem[] = aeroports.map((a) => ({
    label: a.nom,
    sousTitre: `${a.codeIata} · ${a.ville}`,
    href: `/aeroports/${a.code}`,
    categorie: 'Aéroport',
  }))
  return [...pagesIndex, ...villesItems, ...aeroportsItems]
}
