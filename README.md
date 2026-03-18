# Atelier Spec-Driven Development — Repo de démonstration

> **Kumojin | Mars 2026 | Consultant : Eric - Cappasoft**
>
> Ce repo contient les étapes progressives de la démonstration live
> présentée lors de l'atelier. Chaque dossier `step*` représente un
> checkpoint de la démo, de la page blanche à l'application fonctionnelle.

---

## Le problème

L'IA sans spécification, c'est construire une maison sans plan d'architecte.
Le « vibe coding » produit du code rapidement, mais il ne scale pas :
duplication, incohérence, dette technique dès le premier sprint.

Le Spec-Driven Development (SDD) inverse l'approche : **on spécifie d'abord,
on génère ensuite, on valide toujours**.

## Les 3 piliers

| Pilier | Rôle | Outil utilisé |
|--------|------|---------------|
| **BMAD** | Spécification structurée (PRD, architecture, user stories) | [BMAD Method v6](https://github.com/bmad-code-org/BMAD-METHOD) |
| **Agent Rules** | Garde-fous qualité — l'IA respecte VOS standards | `AGENTS.md` (tool-agnostic) |
| **MCP** | Connexion agents ↔ outils réels (DB, registres, board) | Model Context Protocol |

## Les étapes de la démo

Chaque dossier est un snapshot autonome correspondant à une phase de la démonstration.

| Dossier | Phase | Contenu |
|---------|-------|---------|
| `step0_base/` | Point de départ | Repo vide avec `AGENTS.md`, `.mcp.json`, `docker-compose.yml`, design system CSS, briefing initial. Aucun code d'implémentation. |
| `step1_prd_archi/` | BMAD — PRD + Architecture | Sortie de l'agent PM (PRD avec user stories et critères d'acceptation) + sortie de l'agent Architect (décisions techniques, structure projet). |
| `step2_epics_stories/` | BMAD — Epics & Stories | Découpage en 3 epics et 6+ user stories détaillées avec acceptance criteria, composants à créer, snippets techniques. |
| `step3_foundations/` | Code — Infrastructure | Projet Next.js 15 fonctionnel : App Router, TypeScript strict, shadcn/ui, PocketBase client, design system Warm Modern Pastel, hooks CRUD, 28 tests d'infra. |
| `step4_epic2_crud/` | Code — CRUD complet | Application complète : liste, création, détail, édition, suppression d'événements. Filtres par statut, embed YouTube, formulaires plein écran, validation Zod. |

### Naviguer entre les étapes

Chaque step est un projet autonome. Pour explorer une étape :

```bash
cd step3_foundations    # ou n'importe quel step
pnpm install           # steps 3 et 4 uniquement
docker compose up -d   # PocketBase
pnpm dev               # http://localhost:3000
```

## Stack technique

| Couche | Technologie |
|--------|-------------|
| Frontend | Next.js 15+, React 19, TypeScript strict, Tailwind CSS v4 |
| UI | shadcn/ui, Lucide React, Sonner (toasts) |
| Data | TanStack Query, React Hook Form + Zod |
| Backend | PocketBase (Docker) |
| Agents | BMAD v6 (skills), AGENTS.md, MCP |

## Serveurs MCP configurés

Chaque step contient un `.mcp.json` avec 3 serveurs :

| Serveur | Ce qu'il fait |
|---------|---------------|
| **shadcn** | Registre officiel composants UI — l'IA cherche les composants au lieu de les inventer |
| **PocketBase** | Schéma DB en temps réel — l'IA consulte la structure avant de coder |
| **Trello** | Board kanban — traçabilité ticket → commit (nécessite API key, voir ci-dessous) |

## Prérequis

- **Node.js** 18+ et **pnpm**
- **Docker Desktop** (pour PocketBase)
- Un IDE compatible agents : OpenCode, Claude Code, Cursor, ou similaire

## Configuration locale

### PocketBase

```bash
cd step3_foundations  # ou step4_epic2_crud
docker compose up -d
curl http://127.0.0.1:8090/api/health
```

Admin UI : http://127.0.0.1:8090/_/

### Trello MCP (optionnel)

Le serveur Trello nécessite des credentials propres. Créer un fichier `.env.local` dans le step concerné :

```bash
TRELLO_API_KEY=votre-clé-api
TRELLO_TOKEN=votre-token
```

Obtenir les credentials :
1. Créer un Power-Up sur https://trello.com/power-ups/admin
2. Générer un token : `https://trello.com/1/authorize?expiration=never&scope=read,write&response_type=token&key=VOTRE_CLE`

## Fichiers clés dans chaque step

| Fichier | Rôle |
|---------|------|
| `AGENTS.md` | Rules agent — architecture, patterns, conventions, anti-patterns. C'est le code review automatique. |
| `CONTEXT-PROMPT.md` | Briefing initial — le « brief client » donné à l'agent au démarrage. |
| `.mcp.json` | Configuration des 3 serveurs MCP (shadcn, PocketBase, Trello). |
| `docker-compose.yml` | PocketBase containerisé, prêt à l'emploi. |
| `app/globals.css` | Design system Warm Modern Pastel (oklch, light/dark). |
| `specs/` | Spécifications et documents de référence (PRD, architecture). |

## Sécurité et exclusions

Les éléments suivants sont exclus du repo via `.gitignore` :

- `.env.local` — secrets Trello (API key, token)
- `node_modules/` — dépendances
- `.next/` — build Next.js
- `pb_data/` — bases de données PocketBase locales
- `_bmad-output/` — cache BMAD
- `.opencode/` — config locale OpenCode

Les credentials PocketBase présents dans les `AGENTS.md` (`admin@demo.local` / `Demo1234!`) sont des credentials de développement local uniquement, sans risque de sécurité.

**Pour utiliser ce repo :** créer un fichier `.env.local` avec vos propres clés Trello si vous souhaitez tester le MCP Trello. Les serveurs shadcn et PocketBase fonctionnent sans configuration supplémentaire.

## Concepts démontrés

### BMAD — Équipe agile simulée
Pas un chatbot, une équipe d'agents spécialisés. Le PM structure le PRD, l'Architect pose les décisions techniques, le Scrum Master découpe en stories. Chaque agent produit un livrable documenté. L'humain valide à chaque étape.

### Agent Rules — Le code review automatique
Un fichier `AGENTS.md` de ~150 lignes qui encode les standards de l'équipe : architecture, patterns, conventions, anti-patterns. L'IA les respecte pendant la génération, pas après. Tool-agnostic : fonctionne avec OpenCode, Claude Code, Cursor.

### MCP — L'IA connectée au monde réel
Sans MCP, l'IA travaille en isolation. Avec MCP, elle consulte le schéma de la DB, cherche dans le registre de composants, lit le board de gestion. Un protocole standard, comme un USB-C pour les agents.

### Human-in-the-loop
Le développeur n'est pas remplacé. Il est promu architecte : il définit les règles du jeu, valide les specs, orchestre les agents, vérifie le résultat. 80% planification et review, 20% exécution.

## Références

- [BMAD Method](https://github.com/bmad-code-org/BMAD-METHOD) — Framework de spécification pour agents IA
- [Model Context Protocol](https://modelcontextprotocol.io/) — Standard de connexion agents ↔ outils
- [shadcn/ui](https://ui.shadcn.com/) — Composants UI React
- [PocketBase](https://pocketbase.io/) — Backend open source en un binaire

---

*Atelier SDD — Mars 2026 · Cappasoft*
