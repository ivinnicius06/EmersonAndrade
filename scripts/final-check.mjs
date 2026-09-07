import { chromium, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { createHash } from "node:crypto";
const browser = await chromium.launch({
  channel: "chrome",
  headless: true,
  args: ["--enable-unsafe-swiftshader"],
});
try {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.locator("#ea-fit").scrollIntoViewIfNeeded();
  await expect(page.locator("#ea-fit canvas")).toBeVisible();
  await page.locator("#measurement").fill("186");
  await page.getByRole("button", { name: /Continuar/ }).click();
  await page.waitForTimeout(450);
  await page.screenshot({ path: "artifacts/qa/mobile-fit-active.png" });
  const h = await page.locator(".fit-form h3").boundingBox(),
    model = await page.locator(".fit-model").boundingBox();
  expect(h.y).toBeGreaterThan(model.y + model.height - 1);
  for (const v of ["85", "50", "109", "91", "102"]) {
    await page.locator("#measurement").fill(v);
    await page.getByRole("button", { name: /Continuar/ }).click();
  }
  await page.getByLabel("Nome", { exact: true }).fill("Teste mobile");
  await page.getByLabel("WhatsApp com DDD").fill("77999999999");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: /Revisar perfil/ }).click();
  await expect(
    page.getByRole("link", { name: /Enviar meu perfil/ }),
  ).toHaveAttribute("href", /wa.me\/5577998229945/);
  await page.screenshot({ path: "artifacts/qa/mobile-fit-result.png" });
  const desktop = await context.newPage();
  await desktop.setViewportSize({ width: 1440, height: 1000 });
  await desktop.emulateMedia({ reducedMotion: "reduce" });
  await desktop.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await desktop.locator("#ea-fit").scrollIntoViewIfNeeded();
  await expect(desktop.locator("#ea-fit canvas")).toBeVisible();
  await desktop.waitForTimeout(200);
  const before = await desktop.locator("#ea-fit canvas").screenshot();
  await desktop.locator("#measurement").fill("205");
  await desktop.waitForTimeout(250);
  const after = await desktop.locator("#ea-fit canvas").screenshot();
  expect(createHash("sha256").update(before).digest("hex")).not.toEqual(
    createHash("sha256").update(after).digest("hex"),
  );
  const audit = await new AxeBuilder({ page: desktop })
    .include("#ea-fit")
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  console.log(
    "Fit accessibility",
    audit.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => n.target),
    })),
  );
  expect(audit.violations).toEqual([]);
  for (const id of [
    "moda",
    "consultoria",
    "personalizacao",
    "sob-medida",
    "marca",
    "espaco",
  ]) {
    await desktop.locator(`#${id}`).scrollIntoViewIfNeeded();
    await desktop.screenshot({ path: `artifacts/qa/desktop-${id}.png` });
  }
  console.log(
    "Mobile complete flow, visible step heading, real 3D deformation and fit accessibility passed.",
  );
} finally {
  await browser.close();
}
