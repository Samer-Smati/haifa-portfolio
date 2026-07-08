import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const transcriptPath =
  process.argv[2] ??
  "C:\\Users\\Samer SMATI\\.cursor\\projects\\c-Users-Samer-SMATI-Documents-portf\\agent-transcripts\\080aa5e7-16c4-4795-9033-3fbb7184368e\\080aa5e7-16c4-4795-9033-3fbb7184368e.jsonl";
const outputPath =
  process.argv[3] ?? path.join(__dirname, "jobsuit-export.html");

const line = fs
  .readFileSync(transcriptPath, "utf8")
  .split("\n")
  .find((l) => l.includes("resume-container-creative"));

if (!line) {
  console.error("Could not find resume HTML in transcript.");
  process.exit(1);
}

const parsed = JSON.parse(line);
const text = parsed.message?.content?.[0]?.text ?? "";

const start = text.indexOf("<html");
const end = text.lastIndexOf("</html>");

if (start < 0 || end <= start) {
  console.error("Could not locate <html>...</html> in user message.");
  process.exit(1);
}

let html = text.slice(start, end + "</html>".length);

fs.writeFileSync(outputPath, html, "utf8");
console.log(`Wrote ${(html.length / 1024 / 1024).toFixed(2)} MB to ${outputPath}`);
