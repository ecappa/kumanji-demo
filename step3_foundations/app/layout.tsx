import type { Metadata } from 'next'
import './globals.css'
import { QueryProvider } from '@/lib/providers/query-provider'

export const metadata: Metadata = {
  title: 'Event Manager',
  description: 'Gestionnaire d\'événements moderne avec Next.js 15+ et PocketBase',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className="font-sans antialiased">
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  )
}