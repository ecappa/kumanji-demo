import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function DesignDemoPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto p-2 md:p-4 space-y-8">
        <div className="text-center py-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-4">
            🎨 Design System Demo
          </h1>
          <p className="text-muted-foreground mb-8">
            Warm Modern Pastel avec shadcn/ui
          </p>
        </div>

        {/* Boutons */}
        <section className="bg-card border border-border rounded-lg p-4 md:p-6">
          <h2 className="text-lg font-semibold mb-4">Boutons</h2>
          <div className="flex flex-wrap gap-2">
            <Button>Default</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </section>

        {/* Badges */}
        <section className="bg-card border border-border rounded-lg p-4 md:p-6">
          <h2 className="text-lg font-semibold mb-4">Badges</h2>
          <div className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="secondary">Secondary</Badge>
          </div>
        </section>

        {/* Input */}
        <section className="bg-card border border-border rounded-lg p-4 md:p-6">
          <h2 className="text-lg font-semibold mb-4">Input</h2>
          <div className="max-w-sm">
            <Input placeholder="Entrez votre texte..." />
          </div>
        </section>

        {/* Table */}
        <section className="bg-card border border-border rounded-lg p-4 md:p-6">
          <h2 className="text-lg font-semibold mb-4">Table</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Conference Tech</TableCell>
                <TableCell>2024-01-15</TableCell>
                <TableCell><Badge>Published</Badge></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Workshop Design</TableCell>
                <TableCell>2024-01-20</TableCell>
                <TableCell><Badge variant="outline">Draft</Badge></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </section>

        {/* Skeletons */}
        <section className="bg-card border border-border rounded-lg p-4 md:p-6">
          <h2 className="text-lg font-semibold mb-4">Loading Skeletons</h2>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </section>

        {/* Colors Demo */}
        <section className="bg-card border border-border rounded-lg p-4 md:p-6">
          <h2 className="text-lg font-semibold mb-4">Color Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="h-12 bg-primary rounded border" />
              <p className="text-sm text-muted-foreground">Primary</p>
            </div>
            <div className="space-y-2">
              <div className="h-12 bg-destructive rounded border" />
              <p className="text-sm text-muted-foreground">Destructive</p>
            </div>
            <div className="space-y-2">
              <div className="h-12 bg-secondary rounded border" />
              <p className="text-sm text-muted-foreground">Secondary</p>
            </div>
            <div className="space-y-2">
              <div className="h-12 bg-muted rounded border" />
              <p className="text-sm text-muted-foreground">Muted</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}