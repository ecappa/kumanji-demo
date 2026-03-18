/**
 * Tests de validation PocketBase setup
 * Story 1.2: Configuration PocketBase et Collection Events
 */

const fs = require('fs');
const path = require('path');

describe('PocketBase Setup Tests', () => {
  test('docker-compose.yml should exist with correct PocketBase service', () => {
    const dockerComposePath = path.join(process.cwd(), 'docker-compose.yml');
    expect(fs.existsSync(dockerComposePath)).toBe(true);
    
    const dockerComposeContent = fs.readFileSync(dockerComposePath, 'utf8');
    
    // Vérifier service PocketBase
    expect(dockerComposeContent).toContain('pocketbase:');
    expect(dockerComposeContent).toMatch(/pocketbase:latest|ghcr\.io\/muchobien\/pocketbase:latest/);
    expect(dockerComposeContent).toContain('"8090:8090"');
    expect(dockerComposeContent).toContain('./pb_data:/pb_data');
  });

  test('lib/pocketbase.ts should exist with correct configuration', () => {
    const pocketbasePath = path.join(process.cwd(), 'lib', 'pocketbase.ts');
    expect(fs.existsSync(pocketbasePath)).toBe(true);
    
    const pocketbaseContent = fs.readFileSync(pocketbasePath, 'utf8');
    
    // Vérifier import et configuration
    expect(pocketbaseContent).toContain("import PocketBase from 'pocketbase'");
    expect(pocketbaseContent).toContain('http://127.0.0.1:8090');
    expect(pocketbaseContent).toContain('autoCancellation(false)');
    expect(pocketbaseContent).toContain('export default');
  });

  test('lib/types/event.ts should exist with correct Event interface', () => {
    const eventTypesPath = path.join(process.cwd(), 'lib', 'types', 'event.ts');
    expect(fs.existsSync(eventTypesPath)).toBe(true);
    
    const eventTypesContent = fs.readFileSync(eventTypesPath, 'utf8');
    
    // Vérifier interface Event
    expect(eventTypesContent).toContain('interface Event');
    expect(eventTypesContent).toContain('id: string');
    expect(eventTypesContent).toContain('title: string');
    expect(eventTypesContent).toContain('description?: string');
    expect(eventTypesContent).toContain('date: string');
    expect(eventTypesContent).toContain('youtube_url?: string');
    expect(eventTypesContent).toContain("'draft' | 'published' | 'completed' | 'cancelled'");
    expect(eventTypesContent).toContain('image_url?: string');
  });

  test('PocketBase dependency should be installed', () => {
    const packagePath = path.join(process.cwd(), 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    
    // Vérifier que pocketbase est dans les dépendances
    expect(packageJson.dependencies.pocketbase).toBeDefined();
  });

  test('.env.local should exist with PocketBase configuration', () => {
    const envPath = path.join(process.cwd(), '.env.local');
    expect(fs.existsSync(envPath)).toBe(true);
    
    const envContent = fs.readFileSync(envPath, 'utf8');
    
    // Vérifier variables PocketBase
    expect(envContent).toContain('POCKETBASE_URL');
  });

  test('pb_data directory should exist for Docker volume', () => {
    const pbDataPath = path.join(process.cwd(), 'pb_data');
    expect(fs.existsSync(pbDataPath)).toBe(true);
  });
});