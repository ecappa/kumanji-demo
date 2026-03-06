# Spec-Driven Development — La méthode en 5 minutes

> Par un gars qui a vu passer client-serveur, le web, le cloud, le mobile, et maintenant l'IA.
> Chaque fois, même pattern : ceux qui structurent survivent, ceux qui improvisent recommencent.

---

## Le problème

Le "vibe coding" — tu ouvres ChatGPT, tu promptes, tu copies-colles, ça marche... jusqu'à ce que ça marche plus. Après 3 features, t'as du spaghetti, aucun test, et personne sait ce que le code est censé faire.

C'est rapide, oui. Mais ça scale pas. Et quand le client change d'avis (spoiler : il va changer d'avis), tu recommences de zéro.

## L'idée

Spec-Driven Development, c'est simple : **on spécifie d'abord, on génère ensuite, on valide toujours.**

Pas un concept académique. Pas un framework lourd. Juste trois réflexes :

1. Tu sais ce que tu veux AVANT de coder
2. L'agent suit TES règles, pas les siennes
3. Chaque ligne de code est traçable à un besoin

## Les 3 piliers

### Pilier 1 — BMAD (Spécification structurée)

Tu donnes un brief, l'IA te génère un PRD complet : user stories, critères d'acceptation, architecture technique, découpage en tâches.

C'est ce qu'un tech lead ferait en 2 heures de meeting. Sauf que là c'est fait en 2 minutes, et c'est documenté. L'humain valide, ajuste, et avance.

**Avant BMAD :** "Fais-moi une app de gestion d'événements" → résultat imprévisible.
**Avec BMAD :** Brief structuré + contraintes + stack cible → PRD avec 5 user stories, des critères testables, une archi claire.

### Pilier 2 — Agent Rules (Garde-fous qualité)

Les rules, c'est ton code review automatique qui s'applique PENDANT la génération. L'agent n'a pas le choix de suivre tes standards.

Tu définis : la structure de fichiers, les conventions de nommage, les patterns d'architecture, le design system, les anti-patterns interdits. L'agent respecte tout ça sans que t'aies à vérifier chaque ligne.

**Sans rules :** L'agent met les styles inline, mélange la logique et l'UI, choisit une structure random.
**Avec rules :** Code prévisible, architecture cohérente, standards respectés.

### Pilier 3 — Boucle de traçabilité (MCP + Board)

Chaque feature est liée à un ticket. L'agent lit le board, déplace les cartes, inclut la référence dans ses commits. La traçabilité est complète — du besoin au code, en passant par le test.

Et tout ça est possible grâce aux serveurs MCP : l'agent est connecté aux vrais outils (DB, board, registre de composants). Il ne travaille pas en isolation.

## Le cycle

```
Brief → Spec (BMAD) → Rules (Agent) → Code (généré) → Test (auto) → Validation (humain) → Repeat
```

Toujours dans cet ordre. Jamais de code avant la spec. Jamais de merge avant le test.

## Ce que c'est PAS

- C'est PAS de la magie. L'agent fait des erreurs. Mais avec des specs et des rules, les erreurs sont prévisibles et corrigeables.
- C'est PAS un remplacement du développeur. C'est une promotion. Le dev passe de "celui qui tape du code" à "celui qui définit les règles du jeu".
- C'est PAS juste pour les nouveaux projets. Ça marche pour la refonte de legacy aussi — module par module, spec par spec.

## Par où commencer

1. **Un projet simple.** Un CRUD, un petit outil interne. Pas le mastodonte de production.
2. **Un fichier de rules.** Commence avec 10 règles clés : structure, naming, patterns obligatoires, anti-patterns.
3. **Un board.** Même un Trello gratuit. L'important c'est la traçabilité.
4. **Un cycle complet.** Spec → Code → Test → Deploy. De bout en bout, une fois. Après, tu ajustes.

Le SDD, c'est comme le TDD : le premier cycle est le plus dur. Après, c'est un réflexe.

---

*"La question c'est pas SI l'IA va changer ton travail. C'est EST-CE QUE tu vas être celui qui guide le changement, ou celui qui le subit."*
