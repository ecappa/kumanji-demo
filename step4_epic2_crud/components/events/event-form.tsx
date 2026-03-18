/**
 * Formulaire de création/édition d'événement
 * Utilise React Hook Form + Zod pour la validation
 */

'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from './status-badge';
import { eventSchema, EventFormData, defaultEventValues } from '@/lib/validations/event-schema';
import { STATUS_CONFIG } from '@/lib/types/events';
import { Loader2, Calendar, Link, ImageIcon, Youtube } from 'lucide-react';
import { useState } from 'react';

interface EventFormProps {
  initialData?: Partial<EventFormData>;
  onSubmit: (data: EventFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
  submitLabel?: string;
  title?: string;
}

export function EventForm({
  initialData = {},
  onSubmit,
  onCancel,
  isLoading = false,
  submitLabel = 'Enregistrer',
  title = 'Créer un événement',
}: EventFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      ...defaultEventValues,
      ...initialData,
    },
  });

  const handleSubmit = async (data: EventFormData) => {
    try {
      setIsSubmitting(true);
      await onSubmit(data);
    } catch (error) {
      console.error('Erreur soumission formulaire:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const watchedStatus = form.watch('status');

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">
          Remplissez les informations de l&apos;événement. Les champs marqués * sont obligatoires.
        </p>
      </div>

      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Informations principales */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Informations principales
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Titre */}
            <div className="space-y-2">
              <Label htmlFor="title">
                Titre de l&apos;événement *
              </Label>
              <Input
                id="title"
                {...form.register('title')}
                placeholder="Ex: Conférence Tech 2026"
                aria-invalid={!!form.formState.errors.title}
              />
              {form.formState.errors.title && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.title.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...form.register('description')}
                placeholder="Décrivez votre événement..."
                rows={4}
                className="resize-none"
              />
              {form.formState.errors.description && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.description.message}
                </p>
              )}
            </div>

            {/* Date */}
            <div className="space-y-2">
              <Label htmlFor="date">
                Date de l&apos;événement *
              </Label>
              <Input
                id="date"
                type="date"
                {...form.register('date')}
                aria-invalid={!!form.formState.errors.date}
              />
              {form.formState.errors.date && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.date.message}
                </p>
              )}
            </div>

            {/* Statut */}
            <div className="space-y-2">
              <Label htmlFor="status">Statut</Label>
              <div className="flex items-center gap-4">
                <Select
                  value={form.watch('status')}
                  onValueChange={(value) => form.setValue('status', value as EventFormData['status'])}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(STATUS_CONFIG).map(([status, config]) => (
                      <SelectItem key={status} value={status}>
                        {config.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {watchedStatus && (
                  <StatusBadge status={watchedStatus} />
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* URLs optionnelles */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link className="h-5 w-5" />
              Liens et médias (optionnel)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* YouTube URL */}
            <div className="space-y-2">
              <Label htmlFor="youtube_url" className="flex items-center gap-2">
                <Youtube className="h-4 w-4 text-red-600" />
                URL YouTube
              </Label>
              <Input
                id="youtube_url"
                type="url"
                {...form.register('youtube_url')}
                placeholder="https://youtube.com/watch?v=..."
              />
              {form.formState.errors.youtube_url && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.youtube_url.message}
                </p>
              )}
            </div>

            {/* Image URL */}
            <div className="space-y-2">
              <Label htmlFor="image_url" className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                URL de l&apos;image
              </Label>
              <Input
                id="image_url"
                type="url"
                {...form.register('image_url')}
                placeholder="https://example.com/image.jpg"
              />
              {form.formState.errors.image_url && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.image_url.message}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Actions footer */}
        <div className="flex items-center justify-end gap-2 pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Annuler
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting || isLoading}
          >
            {(isSubmitting || isLoading) && (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            )}
            {submitLabel}
          </Button>
        </div>
      </form>
    </div>
  );
}