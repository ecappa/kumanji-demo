---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
inputDocuments:
  - prd.md
  - AGENTS.md
  - README.md
workflowType: 'architecture'
project_name: 'base_opencode_instance1'
user_name: 'Eric'
date: '2026-02-24'
lastStep: 8
status: 'complete'
completedAt: '2026-02-24'
---

# Architecture Decision Document - Event Manager

_Document d'architecture complet pour l'application Event Manager, créé collaborativement pour assurer une implémentation cohérente par les agents IA._

## Analyse du Contexte du Projet

### Aperçu des Exigences

**Exigences Fonctionnelles :**
- **CRUD complet pour les événements** : Création, lecture, modification, suppression d'événements
- **Filtrage par statut** : draft, published, completed, cancelled
- **Gestion des médias** : Support pour images et URLs YouTube
- **Interface responsive** : Mobile-first avec breakpoints définis
- **Navigation intuitive** : Flux utilisateur simplifié sans friction

**Exigences Non-Fonctionnelles :**
- **Performance** : Chargement < 2s, feedback < 500ms, animations 60 FPS
- **Utilisabilité** : Interface utilisable sans documentation, mobile-first
- **Fiabilité** : Validation côté client/serveur, gestion d'erreurs gracieuse
- **Sécurité** : Sanitisation des entrées, HTTPS, limitation de taux
- **Maintenabilité** : TypeScript strict, code propre, composants documentés

**Échelle et Complexité :**

- Domaine principal : **Application web full-stack**
- Niveau de complexité : **Faible**
- Composants architecturaux estimés : **6-8** (Header, EventList, EventForm, EventDetail, FilterBar, StatusBadge, LoadingStates, ErrorHandling)

### Contraintes et Dépendances Techniques

- **Stack obligatoire** : Next.js 15+, React 19+, TypeScript strict, PocketBase, shadcn/ui
- **Patterns imposés** : Anti-Flash pour filtrage, formulaires plein écran, un seul overflow-y-auto par page
- **Design system** : Warm Modern Pastel avec palette oklch définie
- **Validation** : React Hook Form + Zod obligatoire, jamais de validation manuelle
- **État global** : TanStack Query pour data fetching, pas de Redux nécessaire

### Préoccupations Transversales Identifiées

- **Gestion des états de chargement** : Spinners obligatoires sur chaque bouton async
- **Performance** : Debounce 300ms sur recherche, useMemo/useCallback, keepPreviousData
- **Responsive design** : Mobile-first avec patterns `p-2 md:p-4`
- **Accessibilité** : WCAG 2.1 AA, navigation clavier, contraste couleurs
- **Validation et erreurs** : Toast typés, gestion ClientResponseError PocketBase
- **Traçabilité** : Intégration Trello pour suivi des tâches

## Évaluation Template de Démarrage

### Domaine Technologique Principal

**Application web full-stack** basée sur l'analyse des exigences du projet

### Template Sélectionné : Next.js 15 avec App Router

**Justification de la Sélection :**

- Correspond exactement aux contraintes techniques définies dans AGENTS.md
- Support natif de React 19+ et TypeScript strict
- App Router pour architecture moderne SSR/CSR
- Compatible avec l'écosystème shadcn/ui et Tailwind CSS v4
- Intégration native avec les patterns requis (mobile-first, performance)

**Commande d'Initialisation :**

```bash
pnpm create next-app@latest . --typescript --tailwind --eslint --app --src=no --import-alias "@/*"
```

**Décisions Architecturales Fournies par le Template :**

**Langage & Runtime :**
- TypeScript strict avec configuration Next.js optimisée
- Node.js runtime avec support Edge pour certaines routes
- Support natif ESM et modules CommonJS

**Solution de Styling :**
- Tailwind CSS v4 pré-configuré
- PostCSS configuration pour processing CSS
- Support CSS Modules et SCSS si nécessaire
- Intégration native avec le design system warm pastel

**Outillage de Build :**
- Webpack 5 avec optimisations Next.js
- Turbopack en mode développement pour performance
- Tree-shaking automatique et code splitting
- Optimisation images avec next/image

**Framework de Tests :**
- Jest configuré avec @testing-library/react
- Support TypeScript dans les tests
- Configuration ESLint pour tests

