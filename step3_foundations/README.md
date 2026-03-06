# Event Manager — Demo SDD (OpenCode + Claude)

Application complète de gestion d'événements construite avec Spec-Driven Development.

> **Epic 1 : Infrastructure & Setup Technique** — ✅ **TERMINÉ**

## 🚀 Application Opérationnelle

**Stack Technique :**
- Next.js 15.5.12 + React 19 + TypeScript strict
- PocketBase backend avec Docker 
- shadcn/ui design system warm pastel
- TanStack Query pour data fetching
- 28 tests automatisés

## Structure

```
event-manager/
├── app/                 ← Pages Next.js App Router
│   ├── globals.css      ← Design system warm pastel (oklch)
│   ├── layout.tsx       ← Layout avec QueryProvider
│   ├── page.tsx         ← Page d'accueil
│   └── design-demo/     ← Démo design system
├── components/
│   ├── events/          ← Composants métier
│   ├── layout/          ← Layout components
│   └── ui/              ← shadcn/ui components (générés)
├── lib/
│   ├── types/           ← Types TypeScript (Event, EventStatus)
│   ├── hooks/           ← Hooks React (use-events.ts)
│   ├── providers/       ← QueryProvider TanStack Query
│   ├── pocketbase.ts    ← Client singleton
│   └── utils.ts         ← Utilitaires (cn function)
├── __tests__/           ← Tests (28/28 passants)
├── scripts/             ← Scripts setup (PocketBase)
├── AGENTS.md            ← Règles agent consolidées
├── docker-compose.yml   ← PocketBase containerisé
└── _bmad-output/        ← Stories Epic 1 complétées
```

## Serveurs MCP

| Serveur | Rôle | Config |
|---------|------|--------|
| **shadcn** | Registre officiel composants UI | `npx shadcn@latest mcp` |
| **PocketBase** | Schéma DB + CRUD en temps réel | `npx pocketbase-cursor-mcp --url=http://127.0.0.1:8090` |
| **Trello** | Board kanban + traçabilité tickets | `npx -y @modelcontextprotocol/server-trello` |

### Configuration Trello

1. Créer un Power-Up sur https://trello.com/power-ups/admin → récupérer l'API Key
2. Générer un token : `https://trello.com/1/authorize?expiration=never&scope=read,write&response_type=token&key=TA_CLE_API`
3. Exporter les variables d'environnement :

```bash
export TRELLO_API_KEY="ta-clé-api"
export TRELLO_TOKEN="ton-token"
```

## 🚀 Démarrage Rapide

### 1. Backend (PocketBase)

```bash
# Démarrer Docker + PocketBase
docker compose up pocketbase -d

# Vérifier que PocketBase répond
curl http://127.0.0.1:8090/api/health
```

### 2. Frontend (Next.js)

```bash
# Installer les dépendances
pnpm install

# Démarrer le serveur de développement  
pnpm dev
```

### 3. Setup PocketBase Admin

1. Aller sur **http://127.0.0.1:8090/_/**
2. Créer un compte admin
3. Créer la collection **events** avec ces champs :
   - **title** (text, required)
   - **description** (text, optional) 
   - **date** (date, required)
   - **youtube_url** (url, optional)
   - **status** (select: draft,published,completed,cancelled, required)
   - **image_url** (url, optional)

### 4. Tester l'Application

- **Page principale :** http://localhost:3000
- **Design demo :** http://localhost:3000/design-demo
- **PocketBase admin :** http://127.0.0.1:8090/_/

## ✅ Validation

```bash
# Tests automatisés (28/28 passants)
pnpm test

# Linter + TypeScript + Build
pnpm lint && pnpm type-check && pnpm build
```

## Learning Loop — L'agent qui s'améliore

L'agent ne repart pas de zéro à chaque session. Deux systèmes complémentaires :

**AGENTS.md** (partagé en git) — Tes instructions permanentes. L'équipe les maintient, elles évoluent avec le projet.

**memory/** (auto-généré, local) — L'agent enregistre ses corrections et découvertes entre les sessions. Tu le corriges une fois ("chez nous c'est pnpm, pas npm"), il ne refait plus l'erreur.

Comment alimenter le loop :
- Corriger l'agent explicitement : "Rappelle-toi que les formulaires sont toujours plein écran"
- Revoir la mémoire : `/memory` pour inspecter et nettoyer
- Cycle de maintenance : toutes les 2-3 semaines, demander à l'agent de revoir ses notes et les rules

Plus tu utilises l'agent, moins tu corriges. C'est de la valeur composée.

> Voir `playbook/agent-rules-guide.md` pour le détail du learning loop.

## Adaptation Claude Code

Pour utiliser avec Claude Code au lieu d'OpenCode :

```bash
mv AGENTS.md CLAUDE.md
# Le .mcp.json fonctionne tel quel avec les deux outils
```

## Playbook

Le dossier `playbook/` contient des guides pratiques pour l'équipe :

- `sdd-methodology.md` — La méthode SDD en 5 minutes
- `agent-rules-guide.md` — Écrire des rules efficaces
- `mcp-ecosystem.md` — L'écosystème MCP en 2026
- `human-in-the-loop.md` — Le dev comme architecte
- `migration-legacy.md` — Refonte legacy avec SDD

## Origine

Généralisé depuis Civic Forge (Cappasoft). Adapté de Supabase → PocketBase, design Warm Modern Pastel conservé, Trello MCP ajouté pour la traçabilité. Refactorisé de Cursor Rules (.mdc) → AGENTS.md tool-agnostic.

---

*Template SDD v2 — Février 2026 · Cappasoft*
