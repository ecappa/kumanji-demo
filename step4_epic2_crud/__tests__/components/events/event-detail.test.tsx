/**
 * Tests pour le composant EventDetail
 * Story 2.3: Voir les détails d'un événement
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EventDetail } from '@/components/events/event-detail';
import { EventRecord } from '@/lib/types/events';

// Données de test
const mockEvent: EventRecord = {
  id: 'test-123',
  title: 'Conférence Tech 2026',
  description: 'Une grande conférence sur les nouvelles technologies.',
  date: '2026-06-15T10:00:00Z',
  status: 'published',
  youtube_url: 'https://youtube.com/watch?v=test123',
  image_url: 'https://example.com/image.jpg',
  created: '2026-01-15T08:00:00Z',
  updated: '2026-02-20T14:30:00Z',
  collectionId: 'events_id',
  collectionName: 'events',
};

const mockEventMinimal: EventRecord = {
  id: 'test-456',
  title: 'Événement Simple',
  date: '2026-08-01T09:00:00Z',
  status: 'draft',
  created: '2026-03-01T10:00:00Z',
  updated: '2026-03-01T10:00:00Z',
  collectionId: 'events_id',
  collectionName: 'events',
};

describe('EventDetail', () => {
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();
  const mockOnBack = jest.fn();
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Affichage des informations', () => {
    it('affiche le titre de l\'événement', () => {
      render(<EventDetail event={mockEvent} />);
      expect(screen.getByText('Conférence Tech 2026')).toBeInTheDocument();
    });

    it('affiche la date formatée', () => {
      render(<EventDetail event={mockEvent} />);
      // date-fns avec locale fr devrait formater la date
      const timeElement = screen.getByRole('time');
      expect(timeElement).toBeInTheDocument();
      expect(timeElement.textContent).toContain('juin');
    });

    it('affiche le badge de statut', () => {
      render(<EventDetail event={mockEvent} />);
      // Le statut apparaît 2 fois (badge + label texte), on vérifie qu'il y en a au moins 1
      expect(screen.getAllByText('Publié').length).toBeGreaterThanOrEqual(1);
    });

    it('affiche la description quand elle existe', () => {
      render(<EventDetail event={mockEvent} />);
      expect(screen.getByText('Une grande conférence sur les nouvelles technologies.')).toBeInTheDocument();
    });

    it('n\'affiche pas la section description quand elle est absente', () => {
      render(<EventDetail event={mockEventMinimal} />);
      expect(screen.queryByText('Description')).not.toBeInTheDocument();
    });

    it('affiche le lien YouTube quand il existe', () => {
      render(<EventDetail event={mockEvent} />);
      expect(screen.getByText('https://youtube.com/watch?v=test123')).toBeInTheDocument();
    });

    it('affiche le lien image quand il existe', () => {
      render(<EventDetail event={mockEvent} />);
      expect(screen.getByText('https://example.com/image.jpg')).toBeInTheDocument();
    });

    it('affiche les métadonnées (dates création/modification)', () => {
      render(<EventDetail event={mockEvent} />);
      expect(screen.getByText('Créé le')).toBeInTheDocument();
      expect(screen.getByText('Dernière modification')).toBeInTheDocument();
      expect(screen.getByText('Identifiant')).toBeInTheDocument();
      expect(screen.getByText('test-123')).toBeInTheDocument();
    });
  });

  describe('Actions', () => {
    it('affiche et appelle le bouton Modifier', async () => {
      render(<EventDetail event={mockEvent} onEdit={mockOnEdit} />);
      
      const editButton = screen.getByText('Modifier');
      await user.click(editButton);
      
      expect(mockOnEdit).toHaveBeenCalledTimes(1);
    });

    it('affiche et appelle le bouton Supprimer', async () => {
      render(<EventDetail event={mockEvent} onDelete={mockOnDelete} />);
      
      const deleteButton = screen.getByText('Supprimer');
      await user.click(deleteButton);
      
      expect(mockOnDelete).toHaveBeenCalledTimes(1);
    });

    it('affiche et appelle le bouton Retour', async () => {
      render(<EventDetail event={mockEvent} onBack={mockOnBack} />);
      
      const backButton = screen.getByText('Retour à la liste');
      await user.click(backButton);
      
      expect(mockOnBack).toHaveBeenCalledTimes(1);
    });

    it('n\'affiche pas les boutons d\'action quand les handlers ne sont pas fournis', () => {
      render(<EventDetail event={mockEvent} />);
      
      expect(screen.queryByText('Modifier')).not.toBeInTheDocument();
      expect(screen.queryByText('Supprimer')).not.toBeInTheDocument();
      expect(screen.queryByText('Retour à la liste')).not.toBeInTheDocument();
    });
  });

  describe('Événement minimal (sans champs optionnels)', () => {
    it('affiche correctement un événement sans description ni URLs', () => {
      render(<EventDetail event={mockEventMinimal} />);
      
      expect(screen.getByText('Événement Simple')).toBeInTheDocument();
      expect(screen.getAllByText('Brouillon').length).toBeGreaterThanOrEqual(1);
      // Pas de section liens et médias
      expect(screen.queryByText('Liens et médias')).not.toBeInTheDocument();
    });
  });
});