**Organisation du Code :**
- Architecture App Router (app/ directory)
- Conventions de nommage : kebab-case pour fichiers, PascalCase pour composants
- Séparation claire : pages, components, lib, types selon AGENTS.md

**Expérience de Développement :**
- Hot Module Replacement ultra-rapide
- TypeScript intellisense complet
- ESLint + Prettier pré-configurés
- Support debugging VS Code/WebStorm

## Décisions Architecturales Fondamentales

### Analyse des Priorités de Décision

**Décisions Critiques (Bloquent l'Implémentation) :**
- Architecture state management avec TanStack Query
- Patterns d'intégration PocketBase 
- Architecture des composants avec shadcn/ui
- Stratégie de performance et optimisation

**Décisions Importantes (Façonnent l'Architecture) :**
- Gestion d'erreurs et validation
- Architecture responsive et design patterns
- Sécurité et authentification basique

**Décisions Différées (Post-MVP) :**
- Authentification avancée (MVP ne nécessite pas d'auth)
- Monitoring et analytics avancés
- Optimisations de scaling

### Architecture des Données

**Base de Données : PocketBase (Déjà configurée)**
- Collection `events` avec schéma défini dans AGENTS.md
- SQLite intégré pour performance MVP
- URL locale : `http://127.0.0.1:8090`
- Docker containerisé pour portabilité

**Stratégie de Validation :**
- Client-side : React Hook Form + Zod (obligatoire selon AGENTS.md)
- Server-side : PocketBase validation intégrée
- Types TypeScript générés depuis schéma PocketBase

**Approche de Migration :**
- Schema-first avec PocketBase Admin UI
- Migrations versionnées via collections PocketBase
- Seeds de données de demo pour tests

**Stratégie de Cache :**
- TanStack Query pour cache client automatique
- `keepPreviousData: true` pour Anti-Flash Pattern
- Invalidation manuelle sur mutations CRUD

### Authentification & Sécurité

**Méthode d'Authentification :**
- MVP : Pas d'authentification (simple demo)
- Post-MVP : PocketBase auth intégré

**Patterns d'Autorisation :**
- MVP : Accès libre à tous les événements
- Validation côté client + serveur pour intégrité

**Middleware de Sécurité :**
- HTTPS enforced (obligatoire selon AGENTS.md)
- Sanitisation d'entrées via Zod
- Rate limiting PocketBase par défaut

**Stratégie de Sécurité API :**
- CORS configuré pour localhost dev
- Validation stricte des types avec TypeScript
- ClientResponseError handling pour erreurs PocketBase

### Patterns API & Communication

**Patterns de Design API :**
- REST via PocketBase SDK
- Endpoints CRUD standard : GET, POST, PUT, DELETE
- Filtrage par status via query parameters

**Approche Documentation API :**
- Types TypeScript comme documentation
- PocketBase Admin UI pour exploration schema
- JSDoc sur hooks customisés

**Standards de Gestion d'Erreurs :**
- ClientResponseError avec gestion par status code (400, 404, etc.)
- Toast typés avec Sonner : `toast.success()`, `toast.error()`
- Fallbacks gracieux avec état d'erreur UI

**Stratégie de Rate Limiting :**
- PocketBase rate limiting par défaut
- Debounce 300ms sur recherche côté client

### Architecture Frontend

**Approche State Management :**
- TanStack Query pour server state (obligatoire)
- React useState/useReducer pour local UI state
- URL state pour filtres avec Next.js searchParams
- Pas de Redux nécessaire pour MVP

**Architecture des Composants :**
- shadcn/ui comme base component library
- Composition patterns : EventCard, EventForm, EventList
- Structure : components/events/, components/ui/, components/layout/
- Hooks customisés : use-events.ts, use-debounce.ts

**Stratégie de Routage :**
- Next.js App Router avec pages plein écran
- Routes : `/`, `/events/create`, `/events/[id]`, `/events/[id]/edit`
- Pas de dialogs pour formulaires (obligatoire)

**Optimisation Performance :**
- Anti-Flash Pattern avec `keepPreviousData` + opacity
- useMemo pour lookups (Map), useCallback pour handlers
- Loading states obligatoires : Loader2 spinner + `disabled={isPending}`
- Images optimisées avec next/image

### Infrastructure & Déploiement

**Stratégie d'Hébergement :**
- Frontend : Vercel (optimisé Next.js)
- Backend : PocketBase via Railway/Docker

**Approche Pipeline CI/CD :**
- GitHub Actions pour build/deploy
- Tests TypeScript et linting pré-commit
- Preview deployments pour PRs

**Configuration Environment :**
- `.env.local` pour développement 
- Variables Vercel pour production
- PocketBase URL configurable

**Monitoring et Logging :**
- Vercel analytics intégré
- Console logging pour debugging
- Error boundaries React pour crashes

**Stratégie de Scaling :**
- MVP : Single instance suffisant
- Post-MVP : PocketBase clustering si nécessaire
- CDN Vercel pour assets statiques

### Analyse d'Impact des Décisions

**Séquence d'Implémentation :**
1. Setup Next.js + PocketBase local
2. Intégration shadcn/ui + design system
3. Types TypeScript + TanStack Query setup  
4. Composants CRUD avec patterns définis
5. Tests responsive + performance tuning
6. Déploiement production

**Dépendances Inter-Composants :**
- TanStack Query hooks alimentent tous les composants data
- Design system warm pastel appliqué via CSS variables
- Anti-Flash Pattern requis sur tous les filtres
- TypeScript strict maintient cohérence cross-component

## Patterns d'Implémentation & Règles de Cohérence

### Catégories de Patterns Définies

**Points de Conflit Critiques Identifiés :**
12 zones où les agents IA pourraient faire des choix différents

### Patterns de Nommage

**Conventions de Nommage Base de Données :**
- Tables : **snake_case** (events, user_sessions)
- Colonnes : **snake_case** (user_id, created_at, youtube_url)
- Relations PocketBase : **camelCase** dans le SDK (event.userId)

**Conventions de Nommage API :**
- Endpoints REST : **/api/pluriel** (/api/events)
- Paramètres de route : **[id]** (Next.js convention)
- Query params : **camelCase** (?status=published&sortBy=date)
- Headers : **kebab-case** (content-type, x-api-version)

**Conventions de Nommage Code :**
- Composants : **PascalCase** (EventCard, StatusBadge)
- Fichiers : **kebab-case** (event-card.tsx, use-events.ts)
- Fonctions : **camelCase** (createEvent, handleSubmit)
- Variables : **camelCase** (eventData, isLoading)
- Hooks customs : **use-prefix** (use-events, use-debounce)
- Types/Interfaces : **PascalCase** (Event, EventStatus)
- Constantes : **UPPER_SNAKE_CASE** (DEFAULT_TIMEOUT)

### Patterns de Structure

**Organisation du Projet :**
```
app/                    # Pages Next.js App Router
components/
  ├── events/          # Composants métier business
  ├── layout/          # Layout (header, nav)
  └── ui/              # shadcn/ui (généré automatiquement)
lib/
  ├── types/           # Interfaces TypeScript
  ├── hooks/           # Hooks React (use-*.ts)
  ├── pocketbase.ts    # Client singleton PocketBase
  └── utils.ts         # Utilitaires
```

**Patterns de Structure de Fichier :**
- Tests : **co-localisés** (.test.ts à côté du fichier source)
- Utils partagés : **lib/utils.ts** (imported as @/lib/utils)
- Types : **lib/types/** avec exports groupés dans index.ts
- Assets statiques : **public/** avec sous-dossiers par type

### Patterns de Format

**Formats de Réponse API :**
- **Réponse directe PocketBase** (pas de wrapper {data, error})
- Succès : Object direct ou Array direct
- Erreur : `ClientResponseError` avec status code + message
- Dates : **ISO 8601 strings** (2024-12-25T10:30:00.000Z)

**Formats d'Échange de Données :**
- JSON fields : **camelCase** côté client, snake_case côté PocketBase
- Booleans : **true/false** (jamais 1/0)
- Null handling : **undefined côté client**, null accepté de PocketBase
- Arrays : **toujours arrays**, même pour un seul item

### Patterns de Communication

**Patterns Système d'Événements :**
- TanStack Query : **camelCase keys** ('events', 'event-detail')
- Mutations : **verbe + entité** (createEvent, updateEvent, deleteEvent)
- Invalidation : **query keys groupés** par entité (['events'])

**Patterns de Gestion d'État :**
- Server state : **TanStack Query obligatoire**
- Local UI state : **useState/useReducer** pour composants
- URL state : **searchParams** pour filtres persistants
- Mises à jour : **immutable** via setters React

### Patterns de Processus

**Patterns de Gestion d'Erreur :**
```typescript
// Gestion ClientResponseError standardisée
try {
  await pb.collection('events').create(data)
  toast.success('Événement créé avec succès')
} catch (error) {
  if (error instanceof ClientResponseError) {
    if (error.status === 400) {
      toast.error('Données invalides')
    } else if (error.status === 404) {
      toast.error('Ressource non trouvée')
    } else {
      toast.error('Erreur inconnue')
    }
  }
}
```

**Patterns d'États de Chargement :**
- Boutons async : **Loader2 icon + disabled={isPending}** (obligatoire)
- Listes : **Skeletons UNIQUEMENT au chargement initial**
- Filtrage : **Anti-Flash Pattern** (`keepPreviousData` + opacity 60%)
- Global loading : **Évité**, préférer loading localisé

### Directives d'Application

**Tous les Agents IA DOIVENT :**

- Utiliser TypeScript strict sans aucun `any`
- Implémenter UN SEUL `overflow-y-auto` par page
- Créer formulaires en pages plein écran (JAMAIS de dialogs)
- Appliquer mobile-first responsive (`p-2 md:p-4`)
- Utiliser shadcn/ui AVANT d'écrire du UI custom
- Implémenter debounce 300ms sur tous les champs de recherche
- Ajouter loading states avec spinners sur actions async
- Valider avec React Hook Form + Zod (jamais validation manuelle)

**Application des Patterns :**

- Vérification : **Lint rules** + TypeScript compiler
- Documentation des violations : **Commentaires dans PR**
- Processus de mise à jour : **Modification AGENTS.md** + sync équipe

### Exemples de Patterns

**Bons Exemples :**
```typescript
// ✅ Hook TanStack Query standardisé
const useEvents = () => {
  return useQuery({
    queryKey: ['events'],
    queryFn: () => pb.collection('events').getFullList(),
    keepPreviousData: true
  })
}

// ✅ Composant avec loading state obligatoire  
function CreateEventButton() {
  const mutation = useMutation({...})
  return (
    <Button disabled={mutation.isPending}>
      {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Créer un événement
    </Button>
  )
}

// ✅ Form avec validation Zod
const schema = z.object({
  title: z.string().min(1),
  date: z.string().min(1)
})
const form = useForm<FormData>({ resolver: zodResolver(schema) })
```

**Anti-Patterns :**
```typescript
// ❌ TypeScript any interdit
const eventData: any = response.data

// ❌ Multiple overflow containers interdits  
<div className="overflow-y-auto">
  <div className="overflow-y-auto">

// ❌ Dialog pour formulaire interdit
<Dialog>
  <form>...</form>
</Dialog>

// ❌ Validation manuelle interdite
if (title.length === 0) {
  setError('Title required')
}
```

## Structure du Projet & Limites

### Structure Complète du Répertoire du Projet

```
event-manager/
├── README.md
├── package.json
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.mjs
├── components.json                    # shadcn/ui config
├── .env.local                        # Variables locales (PocketBase URL)
├── .env.example                      # Template env vars
├── .gitignore
├── .github/
│   └── workflows/
│       ├── ci.yml                    # Build + Lint + Test
│       └── deploy.yml                # Vercel deployment
├── docker-compose.yml                # PocketBase containerisé
├── app/                              # Next.js App Router
│   ├── globals.css                   # Design system warm pastel + Tailwind
│   ├── layout.tsx                    # Root layout avec header sticky
│   ├── page.tsx                      # Homepage = liste événements
│   ├── loading.tsx                   # Global loading fallback
│   ├── error.tsx                     # Error boundary global
│   ├── not-found.tsx                 # 404 page
│   └── events/
│       ├── create/
│       │   ├── page.tsx              # Form création plein écran
│       │   └── loading.tsx           # Loading state création
│       └── [id]/
│           ├── page.tsx              # Event detail view
│           ├── edit/
│           │   ├── page.tsx          # Form édition plein écran
│           │   └── loading.tsx       # Loading state édition
│           ├── loading.tsx           # Loading state detail
│           └── not-found.tsx         # Event not found
├── components/
│   ├── events/
│   │   ├── event-card.tsx            # Card dans liste events
│   │   ├── event-list.tsx            # Liste avec filtres
│   │   ├── event-detail.tsx          # Détail complet event
│   │   ├── event-form.tsx            # Form réutilisable create/edit
│   │   ├── event-filters.tsx         # Status filters + search
│   │   ├── status-badge.tsx          # Badge statut avec variants
│   │   ├── delete-event-dialog.tsx   # AlertDialog suppression
│   │   └── youtube-embed.tsx         # Embed YouTube preview
│   ├── layout/
│   │   ├── header.tsx                # Header sticky avec nav
│   │   ├── navigation.tsx            # Nav principale
│   │   ├── footer.tsx                # Footer si nécessaire
│   │   └── page-wrapper.tsx          # Wrapper responsive standard
│   └── ui/                           # shadcn/ui components (générés)
│       ├── button.tsx
│       ├── input.tsx
│       ├── form.tsx
│       ├── dialog.tsx
│       ├── toast.tsx
│       ├── badge.tsx
│       ├── table.tsx
│       ├── skeleton.tsx
│       └── ...                       # Autres composants shadcn
├── lib/
│   ├── types/
│   │   ├── index.ts                  # Export central types
│   │   ├── event.ts                  # Interface Event + EventStatus
│   │   ├── api.ts                    # Types API responses
│   │   └── form.ts                   # Types formulaires Zod
│   ├── hooks/
│   │   ├── use-events.ts             # TanStack Query events CRUD
│   │   ├── use-debounce.ts           # Debounce 300ms search
│   │   ├── use-local-storage.ts      # Local storage helper
│   │   └── use-media-query.ts        # Responsive breakpoints
│   ├── pocketbase.ts                 # Client singleton PocketBase
│   ├── utils.ts                      # Utilitaires (cn, formatDate, etc.)
│   ├── validations/
│   │   ├── event-schema.ts           # Zod schemas événements
│   │   └── index.ts                  # Export schemas
│   └── constants.ts                  # Constantes (status options, etc.)
├── tests/                           # Tests co-localisés *.test.ts
│   ├── __mocks__/
│   │   ├── pocketbase.ts            # Mock PocketBase pour tests
│   │   └── next-router.ts           # Mock Next.js router
│   ├── components/
│   │   ├── events/
│   │   │   ├── event-card.test.tsx
│   │   │   ├── event-form.test.tsx
│   │   │   └── event-list.test.tsx
│   │   └── layout/
│   │       └── header.test.tsx
│   ├── lib/
│   │   ├── utils.test.ts
│   │   └── hooks/
│   │       └── use-events.test.ts
│   ├── e2e/
│   │   ├── event-crud.spec.ts       # Tests E2E Playwright
│   │   ├── mobile-responsive.spec.ts
│   │   └── performance.spec.ts
│   └── setup.ts                     # Jest/Testing Library setup
└── public/
    ├── favicon.ico
    ├── images/
    │   ├── placeholder-event.jpg     # Image par défaut événements
    │   └── logos/
    └── icons/
        └── icon-192.png              # PWA icons si nécessaire
```

### Limites Architecturales

**Limites API :**
- **PocketBase REST API** : `http://127.0.0.1:8090/api/collections/events/records`
- **Endpoints CRUD** : GET, POST, PUT, DELETE sur collection events
- **Authentification** : Aucune pour MVP (accès libre)
- **Rate limiting** : PocketBase defaults (pas de custom)

**Limites des Composants :**
- **shadcn/ui** → composants UI de base réutilisables
- **components/events** → logique métier événements
- **components/layout** → structure page et navigation
- **Communication** : Props drilling + TanStack Query pour server state

**Limites des Services :**
- **PocketBase client** → seul point d'accès données (lib/pocketbase.ts)
- **TanStack Query** → cache et synchronisation server state
- **React Hook Form + Zod** → validation et gestion formulaires

**Limites des Données :**
- **PocketBase SQLite** → storage local containerisé
- **Collection events** → schéma défini avec champs requis/optionnels
- **Pas de cache externe** → TanStack Query cache en mémoire seulement

### Mappage Exigences → Structure

**Epic: Event Management Core**
- Composants : `components/events/`
- Pages : `app/` + `app/events/`
- Types : `lib/types/event.ts`
- Hooks : `lib/hooks/use-events.ts`
- Tests : `tests/components/events/` + `tests/e2e/event-crud.spec.ts`

**Epic: User Experience**
- Composants : `components/layout/` + responsive patterns
- Styles : `app/globals.css` avec design system
- Hooks : `lib/hooks/use-media-query.ts` + `use-debounce.ts`
- Tests : `tests/e2e/mobile-responsive.spec.ts`

### Points d'Intégration

**Communication Interne :**
- **Props** pour parent-child communication
- **TanStack Query** pour server state sharing
- **URL searchParams** pour état filtres persistant
- **Context** évité pour MVP (overkill)

**Intégrations Externes :**
- **PocketBase** via SDK officiel (lib/pocketbase.ts)
- **YouTube** via embeds iframe (components/events/youtube-embed.tsx)
- **Vercel** pour déploiement frontend
- **Railway/Docker** pour PocketBase backend

**Flux de Données :**
```
User Action → Component → TanStack Query Hook → PocketBase SDK → PocketBase API
                ↓
            React State Update ← Query Invalidation ← Response
```

## Résultats de Validation de l'Architecture

### Validation de Cohérence ✅

**Compatibilité des Décisions :**
- **Stack technique harmonieuse** : Next.js 15+ + React 19+ + TypeScript strict forment une base moderne et stable
- **Versions compatibles vérifiées** : Tailwind CSS v4 compatible Next.js 15, shadcn/ui compatible React 19
- **PocketBase + TanStack Query** : Intégration éprouvée pour CRUD temps réel
- **Pas de conflits identifiés** : Tous les choix technologiques se complètent

**Cohérence des Patterns :**
- **Patterns anti-flash alignés** avec TanStack Query (`keepPreviousData`)
- **Conventions nommage cohérentes** : kebab-case fichiers, PascalCase composants
- **Structure formulaires** : React Hook Form + Zod supporte l'exigence "formulaires plein écran"
- **Patterns responsive** : mobile-first (`p-2 md:p-4`) cohérent avec design system

**Alignement de Structure :**
- **Structure App Router** supporte toutes les décisions d'architecture
- **Limites composants respectées** : events/, layout/, ui/ séparent les responsabilités
- **Points d'intégration définis** : PocketBase → TanStack Query → Composants
- **Anti-patterns évités** : UN overflow-y-auto, pas de dialogs pour formulaires

### Validation Couverture Exigences ✅

**Epic 1: Event Management Core - 100% supportée**
- ✅ US-001 Create Event → app/events/create + event-form.tsx + validation Zod
- ✅ US-002 List/Filter → app/ + event-list.tsx + event-filters.tsx + TanStack Query
- ✅ US-003 View Details → app/events/[id] + event-detail.tsx + youtube-embed.tsx
- ✅ US-004 Edit Event → app/events/[id]/edit + réutilisation event-form.tsx
- ✅ US-005 Delete Event → delete-event-dialog.tsx AlertDialog + mutation

**Epic 2: User Experience - 100% supportée**
- ✅ US-006 Mobile Responsive → Design system + breakpoints + responsive patterns
- ✅ US-007 Fast Performance → Anti-Flash + loading states + optimisations Next.js

### Validation Préparation Implémentation ✅

**Complétude des Décisions :**
- ✅ **Toutes les décisions critiques documentées** avec versions vérifiées
- ✅ **Patterns d'implémentation compréhensifs** : nommage, structure, communication
- ✅ **Règles de cohérence claires** : 12 points de conflit potentiel adressés
- ✅ **Exemples fournis** pour tous les patterns majeurs

### Évaluation Préparation Architecture

**Statut Global :** PRÊTE POUR IMPLÉMENTATION

**Niveau de Confiance :** ÉLEVÉ basé sur validation complète

**Forces Clés :**
- Stack technique moderne et proven (Next.js 15+, React 19+, TypeScript strict)
- Patterns cohérents définis dans AGENTS.md déjà appliqués
- Structure claire supportant tous les requirements PRD
- Anti-patterns identifiés et évités
- Contraintes performance et UX intégrées dès l'architecture

### Handoff Implémentation

**Directives Agents IA :**

- Suivre toutes les décisions architecturales exactement comme documentées
- Utiliser les patterns d'implémentation de manière cohérente sur tous les composants
- Respecter la structure projet et les limites
- Se référer à ce document pour toutes questions architecturales

**Première Priorité d'Implémentation :**
```bash
pnpm create next-app@latest . --typescript --tailwind --eslint --app --src=no --import-alias "@/*"
```