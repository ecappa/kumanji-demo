import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

async function setupCollection() {
  try {
    // PocketBase v0.23+ : auth via _superusers (PAS pb.admins)
    await pb.collection('_superusers').authWithPassword('admin@demo.local', 'Demo1234!');
    console.log('✅ Authenticated as superuser');

    try {
      await pb.collections.getOne('events');
      console.log('✅ Collection "events" already exists');
      return;
    } catch {
      console.log('Creating collection "events"...');
    }

    // PocketBase v0.23+ : format "fields" au top-level (PAS "schema" avec "options")
    const collection = await pb.collections.create({
      name: 'events',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: '',
      updateRule: '',
      deleteRule: '',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          min: 1,
          max: 255,
        },
        {
          name: 'description',
          type: 'text',
          required: false,
        },
        {
          name: 'date',
          type: 'date',
          required: true,
        },
        {
          name: 'youtube_url',
          type: 'url',
          required: false,
        },
        {
          name: 'status',
          type: 'select',
          required: true,
          maxSelect: 1,
          values: ['draft', 'published', 'completed', 'cancelled'],
        },
        {
          name: 'image_url',
          type: 'url',
          required: false,
        },
      ],
    });

    console.log('✅ Collection "events" created successfully');
    console.log('Collection ID:', collection.id);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

setupCollection();
