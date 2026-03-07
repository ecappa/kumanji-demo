#!/usr/bin/env node
/**
 * Script d'initialisation PocketBase
 * Configure la collection events avec le schéma requis
 */

import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

async function initializePocketBase() {
  try {
    console.log('🚀 Initialisation de PocketBase...');

    // Créer la collection events
    const collection = await pb.collections.create({
      name: 'events',
      type: 'base',
      schema: [
        {
          name: 'title',
          type: 'text',
          required: true,
          options: {
            min: 1,
            max: 200
          }
        },
        {
          name: 'description',
          type: 'text',
          required: false,
          options: {
            max: 2000
          }
        },
        {
          name: 'date',
          type: 'date',
          required: true
        },
        {
          name: 'youtube_url',
          type: 'url',
          required: false
        },
        {
          name: 'status',
          type: 'select',
          required: true,
          options: {
            values: ['draft', 'published', 'completed', 'cancelled']
          }
        },
        {
          name: 'image_url',
          type: 'url',
          required: false
        }
      ]
    });

    console.log('✅ Collection "events" créée avec succès');

    // Créer quelques événements de test
    const testEvents = [
      {
        title: 'Conférence Tech 2026',
        description: 'Une conférence sur les dernières technologies web',
        date: '2026-04-15',
        status: 'published',
        youtube_url: 'https://youtube.com/watch?v=example1'
      },
      {
        title: 'Atelier React',
        description: 'Apprendre React 19 avec des exemples pratiques',
        date: '2026-03-20',
        status: 'draft'
      },
      {
        title: 'Meetup JavaScript',
        description: 'Rencontre mensuelle des développeurs JavaScript',
        date: '2026-02-28',
        status: 'completed'
      }
    ];

    for (const event of testEvents) {
      await pb.collection('events').create(event);
    }

    console.log('✅ Événements de test créés');
    console.log('🎉 PocketBase initialisé avec succès!');

  } catch (error) {
    if (error.message?.includes('already exists')) {
      console.log('ℹ️  Collection "events" existe déjà');
    } else {
      console.error('❌ Erreur lors de l\'initialisation:', error.message);
    }
  }
}

initializePocketBase();