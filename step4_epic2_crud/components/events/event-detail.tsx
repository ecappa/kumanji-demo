/**
 * Composant de détail d'un événement
 * Affiche toutes les informations d'un événement avec design responsive
 */

'use client';

import { EventRecord, STATUS_CONFIG } from '@/lib/types/events';
import { StatusBadge } from './status-badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Edit, Trash2, Youtube, ExternalLink, ArrowLeft, ImageIcon } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface EventDetailProps {
  event: EventRecord;
  onEdit?: () => void;
  onDelete?: () => void;
  onBack?: () => void;
}

// Helper pour parser les dates PocketBase (format "YYYY-MM-DD HH:mm:ss.sssZ" avec espace)
function parsePbDate(dateStr: string | undefined): Date | null {
  if (!dateStr) return null;
  // PocketBase utilise un espace au lieu de T : "2026-04-15 09:00:00.000Z"
  const normalized = dateStr.replace(' ', 'T');
  const d = new Date(normalized);
  return isNaN(d.getTime()) ? null : d;
}

function formatPbDate(dateStr: string | undefined, fmt: string): string {
  const d = parsePbDate(dateStr);
  if (!d) return '—';
  return format(d, fmt, { locale: fr });
}

export function EventDetail({ event, onEdit, onDelete, onBack }: EventDetailProps) {
  const formattedDate = formatPbDate(event.date, 'EEEE dd MMMM yyyy');
  const formattedCreated = formatPbDate(event.created, 'dd/MM/yyyy HH:mm');
  const formattedUpdated = formatPbDate(event.updated, 'dd/MM/yyyy HH:mm');

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header avec actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <StatusBadge status={event.status} />
          <span className="text-sm text-muted-foreground capitalize">
            {STATUS_CONFIG[event.status].label}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {onEdit && (
            <Button variant="outline" size="sm" onClick={onEdit}>
              <Edit className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Modifier</span>
            </Button>
          )}
          {onDelete && (
            <Button variant="destructive" size="sm" onClick={onDelete}>
              <Trash2 className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Supprimer</span>
            </Button>
          )}
        </div>
      </div>

      {/* Titre et date */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {event.title}
        </h1>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <time dateTime={event.date} className="capitalize">{formattedDate}</time>
        </div>
      </div>

      {/* Image si présente */}
      {event.image_url && (
        <Card>
          <CardContent className="p-0 overflow-hidden rounded-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={event.image_url}
              alt={event.title}
              className="w-full h-48 sm:h-64 object-cover"
              onError={(e) => {
                // Cacher l'image si elle ne charge pas
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </CardContent>
        </Card>
      )}

      {/* Description */}
      {event.description && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
              {event.description}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Liens et médias */}
      {(event.youtube_url || event.image_url) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Liens et médias</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {event.youtube_url && (
              <div className="flex items-center gap-3">
                <Youtube className="h-5 w-5 text-red-600 shrink-0" />
                <a
                  href={event.youtube_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline truncate"
                >
                  {event.youtube_url}
                </a>
                <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0" />
              </div>
            )}
            {event.image_url && (
              <div className="flex items-center gap-3">
                <ImageIcon className="h-5 w-5 text-muted-foreground shrink-0" />
                <a
                  href={event.image_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline truncate"
                >
                  {event.image_url}
                </a>
                <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0" />
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Métadonnées */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Informations</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2 text-sm">
            <div>
              <dt className="text-muted-foreground">Créé le</dt>
              <dd className="font-medium">{formattedCreated}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Dernière modification</dt>
              <dd className="font-medium">{formattedUpdated}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Identifiant</dt>
              <dd className="font-mono text-xs">{event.id}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      {/* Retour */}
      {onBack && (
        <div className="pt-2">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour à la liste
          </Button>
        </div>
      )}
    </div>
  );
}
