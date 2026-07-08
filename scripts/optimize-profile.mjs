import sharp from "sharp";
import fs from "fs";
import path from "path";

const source = "src/assets/samer-profile.jpg";
const outputDir = "public/images";
const heroOutput = path.join(outputDir, "samer-profile.jpg");
const aboutOutput = path.join(outputDir, "samer-profile-about.jpg");

if (!fs.existsSync(source)) {
  console.error("Source image not found:", source);
  process.exit(1);
}

fs.mkdirSync(outputDir, { recursive: true });

const metadata = await sharp(source).metadata();
console.log("Source:", `${metadata.width}x${metadata.height}`, metadata.format);

await sharp(source)
  .resize(960, 1200, {
    fit: "cover",
    position: "top",
    kernel: sharp.kernel.lanczos3,
  })
  .jpeg({ quality: 94, mozjpeg: true, chromaSubsampling: "4:4:4" })
  .toFile(heroOutput);

await sharp(source)
  .resize(560, 560, {
    fit: "cover",
    position: "top",
    kernel: sharp.kernel.lanczos3,
  })
  .jpeg({ quality: 94, mozjpeg: true, chromaSubsampling: "4:4:4" })
  .toFile(aboutOutput);

const heroMeta = await sharp(heroOutput).metadata();
const aboutMeta = await sharp(aboutOutput).metadata();
console.log("Hero:", `${heroMeta.width}x${heroMeta.height}`, fs.statSync(heroOutput).size, "bytes");
console.log("About:", `${aboutMeta.width}x${aboutMeta.height}`, fs.statSync(aboutOutput).size, "bytes");
