# Scénario de démo live — SDD avec OpenCode + Claude

> Event Manager | Structure révisée pour Lukasz | Mars 2026

---

## Carte des dossiers — Checkpoints pré-construits

Chaque étape de la démo a un dossier pré-construit. Si la génération live traîne, **copie le dossier correspondant** et continue depuis là. L'audience ne verra pas la différence.

| Dossier | Correspond à | Contenu |
|---------|-------------|---------|
| `base_cursor/` | Point de départ | Repo vide avec AGENTS.md, .mcp.json, docker-compose, globals.css |
| `step1_prd_archi/` | Fin Étape 2 (2.1→2.5) | + PRD, architecture (sortie PM + Architect) |
| `step2_epics_stories/` | Fin Étape 2 (2.6) | + Epics découpés, 6 stories détaillées (sortie Scrum Master) |
| `step3_foundations/` | Fin Étape 3 | + Projet Next.js, shadcn, PocketBase, design system, types, hooks (Epic 1 infra) |
| `step4_epic2_crud/` | Fin Étape 4 | + CRUD complet : liste, création, détail, édition, suppression (Epic 2 événements) |
| `step5_quality/` | Fin Étape 5 | + Tests E2E, linters propres, build clean (à préparer) |

**Comment basculer :**
```bash
# Exemple : l'étape 3 traîne → charger step3 et continuer
cp -r step3_foundations/ mon-projet/
cd mon-projet && pnpm install
```

---

## Directive de post-traitement — À appliquer après chaque feature

> **OBLIGATOIRE.** À chaque fois qu'une feature est implémentée, exécuter cette boucle de validation complète avant de passer à la suite.

1. **Linter** — Vérifier qu'aucune erreur de lint n'est présente
2. **Typecheck** — Vérifier que le typage TypeScript est correct (zéro erreur)
3. **Build** — Lancer `pnpm build` et s'assurer que la compilation passe sans erreur
4. **Test navigateur** — Naviguer avec un browser sur la feature et vérifier :
   - Aucune erreur JavaScript dans la console
   - Le backend répond correctement (appels API, données affichées)

Si une étape échoue, corriger avant de continuer. Ne jamais avancer avec un lint, un typecheck ou un build cassé.

---

## Étape 0 — Setup & validation (AVANT la démo)

### 0.1 Variables d'environnement

Charger les credentials depuis `.env.local` :

```bash
source .env.local
echo $TRELLO_API_KEY    # doit afficher la clé
echo $TRELLO_TOKEN      # doit afficher le token
```

Si vide → vérifier que `.env.local` est présent à la racine du projet.

### 0.2 BMAD — Installation

BMAD est le moteur de spécification. Il fournit des agents spécialisés (Analyst, PM, Architect, etc.) qui structurent le brief en PRD, user stories, architecture. C'est le coeur de la démo.

**Installation via npx :**

```bash
npx bmad-method install
```

Le wizard demande :
- IDE cible → choisir **Claude Code** (ou OpenCode selon le setup)
- Dossier de destination → accepter le défaut

**Vérification :**

```bash
ls .bmad/          # Doit montrer les agents, templates, personas
```

### 0.2b Fix template path connu (bug BMAD)

Le workflow `create-epics-and-stories` cherche `epics-template.md` au mauvais niveau. Le fichier existe dans `templates/` mais le step le cherche à la racine du workflow. Fix :

```bash
cp _bmad/bmm/workflows/3-solutioning/create-epics-and-stories/templates/epics-template.md \
   _bmad/bmm/workflows/3-solutioning/create-epics-and-stories/epics-template.md
```

