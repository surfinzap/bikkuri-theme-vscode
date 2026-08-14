/**
 * Regenerates the README variants gallery from package.json, so the list of screenshots can
 * never drift from the list of shipped themes.
 *
 * Rewrites everything between the <!-- variants:start --> / <!-- variants:end --> markers.
 */

const fs = require('node:fs');
const path = require('node:path');

const repoRoot = path.resolve(__dirname, '..', '..');
const readmePath = path.join(repoRoot, 'README.md');
const pkg = require(path.join(repoRoot, 'package.json'));

const START = '<!-- variants:start -->';
const END = '<!-- variants:end -->';

const sections = pkg.contributes.themes.map((theme) => {
  // "Bikkuri (Dark Coal & Lively)" -> "Dark Coal & Lively"
  const title = theme.label.replace(/^Bikkuri\s*\(/, '').replace(/\)$/, '');
  const image = `assets/${path.basename(theme.path, '.json')}.webp`;
  const missing = fs.existsSync(path.join(repoRoot, image)) ? '' : ' (missing)';
  if (missing) console.warn(`Warning: ${image} does not exist yet.`);
  return `### ${title}\n![${title}](${image})`;
});

const block = `${START}\n\n${sections.join('\n\n')}\n\n${END}`;

let readme = fs.readFileSync(readmePath, 'utf8');
if (readme.includes(START) && readme.includes(END)) {
  readme = readme.replace(new RegExp(`${START}[\\s\\S]*?${END}`), block);
} else {
  // First run: replace the body of the existing "## Variants" section.
  const replaced = readme.replace(
    /(## Variants\r?\n)[\s\S]*?(?=\r?\n## )/,
    (match, heading) => `${heading}\n${block}\n`
  );
  if (replaced === readme) {
    throw new Error('Could not find the "## Variants" section or the variants markers.');
  }
  readme = replaced;
}

fs.writeFileSync(readmePath, readme);
console.log(`README variants section updated (${sections.length} themes).`);
