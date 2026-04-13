[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/zZZEmCAB)

# Adaverse

🔗 [adaverse-one.vercel.app](https://adaverse-one.vercel.app/)

Plateforme de visualisation des projets réalisés par les apprenants d'Ada Tech School. Les projets sont classés par catégorie (projet Ada), par promotion ou par contributeur.

## Stack technique

| Élément | Technologie |
|---|---|
| Framework | Next.js (App Router) |
| CSS | Tailwind CSS v4 |
| ORM | Drizzle ORM |
| Base de données | PostgreSQL (Neon) |
| Langage | TypeScript |
| Déploiement | Vercel |

## Fonctionnalités

- Affichage des projets publiés groupés par projet Ada, promotion ou contributeur
- Proposition d'un projet via un formulaire (popup)
- Auto-remplissage des contributeurs depuis l'API GitHub
- Modification d'un projet existant depuis sa fiche
- Publication d'un projet (passe de non publié à publié)
- Suppression d'un projet protégée par mot de passe
- Mode sombre avec persistance (localStorage), sans flash au chargement
- Header sticky avec navigation et filtres actifs
- Page de détail avec liens vers la démo et le code source
- Gestion des erreurs (Error Boundaries) si la BDD est indisponible

## Installation

```bash
npm install
```

Créer un fichier `.env` à la racine :

```env
DATABASE_URL=postgresql://...
DELETE_PASSWORD=votremotdepasse
```

Appliquer le schéma en base :

```bash
npx drizzle-kit migrate
```

Lancer le serveur de développement :

```bash
npm run dev
```

## Structure

```
src/
├── app/
│   ├── api/
│   │   ├── ada-projects/route.ts       # GET liste des projets Ada
│   │   ├── promotions/route.ts         # GET liste des promotions
│   │   └── projects/
│   │       ├── route.ts                # GET projets publiés / POST nouveau projet
│   │       └── [id]/
│   │           ├── route.ts            # PATCH modification / DELETE suppression
│   │           └── publish/route.ts    # POST publication d'un projet
│   ├── projects/
│   │   └── [slug]/
│   │       ├── page.tsx                # Page de détail d'un projet
│   │       └── error.tsx              # Error boundary pour la page de détail
│   ├── error.tsx                       # Error boundary global
│   ├── layout.tsx                      # Header + footer permanents
│   └── page.tsx                        # Page d'accueil avec filtres
├── components/
│   ├── ProjectForm.tsx                 # Formulaire partagé (proposition + édition)
│   ├── ProposalDialog.tsx              # Popup proposition d'un projet
│   ├── EditDialog.tsx                  # Popup modification d'un projet
│   ├── PublishButton.tsx               # Bouton de publication
│   ├── DeleteButton.tsx                # Bouton de suppression (protégé par mot de passe)
│   ├── NavFilters.tsx                  # Liens de filtre dans le header
│   ├── ThemeToggle.tsx                 # Bascule mode clair / sombre
│   └── project-image.tsx              # Image avec fallback
├── db/
│   └── schema.ts                       # Schéma Drizzle (3 tables)
├── lib/
│   ├── db.ts                           # Instance Drizzle
│   └── project-images.ts              # Utilitaires images
└── types/
    └── index.ts                        # Types TypeScript partagés
```

## Base de données

Trois tables :

- **ada_projects** — les projets du programme Ada (Ada Quiz, Adaopte, Adaverse…)
- **promotions** — les promotions d'apprenants (Grace, Frida)
- **student_projects** — les projets réalisés, avec slug, liens GitHub/démo, contributeurs, dates de création et de publication

Un projet n'apparaît sur l'accueil que si sa colonne `publishedAt` est renseignée.

## Seeds

Les données initiales se trouvent dans `drizzle/seeds/` :

```
drizzle/seeds/
├── promotions.sql        # Promotions Grace et Frida
├── seed.sql              # Projets de la promotion Grace (38 projets)
└── seed_frida.sql        # Projets de la promotion Frida (33 projets)
```

À exécuter dans Neon > SQL Editor dans l'ordre : `promotions.sql` → `seed.sql` → `seed_frida.sql`.

## Scripts

```
scripts/
└── fetch-contributors-frida.mjs   # Récupère les contributeurs GitHub pour les projets Frida
```

```bash
node scripts/fetch-contributors-frida.mjs
```
