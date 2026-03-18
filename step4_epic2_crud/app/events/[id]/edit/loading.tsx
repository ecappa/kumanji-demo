/**
 * Page de chargement pour l'édition d'un événement
 */

import { Loader2 } from 'lucide-react';

export default function EditEventLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col items-center justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <p className="mt-2 text-sm text-muted-foreground">Chargement du formulaire...</p>
      </div>
    </div>
  );
}
