/**
 * Verifies and optimises the raw frames produced by capture.ps1.
 *
 *   temp/screenshots/<variant>.png  ->  assets/<variant>.webp
 *
 * Verification catches the one failure mode of the capture loop that is invisible in a
 * summary: VS Code not having applied the new theme yet when the frame was grabbed. The
 * dominant colour of a full editor screenshot is the editor background, so it must match
 * `colors["editor.background"]` of the corresponding theme in dist/.
 */

const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const JSON5 = require('json5');
const sharp = require('sharp');

const repoRoot = path.resolve(__dirname, '..', '..');
const inputDir = path.join(repoRoot, 'temp', 'screenshots');
const distDir = path.join(repoRoot, 'dist');
const assetsDir = path.join(repoRoot, 'assets');

/** Final asset width in pixels: the capture is 1.5x this, so it stays crisp on HiDPI. */
const OUTPUT_WIDTH = 2048;
const WEBP_QUALITY = 82;
/** Per-channel tolerance when matching the dominant colour against editor.background. */
const COLOR_TOLERANCE = 6;

function hexToRgb(hex) {
  const m = /^#?([0-9a-f]{6})/i.exec(hex || '');
  if (!m) return null;
  const int = parseInt(m[1], 16);
  return { r: (int >> 16) & 255, g: (int >> 8) & 255, b: int & 255 };
}

/**
 * Most frequent colour in the frame. Sampled with nearest-neighbour so pixels keep their
 * exact value (sharp's own stats().dominant is quantised to a coarse histogram).
 */
async function dominantColor(file) {
  const { data, info } = await sharp(file)
    .resize({ width: 400, kernel: 'nearest' })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const counts = new Map();
  for (let i = 0; i < data.length; i += info.channels) {
    const key = (data[i] << 16) | (data[i + 1] << 8) | data[i + 2];
    counts.set(key, (counts.get(key) || 0) + 1);
  }
  let best = 0;
  let bestCount = -1;
  for (const [key, count] of counts) {
    if (count > bestCount) {
      best = key;
      bestCount = count;
    }
  }
  return { r: (best >> 16) & 255, g: (best >> 8) & 255, b: best & 255 };
}

function variants() {
  const pkg = require(path.join(repoRoot, 'package.json'));
  return pkg.contributes.themes.map((theme) => ({
    label: theme.label,
    name: path.basename(theme.path, '.json'),
  }));
}

async function main() {
  const list = variants();
  const missing = list.filter((v) => !fs.existsSync(path.join(inputDir, `${v.name}.png`)));
  if (missing.length) {
    console.error(
      `Missing frames in temp/screenshots:\n  ${missing.map((v) => v.name).join('\n  ')}`
    );
    console.error('Run: pwsh -File scripts/screenshots/capture.ps1');
    process.exit(1);
  }

  const problems = [];
  const seen = new Map();

  for (const variant of list) {
    const src = path.join(inputDir, `${variant.name}.png`);
    const out = path.join(assetsDir, `${variant.name}.webp`);

    // Identical frames mean the theme never changed between two captures.
    const hash = crypto.createHash('sha1').update(fs.readFileSync(src)).digest('hex');
    if (seen.has(hash)) {
      problems.push(`${variant.name}: frame is identical to ${seen.get(hash)}`);
    }
    seen.set(hash, variant.name);

    // The dominant colour of the frame should be the theme's editor background.
    // dist themes are JSONC (the template carries comments), so JSON.parse would choke.
    const theme = JSON5.parse(fs.readFileSync(path.join(distDir, `${variant.name}.json`), 'utf8'));
    const expected = hexToRgb(theme.colors && theme.colors['editor.background']);
    const dominant = await dominantColor(src);
    if (expected) {
      const delta = Math.max(
        Math.abs(dominant.r - expected.r),
        Math.abs(dominant.g - expected.g),
        Math.abs(dominant.b - expected.b)
      );
      if (delta > COLOR_TOLERANCE) {
        problems.push(
          `${variant.name}: dominant colour rgb(${dominant.r},${dominant.g},${dominant.b}) ` +
            `does not match editor.background ${theme.colors['editor.background']} (delta ${delta})`
        );
      }
    }

    const info = await sharp(src)
      .resize({ width: OUTPUT_WIDTH, kernel: 'lanczos3' })
      .webp({ quality: WEBP_QUALITY })
      .toFile(out);

    console.log(
      `${variant.name}.webp  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} kB`
    );
  }

  if (problems.length) {
    console.error(`\n${problems.length} frame(s) look wrong:`);
    for (const problem of problems) console.error(`  - ${problem}`);
    console.error('\nRe-run the capture, raising -SettleMs if themes needed longer to apply.');
    process.exit(1);
  }

  // Retire the hand-made PNGs the WebP set replaces.
  const stale = fs
    .readdirSync(assetsDir)
    .filter((file) => /^bikkuri-(dark|light)-.*\.png$/.test(file));
  for (const file of stale) fs.unlinkSync(path.join(assetsDir, file));
  if (stale.length) console.log(`\nRemoved ${stale.length} superseded PNG(s).`);

  console.log(`\n${list.length} screenshots written to assets/`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
