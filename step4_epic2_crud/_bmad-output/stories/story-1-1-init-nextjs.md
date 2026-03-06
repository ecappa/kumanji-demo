# Story 1.1: Initialisation Next.js avec App Router

## Epic
Epic 1: Infrastructure et Setup Technique

## Description
As a developer,
I want to initialize a Next.js 15+ application with App Router and TypeScript,
So that I have a modern foundation ready for building the event management application.

## Acceptance Criteria

**Given** I need to start the event manager project
**When** I run the Next.js initialization command 
**Then** I have a Next.js 15+ project with App Router, TypeScript, Tailwind CSS, ESLint configured
**And** The project structure follows the conventions defined in AGENTS.md
**And** The application runs successfully on localhost:3000
**And** TypeScript strict mode is enabled with zero `any` usage

## Technical Details

### Commande d'Initialisation
```bash
pnpm create next-app@latest . --typescript --tailwind --eslint --app --src=no --import-alias "@/*"
```

### Configuration Required
- Next.js 15+ avec App Router
- TypeScript strict mode
- Tailwind CSS v4
- ESLint configuration
- Import alias @/* configuré
- Structure sans src/ directory

### Files to Create/Modify
- `package.json` - dépendances et scripts
- `tsconfig.json` - configuration TypeScript strict
- `tailwind.config.ts` - configuration Tailwind
- `next.config.mjs` - configuration Next.js
- Structure de dossiers selon AGENTS.md

## Estimate
1-2 heures

## Dependencies
Aucune

## Definition of Done
- ✅ Next.js 15+ installé et configuré
- ✅ TypeScript strict mode activé
- ✅ Tailwind CSS v4 configuré
- ✅ Application démarre sans erreur sur localhost:3000
- ✅ Structure projet conforme AGENTS.md
- ✅ ESLint configuration active