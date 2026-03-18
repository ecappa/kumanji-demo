/**
 * Client PocketBase singleton
 * Configuration centralisée pour toutes les interactions avec PocketBase
 */

import PocketBase from 'pocketbase';

// Client singleton PocketBase
export const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL || 'http://127.0.0.1:8090');

// Désactiver l'auto-cancellation pour TanStack Query
pb.autoCancellation(false);

// Types de collections
export const Collections = {
  EVENTS: 'events',
} as const;

export default pb;