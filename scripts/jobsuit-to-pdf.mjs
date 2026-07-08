import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const require = createRequire(import.meta.url);

const inputPath =
  process.argv[2] ?? path.join(__dirname, "jobsuit-export.html");
const outputPath =
  process.argv[3] ?? path.join(root, "public", "SAMER_CV_EN.pdf");

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const IMPROVED_SUMMARY =
  "Full-stack developer with 6+ years building production platforms across the GCC and MENA. " +
  "At ArabyAds in Dubai, I shipped React dashboards and Node.js/.NET services processing 10K+ campaign events monthly for GCC brands and influencers. " +
  "Proficient in TypeScript, React, Angular 19, Next.js, and Node.js — from AI-powered SaaS to enterprise EdTech. " +
  "Trilingual, Agile-minded, and focused on scalable architecture, performance, and end-to-end delivery.";

function loadCheerio() {
  try {
    return require("cheerio");
  } catch {
    console.error("Missing cheerio. Run: npm install -D cheerio puppeteer");
    process.exit(1);
  }
}

function formatDisplayDate(value) {
  const text = value.trim();
  if (!text || /^present$/i.test(text)) return text;
  if (/^\d{4}[–-]\d{4}$/.test(text)) return text.replace("-", "–");
  const match = text.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return text;
  const year = match[1];
  const month = Number(match[2]) - 1;
  if (month < 0 || month > 11) return text;
  return `${MONTHS[month]} ${year}`;
}

function patchStyles(styleBlock) {
  return styleBlock
    .replace(/overflow:\s*hidden/g, "overflow: visible")
    .replace(/height:\s*1123px/g, "height: auto")
    .replace(
      /min-height:\s*297mm;\s*height:\s*auto/g,
      "min-height: auto; height: auto"
    )
    .replace(
      /min-height:\s*297mm/g,
      "min-height: auto"
    )
    .replace(
      /\.page-creative\s*\{[^}]*page-break-after:\s*always[^}]*\}/g,
      ".page-creative { margin: 0; box-shadow: none; page-break-after: auto; }"
    );
}

function embedProfileImage($) {
  const candidates = [
    path.join(root, "public", "images", "samer-profile.jpg"),
    path.join(root, "src", "assets", "samer-profile.jpg"),
  ];
  const imagePath = candidates.find((p) => fs.existsSync(p));
  if (!imagePath) return;

  const ext = path.extname(imagePath).slice(1).toLowerCase();
  const mime = ext === "png" ? "image/png" : "image/jpeg";
  const base64 = fs.readFileSync(imagePath).toString("base64");
  $(".avatar-creative").attr("src", `data:${mime};base64,${base64}`);
}

function flattenPagesForPdf($, container) {
  const $pages = container.find(".page-creative");
  if ($pages.length <= 1) {
    $pages.removeAttr("style");
    return;
  }

  const fragments = [];
  $pages.each((_, page) => {
    $(page)
      .children()
      .each((__, child) => fragments.push($(child).clone()));
  });

  container.empty();
  const $flow = $('<div class="page-creative pdf-flow"></div>');
  fragments.forEach((node) => $flow.append(node));
  container.append($flow);
}

function wrapResumeEntries($, container) {
  container.find(".page-creative").each((_, page) => {
    const $page = $(page);
    let current = $page.children().first();

    while (current.length) {
      const $current = current;
      const $next = $current.next();

      if (
        $current.hasClass("timeline-section") &&
        $current.hasClass("work-entry-wrapper")
      ) {
        const $wrapper = $('<div class="resume-entry"></div>');
        $current.before($wrapper);
        $wrapper.append($current);
        current = $wrapper.next();
        continue;
      }

      if (
        $current.hasClass("work-entry-wrapper") &&
        $current.find(".timeline-section").length
      ) {
        const $wrapper = $('<div class="resume-entry"></div>');
        $current.before($wrapper);
        $wrapper.append($current);
        current = $wrapper.next();
        continue;
      }

      if (
        $current.hasClass("timeline-section") ||
        $current.hasClass("project-item")
      ) {
        const isProject = $current.hasClass("project-item");
        const $wrapper = $(
          `<div class="resume-entry${isProject ? " resume-entry--project" : ""}"></div>`
        );
        $current.before($wrapper);
        $wrapper.append($current);

        const $after = $wrapper.next();
        if ($after.length && $after.hasClass("work-entry-bullets")) {
          $wrapper.append($after);
        }
        current = $wrapper.next();
        continue;
      }

      current = $next;
    }
  });
}

