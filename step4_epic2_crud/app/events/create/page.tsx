/**
 * Page de création d'événement
 * Full-screen form avec navigation et feedback
 */

'use client';

import { EventForm } from '@/components/events/event-form';
import { useCreateEvent } from '@/lib/hooks/use-events';
import { EventFormData, transformFormDataToEventData } from '@/lib/validations/event-schema';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function CreateEventPage() {
  const router = useRouter();
  const createEventMutation = useCreateEvent();

  const handleSubmit = async (data: EventFormData) => {
    try {
      const eventData = transformFormDataToEventData(data);
      await createEventMutation.mutateAsync(eventData);
      
      toast.success('Événement créé avec succès !');
      router.push('/');
    } catch (error) {
      console.error('Erreur création événement:', error);
      toast.error('Erreur lors de la création de l\'événement');
      throw error; // Re-throw pour que le form gère l'état
    }
  };

  const handleCancel = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header sticky */}
      <header className="sticky top-0 z-10 bg-background border-b">
        <div className="container mx-auto px-2 md:px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold">Nouvel événement</h1>
              <p className="text-sm text-muted-foreground">
                Créez un nouvel événement en remplissant les informations ci-dessous
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-2 md:px-4 py-6">
        <EventForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={createEventMutation.isPending}
          submitLabel="Créer l'événement"
          title="Informations de l'événement"
        />
      </main>
    </div>
  );
}