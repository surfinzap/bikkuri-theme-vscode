const inputData = [
  // place theme tokens here
];


function transformData(data) {
  // Remove 'name' key and group by 'settings'
  const groupedBySettings = data.reduce((acc, item) => {
    // Remove 'name' key
    const { name, ...rest } = item;

    // Convert settings object to a string to use as a key for grouping
    const settingsKey = JSON.stringify(rest.settings);

    // Initialize group if it doesn't exist
    if (!acc[settingsKey]) {
      acc[settingsKey] = { settings: rest.settings, scopes: [] };
    }

    // Add scope to group
    if (Array.isArray(rest.scope)) {
      acc[settingsKey].scopes.push(...rest.scope);
    } else {
      acc[settingsKey].scopes.push(rest.scope);
    }

    return acc;
  }, {});

  // Convert grouped object back to array and sort scopes
  return Object.values(groupedBySettings).map((group) => {
    group.scopes = group.scopes.sort();
    return {
      scope: group.scopes,
      settings: group.settings,
    };
  });
}

const transformedData = transformData(inputData);

console.log(JSON.stringify(transformedData, null, 2));


