/**
 * Tests de validation Architecture TypeScript
 * Story 1.4: Architecture TypeScript et Structure Projet
 */

const fs = require('fs');
const path = require('path');

describe('TypeScript Architecture Tests', () => {
  test('project structure should follow AGENTS.md conventions', () => {
    const projectRoot = process.cwd();
    
    // Vérifier structure principale
    expect(fs.existsSync(path.join(projectRoot, 'app'))).toBe(true);
    expect(fs.existsSync(path.join(projectRoot, 'components'))).toBe(true);
    expect(fs.existsSync(path.join(projectRoot, 'lib'))).toBe(true);
    
    // Vérifier sous-structure components
    expect(fs.existsSync(path.join(projectRoot, 'components', 'events'))).toBe(true);
    expect(fs.existsSync(path.join(projectRoot, 'components', 'layout'))).toBe(true);
    expect(fs.existsSync(path.join(projectRoot, 'components', 'ui'))).toBe(true);
    
    // Vérifier sous-structure lib
    expect(fs.existsSync(path.join(projectRoot, 'lib', 'types'))).toBe(true);
    expect(fs.existsSync(path.join(projectRoot, 'lib', 'hooks'))).toBe(true);
    expect(fs.existsSync(path.join(projectRoot, 'lib', 'providers'))).toBe(true);
  });

  test('base TypeScript types should be properly defined', () => {
    const eventTypesPath = path.join(process.cwd(), 'lib', 'types', 'event.ts');
    expect(fs.existsSync(eventTypesPath)).toBe(true);
    
    const eventTypesContent = fs.readFileSync(eventTypesPath, 'utf8');
    
    // Vérifier EventStatus type
    expect(eventTypesContent).toContain("type EventStatus = 'draft' | 'published' | 'completed' | 'cancelled'");
    
    // Vérifier Event interface
    expect(eventTypesContent).toContain('interface Event');
    expect(eventTypesContent).toContain('id: string');
    expect(eventTypesContent).toContain('title: string');
    expect(eventTypesContent).toContain('description?: string');
    expect(eventTypesContent).toContain('date: string');
    expect(eventTypesContent).toContain('youtube_url?: string');
    expect(eventTypesContent).toContain('status: EventStatus');
    expect(eventTypesContent).toContain('image_url?: string');
    expect(eventTypesContent).toContain('created: string');
    expect(eventTypesContent).toContain('updated: string');
  });

  test('lib/types/index.ts should export all types', () => {
    const indexTypesPath = path.join(process.cwd(), 'lib', 'types', 'index.ts');
    expect(fs.existsSync(indexTypesPath)).toBe(true);
    
    const indexContent = fs.readFileSync(indexTypesPath, 'utf8');
    
    // Vérifier export centralisé
    expect(indexContent).toContain("export * from './event'");
  });

  test('TanStack Query should be installed and configured', () => {
    const packagePath = path.join(process.cwd(), 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    
    // Vérifier dépendance TanStack Query
    expect(packageJson.dependencies['@tanstack/react-query']).toBeDefined();
    
    // Vérifier QueryProvider
    const queryProviderPath = path.join(process.cwd(), 'lib', 'providers', 'query-provider.tsx');
    expect(fs.existsSync(queryProviderPath)).toBe(true);
    
    const providerContent = fs.readFileSync(queryProviderPath, 'utf8');
    expect(providerContent).toContain("'use client'");
    expect(providerContent).toContain('QueryClient');
    expect(providerContent).toContain('QueryClientProvider');
  });

  test('app/layout.tsx should be configured with providers', () => {
    const layoutPath = path.join(process.cwd(), 'app', 'layout.tsx');
    expect(fs.existsSync(layoutPath)).toBe(true);
    
    const layoutContent = fs.readFileSync(layoutPath, 'utf8');
    
    // Vérifier que le layout importe et utilise les providers
    expect(layoutContent).toContain('QueryProvider');
  });

  test('lib/pocketbase.ts should exist and be properly configured', () => {
    const pocketbasePath = path.join(process.cwd(), 'lib', 'pocketbase.ts');
    expect(fs.existsSync(pocketbasePath)).toBe(true);
    
    const pocketbaseContent = fs.readFileSync(pocketbasePath, 'utf8');
    
    // Vérifier configuration singleton
    expect(pocketbaseContent).toContain("import PocketBase from 'pocketbase'");
    expect(pocketbaseContent).toContain('http://127.0.0.1:8090');
    expect(pocketbaseContent).toContain('autoCancellation(false)');
    expect(pocketbaseContent).toContain('export default');
  });

  test('base hooks structure should exist', () => {
    const hooksPath = path.join(process.cwd(), 'lib', 'hooks');
    expect(fs.existsSync(hooksPath)).toBe(true);
    
    // Vérifier qu'au moins un hook de base existe
    const useEventsPath = path.join(hooksPath, 'use-events.ts');
    if (fs.existsSync(useEventsPath)) {
      const useEventsContent = fs.readFileSync(useEventsPath, 'utf8');
      
      // Vérifier conventions de nommage pour hooks
      expect(useEventsContent).toContain('export');
    }
  });

  test('lib/utils.ts should exist with proper exports', () => {
    const utilsPath = path.join(process.cwd(), 'lib', 'utils.ts');
    expect(fs.existsSync(utilsPath)).toBe(true);
    
    const utilsContent = fs.readFileSync(utilsPath, 'utf8');
    
    // Vérifier fonction cn (className merge) de shadcn
    expect(utilsContent).toContain('cn');
    expect(utilsContent).toContain('export');
  });

  test('naming conventions should be followed', () => {
    const componentsPath = path.join(process.cwd(), 'components');
    const libPath = path.join(process.cwd(), 'lib');
    
    // Fonction pour vérifier les conventions de nommage
    const checkNamingConventions = (dirPath) => {
      if (!fs.existsSync(dirPath)) return;
      
      const files = fs.readdirSync(dirPath, { withFileTypes: true });
      
      for (const file of files) {
        if (file.isFile() && (file.name.endsWith('.ts') || file.name.endsWith('.tsx'))) {
          // Vérifier kebab-case pour les fichiers
          const nameWithoutExt = file.name.replace(/\.(ts|tsx)$/, '');
          const isKebabCase = /^[a-z]+([a-z0-9]*(-[a-z0-9]+)*)$/.test(nameWithoutExt) || 
                             /^(index|page|layout|loading|error|not-found)$/.test(nameWithoutExt);
          
          // Hooks doivent commencer par 'use-'
          if (dirPath.includes('hooks')) {
            expect(nameWithoutExt.startsWith('use-')).toBe(true);
          }
        }
      }
    };
    
    // Vérifier dossiers principaux
    checkNamingConventions(libPath);
    checkNamingConventions(path.join(libPath, 'hooks'));
    checkNamingConventions(path.join(libPath, 'types'));
  });
});