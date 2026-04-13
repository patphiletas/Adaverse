[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/zZZEmCAB)

# Adaverse

🔗 [adaverse-one.vercel.app](https://adaverse-one.vercel.app/)

Plateforme de visualisation des projets réalisés par les apprenants d'Ada Tech School. Les projets sont classés par catégorie (projet Ada), par promotion ou par contributeur.

## Stack technique

| Élément | Technologie |
|---|---|
| Framework | Next.js 16 (App Router) |
| CSS | Tailwind CSS 4 |
| ORM | Drizzle ORM |
| Base de données | PostgreSQL (Neon) |
| Langage | TypeScript |

## Fonctionnalités

- Affichage des projets publiés groupés par projet Ada, promotion ou contributeur
- Proposition d'un projet via un formulaire (popup)
- Auto-remplissage des contributeurs depuis l'API GitHub
- Modification d'un projet existant depuis sa fiche
- Header sticky avec navigation et filtres
- Page de détail avec liens vers la démo et le code source

## Installation

```bash
npm install
```

Créer un fichier `.env` à la racine :

```env
DATABASE_URL=postgresql://...
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
│   │   ├── ada-projects/     # GET liste des projets Ada
│   │   ├── promotions/       # GET liste des promotions
│   │   └── projects/
│   │       ├── route.ts      # GET projets publiés / POST nouveau projet
│   │       └── [id]/route.ts # PATCH modification d'un projet
│   ├── projects/[slug]/      # Page de détail
│   ├── layout.js             # Header + footer permanents
│   └── page.js               # Page d'accueil avec filtres
├── components/
│   ├── ProposalDialog.js     # Formulaire de proposition
│   ├── EditDialog.js         # Formulaire de modification
│   ├── NavFilters.js         # Liens de filtre dans le header
│   └── project-image.js      # Image avec fallback
└── db/
    └── schema.ts             # Schéma Drizzle (3 tables)
```

## Base de données

Trois tables :

- **ada_projects** — les projets du programme Ada (ex : Ada Quiz, Adaopte…)
- **promotions** — les promotions d'apprenants
- **student_projects** — les projets réalisés par les apprenants, avec slug, liens GitHub/démo, contributeurs, dates de création et de publication

Un projet n'apparaît sur l'accueil que si sa `publishedAt` est renseignée.
