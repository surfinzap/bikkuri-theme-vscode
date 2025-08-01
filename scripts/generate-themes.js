const fs = require('fs');
const path = require('path');

const schemesFolder = 'temp/';
const template = fs.readFileSync('src/templates/bikkuri.mustache', 'utf8');
const distFolder = 'dist/';
const themePrefix = 'bikkuri-';

function deleteFiles(folderPath) {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
    return;
  }

  const files = fs.readdirSync(folderPath);

  files.forEach(fileName => {
    const filePath = path.join(folderPath, fileName);
    try {
      if (fs.lstatSync(filePath).isFile()) {
        fs.unlinkSync(filePath);
      }
    } catch (err) {
      console.error(`Failed to delete ${filePath}. Reason: ${err.message}`);
    }
  });
}

function renderMustache(template, data) {
  let result = template;
  
  result = result.replace(/\{\{\s*([^}]+)\s*\}\}/g, (match, key) => {
    const keys = key.trim().split('.');
    let value = data;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return match;
      }
    }
    
    return value !== undefined ? value : match;
  });
  
  return result;
}

function renderTheme(scheme, filename) {
  const themeFilename = path.join(distFolder, themePrefix + filename);

  try {
    const renderedTheme = renderMustache(template, scheme);
    fs.writeFileSync(themeFilename, renderedTheme);
  } catch (err) {
    console.error(`Error rendering theme ${filename}: ${err.message}`);
  }
}

function processSchemes(folderPath) {
  deleteFiles(distFolder);

  if (!fs.existsSync(folderPath)) {
    console.error(`Schemes folder ${folderPath} does not exist`);
    return;
  }

  const schemeFiles = fs.readdirSync(folderPath).filter(f => f.endsWith('.json'));
  const themesList = []; // for populating package.json

  schemeFiles.forEach(schemeFile => {
    const schemeFilepath = path.join(folderPath, schemeFile);
    
    try {
      const schemeData = fs.readFileSync(schemeFilepath, 'utf8');
      const schemeJson = JSON.parse(schemeData);

      themesList.push({
        "label": `Bikkuri (${schemeJson['mode-name']} ${schemeJson['tint-name']} & ${schemeJson['mood-name']})`,
        "uiTheme": `vs-${schemeJson['mode-type']}`,
        "path": `./${distFolder}${themePrefix}${schemeFile}`
      });

      renderTheme(schemeJson, schemeFile);
    } catch (err) {
      console.error(`Error processing ${schemeFile}: ${err.message}`);
    }
  });

  // add theme definitions to the package.json
  try {
    const packageData = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    packageData.contributes.themes = themesList;
    fs.writeFileSync('package.json', JSON.stringify(packageData, null, 2));
  } catch (err) {
    console.error(`Error updating package.json: ${err.message}`);
    return;
  }

  console.log('Themes generated.');
}

processSchemes(schemesFolder);