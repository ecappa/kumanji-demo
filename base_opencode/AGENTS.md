# Event Manager — Agent Rules

> Gestionnaire d'événements · Next.js 15+ · PocketBase · shadcn/ui
> Fichier tool-agnostic : fonctionne avec OpenCode, Claude Code (`CLAUDE.md`), ou tout agent compatible.

---

## Stack & Principes fondamentaux

- **Stack** : Next.js 15+, React 19+, TypeScript strict, Tailwind CSS v4, shadcn/ui, TanStack Query, React Hook Form + Zod, PocketBase (Docker), Lucide React, Sonner, pnpm
- **Mobile-first** : toujours `p-2 md:p-4`, jamais de spacing fixe
- **Loading states obligatoires** : chaque bouton async → Loader2 spinner + `disabled={isPending}`
- **Anti-Flash Pattern** : sur changement de filtre → `keepPreviousData` + opacity 60% + spinner. Skeletons UNIQUEMENT au chargement initial
- **Full-screen forms** : création/édition = pages plein écran. JAMAIS de dialogs pour les formulaires
- **TypeScript strict** : `any` interdit partout. Utiliser `unknown` + type guards
- **UN SEUL `overflow-y-auto`** par page. Chaîne `overflow-hidden` complète du parent au container scrollable

## Architecture & Layout

- Header sticky : `sticky top-0 z-10 bg-background`
- Pages avec tabs : header → tabs → zone filtre → table scrollable (un seul container)
- Formulaires : page plein écran avec footer sticky (Cancel/Save)
- Dialogs autorisés UNIQUEMENT pour : confirmation de suppression (AlertDialog), actions rapides, previews read-only

## Structure de fichiers

```
app/                    # Pages Next.js
components/
  ├── events/          # Composants métier
  ├── layout/          # Layout (header, nav)
  └── ui/              # shadcn/ui (généré)
lib/
  ├── types/           # Interfaces TypeScript
  ├── hooks/           # Hooks React (use-*.ts)
  ├── pocketbase.ts    # Client singleton
  └── utils.ts         # Utilitaires
specs/                  # Spécifications
```

- Fichiers : kebab-case (`event-list.tsx`, `use-events.ts`)
- Composants/Types : PascalCase (`EventCard`, `EventStatus`)
- Constantes : UPPER_SNAKE_CASE
- Hooks : préfixe `use-` (`use-events.ts`, `use-debounce.ts`)
- Pas de majuscules dans les noms de fichiers (sauf README, LICENSE, CHANGELOG)

## Formulaires — React Hook Form + Zod

Pattern obligatoire pour tout formulaire :

```tsx
const schema = z.object({ title: z.string().min(1), date: z.string().min(1) });
type FormData = z.infer<typeof schema>;
const form = useForm<FormData>({ resolver: zodResolver(schema) });
```

Toujours Zod pour la validation, jamais de validation manuelle.

## Composants shadcn/ui — Patterns obligatoires

- **Toast (Sonner)** : toujours typé — `toast.success()`, `toast.error()`, `toast.info()`, `toast.warning()`
- **Boutons** : `default` (primaire), `destructive` (suppression), `outline` (secondaire), `ghost` (tertiaire)
- **AlertDialog** : obligatoire pour toute suppression (header + description + footer)
- **Table** : header sticky `sticky top-0 z-10 bg-background` sur chaque cellule
- **Status Badge** : config objet mapping status → label + variant. Utiliser tokens sémantiques (`bg-success/10 text-success border-success/20`)
- **Icons Lucide** : h-4 w-4 (small), h-5 w-5 (medium), h-6 w-6 (large)

## PocketBase — Collection `events`

| Champ | Type | Options |
|-------|------|---------|
| title | text | required |
| description | text | — |
| date | date | required |
| youtube_url | url | — |
| status | select | draft, published, completed, cancelled · required |
| image_url | url | — |

