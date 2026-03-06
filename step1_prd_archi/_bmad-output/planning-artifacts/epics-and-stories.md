---
stepsCompleted: 
  - step-01-validate-prerequisites
inputDocuments:
  - prd.md
  - architecture.md
workflowType: 'epics-and-stories'
project_name: 'base_opencode_instance1'
user_name: 'Eric'
date: '2026-02-24'
---

# base_opencode_instance1 - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for base_opencode_instance1, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1: Créer un événement (titre, description, date, URL YouTube, statut, image)
FR2: Lister tous les événements avec filtrage par statut
FR3: Voir les détails d'un événement
FR4: Modifier un événement existant
FR5: Supprimer un événement
FR6: Interface responsive et visuellement soignée
FR7: Navigation intuitive sans besoin d'explication ou de formation
FR8: Toutes les opérations CRUD (Create, Read, Update, Delete) fonctionnent sans friction

### NonFunctional Requirements

NFR1: L'utilisateur peut créer un événement complet en moins d'une minute
NFR2: Interface visuellement attrayante qui donne envie d'utiliser l'outil
NFR3: Application web responsive qui fonctionne sur desktop et mobile
NFR4: Performance rapide (chargement instantané, pas de latence visible)
NFR5: Code propre et maintenable pour faciliter les évolutions futures
NFR6: Page load time < 2 seconds on 3G connection
NFR7: Form submission feedback within 500ms
NFR8: Smooth animations and transitions (60 FPS)
NFR9: Interface usable without documentation or training
NFR10: Mobile-first responsive design
NFR11: Accessibility compliance (WCAG 2.1 AA basics)
NFR12: Cross-browser compatibility (Chrome, Safari, Firefox, Edge)
NFR13: 99.9% uptime during demo period
NFR14: Graceful error handling with user-friendly messages
NFR15: Input validation on both client and server

### Additional Requirements

- Next.js 15+ avec App Router setup
- React 19+ avec Server Components
- TypeScript strict configuration
- PocketBase Docker configuration avec collection Event
- shadcn/ui components integration
- Design system warm modern pastel implementation
- TanStack Query pour data fetching
- React Hook Form + Zod pour validation
- Anti-Flash Pattern pour les transitions
- Mobile-first responsive breakpoints
- Loading states obligatoires sur chaque bouton async
- Un seul overflow-y-auto par page
- Full-screen forms (jamais de dialogs pour formulaires)

### FR Coverage Map

- Epic 1 (Foundation & Infrastructure): Setup technique, architecture de base
- Epic 2 (Event Management Core): FR1, FR2, FR3, FR4, FR5, FR8 (opérations CRUD)
- Epic 3 (User Experience): FR6, FR7 (interface responsive et intuitive)

## Epic List

1. **Foundation & Infrastructure** - Setup technique et architecture de base
2. **Event Management Core** - Fonctionnalités CRUD essentielles pour les événements  
3. **User Experience** - Interface responsive, performance et expérience utilisateur

## Epic 1: Foundation & Infrastructure

Setup de l'application avec la stack technique définie et l'infrastructure de base pour supporter le développement des fonctionnalités métier.

### Story 1.1: Project Setup & Architecture

As a developer,
I want to initialize the project with the required technology stack,
So that I have a solid foundation to build the event management features.

**Acceptance Criteria:**

**Given** I need to start the project
**When** I run the initialization commands
**Then** I have a Next.js 15+ project with TypeScript, Tailwind CSS v4, and shadcn/ui configured
**And** the project structure follows the defined file organization (app/, components/events/, lib/)

**Given** I need the design system
**When** I check the styling setup
**Then** I have the warm modern pastel palette configured with oklch values
**And** mobile-first responsive breakpoints are properly defined

### Story 1.2: PocketBase Integration

As a developer,
I want to configure PocketBase with the Event collection,
So that I can store and retrieve event data.

**Acceptance Criteria:**

**Given** I need data persistence
**When** I set up PocketBase with Docker
**Then** PocketBase runs on localhost:8090 with the Event collection schema
**And** the Event collection has all required fields (id, title, description, date, youtube_url, status, image_url)

**Given** I need to connect frontend to backend
**When** I configure the PocketBase client
**Then** I have a singleton client with autoCancellation(false) for TanStack Query
**And** TypeScript types are defined for the Event model

### Story 1.3: Base Layout & Navigation

As a user,
I want consistent navigation and layout structure,
So that I can easily move through the application.

**Acceptance Criteria:**

**Given** I visit any page
**When** the page loads
**Then** I see a consistent header with sticky positioning (sticky top-0 z-10 bg-background)
**And** the navigation is intuitive and accessible

**Given** I'm on mobile
**When** I use the navigation
**Then** all elements are properly sized with mobile-first patterns (p-2 md:p-4)
**And** the layout remains usable across all screen sizes

## Epic 2: Event Management Core

Complete CRUD functionality for managing events with validation, error handling, and responsive design.

### Story 2.1: Create Event

As a user,
I want to create a new event,
So that I can organize information about upcoming activities.

**Acceptance Criteria:**

