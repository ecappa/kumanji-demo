---
stepsCompleted: ["step-01-validate-prerequisites", "step-02-design-epics", "step-03-create-stories"]
inputDocuments: 
  - "/Users/ecappannelli/Nextcloud/CAPPASOFT/Clients/Kumonji/03_demo/base_opencode_instance2/_bmad-output/planning-artifacts/prd.md"
  - "/Users/ecappannelli/Nextcloud/CAPPASOFT/Clients/Kumonji/03_demo/base_opencode_instance2/_bmad-output/planning-artifacts/architecture.md"
---

# base_opencode_instance1 - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for base_opencode_instance1, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1: L'utilisateur peut créer un événement avec titre, description, date, URL YouTube, statut et image
FR2: L'utilisateur peut lister tous les événements avec filtrage par statut (draft, published, completed, cancelled)
FR3: L'utilisateur peut voir les détails complets d'un événement
FR4: L'utilisateur peut modifier un événement existant avec pré-remplissage des champs
FR5: L'utilisateur peut supprimer un événement avec confirmation
FR6: L'interface doit être responsive et utilisable sur mobile et desktop
FR7: L'application doit afficher des états de chargement appropriés pour toutes les actions async
FR8: L'application doit gérer la validation côté client et serveur avec messages d'erreurs clairs
FR9: L'utilisateur peut intégrer/prévisualiser des vidéos YouTube via URL
FR10: L'application doit supporter la navigation intuitive sans besoin de documentation

### NonFunctional Requirements

NFR1: Page load time < 2 seconds on 3G connection
NFR2: Form submission feedback within 500ms
NFR3: Smooth animations and transitions (60 FPS)
NFR4: Interface usable without documentation or training
NFR5: Mobile-first responsive design with defined breakpoints
NFR6: Accessibility compliance (WCAG 2.1 AA basics)
NFR7: Cross-browser compatibility (Chrome, Safari, Firefox, Edge)
NFR8: 99.9% uptime during demo period
NFR9: Data persistence and backup via PocketBase
NFR10: Graceful error handling with user-friendly messages
NFR11: Input validation on both client and server
NFR12: Basic input sanitization and HTTPS enforcement
NFR13: Rate limiting for API endpoints
NFR14: Support up to 1000 events per user
NFR15: Database performance optimized for read operations

### Additional Requirements

- **Starter Template**: Architecture specifies Next.js 15+ with App Router template initialization
- Infrastructure requirement: PocketBase containerized with Docker for data persistence
- Integration requirement: TanStack Query for server state management and real-time synchronization  
- Technical requirement: TypeScript strict mode with zero `any` usage
- Performance requirement: Anti-Flash Pattern implementation for filtering (keepPreviousData + opacity)
- UX requirement: Full-screen forms (never dialogs) for create/edit operations
- Security requirement: ClientResponseError handling for PocketBase API responses
- Technical requirement: Single overflow-y-auto container per page for scroll management
- Performance requirement: Debounce 300ms on all search/filter inputs
- UI requirement: shadcn/ui components with warm modern pastel design system
- Development requirement: Mobile-first responsive patterns (p-2 md:p-4)
- Validation requirement: React Hook Form + Zod for all form validation (no manual validation)

### FR Coverage Map

FR1: Epic 2 - Création d'événement avec tous les champs
FR2: Epic 2 - Liste et filtrage par statut  
FR3: Epic 2 - Affichage des détails d'événement
FR4: Epic 2 - Modification d'événement existant
FR5: Epic 2 - Suppression d'événement avec confirmation
FR6: Epic 3 - Interface responsive mobile et desktop
FR7: Epic 3 - États de chargement pour actions async
FR8: Epic 2 - Validation côté client et serveur
FR9: Epic 2 - Intégration/prévisualisation YouTube
FR10: Epic 3 - Navigation intuitive sans documentation

## Epic List

### Epic 1: Infrastructure et Setup Technique
L'application est opérationnelle avec l'infrastructure de base permettant la gestion d'événements - setup Next.js 15+, PocketBase, design system warm pastel, et architecture technique complète.
**FRs couverts :** Template de démarrage Next.js 15+, Infrastructure PocketBase, Design system, TypeScript strict

### Epic 2: Gestion d'Événements Core
Les utilisateurs peuvent créer, lister, voir, modifier et supprimer des événements avec validation complète, gestion des médias YouTube, et interface fonctionnelle.
**FRs couverts :** FR1, FR2, FR3, FR4, FR5, FR8, FR9

### Epic 3: Expérience Utilisateur Optimisée  
L'application offre une expérience fluide, rapide et responsive sur tous les appareils avec performance optimisée, accessibilité et design mobile-first.
**FRs couverts :** FR6, FR7, FR10, NFR1-NFR15

## Epic 1: Infrastructure et Setup Technique

L'application est opérationnelle avec l'infrastructure de base permettant la gestion d'événements - setup Next.js 15+, PocketBase, design system warm pastel, et architecture technique complète.

### Story 1.1: Initialisation Next.js avec App Router

As a developer,
I want to initialize a Next.js 15+ application with App Router and TypeScript,
So that I have a modern foundation ready for building the event management application.

