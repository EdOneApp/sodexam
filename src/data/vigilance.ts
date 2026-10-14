export type NiveauVigilance = 'vert' | 'jaune' | 'orange' | 'rouge'

export const niveauLabel: Record<NiveauVigilance, string> = {
  vert: 'Vigilance verte',
  jaune: 'Vigilance jaune',
  orange: 'Vigilance orange',
  rouge: 'Vigilance rouge',
}

export const niveauConseil: Record<NiveauVigilance, string> = {
  vert: 'Pas de phénomène dangereux prévu. Activité normale.',
  jaune: 'Phénomène possible, restez informé et évitez les activités à risque.',
  orange: 'Phénomène dangereux prévu, soyez très vigilant et limitez vos déplacements.',
  rouge: 'Phénomène dangereux imminent ou en cours, mettez-vous en sécurité immédiatement.',
}

export const niveauOrdre: NiveauVigilance[] = ['vert', 'jaune', 'orange', 'rouge']

// Carte schématique (hex-grid) — positions approximatives, non cartographiques,
// utilisées pour une visualisation stylisée des zones de vigilance.
export type ZoneVigilance = {
  code: string
  nom: string
  col: number
  row: number
  niveau: NiveauVigilance
  phenomene: string
  validite: string
}

export const zonesVigilance: ZoneVigilance[] = [
  { code: 'DENG', nom: 'Denguélé', col: 1, row: 0, niveau: 'vert', phenomene: 'Aucun', validite: 'Jusqu’à demain 6h' },
  { code: 'SAV', nom: 'Savanes', col: 2, row: 0, niveau: 'jaune', phenomene: 'Harmattan / visibilité réduite', validite: 'Jusqu’à ce soir 18h' },
  { code: 'ZAN', nom: 'Zanzan', col: 3, row: 0, niveau: 'vert', phenomene: 'Aucun', validite: 'Jusqu’à demain 6h' },
  { code: 'WOR', nom: 'Woroba', col: 1, row: 1, niveau: 'vert', phenomene: 'Aucun', validite: 'Jusqu’à demain 6h' },
  { code: 'VDB', nom: 'Vallée du Bandama', col: 2, row: 1, niveau: 'jaune', phenomene: 'Orages isolés', validite: 'Jusqu’à ce soir 20h' },
  { code: 'COM', nom: 'Comoé', col: 3, row: 1, niveau: 'vert', phenomene: 'Aucun', validite: 'Jusqu’à demain 6h' },
  { code: 'MON', nom: 'Montagnes', col: 0, row: 2, niveau: 'orange', phenomene: 'Fortes pluies et risque de glissement', validite: 'Jusqu’à demain 12h' },
  { code: 'SMA', nom: 'Sassandra-Marahoué', col: 1, row: 2, niveau: 'jaune', phenomene: 'Orages isolés', validite: 'Jusqu’à ce soir 20h' },
  { code: 'LAC', nom: 'Lacs', col: 2, row: 2, niveau: 'vert', phenomene: 'Aucun', validite: 'Jusqu’à demain 6h' },
  { code: 'INDJ', nom: 'Indénié-Djuablin', col: 3, row: 2, niveau: 'vert', phenomene: 'Aucun', validite: 'Jusqu’à demain 6h' },
  { code: 'GOH', nom: 'Gôh-Djiboua', col: 0, row: 3, niveau: 'orange', phenomene: 'Cumuls de pluie importants', validite: 'Jusqu’à demain 12h' },
  { code: 'LAG', nom: 'Lagunes', col: 1, row: 3, niveau: 'rouge', phenomene: 'Fortes pluies et risque d’inondation sur Abidjan', validite: 'Jusqu’à ce soir 23h' },
  { code: 'LME', nom: 'La Mé', col: 2, row: 3, niveau: 'jaune', phenomene: 'Orages isolés', validite: 'Jusqu’à ce soir 20h' },
  { code: 'BAS', nom: 'Bas-Sassandra', col: 0, row: 4, niveau: 'jaune', phenomene: 'Houle et vent fort en mer', validite: 'Jusqu’à demain 6h' },
  { code: 'SCO', nom: 'Sud-Comoé', col: 2, row: 4, niveau: 'vert', phenomene: 'Aucun', validite: 'Jusqu’à demain 6h' },
]

export type BulletinVigilance = {
  id: string
  date: string
  titre: string
  niveauMax: NiveauVigilance
  resume: string
}

export const historiqueVigilance: BulletinVigilance[] = [
  { id: 'vig-2026-10-13', date: '2026-10-13', titre: 'Bulletin de vigilance météorologique', niveauMax: 'rouge', resume: 'Fortes pluies sur le District d’Abidjan, risque d’inondation localisé.' },
  { id: 'vig-2026-10-11', date: '2026-10-11', titre: 'Bulletin de vigilance météorologique', niveauMax: 'orange', resume: 'Pluies soutenues sur les Montagnes et le Gôh-Djiboua.' },
  { id: 'vig-2026-10-08', date: '2026-10-08', titre: 'Bulletin de vigilance météorologique', niveauMax: 'jaune', resume: 'Orages isolés en zone centre et houle sur le littoral ouest.' },
  { id: 'vig-2026-10-03', date: '2026-10-03', titre: 'Bulletin de vigilance météorologique', niveauMax: 'vert', resume: 'Conditions calmes sur l’ensemble du territoire.' },
]
