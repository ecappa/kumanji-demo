/**
 * Schéma de validation Zod pour les événements
 * Utilisé avec React Hook Form pour la validation côté client
 */

import { z } from 'zod';

// Schema pour la création/édition d'événements
export const eventSchema = z.object({
  title: z
    .string()
    .min(1, 'Le titre est requis')
    .max(200, 'Le titre ne peut pas dépasser 200 caractères'),
  
  description: z
    .string()
    .max(2000, 'La description ne peut pas dépasser 2000 caractères')
    .optional()
    .or(z.literal('')),
  
  date: z
    .string()
    .min(1, 'La date est requise')
    .refine((date) => {
      // Vérifier que la date est dans le bon format et valide
      const dateObj = new Date(date);
      return !isNaN(dateObj.getTime());
    }, 'Format de date invalide'),
  
  youtube_url: z
    .string()
    .url('URL YouTube invalide')
    .optional()
    .or(z.literal('')),
  
  image_url: z
    .string()
    .url('URL d\'image invalide')
    .optional()
    .or(z.literal('')),
  
  status: z
    .enum(['draft', 'published', 'completed', 'cancelled'] as const),
});

// Type inféré du schema
export type EventFormData = z.infer<typeof eventSchema>;

// Valeurs par défaut pour le formulaire
export const defaultEventValues: EventFormData = {
  title: '',
  description: '',
  date: '',
  youtube_url: '',
  image_url: '',
  status: 'draft',
};

// Helper pour transformer les données du formulaire vers le format API
export const transformFormDataToEventData = (formData: EventFormData) => {
  return {
    ...formData,
    // S'assurer que les champs optionnels vides sont undefined plutôt que chaînes vides
    description: formData.description || undefined,
    youtube_url: formData.youtube_url || undefined,
    image_url: formData.image_url || undefined,
  };
};