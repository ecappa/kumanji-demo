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

## Definition of Done
- ✅ PocketBase container opérationnel
- ✅ Collection events créée avec bon schéma
- ✅ Client PocketBase configuré
- ✅ Types TypeScript définis
- ✅ Test CRUD basique via Admin UI réussi