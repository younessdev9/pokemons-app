import { test, expect } from "@playwright/test";

test("homepage has title and loads correctly", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  await expect(page).toHaveTitle(/Vite \+ React \+ TS/);

  const header = await page.locator("h1");
  await expect(header).toHaveText("Pokemon Cards");
});
