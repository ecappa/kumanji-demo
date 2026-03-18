/**
 * Tests pour les utilitaires YouTube thumbnail
 */

import { extractYoutubeId, getEventThumbnail } from '@/lib/utils';

describe('extractYoutubeId', () => {
  it('extrait l\'ID depuis youtube.com/watch?v=', () => {
    expect(extractYoutubeId('https://www.youtube.com/watch?v=dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
  });

  it('extrait l\'ID depuis youtube.com/watch?v= avec paramètres supplémentaires', () => {
    expect(extractYoutubeId('https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=120')).toBe('dQw4w9WgXcQ');
  });

  it('extrait l\'ID depuis youtu.be/', () => {
    expect(extractYoutubeId('https://youtu.be/dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
  });

  it('extrait l\'ID depuis youtube.com/embed/', () => {
    expect(extractYoutubeId('https://www.youtube.com/embed/dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
  });

  it('extrait l\'ID depuis youtube.com/v/', () => {
    expect(extractYoutubeId('https://www.youtube.com/v/dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
  });

  it('extrait l\'ID depuis youtube.com/shorts/', () => {
    expect(extractYoutubeId('https://www.youtube.com/shorts/dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
  });

  it('fonctionne sans www', () => {
    expect(extractYoutubeId('https://youtube.com/watch?v=dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
  });

  it('fonctionne avec http', () => {
    expect(extractYoutubeId('http://youtube.com/watch?v=dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
  });

  it('retourne null pour une URL non-YouTube', () => {
    expect(extractYoutubeId('https://example.com/video')).toBeNull();
  });

  it('retourne null pour une chaîne vide', () => {
    expect(extractYoutubeId('')).toBeNull();
  });

  it('retourne null pour undefined', () => {
    expect(extractYoutubeId(undefined)).toBeNull();
  });

  it('retourne null pour une URL YouTube sans ID', () => {
    expect(extractYoutubeId('https://youtube.com/')).toBeNull();
  });
});

describe('getEventThumbnail', () => {
  it('retourne image_url en priorité quand les deux sont fournis', () => {
    expect(getEventThumbnail(
      'https://example.com/image.jpg',
      'https://youtube.com/watch?v=dQw4w9WgXcQ'
    )).toBe('https://example.com/image.jpg');
  });

  it('retourne la thumbnail YouTube quand pas d\'image_url', () => {
    expect(getEventThumbnail(
      undefined,
      'https://youtube.com/watch?v=dQw4w9WgXcQ'
    )).toBe('https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg');
  });

  it('retourne la thumbnail YouTube quand image_url est vide', () => {
    expect(getEventThumbnail(
      '',
      'https://youtube.com/watch?v=dQw4w9WgXcQ'
    )).toBe('https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg');
  });

  it('retourne null quand ni image ni YouTube', () => {
    expect(getEventThumbnail(undefined, undefined)).toBeNull();
  });

  it('retourne null quand les deux sont vides', () => {
    expect(getEventThumbnail('', '')).toBeNull();
  });

  it('retourne null quand YouTube URL est invalide', () => {
    expect(getEventThumbnail('', 'https://example.com/not-youtube')).toBeNull();
  });
});
