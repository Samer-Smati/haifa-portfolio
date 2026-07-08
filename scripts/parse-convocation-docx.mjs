import fs from "node:fs";
import path from "node:path";

const xmlPath = path.resolve(
  "public/docx_extract/word/document.xml",
);
const xml = fs.readFileSync(xmlPath, "utf8");

function decodeText(value) {
  return value
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function extractTexts(block) {
  return [...block.matchAll(/<w:t[^>]*>([^<]*)<\/w:t>/g)].map((m) =>
    decodeText(m[1]),
  );
}

const pages = xml.split(/<w:br w:type="page"\/>/);
const candidates = pages.map((page, index) => {
  const texts = extractTexts(page);
  const ceresLabelIndex = texts.findIndex((t) =>
    t.includes("N° candidat CERES"),
  );
  const headerStart = texts.indexOf("NOVIA", texts.indexOf("NOVIA") + 1);
  const addressLines = texts.slice(headerStart + 1, headerStart + 5);

  return {
    page: index + 1,
    line1: addressLines[0] ?? "",
    line2: addressLines[1] ?? "",
    line3: addressLines[2] ?? "",
    line4: addressLines[3] ?? "",
    ceres: texts[ceresLabelIndex + 1] ?? "",
  };
});

console.log("page count:", pages.length);
console.log(JSON.stringify(candidates, null, 2));