- URL locale : `http://127.0.0.1:8090` · Admin : `http://127.0.0.1:8090/_/`
- Client singleton : `pb.autoCancellation(false)` pour TanStack Query
- CRUD via TanStack Query hooks (`useQuery`, `useMutation` avec invalidation)
- Erreurs : `ClientResponseError` avec gestion par status code (400, 404, etc.)

## Performance

- **Debounce 300ms** obligatoire sur tous les champs de recherche
- **useMemo** pour lookups (Map), **useCallback** sur les handlers
- Anti-Flash : `keepPreviousData: true` + `isFetching` → opacity + spinner
- Skeletons = chargement initial seulement

## Responsive

- Breakpoints Tailwind : `sm` (640px), `md` (768px), `lg` (1024px)
- Pattern : `p-2 md:p-4`, `gap-2 md:gap-4`
- Headers : `text-2xl sm:text-3xl`, descriptions cachées sur mobile
- Boutons d'action : `h-9 w-9 sm:w-auto sm:px-4` avec texte caché sur mobile
- Filtres compacts : icône sur mobile, texte sur sm+

## Design System — Warm Modern Pastel

### Tailwind CSS v4 — Configuration OBLIGATOIRE

- **Packages npm** : `tailwindcss@^4` + `@tailwindcss/postcss@^4`. PAS de `autoprefixer` (intégré dans v4).
- **Pas de `tailwind.config.ts`** — toute la config theme est dans `globals.css` via `@theme inline`.
- **PostCSS** : plugin `@tailwindcss/postcss` (PAS `tailwindcss`).

```js
// postcss.config.mjs
export default { plugins: { "@tailwindcss/postcss": {} } }
```

### Structure globals.css (référence)

```css
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));
@plugin "tailwindcss-animate";

@theme inline {
  --color-primary: var(--primary);
  --color-destructive: var(--destructive);
  --color-success: var(--success);
  /* ... mapping complet CSS var → Tailwind token ... */
  --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --radius-lg: var(--radius);
}

:root {
  --primary: oklch(0.55 0.08 155);     /* teal/sage green */
  --background: oklch(0.995 0.003 80); /* cream chaud */
  --destructive: oklch(0.63 0.16 18);  /* coral */
  /* ... valeurs oklch brutes ... */
}

.dark { /* ... variantes dark oklch ... */ }
```

### Mécanisme de couleurs (2 couches)

1. `:root` / `.dark` → CSS variables brutes en oklch (`--primary: oklch(0.55 0.08 155)`)
2. `@theme inline` → mapping vers Tailwind (`--color-primary: var(--primary)`)

Tailwind génère `bg-primary` → `background-color: var(--primary)` → résolu en oklch par le navigateur.

**JAMAIS de wrapper `hsl()` autour des variables oklch.**

### Palette

- Primary : teal/sage green `oklch(0.55 0.08 155)`
- Background : cream chaud `oklch(0.995 0.003 80)`
- Destructive : coral `oklch(0.63 0.16 18)`
- Semantic : success (emerald), warning (amber), info (sky), error (rose) — disponibles via `bg-success`, `text-warning`, etc.
- Typography : system stack, radius `0.45rem`
- Ne JAMAIS utiliser de couleurs Tailwind hardcodées — toujours les tokens sémantiques

## Environnement

- `.env.local` contient les secrets (Trello API key/token). NE JAMAIS committer.
- Charger avec `source .env.local` avant de lancer l'agent.
- Le `.mcp.json` référence les variables via `${TRELLO_API_KEY}` et `${TRELLO_TOKEN}`.

## Conventions Git & Traçabilité

- Format commit : `<type>(<trello-card>): <description>`
- Types : feat, fix, refactor, docs, style, test, chore
- Exemple : `feat(US-001): ajout de la liste des événements avec filtres`

## MCP — Réflexes obligatoires

3 serveurs MCP configurés. Avant de coder, TOUJOURS consulter :

1. **shadcn** : chercher le composant dans le registre AVANT d'écrire du UI
2. **PocketBase** : vérifier le schéma de collection AVANT d'écrire des queries
3. **Trello** : identifier la carte, déplacer en "In Progress", commit avec ref carte, déplacer en "Done"

