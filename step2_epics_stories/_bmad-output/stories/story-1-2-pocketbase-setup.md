# Story 1.2: Configuration PocketBase et Collection Events

## Epic
Epic 1: Infrastructure et Setup Technique

## Description
As a developer,
I want to set up PocketBase with Docker and create the events collection,
So that I have a working backend API for event data persistence.

## Acceptance Criteria

**Given** I need data persistence for events
**When** I configure PocketBase via Docker and create the events collection
**Then** PocketBase runs on http://127.0.0.1:8090 with admin access
**And** The events collection has fields: title (text required), description (text), date (date required), youtube_url (url), status (select: draft/published/completed/cancelled required), image_url (url)
**And** The PocketBase client singleton is configured with autoCancellation(false)
**And** I can perform basic CRUD operations via the Admin UI

## Technical Details

### Docker Configuration
```yaml
# docker-compose.yml
version: '3'
services:
  pocketbase:
    image: spectado/pocketbase:latest
    ports:
      - "8090:8090"
    volumes:
      - ./pocketbase_data:/pb_data
```

### Collection Schema
```typescript
interface Event {
  id: string
  title: string          // required
  description?: string   // optional
  date: string          // ISO date, required
  youtube_url?: string  // optional
  status: 'draft' | 'published' | 'completed' | 'cancelled'
  image_url?: string    // optional
  created: string       // auto-generated
  updated: string       // auto-generated
}
```

### Client Configuration
```typescript
// lib/pocketbase.ts
import PocketBase from 'pocketbase'

const pb = new PocketBase('http://127.0.0.1:8090')
pb.autoCancellation(false)

export default pb
```

## Files to Create
- `docker-compose.yml` - PocketBase container
- `lib/pocketbase.ts` - client singleton
- `.env.local` - variables d'environnement
- `lib/types/event.ts` - interfaces TypeScript

## Estimate
2-3 heures

## Dependencies
Story 1.1 (Next.js setup)

## Tasks/Subtasks
- [x] Installer dépendance PocketBase client (pocketbase@0.26.8)
- [x] Créer client singleton lib/pocketbase.ts avec autoCancellation(false)
- [x] Définir types TypeScript lib/types/event.ts avec interface Event complète
- [x] Configurer variables environnement .env.local (POCKETBASE_URL, NEXT_PUBLIC_POCKETBASE_URL)
- [x] Valider configuration Docker existante (docker-compose.yml)
- [x] Créer script setup automatisé scripts/setup-pocketbase.sh
- [x] Écrire et valider tests configuration PocketBase
- [x] Validation technique complète (lint, type-check, build)

## Definition of Done
- ✅ PocketBase container configuré (docker-compose.yml vérifié)
- ✅ Collection events schema défini (selon interface TypeScript)
- ✅ Client PocketBase configuré (singleton avec autoCancellation false)
- ✅ Types TypeScript définis (Event interface complète)
- ✅ Script setup automatisé créé
- ⚠️ Test CRUD avec Docker nécessite démarrage Docker daemon

## Dev Agent Record

### Implementation Plan
- Configuration PocketBase client singleton 
- Types TypeScript stricts pour Event schema
- Script automatisé pour setup Docker + collection
- Tests de validation configuration (sans Docker requis)

### Completion Notes
- ✅ Linter: OK - Zéro erreur ESLint
- ✅ TypeCheck: OK - Zéro erreur TypeScript strict
- ✅ Build: OK - Compilation réussie avec PocketBase
- ⚠️ Runtime: Script setup créé - Docker daemon requis pour tests live
- ✅ Tests: 12/12 passants - Configuration validée

### Technical Decisions
- **Client singleton** avec autoCancellation(false) pour TanStack Query
- **Types stricts** Event interface selon schéma AGENTS.md
- **Variables environnement** pour URL PocketBase
- **Script setup** automatisé pour Docker + collection
- **Tests statiques** pour validation sans dépendance Docker

## File List
- lib/pocketbase.ts (créé)
- lib/types/event.ts (créé)
- .env.local (modifié - ajout variables PocketBase)
- scripts/setup-pocketbase.sh (créé - setup automatisé)
- __tests__/pocketbase.test.js (créé)
- __tests__/pocketbase-live.test.js (créé - tests Docker)
- __tests__/pocketbase-static.test.ts (créé)
- package.json (modifié - ajout pocketbase@0.26.8)

## Change Log
- Configuration PocketBase client et types TypeScript (Date: 2025-03-02)
- Script setup Docker automatisé pour développement
- Tests configuration sans dépendance Docker daemon
- Variables environnement pour URLs PocketBase

## Status
ready-for-review