function consolidateSkills($, container) {
  const $skillsSection = container
    .find(".section-title-creative > span")
    .filter((_, el) => $(el).text().trim() === "Skills")
    .closest(".section-creative")
    .first();

  if (!$skillsSection.length) return;

  let $target = $skillsSection.find(".skills-container-creative").first();
  if (!$target.length) {
    $skillsSection.append('<div class="skills-container-creative"></div>');
    $target = $skillsSection.find(".skills-container-creative").first();
  }

  container.find(".section-creative").each((_, el) => {
    const $sec = $(el);
    if ($sec.is($skillsSection)) return;

    const $categories = $sec.find(".skill-category-creative");
    if (!$categories.length || $sec.find("> .section-title-creative").length) {
      return;
    }

    $categories.each((__, cat) => $target.append($(cat).clone()));
    $sec.remove();
  });

  $skillsSection.find(".skills-container-creative:empty").remove();
}

function groupSectionContent($, container) {
  const titles = new Set([
    "Work Experience",
    "Skills",
    "Projects",
    "Education",
    "Certifications",
    "Languages",
  ]);

  container.find(".page-creative").each((_, page) => {
    const $page = $(page);
    const children = $page.children(".section-creative").toArray();

    for (const sectionEl of children) {
      const $section = $(sectionEl);
      if (!$section.parent().length) continue;

      const title = $section.find(".section-title-creative > span").last().text().trim();
      if (!titles.has(title)) continue;

      let $next = $section.next();
      while ($next.length) {
        if (
          $next.hasClass("section-creative") &&
          $next.find("> .section-title-creative").length
        ) {
          break;
        }

        if (title === "Projects") {
          const isProject =
            $next.hasClass("resume-entry") &&
            $next.find(".project-item").length;
          if (!isProject) break;
          $next.appendTo($section);
          $next = $section.next();
          continue;
        }

        if (title === "Work Experience") {
          const isWork =
            $next.hasClass("resume-entry") &&
            $next.find(".timeline-section").length;
          if (!isWork) break;
          $next.appendTo($section);
          $next = $section.next();
          continue;
        }

        if (title === "Education") {
          const isEducation = $next.hasClass("resume-entry") || $next.hasClass("work-entry-wrapper");
          if (!isEducation) break;
          $next.appendTo($section);
          $next = $section.next();
          continue;
        }

        if (title === "Certifications") {
          const isCert =
            $next.hasClass("resume-entry") ||
            ($next.hasClass("timeline-section") && $next.hasClass("work-entry-wrapper"));
          if (!isCert) break;
          $next.appendTo($section);
          $next = $section.next();
          continue;
        }

        break;
      }

      if (title === "Languages") {
        $section.addClass("languages-section");
      }
      if (title === "Projects") {
        $section.addClass("projects-section");
      }
      if (title === "Skills") {
        $section.addClass("skills-section");
      }
    }
  });
}

function normalizeProjectLinks($, container) {
  container.find(".project-item .item-main-title-creative a").each((_, el) => {
    const $link = $(el);
    $link.attr("style", "color: #2d3748; font-weight: 600; text-decoration: none;");
  });
}

function mergeBulletLists($, container) {
  container.find(".page-creative").each((_, page) => {
    const $page = $(page);
    const nodes = $page.children().toArray();

    for (let i = 0; i < nodes.length; i++) {
      const $node = $(nodes[i]);
      const isEntryHeader =
        $node.hasClass("timeline-section") ||
        $node.hasClass("project-item") ||
        ($node.hasClass("work-entry-wrapper") &&
          $node.find(".timeline-section").length > 0);

      if (!isEntryHeader) continue;

      const bullets = [];
      let j = i + 1;

      while (j < nodes.length) {
        const $next = $(nodes[j]);
        if (
          $next.hasClass("timeline-section") ||
          $next.hasClass("project-item") ||
          $next.hasClass("section-creative") ||
          $next.hasClass("section-wrapper-creative") ||
          ($next.hasClass("work-entry-wrapper") &&
            $next.find(".timeline-section").length > 0) ||
          $next.find("> .section-title-creative").length > 0
        ) {
          break;
        }

        const items = $next.find("ul.responsibilities-creative li");
        if (items.length) {
          items.each((_, li) => bullets.push($(li).clone()));
          $next.remove();
          j++;
          continue;
        }
        break;
      }

      if (!bullets.length) continue;

      const $wrapper = $(
        '<div class="item-creative work-entry-bullets"></div>'
      );
      const $ul = $('<ul class="responsibilities-creative"></ul>');
      bullets.forEach((li) => $ul.append(li));
      $wrapper.append($ul);
      $node.after($wrapper);
    }
  });
}

