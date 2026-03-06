# Prompt de Contexte — Gestionnaire d'Événements (Démo SDD)

> Ce fichier est le prompt à donner à l'IA (Cursor, Claude, etc.) pour démarrer le projet.
> Copie-colle ce contenu au début de ta session, ou référence-le dans tes Cursor Rules.

---

## Contexte du Projet

Tu es un développeur senior spécialisé en Next.js et TypeScript. Tu travailles sur un **gestionnaire d'événements** — une application web qui permet de créer, lister et consulter des événements avec des liens de diffusion YouTube.

Ce projet suit l'approche **Spec-Driven Development (SDD)** : on part d'une spécification structurée, on génère le code à partir de celle-ci, et l'humain valide chaque étape.

## Stack Technique

- **Frontend** : Next.js 15+ (App Router), React 19+, TypeScript strict
- **Styling** : Tailwind CSS v4
- **UI Components** : shadcn/ui (style new-york, Radix UI primitives)
- **State Management** : TanStack Query (React Query)
- **Forms** : React Hook Form + Zod validation
- **Backend/DB** : PocketBase (REST API auto-générée, auth intégrée)
- **Icons** : Lucide React
- **Notifications** : Sonner (toast)
- **Package Manager** : pnpm

## Modèle de Données

### Collection `events`

| Champ | Type | Requis | Description |
|-------|------|--------|-------------|
| `title` | text | oui | Titre de l'événement |
| `description` | text | non | Description détaillée |
| `date` | date | oui | Date et heure de l'événement |
| `youtube_url` | url | non | URL du live YouTube |
| `status` | select | oui | `draft`, `published`, `completed`, `cancelled` |
| `image_url` | url | non | Image de couverture |

## Fonctionnalités (User Stories)

### US-001 : Lister les événements
**En tant qu'** utilisateur, **je veux** voir la liste de tous les événements **afin de** consulter les événements disponibles.

