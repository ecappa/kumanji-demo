/**
 * Tests de validation pour l'initialisation Next.js
 * Story 1.1: Initialisation Next.js avec App Router
 */

const fs = require('fs');
const path = require('path');

describe('Next.js Initialization Tests', () => {
  test('package.json should exist with correct dependencies', () => {
    const packagePath = path.join(process.cwd(), 'package.json');
    expect(fs.existsSync(packagePath)).toBe(true);
    
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    
    // Vérifier Next.js 15+
    expect(packageJson.dependencies.next).toBeDefined();
    expect(packageJson.dependencies.react).toBeDefined();
    expect(packageJson.dependencies['react-dom']).toBeDefined();
    
    // Vérifier TypeScript
    expect(packageJson.devDependencies.typescript).toBeDefined();
    expect(packageJson.devDependencies['@types/node']).toBeDefined();
    expect(packageJson.devDependencies['@types/react']).toBeDefined();
    expect(packageJson.devDependencies['@types/react-dom']).toBeDefined();
    
    // Vérifier Tailwind CSS v4 (pas d'autoprefixer, intégré)
    expect(packageJson.devDependencies.tailwindcss).toBeDefined();
    expect(packageJson.devDependencies.postcss).toBeDefined();
    expect(packageJson.devDependencies['@tailwindcss/postcss']).toBeDefined();
    
    // Vérifier ESLint
    expect(packageJson.devDependencies.eslint).toBeDefined();
    expect(packageJson.devDependencies['eslint-config-next']).toBeDefined();
  });

  test('tsconfig.json should exist with strict mode', () => {
    const tsconfigPath = path.join(process.cwd(), 'tsconfig.json');
    expect(fs.existsSync(tsconfigPath)).toBe(true);
    
    const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));
    
    // Vérifier strict mode
    expect(tsconfig.compilerOptions.strict).toBe(true);
    
    // Vérifier import alias
    expect(tsconfig.compilerOptions.paths).toBeDefined();
    expect(tsconfig.compilerOptions.paths['@/*']).toBeDefined();
  });

  test('next.config.mjs should exist', () => {
    const nextConfigPath = path.join(process.cwd(), 'next.config.mjs');
    expect(fs.existsSync(nextConfigPath)).toBe(true);
  });

  test('Tailwind v4: globals.css should contain @import "tailwindcss" (no tailwind.config.ts needed)', () => {
    const globalsPath = path.join(process.cwd(), 'app', 'globals.css');
    expect(fs.existsSync(globalsPath)).toBe(true);
    
    const globalsContent = fs.readFileSync(globalsPath, 'utf8');
    expect(globalsContent).toContain('@import "tailwindcss"');
  });

  test('app directory structure should exist', () => {
    const appPath = path.join(process.cwd(), 'app');
    expect(fs.existsSync(appPath)).toBe(true);
    
    // Vérifier layout.tsx existe
    const layoutPath = path.join(appPath, 'layout.tsx');
    expect(fs.existsSync(layoutPath)).toBe(true);
    
    // Vérifier page.tsx existe
    const pagePath = path.join(appPath, 'page.tsx');
    expect(fs.existsSync(pagePath)).toBe(true);
    
    // Vérifier globals.css existe
    const globalsPath = path.join(appPath, 'globals.css');
    expect(fs.existsSync(globalsPath)).toBe(true);
  });

  test('project structure should follow AGENTS.md conventions', () => {
    const projectRoot = process.cwd();
    
    // Vérifier structure de base
    expect(fs.existsSync(path.join(projectRoot, 'app'))).toBe(true);
    expect(fs.existsSync(path.join(projectRoot, 'components'))).toBe(true);
    expect(fs.existsSync(path.join(projectRoot, 'lib'))).toBe(true);
    
    // Vérifier sous-structure selon AGENTS.md
    expect(fs.existsSync(path.join(projectRoot, 'components', 'events'))).toBe(true);
    expect(fs.existsSync(path.join(projectRoot, 'components', 'layout'))).toBe(true);
    expect(fs.existsSync(path.join(projectRoot, 'components', 'ui'))).toBe(true);
    expect(fs.existsSync(path.join(projectRoot, 'lib', 'types'))).toBe(true);
    expect(fs.existsSync(path.join(projectRoot, 'lib', 'hooks'))).toBe(true);
    
    // Pas de src/ directory (selon commande)
    expect(fs.existsSync(path.join(projectRoot, 'src'))).toBe(false);
  });
});