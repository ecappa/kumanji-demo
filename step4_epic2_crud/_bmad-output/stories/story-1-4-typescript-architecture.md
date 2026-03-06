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

## Definition of Done
- ✅ Structure projet complète créée
- ✅ Types TypeScript de base définis
- ✅ TanStack Query configuré
- ✅ Conventions de nommage respectées
- ✅ Zéro erreur TypeScript
- ✅ Imports/exports fonctionnels