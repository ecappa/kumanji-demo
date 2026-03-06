# Story 2.2: Création d'Événement avec Formulaire

## Epic
Epic 2: Gestion d'Événements Core

## Description
As a user,
I want to create a new event with all required and optional fields,
So that I can organize information about upcoming activities.

## Acceptance Criteria

**Given** I want to create a new event
**When** I click "Create Event" button
**Then** I navigate to a full-screen form page (app/events/create)
**And** I see required fields (title, date) and optional fields (description, YouTube URL, image URL, status)
**And** Form validation uses React Hook Form + Zod schema
**And** When I fill required fields with valid data and click Save, the event is created
**And** I see success toast confirmation and return to event list
**And** When I leave required fields empty and click Save, I see clear validation errors
**And** I can cancel and return to list without saving

## Technical Details

### Zod Schema
```typescript
// lib/validations/event-schema.ts
const eventSchema = z.object({
  title: z.string().min(1, "Titre requis"),
  description: z.string().optional(),
  date: z.string().min(1, "Date requise"),
  youtube_url: z.string().url("URL invalide").optional().or(z.literal("")),
  status: z.enum(['draft', 'published', 'completed', 'cancelled']).default('draft'),
  image_url: z.string().url("URL invalide").optional().or(z.literal(""))
})

type EventFormData = z.infer<typeof eventSchema>
```

### Form Hook
```typescript
const form = useForm<EventFormData>({
  resolver: zodResolver(eventSchema),
  defaultValues: {
    title: "",
    description: "",
    date: "",
    youtube_url: "",
    status: "draft",
    image_url: ""
  }
})
```

### Mutation Hook
```typescript
// lib/hooks/use-create-event.ts
export const useCreateEvent = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: EventFormData) => 
      pb.collection('events').create(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['events'])
      toast.success('Événement créé avec succès')
      router.push('/')
    },
    onError: (error) => {
      toast.error('Erreur lors de la création')
    }
  })
}
```

### Full-Screen Form Layout
```typescript
// app/events/create/page.tsx
export default function CreateEventPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header title="Créer un événement" />
      <main className="flex-1 p-2 md:p-4">
        <EventForm />
      </main>
      <footer className="sticky bottom-0 bg-background border-t p-2 md:p-4">
        <div className="flex gap-2 justify-end">
          <Button variant="outline">Annuler</Button>
          <Button type="submit">Enregistrer</Button>
        </div>
      </footer>
    </div>
  )
}
```

## Files to Create
- `app/events/create/page.tsx` - page création
- `components/events/event-form.tsx` - formulaire réutilisable
- `lib/validations/event-schema.ts` - schéma Zod
- `lib/hooks/use-create-event.ts` - mutation hook
- `app/events/create/loading.tsx` - loading state

## Estimate
6-8 heures

## Dependencies
- Epic 1 complet
- Story 2.1 (Liste événements)

## Definition of Done
- ✅ Page création full-screen fonctionnelle
- ✅ Validation Zod complète
- ✅ Formulaire React Hook Form opérationnel
- ✅ Mutation TanStack Query réussie
- ✅ Toast feedback implémenté
- ✅ Navigation retour fonctionnelle
- ✅ Loading states présents