function unwrapEntryWrappers($, container) {
  container.find(".resume-entry > .work-entry-wrapper").each((_, el) => {
    const $wrapper = $(el);
    if ($wrapper.hasClass("timeline-section")) return;
    $wrapper.replaceWith($wrapper.contents());
  });
}

function postProcessContainer($, container) {
  container.find("[data-editable-date], [data-editable-edu]").each((_, el) => {
    const $el = $(el);
    const attr = $el.attr("data-editable-edu") ?? "";
    if (attr && !attr.startsWith("graddate")) return;
    const formatted = formatDisplayDate($el.text());
    if (formatted !== $el.text()) $el.text(formatted);
  });

  container.find("[data-editable-proj]").each((_, el) => {
    const $el = $(el);
    const key = $el.attr("data-editable-proj") ?? "";
    if (!key.includes("start") && !key.includes("end")) return;
    const formatted = formatDisplayDate($el.text());
    if (formatted !== $el.text()) $el.text(formatted);
  });

  const $name = container.find(".name-creative").first();
  if ($name.length && !container.find(".headline-creative").length) {
    $name.after(
      '<div class="headline-creative">Full-Stack Developer · React · Angular · Next.js · Node.js</div>'
    );
  }

  const $summary = container.find('[data-editable="summary"]');
  if ($summary.length) $summary.text(IMPROVED_SUMMARY);

  container
    .find('[data-editable="portfolio"] a')
    .text("Portfolio")
    .attr("href", "https://portf-nine-eta.vercel.app");

  container
    .find(".education-additional-info")
    .filter((_, el) => !$(el).text().trim())
    .remove();

  container.find(".section-wrapper-creative:empty").remove();

  container.find(".editable-field, [data-editable], [data-editable-date]").each((_, el) => {
    const $el = $(el);
    $el.removeClass("editable-field edited-value");
    for (const attr of el.attribs ? Object.keys(el.attribs) : []) {
      if (
        attr.startsWith("data-editable") ||
        attr.startsWith("data-section") ||
        attr.startsWith("data-cat")
      ) {
        $el.removeAttr(attr);
      }
    }
  });

  container.find("[style]").each((_, el) => {
    const $el = $(el);
    const style = $el.attr("style") ?? "";
    if (
      style.includes("cursor") ||
      style.includes("outline") ||
      style.includes("transform") ||
      style.includes("scale")
    ) {
      $el.removeAttr("style");
    }
  });

  mergeBulletLists($, container);
  flattenPagesForPdf($, container);
  wrapResumeEntries($, container);
  unwrapEntryWrappers($, container);
  consolidateSkills($, container);
  groupSectionContent($, container);
  normalizeProjectLinks($, container);
  embedProfileImage($);
}

