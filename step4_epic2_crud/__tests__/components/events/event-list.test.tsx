/**
 * Tests pour le composant EventList
 * Teste l'affichage, le filtrage et les interactions
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { EventList } from '@/components/events/event-list';
import { useEvents, useDeleteEvent } from '@/lib/hooks/use-events';
import { EventRecord } from '@/lib/types/events';

// Mock des hooks
jest.mock('@/lib/hooks/use-events');
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const mockedUseEvents = useEvents as jest.MockedFunction<typeof useEvents>;
const mockedUseDeleteEvent = useDeleteEvent as jest.MockedFunction<typeof useDeleteEvent>;

// Données de test
const mockEvents: EventRecord[] = [
  {
    id: '1',
    title: 'Événement Test 1',
    description: 'Description test 1',
    date: '2026-04-15',
    status: 'published',
    created: '2026-01-01T00:00:00Z',
    updated: '2026-01-01T00:00:00Z',
    collectionId: 'events_id',
    collectionName: 'events',
  },
  {
    id: '2',
    title: 'Événement Test 2',
    description: 'Description test 2',
    date: '2026-05-15',
    status: 'draft',
    created: '2026-01-01T00:00:00Z',
    updated: '2026-01-01T00:00:00Z',
    collectionId: 'events_id',
    collectionName: 'events',
  },
];

// Helper pour render avec providers
const renderWithProviders = (component: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      {component}
    </QueryClientProvider>
  );
};

describe('EventList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock par défaut du hook useDeleteEvent
    mockedUseDeleteEvent.mockReturnValue({
      mutateAsync: jest.fn(),
      isPending: false,
    } as any);
  });

  describe('États de chargement', () => {
    it('affiche le loader pendant le chargement initial', () => {
      mockedUseEvents.mockReturnValue({
        data: undefined,
        isLoading: true,
        isFetching: false,
        error: null,
      } as any);

      renderWithProviders(<EventList />);
      
      expect(screen.getByText('Chargement des événements...')).toBeInTheDocument();
      expect(screen.getByTestId('loader')).toBeInTheDocument();
    });

    it('affiche un message d\'erreur en cas d\'échec', () => {
      mockedUseEvents.mockReturnValue({
        data: undefined,
        isLoading: false,
        isFetching: false,
        error: new Error('Erreur réseau'),
      } as any);

      renderWithProviders(<EventList />);
      
      expect(screen.getByText('Erreur de chargement')).toBeInTheDocument();
      expect(screen.getByText(/Impossible de charger les événements/)).toBeInTheDocument();
      expect(screen.getByText('Réessayer')).toBeInTheDocument();
    });
  });

  describe('Empty state', () => {
    it('affiche l\'empty state quand aucun événement', () => {
      mockedUseEvents.mockReturnValue({
        data: [],
        isLoading: false,
        isFetching: false,
        error: null,
      } as any);

      renderWithProviders(<EventList />);
      
      expect(screen.getByText('Aucun événement')).toBeInTheDocument();
      // Le texte contient des entités HTML (&apos;), on cherche par contenu partiel
      expect(screen.getByText(/encore créé/)).toBeInTheDocument();
    });

    it('affiche un message spécifique quand filtre actif sans résultat', () => {
      mockedUseEvents.mockReturnValue({
        data: [],
        isLoading: false,
        isFetching: false,
        error: null,
      } as any);

      renderWithProviders(<EventList />);
      
      // Simuler un filtre actif en cliquant sur un filtre
      const filterButtons = screen.getAllByText('Brouillon');
      fireEvent.click(filterButtons[0]);
      
      expect(screen.getByText('Aucun événement trouvé')).toBeInTheDocument();
    });
  });

  describe('Affichage des événements', () => {
    beforeEach(() => {
      mockedUseEvents.mockReturnValue({
        data: mockEvents,
        isLoading: false,
        isFetching: false,
        error: null,
      } as any);
    });

    it('affiche la liste des événements', () => {
      renderWithProviders(<EventList />);
      
      expect(screen.getByText('Événement Test 1')).toBeInTheDocument();
      expect(screen.getByText('Événement Test 2')).toBeInTheDocument();
      expect(screen.getByText('2 événements')).toBeInTheDocument();
    });

    it('affiche les filtres de statut', () => {
      renderWithProviders(<EventList />);
      
      expect(screen.getByText('Tous')).toBeInTheDocument();
      // Brouillon/Publié can appear both as filter buttons and status badges
      expect(screen.getAllByText('Brouillon').length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText('Publié').length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText('Terminé').length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText('Annulé').length).toBeGreaterThanOrEqual(1);
    });

    it('permet de filtrer par statut', () => {
      renderWithProviders(<EventList />);
      
      // Cliquer sur le filtre "Brouillon" (le premier match est le filtre, pas le badge)
      const filterButtons = screen.getAllByText('Brouillon');
      fireEvent.click(filterButtons[0]);
      
      // Vérifier que useEvents est appelé avec le bon filtre
      expect(mockedUseEvents).toHaveBeenLastCalledWith('draft');
    });
  });

  describe('Anti-Flash Pattern', () => {
    it('applique l\'opacité pendant isFetching', () => {
      mockedUseEvents.mockReturnValue({
        data: mockEvents,
        isLoading: false,
        isFetching: true, // État de mise à jour
        error: null,
      } as any);

      renderWithProviders(<EventList />);
      
      expect(screen.getByText('Mise à jour...')).toBeInTheDocument();
      const eventsContainer = screen.getByTestId('events-container');
      expect(eventsContainer).toHaveClass('opacity-60');
    });
  });

  describe('Actions utilisateur', () => {
    const mockOnCreateEvent = jest.fn();
    const mockOnEditEvent = jest.fn();

    beforeEach(() => {
      mockedUseEvents.mockReturnValue({
        data: mockEvents,
        isLoading: false,
        isFetching: false,
        error: null,
      } as any);
    });

    it('appelle onCreateEvent quand bouton clicked', () => {
      renderWithProviders(
        <EventList onCreateEvent={mockOnCreateEvent} />
      );
      
      const createButton = screen.getByText('Nouvel événement');
      fireEvent.click(createButton);
      
      expect(mockOnCreateEvent).toHaveBeenCalledTimes(1);
    });

    it('appelle onEditEvent quand bouton edit clicked', () => {
      renderWithProviders(
        <EventList onEditEvent={mockOnEditEvent} />
      );
      
      const editButtons = screen.getAllByTitle('Modifier');
      fireEvent.click(editButtons[0]);
      
      expect(mockOnEditEvent).toHaveBeenCalledWith(mockEvents[0]);
    });

    it('ouvre le dialog de suppression', async () => {
      renderWithProviders(<EventList />);
      
      const deleteButtons = screen.getAllByTitle('Supprimer');
      fireEvent.click(deleteButtons[0]);
      
      await waitFor(() => {
        expect(screen.getByText('Supprimer l\'événement')).toBeInTheDocument();
        expect(screen.getByText(/Êtes-vous sûr de vouloir supprimer l'événement "Événement Test 1"/)).toBeInTheDocument();
      });
    });
  });
});