**Acceptance Criteria:**

**Given** I need to start the event manager project
**When** I run the Next.js initialization command 
**Then** I have a Next.js 15+ project with App Router, TypeScript, Tailwind CSS, ESLint configured
**And** The project structure follows the conventions defined in AGENTS.md
**And** The application runs successfully on localhost:3000
**And** TypeScript strict mode is enabled with zero `any` usage

### Story 1.2: Configuration PocketBase et Collection Events

As a developer,
I want to set up PocketBase with Docker and create the events collection,
So that I have a working backend API for event data persistence.

**Acceptance Criteria:**

**Given** I need data persistence for events
**When** I configure PocketBase via Docker and create the events collection
**Then** PocketBase runs on http://127.0.0.1:8090 with admin access
**And** The events collection has fields: title (text required), description (text), date (date required), youtube_url (url), status (select: draft/published/completed/cancelled required), image_url (url)
**And** The PocketBase client singleton is configured with autoCancellation(false)
**And** I can perform basic CRUD operations via the Admin UI

### Story 1.3: Setup Design System et shadcn/ui

As a developer,
I want to configure the warm modern pastel design system with shadcn/ui,
So that I have consistent UI components and styling ready for the application.

**Acceptance Criteria:**

**Given** I need a consistent design system
**When** I install and configure shadcn/ui with the warm pastel theme
**Then** shadcn/ui is installed with components.json configuration
**And** The warm modern pastel color palette is defined in globals.css with oklch values
**And** Essential UI components are installed: Button, Input, Form, Dialog, Toast, Badge, Table, Skeleton
**And** The design system supports both light and dark modes
**And** Tailwind CSS v4 is configured with the custom color tokens

### Story 1.4: Architecture TypeScript et Structure Projet

As a developer,
I want to establish the TypeScript architecture and project structure,
So that I have organized, type-safe foundations for building components and features.

**Acceptance Criteria:**

**Given** I need organized project structure with TypeScript
**When** I create the folder structure and base TypeScript types
**Then** The project follows the structure: app/, components/events/, components/layout/, components/ui/, lib/types/, lib/hooks/
**And** Base TypeScript interfaces are defined: Event, EventStatus in lib/types/
**And** PocketBase client singleton is created in lib/pocketbase.ts
**And** TanStack Query is configured for data fetching
**And** All files follow naming conventions: kebab-case files, PascalCase components

## Epic 2: Gestion d'Événements Core

Les utilisateurs peuvent créer, lister, voir, modifier et supprimer des événements avec validation complète, gestion des médias YouTube, et interface fonctionnelle.

### Story 2.1: Liste des Événements avec Filtrage

As a user,
I want to see a list of all events with filtering by status,
So that I can quickly find and manage my events.

**Acceptance Criteria:**

**Given** I visit the application homepage
**When** the page loads
**Then** I see a list of all events sorted by date
**And** I see filter options for status: All, Draft, Published, Completed, Cancelled
**And** When I select a status filter, only events matching that status are displayed
**And** The filtering uses Anti-Flash Pattern with keepPreviousData and opacity transition
**And** Each event card shows title, date, status badge, and action buttons
**And** Empty state displays helpful message and "Create Event" call-to-action when no events exist

### Story 2.2: Création d'Événement avec Formulaire

As a user,
I want to create a new event with all required and optional fields,
So that I can organize information about upcoming activities.

**Acceptance Criteria:**

**Given** I want to create a new event
**When** I click "Create Event" button
**Then** I navigate to a full-screen form page (app/events/create)
**And** I see required fields (title, date) and optional fields (description, YouTube URL, image URL, status)
**And** Form validation uses React Hook Form + Zod schema
**And** When I fill required fields with valid data and click Save, the event is created
**And** I see success toast confirmation and return to event list
**And** When I leave required fields empty and click Save, I see clear validation errors
**And** I can cancel and return to list without saving

### Story 2.3: Affichage Détails d'Événement

As a user,
I want to see complete event information in a dedicated view,
So that I have all details at a glance.

**Acceptance Criteria:**

**Given** I want to view event details
**When** I click on an event from the list
**Then** I navigate to event details page (app/events/[id])
**And** I see all event information formatted clearly: title, description, date, status
**And** If event has YouTube URL, I see embedded video or preview
**And** If event has image URL, the image displays properly with optimization
**And** I have clear navigation back to the list
**And** I see action buttons for Edit and Delete

### Story 2.4: Modification d'Événement

As a user,
I want to modify existing events with pre-filled values,
So that I can keep information up-to-date.

**Acceptance Criteria:**

**Given** I want to edit an existing event
**When** I click Edit from event details or list
**Then** I navigate to full-screen edit form (app/events/[id]/edit)
**And** I see current values pre-filled in all form fields
**And** Form validation and behavior matches create form
**And** When I modify fields and save, the event is updated with confirmation toast
**And** When I click Cancel, no changes are saved and I return to previous view
**And** Updated event reflects changes immediately in lists and details

### Story 2.5: Suppression d'Événement avec Confirmation

