const fs = require('fs');

const TONE_MAP = {
  'dark-serene': 'dim',
  'dark-lively': 'mid',
  'light-serene': 'mid',
  'light-lively': 'high',
};

const COLOR_NAMES = ['red', 'orange', 'yellow', 'emerald', 'teal', 'blue', 'violet', 'pink'];
const SHADES = ['100', '90', '80', '70', '60', '50', '40', '30', '20', '10'];

function main() {
  const modes = ['dark', 'light'];
  const tints = ['coal', 'moss', 'navy', 'plum', 'warm'];
  const moods = ['serene', 'lively'];

  modes.forEach((mode) => {
    tints.forEach((tint) => {
      moods.forEach((mood) => {
        processScheme(mode, tint, mood);
      });
    });
  });
  console.log('♻️  ' + getCurrentFormattedTime());
  console.log('Schemes generated.');
}

function processScheme(mode, tint, mood) {
  let data = mergeData(mode, tint, mood);

  let hasUnresolvedReferences = true;
  while (hasUnresolvedReferences) {
    const dataBeforeResolution = JSON.stringify(data);
    resolveReferences(data, data);
    const dataAfterResolution = JSON.stringify(data);

    hasUnresolvedReferences = dataBeforeResolution !== dataAfterResolution;
  }

  saveTempScheme(data, `${mode}-${tint}-${mood}`);
}

function readJsonFile(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (err) {
    console.error('Error reading file:', filePath, err);
    return null;
  }
}

function mergeData(mode, tint, mood) {
  const tokens = readJsonFile('src/tokens/tokens.json');
  const moodData = buildMoodData(mode, mood);
  mode = readJsonFile(`src/themes/mode/${mode}.json`);
  tint = readJsonFile(`src/themes/tint/${tint}.json`);

  const mergedData = { ...tokens, ...mode, ...tint, ...moodData };
  return mergedData;
}

function buildMoodData(mode, mood) {
  const tone = TONE_MAP[`${mode}-${mood}`];
  if (!tone) {
    throw new Error(`No tone mapping for ${mode}-${mood}`);
  }
  const data = { 'mood-name': mood.charAt(0).toUpperCase() + mood.slice(1) };
  for (const color of COLOR_NAMES) {
    data[color] = {};
    for (const shade of SHADES) {
      data[color][shade] = `{{ color.${color}-${tone}.${shade} }}`;
    }
  }
  return data;
}

function resolveReferences(obj, data) {
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'string') {
      obj[key] = obj[key].replace(/\{\{(.+?)\}\}/g, (match, keyPath) => {
        keyPath = keyPath.trim();
        let refValue = keyPath.split('.').reduce((acc, k) => acc && acc[k], data);
        return refValue !== undefined ? refValue : match;
      });
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      resolveReferences(obj[key], data); // Recursive call for nested objects
    }
  });
}

function saveTempScheme(data, filename) {
  const dir = 'temp';
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  fs.writeFileSync(`${dir}/${filename}.json`, JSON.stringify(data, null, 2));
}

function getCurrentFormattedTime() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

main();
