export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto p-2 md:p-4">
        <div className="text-center py-16">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-4">
            🎯 Event Manager
          </h1>
          <p className="text-muted-foreground mb-8">
            Gestionnaire d&apos;événements moderne
          </p>
          <div className="bg-card border border-border rounded-lg p-4 md:p-6 max-w-md mx-auto">
            <h2 className="text-lg font-semibold mb-2">✅ Next.js 15+ Initialisé</h2>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• App Router configuré</li>
              <li>• TypeScript strict mode</li>
              <li>• Tailwind CSS v4</li>
              <li>• ESLint actif</li>
              <li>• Design system chargé</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}