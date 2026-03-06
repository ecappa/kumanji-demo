# Story 1.3: Setup Design System et shadcn/ui

## Epic
Epic 1: Infrastructure et Setup Technique

## Description
As a developer,
I want to configure the warm modern pastel design system with shadcn/ui,
So that I have consistent UI components and styling ready for the application.

## Acceptance Criteria

**Given** I need a consistent design system
**When** I install and configure shadcn/ui with the warm pastel theme
**Then** shadcn/ui is installed with components.json configuration
**And** The warm modern pastel color palette is defined in globals.css with oklch values
**And** Essential UI components are installed: Button, Input, Form, Dialog, Toast, Badge, Table, Skeleton
**And** The design system supports both light and dark modes
**And** Tailwind CSS v4 is configured with the custom color tokens

## Technical Details

### Color Palette (oklch)
```css
/* app/globals.css */
:root {
  --primary: oklch(0.55 0.08 155); /* teal/sage green */
  --background: oklch(0.995 0.003 80); /* cream chaud */
  --destructive: oklch(0.63 0.16 18); /* coral */
  --success: oklch(0.65 0.12 145); /* emerald */
  --warning: oklch(0.75 0.12 85); /* amber */
  --info: oklch(0.65 0.10 220); /* sky */
  --error: oklch(0.65 0.15 10); /* rose */
}
```

### shadcn/ui Installation
```bash
pnpm dlx shadcn-ui@latest init
pnpm dlx shadcn-ui@latest add button input form dialog toast badge table skeleton
```

### Components to Install
- Button (variants: default, destructive, outline, ghost)
- Input (avec focus states)
- Form (React Hook Form integration)
- Dialog/AlertDialog (pour confirmations)
- Toast/Sonner (feedback utilisateur)
- Badge (status indicators)
- Table (avec headers sticky)
- Skeleton (loading states)

## Files to Create/Modify
- `components.json` - shadcn/ui config
- `app/globals.css` - design system colors
- `components/ui/` - composants shadcn générés
- `lib/utils.ts` - utilitaires (cn function)

## Estimate
3-4 heures

## Dependencies
Story 1.1 (Next.js setup)

## Tasks/Subtasks
- [x] Initialiser shadcn/ui avec `pnpm dlx shadcn@latest init`
- [x] Installer composants essentiels: button, input, form, dialog, toast, badge, table, skeleton
- [x] Configurer warm pastel design system dans globals.css avec oklch
- [x] Nettoyer variables CSS par défaut shadcn pour garder notre palette
- [x] Ajouter couleurs sémantiques: success, warning, info, error avec oklch
- [x] Valider support light/dark mode avec variables appropriées
- [x] Créer page démo design system pour validation visuelle
- [x] Écrire et valider tests complets design system
- [x] Validation technique complète (lint, type-check, build, runtime)

## Definition of Done
- ✅ shadcn/ui configuré et fonctionnel
- ✅ Design system warm pastel intégré avec oklch
- ✅ Tous les composants essentiels installés (8 composants)
- ✅ Support light/dark mode complet
- ✅ Tests des composants passent (7/7)
- ✅ Page démo accessible pour validation visuelle

## Dev Agent Record

### Implementation Plan
- Installation shadcn/ui avec style new-york
- Configuration warm pastel oklch colors selon AGENTS.md
- Composants UI essentiels installés et fonctionnels
- Support complet dark mode avec couleurs harmonisées
- Page démo pour validation visuelle design system

### Completion Notes
- ✅ Linter: OK - Zéro erreur ESLint
- ✅ TypeCheck: OK - Zéro erreur TypeScript strict
- ✅ Build: OK - Compilation réussie avec shadcn/ui
- ✅ Runtime: OK - Page démo accessible HTTP 200
- ✅ Tests: 7/7 passants - Design system complet validé

### Technical Decisions
- **shadcn/ui style new-york** pour composants modernes
- **Warm pastel oklch** selon AGENTS.md (primary teal, cream background, coral destructive)
- **Variables CSS custom** remplacées par notre palette
- **Page démo** `/design-demo` pour validation visuelle
- **Support dark mode** complet avec couleurs harmonisées

## File List
- components.json (créé par shadcn init)
- lib/utils.ts (créé - fonction cn avec clsx + tailwind-merge)
- components/ui/ (créés - 8 composants essentiels)
- hooks/use-toast.ts (créé par shadcn)
- app/globals.css (modifié - warm pastel oklch design system)
- tailwind.config.ts (modifié par shadcn pour support CSS variables)
- app/design-demo/page.tsx (créé - démo design system)
- __tests__/design-system.test.js (créé)
- package.json (modifié - dépendances shadcn/ui)

## Change Log
- Setup shadcn/ui design system avec warm pastel oklch (Date: 2025-03-02)
- Installation composants UI essentiels et configuration complète
- Page démo design system pour validation visuelle
- Support dark mode avec harmonie couleurs warm pastel

## Status
ready-for-review