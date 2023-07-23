import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto("./");
    await page.getByRole("link", { name: "create new" }).click();
});

test("Should render the new workout page", async ({ page }) => {
    await expect(page).toHaveURL("/workouts/new");
});

test("Should be able to go back with the left arrow icon", async ({ page }) => {
    await page.getByRole("button", { name: "Go back to workouts" }).click();
    await expect(page).toHaveURL("");
});

test("Should have a text input for the workout name", async ({ page }) => {
    await expect(page.getByPlaceholder("workout name")).toHaveValue(
        "new workout"
    );
});

test("Should have a round with default values", async ({ page }) => {
    await expect(page.getByText("round #1")).toBeVisible();
    await expect(page.getByLabel("repeat:")).toHaveValue("1");
    await expect(page.getByLabel("break:")).toHaveValue("45");
    expect(
        await page.getByRole("button", { name: "Increase" }).all()
    ).toHaveLength(2);
    expect(
        await page.getByRole("button", { name: "Decrease" }).all()
    ).toHaveLength(2);
    await expect(
        page.getByRole("button", { name: "Add exercise" })
    ).toBeVisible();
});

test("Should have the bottom widget with total time to zero and a save button", async ({
    page,
}) => {
    await expect(page.getByText("total time:")).toBeVisible();
    await expect(page.getByText("00:00:00")).toBeVisible();
    await expect(page.getByRole("button", { name: "start" })).toBeVisible();
});

test("Should be able to create, change and delete rounds", async ({ page }) => {
    // add two new rounds
    await page.getByRole("button", { name: "add round" }).click();
    await page.getByRole("button", { name: "add round" }).click();

    await expect(
        page.getByRole("button", { name: "round number 1" })
    ).toBeVisible();
    await expect(
        page.getByRole("button", { name: "round number 2" })
    ).toBeVisible();
    await expect(page.getByText("round #3")).toBeVisible();

    // change active round
    await page.getByRole("button", { name: "round number 2" }).click();

    await expect(
        page.getByRole("button", { name: "round number 1" })
    ).toBeVisible();
    await expect(page.getByText("round #2")).toBeVisible();
    await expect(
        page.getByRole("button", { name: "delete round 2" })
    ).toBeVisible();
    await expect(
        page.getByRole("button", { name: "round number 3" })
    ).toBeVisible();

    // delete the second one
    await page.getByRole("button", { name: "delete round 2" }).click();

    await expect(
        page.getByRole("button", { name: "round number 1" })
    ).toBeVisible();
    await expect(page.getByText("round #2")).toBeVisible();
    await expect(
        page.getByRole("button", { name: "delete round 2" })
    ).toBeVisible();
    await expect(
        page.getByRole("button", { name: "round number 2" })
    ).not.toBeVisible();
    await expect(
        page.getByRole("button", { name: "round number 3" })
    ).not.toBeVisible();
    await expect(
        page.getByRole("button", { name: "delete round 3" })
    ).not.toBeVisible();
});

test("Should be able to edit a round repeat and break times", async ({
    page,
}) => {
    const $inputRepeat = page.getByLabel("repeat:");
    const $incRepeat = page.getByRole("button", { name: "Increase" }).first();
    const $decRepeat = page.getByRole("button", { name: "Decrease" }).first();

    // can't go below 1
    await $inputRepeat.type("-2");
    await page.getByPlaceholder("workout name").focus(); // trick to trigger the hook on the input
    await expect($inputRepeat).toHaveValue("1");
    await $decRepeat.click();
    await expect($inputRepeat).toHaveValue("1");

    await $inputRepeat.type("5");
    await expect($inputRepeat).toHaveValue("15");

    await $incRepeat.click({ clickCount: 3 });
    await expect($inputRepeat).toHaveValue("18");
    await $decRepeat.click({ clickCount: 3 });
    await expect($inputRepeat).toHaveValue("15");

    const $inputBreak = page.getByLabel("break:");
    const $incBreak = page.getByRole("button", { name: "Increase" }).last();
    const $decBreak = page.getByRole("button", { name: "Decrease" }).last();

    // can't go below 0
    await $inputBreak.type("-2");
    await page.getByPlaceholder("workout name").focus(); // trick to trigger the hook on the input
    await expect($inputBreak).toHaveValue("0");
    await $decBreak.click();
    await expect($inputBreak).toHaveValue("0");

    await $inputBreak.type("5");
    await expect($inputBreak).toHaveValue("05");

    await $incBreak.click({ clickCount: 3 });
    await expect($inputBreak).toHaveValue("8");
    await $decBreak.click({ clickCount: 3 });
    await expect($inputBreak).toHaveValue("5");
});

test("Should be able to add and delete an exercise", async ({ page }) => {
    expect(page.getByPlaceholder("exercise name")).not.toBeVisible();

    await page.getByRole("button", { name: "Add exercise" }).click();

    await expect(page.getByPlaceholder("exercise name")).toHaveValue("");
    await expect(page.getByLabel("Repeat").last()).toHaveValue("1");
    await expect(page.getByLabel("Work")).toHaveValue("20");
    await expect(page.getByLabel("Rest")).toHaveValue("20");

    await page.getByRole("button", { name: "delete exercise" }).click();

    await expect(page.getByPlaceholder("exercise name")).not.toBeVisible();
});
