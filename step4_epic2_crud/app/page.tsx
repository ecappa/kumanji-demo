'use client';

import { EventList } from '@/components/events/event-list';
import { Toaster } from 'sonner';
import { useRouter } from 'next/navigation';
import { EventRecord } from '@/lib/types/events';

export default function HomePage() {
  const router = useRouter();

  const handleCreateEvent = () => {
    router.push('/events/create');
  };

  const handleEditEvent = (event: EventRecord) => {
    router.push(`/events/${event.id}/edit` as Parameters<typeof router.push>[0]);
  };

  const handleViewEvent = (event: EventRecord) => {
    router.push(`/events/${event.id}` as Parameters<typeof router.push>[0]);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto p-2 md:p-4 max-w-6xl">
        <EventList 
          onCreateEvent={handleCreateEvent}
          onEditEvent={handleEditEvent}
          onViewEvent={handleViewEvent}
        />
      </div>
      
      {/* Toast notifications */}
      <Toaster 
        position="bottom-right" 
        richColors 
        closeButton
      />
    </main>
  );
}