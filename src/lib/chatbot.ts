// Assistant FAQ à base de règles — démo, aucun appel à un vrai modèle d'IA.
type Regle = { motsCles: string[]; reponse: string }

const regles: Regle[] = [
  { motsCles: ['bonjour', 'salut', 'bonsoir'], reponse: 'Bonjour ! Je suis l’assistant de démonstration SODEXAM. Posez-moi une question sur la météo, la vigilance, le CERMA ou nos aéroports.' },
  { motsCles: ['pluie', 'meteo', 'météo', 'temps'], reponse: 'Vous trouverez les prévisions détaillées par ville sur la page Météo, avec l’actuel, les 48 prochaines heures et les 7 prochains jours.' },
  { motsCles: ['vigilance', 'alerte', 'danger'], reponse: 'Le niveau de vigilance national est affiché en bandeau en haut du site. Consultez la page Vigilance pour la carte par région et les conseils de comportement.' },
  { motsCles: ['cerma', 'visite medicale', 'médicale', 'rendez-vous', 'rdv'], reponse: 'Le CERMA propose des visites médicales d’aptitude (classes 1, 2 et 3). Vous pouvez prendre rendez-vous en ligne depuis la page CERMA.' },
  { motsCles: ['aeroport', 'aéroport', 'vol', 'avion'], reponse: 'Retrouvez toutes nos plateformes aéroportuaires avec leurs informations sur la page Nos aéroports, et les fiches détaillées pour chaque aérodrome.' },
  { motsCles: ['horaire', 'ouverture', 'contact', 'telephone', 'téléphone'], reponse: 'Nos coordonnées et horaires sont disponibles sur la page Contact. Le siège se trouve à Abidjan.' },
  { motsCles: ['emploi', 'carriere', 'carrière', 'recrutement', 'offre'], reponse: 'Les offres d’emploi et bourses sont publiées sur la page Carrières, avec candidature en ligne.' },
  { motsCles: ['harmattan'], reponse: 'L’harmattan est un vent sec et poussiéreux soufflant du Sahara, fréquent de novembre à mars, réduisant souvent la visibilité.' },
]

const reponseParDefaut =
  'Je suis un assistant de démonstration à réponses pré-écrites. Essayez des mots comme « météo », « vigilance », « CERMA » ou « aéroport ».'

export function repondre(message: string): string {
  const texte = message.toLowerCase()
  for (const regle of regles) {
    if (regle.motsCles.some((m) => texte.includes(m))) return regle.reponse
  }
  return reponseParDefaut
}
