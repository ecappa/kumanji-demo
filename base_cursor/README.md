# Event Manager — Démo Spec-Driven Development

Base de démo pour l'atelier SDD. Ce répertoire contient les Cursor Rules généralisées, les MCP servers et le contexte pour démarrer le projet.

## Contenu

```
demo_base/
├── CONTEXT-PROMPT.md              # Prompt à donner à l'IA pour démarrer
├── docker-compose.yml             # PocketBase en un docker compose up
├── README.md                      # Ce fichier
├── app/
│   └── globals.css                # Thème "Warm Modern Pastel" (oklch)
├── .cursor/
│   ├── mcp.json                   # MCP servers (shadcn + PocketBase + Trello)
│   └── rules/
│       ├── 001-workspace.mdc      # Stack et principes (always apply)
│       ├── 100-architecture.mdc   # Structure CRUD, pages plein écran
│       ├── 101-coding-standards.mdc # TypeScript, naming, commits
│       ├── 102-components.mdc     # shadcn/ui, toast, tables
│       ├── 103-pocketbase.mdc     # Client PB, hooks, erreurs
│       ├── 104-performance.mdc    # Debounce, Anti-Flash, memoization
│       ├── 105-loading-states.mdc # Spinners, disabled, feedback
│       ├── 106-responsive.mdc     # Mobile-first, breakpoints
│       ├── 107-file-naming.mdc    # Conventions de nommage
│       ├── 108-design-system.mdc  # Charte graphique Warm Modern Pastel (always apply)
│       ├── 109-mcp-registry.mdc   # Réflexes MCP obligatoires (always apply)
│       └── 200-anti-patterns.mdc  # Interdictions et checklist (always apply)
└── specs/
    └── README.md                  # Guide des références front-end
```

## MCP Servers

| MCP | Rôle | Configuration |
|-----|------|---------------|
| **shadcn** | Registre UI — rechercher, inspecter, installer des composants | `npx shadcn@latest mcp` |
| **PocketBase** | Backend — gérer collections, records, schema | `npx pocketbase-cursor-mcp --url=http://127.0.0.1:8090` |
| **Trello** | Traçabilité — lire/créer/déplacer des cartes sur le board | `npx -y @modelcontextprotocol/server-trello` |

Les MCPs sont configurés dans `.cursor/mcp.json`. Après ouverture dans Cursor, vérifier qu'ils affichent un point vert dans Settings > MCP.

### Configuration Trello

Pour activer le MCP Trello, remplacer les placeholders dans `.cursor/mcp.json` :

1. Obtenir une API key : https://trello.com/power-ups/admin → créer un Power-Up → copier la clé
2. Générer un token : `https://trello.com/1/authorize?expiration=never&scope=read,write&response_type=token&key=VOTRE_API_KEY`
3. Coller les valeurs dans `mcp.json` (champs `TRELLO_API_KEY` et `TRELLO_TOKEN`)

> Note : Fonctionne avec la version gratuite de Trello (mêmes limites API que les plans payants).
>
> Board de démo : https://trello.com/invite/b/698b8db40872ce90e5a8e1f5/ATTI95226e8d7a99565189fa7296fb91481c4B5E35DC/demo

## Démarrage rapide

```bash
# 1. Copier ce dossier comme base de projet
cp -r demo_base/ event-manager/
cd event-manager/

# 2. Lancer PocketBase
docker compose up -d

# 3. Créer le projet Next.js (le globals.css sera écrasé — le restaurer après)
pnpm create next-app@latest . --typescript --tailwind --eslint --app --src-dir=false

# 4. Restaurer le globals.css Warm Modern Pastel
# (copier app/globals.css depuis la backup si écrasé par create-next-app)

# 5. Installer les dépendances
pnpm add pocketbase @tanstack/react-query react-hook-form @hookform/resolvers zod sonner lucide-react
pnpm add -D @types/node

# 6. Installer shadcn/ui
pnpm dlx shadcn@latest init
# → Style: new-york, Base color: gray, CSS variables: yes

# 7. Installer tw-animate-css (requis par globals.css)
pnpm add tw-animate-css

# 8. Ouvrir dans Cursor — vérifier les MCP (point vert) et démarrer avec CONTEXT-PROMPT.md
```

## Origine

Rules généralisées à partir du projet Civic Forge (Cappasoft).
Adaptées de Supabase → PocketBase pour la démo.
Charte graphique "Warm Modern Pastel" conservée de Civic Forge.
Trello MCP ajouté pour la boucle de traçabilité (remplace Jira).