## Anti-patterns — INTERDIT

| Contexte | INTERDIT | OBLIGATOIRE |
|----------|----------|-------------|
| Formulaires | Dialogs | Pages plein écran |
| Filtrage | Skeletons au changement | Anti-Flash Pattern |
| Boutons async | Pas de loading | Spinner + disabled |
| Toast | Message générique | Typé (success/error) |
| Spacing | `p-4` fixe | `p-2 md:p-4` |
| TypeScript | `any` | Types stricts |
| Scroll | Multiples containers | UN overflow-y-auto |
| PocketBase | Appels directs | TanStack Query hooks |
| Trello | Pas de ref carte | `feat(US-XXX):` |
| Tailwind config | `tailwind.config.ts` / `hsl(var(...))` | `@theme inline` dans CSS / `var(--...)` direct |
| PostCSS | `tailwindcss` + `autoprefixer` | `@tailwindcss/postcss` seul |
| CSS import | `@tailwind base/components/utilities` | `@import "tailwindcss"` |

## Learning Loop

Quand tu es corrigé, enregistre la correction dans ta mémoire pour ne pas la répéter. Si tu découvres un quirk du projet (edge case, convention implicite, gotcha), note-le aussi. L'objectif : zéro correction répétée entre sessions.

- **Où ça s'écrit** : `~/.claude/projects/<project>/memory/` (Claude Code) ou `~/.config/opencode/memory/` (OpenCode). Local à la machine, JAMAIS dans le repo.
- **Commande** : `/memory` pour inspecter et éditer les notes entre sessions.
- **Ce fichier (AGENTS.md)** = instructions permanentes, en git, partagées. La mémoire = notes de session, locales, privées.

## Workflow Développement — OBLIGATOIRE

Après CHAQUE feature implémentée, exécuter cette séquence complète :

### **1. Tests & Validation Code**
- [ ] Tous les tests unitaires passent à 100%
- [ ] Coverage des nouveaux composants/hooks

### **2. Validation Technique — ZÉRO TOLÉRANCE**
```bash
pnpm lint        # ZÉRO erreur/warning
pnpm type-check  # ZÉRO erreur TypeScript
pnpm build       # Build réussit complètement
```

### **3. Validation Runtime — NAVIGATION RÉELLE**
- [ ] `pnpm dev` démarre sans erreur
- [ ] Naviguer vers la feature implémentée
- [ ] DevTools Console : **AUCUNE** JavaScript error
- [ ] Network tab : toutes les API calls réussissent (200/201/204)
- [ ] Tester TOUS les flows de la feature (happy path + edge cases)
- [ ] UI responsive fonctionne sur mobile + desktop
- [ ] Tous les états (loading, error, success) s'affichent correctement

### **4. Documentation Obligatoire**
Dans le Dev Agent Record, documenter :
- Linter: OK
- TypeCheck: OK
- Build: OK
- Runtime: No JS errors
- Backend: All APIs responding
- Feature tested: [list des flows testés]
- Mobile/Desktop: Responsive OK

**RÈGLE ABSOLUE** : Une task NE PEUT PAS être marquée [x] tant que cette validation complète n'est pas terminée et documentée.

## Checklist pré-commit

- [ ] Debounce 300ms sur recherche
- [ ] useMemo / useCallback en place
- [ ] keepPreviousData + isFetching
- [ ] Header sticky
- [ ] UN SEUL overflow-y-auto
- [ ] Loading state sur chaque bouton async
- [ ] Toast feedback typé
- [ ] Forms plein écran, AlertDialog pour suppression
- [ ] Responsive (mobile-first)
- [ ] TypeScript strict (zero `any`)
- [ ] PocketBase error handling
- [ ] Carte Trello identifiée + ref dans commit
- [ ] **VALIDATION RUNTIME COMPLÈTE EXÉCUTÉE**
