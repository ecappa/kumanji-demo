# Story 1.4: Architecture TypeScript et Structure Projet

## Epic
Epic 1: Infrastructure et Setup Technique

## Description
As a developer,
I want to establish the TypeScript architecture and project structure,
So that I have organized, type-safe foundations for building components and features.

## Acceptance Criteria

**Given** I need organized project structure with TypeScript
**When** I create the folder structure and base TypeScript types
**Then** The project follows the structure: app/, components/events/, components/layout/, components/ui/, lib/types/, lib/hooks/
**And** Base TypeScript interfaces are defined: Event, EventStatus in lib/types/
**And** PocketBase client singleton is created in lib/pocketbase.ts
**And** TanStack Query is configured for data fetching
**And** All files follow naming conventions: kebab-case files, PascalCase components

## Technical Details

### Project Structure
```
app/                    # Pages Next.js App Router
components/
  ├── events/          # Composants métier business
  ├── layout/          # Layout (header, nav)
  └── ui/              # shadcn/ui (généré automatiquement)
lib/
  ├── types/           # Interfaces TypeScript
  ├── hooks/           # Hooks React (use-*.ts)
  ├── pocketbase.ts    # Client singleton PocketBase
  └── utils.ts         # Utilitaires
```

### Base Types
```typescript
// lib/types/event.ts
export type EventStatus = 'draft' | 'published' | 'completed' | 'cancelled'

export interface Event {
  id: string
  title: string
  description?: string
  date: string
  youtube_url?: string
  status: EventStatus
  image_url?: string
  created: string
  updated: string
}

// lib/types/index.ts
export * from './event'
```

### TanStack Query Setup
```typescript
// lib/providers/query-provider.tsx
'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
```

### Naming Conventions
- Fichiers: kebab-case (`event-list.tsx`, `use-events.ts`)
- Composants/Types: PascalCase (`EventCard`, `EventStatus`)
- Constantes: UPPER_SNAKE_CASE
- Hooks: préfixe `use-` (`use-events.ts`, `use-debounce.ts`)

## Files to Create
- Structure de dossiers complète
- `lib/types/event.ts` - types Event
- `lib/types/index.ts` - exports centralisés  
- `lib/providers/query-provider.tsx` - TanStack Query
- `app/layout.tsx` - layout racine avec providers
- Base hooks et utilitaires

## Estimate
2-3 heures

## Dependencies
- Story 1.1 (Next.js setup)
- Story 1.2 (PocketBase setup)

## Tasks/Subtasks
- [x] Installer TanStack Query (@tanstack/react-query@5.90.21)
- [x] Créer structure lib/providers/ avec QueryProvider
- [x] Configurer QueryProvider avec options optimisées pour PocketBase
- [x] Mettre à jour Event types avec EventStatus type dédié
- [x] Créer lib/types/index.ts pour exports centralisés
- [x] Intégrer QueryProvider dans app/layout.tsx
- [x] Créer hook de base use-events avec CRUD operations
- [x] Valider conventions de nommage (kebab-case, PascalCase)
- [x] Écrire et valider tests architecture complète
- [x] Validation technique complète (lint, type-check, build, runtime)

## Definition of Done
- ✅ Structure projet complète créée selon AGENTS.md
- ✅ Types TypeScript de base définis (Event, EventStatus)
- ✅ TanStack Query configuré avec providers
- ✅ Conventions de nommage respectées (9/9 tests)
- ✅ Zéro erreur TypeScript (avec type guards)
- ✅ Imports/exports fonctionnels avec barrel exports

## Dev Agent Record

### Implementation Plan
- Structure TypeScript organisée selon AGENTS.md
- TanStack Query intégré pour data fetching
- Types Event avec EventStatus pour type safety
- Hooks CRUD de base pour foundation
- Providers pattern pour état global

### Completion Notes
- ✅ Linter: OK - Zéro erreur ESLint
- ✅ TypeCheck: OK - Zéro erreur TypeScript strict
- ✅ Build: OK - Compilation réussie avec TanStack Query
- ✅ Runtime: OK - Application accessible HTTP 200
- ✅ Tests: 9/9 passants - Architecture complète validée

### Technical Decisions
- **TanStack Query v5** pour data fetching moderne
- **QueryProvider client-side** avec options optimisées PocketBase
- **Type guards** `as unknown as Event` pour compatibilité PocketBase
- **Barrel exports** dans lib/types/index.ts pour imports propres
- **Hooks CRUD** de base pour foundation événements

## File List
- lib/providers/ (créé - QueryProvider)
- lib/providers/query-provider.tsx (créé)
- lib/types/event.ts (modifié - ajout EventStatus type)
- lib/types/index.ts (créé - barrel exports)
- lib/hooks/use-events.ts (créé - CRUD hooks)
- app/layout.tsx (modifié - intégration QueryProvider)
- __tests__/typescript-architecture.test.js (créé)
- package.json (modifié - TanStack Query)

## Change Log
- Architecture TypeScript complète selon AGENTS.md (Date: 2025-03-02)
- TanStack Query intégré pour data fetching moderne
- Hooks CRUD de base pour événements PocketBase
- Types stricts avec EventStatus dédié

## Status
ready-for-review