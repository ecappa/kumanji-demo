# Event Manager — Demo SDD (OpenCode + Claude)

Template de démonstration Spec-Driven Development, configuré pour OpenCode + Claude.

> **Tool-agnostic** : fonctionne aussi avec Claude Code (renommer `AGENTS.md` → `CLAUDE.md`).

## Structure

```
demo_base2/
├── AGENTS.md            ← Règles agent consolidées (architecture, qualité, patterns)
├── .mcp.json            ← 3 serveurs MCP (shadcn, PocketBase, Trello)
├── .env.local           ← Secrets Trello (NE PAS committer)
├── CONTEXT-PROMPT.md    ← Briefing kickoff (user stories, stack, démarrage)
├── SCENARIO-DEMO.md     ← Scénario de démo step-by-step
├── app/globals.css      ← Thème Warm Modern Pastel (oklch, light/dark)
├── docker-compose.yml   ← PocketBase containerisé
├── specs/               ← Spécifications et références
└── playbook/            ← Guides pratiques SDD
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

## Quick Start

```bash
# 1. Copier le template
cp -r demo_base2 event-manager && cd event-manager

# 2. Charger les secrets
source .env.local

# 3. Lancer PocketBase
docker compose up -d

# 4. Créer le projet Next.js
pnpm create next-app@latest . --typescript --tailwind --eslint --app --src=no --import-alias "@/*"

# 5. Restaurer le thème (écrasé par next-app)
git checkout -- app/globals.css

# 6. Dépendances
pnpm add @tanstack/react-query react-hook-form @hookform/resolvers zod pocketbase sonner lucide-react
pnpm add tw-animate-css

# 7. shadcn/ui
pnpm dlx shadcn@latest init   # style: new-york

# 8. Lancer l'agent
opencode                       # ou: claude (pour Claude Code)
```

Au démarrage de l'agent, lui donner `CONTEXT-PROMPT.md` comme briefing initial.

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
