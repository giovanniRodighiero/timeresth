import { test, expect } from "@playwright/test";

// CLEAR LOCAL STATE TO BE ABLE TO LOGIN
test.use({ storageState: { cookies: [], origins: []} });

test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:8080/login");
});

test("Should display the app name and login form", async ({ page }) => {
    await expect(page.getByText("Timeresth")).toBeVisible();

    // SOCIALS
    await expect(
        page.getByRole("button", { name: "Sign in with Google", exact: true })
    ).toBeVisible();

    // DEFAULT LOGIN
    await expect(page.getByPlaceholder("Your email address")).toBeVisible();
    await expect(page.getByPlaceholder("Your password")).toBeVisible();
    await expect(
        page.getByRole("button", { name: "Sign in", exact: true })
    ).toBeVisible();
});

test("Should fail to login with invalid credentials", async ({ page }) => {
    await page.getByPlaceholder("Your email address").fill("aaa@mail.it");
    await page.getByPlaceholder("Your password").fill("pass");
    await page.getByRole("button", { name: "Sign in", exact: true }).click();

    await expect(page.getByText("Invalid login credentials")).toBeVisible();
});

test("Should succeed to login with correct credentials", async ({
    baseURL,
    page,
}) => {
    await page
        .getByPlaceholder("Your email address")
        .fill("giova.rod93+test@gmail.com");
    await page.getByPlaceholder("Your password").fill("password");

    const navigationPromise = page.waitForNavigation();
    await page.getByRole("button", { name: "Sign in", exact: true }).click();
    await navigationPromise;

    expect(page.url()).toBe(baseURL);
});
