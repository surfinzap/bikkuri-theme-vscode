const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const json5 = require('json5');

/* file paths */
const vscodeVarsPath = 'temp/vs-code-vars.txt';
const templatePath = 'src/templates/bikkuri.mustache';
const outputPath = 'temp/missing-vars.txt';

async function fetchVSCodeThemeColors() {
  try {
    const response = await axios.get(
      'https://code.visualstudio.com/api/references/theme-color'
    );
    const $ = cheerio.load(response.data);

    let vars = [];
    $('ul > li').each((i, li) => {
      const firstCodeElement = $(li).find('code').first();
      if (firstCodeElement.length) {
        vars.push(firstCodeElement.text().trim());
      }
    });

    const dirPath = 'temp';
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    }

    fs.writeFileSync(vscodeVarsPath, vars.join('\n'));
    console.log(`File written successfully to ${vscodeVarsPath}`);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}


function extractJsonKeys(jsonContent) {
  try {
    const data = json5.parse(jsonContent);
    return Object.keys(data.colors || {});
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return [];
  }
}

function readVarsFromFile(filePath) {
  return fs.readFileSync(filePath, 'utf8').split('\n').filter(Boolean);
}

function findMissingVars(vscodeVars, jsonVars) {
  return vscodeVars.filter((varName) => !jsonVars.includes(varName));
}

function removeDeprecatedVars(vscodeVars) {
  const deprecatedVars = [
    'editorIndentGuide.background',
    'editorIndentGuide.activeBackground',
    'editor.selectionForeground', // does not seem to take effect
    'terminal.selectionForeground', // undefined to keep terminal text colors
  ];

  return vscodeVars.filter((varName) => !deprecatedVars.includes(varName));
}


async function main() {

  await fetchVSCodeThemeColors();
  const vscodeVars = readVarsFromFile(vscodeVarsPath);
  const jsonContent = fs.readFileSync(templatePath, 'utf8');
  const jsonVars = extractJsonKeys(jsonContent);
  let missingVars = findMissingVars(vscodeVars, jsonVars);
  missingVars = removeDeprecatedVars(missingVars);

  fs.writeFileSync(outputPath, missingVars.join('\n'));
  console.log(`Missing variables written to ${outputPath}`);
}

main();