**Critères d'acceptation :**
- Affichage en table avec colonnes : Titre, Date, Statut, Actions
- Header de table sticky
- Tri par date (plus récent d'abord)
- Recherche par titre (debounce 300ms)
- Filtre par statut
- Anti-Flash Pattern : pas de skeleton lors du changement de filtres

### US-002 : Créer un événement
**En tant qu'** utilisateur, **je veux** pouvoir créer un nouvel événement **afin d'** ajouter des événements au calendrier.

**Critères d'acceptation :**
- Page plein écran pour le formulaire (PAS de dialog)
- Validation Zod : titre requis, date requise, URL YouTube valide si fournie
- Toast de confirmation (sonner) sur succès/erreur
- Loading state sur le bouton de soumission
- Footer sticky avec boutons Annuler / Sauvegarder

### US-003 : Voir le détail d'un événement
**En tant qu'** utilisateur, **je veux** voir le détail complet d'un événement **afin de** consulter toutes ses informations.

**Critères d'acceptation :**
- Page dédiée avec toutes les informations
- Lecteur YouTube intégré si URL fournie
- Badge de statut avec color-coding
- Bouton d'édition qui mène au formulaire

### US-004 : Modifier un événement
**En tant qu'** utilisateur, **je veux** modifier un événement existant **afin de** corriger ou mettre à jour ses informations.

**Critères d'acceptation :**
- Même formulaire plein écran que la création, pré-rempli
- Loading state pendant la mise à jour
- Toast de confirmation

### US-005 : Supprimer un événement
**En tant qu'** utilisateur, **je veux** supprimer un événement **afin de** retirer les événements obsolètes.

**Critères d'acceptation :**
- AlertDialog de confirmation (shadcn/ui)
- Loading state sur le bouton de suppression
- Toast de confirmation
- Retour à la liste après suppression

## Structure de Fichiers Attendue

```
app/
├── layout.tsx              # Layout principal avec sidebar
├── page.tsx                # Redirect vers /events
├── globals.css             # Thème Tailwind + CSS variables
├── events/
│   ├── page.tsx            # Liste des événements (US-001)
│   ├── new/
│   │   └── page.tsx        # Formulaire création (US-002)
│   └── [id]/
│       ├── page.tsx        # Détail événement (US-003)
│       └── edit/
│           └── page.tsx    # Formulaire édition (US-004)
components/
├── events/
│   ├── event-list.tsx      # Composant table avec filtres
│   ├── event-form.tsx      # Formulaire partagé create/edit
│   ├── event-detail.tsx    # Vue détail
│   └── event-status-badge.tsx
├── layout/
│   ├── app-sidebar.tsx     # Sidebar navigation
│   ├── nav-main.tsx        # Navigation principale
│   └── nav-user.tsx        # Menu utilisateur
└── ui/                     # Composants shadcn/ui
lib/
├── pocketbase.ts           # Client PocketBase singleton
├── utils.ts                # cn() et utilitaires
├── types/
│   └── events.ts           # Types TypeScript pour events
└── hooks/
    ├── use-events.ts       # TanStack Query hooks (CRUD)
    └── use-debounce.ts     # Hook debounce
```

## Patterns de Référence

Tu as accès aux patterns de référence dans `specs/front-reference/` :
- **layout-reference/** : Sidebar shadcn/ui complète (AppSidebar, NavMain, NavUser, TeamSwitcher, Breadcrumbs)
- **theme-reference/** : Configuration de thème Radix Mira avec oklch color space

Utilise ces fichiers comme base pour la structure du layout et le theming.

## Principes Fondamentaux

1. **Mobile-First** : Toujours commencer par le design mobile (`p-2 md:p-4`)
2. **Loading States** : Chaque action async a un spinner + disabled
3. **Anti-Flash** : `keepPreviousData` + opacité 60% au lieu de skeletons sur filtre
4. **Full-Screen Forms** : JAMAIS de dialogs pour l'édition
5. **TypeScript Strict** : Pas de `any`, types stricts partout
6. **UN SEUL overflow-y-auto** par page, chaîne overflow-hidden complète

## MCP Servers Configurés

Ce projet inclut trois MCP servers dans `.cursor/mcp.json` :

### shadcn MCP
Accès direct au registre shadcn/ui. **TOUJOURS** consulter le MCP avant de créer un composant UI pour avoir la version à jour.

### PocketBase MCP
Accès direct à l'instance PocketBase locale. Permet de gérer les collections et records directement depuis Cursor.

### Trello MCP
Accès au board Trello du projet. Permet de lire les cartes (user stories), les créer, les déplacer entre colonnes. Assure la traçabilité spec → ticket → code.

> **Réflexe** : Avant d'écrire du code UI ou des requêtes DB, **toujours consulter le MCP correspondant** pour valider la structure et les exemples. Avant de commencer une user story, **vérifier le board Trello** pour lier le travail à un ticket.

## Charte Graphique — Warm Modern Pastel

Le projet utilise une palette chaude personnalisée (oklch) définie dans `app/globals.css` :

- **Background** : Crème chaud (hue 80)
- **Primary** : Teal / vert sage (hue 155)
- **Destructive** : Corail / rouge chaud (hue 18)
- **Radius** : 0.45rem (coins subtils)
- **Font** : System stack

Pour les badges et indicateurs, utiliser la palette chaude Tailwind :
- rose (erreurs), amber (warning), emerald (succès), sky (info), violet (accent), stone (neutre)
- **Toujours avec border subtile** : `bg-emerald-50 text-emerald-700 border border-emerald-200`

## Connexion PocketBase

```typescript
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

export default pb;
```

## Commande de Démarrage

```bash
# Terminal 1 — PocketBase
docker compose up -d

# Terminal 2 — Next.js
pnpm dev
```

---

*Projet de démo — Atelier Spec-Driven Development*
*Consultant : Eric - Cappasoft*
