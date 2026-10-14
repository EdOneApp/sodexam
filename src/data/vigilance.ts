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

// Districts réels de Côte d'Ivoire (ADM1, geoBoundaries CC-BY 4.0) — la clé
// `district` correspond exactement à la propriété `shapeName` du GeoJSON
// utilisé par la carte de vigilance (src/assets/civ-districts.geojson).
export type ZoneVigilance = {
  district: string
  nom: string
  niveau: NiveauVigilance
  phenomene: string
  validite: string
}

export const zonesVigilance: ZoneVigilance[] = [
  { district: 'District Autonome D\'Abidjan', nom: 'District Autonome d’Abidjan', niveau: 'rouge', phenomene: 'Fortes pluies et risque d’inondation', validite: 'Jusqu’à ce soir 23h' },
  { district: 'Montagnes', nom: 'Montagnes', niveau: 'orange', phenomene: 'Fortes pluies et risque de glissement de terrain', validite: 'Jusqu’à demain 12h' },
  { district: 'Goh-Djiboua', nom: 'Gôh-Djiboua', niveau: 'orange', phenomene: 'Cumuls de pluie importants', validite: 'Jusqu’à demain 12h' },
  { district: 'Lagunes', nom: 'Lagunes', niveau: 'jaune', phenomene: 'Orages isolés', validite: 'Jusqu’à ce soir 20h' },
  { district: 'Bas-Sassandra', nom: 'Bas-Sassandra', niveau: 'jaune', phenomene: 'Houle et vent fort en mer', validite: 'Jusqu’à demain 6h' },
  { district: 'Sassandra-Marahoue', nom: 'Sassandra-Marahoué', niveau: 'jaune', phenomene: 'Orages isolés', validite: 'Jusqu’à ce soir 20h' },
  { district: 'Valle Du Bandama', nom: 'Vallée du Bandama', niveau: 'jaune', phenomene: 'Orages isolés', validite: 'Jusqu’à ce soir 20h' },
  { district: 'Savanes', nom: 'Savanes', niveau: 'jaune', phenomene: 'Harmattan / visibilité réduite', validite: 'Jusqu’à ce soir 18h' },
  { district: 'District Autonome De Yamoussoukro', nom: 'District Autonome de Yamoussoukro', niveau: 'vert', phenomene: 'Aucun', validite: 'Jusqu’à demain 6h' },
  { district: 'Denguele', nom: 'Denguélé', niveau: 'vert', phenomene: 'Aucun', validite: 'Jusqu’à demain 6h' },
  { district: 'Woroba', nom: 'Woroba', niveau: 'vert', phenomene: 'Aucun', validite: 'Jusqu’à demain 6h' },
  { district: 'Zanzan', nom: 'Zanzan', niveau: 'vert', phenomene: 'Aucun', validite: 'Jusqu’à demain 6h' },
  { district: 'Comoe', nom: 'Comoé', niveau: 'vert', phenomene: 'Aucun', validite: 'Jusqu’à demain 6h' },
  { district: 'Lacs', nom: 'Lacs', niveau: 'vert', phenomene: 'Aucun', validite: 'Jusqu’à demain 6h' },
]

export function zoneParDistrict(shapeName: string) {
  return zonesVigilance.find((z) => z.district.toLowerCase() === shapeName.toLowerCase())
}

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
