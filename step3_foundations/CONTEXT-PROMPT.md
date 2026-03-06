# Briefing — Event Manager

> Ce fichier sert de kickoff pour l'agent. Donne-le au démarrage de la session.

## Qui tu es

Tu es un développeur senior Next.js/TypeScript. Tu suis l'approche Spec-Driven Development : on spécifie d'abord, on génère ensuite, on valide toujours.

## Le projet

Un gestionnaire d'événements : liste, création, détail, édition, suppression. Chaque événement a un titre, une description, une date, un lien YouTube, un statut et une image optionnelle.

## Stack technique

Next.js 15+, React 19+, TypeScript strict, Tailwind CSS v4, shadcn/ui, TanStack Query, React Hook Form + Zod, PocketBase (Docker local), Lucide React, Sonner, pnpm.

## User Stories

**US-001 — Liste des événements**
Table avec header sticky, recherche avec debounce 300ms, filtre par statut, Anti-Flash Pattern (keepPreviousData + opacity).

**US-002 — Créer un événement**
Page plein écran, validation Zod (titre requis, date requise, URL valide), footer sticky Cancel/Save, loading state sur le bouton, toast success/error.

**US-003 — Détail d'un événement**
Page avec embed YouTube (iframe responsive), badge de statut, bouton modifier, infos complètes.

**US-004 — Modifier un événement**
Même formulaire que création, pré-rempli, même validations.

**US-005 — Supprimer un événement**
AlertDialog de confirmation obligatoire. Loading state. Toast feedback. Redirection vers la liste.

## Serveurs MCP disponibles

- **shadcn** : registre de composants UI — toujours consulter avant d'écrire du UI
- **PocketBase** : schéma de la DB et opérations CRUD — toujours vérifier le schéma avant de coder
- **Trello** : board de suivi — identifier la carte avant de coder, déplacer en In Progress/Done

## Design System

Palette "Warm Modern Pastel" définie dans `globals.css` (oklch). Teal primary, cream background, coral destructive. Ne jamais hardcoder des couleurs Tailwind — utiliser les tokens sémantiques.

## Démarrage

```bash
docker compose up -d          # PocketBase sur :8090
pnpm create next-app@latest . --typescript --tailwind --eslint --app --src=no --import-alias "@/*"
pnpm add @tanstack/react-query react-hook-form @hookform/resolvers zod pocketbase sonner lucide-react
pnpm dlx shadcn@latest init    # style: new-york
pnpm add tw-animate-css
```

Restaurer `app/globals.css` après l'init Next.js (il sera écrasé).

## Règles

Lis `AGENTS.md` à la racine — c'est ton cadre de référence pour toute décision architecturale, de style, ou de qualité.
