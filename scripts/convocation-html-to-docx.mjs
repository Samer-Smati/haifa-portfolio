import fs from "node:fs";
import path from "node:path";
import { asBlob } from "html-docx-js-typescript";

const htmlPath = path.resolve(
  "public/Convocations_Candidats_SessionCumque voluptatem na.html",
);
const docxPath = path.resolve(
  "public/Convocations_Candidats_SessionCumque voluptatem na.docx",
);
const fallbackPath = path.resolve(
  "public/Convocations_Candidats_SessionCumque voluptatem na.generated.docx",
);

const html = fs.readFileSync(htmlPath, "utf8");

const result = await asBlob(html, {
  orientation: "portrait",
  margins: {
    top: 720,
    right: 720,
    bottom: 720,
    left: 720,
  },
});

const buffer = Buffer.isBuffer(result)
  ? result
  : Buffer.from(await result.arrayBuffer());

const targets = [
  docxPath,
  fallbackPath,
  path.resolve(
    `public/Convocations_Candidats_SessionCumque voluptatem na.${Date.now()}.docx`,
  ),
];

let writtenPath = null;
let lastError = null;

for (const targetPath of targets) {
  try {
    fs.writeFileSync(targetPath, buffer);
    writtenPath = targetPath;
    break;
  } catch (error) {
    lastError = error;
    if (error?.code !== "EBUSY" && error?.code !== "EPERM") {
      throw error;
    }
  }
}

if (!writtenPath) {
  throw lastError ?? new Error("Could not write DOCX output.");
}

if (writtenPath === docxPath) {
  console.log("Generated:", writtenPath);
} else if (writtenPath === fallbackPath) {
  console.warn("Original DOCX is open in Word.");
  console.log("Generated:", writtenPath);
} else {
  console.warn("Original and .generated.docx are open in Word.");
  console.log("Generated:", writtenPath);
}
