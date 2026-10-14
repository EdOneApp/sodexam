export type Actualite = {
  slug: string
  titre: string
  theme: 'Météo' | 'Aéroports' | 'CERMA' | 'Institution' | 'Projet'
  plateforme?: string
  date: string
  resume: string
  tailleGrille: 'sm' | 'md' | 'lg'
}

export const actualites: Actualite[] = [
  {
    slug: 'vigiclimm-radar-abidjan',
    titre: 'VIGICLIMM : le premier radar météorologique d’Abidjan entre en phase de test',
    theme: 'Projet',
    date: '2026-10-09',
    resume: 'Financé par l’AFD à hauteur de 26,6 M€, le projet VIGICLIMM installe le premier radar météo du pays pour renforcer l’alerte précoce.',
    tailleGrille: 'lg',
  },
  {
    slug: 'dg-confirme-conseil-administration',
    titre: 'M. Abdul Adam Sylla confirmé Directeur Général par le Conseil d’administration',
    theme: 'Institution',
    date: '2026-09-28',
    resume: 'Le Conseil d’administration de la SODEXAM a confirmé la nomination du nouveau Directeur Général.',
    tailleGrille: 'md',
  },
  {
    slug: 'aeroport-kong-piste',
    titre: 'Aéroport de Kong : la piste de 1 900 m prend forme',
    theme: 'Aéroports',
    plateforme: 'Kong',
    date: '2026-09-20',
    resume: 'Le chantier de la nouvelle plateforme aéroportuaire de Kong avance, avec un désenclavement attendu pour le Bounkani.',
    tailleGrille: 'md',
  },
  {
    slug: 'certification-iso-meteorologie',
    titre: 'La météorologie ivoirienne reconduit sa certification ISO 9001:2015',
    theme: 'Météo',
    date: '2026-09-02',
    resume: 'La Direction de la Météorologie Nationale confirme son engagement qualité pour la cinquième année.',
    tailleGrille: 'sm',
  },
  {
    slug: 'vigilance-rouge-octobre',
    titre: 'Vigilance rouge : fortes pluies sur le District d’Abidjan',
    theme: 'Météo',
    date: '2026-10-13',
    resume: 'Un bulletin de vigilance rouge a été émis pour fortes pluies et risque d’inondation localisé.',
    tailleGrille: 'sm',
  },
  {
    slug: 'cerma-nouveaux-creneaux',
    titre: 'CERMA : extension des créneaux de visite médicale aéronautique',
    theme: 'CERMA',
    date: '2026-08-25',
    resume: 'Le Centre d’Expertise et de Recherche en Médecine Aéronautique élargit ses horaires de consultation.',
    tailleGrille: 'sm',
  },
  {
    slug: 'bourse-excellence-dominique-ouattara',
    titre: 'Bourse d’excellence Dominique Ouattara : ouverture des candidatures',
    theme: 'Institution',
    date: '2026-08-10',
    resume: 'La campagne 2026-2027 de la bourse d’excellence est ouverte pour les filières aéronautiques et météorologiques.',
    tailleGrille: 'sm',
  },
  {
    slug: 'journee-meteo-mondiale',
    titre: 'Journée météorologique mondiale : sensibilisation dans les écoles d’Abidjan',
    theme: 'Météo',
    date: '2026-07-14',
    resume: 'Des ateliers pédagogiques ont été organisés pour expliquer le rôle de la météorologie aux élèves.',
    tailleGrille: 'md',
  },
]
