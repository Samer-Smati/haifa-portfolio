import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { cvData, personal } from "./cv-data.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const require = createRequire(import.meta.url);
const publicDir = path.join(root, "public");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function buildHtml(locale) {
  const data = cvData[locale];

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
        <ul>
          ${job.highlights.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
        ${
          job.environment
            ? `<p class="environment"><strong>${escapeHtml(data.labels.environment)} :</strong> ${escapeHtml(job.environment)}</p>`
            : ""
        }
      </article>
    `,
    )
    .join("");

  const educationHtml = data.education
    .map(
      (item) => `
      <article class="edu-entry">
        <div class="entry-head">
          <h3>${escapeHtml(item.degree)}</h3>
          <span class="meta">${escapeHtml(item.period)}</span>
        </div>
        ${item.focus ? `<p class="focus">${escapeHtml(item.focus)}</p>` : ""}
      </article>
    `,
    )
    .join("");

  const skillsHtml = data.skillGroups
    .map(
      (group) => `
      <tr>
        <th>${escapeHtml(group.title)}</th>
        <td>${escapeHtml(group.items)}</td>
      </tr>
    `,
    )
    .join("");

  const languagesHtml = data.languages
    .map(
      (lang) =>
        `<span><strong>${escapeHtml(lang.name)} :</strong> ${escapeHtml(lang.level)}</span>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="${locale}">
<head>
  <meta charset="UTF-8" />
  <title>${escapeHtml(personal.name)} — CV</title>
  <style>
    @page { size: A4; margin: 14mm 16mm 14mm; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: "Helvetica Neue", Arial, sans-serif;
      color: #1e293b;
      font-size: 9.8pt;
      line-height: 1.4;
      background: #fff;
    }
    .header { text-align: center; margin-bottom: 14px; }
    h1 {
      font-size: 24pt;
      color: #0f172a;
      letter-spacing: 0.01em;
      text-transform: uppercase;
    }
    .title {
      font-size: 12pt;
      color: #1e4e8c;
      font-weight: 700;
      margin: 2px 0 6px;
    }
    .contact { font-size: 9pt; color: #334155; }
    .contact span + span::before { content: "|"; margin: 0 8px; color: #94a3b8; }
    .contact .link { color: #1e4e8c; }
    .section { margin-bottom: 12px; }
    .section-title {
      font-size: 12pt;
      font-weight: 700;
      color: #1e4e8c;
      border-bottom: 1px solid #1e4e8c;
      padding-bottom: 3px;
      margin-bottom: 8px;
    }
    .summary { color: #1e293b; }
    table { width: 100%; border-collapse: collapse; }
    th {
      width: 26%;
      text-align: left;
      vertical-align: top;
      padding: 2px 10px 2px 0;
      color: #0f172a;
    }
    td { padding: 2px 0; }
    .entry { margin-bottom: 10px; break-inside: avoid; }
    .entry-head {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 12px;
    }
    .entry h3 { font-size: 11pt; color: #0f172a; }
    .company { color: #1e4e8c; font-weight: 700; font-size: 9.8pt; }
    .meta {
      text-align: right;
      font-size: 9pt;
      color: #64748b;
      white-space: nowrap;
    }
    .meta span { display: block; }
    ul { list-style: none; margin-top: 4px; }
    li { padding-left: 12px; position: relative; margin-bottom: 1px; }
    li::before { content: "•"; position: absolute; left: 0; color: #1e4e8c; }
    .environment { margin-top: 4px; font-size: 8.5pt; color: #64748b; }
    .edu-entry { margin-bottom: 7px; }
    .edu-entry h3 { font-size: 10pt; color: #0f172a; }
    .focus { color: #64748b; font-size: 9pt; }
    .languages { display: flex; justify-content: space-between; }
  </style>
</head>
<body>
  <header class="header">
    <h1>${escapeHtml(personal.name)}</h1>
    <p class="title">${escapeHtml(data.title)}</p>
    <p class="contact">
      <span>${escapeHtml(personal.location)}</span>
      <span>${escapeHtml(personal.phone)}</span>
      <span class="link">${escapeHtml(personal.email)}</span>
    </p>
    <p class="contact">
      <span class="link">${escapeHtml(personal.linkedin)}</span>
      <span class="link">${escapeHtml(personal.portfolio)}</span>
    </p>
  </header>

  <section class="section">
    <h2 class="section-title">${escapeHtml(data.labels.profile)}</h2>
    <p class="summary">${escapeHtml(data.summary)}</p>
  </section>

  <section class="section">
    <h2 class="section-title">${escapeHtml(data.labels.skills)}</h2>
    <table>${skillsHtml}</table>
  </section>

  <section class="section">
    <h2 class="section-title">${escapeHtml(data.labels.experience)}</h2>
    ${experienceHtml}
  </section>

  <section class="section">
    <h2 class="section-title">${escapeHtml(data.labels.education)}</h2>
    ${educationHtml}
  </section>

  <section class="section">
    <h2 class="section-title">${escapeHtml(data.labels.languages)}</h2>
    <div class="languages">${languagesHtml}</div>
  </section>
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
      preferCSSPageSize: true,
    });
    console.log(`Generated ${outputPath}`);
  } finally {
    await browser.close();
    fs.unlinkSync(tempHtmlPath);
  }
}

const locales = process.argv.slice(2);
// The FR PDF is Hayfa's own CV; regenerate it only when asked explicitly.
const targets = locales.length > 0 ? locales : ["en"];

for (const locale of targets) {
  if (!cvData[locale]) {
    console.error(`Unknown locale: ${locale}`);
    process.exit(1);
  }
  await generatePdf(locale);
}
