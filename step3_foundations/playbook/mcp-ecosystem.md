# MCP — L'écosystème en 2026

> Model Context Protocol : comment tes agents parlent au monde réel.
> Sans MCP, l'IA génère du texte. Avec MCP, elle agit.

---

## C'est quoi MCP

MCP (Model Context Protocol), c'est le "USB-C des agents IA". Un protocole standard qui permet à n'importe quel agent de se connecter à n'importe quel outil — base de données, API, board de tâches, registre de composants, etc.

Avant MCP : l'agent travaille en isolation. Il invente des schémas de DB, devine les noms de composants, et n'a aucune idée de l'état réel de ton projet.

Avec MCP : l'agent consulte la source de vérité en temps réel. Il voit le vrai schéma, les vrais composants, les vraies cartes du board.

## Les 3 MCP de cette démo

### shadcn MCP — Le registre UI

```json
{ "command": "npx", "args": ["shadcn@latest", "mcp"] }
```

**Ce que ça fait :** L'agent peut chercher, inspecter et installer des composants shadcn/ui directement depuis le registre officiel.

**Pourquoi c'est important :** Sans ça, l'agent écrit des composants "de mémoire" — souvent une version périmée ou inventée. Avec le MCP, il va chercher le code source exact du composant, version à jour.

**Réflexe :** AVANT d'écrire n'importe quel composant UI, l'agent doit chercher dans le registre shadcn.

### PocketBase MCP — La DB en temps réel

```json
{ "command": "npx", "args": ["pocketbase-cursor-mcp", "--url=http://127.0.0.1:8090"] }
```

**Ce que ça fait :** L'agent peut lister les collections, vérifier les schémas, créer des records, modifier la structure — directement depuis le code.

**Pourquoi c'est important :** Plus de "ah, le champ s'appelle comment déjà ?". L'agent voit le schéma réel et génère des queries qui matchent.

**Réflexe :** AVANT d'écrire une query PocketBase, l'agent doit vérifier le schéma de la collection.

### Trello MCP — La traçabilité

```json
{
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-trello"],
  "env": { "TRELLO_API_KEY": "${TRELLO_API_KEY}", "TRELLO_TOKEN": "${TRELLO_TOKEN}" }
}
```

**Ce que ça fait :** L'agent lit le board, voit les cartes, les déplace entre colonnes, en crée de nouvelles.

**Pourquoi c'est important :** La traçabilité ticket → code → test est automatique. Plus de "j'ai oublié de déplacer la carte". Le commit est lié à la carte. La carte avance avec le code.

**Réflexe :** AVANT de coder, identifier la carte Trello. Déplacer en "In Progress". Après les tests, déplacer en "Done".

## L'écosystème MCP en 2026

Le protocole a explosé. Voici les catégories de serveurs MCP les plus utiles :

### Bases de données & Backend
- **PocketBase** — DB locale, zéro config, parfait pour prototypage
- **Supabase** — PostgreSQL managé, auth, realtime
- **Prisma** — ORM, migrations, schéma typé
- **Neon** — PostgreSQL serverless

### UI & Design
- **shadcn/ui** — Registre de composants React
- **Figma** — Accès aux designs, tokens, composants
- **Storybook** — Documentation de composants live

### Gestion de projet
- **Trello** — Boards kanban, cartes, automatisation
- **Linear** — Issues, cycles, projets (plus dev-oriented)
- **GitHub Issues/Projects** — Intégration native si déjà sur GitHub
- **Jira** — Pour les équipes enterprise

### Code & DevOps
- **GitHub** — Repos, PRs, actions, code search
- **GitLab** — Même chose, écosystème GitLab
- **Docker** — Gestion de containers
- **Vercel** — Déploiement, preview URLs

### Communication & Docs
- **Slack** — Messages, channels, threads
- **Notion** — Wikis, bases de données, docs
- **Google Drive** — Docs, Sheets, accès fichiers

## Configuration

### Format `.mcp.json` (project-scoped)

```json
{
  "mcpServers": {
    "nom-du-serveur": {
      "type": "stdio",
      "command": "npx",
      "args": ["package-name", "--options"],
      "env": {
        "API_KEY": "${MA_VARIABLE_ENV}"
      }
    }
  }
}
```

**Points clés :**
- `${VARIABLE}` → expansion de variables d'environnement (pas de secrets en dur dans le fichier)
- Le fichier se checke en git — les secrets restent dans les variables d'env
- Fonctionne avec OpenCode et Claude Code

### Types de transport

| Type | Usage | Exemple |
|------|-------|---------|
| **stdio** | Serveurs locaux (npx, binaires) | shadcn, PocketBase |
| **http** | APIs distantes | Services cloud managés |
| **sse** | Streaming (deprecated → http) | Legacy |

## Quand utiliser MCP vs quand s'en passer

**Utilise MCP quand :**
- L'agent doit consulter une source de vérité externe (schéma DB, registre, board)
- La donnée change (pas un fichier statique)
- Tu veux de la traçabilité automatique (tickets, commits)

**Skip MCP quand :**
- L'info est déjà dans le code source (l'agent la lit de toute façon)
- C'est un prototype jetable de 30 minutes
- Le serveur MCP n'est pas stable ou maintenu

## Message pour les sceptiques

MCP, c'est pas un gadget. C'est ce qui fait la différence entre "l'IA qui génère du texte" et "l'IA qui travaille dans ton écosystème". Sans MCP, on est encore en 2023 — des prompts dans un chat. Avec MCP, l'agent est un membre de l'équipe qui a accès aux mêmes outils que toi.

Et tout ce qu'on utilise ici — PocketBase, Trello, shadcn — c'est gratuit. Zéro excuses pour ne pas essayer.

---

*"Un agent sans MCP, c'est comme un dev à qui tu donnes un ordi sans internet. Il peut coder, mais il travaille en aveugle."*
