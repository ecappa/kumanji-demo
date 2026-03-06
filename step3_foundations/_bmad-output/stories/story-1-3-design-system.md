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

## Definition of Done
- ✅ shadcn/ui configuré et fonctionnel
- ✅ Design system warm pastel intégré
- ✅ Tous les composants essentiels installés
- ✅ Support light/dark mode
- ✅ Tests des composants passent