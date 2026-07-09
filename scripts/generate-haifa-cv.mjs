import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { cvData, personal } from "./cv-data.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const require = createRequire(import.meta.url);
const publicDir = path.join(root, "public");
const profileImagePath = path.join(publicDir, "images", "haifa-profile.png");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function chipList(items) {
  return items
    .map((item) => `<span class="chip">${escapeHtml(item)}</span>`)
    .join("");
}

function buildHtml(locale) {
  const data = cvData[locale];
  const imageBase64 = fs.existsSync(profileImagePath)
    ? `data:image/png;base64,${fs.readFileSync(profileImagePath).toString("base64")}`
    : "";

  const experienceHtml = data.experiences
    .map(
      (job) => `
      <article class="entry">
        <div class="entry-head">
          <div>
            <h3>${escapeHtml(job.role)}</h3>
            <p class="company">${escapeHtml(job.company)}</p>
          </div>
          <div class="meta">
            <span>${escapeHtml(job.period)}</span>
            <span>${escapeHtml(job.location)}</span>
          </div>
        </div>
        <p class="description">${escapeHtml(job.description)}</p>
        <ul>
          ${job.highlights.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
        <div class="chips">${chipList(job.technologies)}</div>
      </article>
    `,
    )
    .join("");

  const educationHtml = data.education
    .map(
      (item) => `
      <article class="edu-entry">
        <h3>${escapeHtml(item.degree)}</h3>
        <p class="school">${escapeHtml(item.school)}</p>
        <p class="meta-line">${escapeHtml(item.period)} · ${escapeHtml(item.location)}</p>
      </article>
    `,
    )
    .join("");

  const languagesHtml = data.languages
    .map(
      (lang) => `
      <div class="lang-row">
        <span class="lang-name">${escapeHtml(lang.name)}</span>
        <span class="lang-level">${escapeHtml(lang.level)}</span>
      </div>
    `,
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="${locale}">
<head>
  <meta charset="UTF-8" />
  <title>${escapeHtml(personal.name)} — CV</title>
  <style>
    @page { size: A4; margin: 14mm 14mm 16mm; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: "Segoe UI", Arial, sans-serif;
      color: #1e293b;
      font-size: 10.5pt;
      line-height: 1.45;
      background: #fff;
    }
    .page { width: 100%; }
    .header {
      display: grid;
      grid-template-columns: 88px 1fr;
      gap: 18px;
      align-items: center;
      padding-bottom: 16px;
      border-bottom: 2px solid #2563eb;
      margin-bottom: 18px;
    }
    .avatar {
      width: 88px;
      height: 88px;
      border-radius: 50%;
      object-fit: cover;
      object-position: top;
      border: 3px solid #dbeafe;
    }
    .avatar-placeholder {
      width: 88px;
      height: 88px;
      border-radius: 50%;
      background: #eff6ff;
      border: 3px solid #dbeafe;
    }
    h1 {
      font-size: 24pt;
      color: #0f172a;
      letter-spacing: -0.02em;
      margin-bottom: 4px;
    }
    .title {
      font-size: 12pt;
      color: #2563eb;
      font-weight: 600;
      margin-bottom: 8px;
    }
    .contact {
      display: flex;
      flex-wrap: wrap;
      gap: 10px 16px;
      font-size: 9pt;
      color: #475569;
    }
    .layout {
      display: grid;
      grid-template-columns: 1.55fr 1fr;
      gap: 22px;
    }
    .section { margin-bottom: 18px; break-inside: avoid; }
    .section-title {
      font-size: 10pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #2563eb;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 5px;
      margin-bottom: 10px;
    }
    .summary { color: #334155; text-align: justify; }
    .entry { margin-bottom: 14px; break-inside: avoid; }
    .entry-head {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 4px;
    }
    .entry h3 { font-size: 11pt; color: #0f172a; }
    .company { color: #2563eb; font-weight: 600; font-size: 10pt; }
    .meta {
      text-align: right;
      font-size: 9pt;
      color: #64748b;
      white-space: nowrap;
    }
    .meta span { display: block; }
    .description { color: #475569; margin: 4px 0 6px; font-size: 9.8pt; }
    ul { padding-left: 16px; color: #475569; font-size: 9.5pt; }
    li { margin-bottom: 3px; }
    .chips { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 6px; }
    .chip {
      background: #eff6ff;
      color: #1d4ed8;
      border: 1px solid #dbeafe;
      border-radius: 999px;
      padding: 2px 8px;
      font-size: 8.5pt;
      font-weight: 600;
    }
    .edu-entry { margin-bottom: 12px; }
    .edu-entry h3 { font-size: 10pt; color: #0f172a; margin-bottom: 2px; }
    .school { color: #2563eb; font-weight: 600; font-size: 9.5pt; }
    .meta-line { color: #64748b; font-size: 9pt; }
    .skill-group { margin-bottom: 12px; }
    .skill-group h4 {
      font-size: 9.5pt;
      color: #0f172a;
      margin-bottom: 6px;
      font-weight: 700;
    }
    .lang-row {
      display: flex;
      justify-content: space-between;
      padding: 5px 0;
      border-bottom: 1px solid #f1f5f9;
      font-size: 9.8pt;
    }
    .lang-name { font-weight: 600; color: #0f172a; }
    .lang-level { color: #64748b; }
  </style>
</head>
<body>
  <div class="page">
    <header class="header">
      ${
        imageBase64
          ? `<img class="avatar" src="${imageBase64}" alt="${escapeHtml(personal.name)}" />`
          : `<div class="avatar-placeholder"></div>`
      }
      <div>
        <h1>${escapeHtml(personal.name)}</h1>
        <p class="title">${escapeHtml(data.title)}</p>
        <div class="contact">
          <span>${escapeHtml(personal.email)}</span>
          <span>${escapeHtml(personal.phone)}</span>
          <span>${escapeHtml(personal.location)}</span>
          <span>${escapeHtml(personal.linkedin)}</span>
        </div>
      </div>
    </header>

    <div class="layout">
      <main>
        <section class="section">
          <h2 class="section-title">${escapeHtml(data.labels.profile)}</h2>
          <p class="summary">${escapeHtml(data.summary)}</p>
        </section>

        <section class="section">
          <h2 class="section-title">${escapeHtml(data.labels.experience)}</h2>
          ${experienceHtml}
        </section>
      </main>

      <aside>
        <section class="section">
          <h2 class="section-title">${escapeHtml(data.labels.education)}</h2>
          ${educationHtml}
        </section>

        <section class="section">
          <h2 class="section-title">${escapeHtml(data.labels.product)}</h2>
          <div class="chips">${chipList(data.skills.product)}</div>
        </section>

        <section class="section">
          <h2 class="section-title">${escapeHtml(data.labels.data)}</h2>
          <div class="chips">${chipList(data.skills.data)}</div>
        </section>

        <section class="section">
          <h2 class="section-title">${escapeHtml(data.labels.tools)}</h2>
          <div class="chips">${chipList(data.skills.tools)}</div>
        </section>

        <section class="section">
          <h2 class="section-title">${escapeHtml(data.labels.languages)}</h2>
          ${languagesHtml}
        </section>
      </aside>
    </div>
  </div>
</body>
</html>`;
}

async function generatePdf(locale) {
  const data = cvData[locale];
  const outputPath = path.join(publicDir, data.output);
  const html = buildHtml(locale);
  const tempHtmlPath = path.join(root, "scripts", `.cv-temp-${locale}.html`);
  fs.writeFileSync(tempHtmlPath, html, "utf8");

  let puppeteer;
  try {
    puppeteer = require("puppeteer");
  } catch {
    console.error("Missing puppeteer. Run: npm install");
    process.exit(1);
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();
    await page.goto(`file://${tempHtmlPath.replace(/\\/g, "/")}`, {
      waitUntil: "networkidle0",
    });
    await page.pdf({
      path: outputPath,
      format: "A4",
      printBackground: true,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
    });
    console.log(`Generated ${outputPath}`);
  } finally {
    await browser.close();
    fs.unlinkSync(tempHtmlPath);
  }
}

const locales = process.argv.slice(2);
const targets = locales.length > 0 ? locales : ["en", "fr"];

for (const locale of targets) {
  if (!cvData[locale]) {
    console.error(`Unknown locale: ${locale}`);
    process.exit(1);
  }
  await generatePdf(locale);
}