As a user,
I want to remove events I no longer need with clear confirmation,
So that my list stays organized and I don't accidentally delete events.

**Acceptance Criteria:**

**Given** I want to delete an event
**When** I click the delete option from event details or list
**Then** I see an AlertDialog with clear confirmation message
**And** The dialog explains this action is irreversible
**And** When I confirm deletion, the event is permanently removed
**And** I see success toast and the event no longer appears in lists
**And** When I cancel deletion, the event remains unchanged
**And** Delete operation includes proper error handling

### Story 2.6: Validation et Gestion d'Erreurs

As a user,
I want clear validation feedback and error handling,
So that I understand how to fix issues and the application works reliably.

**Acceptance Criteria:**

**Given** I interact with forms and data operations
**When** validation errors or API errors occur
**Then** I see user-friendly error messages via typed toasts (error, warning)
**And** Form validation shows field-specific errors in real-time
**And** ClientResponseError from PocketBase is handled with appropriate status code responses
**And** Network errors show graceful fallbacks without breaking the UI
**And** Loading states prevent double-submission and show progress feedback

### Story 2.7: Intégration Médias YouTube

As a user,
I want to add and preview YouTube videos for events,
So that I can include rich media content with my event information.

**Acceptance Criteria:**

**Given** I want to include YouTube content in an event
**When** I enter a valid YouTube URL in the form
**Then** The URL is validated and stored correctly
**And** In event details view, I see YouTube video embedded or preview
**And** Invalid YouTube URLs show appropriate validation messages
**And** YouTube preview component handles various URL formats (youtube.com, youtu.be)
**And** Video embedding respects responsive design and loading performance

## Epic 3: Expérience Utilisateur Optimisée

L'application offre une expérience fluide, rapide et responsive sur tous les appareils avec performance optimisée, accessibilité et design mobile-first.

### Story 3.1: Interface Mobile-First Responsive

As a mobile user,
I want the app to work seamlessly on my device,
So that I can manage events on the go with the same functionality as desktop.

**Acceptance Criteria:**

**Given** I access the app on mobile device
**When** any page loads
**Then** All elements are properly sized and accessible following mobile-first patterns (p-2 md:p-4)
**And** Touch targets meet minimum size requirements for easy interaction
**And** Navigation and buttons adapt to mobile: h-9 w-9 sm:w-auto sm:px-4 with text hidden on mobile
**And** Forms remain usable with proper input focus and keyboard support
**And** Responsive breakpoints work correctly: sm (640px), md (768px), lg (1024px)
**And** Text scales appropriately: text-2xl sm:text-3xl for headers

### Story 3.2: Performance et États de Chargement

As any user,
I want the app to respond instantly with clear loading feedback,
So that I don't waste time waiting and understand what's happening.

**Acceptance Criteria:**

**Given** I perform any action in the application
**When** I interact with buttons, forms, or navigation
**Then** All async buttons show Loader2 spinner + disabled state during operations
**And** Page transitions happen without noticeable delay (< 500ms feedback)
**And** Initial loading shows skeletons, filtering changes show Anti-Flash Pattern
**And** Form submissions provide immediate feedback within 500ms
**And** No loading state blocks the interface for more than 2 seconds
**And** Loading states are consistent across all components

### Story 3.3: Optimisations de Performance Avancées

As a user,
I want smooth, fast interactions without lag or jarring reloads,
So that the application feels responsive and professional.

**Acceptance Criteria:**

**Given** I use interactive features like search and filtering
**When** I type in search fields or change filters
**Then** Search inputs have 300ms debounce to prevent excessive API calls
**And** Filter changes use keepPreviousData with opacity transition (Anti-Flash Pattern)
**And** Components use useMemo for expensive calculations and lookups
**And** Event handlers use useCallback for stable references
**And** Images are optimized with next/image for fast loading
**And** Only one overflow-y-auto container exists per page for scroll management

### Story 3.4: Accessibilité et Navigation Intuitive

As any user including those with accessibility needs,
I want to navigate and use the app without barriers,
So that the application is inclusive and easy to understand.

**Acceptance Criteria:**

**Given** I navigate the application with various input methods
**When** I use keyboard, screen reader, or other assistive technology
**Then** All interactive elements are keyboard accessible with clear focus indicators
**And** Screen readers can interpret the interface with proper ARIA labels
**And** Color contrast meets WCAG 2.1 AA standards with the warm pastel theme
**And** Navigation is logical and consistent across all pages
**And** Error messages are announced and clearly associated with form fields
**And** The interface is usable without documentation or training

### Story 3.5: Gestion d'État et Synchronisation

As a user,
I want my data to stay synchronized and the interface to reflect changes accurately,
So that I always see current information and my actions are reliably saved.

**Acceptance Criteria:**

**Given** I perform CRUD operations on events
**When** I create, update, or delete events
**Then** TanStack Query automatically invalidates and refetches relevant data
**And** UI updates immediately reflect server state changes
**And** Optimistic updates provide instant feedback before server confirmation
**And** Network failures are handled gracefully with retry logic
**And** Cache management prevents stale data display
**And** Real-time synchronization works across browser tabs