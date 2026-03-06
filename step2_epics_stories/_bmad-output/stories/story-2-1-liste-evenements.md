# Story 2.1: Liste des Événements avec Filtrage

## Epic
Epic 2: Gestion d'Événements Core

## Description
As a user,
I want to see a list of all events with filtering by status,
So that I can quickly find and manage my events.

## Acceptance Criteria

**Given** I visit the application homepage
**When** the page loads
**Then** I see a list of all events sorted by date
**And** I see filter options for status: All, Draft, Published, Completed, Cancelled
**And** When I select a status filter, only events matching that status are displayed
**And** The filtering uses Anti-Flash Pattern with keepPreviousData and opacity transition
**And** Each event card shows title, date, status badge, and action buttons
**And** Empty state displays helpful message and "Create Event" call-to-action when no events exist

## Technical Details

### Components à Créer
- `components/events/event-list.tsx` - liste principale
- `components/events/event-card.tsx` - carte individuelle
- `components/events/event-filters.tsx` - filtres status
- `components/events/status-badge.tsx` - badge statut

### Hooks TanStack Query
```typescript
// lib/hooks/use-events.ts
export const useEvents = (status?: EventStatus) => {
  return useQuery({
    queryKey: ['events', status],
    queryFn: () => {
      const filter = status ? `status="${status}"` : ''
      return pb.collection('events').getFullList({ filter, sort: 'date' })
    },
    keepPreviousData: true
  })
}
```

### Anti-Flash Pattern
```typescript
const { data: events, isFetching } = useEvents(selectedStatus)

<div className={cn("transition-opacity", isFetching && "opacity-60")}>
  {isFetching && <Loader2 className="animate-spin" />}
  {/* events list */}
</div>
```

### Status Badge Configuration
```typescript
const statusConfig = {
  draft: { label: 'Brouillon', variant: 'secondary' },
  published: { label: 'Publié', variant: 'default' },
  completed: { label: 'Terminé', variant: 'success' },
  cancelled: { label: 'Annulé', variant: 'destructive' }
}
```

## Files to Create
- `app/page.tsx` - homepage avec liste
- `components/events/event-list.tsx`
- `components/events/event-card.tsx`
- `components/events/event-filters.tsx`
- `components/events/status-badge.tsx`
- `lib/hooks/use-events.ts`

## Estimate
4-5 heures

## Dependencies
Epic 1 complet (Infrastructure)

## Definition of Done
- ✅ Liste d'événements affichée et fonctionnelle
- ✅ Filtrage par status opérationnel
- ✅ Anti-Flash Pattern implémenté
- ✅ Empty state géré
- ✅ Responsive mobile/desktop
- ✅ Performance optimisée