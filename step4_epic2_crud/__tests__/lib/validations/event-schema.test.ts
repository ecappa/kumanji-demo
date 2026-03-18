/**
 * Tests pour le schéma de validation Zod des événements
 * Couvre la validation des données de formulaire pour Stories 2.2, 2.4
 */

import { eventSchema, defaultEventValues, transformFormDataToEventData } from '@/lib/validations/event-schema';

describe('eventSchema', () => {
  describe('Validation des champs obligatoires', () => {
    it('valide des données correctes minimales', () => {
      const result = eventSchema.safeParse({
        title: 'Mon événement',
        date: '2026-06-15',
        status: 'draft',
      });
      expect(result.success).toBe(true);
    });

    it('rejette un titre vide', () => {
      const result = eventSchema.safeParse({
        title: '',
        date: '2026-06-15',
        status: 'draft',
      });
      expect(result.success).toBe(false);
    });

    it('rejette une date vide', () => {
      const result = eventSchema.safeParse({
        title: 'Test',
        date: '',
        status: 'draft',
      });
      expect(result.success).toBe(false);
    });

    it('rejette un statut invalide', () => {
      const result = eventSchema.safeParse({
        title: 'Test',
        date: '2026-06-15',
        status: 'invalid_status',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('Validation des champs optionnels', () => {
    it('accepte tous les champs remplis', () => {
      const result = eventSchema.safeParse({
        title: 'Conférence Tech',
        description: 'Une description complète',
        date: '2026-06-15',
        youtube_url: 'https://youtube.com/watch?v=test',
        image_url: 'https://example.com/image.jpg',
        status: 'published',
      });
      expect(result.success).toBe(true);
    });

    it('accepte les champs optionnels vides (chaînes vides)', () => {
      const result = eventSchema.safeParse({
        title: 'Test',
        description: '',
        date: '2026-06-15',
        youtube_url: '',
        image_url: '',
        status: 'draft',
      });
      expect(result.success).toBe(true);
    });

    it('rejette une YouTube URL invalide', () => {
      const result = eventSchema.safeParse({
        title: 'Test',
        date: '2026-06-15',
        youtube_url: 'pas-une-url',
        status: 'draft',
      });
      expect(result.success).toBe(false);
    });

    it('rejette une image URL invalide', () => {
      const result = eventSchema.safeParse({
        title: 'Test',
        date: '2026-06-15',
        image_url: 'pas-une-url',
        status: 'draft',
      });
      expect(result.success).toBe(false);
    });

    it('rejette un titre trop long (> 200 caractères)', () => {
      const result = eventSchema.safeParse({
        title: 'A'.repeat(201),
        date: '2026-06-15',
        status: 'draft',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('Validation des statuts', () => {
    const validStatuses = ['draft', 'published', 'completed', 'cancelled'];

    validStatuses.forEach((status) => {
      it(`accepte le statut "${status}"`, () => {
        const result = eventSchema.safeParse({
          title: 'Test',
          date: '2026-06-15',
          status,
        });
        expect(result.success).toBe(true);
      });
    });
  });
});

describe('defaultEventValues', () => {
  it('contient des valeurs par défaut correctes', () => {
    expect(defaultEventValues.title).toBe('');
    expect(defaultEventValues.description).toBe('');
    expect(defaultEventValues.date).toBe('');
    expect(defaultEventValues.youtube_url).toBe('');
    expect(defaultEventValues.image_url).toBe('');
    expect(defaultEventValues.status).toBe('draft');
  });
});

describe('transformFormDataToEventData', () => {
  it('transforme les chaînes vides en undefined pour les champs optionnels', () => {
    const result = transformFormDataToEventData({
      title: 'Test',
      description: '',
      date: '2026-06-15',
      youtube_url: '',
      image_url: '',
      status: 'draft',
    });

    expect(result.title).toBe('Test');
    expect(result.description).toBeUndefined();
    expect(result.youtube_url).toBeUndefined();
    expect(result.image_url).toBeUndefined();
  });

  it('conserve les valeurs non-vides', () => {
    const result = transformFormDataToEventData({
      title: 'Test',
      description: 'Une description',
      date: '2026-06-15',
      youtube_url: 'https://youtube.com/test',
      image_url: 'https://example.com/img.jpg',
      status: 'published',
    });

    expect(result.description).toBe('Une description');
    expect(result.youtube_url).toBe('https://youtube.com/test');
    expect(result.image_url).toBe('https://example.com/img.jpg');
  });
});
