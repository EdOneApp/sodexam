export type Ville = {
  slug: string
  nom: string
  region: string
  lat: number
  lon: number
  cotiere: boolean
  population?: string
}

export const villes: Ville[] = [
  { slug: 'abidjan', nom: 'Abidjan', region: 'Lagunes', lat: 5.359, lon: -4.008, cotiere: true, population: '6,3 M' },
  { slug: 'yamoussoukro', nom: 'Yamoussoukro', region: 'Lacs', lat: 6.827, lon: -5.289, cotiere: false, population: '355 k' },
  { slug: 'bouake', nom: 'Bouaké', region: 'Gbêkê', lat: 7.690, lon: -5.030, cotiere: false, population: '640 k' },
  { slug: 'san-pedro', nom: 'San-Pédro', region: 'Bas-Sassandra', lat: 4.747, lon: -6.637, cotiere: true, population: '268 k' },
  { slug: 'korhogo', nom: 'Korhogo', region: 'Savanes', lat: 9.458, lon: -5.629, cotiere: false, population: '280 k' },
  { slug: 'daloa', nom: 'Daloa', region: 'Haut-Sassandra', lat: 6.877, lon: -6.450, cotiere: false, population: '266 k' },
  { slug: 'man', nom: 'Man', region: 'Montagnes', lat: 7.412, lon: -7.554, cotiere: false, population: '195 k' },
  { slug: 'odienne', nom: 'Odienné', region: 'Denguélé', lat: 9.510, lon: -7.565, cotiere: false, population: '55 k' },
  { slug: 'abengourou', nom: 'Abengourou', region: 'Indénié-Djuablin', lat: 6.729, lon: -3.496, cotiere: false, population: '96 k' },
  { slug: 'gagnoa', nom: 'Gagnoa', region: 'Gôh', lat: 6.133, lon: -5.933, cotiere: false, population: '173 k' },
  { slug: 'divo', nom: 'Divo', region: 'Lôh-Djiboua', lat: 5.837, lon: -5.357, cotiere: false, population: '161 k' },
  { slug: 'agboville', nom: 'Agboville', region: 'Agnéby-Tiassa', lat: 5.928, lon: -4.217, cotiere: false, population: '96 k' },
  { slug: 'sassandra', nom: 'Sassandra', region: 'Gbôklé', lat: 4.951, lon: -6.084, cotiere: true, population: '45 k' },
  { slug: 'grand-bassam', nom: 'Grand-Bassam', region: 'Sud-Comoé', lat: 5.212, lon: -3.738, cotiere: true, population: '82 k' },
  { slug: 'dabou', nom: 'Dabou', region: 'Grands-Ponts', lat: 5.327, lon: -4.377, cotiere: true, population: '91 k' },
  { slug: 'kong', nom: 'Kong', region: 'Bounkani', lat: 9.166, lon: -4.633, cotiere: false, population: '18 k' },
  { slug: 'bondoukou', nom: 'Bondoukou', region: 'Gontougo', lat: 8.040, lon: -2.800, cotiere: false, population: '62 k' },
  { slug: 'bouna', nom: 'Bouna', region: 'Bounkani', lat: 9.267, lon: -3.000, cotiere: false, population: '48 k' },
  { slug: 'issia', nom: 'Issia', region: 'Haut-Sassandra', lat: 6.494, lon: -6.586, cotiere: false, population: '70 k' },
  { slug: 'soubre', nom: 'Soubré', region: 'Nawa', lat: 5.785, lon: -6.593, cotiere: false, population: '112 k' },
  { slug: 'grand-lahou', nom: 'Grand-Lahou', region: 'Grands-Ponts', lat: 5.142, lon: -5.024, cotiere: true, population: '35 k' },
  { slug: 'assinie', nom: 'Assinie-Mafia', region: 'Sud-Comoé', lat: 5.123, lon: -3.283, cotiere: true, population: '12 k' },
  { slug: 'tiassale', nom: 'Tiassalé', region: 'Agnéby-Tiassa', lat: 5.898, lon: -4.822, cotiere: false, population: '58 k' },
  { slug: 'adzope', nom: 'Adzopé', region: 'La Mé', lat: 6.107, lon: -3.861, cotiere: false, population: '80 k' },
  { slug: 'seguela', nom: 'Séguéla', region: 'Worodougou', lat: 7.961, lon: -6.674, cotiere: false, population: '68 k' },
  { slug: 'touba', nom: 'Touba', region: 'Bafing', lat: 8.282, lon: -7.683, cotiere: false, population: '45 k' },
  { slug: 'ferkessedougou', nom: 'Ferkessédougou', region: 'Tchologo', lat: 9.600, lon: -5.200, cotiere: false, population: '65 k' },
  { slug: 'dimbokro', nom: 'Dimbokro', region: 'N’Zi', lat: 6.648, lon: -4.705, cotiere: false, population: '50 k' },
  { slug: 'boundiali', nom: 'Boundiali', region: 'Poro', lat: 9.517, lon: -6.483, cotiere: false, population: '50 k' },
  { slug: 'guiglo', nom: 'Guiglo', region: 'Cavally', lat: 6.550, lon: -7.483, cotiere: false, population: '70 k' },
]

export const villesCotieres = villes.filter((v) => v.cotiere)
