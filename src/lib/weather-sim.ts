import { seededRandom } from './rng'

export type Condition = 'ensoleille' | 'nuageux' | 'pluie' | 'orage' | 'harmattan' | 'nuit-claire'

export const conditionLabel: Record<Condition, string> = {
  ensoleille: 'Ensoleillé',
  nuageux: 'Nuageux',
  pluie: 'Pluie',
  orage: 'Orageux',
  harmattan: 'Harmattan',
  'nuit-claire': 'Nuit claire',
}

const CONDITIONS: Condition[] = ['ensoleille', 'nuageux', 'pluie', 'orage', 'harmattan']

export type HeureMeteo = {
  heure: string
  tempC: number
  condition: Condition
  pluieMm: number
  ventKmh: number
}

export type JourMeteo = {
  date: string
  jour: string
  tempMin: number
  tempMax: number
  condition: Condition
  pluieMm: number
  ventKmh: number
}

export type MeteoActuelle = {
  tempC: number
  ressenti: number
  condition: Condition
  humidite: number
  ventKmh: number
  uv: number
  leverSoleil: string
  coucherSoleil: string
}

function dayKey(d = new Date()) {
  return d.toISOString().slice(0, 10)
}

export function meteoActuelle(villeSlug: string, baseTemp = 29): MeteoActuelle {
  const rand = seededRandom(`${villeSlug}-${dayKey()}-now`)
  const tempC = Math.round(baseTemp - 4 + rand() * 8)
  const condition = CONDITIONS[Math.floor(rand() * CONDITIONS.length)]
  return {
    tempC,
    ressenti: tempC + Math.round(rand() * 3),
    condition,
    humidite: Math.round(55 + rand() * 35),
    ventKmh: Math.round(5 + rand() * 25),
    uv: Math.round(2 + rand() * 9),
    leverSoleil: '06:12',
    coucherSoleil: '18:24',
  }
}

export function previsionsHoraires(villeSlug: string, baseTemp = 29): HeureMeteo[] {
  const out: HeureMeteo[] = []
  for (let h = 0; h < 48; h++) {
    const rand = seededRandom(`${villeSlug}-${dayKey()}-h${h}`)
    const hourOfDay = h % 24
    const nightDip = hourOfDay < 6 || hourOfDay > 19 ? -4 : 0
    const tempC = Math.round(baseTemp + nightDip - 2 + rand() * 6)
    const condition = hourOfDay < 5 || hourOfDay > 20 ? 'nuit-claire' : CONDITIONS[Math.floor(rand() * CONDITIONS.length)]
    out.push({
      heure: `${String(hourOfDay).padStart(2, '0')}h`,
      tempC,
      condition,
      pluieMm: condition === 'pluie' || condition === 'orage' ? Math.round(rand() * 20) : 0,
      ventKmh: Math.round(5 + rand() * 20),
    })
  }
  return out
}

const JOURS = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']

export function previsions7Jours(villeSlug: string, baseTemp = 29): JourMeteo[] {
  const out: JourMeteo[] = []
  const today = new Date()
  for (let i = 0; i < 7; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    const key = `${villeSlug}-${dayKey(d)}-day`
    const rand = seededRandom(key)
    const condition = CONDITIONS[Math.floor(rand() * CONDITIONS.length)]
    const tempMin = Math.round(baseTemp - 6 + rand() * 4)
    const tempMax = Math.round(baseTemp + rand() * 6)
    out.push({
      date: d.toISOString().slice(0, 10),
      jour: i === 0 ? 'Aujourd’hui' : JOURS[d.getDay()],
      tempMin,
      tempMax,
      condition,
      pluieMm: condition === 'pluie' || condition === 'orage' ? Math.round(rand() * 35) : 0,
      ventKmh: Math.round(8 + rand() * 20),
    })
  }
  return out
}

export type MeteoMarine = {
  houleM: number
  periodeS: number
  ventKmh: number
  mareeHaute: string
  mareeBasse: string
}

export function meteoMarine(villeSlug: string): MeteoMarine {
  const rand = seededRandom(`${villeSlug}-${dayKey()}-marine`)
  return {
    houleM: Math.round((0.6 + rand() * 1.8) * 10) / 10,
    periodeS: Math.round(6 + rand() * 6),
    ventKmh: Math.round(10 + rand() * 25),
    mareeHaute: `${String(5 + Math.floor(rand() * 3)).padStart(2, '0')}:${rand() > 0.5 ? '20' : '45'}`,
    mareeBasse: `${String(11 + Math.floor(rand() * 3)).padStart(2, '0')}:${rand() > 0.5 ? '10' : '35'}`,
  }
}

export type MetarFactice = {
  code: string
  brut: string
  decode: string[]
}

export function metarFactice(codeOaci: string): MetarFactice {
  const rand = seededRandom(`${codeOaci}-${dayKey()}-metar`)
  const vent = String(Math.round(rand() * 350)).padStart(3, '0')
  const vitesse = String(Math.round(5 + rand() * 15)).padStart(2, '0')
  const visibilite = Math.round(6 + rand() * 4)
  const temp = Math.round(24 + rand() * 8)
  const dew = temp - Math.round(rand() * 6)
  const qnh = Math.round(1008 + rand() * 10)
  const heure = `${String(new Date().getUTCHours()).padStart(2, '0')}${String(new Date().getUTCMinutes()).padStart(2, '0')}Z`
  const brut = `${codeOaci} ${heure} ${vent}${vitesse}KT ${visibilite}0KM FEW030 ${temp}/${dew} Q${qnh} NOSIG`
  return {
    code: codeOaci,
    brut,
    decode: [
      `Vent : ${vent}° à ${vitesse} kt`,
      `Visibilité : ${visibilite}0 km`,
      `Nébulosité : peu nombreux nuages à 3000 ft`,
      `Température / point de rosée : ${temp}°C / ${dew}°C`,
      `Pression (QNH) : ${qnh} hPa`,
      `Évolution : pas de changement significatif attendu (NOSIG)`,
    ],
  }
}
