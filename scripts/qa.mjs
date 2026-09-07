import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";
const browser = await chromium.launch({
  channel: "chrome",
  headless: true,
  args: ["--enable-unsafe-swiftshader"],
});
mkdirSync("artifacts/qa", { recursive: true });
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 1,
});
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
await page.locator(".loading-signature").waitFor({ state: "hidden" });
await page.screenshot({ path: "artifacts/qa/desktop-hero.png" });
console.log(
  "Initial",
  await page.evaluate(() => ({
    width: innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    h1: document.querySelectorAll("h1").length,
    video: {
      duration: document.querySelector("video").duration,
      time: document.querySelector("video").currentTime,
    },
  })),
);
await page.evaluate(() => window.scrollTo({ top: 1250, behavior: "instant" }));
await page.waitForTimeout(1100);
await page.screenshot({ path: "artifacts/qa/desktop-hero-middle.png" });
console.log(
  "Scrub",
  await page
    .locator("video")
    .evaluate((v) => ({ time: v.currentTime, paused: v.paused })),
);
await page.locator("#manifesto").scrollIntoViewIfNeeded();
await page.waitForTimeout(800);
await page.screenshot({ path: "artifacts/qa/desktop-manifesto.png" });
await page.locator("#ea-fit").scrollIntoViewIfNeeded();
await page.waitForTimeout(2000);
await page.screenshot({ path: "artifacts/qa/desktop-fit.png" });
console.log("3D", await page.locator("#ea-fit canvas").count());
await page.locator("#measurement").fill("185");
await page.getByRole("button", { name: /Continuar/ }).click();
for (const value of ["82", "49", "108", "92", "102"]) {
  await page.locator("#measurement").fill(value);
  await page.getByRole("button", { name: /Continuar/ }).click();
}
await page.getByRole("button", { name: "Revisar perfil" }).click();
console.log("Empty validation", await page.locator("#fit-error").innerText());
await page.getByLabel("Nome", { exact: true }).fill("João Teste");
await page.getByLabel("WhatsApp com DDD").fill("77999999999");
await page.getByRole("checkbox").check();
await page.getByRole("button", { name: "Revisar perfil" }).click();
const href = await page
  .getByRole("link", { name: /Enviar meu perfil/ })
  .getAttribute("href");
console.log("Profile", decodeURIComponent(href));
await page.screenshot({ path: "artifacts/qa/desktop-fit-result.png" });
await page
  .getByRole("button", { name: "Girar manequim para a direita" })
  .click();
await page.waitForTimeout(500);
await page.locator("#contato").scrollIntoViewIfNeeded();
await page.waitForTimeout(800);
await page.screenshot({ path: "artifacts/qa/desktop-final.png" });
const mobile = await browser.newPage({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 1,
  isMobile: true,
  hasTouch: true,
});
mobile.on("pageerror", (e) => errors.push(e.message));
await mobile.goto("http://localhost:3000", { waitUntil: "networkidle" });
await mobile.locator(".loading-signature").waitFor({ state: "hidden" });
await mobile.screenshot({ path: "artifacts/qa/mobile-hero.png" });
await mobile.getByRole("button", { name: "Abrir menu" }).click();
await mobile.screenshot({ path: "artifacts/qa/mobile-menu.png" });
await mobile.locator('#mobile-menu a[href="#ea-fit"]').click();
await mobile.waitForTimeout(2200);
await mobile.locator("#ea-fit").scrollIntoViewIfNeeded();
await mobile.screenshot({ path: "artifacts/qa/mobile-fit.png" });
console.log(
  "Mobile",
  await mobile.evaluate(() => ({
    width: innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
  })),
);
const reduced = await browser.newPage({
  viewport: { width: 1280, height: 900 },
  reducedMotion: "reduce",
});
await reduced.goto("http://localhost:3000", { waitUntil: "networkidle" });
await reduced.screenshot({ path: "artifacts/qa/reduced-hero.png" });
console.log(
  "Reduced",
  await reduced.evaluate(() => ({
    pins: document.querySelectorAll(".pin-spacer").length,
    height: document.querySelector(".hero").clientHeight,
    steps: [...document.querySelectorAll(".experience-step")].map(
      (el) => getComputedStyle(el).visibility,
    ),
  })),
);
console.log("Errors", errors);
await browser.close();
if (errors.length) process.exitCode = 1;
