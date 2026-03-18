/**
 * Liste principale des événements
 * Affiche la liste avec filtrage et gestion des états (loading, empty, error)
 */

'use client';

import { useState } from 'react';
import { EventCard } from './event-card';
import { EventFilters } from './event-filters';
import { useEvents, useDeleteEvent } from '@/lib/hooks/use-events';
import { EventStatus, EventRecord } from '@/lib/types/events';
import { Loader2, Calendar, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface EventListProps {
  onCreateEvent?: () => void;
  onEditEvent?: (event: EventRecord) => void;
  onViewEvent?: (event: EventRecord) => void;
  className?: string;
}

export function EventList({ onCreateEvent, onEditEvent, onViewEvent, className }: EventListProps) {
  const [selectedStatus, setSelectedStatus] = useState<EventStatus | undefined>();
  const [eventToDelete, setEventToDelete] = useState<EventRecord | null>(null);

  // Hooks
  const { data: events = [], isLoading, isFetching, error } = useEvents(selectedStatus);
  const deleteEventMutation = useDeleteEvent();

  // Handlers
  const handleDeleteEvent = async () => {
    if (!eventToDelete) return;

    try {
      await deleteEventMutation.mutateAsync(eventToDelete.id);
      toast.success('Événement supprimé avec succès');
      setEventToDelete(null);
    } catch (error) {
      console.error('Erreur suppression événement:', error);
      toast.error('Erreur lors de la suppression de l\'événement');
    }
  };

  const handleDeleteClick = (event: EventRecord) => {
    setEventToDelete(event);
  };

  // États de chargement
  if (isLoading) {
    return (
      <div className={cn('flex flex-col items-center justify-center py-12', className)}>
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" data-testid="loader" />
        <p className="mt-2 text-sm text-muted-foreground">Chargement des événements...</p>
      </div>
    );
  }

  // État d'erreur
  if (error) {
    return (
      <div className={cn('flex flex-col items-center justify-center py-12', className)}>
        <Calendar className="h-12 w-12 text-muted-foreground/50" />
        <h3 className="mt-4 text-lg font-semibold">Erreur de chargement</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Impossible de charger les événements. Vérifiez que PocketBase est démarré.
        </p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => window.location.reload()}
        >
          Réessayer
        </Button>
      </div>
    );
  }

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header avec filtres */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Événements</h1>
          <p className="text-muted-foreground">
            Gérez vos événements simplement et rapidement
          </p>
        </div>

        {onCreateEvent && (
          <Button onClick={onCreateEvent} className="sm:shrink-0">
            <Plus className="h-4 w-4 mr-2" />
            Nouvel événement
          </Button>
        )}
      </div>

      {/* Filtres */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <EventFilters
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
        />
        
        {events.length > 0 && (
          <p className="text-sm text-muted-foreground">
            {events.length} événement{events.length > 1 ? 's' : ''}
            {selectedStatus && ` · Filtre: ${selectedStatus}`}
          </p>
        )}
      </div>

      {/* Liste des événements avec Anti-Flash Pattern */}
      <div 
        data-testid="events-container"
        className={cn(
          'transition-opacity duration-200',
          isFetching && events.length > 0 && 'opacity-60'
        )}
      >
        {/* Indicateur de chargement pour l'Anti-Flash Pattern */}
        {isFetching && events.length > 0 && (
          <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Mise à jour...
          </div>
        )}

        {/* Empty state */}
        {events.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Calendar className="h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-semibold">
              {selectedStatus ? 'Aucun événement trouvé' : 'Aucun événement'}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground text-center max-w-md">
              {selectedStatus 
                ? `Aucun événement avec le statut &quot;${selectedStatus}&quot; n&apos;a été trouvé.`
                : 'Vous n&apos;avez pas encore créé d&apos;événement. Commencez par en créer un !'
              }
            </p>
            {!selectedStatus && onCreateEvent && (
              <Button onClick={onCreateEvent} className="mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Créer le premier événement
              </Button>
            )}
          </div>
        ) : (
          /* Grille d'événements */
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onView={onViewEvent}
                onEdit={onEditEvent}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>
        )}
      </div>

      {/* Dialog de confirmation de suppression */}
      <AlertDialog open={!!eventToDelete} onOpenChange={() => setEventToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer l&apos;événement</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer l&apos;événement &quot;{eventToDelete?.title}&quot; ?
              Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteEvent}
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