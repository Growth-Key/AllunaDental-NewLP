// QC harness: measures horizontal overflow and captures per-section screenshots.
// Usage: node scripts/qc.mjs [width] [height] [path]   e.g. node scripts/qc.mjs 390 844 /teal
import puppeteer from "puppeteer-core";
import { mkdirSync } from "node:fs";

const width = Number(process.argv[2] ?? 390);
const height = Number(process.argv[3] ?? 844);
const routePath = process.argv[4] ?? "/teal";
const slug = routePath === "/" ? "" : routePath.replaceAll("/", "-");
const outDir = `/tmp/lpshots/${width}${slug}`;
mkdirSync(outDir, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: "new",
});
const page = await browser.newPage();
await page.setViewport({ width, height, deviceScaleFactor: 2 });
await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
await page.goto(`http://localhost:3000${routePath}`, { waitUntil: "networkidle0" });

// Overflow report
const report = await page.evaluate(() => {
  const docW = document.documentElement.scrollWidth;
  const vw = window.innerWidth;
  const offenders = [];
  if (docW > vw) {
    for (const el of document.querySelectorAll("*")) {
      const r = el.getBoundingClientRect();
      if (r.right > vw + 1 || r.left < -1) {
        const cls = typeof el.className === "string" ? el.className : "";
        offenders.push(
          `${el.tagName.toLowerCase()}.${cls.split(" ").slice(0, 4).join(".")} → left:${Math.round(r.left)} right:${Math.round(r.right)} w:${Math.round(r.width)}`,
        );
      }
    }
  }
  return { docW, vw, offenders: offenders.slice(0, 12) };
});
console.log(`document.scrollWidth=${report.docW} innerWidth=${report.vw}`);
if (report.offenders.length) console.log("OFFENDERS:\n" + report.offenders.join("\n"));
else console.log("No horizontal overflow.");

// Per-section captures (scroll each into view, settle, shoot viewport)
const sections = [
  "hero-top",
  "consultation",
  "experience",
  "gallery",
  "reviews",
  "doctor",
  "process",
  "tiers",
  "faq",
  "reservations",
];
for (const sec of sections) {
  if (sec === "hero-top") {
    await page.evaluate(() => window.scrollTo(0, 0));
  } else {
    await page.evaluate((id) => {
      document.getElementById(id)?.scrollIntoView({ behavior: "instant", block: "start" });
    }, sec);
  }
  await new Promise((r) => setTimeout(r, 900));
  await page.screenshot({ path: `${outDir}/${sec}.png` });
}

// Form interaction smoke test: tap through every option step, then contact → success.
// Clicks the FIRST option each round (Veneers / ASAP / Yes — I'm ready ⇒ priority "high").
await page.evaluate(() =>
  document.getElementById("consultation")?.scrollIntoView({ behavior: "instant" }),
);
await new Promise((r) => setTimeout(r, 600));
for (let round = 1; round <= 8; round++) {
  const hasContact = await page.$('input[name="name"]');
  if (hasContact) break;
  const option = await page.$("#consultation button.rounded-2xl");
  if (!option) throw new Error(`Form step ${round}: no option button found`);
  await option.click();
  await new Promise((r) => setTimeout(r, 550));
  await page.screenshot({ path: `${outDir}/form-step${round + 1}.png` });
}
await page.type('input[name="name"]', "QC Test");
await page.type('input[name="phone"]', "8185551234");
await page.click('input[type="checkbox"]');
await page.screenshot({ path: `${outDir}/form-contact.png` });
await page.click('button[type="submit"]');
// Successful submit navigates to the personalized /welcome confirmation page
await page.waitForFunction(() => location.pathname.startsWith("/welcome"), { timeout: 10000 });
await new Promise((r) => setTimeout(r, 1400));
await page.screenshot({ path: `${outDir}/welcome.png` });
await page.evaluate(() => {
  const carousels = document.querySelectorAll('[aria-roledescription="carousel"]');
  carousels[carousels.length - 1]?.scrollIntoView({ behavior: "instant", block: "center" });
});
await new Promise((r) => setTimeout(r, 900));
await page.screenshot({ path: `${outDir}/welcome-reviews.png` });
console.log("Screenshots in", outDir);

await browser.close();
