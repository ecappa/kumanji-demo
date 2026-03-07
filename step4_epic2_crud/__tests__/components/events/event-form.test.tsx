/**
 * Tests pour le composant EventForm
 * Teste la validation, la soumission et les interactions
 */

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EventForm } from '@/components/events/event-form';

// Mock des composants shadcn/ui Select (Radix ne fonctionne pas dans jsdom)
jest.mock('@/components/ui/select', () => ({
  Select: ({ children, onValueChange, value }: { children: React.ReactNode; onValueChange?: (v: string) => void; value?: string }) => (
    <div data-testid="select-root">
      <select
        data-testid="status-select"
        value={value || 'draft'}
        onChange={(e) => onValueChange?.(e.target.value)}
      >
        <option value="draft">Brouillon</option>
        <option value="published">Publié</option>
        <option value="completed">Terminé</option>
        <option value="cancelled">Annulé</option>
      </select>
      {children}
    </div>
  ),
  SelectContent: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  SelectItem: ({ children }: { children: React.ReactNode; value: string }) => <>{children}</>,
  SelectTrigger: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  SelectValue: () => null,
}));

describe('EventForm', () => {
  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const defaultProps = {
    onSubmit: mockOnSubmit,
    onCancel: mockOnCancel,
  };

  describe('Rendu initial', () => {
    it('affiche les champs obligatoires du formulaire', () => {
      render(<EventForm {...defaultProps} />);

      expect(screen.getByLabelText(/titre de l'événement/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/date de l'événement/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/description/i)).toBeInTheDocument();

      // Boutons
      expect(screen.getByText('Annuler')).toBeInTheDocument();
      expect(screen.getByText('Enregistrer')).toBeInTheDocument();
    });

    it('affiche les placeholders appropriés', () => {
      render(<EventForm {...defaultProps} />);

      expect(screen.getByPlaceholderText(/conférence tech 2026/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/décrivez votre événement/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/youtube.com\/watch/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/example.com\/image.jpg/i)).toBeInTheDocument();
    });

    it('utilise les valeurs initiales quand fournies', () => {
      const initialData = {
        title: 'Mon événement test',
        description: 'Description test',
        date: '2026-12-25',
        status: 'published' as const,
        youtube_url: 'https://youtube.com/test',
        image_url: 'https://example.com/test.jpg',
      };

      render(<EventForm {...defaultProps} initialData={initialData} />);

      expect(screen.getByDisplayValue('Mon événement test')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Description test')).toBeInTheDocument();
      expect(screen.getByDisplayValue('2026-12-25')).toBeInTheDocument();
      expect(screen.getByDisplayValue('https://youtube.com/test')).toBeInTheDocument();
      expect(screen.getByDisplayValue('https://example.com/test.jpg')).toBeInTheDocument();
    });
  });

  describe('Validation', () => {
    it('affiche une erreur quand le titre est vide', async () => {
      render(<EventForm {...defaultProps} />);

      const submitButton = screen.getByText('Enregistrer');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/titre est requis/i)).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('affiche une erreur quand la date est vide', async () => {
      render(<EventForm {...defaultProps} />);

      const titleInput = screen.getByLabelText(/titre de l'événement/i);
      await user.type(titleInput, 'Mon événement');

      const submitButton = screen.getByText('Enregistrer');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/date est requise/i)).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });

  describe('Soumission', () => {
    it('soumet les données valides', async () => {
      mockOnSubmit.mockResolvedValue(undefined);

      render(<EventForm {...defaultProps} />);

      const titleInput = screen.getByLabelText(/titre de l'événement/i);
      const dateInput = screen.getByLabelText(/date de l'événement/i);

      await user.type(titleInput, 'Mon événement test');
      await user.type(dateInput, '2026-12-25');

      const submitButton = screen.getByText('Enregistrer');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          title: 'Mon événement test',
          description: '',
          date: '2026-12-25',
          status: 'draft',
          youtube_url: '',
          image_url: '',
        });
      });
    });

    it('soumet toutes les données y compris optionnelles', async () => {
      mockOnSubmit.mockResolvedValue(undefined);

      render(<EventForm {...defaultProps} />);

      await user.type(screen.getByLabelText(/titre de l'événement/i), 'Événement complet');
      await user.type(screen.getByLabelText(/description/i), 'Description complète');
      await user.type(screen.getByLabelText(/date de l'événement/i), '2026-12-25');
      await user.type(screen.getByPlaceholderText(/youtube.com\/watch/i), 'https://youtube.com/test');
      await user.type(screen.getByPlaceholderText(/example.com\/image.jpg/i), 'https://example.com/test.jpg');

      const submitButton = screen.getByText('Enregistrer');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          title: 'Événement complet',
          description: 'Description complète',
          date: '2026-12-25',
          status: 'draft',
          youtube_url: 'https://youtube.com/test',
          image_url: 'https://example.com/test.jpg',
        });
      });
    });

    it('désactive le bouton pendant la soumission', async () => {
      let resolveSubmit: () => void;
      const submitPromise = new Promise<void>((resolve) => {
        resolveSubmit = resolve;
      });
      mockOnSubmit.mockReturnValue(submitPromise);

      render(<EventForm {...defaultProps} />);

      await user.type(screen.getByLabelText(/titre de l'événement/i), 'Test');
      await user.type(screen.getByLabelText(/date de l'événement/i), '2026-12-25');

      const submitButton = screen.getByText('Enregistrer');
      await user.click(submitButton);

      expect(submitButton).toBeDisabled();

      resolveSubmit!();
      await waitFor(() => {
        expect(submitButton).not.toBeDisabled();
      });
    });
  });

  describe('Actions', () => {
    it('appelle onCancel quand le bouton Annuler est cliqué', async () => {
      render(<EventForm {...defaultProps} />);

      const cancelButton = screen.getByText('Annuler');
      await user.click(cancelButton);

      expect(mockOnCancel).toHaveBeenCalledTimes(1);
    });

    it('désactive le bouton submit quand isLoading est true', () => {
      render(<EventForm {...defaultProps} isLoading={true} />);

      const submitButton = screen.getByText('Enregistrer');
      expect(submitButton).toBeDisabled();
    });

    it('personnalise le texte du bouton submit', () => {
      render(<EventForm {...defaultProps} submitLabel="Mettre à jour" />);

      expect(screen.getByText('Mettre à jour')).toBeInTheDocument();
      expect(screen.queryByText('Enregistrer')).not.toBeInTheDocument();
    });

    it('personnalise le titre', () => {
      render(<EventForm {...defaultProps} title="Modifier l'événement" />);

      expect(screen.getByText(/Modifier l'événement/i)).toBeInTheDocument();
    });
  });
});
