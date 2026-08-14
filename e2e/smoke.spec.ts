import { expect, test } from "@playwright/test";

const publicRoutes = [
  "/",
  "/about",
  "/services",
  "/projects",
  "/careers",
  "/terms",
  "/privacy",
];

for (const path of publicRoutes) {
  test(`loads ${path}`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.ok()).toBeTruthy();
    await expect(page.locator("header, h1").first()).toBeVisible();
  });
}

test("unknown route shows branded 404", async ({ page }) => {
  await page.goto("/this-page-does-not-exist");
  await expect(page.getByRole("heading", { name: /does not exist/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /return home/i })).toBeVisible();
});

test("admin login route is reachable", async ({ page }) => {
  await page.goto("/hm-portal-admin-dashboard/login");
  await expect(page.getByRole("heading", { name: /admin login/i })).toBeVisible();
  await expect(page.getByLabel(/email/i)).toBeVisible();
});

test("protected admin route redirects unauthenticated users", async ({ page }) => {
  await page.goto("/hm-portal-admin-dashboard");
  await expect(page).toHaveURL(/hm-portal-admin-dashboard\/login/);
});
