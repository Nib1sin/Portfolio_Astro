import { test, expect } from "@playwright/test";

for (const locale of ["", "en", "it", "de"]) {
  test(`home /${locale} loads without errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));

    const res = await page.goto(`/${locale}`);
    expect(res?.status()).toBe(200);
    await expect(page).toHaveTitle(/.+/);
    await expect(page.locator("h1").first()).toBeAttached();
    expect(errors).toEqual([]);
  });
}
