export type StatutAeroport = 'service' | 'travaux' | 'projet'

export type Aeroport = {
  code: string
  codeIata: string
  nom: string
  ville: string
  lat: number
  lon: number
  statut: StatutAeroport
  pisteLongueurM: number
  pisteRevetement: string
  compagnies: string[]
  services: string[]
  description: string
  avancement?: number
}

export const aeroports: Aeroport[] = [
  {
    code: 'DIAP',
    codeIata: 'ABJ',
    nom: 'Aéroport International Félix Houphouët-Boigny',
    ville: 'Abidjan',
    lat: 5.261,
    lon: -3.927,
    statut: 'service',
    pisteLongueurM: 3050,
    pisteRevetement: 'Bitumineux',
    compagnies: ['Air Côte d’Ivoire', 'Air France', 'Brussels Airlines', 'Ethiopian Airlines', 'Turkish Airlines', 'Royal Air Maroc'],
    services: ['Salon VIP', 'Zone cargo', 'Parkings longue durée', 'Change & banques', 'Restauration'],
    description:
      'Hub aéroportuaire national, porte d’entrée internationale de la Côte d’Ivoire, en modernisation continue.',
  },
  {
    code: 'DIYO',
    codeIata: 'ASK',
    nom: 'Aéroport de Yamoussoukro',
    ville: 'Yamoussoukro',
    lat: 6.903,
    lon: -5.365,
    statut: 'service',
    pisteLongueurM: 2900,
    pisteRevetement: 'Bitumineux',
    compagnies: ['Air Côte d’Ivoire'],
    services: ['Zone VIP présidentielle', 'Vols domestiques'],
    description: 'Dessert la capitale politique et les institutions nationales.',
  },
  {
    code: 'DIBK',
    codeIata: 'BYK',
    nom: 'Aéroport de Bouaké',
    ville: 'Bouaké',
    lat: 7.737,
    lon: -5.074,
    statut: 'service',
    pisteLongueurM: 2400,
    pisteRevetement: 'Bitumineux',
    compagnies: ['Air Côte d’Ivoire'],
    services: ['Vols domestiques', 'Fret agricole'],
    description: 'Deuxième plus grande ville du pays, carrefour économique du centre.',
  },
  {
    code: 'DISP',
    codeIata: 'ZSS',
    nom: 'Aéroport de San-Pédro',
    ville: 'San-Pédro',
    lat: 4.750,
    lon: -6.667,
    statut: 'service',
    pisteLongueurM: 2150,
    pisteRevetement: 'Bitumineux',
    compagnies: ['Air Côte d’Ivoire'],
    services: ['Proximité port autonome', 'Fret cacao et bois'],
    description: 'Dessert le deuxième port du pays et la région du Bas-Sassandra.',
  },
  {
    code: 'DIKO',
    codeIata: 'HGO',
    nom: 'Aéroport de Korhogo',
    ville: 'Korhogo',
    lat: 9.411,
    lon: -5.616,
    statut: 'service',
    pisteLongueurM: 2300,
    pisteRevetement: 'Bitumineux',
    compagnies: ['Air Côte d’Ivoire'],
    services: ['Vols domestiques', 'Hub du nord'],
    description: 'Principale porte aérienne du nord de la Côte d’Ivoire.',
  },
  {
    code: 'DIKG',
    codeIata: 'KGN',
    nom: 'Aéroport de Kong',
    ville: 'Kong',
    lat: 9.166,
    lon: -4.633,
    statut: 'projet',
    pisteLongueurM: 1900,
    pisteRevetement: 'Bitumineux (en construction)',
    compagnies: [],
    services: ['Projet de désenclavement du Bounkani'],
    description: 'Nouvelle plateforme avec piste de 1 900 m, projet phare de désenclavement du nord-est.',
    avancement: 65,
  },
  {
    code: 'DIMN',
    codeIata: 'MJC',
    nom: 'Aéroport de Man',
    ville: 'Man',
    lat: 7.273,
    lon: -7.597,
    statut: 'travaux',
    pisteLongueurM: 1800,
    pisteRevetement: 'Bitumineux (réhabilitation)',
    compagnies: [],
    services: ['Réhabilitation en cours'],
    description: 'Plateforme de la région des Montagnes en cours de réhabilitation.',
    avancement: 40,
  },
  {
    code: 'DIOD',
    codeIata: 'KEO',
    nom: 'Aéroport d’Odienné',
    ville: 'Odienné',
    lat: 9.499,
    lon: -7.590,
    statut: 'travaux',
    pisteLongueurM: 1700,
    pisteRevetement: 'Latérite stabilisée',
    compagnies: [],
    services: ['Modernisation programmée'],
    description: 'Plateforme du Denguélé, frontalière du Mali et de la Guinée.',
    avancement: 20,
  },
]

export function getAeroport(code: string) {
  return aeroports.find((a) => a.code.toLowerCase() === code.toLowerCase())
}
