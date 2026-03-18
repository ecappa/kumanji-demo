#!/usr/bin/env node
/**
 * Script pour créer des événements de test
 * Doit être exécuté après création de la collection events
 */

const testEvents = [
  {
    title: 'Conférence Tech 2026',
    description: 'Une conférence sur les dernières technologies web et les frameworks modernes. Découvrez React 19, Next.js 15 et bien plus.',
    date: '2026-04-15',
    status: 'published',
    youtube_url: 'https://youtube.com/watch?v=example1'
  },
  {
    title: 'Atelier React Avancé',
    description: 'Approfondissez vos connaissances React avec les hooks, le state management et les patterns avancés.',
    date: '2026-03-20',
    status: 'draft'
  },
  {
    title: 'Meetup JavaScript Paris',
    description: 'Rencontre mensuelle des développeurs JavaScript de Paris. Présentations, networking et discussions techniques.',
    date: '2026-02-28',
    status: 'completed'
  },
  {
    title: 'Workshop TypeScript',
    description: 'Maîtrisez TypeScript pour des applications robustes et maintenables.',
    date: '2026-05-10',
    status: 'published',
    image_url: 'https://picsum.photos/800/400?random=1'
  },
  {
    title: 'Hackathon Innovation',
    description: 'Un weekend pour innover et créer des solutions technologiques révolutionnaires.',
    date: '2026-01-15',
    status: 'cancelled'
  },
  {
    title: 'Formation Vue.js',
    description: 'Formation complète sur Vue.js 3 avec Composition API et les dernières fonctionnalités.',
    date: '2026-06-05',
    status: 'draft',
    youtube_url: 'https://youtube.com/watch?v=example2',
    image_url: 'https://picsum.photos/800/400?random=2'
  }
];

console.log('Événements de test prêts à créer:');
console.log(JSON.stringify(testEvents, null, 2));

// Instructions pour l'utilisateur
console.log('\n📝 Pour créer ces événements:');
console.log('1. Ouvrez http://127.0.0.1:8090/_/ dans votre navigateur');
console.log('2. Créez la collection "events" avec les champs appropriés');
console.log('3. Ajoutez ces événements via l\'interface admin');

console.log('\n🔧 Champs de la collection "events":');
console.log('- title: text (required, max: 200)');
console.log('- description: text (optional, max: 2000)');
console.log('- date: date (required)');
console.log('- status: select (required, values: draft, published, completed, cancelled)');
console.log('- youtube_url: url (optional)');
console.log('- image_url: url (optional)');