/**
 * Page de détail d'un événement
 * Affiche toutes les informations avec actions edit/delete
 */

'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import { EventDetail } from '@/components/events/event-detail';
import { useEvent, useDeleteEvent } from '@/lib/hooks/use-events';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

interface EventDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function EventDetailPage({ params }: EventDetailPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  const { data: event, isLoading, error } = useEvent(id);
  const deleteEventMutation = useDeleteEvent();

  const handleBack = () => {
    router.push('/');
  };

  const handleEdit = () => {
    router.push(`/events/${id}/edit` as Parameters<typeof router.push>[0]);
  };

  const handleDelete = async () => {
    try {
      await deleteEventMutation.mutateAsync(id);
      toast.success('Événement supprimé avec succès');
      router.push('/');
    } catch (err) {
      console.error('Erreur suppression:', err);
      toast.error('Erreur lors de la suppression');
    }
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
          <Button variant="outline" className="mt-4" onClick={handleBack}>
            Retour à la liste
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header sticky */}
      <header className="sticky top-0 z-10 bg-background border-b">
        <div className="container mx-auto px-2 md:px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold">Détail de l&apos;événement</h1>
              <p className="text-sm text-muted-foreground">
                Consultez les informations de l&apos;événement
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-2 md:px-4 py-6">
        <EventDetail
          event={event}
          onEdit={handleEdit}
          onDelete={() => setShowDeleteDialog(true)}
          onBack={handleBack}
        />
      </main>

      {/* Dialog de confirmation de suppression */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer l&apos;événement</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer &quot;{event.title}&quot; ?
              Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={deleteEventMutation.isPending}
            >
              {deleteEventMutation.isPending && (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              )}
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
