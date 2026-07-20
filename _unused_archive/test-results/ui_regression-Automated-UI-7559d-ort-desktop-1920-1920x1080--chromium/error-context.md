# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui_regression.spec.ts >> Automated UI Regression & Viewport Testing >> Viewport: desktop_1920 (1920x1080)
- Location: tests\ui_regression.spec.ts:24:5

# Error details

```
Error: expect(page).toHaveScreenshot(expected) failed

Timeout: 5000ms
  Failed to take two consecutive stable screenshots.

  Snapshot: home_desktop_1920.png

Call log:
  - Expect "toHaveScreenshot(home_desktop_1920.png)" with timeout 5000ms
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
  - 23554 pixels (ratio 0.01 of all image pixels) are different.
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
      - navigation [ref=e13]:
        - link "Services" [ref=e14] [cursor=pointer]:
          - /url: /services
        - link "Careers" [ref=e15] [cursor=pointer]:
          - /url: /careers
        - link "Projects" [ref=e16] [cursor=pointer]:
          - /url: /projects
        - link "About" [ref=e17] [cursor=pointer]:
          - /url: /about
        - button "Book Demo" [ref=e18] [cursor=pointer]
  - main [ref=e19]:
    - generic [ref=e20]:
      - generic [ref=e22]:
        - generic [ref=e23]:
          - generic [ref=e24]: Digital Solutions That Drive Growth
          - heading "HM Coding Empowers Your Business Growth" [level=1] [ref=e25]:
            - text: HM Coding
            - text: Empowers Your Business Growth
          - paragraph [ref=e26]: Since 2025
          - paragraph [ref=e27]: We craft websites, web apps, mobile apps, and intelligent solutions that empower your business to innovate and scale.
          - generic [ref=e28]:
            - button "Start Your Project" [ref=e29] [cursor=pointer]
            - button "Book a Demo" [ref=e30] [cursor=pointer]
        - generic [ref=e32]:
          - generic:
            - img
          - generic:
            - img
          - img "HM Coding" [ref=e35]
      - generic [ref=e40]:
        - generic [ref=e41]:
          - generic [ref=e42]:
            - generic [ref=e43]:
              - generic [ref=e44]: Analysis Complete.
              - generic [ref=e45]: 100%
            - generic [ref=e49]:
              - generic [ref=e50]:
                - img [ref=e52]
                - generic [ref=e54]: Security vulnerabilities detected
              - generic [ref=e55]:
                - img [ref=e57]
                - generic [ref=e59]: Performance improvements available
              - generic [ref=e60]:
                - img [ref=e62]
                - generic [ref=e64]: Lead capture opportunities found
              - generic [ref=e65]:
                - img [ref=e67]
                - generic [ref=e69]: SEO issues identified
          - generic [ref=e70]:
            - heading "Your Website Is Leaving Opportunities Behind." [level=2] [ref=e71]
            - button "Contact us" [ref=e74] [cursor=pointer]:
              - generic [ref=e76]: Contact us
        - generic [ref=e78]:
          - img "Convertly Dashboard Preview" [ref=e81]
          - button "Get Free Website Analysis" [ref=e82] [cursor=pointer]:
            - generic [ref=e84]: Get Free Website Analysis
            - img [ref=e85]
      - generic [ref=e89]:
        - generic [ref=e90]:
          - paragraph [ref=e91]: WHY CHOOSE US
          - heading "We Build Solutions That Drive Results" [level=2] [ref=e93]
          - paragraph [ref=e94]: From concept to launch, we deliver high-performance digital products tailored to your business goals.
        - generic [ref=e95]:
          - generic [ref=e96]:
            - img [ref=e98]
            - heading "Faster Delivery" [level=3] [ref=e100]
            - paragraph [ref=e101]: Agile workflows and modern tooling help us ship production-ready products on tight timelines without sacrificing quality.
          - generic [ref=e102]:
            - img [ref=e104]
            - heading "Scalable & Secure" [level=3] [ref=e106]
            - paragraph [ref=e107]: Every project meets high standards of reliability, performance, and security — built to grow with your business.
          - generic [ref=e108]:
            - img [ref=e110]
            - heading "User-Centered Design" [level=3] [ref=e112]
            - paragraph [ref=e113]: We think beyond code — designing intuitive experiences that solve real-world problems and delight end users.
  - contentinfo [ref=e120]:
    - generic [ref=e121]:
      - generic [ref=e122]:
        - generic [ref=e123]:
          - generic [ref=e124]:
            - img "HM Coding" [ref=e125]
            - generic [ref=e129]: HM Coding
          - paragraph [ref=e130]: HM Coding delivers modern, efficient, and scalable software solutions — from web and mobile apps to smart integrations.
          - link "LinkedIn" [ref=e132] [cursor=pointer]:
            - /url: https://www.linkedin.com/company/hm-coding/posts/?feedView=all
            - img [ref=e133]
        - navigation "Footer quick links" [ref=e135]:
          - heading "Quick Links" [level=3] [ref=e137]
          - list [ref=e138]:
            - listitem [ref=e139]:
              - link "Home" [ref=e140] [cursor=pointer]:
                - /url: /
            - listitem [ref=e141]:
              - link "Services" [ref=e142] [cursor=pointer]:
                - /url: /services
            - listitem [ref=e143]:
              - link "Projects" [ref=e144] [cursor=pointer]:
                - /url: /projects
            - listitem [ref=e145]:
              - link "Careers" [ref=e146] [cursor=pointer]:
                - /url: /careers
        - navigation "Footer services" [ref=e147]:
          - heading "Services" [level=3] [ref=e149]
          - list [ref=e150]:
            - listitem [ref=e151]:
              - link "Website" [ref=e152] [cursor=pointer]:
                - /url: /services
            - listitem [ref=e153]:
              - link "Web App" [ref=e154] [cursor=pointer]:
                - /url: /services
            - listitem [ref=e155]:
              - link "Mobile App" [ref=e156] [cursor=pointer]:
                - /url: /services
            - listitem [ref=e157]:
              - link "Smart Integrations" [ref=e158] [cursor=pointer]:
                - /url: /services
        - navigation "Footer company links" [ref=e159]:
          - heading "Company" [level=3] [ref=e161]
          - list [ref=e162]:
            - listitem [ref=e163]:
              - link "About" [ref=e164] [cursor=pointer]:
                - /url: /about
            - listitem [ref=e165]:
              - button "Book Demo" [ref=e166] [cursor=pointer]
            - listitem [ref=e167]:
              - link "Terms & Conditions" [ref=e168] [cursor=pointer]:
                - /url: /terms
            - listitem [ref=e169]:
              - link "Privacy Policy" [ref=e170] [cursor=pointer]:
                - /url: /privacy
        - generic [ref=e171]:
          - heading "Let's Talk" [level=3] [ref=e173]
          - paragraph [ref=e174]: Ready to build the future? Reach out to us for a free consultation or project estimation.
          - button "Contact Us" [ref=e175] [cursor=pointer]
      - generic [ref=e176]: © 2025-2026 HM Coding. All rights reserved.
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