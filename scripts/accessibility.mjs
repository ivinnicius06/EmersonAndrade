import { chromium, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const browser = await chromium.launch({
  channel: "chrome",
  headless: true,
  args: ["--enable-unsafe-swiftshader"],
});
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "reduce",
});
const page = await context.newPage();
await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
let results = await new AxeBuilder({ page })
  .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
  .analyze();
console.log(
  "Accessibility",
  JSON.stringify(
    results.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      nodes: v.nodes.map((n) => ({
        target: n.target,
        summary: n.failureSummary,
      })),
    })),
    null,
    2,
  ),
);
for (const width of [320, 375, 768, 1024, 1920]) {
  await page.setViewportSize({ width, height: 900 });
  await page.waitForTimeout(300);
  console.log(
    "Viewport",
    width,
    await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth - innerWidth,
      overflowing: [...document.querySelectorAll("main *")]
        .filter((el) => {
          const r = el.getBoundingClientRect();
          return (
            r.width > 0 &&
            r.right > innerWidth + 1 &&
            getComputedStyle(el).position !== "absolute"
          );
        })
        .slice(0, 10)
        .map((el) => el.className),
    })),
  );
}
await page.setViewportSize({ width: 390, height: 844 });
await page.locator("#ea-fit").scrollIntoViewIfNeeded();
await page.waitForTimeout(1200);
await page.locator("#measurement").fill("999");
await page.getByRole("button", { name: /Continuar/ }).click();
await expect(page.locator("#fit-error")).toContainText("entre 140 e 215");
await page.locator("#measurement").fill("");
await page.getByRole("button", { name: /Continuar/ }).click();
await expect(page.locator("#fit-error")).not.toBeEmpty();
await page.getByRole("slider", { name: "Ajustar altura" }).fill("190");
await expect(page.locator("#measurement")).toHaveValue("190");
await page.getByRole("slider", { name: "Ajustar altura" }).focus();
await page.keyboard.press("ArrowRight");
await expect(page.locator("#measurement")).toHaveValue("191");
await page.locator(".fit-form").scrollIntoViewIfNeeded();
await page.screenshot({ path: "artifacts/qa/mobile-fit-input.png" });
await page.getByRole("button", { name: "Abrir menu" }).click();
await page.keyboard.press("Escape");
await expect(page.locator("#mobile-menu")).not.toBeVisible();
await expect(page.getByRole("button", { name: "Abrir menu" })).toBeFocused();
const fallback = await browser.newPage({
  viewport: { width: 1280, height: 900 },
  reducedMotion: "reduce",
});
await fallback.addInitScript(() => {
  const native = HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext = function (type, ...args) {
    if (type.includes("webgl")) return null;
    return native.call(this, type, ...args);
  };
});
await fallback.goto("http://localhost:3000", { waitUntil: "networkidle" });
await fallback.locator("#ea-fit").scrollIntoViewIfNeeded();
await expect(fallback.locator(".webgl-fallback")).toBeVisible();
await fallback.locator("#measurement").fill("180");
await fallback.getByRole("button", { name: /Continuar/ }).click();
await expect(fallback.locator("#measurement")).toHaveValue("78");
console.log("Input bounds, keyboard, menu focus and WebGL fallback passed.");
await browser.close();
if (results.violations.length) process.exitCode = 1;
