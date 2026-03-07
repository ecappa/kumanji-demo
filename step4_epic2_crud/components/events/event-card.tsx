/**
 * Carte d'événement individuelle
 * Affiche les détails d'un événement avec actions
 */

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from './status-badge';
import { EventRecord } from '@/lib/types/events';
import { Calendar, ExternalLink, Edit, Trash2, Youtube } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface EventCardProps {
  event: EventRecord;
  onView?: (event: EventRecord) => void;
  onEdit?: (event: EventRecord) => void;
  onDelete?: (event: EventRecord) => void;
  className?: string;
}

export function EventCard({ event, onView, onEdit, onDelete, className }: EventCardProps) {
  // PocketBase renvoie "YYYY-MM-DD HH:mm:ss.sssZ" (espace au lieu de T)
  const dateStr = event.date?.replace(' ', 'T') || '';
  const dateObj = new Date(dateStr);
  const formattedDate = isNaN(dateObj.getTime()) ? '—' : format(dateObj, 'dd MMMM yyyy', { locale: fr });

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <h3
            className="font-semibold text-lg line-clamp-2 cursor-pointer hover:text-primary transition-colors"
            onClick={() => onView?.(event)}
            role={onView ? 'link' : undefined}
            tabIndex={onView ? 0 : undefined}
            onKeyDown={(e) => e.key === 'Enter' && onView?.(event)}
          >
            {event.title}
          </h3>
          <StatusBadge status={event.status} className="shrink-0" />
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <time dateTime={event.date}>{formattedDate}</time>
        </div>
      </CardHeader>

      {event.description && (
        <CardContent className="py-2">
          <p className="text-sm text-muted-foreground line-clamp-3">
            {event.description}
          </p>
        </CardContent>
      )}

      <CardFooter className="flex items-center justify-between gap-2 pt-2">
        <div className="flex items-center gap-2">
          {event.youtube_url && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              asChild
            >
              <a
                href={event.youtube_url}
                target="_blank"
                rel="noopener noreferrer"
                title="Voir sur YouTube"
              >
                <Youtube className="h-4 w-4 text-red-600" />
              </a>
            </Button>
          )}
          
          {event.image_url && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              asChild
            >
              <a
                href={event.image_url}
                target="_blank"
                rel="noopener noreferrer"
                title="Voir l'image"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          )}
        </div>

        <div className="flex items-center gap-1">
          {onEdit && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => onEdit(event)}
              title="Modifier"
            >
              <Edit className="h-4 w-4" />
            </Button>
          )}
          
          {onDelete && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
              onClick={() => onDelete(event)}
              title="Supprimer"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}