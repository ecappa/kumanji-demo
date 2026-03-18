import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Extrait l'ID d'une vidéo YouTube depuis différents formats d'URL.
 * Supporte : youtube.com/watch?v=, youtu.be/, youtube.com/embed/, youtube.com/v/
 * Retourne null si l'URL n'est pas une URL YouTube valide.
 */
export function extractYoutubeId(url: string | undefined): string | null {
  if (!url) return null;

  const patterns = [
    // youtube.com/watch?v=VIDEO_ID
    /(?:youtube\.com\/watch\?.*v=)([a-zA-Z0-9_-]{11})/,
    // youtu.be/VIDEO_ID
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    // youtube.com/embed/VIDEO_ID
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    // youtube.com/v/VIDEO_ID
    /(?:youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/,
    // youtube.com/shorts/VIDEO_ID
    /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) return match[1];
  }

  return null;
}

/**
 * Retourne l'URL de la thumbnail YouTube pour un événement.
 * Priorité : image_url > thumbnail YouTube > null
 */
export function getEventThumbnail(
  imageUrl: string | undefined,
  youtubeUrl: string | undefined
): string | null {
  if (imageUrl) return imageUrl;

  const videoId = extractYoutubeId(youtubeUrl);
  if (videoId) return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return null;
}
