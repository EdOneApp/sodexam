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

## Choix de substitution assumés

Le cahier des charges prévoit un vrai shooting photo/vidéo/drone, des données
VIGICLIMM réelles, un vrai service SMS/WhatsApp, un paiement Mobile Money et un
assistant IA — aucun de ces éléments n'existe dans cette vitrine :

- Photos/vidéos → dégradés, illustrations SVG et emojis stylisés.
- Données météo, vols, vigilance, rendez-vous CERMA → générées de façon déterministe
  (`src/lib/weather-sim.ts`, `src/lib/rng.ts`) à partir de la date du jour.
- Carte de vigilance par région → grille schématique illustrative, pas une vraie
  carte géographique (`src/pages/Vigilance.tsx`).
- Assistant « IA » → moteur de règles mots-clés (`src/lib/chatbot.ts`).
- Connexion back-office / espace CERMA → authentification simulée côté client avec
  identifiants affichés en clair (`src/lib/auth-sim.ts`), stockée en `localStorage`.
