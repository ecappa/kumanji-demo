/**
 * Page d'édition d'un événement
 * Réutilise EventForm avec les données existantes pré-remplies
 */

'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { EventForm } from '@/components/events/event-form';
import { useEvent, useUpdateEvent } from '@/lib/hooks/use-events';
import { EventFormData, transformFormDataToEventData } from '@/lib/validations/event-schema';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface EditEventPageProps {
  params: Promise<{ id: string }>;
}

export default function EditEventPage({ params }: EditEventPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { data: event, isLoading, error } = useEvent(id);
  const updateEventMutation = useUpdateEvent();

  const handleSubmit = async (data: EventFormData) => {
    try {
      const eventData = transformFormDataToEventData(data);
      await updateEventMutation.mutateAsync({ id, data: eventData });
      
      toast.success('Événement mis à jour avec succès !');
      router.push(`/events/${id}` as Parameters<typeof router.push>[0]);
    } catch (err) {
      console.error('Erreur mise à jour:', err);
      toast.error('Erreur lors de la mise à jour de l\'événement');
      throw err; // Re-throw pour que le form gère l'état
    }
  };

  const handleCancel = () => {
    router.push(`/events/${id}` as Parameters<typeof router.push>[0]);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex flex-col items-center justify-center py-24">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="mt-2 text-sm text-muted-foreground">Chargement de l&apos;événement...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !event) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex flex-col items-center justify-center py-24">
          <h2 className="text-xl font-semibold">Événement introuvable</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            L&apos;événement demandé n&apos;existe pas ou a été supprimé.
          </p>
          <Button variant="outline" className="mt-4" onClick={() => router.push('/')}>
            Retour à la liste
          </Button>
        </div>
      </div>
    );
  }

  // Transformer les données de l'événement pour le formulaire
  // PocketBase renvoie les dates au format "YYYY-MM-DD HH:mm:ss.sssZ" (espace, pas T)
  const extractDateOnly = (dateStr: string | undefined): string => {
    if (!dateStr) return '';
    // Gérer les deux formats : "2026-04-15T09:00:00Z" et "2026-04-15 09:00:00.000Z"
    return dateStr.split('T')[0]?.split(' ')[0] || '';
  };

  const initialData: Partial<EventFormData> = {
    title: event.title,
    description: event.description || '',
    date: extractDateOnly(event.date),
    youtube_url: event.youtube_url || '',
    image_url: event.image_url || '',
    status: event.status,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header sticky */}
      <header className="sticky top-0 z-10 bg-background border-b">
        <div className="container mx-auto px-2 md:px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold">Modifier l&apos;événement</h1>
              <p className="text-sm text-muted-foreground">
                Modifiez les informations de &quot;{event.title}&quot;
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-2 md:px-4 py-6">
        <EventForm
          initialData={initialData}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={updateEventMutation.isPending}
          submitLabel="Mettre à jour"
          title="Modifier l'événement"
        />
      </main>
    </div>
  );
}
