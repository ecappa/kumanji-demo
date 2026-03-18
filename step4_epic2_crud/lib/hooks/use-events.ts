/**
 * Hooks TanStack Query pour la gestion des événements
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { pb, Collections } from '@/lib/pocketbase';
import { EventRecord, EventData, EventStatus } from '@/lib/types/events';
import { ClientResponseError } from 'pocketbase';

// Clés de requête
export const eventQueryKeys = {
  all: ['events'] as const,
  lists: () => [...eventQueryKeys.all, 'list'] as const,
  list: (status?: EventStatus) => [...eventQueryKeys.lists(), status] as const,
  details: () => [...eventQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...eventQueryKeys.details(), id] as const,
};

// Hook pour lister les événements avec filtrage
export const useEvents = (status?: EventStatus) => {
  return useQuery({
    queryKey: eventQueryKeys.list(status),
    queryFn: async (): Promise<EventRecord[]> => {
      try {
        const filter = status ? `status="${status}"` : '';
        const records = await pb.collection(Collections.EVENTS).getFullList({
          filter,
          sort: '-date', // Tri par date décroissante
        });
        return records as EventRecord[];
      } catch (error) {
        if (error instanceof ClientResponseError) {
          if (error.status === 404) {
            // Collection n'existe pas encore, retourner tableau vide
            return [];
          }
        }
        throw error;
      }
    },
    placeholderData: (previousData) => previousData, // Anti-Flash Pattern
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Hook pour récupérer un événement par ID
export const useEvent = (id: string) => {
  return useQuery({
    queryKey: eventQueryKeys.detail(id),
    queryFn: async (): Promise<EventRecord> => {
      const record = await pb.collection(Collections.EVENTS).getOne(id);
      return record as EventRecord;
    },
    enabled: !!id,
  });
};

// Hook pour créer un événement
export const useCreateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: EventData): Promise<EventRecord> => {
      const record = await pb.collection(Collections.EVENTS).create(data);
      return record as EventRecord;
    },
    onSuccess: () => {
      // Invalider toutes les listes d'événements
      queryClient.invalidateQueries({ queryKey: eventQueryKeys.lists() });
    },
  });
};

// Hook pour mettre à jour un événement
export const useUpdateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<EventData> }): Promise<EventRecord> => {
      const record = await pb.collection(Collections.EVENTS).update(id, data);
      return record as EventRecord;
    },
    onSuccess: (data) => {
      // Invalider les listes et le détail
      queryClient.invalidateQueries({ queryKey: eventQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: eventQueryKeys.detail(data.id) });
    },
  });
};

// Hook pour supprimer un événement
export const useDeleteEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      await pb.collection(Collections.EVENTS).delete(id);
    },
    onSuccess: () => {
      // Invalider toutes les listes
      queryClient.invalidateQueries({ queryKey: eventQueryKeys.lists() });
    },
  });
};