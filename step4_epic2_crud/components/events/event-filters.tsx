/**
 * Filtres pour la liste des événements
 * Permet de filtrer par statut avec un design responsive
 */

import { Button } from '@/components/ui/button';
import { EventStatus, FILTER_OPTIONS } from '@/lib/types/events';
import { cn } from '@/lib/utils';

interface EventFiltersProps {
  selectedStatus?: EventStatus;
  onStatusChange: (status?: EventStatus) => void;
  className?: string;
}

export function EventFilters({ selectedStatus, onStatusChange, className }: EventFiltersProps) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {FILTER_OPTIONS.map((option) => (
        <Button
          key={option.label}
          variant={selectedStatus === option.value ? 'default' : 'outline'}
          size="sm"
          onClick={() => onStatusChange(option.value)}
          className="h-8 text-xs"
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}