**Given** I want to create an event
**When** I click "Créer un événement"
**Then** I see a full-screen form (never a dialog) with all event fields
**And** required fields (title, date) are clearly marked

**Given** I fill in valid event data
**When** I click Save
**Then** the event is created with loading spinner and disabled button state
**And** I see a success toast notification and return to the event list

**Given** I submit invalid data
**When** validation runs
**Then** I see clear Zod validation errors with React Hook Form
**And** the form prevents submission until errors are corrected

### Story 2.2: List and Filter Events

As a user,
I want to see all my events with filtering options,
So that I can quickly find what I'm looking for.

**Acceptance Criteria:**

**Given** I visit the application
**When** the page loads
**Then** I see all events listed with proper loading states
**And** events are fetched using TanStack Query with keepPreviousData

**Given** I want to filter events by status
**When** I select a status filter (draft, published, completed, cancelled)
**Then** the list updates with Anti-Flash Pattern (opacity 60% + spinner)
**And** only events matching the selected status are shown

**Given** there are no events
**When** the list loads
**Then** I see an empty state with "Create Event" call-to-action
**And** the interface remains visually appealing

### Story 2.3: View Event Details

As a user,
I want to see complete event information,
So that I have all details at a glance.

**Acceptance Criteria:**

**Given** I click on an event in the list
**When** the details page loads
**Then** I see all event information formatted with the design system
**And** YouTube URLs are properly displayed/embedded

**Given** an event has an image
**When** I view the details
**Then** the image displays with proper responsive behavior
**And** images are handled securely with proper validation

**Given** I want to return to the list
**When** I use navigation
**Then** I have a clear back button or navigation path
**And** the transition is smooth without layout shifts

### Story 2.4: Edit Event

As a user,
I want to modify existing events,
So that I can keep information up-to-date.

**Acceptance Criteria:**

**Given** I select an event to edit
**When** the edit form loads
**Then** current values are pre-filled in a full-screen form
**And** the form uses React Hook Form + Zod validation patterns

**Given** I modify event data
**When** I save changes
**Then** the event updates with proper loading states and success feedback
**And** I return to the previous view with updated information

**Given** I want to cancel editing
**When** I click Cancel
**Then** no changes are saved and I return without modifications
**And** any unsaved changes are properly discarded

### Story 2.5: Delete Event

As a user,
I want to remove events I no longer need,
So that my list stays organized.

**Acceptance Criteria:**

**Given** I want to delete an event
**When** I select the delete option
**Then** I see an AlertDialog confirmation (the only allowed use of dialogs)
**And** the confirmation clearly states the action is irreversible

**Given** I confirm deletion
**When** the delete operation executes
**Then** the event is removed with proper loading states
**And** I return to the updated list with success feedback

**Given** I cancel deletion
**When** I click Cancel in the dialog
**Then** the event remains unchanged
**And** I return to the previous state without modifications

## Epic 3: User Experience

Responsive design, performance optimization, and polished user experience meeting all non-functional requirements.

### Story 3.1: Mobile-Responsive Interface

As a mobile user,
I want the app to work seamlessly on my device,
So that I can manage events on the go.

**Acceptance Criteria:**

**Given** I access the app on mobile
**When** any page loads
**Then** all elements use mobile-first responsive patterns (p-2 md:p-4, gap-2 md:gap-4)
**And** buttons adapt properly (h-9 w-9 sm:w-auto sm:px-4 with hidden text on mobile)

**Given** I interact with forms on mobile
**When** I fill in event data
**Then** the full-screen form works perfectly with touch interactions
**And** all fields remain accessible without horizontal scrolling

**Given** I browse the event list on mobile
**When** I scroll and filter
**Then** the interface maintains single overflow-y-auto container
**And** filter controls are compact (icons on mobile, text on sm+)

### Story 3.2: Performance & Loading States

As any user,
I want the app to respond instantly and provide clear feedback,
So that I don't waste time waiting or wondering what's happening.

**Acceptance Criteria:**

**Given** I perform any async operation
**When** I click buttons that trigger server requests
**Then** I see Loader2 spinners with disabled button states
**And** all async buttons follow the mandatory loading state pattern

**Given** I filter the event list
**When** I change filter options
**Then** the list updates with keepPreviousData + Anti-Flash Pattern
**And** I see opacity 60% + spinner during the transition (no skeleton on filter change)

**Given** I navigate between pages
**When** I move through the app
**Then** transitions are smooth and under 500ms for form feedback
**And** page loads are under 2 seconds even on 3G connections

### Story 3.3: Error Handling & Validation

As a user,
I want clear feedback when things go wrong,
So that I understand what happened and how to fix it.

**Acceptance Criteria:**

**Given** I encounter a form validation error
**When** I submit invalid data
**Then** I see specific Zod validation messages
**And** errors are displayed clearly without breaking the design

**Given** I encounter a network error
**When** PocketBase operations fail
**Then** I see appropriate toast notifications (toast.error())
**And** ClientResponseError handling provides meaningful user feedback

**Given** I experience loading states
**When** I wait for operations to complete
**Then** loading indicators are consistent across the app
**And** I never see jarring content shifts or blank screens