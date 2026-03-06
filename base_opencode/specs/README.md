# Specs — Références front-end

Ce dossier contient les patterns de référence copiés depuis le projet civic-forge.

## Contenu attendu

```
specs/
├── front-reference/
│   ├── layout-reference/    ← Sidebar, AppSidebar, NavMain, responsive
│   └── theme-reference/     ← Radix Mira, oklch, light/dark
```

## Copier les références

```bash
cp -r /path/to/civic-forge/specs/front-reference ./specs/
```

## Comparaison

| Aspect | layout-ref | theme-ref | Ce template |
|--------|-----------|-----------|-------------|
| Next.js | 15.2.6 | 16.1.4 | 15+ |
| Tailwind | v4 | v4 | v4 |
| shadcn style | new-york | radix-mira | new-york |
| Icons | Lucide | Phosphor | Lucide |
| Package mgr | npm | pnpm | pnpm |
