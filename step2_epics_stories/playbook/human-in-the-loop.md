# Human-in-the-Loop — Le dev comme architecte

> Tu n'es pas remplacé. Tu es promu.
> Le job change, mais la valeur monte. Si tu le veux.

---

## Le vrai enjeu

Le problème, c'est pas la technologie. Le problème, c'est la peur. "L'IA va me remplacer." C'est normal de penser ça. Mais c'est pas ce qui se passe.

Ce qui se passe, c'est que le travail de commodité (le boilerplate, le CRUD, le copier-coller de patterns) est en train d'être automatisé. Exactement comme le compilateur a automatisé l'assembleur. Exactement comme les frameworks ont automatisé le code bas niveau.

Les développeurs assembleur ont pas disparu. Ils sont devenus développeurs C. Les développeurs C sont devenus développeurs d'applications. Et à chaque transition, la valeur est montée d'un cran.

## Les 4 points de validation

Dans le Spec-Driven Development, l'humain intervient à 4 moments précis. C'est là que ta valeur est maximale.

### 1. La spec (AVANT le code)

**Ce que tu fais :** Tu définis le "quoi" et le "pourquoi". Le brief, les user stories, les critères d'acceptation, les contraintes business.

**Pourquoi c'est critique :** L'IA ne sait pas ce que le client veut. Elle ne sait pas que le champ "date" doit être en timezone Québec. Elle ne sait pas que le status "cancelled" a des implications légales. Toi, tu sais.

**Le réflexe :** Avant de lancer la génération, relis la spec. Est-ce que c'est complet ? Est-ce que les edge cases sont couverts ? Est-ce que les critères sont testables ?

### 2. L'architecture (AVANT la génération)

**Ce que tu fais :** Tu définis le "comment" au niveau macro. La structure de fichiers, les patterns, les conventions, le design system.

**Pourquoi c'est critique :** L'IA peut générer 10 architectures différentes pour le même besoin. Toi, tu sais laquelle est maintenable dans VOTRE contexte, avec VOTRE équipe, et VOTRE dette technique.

**Le réflexe :** Les rules sont ton architecture codifiée. Si l'agent génère quelque chose qui ne respecte pas tes rules, c'est un signal — soit les rules sont incomplètes, soit l'agent a besoin d'un rappel.

### 3. Le review (APRÈS la génération)

**Ce que tu fais :** Tu valides que le code généré est correct, performant, et conforme à tes standards.

**Pourquoi c'est critique :** L'IA fait des erreurs subtiles. Types incorrects, edge cases manqués, logique inversée. Le code compile et les tests passent, mais le comportement n'est pas celui attendu. Ton œil de senior attrape ça.

**Le réflexe :** Review le diff, pas le fichier entier. Concentre-toi sur la logique métier, les types, et les edge cases. Le formatage et la structure devraient être corrects si tes rules sont bonnes.

### 4. La décision (QUAND quelque chose merde)

**Ce que tu fais :** Quand un test échoue, quand le build plante, quand le client dit "non c'est pas ça" — tu décides du next move.

**Pourquoi c'est critique :** L'IA peut itérer en boucle sur un fix sans résoudre le vrai problème. Toi, tu sais prendre du recul, identifier la root cause, et décider si on patch ou si on redesign.

**Le réflexe :** Si l'agent tourne en rond après 2-3 tentatives de fix, stop. Reformule le problème. Change d'angle. C'est là que 30 ans d'expérience font la différence.

## Ce qui change dans le quotidien

### Avant (dev classique)
```
Ticket → Lire la spec → Coder → Tester → Debug → Code review → Merge
```
Temps : 60% coding, 20% debug, 10% review, 10% réflexion.

### Après (dev SDD)
```
Brief → Spec → Rules → Générer → Valider → Itérer → Merge
```
Temps : 10% coding manuel, 30% spec/architecture, 30% review/validation, 30% itération.

Le ratio s'inverse. Moins de mains sur le clavier, plus de cerveau sur le problème.

## Comment reviewer du code généré

### Ce que tu reviewes en priorité

1. **La logique métier** — est-ce que le comportement est correct ? Pas le formatage, pas le nommage (les rules gèrent ça), la LOGIQUE.
2. **Les types** — est-ce que les interfaces sont complètes ? Des champs manquants ? Des `unknown` qui devraient être typés ?
3. **Les edge cases** — formulaire vide, date passée, URL invalide, réseau coupé. L'agent les rate souvent.
4. **Les dépendances** — est-ce qu'il a ajouté un package dont on n'a pas besoin ? Est-ce qu'il utilise le bon hook ?

### Ce que tu NE reviewes PAS

- Le formatage (les rules le gèrent)
- La structure de fichiers (les rules le gèrent)
- Le nommage (les rules le gèrent)
- Les imports (l'éditeur le gère)

Si tu passes du temps sur ces trucs-là, c'est que tes rules sont incomplètes. Améliore les rules au lieu de corriger le code.

## La conduite du changement

### Pour les sceptiques

Le meilleur argument, c'est pas un slide. C'est une démo. "Regarde, on part de zéro, en 30 minutes t'as une app qui marche, avec des tests, et le code est propre."

Les sceptiques ne changent pas d'avis avec des mots. Ils changent d'avis avec des preuves.

### Pour les enthousiastes trop rapides

L'autre risque, c'est le dev qui lâche tout et "vibe code" à fond. Pas de spec, pas de rules, juste du prompting et de la correction manuelle. Ça marche sur un prototype. Ça explose sur un vrai projet.

Le SDD, c'est justement le cadre qui empêche l'enthousiasme de devenir du chaos.

### Pour les managers

L'argument qui tue : **traçabilité**. Chaque feature est liée à un ticket, chaque ticket à une spec, chaque commit à un test. Tu peux auditer, tu peux mesurer, tu peux estimer. C'est pas "ça va plus vite avec l'IA" (ça c'est vague). C'est "voici la spec, voici le code, voici le test, voici le temps."

## L'évolution du rôle

```
Junior (2020)     → Code des features
Senior (2020)     → Architecte + code + review

Junior (2026)     → Spec + review + itère avec l'agent
Senior (2026)     → Architecte + rules + stratégie + mentor
```

Le dev ne disparaît pas. Il monte. Mais il faut accepter que le job change. Et c'est OK — ça fait 50 ans que ça change.

---

*"Mon rôle, c'est pas d'écrire le code. C'est de définir les règles du jeu et de valider que c'est bien fait."*