> Réf : [Issue #1250](https://github.com/bmad-code-org/BMAD-METHOD/issues/1250) — broken file references entre versions. Vérifier à chaque mise à jour de BMAD.

Les agents BMAD disponibles :
- **Business Analyst** — Analyse le besoin, identifie les stakeholders, les contraintes
- **Product Manager** — Génère le PRD, user stories, critères d'acceptation
- **System Architect** — Propose l'architecture, le découpage technique, les patterns
- **Scrum Master** — Organise en sprints, priorise, découpe en tâches
- **Developer** — Implémente selon les specs
- **UX Designer** — Wireframes, flows utilisateur

**Ce que tu dis à l'audience :**
- "BMAD c'est pas UN agent, c'est une ÉQUIPE d'agents spécialisés. Chacun a son rôle, comme dans une vraie équipe agile."
- "L'humain reste le décideur. Les agents proposent, tu valides."

> Référence : https://github.com/bmad-code-org/BMAD-METHOD

### 0.3 Docker & PocketBase

```bash
# Lancer PocketBase
docker compose up -d

# Vérifier qu'il tourne
docker ps | grep pocketbase

# Vérifier qu'il répond
curl -s http://127.0.0.1:8090/api/health | jq
```

Résultat attendu : `{"code":200,"message":"API is healthy"}`.

Si Docker ne tourne pas → fallback SQLite fichier (zéro dépendance).

### 0.4 MCP servers

Lancer OpenCode (ou Claude Code) et vérifier que les 3 serveurs MCP sont connectés :
- shadcn → OK
- PocketBase → OK
- Trello → OK

Si un serveur est en erreur → vérifier les variables d'env, relancer.

### 0.5 Trello board

Vérifier que le board "Event Manager" est accessible :
- 3 colonnes : To Do · In Progress · Done
- Cartes US-001 à US-005 dans "To Do"
- Board de démo : https://trello.com/invite/b/698b8db40872ce90e5a8e1f5/ATTI95226e8d7a99565189fa7296fb91481c4B5E35DC/demo

### 0.6 Repo clean

```bash
ls -la
# Doit montrer : AGENTS.md, .mcp.json, CONTEXT-PROMPT.md, README.md,
#                app/globals.css, docker-compose.yml, .env.local, .bmad/
# PAS de node_modules, PAS de .next, PAS de code source
```

### 0.7 Vérifier les dossiers de fallback

```bash
# Chaque step doit avoir des node_modules propres (symlinks pnpm)
cd step3_foundations && pnpm install && cd ..
cd step4_epic2_crud && pnpm install && cd ..
# step5_quality quand prêt
```

---

## Étape 1 — Intro & contexte SDD (5 min)

### Ce que tu fais
- Slides 1-3 (BMAD, Rules, MCP)
- Pas trop de slides — l'essentiel passe dans la démo

### Ce que tu dis
- "Le vibe coding c'est rapide mais ça scale pas"
- "On va construire une app de zéro en 30 minutes, en live, et le code va être propre"
- "Trois piliers : BMAD pour la spec, Agent Rules pour la qualité, MCP pour la traçabilité"

### Transition
- "Assez de slides. On code."

---

## Étape 2 — BMAD en profondeur (20-25 min)

> **Fallback :** `step1_prd_archi/` (après 2.5) ou `step2_epics_stories/` (après 2.6)

C'est le coeur de l'atelier. Lukasz voulait plus de temps ici. BMAD est le différenciateur — c'est ce qui transforme un prompt vague en specs exploitables.

### 2.1 Présenter les agents BMAD (3 min)

Montrer `.bmad/` et expliquer l'équipe d'agents :

**Ce que tu dis :**
- "BMAD, c'est pas un chatbot. C'est une équipe agile simulée. Chaque agent a un rôle précis."
- "Le Business Analyst comprend le besoin. Le PM structure les user stories. L'Architecte pose la technique. Exactement comme dans vos équipes — sauf que c'est en 5 minutes au lieu de 3 meetings."
- "Et le plus important : chaque agent produit un LIVRABLE. Pas du blabla, un document structuré qu'on peut valider et itérer."

### 2.2 Le brief (2 min)

Montrer l'écran : repo vide, aucun code.

**Ce que tu dis :**
- "On a un besoin simple : un gestionnaire d'événements. Liste, détails, lien YouTube, persistance."
- "On va demander à l'agent PM de BMAD de transformer ce brief en PRD."

Lancer l'agent Product Manager BMAD :

```
/bmad-pm

Brief : Je veux créer un gestionnaire d'événements. Chaque événement a
un titre, une description, une date, un lien YouTube, un statut
(draft/published/completed/cancelled) et une image optionnelle.
L'utilisateur peut lister, créer, voir le détail, modifier et supprimer
des événements.
```

### 2.3 Génération du PRD par l'agent PM (5-7 min)

Pendant que l'agent PM génère, parler :

**Talking points :**
- "L'agent PM connaît la structure d'un bon PRD. Il va générer des user stories avec des critères d'acceptation testables, pas des bullet points vagues."
- "Comparez avec un prompt nu dans ChatGPT — résultat imprévisible. Ici, l'agent a un RÔLE et des TEMPLATES."
- "L'agent lit aussi les AGENTS.md — il connaît déjà notre stack, nos conventions, nos anti-patterns."

### 2.4 Review du PRD (5-7 min)

Montrer le PRD généré. Pointer :
- Les user stories (US-001 à US-005)
- Les critères d'acceptation (testables, pas vagues)
- Le fait que c'est ÉDITABLE — l'humain valide, ajuste, complète

**Ce que tu dis :**
- "Regardez — c'est pas juste du texte vague. Y'a des critères testables, une architecture, un découpage."
- "Et l'humain reste aux commandes. Je peux modifier n'importe quoi avant de passer à l'architecte."
- "C'est ça le human-in-the-loop : les agents proposent, le dev senior valide."

### 2.5 Spec → Architecture avec l'agent Architect (5 min)

Passer le PRD à l'agent System Architect de BMAD :

```
/bmad-architect

Voici le PRD validé. Propose une architecture technique pour ce projet.
Stack cible : Next.js 15+, React 19, TypeScript, PocketBase, shadcn/ui.
```

**Ce que tu montres :**
- La structure de fichiers générée respecte les conventions de AGENTS.md
- Les patterns architecturaux (full-screen forms, sticky header, Anti-Flash) sont intégrés
- Le design system est déjà spécifié (Warm Modern Pastel)

**Ce que tu dis :**
- "Deux agents, deux livrables. Le PM a fait le QUOI, l'Architecte fait le COMMENT."
- "Et l'Architecte respecte les rules — il sait que chez nous c'est full-screen forms, pas de dialogs, un seul scroll par page."
- "C'est ça la différence entre spec-driven et vibe coding : la prévisibilité."

> **⏱ Si ça traîne →** Charger `step1_prd_archi/` qui contient le PRD + architecture pré-générés.

### 2.6 Découpage en Epics & Stories (optionnel, 3-5 min)

Si le temps le permet, montrer le Scrum Master BMAD découpant en epics et stories :

```
/bmad-sm

Découpe le PRD et l'architecture en epics et user stories implémentables.
```

**Ce que tu montres :**
- 3 Epics : Infrastructure, Gestion Événements, Expérience Utilisateur
- 6 stories détaillées avec acceptance criteria, composants à créer, snippets techniques

**Ce que tu dis :**
- "Trois agents, trois livrables. PM → PRD. Architecte → Architecture. Scrum Master → Stories prêtes à coder."
- "Chaque story a des critères d'acceptation testables. C'est ça qui va driver nos tests plus tard."

> **⏱ Si ça traîne →** Charger `step2_epics_stories/` qui contient PRD + archi + epics + stories.

### Transition
- "Maintenant qu'on a notre spec et notre architecture, on génère le code. Et c'est là que les Agent Rules brillent."

---

## Étape 3 — Foundations : Infrastructure & Design System (10 min)

> **Fallback :** `step3_foundations/`
> **Ce qu'on implémente :** Epic 1 — Infrastructure (stories 1.1 à 1.4)

### 3.1 Montrer les rules (2 min)

Ouvrir `AGENTS.md` et montrer rapidement :
- Les non-négociables (TypeScript strict, un seul scroll, full-screen forms)
- Le design system (oklch, tokens sémantiques)
- Les anti-patterns (ce qui est INTERDIT)

**Ce que tu dis :**
- "C'est un fichier. 150 lignes. Et c'est tool-agnostic — ça marche avec n'importe quel agent."
- "Les rules, c'est votre code review automatique qui s'applique PENDANT la génération."
- "BMAD a fait la spec. Les rules vont faire respecter la qualité pendant l'implémentation."

### 3.2 Générer les foundations (8 min)

Donner le contexte à l'agent : spec + architecture + stories 1.1 à 1.4.

**Ce qu'on demande :**
- Init Next.js 15+ avec App Router, TypeScript strict
- Setup PocketBase (client, types)
- Design system shadcn/ui (Warm Modern Pastel)
- Architecture TypeScript (types Event, hooks CRUD, providers)

Pendant la génération :

**Talking points :**
- "Sans rules, l'agent met les styles inline, mélange la logique et l'UI, choisit une structure random. Avec les rules, c'est prévisible."
- "Le dev comme architecte : mon rôle c'est pas d'écrire le code, c'est de définir les règles du jeu."
- "Regardez les MCP en action — quand l'agent a besoin d'un composant Table, il va chercher dans le registre shadcn. Pour la DB, il consulte le schema PocketBase en temps réel."

### 3.3 Validation rapide

```bash
pnpm dev
```

Ouvrir le navigateur → montrer la page d'accueil (placeholder) et `/design-demo`.

**Ce que tu montres :**
- Le design system est chargé (couleurs, typo, composants shadcn)
- L'infra est en place (Next.js tourne, PocketBase connecté)
- Les types et hooks sont prêts pour le CRUD

**Ce que tu dis :**
- "L'infra est posée. Design system, types, hooks, PocketBase. Maintenant on branche les features."

> **⏱ Si ça traîne →** Charger `step3_foundations/` et lancer `pnpm install && pnpm dev`.

### Ce que `step3_foundations/` contient

```
app/page.tsx                    ← placeholder "Next.js 15+ Initialisé"
app/design-demo/page.tsx        ← démo visuelle du design system
app/globals.css                 ← tokens oklch Warm Modern Pastel
components/ui/                  ← 10 composants shadcn (button, table, form, toast...)
components/events/              ← VIDE (pas encore de CRUD)
lib/types/event.ts              ← interface Event + EventStatus
lib/hooks/use-events.ts         ← hooks TanStack Query (useEvents, useCreate, useUpdate, useDelete)
lib/pocketbase.ts               ← client PocketBase configuré
lib/providers/query-provider.tsx ← provider React Query
__tests__/                      ← 4 tests d'infra (setup, pocketbase, design-system, architecture)
```

### Transition
- "L'infra est posée. Maintenant on construit le CRUD — la partie que vos utilisateurs voient."

---

## Étape 4 — CRUD complet : le "moment wow" (10-12 min)

> **Fallback :** `step4_epic2_crud/`
> **Ce qu'on implémente :** Epic 2 — Gestion d'Événements (stories 2.1 + 2.2 + CRUD complet)

### 4.1 Générer la liste des événements — Story 2.1 (4 min)

Donner la story 2.1 à l'agent :

**Ce qu'on demande :**
- `components/events/event-list.tsx` — liste principale
- `components/events/event-card.tsx` — carte individuelle
- `components/events/event-filters.tsx` — filtres par status
- `components/events/status-badge.tsx` — badge statut
- Refonte de `app/page.tsx` — affiche la vraie liste
- Anti-Flash Pattern (opacity transition pendant le fetch)
- Empty state avec CTA "Créer un événement"

**Talking points :**
- "L'agent a la story avec les acceptance criteria. Il sait exactement quoi construire."
- "Le Anti-Flash Pattern vient des rules AGENTS.md — l'agent ne l'invente pas, il l'applique."

### 4.2 Générer le formulaire de création — Story 2.2 (4 min)

Donner la story 2.2 à l'agent :

**Ce qu'on demande :**
- `app/events/create/page.tsx` — page full-screen
- `components/events/event-form.tsx` — formulaire réutilisable
- `lib/validations/event-schema.ts` — schema Zod
- Validation React Hook Form + Zod
- Toast de confirmation + navigation retour

**Talking points :**
- "Full-screen form, pas une modale. C'est dans les rules. L'agent respecte."
- "Zod pour la validation, React Hook Form pour le state. Pas de solutions artisanales."

### 4.3 Compléter le CRUD (détail, édition, suppression) (3 min)

**Ce qu'on demande :**
- `app/events/[id]/page.tsx` — page de détail avec embed YouTube
- `app/events/[id]/edit/page.tsx` — formulaire d'édition (réutilise event-form)
- Suppression avec confirmation
- Navigation cohérente entre les pages

### 4.4 Validation live — le "moment wow"

```bash
pnpm dev
```

Ouvrir le navigateur :
1. Voir la liste vide avec empty state
2. Créer un événement (titre, date, YouTube URL)
3. Le voir apparaître dans la liste
4. Ouvrir le détail → vidéo YouTube intégrée
5. Modifier le statut → badge qui change
6. Filtrer par statut

**Moment "wow" :** L'app tourne, CRUD complet, design propre, tout ça généré depuis des specs. Pas du vibe coding.

**Ce que tu dis :**
- "De la spec au produit. PRD → Architecture → Stories → Code. Chaque étape validée."
- "Et tout respecte les rules : full-screen forms, Anti-Flash, design system cohérent."

> **⏱ Si ça traîne →** Charger `step4_epic2_crud/` et lancer `pnpm install && pnpm dev`.
> L'audience verra le même résultat — l'important c'est de montrer l'app qui tourne.

### Ce que `step4_epic2_crud/` contient (delta vs step3)

```
app/page.tsx                         ← REFAIT : vraie liste d'événements avec filtres
app/events/create/page.tsx           ← NOUVEAU : formulaire création full-screen
app/events/[id]/page.tsx             ← NOUVEAU : page détail avec YouTube embed
app/events/[id]/edit/page.tsx        ← NOUVEAU : formulaire édition
components/events/event-list.tsx     ← NOUVEAU : liste avec Anti-Flash
components/events/event-card.tsx     ← NOUVEAU : carte événement
components/events/event-form.tsx     ← NOUVEAU : formulaire réutilisable
components/events/event-filters.tsx  ← NOUVEAU : filtres par status
components/events/status-badge.tsx   ← NOUVEAU : badge statut
lib/validations/event-schema.ts      ← NOUVEAU : schema Zod
```

### Transition
- "L'app marche. Mais comment on sait qu'elle marche VRAIMENT ? On ajoute les tests."

---

## Étape 5 — Qualité du code (8 min)

> **Fallback :** `step5_quality/` (à préparer)
> **Ce qu'on implémente :** Tests E2E + validation qualité

Lukasz avait demandé spécifiquement ce bloc.

### 5.1 Tests E2E (5 min)

Demander à l'agent d'ajouter les tests basés sur les critères d'acceptation du PRD BMAD.

**Ce que tu dis :**
- "Les tests sont basés directement sur les critères d'acceptation que l'agent PM a générés. La boucle est complète : spec → code → test."
- "Si la spec dit 'l'utilisateur peut créer un événement', y'a un test pour ça."

**Moment de vulnérabilité contrôlée :** Provoquer un échec volontaire. Montrer la boucle de feedback : l'agent corrige, les tests passent.

### 5.2 Linters dans la boucle (3 min)

Montrer comment les rules + linters attrapent les problèmes :
- TypeScript strict (pas de `any`)
- ESLint configuré
- Les rules AGENTS.md comme "super-linter" pour les patterns architecturaux

**Ce que tu dis :**
- "Trois couches de qualité : les rules (architecture), le linter (syntaxe), les tests (comportement)."
- "Aucune de ces couches ne remplace l'oeil humain. Mais ensemble, elles filtrent 90% des problèmes."

> **⏱ Si ça traîne →** Charger `step5_quality/` ou sauter à l'Étape 6 (MCP).
> Cette étape est compressible si le temps manque.

### Transition
- "Dernière pièce du puzzle : comment l'agent se connecte à vos vrais outils."

---

## Étape 6 — MCP : le principe + démo simple (8 min)

Gardé court comme demandé. Coupable si on manque de temps.

### 6.1 Le concept (3 min)

**Ce que tu dis :**
- "MCP c'est le USB-C des agents. Un protocole standard pour connecter n'importe quel agent à n'importe quel outil."
- "Sans MCP, l'agent travaille en aveugle. Avec MCP, il consulte la source de vérité."
- "Vous l'avez déjà vu en action — l'agent consulte shadcn et PocketBase pendant la génération. C'est du MCP."

Montrer les 3 MCP connectés et ce que chacun fait.

### 6.2 Démo Trello (5 min)

Demander à l'agent de lire le board Trello et déplacer US-001 en "Done".

**Ce que tu montres :**
- L'agent lit le board, voit les cartes
- Il déplace la carte tout seul
- Le commit référence la carte

**Ce que tu dis :**
- "Traçabilité automatique. Du ticket au commit. Sans quitter le terminal."
- "Et Trello gratuit suffit complètement. Même API, même MCP."

---

## Étape 7 — Q&A (10 min)

### Récap (2 min)

- "Ce que vous avez vu, c'est pas un truc de blog. C'est ma méthode de travail quotidienne."
- "BMAD pour la spec — des agents spécialisés qui structurent le besoin. Agent Rules pour la qualité — un code review automatique. MCP pour la traçabilité — l'agent connecté aux vrais outils."
- "Le dev n'est pas remplacé. Il est promu architecte."

### Questions anticipées

| Question probable | Réponse courte |
|---|---|
| "C'est quoi la différence entre les agents BMAD ?" | Chacun a un rôle : PM fait le quoi, Architect fait le comment, Developer implémente. Comme une vraie équipe. |
| "Ça marche pour du legacy ?" | Oui, module par module. L'agent Analyst de BMAD peut même analyser le code existant. |
| "Et si l'agent fait n'importe quoi ?" | Les rules + tests + review humain. 3 filets de sécurité. |
| "C'est spécifique à Cursor/OpenCode ?" | Non. AGENTS.md est tool-agnostic. BMAD supporte Claude Code, Cursor, OpenCode, et d'autres. |
| "L'agent apprend entre les sessions ?" | Oui. Learning loop — il enregistre ses corrections. Plus tu l'utilises, moins tu corriges. |
| "Combien de temps pour mettre ça en place ?" | `npx bmad-method install` + un fichier AGENTS.md. Premier cycle complet en 1-2 jours. |

### Call to action

- "La question c'est pas SI l'IA va changer votre travail. C'est EST-CE QUE vous allez être celui qui guide le changement, ou celui qui le subit."
- "Tout ce qu'on a utilisé aujourd'hui — BMAD, PocketBase, Trello, shadcn — c'est gratuit et open source. Zéro excuses."

---

## Filet de sécurité

| Problème | Plan B |
|---|---|
| BMAD install échoue | Agents pré-installés, ou utiliser BMAD manuellement via prompts structurés |
| BMAD agents lents | PRD pré-généré → charger `step1_prd_archi/` |
| Foundations trop longues | Charger `step3_foundations/` |
| CRUD trop long | Charger `step4_epic2_crud/` — c'est le fallback le plus probable |
| Code généré cassé | Idem, charger le step pré-construit correspondant |
| Docker/PocketBase down | Fallback SQLite fichier |
| Tests échouent en live | Transformer en moment pédagogique + fix |
| MCP server déconnecté | Relancer, sinon continuer sans en expliquant le concept |
| Trello API indisponible | Montrer le concept sur le board en navigateur |
| Dépassement de temps | Étapes 5 et 6 sont compressibles. Charger le step et enchaîner. |

---

## Checklist pré-démo

### Technique
- [ ] `.env.local` chargé (`source .env.local`)
- [ ] BMAD installé (`npx bmad-method install`, `.bmad/` présent)
- [ ] Docker + PocketBase vérifié (`curl health`)
- [ ] 3 MCP servers connectés
- [ ] Board Trello accessible avec cartes US-001 à US-005
- [ ] Repo clean (pas de node_modules, pas de code source)
- [ ] `step3_foundations/` prêt (`pnpm install` fait, symlinks OK)
- [ ] `step4_epic2_crud/` prêt (`pnpm install` fait, CRUD complet implémenté)
- [ ] `step5_quality/` prêt (tests E2E, build clean)
- [ ] Chaque step validé : `pnpm dev` tourne, pas d'erreur console

### Présentation
- [ ] Slides prêtes (3 slides)
- [ ] Police à 18px pour lisibilité remote
- [ ] Scénario répété 2-3 fois avec chrono

### Logistique
- [ ] Audio/micro/partage d'écran validés
- [ ] Health check 5 min avant

---

## Résumé du flow — Vue d'ensemble

```
Étape 1 (5 min)    Intro slides
     │
Étape 2 (20 min)   BMAD : Brief → PRD → Architecture → Stories
     │              Fallback: step1_prd_archi/ ou step2_epics_stories/
     │
Étape 3 (10 min)   Foundations : Epic 1 infra + design system
     │              Fallback: step3_foundations/
     │
Étape 4 (12 min)   CRUD complet : Epic 2 événements ← MOMENT WOW
     │              Fallback: step4_epic2_crud/
     │
Étape 5 (8 min)    Qualité : tests E2E + linters ← COMPRESSIBLE
     │              Fallback: step5_quality/
     │
Étape 6 (8 min)    MCP + Trello ← COMPRESSIBLE
     │
Étape 7 (10 min)   Q&A + récap
```

Durée totale : ~73 min (cible : 60 min en compressant étapes 5-6)

---

*Scénario v5 — Mars 2026 · OpenCode + Claude + BMAD · Cappasoft*
