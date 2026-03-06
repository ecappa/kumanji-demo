import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import pb from '@/lib/pocketbase'
import type { Event } from '@/lib/types'

export function useEvents() {
  return useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const records = await pb.collection('events').getFullList()
      return records as unknown as Event[]
    },
  })
}

export function useCreateEvent() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (data: Omit<Event, 'id' | 'created' | 'updated'>) => {
      const record = await pb.collection('events').create(data)
      return record as unknown as Event
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
    },
  })
}

export function useUpdateEvent() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Event> }) => {
      const record = await pb.collection('events').update(id, data)
      return record as unknown as Event
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
    },
  })
}

export function useDeleteEvent() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (id: string) => {
      await pb.collection('events').delete(id)
      return id
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
    },
  })
}