/**
 * Tests de validation Design System
 * Story 1.3: Setup Design System et shadcn/ui
 */

const fs = require('fs');
const path = require('path');

describe('Design System Tests', () => {
  test('components.json should exist with correct shadcn/ui configuration', () => {
    const componentsConfigPath = path.join(process.cwd(), 'components.json');
    expect(fs.existsSync(componentsConfigPath)).toBe(true);
    
    const config = JSON.parse(fs.readFileSync(componentsConfigPath, 'utf8'));
    
    // Vérifier configuration shadcn/ui
    expect(config.style).toBeDefined();
    expect(config.rsc).toBeDefined();
    expect(config.tsx).toBeDefined();
    expect(config.tailwind).toBeDefined();
    expect(config.aliases).toBeDefined();
    expect(config.aliases.components).toContain('@/components');
    expect(config.aliases.utils).toContain('@/lib/utils');
  });

  test('globals.css should contain warm pastel design system colors', () => {
    const globalsPath = path.join(process.cwd(), 'app', 'globals.css');
    expect(fs.existsSync(globalsPath)).toBe(true);
    
    const globalsContent = fs.readFileSync(globalsPath, 'utf8');
    
    // Vérifier couleurs oklch
    expect(globalsContent).toContain('oklch(0.55 0.08 155)'); // primary teal/sage
    expect(globalsContent).toContain('oklch(0.995 0.003 80)'); // background cream
    expect(globalsContent).toContain('oklch(0.63 0.16 18)'); // destructive coral
    expect(globalsContent).toContain('oklch(0.65 0.12 145)'); // emerald
    expect(globalsContent).toContain('oklch(0.75 0.12 85)'); // amber
    expect(globalsContent).toContain('oklch(0.65 0.10 220)'); // sky
    expect(globalsContent).toContain('oklch(0.65 0.15 10)'); // rose
    
    // Vérifier support dark mode
    expect(globalsContent).toContain('.dark');
  });

  test('essential UI components should be installed', () => {
    const uiPath = path.join(process.cwd(), 'components', 'ui');
    expect(fs.existsSync(uiPath)).toBe(true);
    
    // Vérifier composants essentiels
    const requiredComponents = [
      'button.tsx',
      'input.tsx', 
      'form.tsx',
      'dialog.tsx',
      'toast.tsx',
      'badge.tsx',
      'table.tsx',
      'skeleton.tsx'
    ];
    
    for (const component of requiredComponents) {
      const componentPath = path.join(uiPath, component);
      expect(fs.existsSync(componentPath)).toBe(true);
    }
  });

  test('lib/utils.ts should exist with cn function', () => {
    const utilsPath = path.join(process.cwd(), 'lib', 'utils.ts');
    expect(fs.existsSync(utilsPath)).toBe(true);
    
    const utilsContent = fs.readFileSync(utilsPath, 'utf8');
    
    // Vérifier fonction cn (className merge)
    expect(utilsContent).toContain('cn');
    expect(utilsContent).toContain('clsx');
    expect(utilsContent).toContain('tailwind-merge');
  });

  test('required dependencies should be installed', () => {
    const packagePath = path.join(process.cwd(), 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    
    // Vérifier dépendances shadcn/ui essentielles
    expect(packageJson.dependencies['@radix-ui/react-dialog']).toBeDefined();
    expect(packageJson.dependencies['@radix-ui/react-toast']).toBeDefined();
    expect(packageJson.dependencies['class-variance-authority']).toBeDefined();
    expect(packageJson.dependencies['clsx']).toBeDefined();
    expect(packageJson.dependencies['tailwind-merge']).toBeDefined();
    expect(packageJson.dependencies['lucide-react']).toBeDefined();
  });

  test('Tailwind v4: globals.css should use @theme inline for token mapping (no tailwind.config.ts)', () => {
    const globalsPath = path.join(process.cwd(), 'app', 'globals.css');
    const globalsContent = fs.readFileSync(globalsPath, 'utf8');
    
    // Tailwind v4 uses @theme inline in CSS, not tailwind.config.ts
    expect(globalsContent).toContain('@theme inline');
    expect(globalsContent).toContain('--color-primary');
    expect(globalsContent).toContain('--color-destructive');
    expect(globalsContent).toContain('--color-background');
  });

  test('design system should support both light and dark modes', () => {
    const globalsPath = path.join(process.cwd(), 'app', 'globals.css');
    const globalsContent = fs.readFileSync(globalsPath, 'utf8');
    
    // Vérifier définitions root (light mode)
    expect(globalsContent).toContain(':root {');
    
    // Vérifier définitions dark mode
    expect(globalsContent).toContain('.dark {');
    
    // Vérifier que les mêmes variables sont définies pour les deux modes
    expect(globalsContent.match(/--background:/g).length).toBeGreaterThanOrEqual(2);
    expect(globalsContent.match(/--foreground:/g).length).toBeGreaterThanOrEqual(2);
    expect(globalsContent.match(/--primary:/g).length).toBeGreaterThanOrEqual(2);
  });
});