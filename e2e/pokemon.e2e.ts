import { test, expect } from "@playwright/test";

test("homepage has title and loads correctly", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  await expect(page).toHaveTitle(/Vite \+ React \+ TS/);

  const header = await page.locator("h1");
  await expect(header).toHaveText("Pokemon Cards");
});

test("loads and displays Pokémon cards", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  const pokemonCards = await page.locator(".pokemon-card");
  await expect(pokemonCards).toHaveCount(11);

  const firstCardName = await pokemonCards.nth(0).locator("h2").innerText();
  await expect(firstCardName).toBe("Bulbasaur");
});

test("opens Pokémon details modal on card click", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  const firstCard = await page.locator(".pokemon-card").nth(0);
  await firstCard.click();

  const modal = await page.locator(".modal");
  await expect(modal).toBeVisible();

  const pokemonName = await modal.locator("h2").innerText();
  await expect(pokemonName).toBe("Bulbasaur");

  // Close the modal
  const closeButton = await modal.locator("button");
  await closeButton.click();

  await expect(modal).toBeHidden();
});
