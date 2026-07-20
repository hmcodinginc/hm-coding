# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui_regression.spec.ts >> Automated UI Regression & Viewport Testing >> Viewport: mobile_375 (375x667)
- Location: tests\ui_regression.spec.ts:24:5

# Error details

```
Error: expect(page).toHaveScreenshot(expected) failed

Timeout: 5000ms
  Failed to take two consecutive stable screenshots.

  Snapshot: home_mobile_375.png

Call log:
  - Expect "toHaveScreenshot(home_mobile_375.png)" with timeout 5000ms
    - generating new stable screenshot expectation
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - waiting 100ms before taking screenshot
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - 2410 pixels (ratio 0.01 of all image pixels) are different.
  - waiting 250ms before taking screenshot
  - Timeout 5000ms exceeded.

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic:
    - generic:
      - generic:
        - img
  - banner [ref=e4]:
    - generic [ref=e5]:
      - link "HM Coding home" [ref=e7] [cursor=pointer]:
        - /url: /
        - img "HM Coding" [ref=e9]
        - text: HM Coding
      - button "Toggle menu" [ref=e14] [cursor=pointer]:
        - img [ref=e15]
  - main [ref=e17]:
    - generic [ref=e18]:
      - generic [ref=e20]:
        - generic [ref=e21]:
          - generic [ref=e22]: Digital Solutions That Drive Growth
          - heading "HM Coding Empowers Your Business Growth" [level=1] [ref=e23]:
            - text: HM Coding
            - text: Empowers Your Business Growth
          - paragraph [ref=e24]: Since 2025
          - paragraph [ref=e25]: We craft websites, web apps, mobile apps, and intelligent solutions that empower your business to innovate and scale.
          - generic [ref=e26]:
            - button "Start Your Project" [ref=e27] [cursor=pointer]
            - button "Book a Demo" [ref=e28] [cursor=pointer]
        - generic [ref=e30]:
          - generic:
            - img
          - generic:
            - img
          - img "HM Coding" [ref=e33]
      - generic [ref=e38]:
        - generic [ref=e39]:
          - generic [ref=e40]:
            - generic [ref=e41]:
              - generic [ref=e42]: Waiting...
              - generic [ref=e43]: 0%
            - generic [ref=e46]:
              - generic [ref=e47]:
                - img [ref=e49]
                - generic [ref=e51]: Security vulnerabilities detected
              - generic [ref=e52]:
                - img [ref=e54]
                - generic [ref=e56]: Performance improvements available
              - generic [ref=e57]:
                - img [ref=e59]
                - generic [ref=e61]: Lead capture opportunities found
              - generic [ref=e62]:
                - img [ref=e64]
                - generic [ref=e66]: SEO issues identified
          - generic [ref=e67]:
            - heading "Your Website Is Leaving Opportunities Behind." [level=2] [ref=e68]
            - button "Contact us" [ref=e71] [cursor=pointer]:
              - generic [ref=e73]: Contact us
        - generic [ref=e75]:
          - img "Convertly Dashboard Preview" [ref=e78]
          - button "Get Free Website Analysis" [ref=e79] [cursor=pointer]:
            - generic [ref=e81]: Get Free Website Analysis
            - img [ref=e82]
  - contentinfo [ref=e91]:
    - generic [ref=e92]:
      - generic [ref=e93]:
        - generic [ref=e94]:
          - generic [ref=e95]:
            - img "HM Coding" [ref=e96]
            - generic [ref=e100]: HM Coding
          - paragraph [ref=e101]: HM Coding delivers modern, efficient, and scalable software solutions — from web and mobile apps to smart integrations.
          - link "LinkedIn" [ref=e103] [cursor=pointer]:
            - /url: https://www.linkedin.com/company/hm-coding/posts/?feedView=all
            - img [ref=e104]
        - navigation "Footer quick links" [ref=e106]:
          - heading "Quick Links" [level=3] [ref=e108]
          - list [ref=e109]:
            - listitem [ref=e110]:
              - link "Home" [ref=e111] [cursor=pointer]:
                - /url: /
            - listitem [ref=e112]:
              - link "Services" [ref=e113] [cursor=pointer]:
                - /url: /services
            - listitem [ref=e114]:
              - link "Projects" [ref=e115] [cursor=pointer]:
                - /url: /projects
            - listitem [ref=e116]:
              - link "Careers" [ref=e117] [cursor=pointer]:
                - /url: /careers
        - navigation "Footer services" [ref=e118]:
          - heading "Services" [level=3] [ref=e120]
          - list [ref=e121]:
            - listitem [ref=e122]:
              - link "Website" [ref=e123] [cursor=pointer]:
                - /url: /services
            - listitem [ref=e124]:
              - link "Web App" [ref=e125] [cursor=pointer]:
                - /url: /services
            - listitem [ref=e126]:
              - link "Mobile App" [ref=e127] [cursor=pointer]:
                - /url: /services
            - listitem [ref=e128]:
              - link "Smart Integrations" [ref=e129] [cursor=pointer]:
                - /url: /services
        - navigation "Footer company links" [ref=e130]:
          - heading "Company" [level=3] [ref=e132]
          - list [ref=e133]:
            - listitem [ref=e134]:
              - link "About" [ref=e135] [cursor=pointer]:
                - /url: /about
            - listitem [ref=e136]:
              - button "Book Demo" [ref=e137] [cursor=pointer]
            - listitem [ref=e138]:
              - link "Terms & Conditions" [ref=e139] [cursor=pointer]:
                - /url: /terms
            - listitem [ref=e140]:
              - link "Privacy Policy" [ref=e141] [cursor=pointer]:
                - /url: /privacy
        - generic [ref=e142]:
          - heading "Let's Talk" [level=3] [ref=e144]
          - paragraph [ref=e145]: Ready to build the future? Reach out to us for a free consultation or project estimation.
          - button "Contact Us" [ref=e146] [cursor=pointer]
      - generic [ref=e147]: © 2025-2026 HM Coding. All rights reserved.
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | // 1. Define Viewports
  4  | const VIEWPORTS = [
  5  |   // Mobile
  6  |   { name: 'mobile_320', width: 320, height: 568 },
  7  |   { name: 'mobile_375', width: 375, height: 667 },
  8  |   { name: 'mobile_414', width: 414, height: 896 },
  9  |   // Tablet
  10 |   { name: 'tablet_768', width: 768, height: 1024 },
  11 |   { name: 'tablet_1024', width: 1024, height: 768 },
  12 |   // Desktop
  13 |   { name: 'desktop_1280', width: 1280, height: 720 },
  14 |   { name: 'desktop_1440', width: 1440, height: 900 },
  15 |   { name: 'desktop_1920', width: 1920, height: 1080 },
  16 | ];
  17 | 
  18 | // Target component or page URL (assuming standard Vite dev server)
  19 | const TARGET_URL = 'http://localhost:5173/';
  20 | 
  21 | test.describe('Automated UI Regression & Viewport Testing', () => {
  22 |   
  23 |   for (const vp of VIEWPORTS) {
  24 |     test(`Viewport: ${vp.name} (${vp.width}x${vp.height})`, async ({ page }) => {
  25 |       
  26 |       // 2. Set the viewport size dynamically
  27 |       await page.setViewportSize({ width: vp.width, height: vp.height });
  28 | 
  29 |       // Navigate to the component and wait for all network requests to finish loading
  30 |       await page.goto(TARGET_URL, { waitUntil: 'networkidle' });
  31 | 
  32 |       // 3. Handle Dynamic Content: Freeze all CSS animations and transitions
  33 |       await page.evaluate(() => {
  34 |         const style = document.createElement('style');
  35 |         style.innerHTML = `
  36 |           *, *::before, *::after {
  37 |             transition: none !important;
  38 |             animation: none !important;
  39 |             caret-color: transparent !important;
  40 |             scroll-behavior: auto !important;
  41 |           }
  42 |         `;
  43 |         document.head.appendChild(style);
  44 |       });
  45 | 
  46 |       // Wait a brief moment to ensure React renders after CSS injection
  47 |       await page.waitForTimeout(1000);
  48 | 
  49 |       // 4. Automated Screenshot Capture & UI Breakage Detection
> 50 |       await expect(page).toHaveScreenshot(`home_${vp.name}.png`, {
     |                          ^ Error: expect(page).toHaveScreenshot(expected) failed
  51 |         fullPage: true,          
  52 |         maxDiffPixelRatio: 0.02, 
  53 |       });
  54 |     });
  55 |   }
  56 | });
  57 | 
```