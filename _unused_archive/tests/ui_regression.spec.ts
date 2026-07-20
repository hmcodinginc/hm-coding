import { test, expect } from '@playwright/test';

// 1. Define Viewports
const VIEWPORTS = [
  { name: 'mobile_320', width: 320, height: 568 },
  { name: 'mobile_375', width: 375, height: 667 },
  { name: 'tablet_768', width: 768, height: 1024 },
  { name: 'desktop_1024', width: 1024, height: 768 },
  { name: 'desktop_1440', width: 1440, height: 900 },
];

const ROUTES = [
  { name: 'home', path: '/' },
  { name: 'about', path: '/about' },
  { name: 'services', path: '/services' },
  { name: 'projects', path: '/projects' },
  { name: 'career', path: '/careers' },
  { name: 'contact', path: '/contact' },
  { name: 'privacy', path: '/privacy-policy' },
  { name: 'terms', path: '/terms-and-conditions' },
  { name: 'demo-gym', path: '/projects/gym-management' }
];

// Target component or page URL (assuming standard Vite dev server)
const TARGET_URL = 'http://localhost:5173/';

test.describe('Automated UI Regression & Viewport Testing', () => {
  
  for (const vp of VIEWPORTS) {
    test(`Viewport: ${vp.name} (${vp.width}x${vp.height})`, async ({ page }) => {
      
      // 2. Set the viewport size dynamically
      await page.setViewportSize({ width: vp.width, height: vp.height });

      for (const route of ROUTES) {
        await page.goto(`${TARGET_URL}${route.path.substring(1)}`, { waitUntil: 'networkidle' });
        
        await page.evaluate(() => {
          const style = document.createElement('style');
          style.innerHTML = `
            *, *::before, *::after {
              transition: none !important;
              animation: none !important;
              caret-color: transparent !important;
              scroll-behavior: auto !important;
            }
          `;
          document.head.appendChild(style);
        });
        
        await page.waitForTimeout(1000);
        
        await page.screenshot({ 
          path: `test-results/screenshots/${route.name}_${vp.name}.png`,
          fullPage: true 
        });
      }
    });
  }
});
