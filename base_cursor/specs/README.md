# Specs & Références

## Structure

```
specs/
├── front-reference/         # À copier depuis civic-forge
│   ├── layout-reference/    # Sidebar shadcn/ui, NavMain, NavUser, Breadcrumbs
│   └── theme-reference/     # Thème Radix Mira, oklch color space
└── README.md                # Ce fichier
```

## Comment utiliser les références

Les dossiers `front-reference/` contiennent des projets Next.js complets qui servent de patterns de référence pour le layout et le thème.

### layout-reference
- **Usage** : Structure de sidebar avec navigation collapsible
- **Composants clés** : AppSidebar, NavMain, NavProjects, NavUser, TeamSwitcher
- **Pattern** : SidebarProvider → Sidebar + SidebarInset (contenu principal)
- **Responsive** : Desktop (expanded) → Tablet (icons) → Mobile (sheet)

### theme-reference
- **Usage** : Configuration de thème avec CSS variables
- **Style** : Radix Mira (shadcn/ui)
- **Couleurs** : oklch color space avec support light/dark mode
- **Variables** : --primary, --secondary, --muted, --accent, --destructive, etc.

## Copier les références depuis civic-forge

```bash
# Depuis la racine du repo demo
cp -r /path/to/civic-forge/specs/front-reference ./specs/
```

## Stack de référence

| Composant | Layout-ref | Theme-ref | Demo |
|-----------|------------|-----------|------|
| Next.js | 15.2.6 | 16.1.4 | 15+ |
| Tailwind | v4 | v4 | v4 |
| shadcn style | new-york | radix-mira | new-york |
| Icons | Lucide | Phosphor | Lucide |
| Package mgr | npm | pnpm | pnpm |
