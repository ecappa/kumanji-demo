export type EventStatus = 'draft' | 'published' | 'completed' | 'cancelled'

export interface Event {
  id: string
  title: string          // required
  description?: string   // optional
  date: string          // ISO date, required
  youtube_url?: string  // optional
  status: EventStatus
  image_url?: string    // optional
  created: string       // auto-generated
  updated: string       // auto-generated
}