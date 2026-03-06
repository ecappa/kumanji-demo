# Agent Rules — Le guide de terrain

> Comment écrire des règles qui font que l'agent code comme TOI tu coderais.
> Pas de la théorie — des patterns testés en vrai, avec les cicatrices pour le prouver.

---

## Pourquoi des rules

Sans rules, un agent IA c'est un stagiaire brillant mais imprévisible. Il va écrire du code qui marche, mais pas de la façon que tu veux. Styles inline, structure random, nommage inventé sur le fly. Tu passes plus de temps à corriger qu'à coder toi-même.

Avec des rules, c'est un senior qui suit VOS conventions. Prévisible, cohérent, auditable.

## Le format qui marche

### AGENTS.md (OpenCode) / CLAUDE.md (Claude Code)

Un seul fichier à la racine du projet. Maximum 150-200 lignes. Si c'est plus long, l'agent perd le fil.

**La structure gagnante :**

1. **Stack & principes** (10-15 lignes) — Ce qu'on utilise et les règles non-négociables
2. **Architecture** (10-15 lignes) — Comment le code est structuré
3. **Patterns obligatoires** (20-30 lignes) — Les conventions à suivre
4. **Anti-patterns** (10-15 lignes) — Ce qui est INTERDIT
5. **Checklist** (10-15 lignes) — Vérification avant commit

### Le test du "est-ce que c'est utile"

Pour chaque ligne, demande-toi : **"Si j'enlève ça, l'agent va faire une erreur ?"** Si non, enlève-le.

L'agent peut inférer beaucoup de choses en lisant ton code existant. Pas besoin de lui expliquer ce qu'est React. Par contre, tes conventions spécifiques — ça, il peut pas deviner.

## Les 5 catégories de rules efficaces

### 1. Les non-négociables

Ce qui ne se discute pas. Mets-les en HAUT du fichier, en gras ou en majuscules.

```markdown
- TypeScript strict : `any` interdit partout
- UN SEUL `overflow-y-auto` par page
- Formulaires = pages plein écran, JAMAIS de dialogs
```

L'agent les voit en premier, les retient le mieux.

### 2. Les patterns architecturaux

La structure que tout le monde doit suivre. Montre-la, pas juste la décris.

```markdown
## Structure de fichiers
components/
  ├── events/     # Composants métier
  ├── layout/     # Layout
  └── ui/         # shadcn/ui (généré)
```

C'est plus efficace qu'une phrase. L'agent voit la structure, il la reproduit.

### 3. Les conventions de code

Nommage, format, styles. Sois spécifique.

```markdown
- Fichiers : kebab-case (event-list.tsx)
- Composants : PascalCase (EventCard)
- Hooks : use- prefix (use-events.ts)
- Commits : feat(US-001): description
```

### 4. Les "comment faire X"

Pour les patterns récurrents, donne un mini-template.

```markdown
## Toast feedback
- Succès : toast.success("Événement créé")
- Erreur : toast.error("Impossible de sauvegarder")
- JAMAIS de toast générique sans type
```

L'agent copie le pattern. C'est ça que tu veux.

### 5. Les anti-patterns

Ce que tu NE VEUX PAS. Souvent plus utile que ce que tu veux.

```markdown
## INTERDIT
- `any` dans TypeScript
- Skeletons sur changement de filtre (utiliser Anti-Flash)
- Dialogs pour les formulaires
- Couleurs Tailwind hardcodées (utiliser les tokens)
```

L'agent les mémorise bien parce que c'est direct et sans ambiguïté.

## Le learning loop

C'est le game changer de 2025-2026. L'agent ne part plus de zéro à chaque session.

### Comment ça marche

1. **Session 1** : L'agent fait une erreur (met un dialog pour un formulaire)
2. **Tu corriges** : "Non, les formulaires c'est toujours plein écran"
3. **L'agent enregistre** : La correction va dans sa mémoire auto (`memory/`)
4. **Session 2** : L'agent se souvient. Il ne fait plus l'erreur.

### Comment l'alimenter

- **Correction explicite** : "Rappelle-toi que chez nous, on utilise pnpm, pas npm"
- **Review de mémoire** : `/memory` pour voir et éditer ce que l'agent a retenu
- **Nettoyage périodique** : Toutes les 2-3 semaines, demander à l'agent de revoir et nettoyer ses notes

### Deux systèmes complémentaires

| Système | Quoi | Qui l'écrit | Partagé en git ? |
|---------|------|-------------|-------------------|
| AGENTS.md | Instructions permanentes | Toi / l'équipe | Oui |
| memory/ | Apprentissages de session | L'agent | Non |

Les rules sont la constitution. La mémoire est le carnet de notes. Les deux ensemble = un agent qui s'améliore avec le temps.

## Rules tool-agnostic vs tool-specific

Lukasz avait raison : séparer ce qui est universel de ce qui est spécifique à un outil.

**Tool-agnostic (dans AGENTS.md) :**
- Architecture, structure de fichiers, naming
- Patterns TypeScript, React, conventions de code
- Design system, anti-patterns, checklist

**Tool-specific (dans la config de l'outil) :**
- Chemins de fichiers MCP
- Raccourcis clavier, layout UI
- Commandes spécifiques à l'IDE

La règle : si tu changes d'outil demain, est-ce que la rule est encore valide ? Si oui, elle est tool-agnostic. Si non, elle va dans la config outil.

## Évolution des rules

Les rules, c'est un document vivant. Comme un `.eslintrc`, mais pour ton agent.

- **Semaine 1** : 10 rules essentielles
- **Semaine 2-3** : Ajout de patterns découverts pendant le travail
- **Mois 1** : Nettoyage — enlever les redondances, fusionner les similaires
- **Ongoing** : Le learning loop ajoute automatiquement les corrections récurrentes

Pas besoin d'être parfait au jour 1. L'important c'est de commencer et d'itérer.

---

*"Les rules, c'est ton code review automatique. Sauf que ce reviewer-là ne dort jamais, ne se tanne jamais, et ne laisse rien passer."*
