# SODEXAM — Du ciel à la piste

Vitrine de démonstration pour la refonte du site SODEXAM (météo, vigilance, aéroports,
CERMA, actualités, carrières…), construite à partir du cahier des charges du 14 octobre 2026.

**⚠️ Ceci est un site de démonstration, sans backend.** Toutes les données affichées
(météo, vigilance, vols, rendez-vous, actualités, comptes utilisateurs) sont **fictives**,
générées côté client de manière déterministe. Les identifiants de connexion sont
volontairement affichés sur la page `/login`. Rien ici ne provient des systèmes réels
VIGICLIMM / DMN de la SODEXAM.

## Stack

- [Vite](https://vite.dev) + React 19 + TypeScript
- Tailwind CSS v4
- React Router, react-i18next (FR/EN)
- Framer Motion, GSAP/ScrollTrigger, Lenis (smooth scroll)
- React Three Fiber (globe 3D, avec repli automatique si WebGL indisponible)
- MapLibre GL (cartes, tuiles [OpenFreeMap](https://openfreemap.org), sans clé API)
- `vite-plugin-pwa` (installable, cache hors-ligne de la dernière prévision)

## Développement

```bash
npm install
npm run dev      # serveur de développement
npm run build    # build de production dans dist/
npm run preview  # prévisualiser le build
```

## Déploiement

Le site est statique (aucun backend) et se déploie sur **GitHub Pages** via
`.github/workflows/deploy.yml` à chaque push sur `main`. Le fichier `public/CNAME`
pointe vers `sodexam.myoctogone.com` — un administrateur du domaine `myoctogone.com`
doit créer un enregistrement DNS CNAME `sodexam` → `<org>.github.io` pour que le
domaine personnalisé fonctionne (voir Pages → Settings du dépôt GitHub).

## Assets réels utilisés

- **Logo** : récupéré directement sur sodexam.com (`src/assets/sodexam-logo.png`).
- **Photos** : 6 photos réelles des plateformes SODEXAM (aérogares de Yamoussoukro et
  San-Pédro, station météo, CERMA, journée de sensibilisation à Korhogo), récupérées sur
  sodexam.com et recompressées pour le web (`src/assets/photos/`).
- **Carte de vigilance** : limites réelles des 14 districts de Côte d'Ivoire
  (`src/assets/civ-districts.geojson`, geoBoundaries CC BY 4.0 — World Bank Group / OCHA
  Côte d'Ivoire), affichées avec MapLibre GL dans `src/components/VigilanceMap.tsx`.
- **Carte des aéroports** : MapLibre GL + tuiles vectorielles réelles OpenFreeMap.

Les cartes nécessitent WebGL ; sur un appareil ou navigateur sans WebGL (rare), elles
basculent automatiquement sur un message de repli plutôt que de faire planter la page
(`src/components/MapBoundary.tsx`).

## Choix de substitution assumés

Le cahier des charges prévoit un vrai tournage vidéo drone, des données VIGICLIMM
réelles, un vrai service SMS/WhatsApp, un paiement Mobile Money et un assistant IA —
aucun de ces éléments n'existe dans cette vitrine :

- Vidéo manifeste du hero → photo réelle (pas de tournage possible ici).
- Données météo, vols, vigilance, rendez-vous CERMA → générées de façon déterministe
  (`src/lib/weather-sim.ts`, `src/lib/rng.ts`) à partir de la date du jour.
- Niveaux de vigilance par district → assignés arbitrairement pour la démo (la
  géographie des districts, elle, est réelle).
- Assistant « IA » → moteur de règles mots-clés (`src/lib/chatbot.ts`).
- Connexion back-office / espace CERMA → authentification simulée côté client avec
  identifiants affichés en clair (`src/lib/auth-sim.ts`), stockée en `localStorage`.
- Citation attribuée au DG sur `/mot-du-dg` → rédigée pour la démo et explicitement
  signalée comme telle (nom et fonction réels, propos fictifs).
