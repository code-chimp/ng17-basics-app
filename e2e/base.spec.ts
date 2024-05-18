import { test, expect } from '@playwright/test';

test.describe('Basic site functionality', async () => {
  test('should load default route', async ({ page }) => {
    await page.goto('http://localhost:4200');

    await expect(page).toHaveURL(/\/recipes$/);
  });
});
