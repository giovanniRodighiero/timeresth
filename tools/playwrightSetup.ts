import { chromium, FullConfig } from "@playwright/test";

async function playwrightSetup(config: FullConfig) {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:8080/login');
    await page.getByPlaceholder("Your email address").fill(process.env.PL_USERNAME || '');
    await page.getByPlaceholder("Your password").fill(process.env.PL_PASSWORD || '');

    const navigationPromise = page.waitForNavigation();
    await page.getByRole("button", { name: "Sign in", exact: true }).click();
    await navigationPromise;

    // Save signed-in state to 'storageState.json'.
    await page.context().storageState({ path: "./e2e/storageState.json" });
    await browser.close();
}

export default playwrightSetup;
