# Migration Legacy — Refonte avec SDD

> Ton "mastodonte" te fait peur ? Normal.
> Mais personne a jamais mangé un éléphant en une bouchée.

---

## Le contexte

T'as une grosse app legacy. Des années de dette technique. Du code que plus personne veut toucher. Le genre de projet où chaque correction crée deux nouveaux bugs.

Et quelqu'un a décidé qu'il fallait "refondre". Classique. Le piège classique aussi : on réécrit tout de zéro, ça prend 18 mois, on dépasse le budget, et à la fin le legacy est encore en prod parce que la refonte est pas finie.

Le SDD ne résout pas tout. Mais il donne un cadre pour avancer sans tout casser.

## La stratégie : module par module

### L'erreur fatale

Réécrire tout en même temps. Big bang. "On va tout refaire en Next.js 15 et ça va être beau."

Non. Ça marche jamais. Parce que pendant que tu réécris, le legacy continue d'évoluer. Parce que tu découvres des règles business cachées dans du code spaghetti que personne avait documenté. Parce que 18 mois c'est long et l'équipe s'épuise.

### L'approche SDD

**Étranglement progressif.** Module par module. L'ancien et le nouveau coexistent. Chaque module refait est une victoire visible.

```
Phase 1 : Identifier les modules indépendants
Phase 2 : Spec-first sur UN module
Phase 3 : Implémenter, tester, déployer CE module
Phase 4 : Repeat
```

## Les étapes concrètes

### Étape 1 — L'inventaire (1-2 semaines)

Avant de toucher une ligne de code, tu fais l'inventaire.

**Ce que tu cherches :**
- Les domaines métier distincts (users, events, billing, notifications...)
- Les dépendances entre modules (qui appelle qui)
- Les zones toxiques (code que personne comprend, tests inexistants)
- Les quick wins (modules simples, peu de dépendances, forte valeur visible)

**L'outil :** BMAD. Tu peux utiliser l'IA pour analyser le code existant et générer un rapport de dépendances. C'est pas parfait, mais ça donne un premier draft en heures au lieu de semaines.

### Étape 2 — Le premier module (2-4 semaines)

Choisis le module qui a le meilleur ratio effort/visibilité. Pas le plus critique. Pas le plus complexe. Le plus VISIBLE et le plus INDÉPENDANT.

**Pourquoi visible ?** Parce que l'équipe et le management doivent voir que ça marche. La première victoire achète du temps et de la crédibilité pour la suite.

**Pourquoi indépendant ?** Parce que si le module a 47 dépendances avec le legacy, tu vas passer ton temps à gérer l'intégration au lieu de construire du neuf.

**Le flow SDD :**
1. Spec le module avec BMAD (user stories, architecture, critères)
2. Écris tes Agent Rules (adaptées à VOTRE stack cible)
3. Génère le code module par module
4. Tests E2E basés sur les critères d'acceptation
5. Intégration progressive (proxy, feature flags, ou strangler pattern)

### Étape 3 — L'intégration (parallèle)

Le nouveau module doit cohabiter avec le legacy. Trois stratégies :

**Strangler Pattern** (recommandé)
- Le nouveau module expose les mêmes URLs/APIs que l'ancien
- Un routeur/proxy redirige progressivement le trafic
- L'ancien module est "étranglé" — de moins en moins de trafic jusqu'à extinction

**Feature Flags**
- Le nouveau module est derrière un flag
- Tu actives pour un % d'utilisateurs
- Rollback instantané si problème

**Micro-frontend** (pour le UI)
- Le nouveau module est une app indépendante
- Intégrée dans le layout legacy via iframe ou module federation
- Migration progressive page par page

### Étape 4 — Le cycle (ongoing)

Chaque module suit le même flow. Avec le temps :
- Les rules s'affinent (le learning loop les améliore)
- L'équipe monte en compétence sur le SDD
- La vélocité augmente — le 5e module va 3x plus vite que le premier
- Le legacy rétrécit naturellement

## Les pièges

### "On va profiter de la refonte pour tout changer"

Non. Refonte = même comportement, nouvelle implémentation. Si tu changes le comportement en même temps, tu ne peux plus valider que la refonte est correcte.

Change le comportement APRÈS la refonte, dans un cycle séparé, avec ses propres specs et tests.

### "Les tests de l'ancien code sont notre filet de sécurité"

Si l'ancien code avait de bons tests, il serait pas legacy. La réalité : les tests sont incomplets, obsolètes, ou inexistants.

Le SDD résout ça : les tests du nouveau module sont basés sur les specs, pas sur l'ancien code. Tu testes le COMPORTEMENT attendu, pas l'implémentation existante.

### "On n'a pas le temps de spécifier"

Tu n'as pas le temps de NE PAS spécifier. Chaque heure de spec t'économise 3 heures de debug et de rework. C'est pas une opinion, c'est 30 ans d'observation.

### "L'équipe ne va pas adopter"

Commence petit. Un module, un dev, un cycle complet. Quand les résultats parlent, l'adoption suit. Forcer l'adoption top-down, ça marche jamais. Montrer que ça marche bottom-up, ça marche toujours.

## Le rôle de l'agent dans la migration

L'agent IA est particulièrement utile dans une refonte pour :

**Analyse du legacy**
- Extraire les règles business cachées dans le code
- Mapper les dépendances entre modules
- Identifier les patterns récurrents

**Génération du nouveau code**
- CRUD et boilerplate (là où l'agent est le plus efficace)
- Conversion de structures de données (ancien schéma → nouveau)
- Scaffolding des tests basés sur les specs

**Documentation**
- Documenter le legacy PENDANT la refonte (pas avant)
- Générer des specs rétroactives pour les modules pas encore migrés
- Maintenir la correspondance ancien/nouveau

**Ce que l'agent ne fait PAS bien :**
- Comprendre le contexte business implicite
- Prioriser les modules (c'est une décision humaine)
- Gérer les politiques internes (qui touche à quoi, qui décide)

## Calendrier réaliste

| Phase | Durée | Output |
|-------|-------|--------|
| Inventaire + analysis | 1-2 sem | Carte des modules, dépendances, priorités |
| Module pilote (spec + code + test) | 2-4 sem | Un module en prod, équipe formée |
| Modules 2-3 | 2-3 sem chacun | Vélocité en hausse, rules matures |
| Modules 4+ | 1-2 sem chacun | Rythme de croisière |
| Cleanup legacy | Ongoing | Extinction progressive |

**Réaliste pour un "mastodonte" ?** Oui, si tu acceptes que c'est un marathon, pas un sprint. 6-12 mois pour migrer l'essentiel, pas 18 mois pour tout refaire.

---

*"Personne a jamais mangé un éléphant en une bouchée. Mais une bouchée à la fois, ça se fait."*
