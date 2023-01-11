import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto("./");
});

test('Should render dashboard title and new work link', async ({ page }) => {
    await expect(page.getByText("your workouts")).toBeVisible();
    await expect(page.getByRole("link", { name: 'create new' })).toBeVisible();
});