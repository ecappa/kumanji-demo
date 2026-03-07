/**
 * Types pour la gestion des événements
 */

// Statuts d'événements disponibles
export type EventStatus = 'draft' | 'published' | 'completed' | 'cancelled';

// Interface pour les données d'événement (formulaire)
export interface EventData {
  title: string;
  description?: string;
  date: string;
  youtube_url?: string;
  status: EventStatus;
  image_url?: string;
}

// Interface pour les enregistrements d'événements (avec métadonnées PocketBase)
export interface EventRecord extends EventData {
  id: string;
  created: string;
  updated: string;
  collectionId: string;
  collectionName: string;
}

// Configuration des status badges
export const STATUS_CONFIG = {
  draft: { 
    label: 'Brouillon', 
    variant: 'secondary' as const,
    className: 'bg-muted/50 text-muted-foreground border-muted'
  },
  published: { 
    label: 'Publié', 
    variant: 'default' as const,
    className: 'bg-primary/10 text-primary border-primary/20'
  },
  completed: { 
    label: 'Terminé', 
    variant: 'outline' as const,
    className: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950/20 dark:text-green-300 dark:border-green-800'
  },
  cancelled: { 
    label: 'Annulé', 
    variant: 'destructive' as const,
    className: 'bg-destructive/10 text-destructive border-destructive/20'
  }
} as const;

// Options de filtre
export const FILTER_OPTIONS = [
  { value: undefined, label: 'Tous' },
  { value: 'draft', label: 'Brouillon' },
  { value: 'published', label: 'Publié' },
  { value: 'completed', label: 'Terminé' },
  { value: 'cancelled', label: 'Annulé' }
] as const;