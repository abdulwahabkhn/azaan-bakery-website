import { log } from 'node:console';
import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';

import sharp from 'sharp';

const imagesDirectory = path.resolve('src/assets/images');
const sourceExtensions = new Set(['.png', '.jpg', '.jpeg']);
const cleanNameOverrides = new Map([
  ['Pista Cake', 'PistaCake'],
  ['RedVelvet Cake', 'RedVelvetCake'],
  ['three-milk-mango-cake', 'ThreeMilkMangoCake'],
]);

const files = await readdir(imagesDirectory, { withFileTypes: true });
let convertedCount = 0;
let skippedCount = 0;

for (const file of files) {
  if (!file.isFile()) continue;

  const extension = path.extname(file.name).toLowerCase();
  if (!sourceExtensions.has(extension)) continue;

  const sourceStem = path.basename(file.name, extension);
  const outputStem = cleanNameOverrides.get(sourceStem) ?? sourceStem.replace(/[^a-zA-Z0-9]+/g, '');
  const sourcePath = path.join(imagesDirectory, file.name);
  const outputPath = path.join(imagesDirectory, `${outputStem}.webp`);

  try {
    const [sourceStats, outputStats] = await Promise.all([stat(sourcePath), stat(outputPath)]);
    if (outputStats.mtimeMs >= sourceStats.mtimeMs) {
      log(`Skipped ${file.name} (WebP is current)`);
      skippedCount += 1;
      continue;
    }
  } catch {
    // The WebP does not exist yet and should be generated.
  }

  await sharp(sourcePath)
    .rotate()
    .webp({ effort: 4, quality: 82, smartSubsample: true })
    .toFile(outputPath);

  log(`Converted ${file.name} -> ${path.basename(outputPath)}`);
  convertedCount += 1;
}

log(`WebP conversion complete: ${convertedCount} converted, ${skippedCount} skipped.`);
