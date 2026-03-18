/**
 * Badge de statut pour les événements
 * Affiche le statut avec les couleurs et labels appropriés
 */

import { Badge } from '@/components/ui/badge';
import { EventStatus, STATUS_CONFIG } from '@/lib/types/events';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: EventStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];
  
  return (
    <Badge 
      variant={config.variant}
      className={cn(config.className, className)}
    >
      {config.label}
    </Badge>
  );
}