function extractResumeHtml(rawHtml) {
  const cheerio = loadCheerio();
  const $ = cheerio.load(rawHtml, { decodeEntities: false });

  let styleBlock = "";
  $("style").each((_, el) => {
    const text = $(el).html() ?? "";
    if (text.includes(".page-creative") && text.includes("@page")) {
      styleBlock = text;
    }
  });

  if (!styleBlock) {
    throw new Error("Could not find JobSuit creative template styles in HTML.");
  }

  const container = $("#resume-container-creative");
  if (!container.length) {
    throw new Error("Could not find #resume-container-creative in HTML.");
  }

  container.removeAttr("style");
  postProcessContainer($, container);

  styleBlock = patchStyles(styleBlock);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Samer Smati - Resume</title>
  <style>
${styleBlock}
    html, body {
      margin: 0;
      padding: 0;
      background: #fff;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    #resume-container-creative {
      transform: none !important;
      width: 210mm !important;
      height: auto !important;
      margin: 0 auto;
    }
    .page-creative,
    .page-creative.pdf-flow {
      margin: 0 auto !important;
      box-shadow: none !important;
      border: none !important;
      overflow: visible !important;
      height: auto !important;
      min-height: auto !important;
      page-break-after: auto;
      break-after: auto;
    }
    .headline-creative {
      font-size: 14px;
      font-weight: 500;
      color: #2563eb;
      margin-top: 4px;
      margin-bottom: 2px;
      font-family: var(--resume-primary-font);
    }
    .header-creative {
      margin-bottom: 18px !important;
    }
    .section-creative {
      margin-top: 14px;
      margin-bottom: 0;
    }
    .section-creative:first-child,
    .header-creative + .section-creative {
      margin-top: 0;
    }
    .section-title-creative {
      margin-bottom: 6px !important;
      padding-bottom: 4px !important;
    }
    .section-content-creative {
      margin-bottom: 0;
    }
    .resume-entry {
      position: relative;
      padding-left: 25px;
      margin-bottom: 10px;
      break-inside: avoid;
      page-break-inside: avoid;
      -webkit-column-break-inside: avoid;
    }
    .resume-entry::before {
      content: '';
      position: absolute;
      left: 4px;
      top: 18px;
      bottom: 2px;
      width: 2px;
      background-color: #d1d5db;
    }
    .resume-entry::after {
      content: '';
      position: absolute;
      left: 0;
      top: 5px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #2563eb;
      border: 2px solid #fff;
      z-index: 1;
    }
    .resume-entry:last-child::before {
      bottom: 2px;
    }
    .item-creative.timeline-section::before,
    .timeline-section::before,
    .timeline-section .item-creative::before {
      display: none !important;
    }
    .item-creative.timeline-section::after {
      display: none !important;
    }
    .resume-entry .timeline-section,
    .resume-entry .project-item {
      padding-left: 0;
      margin-bottom: 0;
      break-inside: auto;
      page-break-inside: auto;
    }
    .work-entry-bullets {
      margin-top: 0;
      margin-bottom: 0;
      padding-left: 0;
    }
    .resume-entry--project {
      padding-left: 0;
    }
    .resume-entry--project::before,
    .resume-entry--project::after {
      display: none !important;
    }
    .projects-section .resume-entry,
    .projects-section > .project-item {
      margin-bottom: 8px;
    }
    .projects-section .resume-entry:last-child {
      margin-bottom: 0;
    }
    .languages-section {
      margin-top: 12px !important;
    }
    .languages-section .section-content-creative {
      margin-top: 2px;
    }
    .skills-section .skills-container-creative {
      margin-top: 2px;
    }
    .skill-category-creative {
      margin-bottom: 3px !important;
    }
    .work-entry-wrapper {
      margin-bottom: 0 !important;
    }
    .timeline-section,
    .project-item {
      break-inside: auto;
      page-break-inside: auto;
    }
    ul.responsibilities-creative li {
      margin-bottom: 1px;
      line-height: 1.45;
    }
    .item-meta-creative {
      margin-bottom: 3px !important;
    }
    .skill-category-creative strong {
      color: #1a202c !important;
      font-weight: 700;
    }
    .project-item .item-main-title-creative a,
    .item-main-title-creative a {
      color: #2d3748 !important;
      font-weight: 600;
      text-decoration: none !important;
    }
    @media print {
      .page-creative,
      .page-creative.pdf-flow {
        page-break-after: auto !important;
        border: none !important;
      }
      .resume-entry {
        break-inside: avoid !important;
        page-break-inside: avoid !important;
      }
    }
  </style>
</head>
<body>
  <div id="resume-container-creative">
${container.html()}
  </div>
</body>
</html>`;
}

async function generatePdf(standaloneHtml, outFile) {
  let puppeteer;
  try {
    puppeteer = await import("puppeteer");
  } catch {
    console.error("Missing puppeteer. Run: npm install -D puppeteer cheerio");
    process.exit(1);
  }

  const htmlFile = path.join(__dirname, "jobsuit-resume-standalone.html");
  fs.writeFileSync(htmlFile, standaloneHtml, "utf8");

  const browser = await puppeteer.default.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();
    await page.goto(`file:///${htmlFile.replace(/\\/g, "/")}`, {
      waitUntil: "networkidle0",
    });
    await page.emulateMediaType("print");
    await page.evaluate(() => {
      return Promise.all(
        Array.from(document.images).map((img) => {
          if (img.complete) return Promise.resolve();
          return new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve;
          });
        })
      );
    });

    await page.pdf({
      path: outFile,
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    });
  } finally {
    await browser.close();
  }

  return htmlFile;
}

async function main() {
  if (!fs.existsSync(inputPath)) {
    console.error(`Input file not found: ${inputPath}`);
    console.error(
      "Save the JobSuit page HTML as scripts/jobsuit-export.html, or pass a path as the first argument."
    );
    process.exit(1);
  }

  const raw = fs.readFileSync(inputPath, "utf8");
  const standalone = extractResumeHtml(raw);
  const htmlFile = await generatePdf(standalone, outputPath);

  console.log(`Standalone HTML: ${htmlFile}`);
  console.log(`PDF written to: ${outputPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
