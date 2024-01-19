const inputData = [
  {
    scope: 'emphasis',
    settings: {
      fontStyle: 'italic',
    },
  },
  {
    scope: 'strong',
    settings: {
      fontStyle: 'bold',
    },
  },
  {
    scope: 'header',
    settings: {
      foreground: '{{ syntax.06.dim }}',
    },
  },
  {
    scope: [
      'comment',
      'punctuation.definition.comment',
      'string.comment.buffered.block.pug',
      'string.quoted.docstring.multi.python',
    ],
    settings: {
      foreground: '{{ text.dim }}',
      fontStyle: 'italic',
    },
  },
  {
    scope: ['constant', 'support.constant', 'variable.arguments'],
    settings: {
      foreground: '{{ syntax.07.base }}',
    },
  },
  {
    scope: 'constant.rgb-value',
    settings: {
      foreground: '{{ text.base }}',
    },
  },
  {
    scope: 'entity.name.selector',
    settings: {
      foreground: '{{ syntax.05.base }}',
    },
  },
  {
    scope: 'entity.other.attribute-name',
    settings: {
      foreground: '{{ syntax.06.base }}',
    },
  },
  {
    scope: ['entity.name.tag', 'punctuation.tag'],
    settings: {
      foreground: '{{ syntax.04.base }}',
    },
  },
  {
    scope: ['invalid', 'invalid.illegal'],
    settings: {
      foreground: '{{ syntax.01.dim }}',
    },
  },
  {
    scope: 'invalid.deprecated',
    settings: {
      foreground: '{{ syntax.07.dim }}',
    },
  },
  {
    scope: 'meta.selector',
    settings: {
      foreground: '{{ syntax.05.base }}',
    },
  },
  {
    scope: 'meta.preprocessor',
    settings: {
      foreground: '{{ syntax.02.base }}',
    },
  },
  {
    scope: 'meta.preprocessor.string',
    settings: {
      foreground: '{{ syntax.04.base }}',
    },
  },
  {
    scope: 'meta.preprocessor.numeric',
    settings: {
      foreground: '{{ syntax.04.base }}',
    },
  },
  {
    scope: 'meta.header.diff',
    settings: {
      foreground: '{{ syntax.02.base }}',
    },
  },
  {
    scope: ['storage', 'storage.type.function', 'keyword.control'],
    settings: {
      foreground: '{{ syntax.07.dim }}',
    },
  },
  {
    settings: {
      foreground: '{{ syntax.01.base }}',
    },
  },
  {
    scope: 'storage.modifier',
    settings: {
      foreground: '{{ syntax.02.base }}',
    },
  },
  {
    scope: 'string',
    settings: {
      foreground: '{{ syntax.08.base }}',
    },
  },
  {
    scope: 'string.tag',
    settings: {
      foreground: '{{ syntax.04.base }}',
    },
  },
  {
    scope: 'string.value',
    settings: {
      foreground: '{{ syntax.04.base }}',
    },
  },
  {
    scope: 'string.regexp',
    settings: {
      foreground: '{{ syntax.02.base }}',
    },
  },
  {
    scope: 'string.escape',
    settings: {
      foreground: '{{ syntax.01.base }}',
    },
  },
  {
    scope: 'string.quasi',
    settings: {
      foreground: '{{ syntax.05.base }}',
    },
  },
  {
    scope: 'string.entity',
    settings: {
      foreground: '{{ syntax.04.base }}',
    },
  },
  {
    scope: 'object',
    settings: {
      foreground: '{{ text.base }}',
    },
  },
  {
    scope: 'module.node',
    settings: {
      foreground: '{{ syntax.06.base }}',
    },
  },
  {
    scope: 'support.type.property-name',
    settings: {
      foreground: '{{ syntax.05.dim }}',
    },
  },
  {
    scope: 'keyword',
    settings: {
      foreground: '{{ syntax.01.base }}',
    },
  },

  {
    scope: 'keyword.control.module',
    settings: {
      foreground: '{{ syntax.05.base }}',
    },
  },
  {
    scope: 'keyword.control.less',
    settings: {
      foreground: '{{ syntax.03.base }}',
    },
  },
  {
    scope: 'keyword.operator',
    settings: {
      foreground: '{{ text.mid }}',
    },
  },
  {
    scope: 'keyword.operator.new',
    settings: {
      foreground: '{{ syntax.02.base }}',
    },
  },
  // keyword.other.unit impacts CSS/SCSS, anything else?
  // if yes, I can target it as "source.css keyword.other..."
  {
    scope: 'keyword.other.unit',
    settings: {
      foreground: '{{ syntax.07.dim }}',
    },
  },
  {
    scope: 'metatag.php',
    settings: {
      foreground: '{{ syntax.02.base }}',
    },
  },
  {
    scope: 'support.function.git-rebase',
    settings: {
      foreground: '{{ syntax.05.dim }}',
    },
  },
  {
    scope: 'constant.sha.git-rebase',
    settings: {
      foreground: '{{ syntax.04.base }}',
    },
  },
  {
    name: 'Types declaration and references',
    scope: [
      'meta.type.name',
      'meta.return.type',
      'meta.return-type',
      'meta.cast',
      'meta.type.annotation',
      'support.type',
      'storage.type.cs',
      'variable.class',
    ],
    settings: {
      foreground: '{{ syntax.03.base }}',
    },
  },
  {
    scope: ['variable.this', 'support.variable'],
    settings: {
      foreground: '{{ syntax.07.base }}',
    },
  },
  {
    scope: [
      'entity.name',
      'entity.static',
      'entity.name.class.static.function',
      'entity.name.function',
      'entity.name.class',
      'entity.name.type',
    ],
    settings: {
      foreground: '{{ text.base }}',
    },
  },
  {
    name: 'Function declarations',
    scope: ['entity.function', 'entity.name.function.static'],
    settings: {
      foreground: '{{ syntax.05.base }}',
    },
  },
  {
    scope: 'entity.name.function.function-call',
    settings: {
      foreground: '{{ syntax.05.base }}',
    },
  },
  {
    scope: 'support.function.builtin',
    settings: {
      foreground: '{{ syntax.02.base }}',
    },
  },
  {
    scope: [
      'entity.name.method',
      'entity.name.method.function-call',
      'entity.name.static.function-call',
    ],
    settings: {
      foreground: '{{ syntax.05.dim }}',
    },
  },
  {
    scope: 'brace',
    settings: {
      foreground: '{{ text.base }}',
    },
  },
  {
    name: 'variables',
    scope: [
      'meta.parameter.type.variable',
      'variable.parameter',
      'variable.name',
      'variable.other',
      'variable',
      'string.constant.other.placeholder',
    ],
    settings: {
      foreground: '{{ syntax.05.base }}',
    },
  },
  {
    scope: 'prototype',
    settings: {
      foreground: '{{ syntax.07.base }}',
    },
  },
  {
    scope: 'storage.type.class',
    settings: {
      foreground: '{{ syntax.01.base }}',
    },
  },
  {
    scope: ['punctuation', 'attribute_value', 'meta.tag.other'],
    settings: {
      foreground: '{{ text.dim }}',
    },
  },
  {
    scope: 'punctuation.quoted',
    settings: {
      foreground: '{{ text.base }}',
    },
  },
  {
    scope: 'punctuation.quasi',
    settings: {
      foreground: '{{ syntax.01.base }}',
    },
  },
  {
    name: 'URL',
    scope: ['*url*', '*link*', '*uri*'],
    settings: {
      fontStyle: 'underline',
    },
  },
  // ----------------------------------------
  //            LANGUAGE SPECIFIC
  // ----------------------------------------
  // PYTHON ----------------------------------------
  {
    scope: ['source.python', 'meta.function-call.arguments'],
    settings: {
      foreground: '{{ text.base }}',
    },
  },
  {
    name: 'Python function',
    scope: ['meta.function.python', 'entity.name.function.python'],
    settings: {
      foreground: '{{ syntax.03.base }}',
    },
  },
  {
    name: 'Python Function and Class definition keywords',
    scope: [
      'storage.type.function.python',
      'storage.modifier.declaration',
      'storage.type.class.python',
    ],
    settings: {
      foreground: '{{ syntax.01.base }}',
    },
  },
  {
    name: 'Python Function Call',
    scope: 'meta.function-call.generic',
    settings: {
      foreground: '{{ syntax.06.base }}',
    },
  },
  {
    name: 'Python Function decorator',
    scope: 'entity.name.function.decorator',
    settings: {
      foreground: '{{ syntax.03.base }}',
      fontStyle: 'bold',
    },
  },
  {
    name: 'Python Support Tyype',
    scope: 'support.type.exception.python',
    settings: {
      foreground: '{{ syntax.02.base }}',
    },
  },
  {
    name: 'Python ALL CAPS',
    scope: 'constant.other.caps',
    settings: {
      fontStyle: 'bold',
    },
  },
  // SHELL ----------------------------------------
  {
    scope: 'keyword.operator.logical',
    settings: {
      foreground: '{{ syntax.01.base }}',
    },
  },
  {
    scope: 'punctuation.definition.logical-expression',
    settings: {
      foreground: '{{ syntax.02.base }}',
    },
  },
  {
    scope: 'string.inperpolated.dollar.shell',
    settings: {
      foreground: '{{ syntax.02.base }}',
    },
  },
  {
    scope: [
      'string.interpolated.dollar.shell',
      'string.interpolated.backtick.shell',
    ],
    settings: {
      foreground: '{{ syntax.05.base }}',
    },
  },
  // C C++ ----------------------------------------
  {
    scope: 'keyword.control.directive',
    settings: {
      foreground: '{{ syntax.05.base }}',
    },
  },
  {
    scope: 'support.function.C99',
    settings: {
      foreground: '{{ syntax.03.base }}',
    },
  },
  // C# ----------------------------------------
  {
    name: 'C# functions & namespace',
    scope: [
      'meta.function.cs',
      'entity.name.function.cs',
      'entity.name.type.namespace.cs',
    ],
    settings: {
      foreground: '{{ syntax.04.base }}',
    },
  },
  {
    name: 'C# Variables',
    scope: [
      'keyword.other.using.cs',
      'entity.name.variable.field.cs',
      'entity.name.variable.local.cs',
      'variable.other.readwrite.cs',
    ],
    settings: {
      foreground: '{{ syntax.05.base }}',
    },
  },
  {
    name: 'C# This',
    scope: ['keyword.other.this.cs', 'keyword.other.base.cs'],
    settings: {
      foreground: '{{ syntax.07.base }}',
    },
  },
  // MAKEFILE ----------------------------------------
  {
    scope: 'meta.scope.prerequisites',
    settings: {
      foreground: '{{ syntax.03.base }}',
    },
  },
  {
    scope: 'entity.name.function.target',
    settings: {
      foreground: '{{ syntax.04.base }}',
      fontStyle: 'bold',
    },
  },
  // JAVA ----------------------------------------
  {
    name: 'coloring of the Java import and package identifiers',
    scope: ['storage.modifier.import.java', 'storage.modifier.package.java'],
    settings: {
      foreground: '{{ text.mid }}',
    },
  },
  {
    scope: ['keyword.other.import.java', 'keyword.other.package.java'],
    settings: {
      foreground: '{{ syntax.05.base }}',
    },
  },
  {
    scope: 'storage.type.java',
    settings: {
      foreground: '{{ syntax.03.base }}',
    },
  },
  {
    scope: 'storage.type.annotation',
    settings: {
      foreground: '{{ syntax.06.base }}',
      fontStyle: 'bold',
    },
  },
  {
    scope: 'keyword.other.documentation.javadoc',
    settings: {
      foreground: '{{ syntax.05.base }}',
    },
  },
  {
    scope: 'comment.block.javadoc variable.parameter.java',
    settings: {
      foreground: '{{ syntax.04.base }}',
      fontStyle: 'bold',
    },
  },
  {
    scope: [
      'source.java variable.other.object',
      'source.java variable.other.definition.java',
    ],
    settings: {
      foreground: '{{ text.base }}',
    },
  },
  // LISP ----------------------------------------
  {
    name: 'Lisp optional function parameters',
    scope: 'meta.function-parameters.lisp',
    settings: {
      foreground: '{{ syntax.03.base }}',
    },
  },
  // MARKUP (MARKDOWN) --------------------------------
  {
    scope: 'markup.underline',
    settings: {
      fontStyle: 'underline',
    },
  },
  {
    scope: 'string.other.link.title.markdown',
    settings: {
      foreground: '{{ text.base }}',
    },
  },
  {
    scope: ['markup.underline.link'],
    settings: {
      foreground: '{{ syntax.07.base }}',
    },
  },
  {
    scope: ['markup.heading.markdown', 'entity.name.section.markdown'],
    settings: {
      foreground: '{{ syntax.01.base }}',
    },
  },
  {
    scope: [
      'support.function.text.markdown.notes.wiki-link.title',
      'string.other.link',
    ],
    settings: {
      foreground: '{{ syntax.02.base }}',
    },
  },
  {
    scope: 'markup.bold',
    settings: {
      foreground: '{{ syntax.03.base }}',
    },
  },
  {
    scope: 'markup.italic',
    settings: {
      fontStyle: 'italic',
      foreground: '{{ syntax.03.base }}',
    },
  },
  {
    scope: 'markup.inserted',
    settings: {
      foreground: '{{ syntax.04.base }}',
    },
  },
  {
    scope: ['markup.deleted'],
    settings: {
      foreground: '{{ text.dim }}',
    },
  },
  {
    scope: [
      'markup.strikethrough.markdown',
      'punctuation.definition.strikethrough.markdown',
    ],
    settings: {
      foreground: '{{ syntax.01.dim }}',
    },
  },
  {
    scope: 'markup.changed',
    settings: {
      foreground: '{{ syntax.02.base }}',
    },
  },
  {
    scope: ['markup.inline.raw', 'markup.fenced_code.block'],
    settings: {
      foreground: '{{ syntax.04.base }}',
    },
  },

  {
    scope: ['text.markdown.notes.tag'],
    settings: {
      foreground: '{{ syntax.05.base }}',
    },
  },
  {
    scope: [
      'punctuation.definition.list.begin.markdown',
      'markup.quote.markdown',
      'punctuation.definition.heading.markdown',
      'punctuation.definition.wiki-link',
      'punctuation.definition.string.begin.markdown',
      'punctuation.definition.string.end.markdown',
      'punctuation.definition.metadata.markdown',
      'punctuation.definition.italic.markdown',
      'punctuation.definition.bold.markdown',
    ],
    settings: {
      foreground: '{{ text.dim }}',
    },
  },
  // Mermaid -------------------------------------
  {
    scope: ['keyword.control.mermaid'],
    settings: {
      foreground: '{{ syntax.01.base }}',
    },
  },
  {
    scope: ['entity.name.type.class.mermaid'],
    settings: {
      foreground: '{{ syntax.03.base }}',
    },
  },
  {
    scope: ['storage.type.mermaid'],
    settings: {
      foreground: '{{ syntax.05.base }}',
    },
  },
  {
    scope: ['entity.name.function.mermaid'],
    settings: {
      foreground: '{{ syntax.02.base }}',
    },
  },
  {
    scope: [
      //same as markup.fenced_code.block.markdown
      'punctuation.parenthesis.open.mermaid',
    ],
    settings: {
      foreground: '{{ syntax.04.base }}',
    },
  },

  // JSON ----------------------------------------
  {
    scope: 'string.quoted.double.json',
    settings: {
      foreground: '{{ text.base }}',
    },
  },
  {
    name: 'JSON Level 0',
    scope: [
      'source.json meta.structure.dictionary.json support.type.property-name.json',
    ],
    settings: {
      foreground: '{{ syntax.01.base }}',
    },
  },
  {
    name: 'JSON Level 1',
    scope: [
      'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json',
    ],
    settings: {
      foreground: '{{ syntax.02.base }}',
    },
  },
  {
    name: 'JSON Level 2',
    scope: [
      'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json',
    ],
    settings: {
      foreground: '{{ syntax.03.base }}',
    },
  },
  {
    name: 'JSON Level 3',
    scope: [
      'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json',
    ],
    settings: {
      foreground: '{{ syntax.04.base }}',
    },
  },
  {
    name: 'JSON Level 4',
    scope: [
      'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json',
    ],
    settings: {
      foreground: '{{ syntax.06.base }}',
    },
  },
  // CSS / SCSS ----------------------------------
  {
    scope: ['entity.other.attribute-name.class.css'],
    settings: {
      foreground: '{{ syntax.03.base }}',
    },
  },
  {
    scope: ['punctuation.definition.entity.css'],
    settings: {
      foreground: '{{ syntax.05.base }}',
    },
  },
  {
    scope: ['entity.name.tag.css'],
    settings: {
      foreground: '{{ syntax.04.base }}',
    },
  },
  {
    scope: [
      'entity.name.tag.reference.scss',
      'entity.name.tag.wildcard.scss',
      'entity.other.attribute-name.pseudo-class.css',
      'entity.other.attribute-name.parent-selector-suffix.css',
      // "punctuation.definition.entity.css",
      'source.css.scss',
      'entity.name.tag.custom.scss',
    ],
    settings: {
      foreground: '{{ syntax.06.base }}',
    },
  },
  {
    scope: [
      'support.type.property-name.css',
      'meta.property-name.scss',
      'source.css.scss',
    ],
    settings: {
      foreground: '{{ text.base }}',
    },
  },

  {
    scope: [
      'source.css support.function.transform',
      'source.css support.function.timing-function',
      'source.css support.function.misc',
      'punctuation.definition.keyword.scss',
      'keyword.control.at-rule.media.scss',
      'keyword.control.at-rule.mixin.scss',
      'keyword.control.else.scss',
      'keyword.control.if.scss',
      'keyword.control.content.scss',
      'keyword.operator.logical.scss',
    ],
    settings: {
      foreground: '{{ syntax.01.dim }}',
    },
  },

  {
    scope: ['variable.css', 'variable.scss', 'variable.argument.css'],
    settings: {
      foreground: '{{ syntax.03.dim }}',
    },
  },

  // HTML / XML ----------------------------------------
  {
    scope: ['punctuation.definition.tag'],
    settings: {
      foreground: '{{ text.dim }}',
    },
  },
  {
    scope: ['text.html punctuation.tag'],
    settings: {
      foreground: '{{ syntax.01.base }}',
    },
  },
  // pug ----------------------------------------------
  {
    scope: ['entity.other.attribute-name.class.pug'],
    settings: {
      foreground: '{{ syntax.03.base }}',
    },
  },
  // vue ----------------------------------------------
  {
    scope: ['meta.directive.vue'],
    settings: {
      foreground: '{{ syntax.05.base }}',
    },
  },
  // javascript ---------------------------------------
  {
    scope: ['source.js', 'source.ts'],
    settings: {
      foreground: '{{ syntax.02.base }}',
    },
  },
  // golang --------------------------------------------
  {
    scope: ['source.go storage.type'],
    settings: {
      foreground: '{{ syntax.03.base }}',
    },
  },
  {
    scope: ['source.go entity.name.import'],
    settings: {
      foreground: '{{ syntax.04.base }}',
    },
  },
  {
    scope: ['source.go keyword.package', 'source.go keyword.import'],
    settings: {
      foreground: '{{ syntax.05.base }}',
    },
  },
  {
    scope: ['source.go keyword.interface', 'source.go keyword.struct'],
    settings: {
      foreground: '{{ syntax.06.base }}',
    },
  },
  {
    scope: ['source.go entity.name.type'],
    settings: {
      foreground: '{{ text.base }}',
    },
  },
  {
    scope: ['source.go entity.name.function'],
    settings: {
      foreground: '{{ syntax.07.base }}',
    },
  },
  // cucumber
  {
    scope: ['keyword.control.cucumber.table'],
    settings: {
      foreground: '{{ syntax.06.base }}',
    },
  },
  // REASONML ------------------------------------
  {
    name: 'ReasonML String',
    scope: ['source.reason string.double', 'source.reason string.regexp'],
    settings: {
      foreground: '{{ syntax.04.base }}',
    },
  },
  {
    name: 'ReasonML equals sign',
    scope: ['source.reason keyword.control.less'],
    settings: {
      foreground: '{{ syntax.05.base }}',
    },
  },
  {
    name: 'ReasonML variable',
    scope: ['source.reason entity.name.function'],
    settings: {
      foreground: '{{ syntax.06.base }}',
    },
  },
  {
    name: 'ReasonML property',
    scope: [
      'source.reason support.property-value',
      'source.reason entity.name.filename',
    ],
    settings: {
      foreground: '{{ syntax.02.base }}',
    },
  },
  // POWERSHELL ------------------------------------
  {
    name: 'Powershell member',
    scope: ['source.powershell variable.other.member.powershell'],
    settings: {
      foreground: '{{ syntax.02.base }}',
    },
  },
  {
    name: 'Powershell function',
    scope: ['source.powershell support.function.powershell'],
    settings: {
      foreground: '{{ syntax.03.base }}',
    },
  },
  {
    name: 'Powershell function attribute',
    scope: ['source.powershell support.function.attribute.powershell'],
    settings: {
      foreground: '{{ text.mid }}',
    },
  },
  {
    name: 'Powershell hashtable member',
    scope: [
      'source.powershell meta.hashtable.assignment.powershell variable.other.readwrite.powershell',
    ],
    settings: {
      foreground: '{{ syntax.02.base }}',
    },
  },
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



const test = [
  {
    "scope": [
      "emphasis"
    ],
    "settings": {
      "fontStyle": "italic"
    }
  },
  {
    "scope": [
      "constant.other.caps",
      "strong"
    ],
    "settings": {
      "fontStyle": "bold"
    }
  },
  {
    "scope": [
      "header"
    ],
    "settings": {
      "foreground": "{{ syntax.06.dim }}"
    }
  },
  {
    "scope": [
      "comment",
      "punctuation.definition.comment",
      "string.comment.buffered.block.pug",
      "string.quoted.docstring.multi.python"
    ],
    "settings": {
      "foreground": "{{ text.dim }}",
      "fontStyle": "italic"
    }
  },
  {
    "scope": [
      "constant",
      "keyword.other.base.cs",
      "keyword.other.this.cs",
      "markup.underline.link",
      "prototype",
      "source.go entity.name.function",
      "support.constant",
      "support.variable",
      "variable.arguments",
      "variable.this"
    ],
    "settings": {
      "foreground": "{{ syntax.07.base }}"
    }
  },
  {
    "scope": [
      "brace",
      "constant.rgb-value",
      "entity.name",
      "entity.name.class",
      "entity.name.class.static.function",
      "entity.name.function",
      "entity.name.type",
      "entity.static",
      "meta.function-call.arguments",
      "meta.property-name.scss",
      "object",
      "punctuation.quoted",
      "source.css.scss",
      "source.go entity.name.type",
      "source.java variable.other.definition.java",
      "source.java variable.other.object",
      "source.python",
      "string.other.link.title.markdown",
      "string.quoted.double.json",
      "support.type.property-name.css"
    ],
    "settings": {
      "foreground": "{{ text.base }}"
    }
  },
  {
    "scope": [
      "entity.function",
      "entity.name.function.function-call",
      "entity.name.function.static",
      "entity.name.selector",
      "entity.name.variable.field.cs",
      "entity.name.variable.local.cs",
      "keyword.control.directive",
      "keyword.control.module",
      "keyword.other.documentation.javadoc",
      "keyword.other.import.java",
      "keyword.other.package.java",
      "keyword.other.using.cs",
      "meta.directive.vue",
      "meta.parameter.type.variable",
      "meta.selector",
      "punctuation.definition.entity.css",
      "source.go keyword.import",
      "source.go keyword.package",
      "source.reason keyword.control.less",
      "storage.type.mermaid",
      "string.constant.other.placeholder",
      "string.interpolated.backtick.shell",
      "string.interpolated.dollar.shell",
      "string.quasi",
      "text.markdown.notes.tag",
      "variable",
      "variable.name",
      "variable.other",
      "variable.other.readwrite.cs",
      "variable.parameter"
    ],
    "settings": {
      "foreground": "{{ syntax.05.base }}"
    }
  },
  {
    "scope": [
      "entity.name.tag.custom.scss",
      "entity.name.tag.reference.scss",
      "entity.name.tag.wildcard.scss",
      "entity.other.attribute-name",
      "entity.other.attribute-name.parent-selector-suffix.css",
      "entity.other.attribute-name.pseudo-class.css",
      "keyword.control.cucumber.table",
      "meta.function-call.generic",
      "module.node",
      "source.css.scss",
      "source.go keyword.interface",
      "source.go keyword.struct",
      "source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json",
      "source.reason entity.name.function"
    ],
    "settings": {
      "foreground": "{{ syntax.06.base }}"
    }
  },
  {
    "scope": [
      "constant.sha.git-rebase",
      "entity.name.function.cs",
      "entity.name.tag",
      "entity.name.tag.css",
      "entity.name.type.namespace.cs",
      "markup.fenced_code.block",
      "markup.inline.raw",
      "markup.inserted",
      "meta.function.cs",
      "meta.preprocessor.numeric",
      "meta.preprocessor.string",
      "punctuation.parenthesis.open.mermaid",
      "punctuation.tag",
      "source.go entity.name.import",
      "source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json",
      "source.reason string.double",
      "source.reason string.regexp",
      "string.entity",
      "string.tag",
      "string.value"
    ],
    "settings": {
      "foreground": "{{ syntax.04.base }}"
    }
  },
  {
    "scope": [
      "invalid",
      "invalid.illegal",
      "keyword.control.at-rule.media.scss",
      "keyword.control.at-rule.mixin.scss",
      "keyword.control.content.scss",
      "keyword.control.else.scss",
      "keyword.control.if.scss",
      "keyword.operator.logical.scss",
      "markup.strikethrough.markdown",
      "punctuation.definition.keyword.scss",
      "punctuation.definition.strikethrough.markdown",
      "source.css support.function.misc",
      "source.css support.function.timing-function",
      "source.css support.function.transform"
    ],
    "settings": {
      "foreground": "{{ syntax.01.dim }}"
    }
  },
  {
    "scope": [
      "invalid.deprecated",
      "keyword.control",
      "keyword.other.unit",
      "storage",
      "storage.type.function"
    ],
    "settings": {
      "foreground": "{{ syntax.07.dim }}"
    }
  },
  {
    "scope": [
      "entity.name.function.mermaid",
      "keyword.operator.new",
      "markup.changed",
      "meta.header.diff",
      "meta.preprocessor",
      "metatag.php",
      "punctuation.definition.logical-expression",
      "source.js",
      "source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json",
      "source.powershell meta.hashtable.assignment.powershell variable.other.readwrite.powershell",
      "source.powershell variable.other.member.powershell",
      "source.reason entity.name.filename",
      "source.reason support.property-value",
      "source.ts",
      "storage.modifier",
      "string.inperpolated.dollar.shell",
      "string.other.link",
      "string.regexp",
      "support.function.builtin",
      "support.function.text.markdown.notes.wiki-link.title",
      "support.type.exception.python"
    ],
    "settings": {
      "foreground": "{{ syntax.02.base }}"
    }
  },
  {
    "scope": [
      "entity.name.section.markdown",
      "keyword",
      "keyword.control.mermaid",
      "keyword.operator.logical",
      "markup.heading.markdown",
      "punctuation.quasi",
      "source.json meta.structure.dictionary.json support.type.property-name.json",
      "storage.modifier.declaration",
      "storage.type.class",
      "storage.type.class.python",
      "storage.type.function.python",
      "string.escape",
      "text.html punctuation.tag",
      null
    ],
    "settings": {
      "foreground": "{{ syntax.01.base }}"
    }
  },
  {
    "scope": [
      "string"
    ],
    "settings": {
      "foreground": "{{ syntax.08.base }}"
    }
  },
  {
    "scope": [
      "entity.name.method",
      "entity.name.method.function-call",
      "entity.name.static.function-call",
      "support.function.git-rebase",
      "support.type.property-name"
    ],
    "settings": {
      "foreground": "{{ syntax.05.dim }}"
    }
  },
  {
    "scope": [
      "entity.name.function.python",
      "entity.name.type.class.mermaid",
      "entity.other.attribute-name.class.css",
      "entity.other.attribute-name.class.pug",
      "keyword.control.less",
      "markup.bold",
      "meta.cast",
      "meta.function-parameters.lisp",
      "meta.function.python",
      "meta.return-type",
      "meta.return.type",
      "meta.scope.prerequisites",
      "meta.type.annotation",
      "meta.type.name",
      "source.go storage.type",
      "source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json",
      "source.powershell support.function.powershell",
      "storage.type.cs",
      "storage.type.java",
      "support.function.C99",
      "support.type",
      "variable.class"
    ],
    "settings": {
      "foreground": "{{ syntax.03.base }}"
    }
  },
  {
    "scope": [
      "keyword.operator",
      "source.powershell support.function.attribute.powershell",
      "storage.modifier.import.java",
      "storage.modifier.package.java"
    ],
    "settings": {
      "foreground": "{{ text.mid }}"
    }
  },
  {
    "scope": [
      "attribute_value",
      "markup.deleted",
      "markup.quote.markdown",
      "meta.tag.other",
      "punctuation",
      "punctuation.definition.bold.markdown",
      "punctuation.definition.heading.markdown",
      "punctuation.definition.italic.markdown",
      "punctuation.definition.list.begin.markdown",
      "punctuation.definition.metadata.markdown",
      "punctuation.definition.string.begin.markdown",
      "punctuation.definition.string.end.markdown",
      "punctuation.definition.tag",
      "punctuation.definition.wiki-link"
    ],
    "settings": {
      "foreground": "{{ text.dim }}"
    }
  },
  {
    "scope": [
      "*link*",
      "*uri*",
      "*url*",
      "markup.underline"
    ],
    "settings": {
      "fontStyle": "underline"
    }
  },
  {
    "scope": [
      "entity.name.function.decorator"
    ],
    "settings": {
      "foreground": "{{ syntax.03.base }}",
      "fontStyle": "bold"
    }
  },
  {
    "scope": [
      "comment.block.javadoc variable.parameter.java",
      "entity.name.function.target"
    ],
    "settings": {
      "foreground": "{{ syntax.04.base }}",
      "fontStyle": "bold"
    }
  },
  {
    "scope": [
      "storage.type.annotation"
    ],
    "settings": {
      "foreground": "{{ syntax.06.base }}",
      "fontStyle": "bold"
    }
  },
  {
    "scope": [
      "markup.italic"
    ],
    "settings": {
      "fontStyle": "italic",
      "foreground": "{{ syntax.03.base }}"
    }
  },
  {
    "scope": [
      "variable.argument.css",
      "variable.css",
      "variable.scss"
    ],
    "settings": {
      "foreground": "{{ syntax.03.dim }}"
    }
  }
]