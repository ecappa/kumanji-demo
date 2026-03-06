# Scénario de démo live — Spec-Driven Development
## Gestionnaire d'événements | 35-40 minutes

---

## Slides de présentation (avant la démo) — 10-15 min max

> 3 slides max. Slides sobres, peu de texte, beaucoup d'images/schémas.
> L'essentiel passe dans la démo, pas dans les slides.

### Slide 1 — Titre + Le problème
- "Spec-Driven Development — Du brief au code en 35 minutes"
- Sous-titre : Atelier live · Eric - Cappasoft
- "Le vibe coding, c'est rapide mais ça ne scale pas"
- Schéma rapide : Prompt → Code spaghetti → Bugs → Réécriture

### Slide 2 — La méthode SDD (3 piliers)
- **Pilier 1 : BMAD** — Spécification structurée (PRD, architecture, user stories)
- **Pilier 2 : Cursor Rules** — Garde-fous qualité automatiques (c'est le framework)
- **Pilier 3 : Boucle Trello + MCP** — Traçabilité spec → ticket → code → validation
- Schéma cyclique : Spec → Architecture → Tasks → Code → Test → Repeat
- Mention rapide des MCP (détails pendant la démo)

### Slide 3 — Démo live
- "On part de zéro. Pas de triche."
- Ce que vous allez voir : PRD → Stories → Code fonctionnel
- QR code ou lien vers le repo (optionnel)

> **Note** : Les détails sur MCP, la charte graphique, etc. sont expliqués PENDANT la démo, pas en slides. Ça garde l'attention et ça montre en contexte.

---

## Prérequis visibles à l'écran au démarrage

- Terminal ouvert sur un **repo vide** (juste un `README.md` et le `.cursorrules`)
- Cursor IDE ouvert, workspace clean
- Docker Desktop running (PocketBase prêt)
- Board Trello "Event Manager" ouvert dans un onglet (quelques tickets pré-créés)
- Onglet navigateur prêt pour montrer le résultat
- MCP servers visibles dans Cursor Settings → point vert

> **Note mentale** : Le repo vide est crucial — ça prouve qu'on part de zéro. Les MCP en point vert prouvent que l'IA est connectée aux vrais outils.

---

## Phase 0 — Mise en contexte (1-2 min)

### Ce que tu fais
- Montrer l'écran : repo vide, aucun code
- Énoncer le brief à voix haute

### Ce que tu dis
- *"On a un besoin simple : un gestionnaire d'événements. Liste, détails, lien YouTube, persistance. C'est le genre de truc qu'un dev fait en 2-3 jours. On va le faire en 30 minutes, en live, et le code va être propre."*
- *"Mais surtout — je ne vais pas juste 'vibe coder'. On va suivre une méthode structurée, et vous allez voir la différence."*
- *"Remarquez aussi les MCP — ces points verts dans Cursor. L'IA est branchée sur le registre shadcn, sur PocketBase, et sur notre board Trello. Elle ne travaille pas en isolation."*

### Moment clé
- Créer le contraste entre "vibe coding" et "spec-driven"
- Planter le décor : ce n'est pas de la magie, c'est de la méthode
- Montrer rapidement les 3 MCP connectés (point vert)

---

## Phase 1 — Spec & Architecture avec BMAD (7-10 min)

### Ce que tu fais
1. Ouvrir BMAD dans Cursor (ou terminal)
2. Donner le brief : *"Un gestionnaire d'événements avec titre, description, date, URL YouTube, vue liste et détail"*
3. Laisser BMAD générer le PRD
4. Montrer le PRD généré : user stories, critères d'acceptation
5. Montrer l'architecture technique générée (structure de fichiers, stack)

### Ce que tu dis
- *"BMAD, c'est ma phase de planification. Avant d'écrire une seule ligne de code, j'ai un PRD complet avec des user stories."*
- *"Regardez ce que ça génère — c'est pas juste du texte vague. Y'a des critères d'acceptation, une architecture, un découpage en tâches."*
- *"C'est exactement ce qu'un tech lead ferait en 2 heures de meeting. Sauf que là, c'est fait en 2 minutes, et c'est documenté."*

### Talking points pendant la génération
- Comparer avec un prompt nu dans ChatGPT → résultat imprévisible
- Ici, le contexte est structuré : le brief, les contraintes, le stack cible
- L'humain valide avant d'avancer — on ne génère pas de code à l'aveugle
- **(Optionnel — Trello)** : Montrer que les user stories pourraient être créées comme tickets Trello via le MCP. *"L'IA peut lire le board et créer les tickets directement."*

### Transition
- *"Maintenant qu'on a notre spec, on passe au code. Et c'est là que les Cursor Rules entrent en jeu."*

---

## Phase 2 — Génération du CRUD avec Cursor (12-15 min)

### Ce que tu fais
1. Montrer brièvement les Cursor Rules en place (2-3 rules clés)
2. Donner le contexte à Cursor : spec + architecture + première user story
3. Lancer la génération
4. Pendant que ça génère → parler (voir talking points)
5. **Validation live** : `npm run dev` → navigateur → créer un événement → voir la liste

### Ce que tu dis
- *"Les Cursor Rules, c'est mes garde-fous. C'est comme un code review automatique qui s'applique PENDANT la génération."*
- *"Par exemple, cette rule-là force que chaque composant ait son fichier de test. Cette autre force la structure des dossiers. L'IA n'a pas le choix de suivre vos standards."*
- *"Et regardez la rule 108 — design system. La charte graphique est directement dans les instructions de l'IA. Palette oklch, badges avec border, couleurs chaudes. L'IA respecte VOS standards visuels."*
- Quand le code apparaît : *"Regardez la structure — c'est pas du spaghetti. C'est organisé exactement comme notre architecture le demandait. Et les couleurs? C'est notre palette Warm Modern Pastel, pas du bleu Tailwind par défaut."*

### Talking points pendant la génération
- **Vibe coding vs spec-driven** : "Sans rules, Cursor aurait mis les styles inline, mélangé la logique et l'UI, choisi une structure random. Avec les rules, c'est prévisible."
- **Le dev comme architecte** : "Mon rôle, c'est pas d'écrire le code. C'est de définir les règles du jeu et de valider le résultat."
- **MCP en action** : "Regardez — quand l'IA a besoin d'un composant Table, elle va chercher dans le registre shadcn via MCP. Pas de code inventé de mémoire. Et pour la DB, elle consulte le schema PocketBase en temps réel."
- **Question interactive** : *"C'est quoi le truc répétitif dans votre semaine qui vous tue? Le boilerplate CRUD? Les tests? La documentation?"*

### Moment "wow"
- L'app tourne, on crée un événement, il apparaît dans la liste, le lien YouTube fonctionne
- Tout ça en ~10 minutes à partir de rien

### Transition
- *"L'app marche, mais comment on sait qu'elle marche VRAIMENT? On ajoute les tests."*

---

## Phase 3 — Itération : Tests E2E (8-10 min)

### Ce que tu fais
1. Demander à Cursor d'ajouter les tests end-to-end
2. Référencer la spec et les critères d'acceptation comme base des tests
3. Lancer les tests → **provoquer un échec volontaire** (ex: changer une assertion)
4. Montrer la boucle de feedback : l'IA corrige, les tests passent
5. **Moment de vulnérabilité contrôlée** — ça prouve que c'est réel, pas du fake

### Ce que tu dis
- *"Les tests, c'est pas un afterthought. Ils sont basés directement sur les critères d'acceptation de la spec. Si la spec dit 'l'utilisateur peut créer un événement', y'a un test pour ça."*
- *"Et les rules forcent la structure : les tests sont dans le bon dossier, avec le bon naming, le bon pattern."*

### Talking points pendant la génération
- **Traçabilité** : "Chaque test est lié à une user story. Quand on te demande 'c'est testé?', tu peux pointer vers le test exact."
- **Loop Trello** : "Dans mon flow complet, l'IA peut lire le board Trello via MCP, voir les tickets, les déplacer. Le commit est lié à la carte. La traçabilité est complète — et gratuite."
- **(Démo rapide Trello — optionnel)** : Demander à Cursor de lire le board Trello et déplacer la carte US-001 de "In Progress" à "Done". *"Voyez — l'IA déplace le ticket toute seule. Pas besoin de quitter l'IDE."*
- **Résistance au changement** : *"Je sais que certains pensent que l'IA va les remplacer. Regardez ce qu'on fait ici — on définit l'architecture, on valide le code, on écrit les specs. Le dev monte en valeur. Il devient celui qui dit à la machine QUOI faire et qui valide que c'est bien fait."*

### Transition
- *"Dernière étape — on va sophistiquer. Parce qu'en vrai, le client revient toujours avec des changements."*

---

## Phase 4 — Itération : Sophistication (5-7 min) — BONUS

> **Cette phase est optionnelle.** La démo est complète après Phase 3. 
> Ne faire Phase 4 que si tu as du temps en avance.

### Ce que tu fais
1. Modifier la spec : ajouter la gestion des dates (validation, formatage, timezone Québec)
2. Montrer le cycle itératif : spec modifiée → code mis à jour → tests ajustés
3. Relancer les tests → tout passe
4. Montrer le résultat final dans le navigateur

### Ce que tu dis
- *"Le client change d'avis, la spec évolue — c'est normal. La force de l'approche, c'est que le changement est contrôlé."*
- *"Je modifie la spec, pas le code directement. Le code suit. Et les tests valident que rien n'est cassé."*

### Talking points
- **Cycle itératif** : Spec → Code → Test → Repeat. Toujours dans cet ordre.
- **Leur projet de refonte** : *"Votre mastodonte legacy, c'est exactement ce genre d'approche qui va vous permettre de le refondre module par module, sans tout casser."*

### Moment final
- App fonctionnelle, tests qui passent, code structuré
- Récap visuel : "On est partis de rien, on a une app en production-ready en 35 minutes"

---

## Wrap-up + Q&A (10-15 min)

### Récap rapide (2-3 min)
- *"Ce que vous avez vu, c'est pas un truc de blog ou de vidéo YouTube éditée. C'est ma méthode de travail quotidienne."*
- *"Les 3 piliers : BMAD pour la spec, Cursor Rules pour la qualité (c'est le framework), et la boucle Trello + MCP pour la traçabilité."*
- *"Le dev n'est pas remplacé. Il est promu architecte."*

### Call to action
- *"La question c'est pas SI l'IA va changer votre travail. C'est EST-CE QUE vous allez être celui qui guide le changement, ou celui qui le subit."*
- *"Et tout ce qu'on a utilisé aujourd'hui — PocketBase, Trello, shadcn — c'est gratuit. Zéro excuses pour ne pas essayer."*

### Q&A (10-12 min)
- Laisser le temps aux questions — c'est là que les sceptiques s'expriment
- Si les questions fusent, proposer un call de suivi pour approfondir

---

## Filet de sécurité

| Problème potentiel | Plan B |
|---|---|
| BMAD plante ou est lent | PRD pré-généré dans une branche `backup`, le montrer comme "voici ce que ça génère habituellement" |
| Cursor génère du code cassé | Avoir le résultat fonctionnel dans `backup-final`, faire un `git stash` discret et continuer |
| Docker/PocketBase ne démarre pas | Fallback sur SQLite fichier (zéro dépendance) |
| Tests échouent en live | Transformer en moment pédagogique : "voyez, c'est pour ça qu'on a des tests" puis fix rapide |
| MCP server ne se connecte pas (point rouge) | Relancer `npx shadcn@latest mcp` / vérifier Docker pour PocketBase. Continuer sans en parlant du concept |
| Trello API indisponible | Montrer le concept sur le board en navigateur, expliquer le MCP sans le démontrer live |
| Connexion internet instable | Tout est local sauf Trello — BMAD en local, Cursor fonctionne offline pour la génération |
| Dépassement de temps | Phases 3 et 4 sont compressibles, le coeur de la démo c'est Phases 1 et 2 |

---

## Checklist pré-démo

### Setup technique
- [ ] Repo clean avec seulement README + .cursorrules + .cursor/mcp.json
- [ ] Branche `backup` avec PRD pré-généré
- [ ] Branche `backup-final` avec app complète fonctionnelle
- [ ] Docker Desktop lancé + PocketBase testé (`docker compose up -d`)
- [ ] **3 MCP servers en point vert** dans Cursor Settings > MCP
- [ ] Board Trello "Event Manager" créé avec quelques cartes (US-001 à US-005)
- [ ] Trello API key + token configurés dans `.cursor/mcp.json`
- [ ] `npm create next-app` pré-testé (pas de surprise de version)

### Présentation
- [ ] Slides de présentation prêtes (3 slides)
- [ ] Police Cursor à 18px pour lisibilité remote
- [ ] Scénario répété 2-3 fois avec chrono

### Logistique
- [ ] Audio/micro/partage d'écran validés
- [ ] **Script health check MCP** à lancer 5 min avant
- [ ] Café prêt ☕

### Health check MCP (5 min avant)
```bash
# Vérifier que Docker tourne
docker ps | grep pocketbase

# Vérifier que PocketBase répond
curl -s http://127.0.0.1:8090/api/health | jq

# Dans Cursor : Settings > MCP → 3 points verts
```

---

---

## Annexe A — Configuration Trello MCP (pas à pas)

> À montrer si l'audience demande "comment on connecte Trello ?" ou à utiliser comme référence.

### 1. Créer un Power-Up Trello (gratuit)

- Aller sur https://trello.com/power-ups/admin
- Cliquer "New" (en haut à droite)
- Remplir :
  - **Name** : "Cursor MCP" (ou ce que tu veux)
  - **Workspace** : ton workspace Trello
  - **Iframe connector URL** : laisser vide
  - **Email** : ton email
- **Origines autorisées** : mettre `http://localhost` (c'est du dev local)
- Sauvegarder → tu obtiens une **API Key**

> **Note** : Le bouton "New" n'apparaît pas immédiatement — il faut parfois scroller ou avoir au moins un workspace actif. Si le bouton n'est pas visible, vérifier que le compte Trello a bien un workspace (même gratuit).

### 2. Générer un token utilisateur

- Copier ta clé API
- Ouvrir cette URL dans le navigateur (remplacer `TA_CLE_API`) :

```
https://trello.com/1/authorize?expiration=never&scope=read,write&response_type=token&key=TA_CLE_API
```

- Trello affiche une page d'autorisation → cliquer **"Autoriser"**
- Un token s'affiche → le copier

> **Différence API Key vs Token** :
> - **API Key** = identifie ton Power-Up (comme un client_id)
> - **Token** = autorise l'accès à ton compte Trello (comme un access_token)
> - Le **Secret** (OAuth secret) affiché dans le Power-Up n'est PAS utilisé ici — c'est pour du OAuth serveur classique

### 3. Configurer le MCP dans Cursor

Coller les deux valeurs dans `.cursor/mcp.json` :

```json
{
  "trello": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-trello"],
    "env": {
      "TRELLO_API_KEY": "ta-clé-api-ici",
      "TRELLO_TOKEN": "ton-token-ici"
    }
  }
}
```

- Relancer Cursor (ou fermer/rouvrir le projet)
- Aller dans **Settings > MCP** → vérifier le point vert à côté de "trello"

### 4. Préparer le board pour la démo

- Board de démo : https://trello.com/invite/b/698b8db40872ce90e5a8e1f5/ATTI95226e8d7a99565189fa7296fb91481c4B5E35DC/demo
- Ajouter 3 colonnes : **To Do** · **In Progress** · **Done**
- Créer les cartes : US-001 à US-005 (une par user story) dans "To Do"
- (Optionnel) Ajouter une description à chaque carte avec les critères d'acceptation

### Limites de la version gratuite

| Limitation | Impact démo |
|---|---|
| 10 boards max par workspace | Aucun — on en utilise 1 |
| Pas de vues timeline/calendar | Aucun — on utilise que le kanban |
| 1 Power-Up par board | Aucun — le MCP est externe, pas un Power-Up Trello |
| Même API rate limits que payant | 300 req / 10 sec par clé — largement suffisant |

> **Message clé pour l'audience** : "La version gratuite de Trello suffit complètement. Même API, même MCP. Zéro coût pour tester."

---

## Annexe B — Configuration des 3 MCP servers

> Récap rapide pour l'audience qui voudrait reproduire chez eux.

### shadcn MCP
```json
{ "command": "npx", "args": ["shadcn@latest", "mcp"] }
```
- Zéro config. Lance le registre officiel shadcn/ui.
- L'IA peut chercher, inspecter et installer des composants.
- Pas besoin de compte ou clé API.

### PocketBase MCP
```json
{ "command": "npx", "args": ["pocketbase-cursor-mcp", "--url=http://127.0.0.1:8090"] }
```
- Pointe vers l'instance PocketBase locale (Docker).
- L'IA peut lister les collections, créer des records, modifier le schema.
- Prérequis : PocketBase qui tourne sur le port 8090.

### Trello MCP
```json
{
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-trello"],
  "env": {
    "TRELLO_API_KEY": "...",
    "TRELLO_TOKEN": "..."
  }
}
```
- Nécessite une API key + token (voir Annexe A).
- L'IA peut lire les boards, déplacer les cartes, en créer.
- Fonctionne avec Trello gratuit.

### Vérification
Après config, dans Cursor : **Settings > MCP** → les 3 servers doivent afficher un **point vert**.

---

*Scénario v2 — Février 2026*
*Consultant : Eric - Cappasoft*
*Stack : Next.js 15 · PocketBase · shadcn/ui · Trello · 3 MCP servers*
