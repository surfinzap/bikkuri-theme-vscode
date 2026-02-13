---
name: add-missing-theme-vars
description: Identify and add missing VS Code theme color variables to theme templates with semantically appropriate values in correct order. Use when working on VS Code theme extensions that need API coverage updates.
user-invocable: true
---

# Add Missing VS Code Theme Variables

A comprehensive methodology for maintaining complete compatibility with VS Code's theme color API by identifying missing theme variables and adding them with semantically appropriate values in the correct order.

## Overview

**Purpose**: Keep VS Code theme extensions up-to-date with the evolving theme color API by systematically identifying and adding missing color variables.

**When to use**:
- Maintaining VS Code theme extensions
- Updating themes to support new VS Code features (AI chat, markdown alerts, agent sessions, etc.)
- Achieving 100% coverage of VS Code's official theme color API
- Ensuring consistent color application across all UI elements

**What this skill does**:
1. Identifies missing theme variables by comparing your template against VS Code's official API
2. Analyzes your theme's existing color patterns and semantic token structure
3. Maps missing variables to appropriate color values based on semantic meaning
4. Adds variables in positions matching VS Code's official documentation ordering
5. Validates completeness through theme regeneration and verification

## Prerequisites

Your VS Code theme project should have:

1. **A template file** (e.g., `src/templates/theme.mustache`) that uses semantic color tokens
2. **Theme generation scripts** that convert the template into final JSON theme files
3. **A discovery script** that can:
   - Fetch VS Code's official theme color variables from documentation
   - Compare your template against the official list
   - Output missing variables to a file

**Required files/scripts**:
- Template file with mustache/variable syntax
- Script to fetch official VS Code theme colors (e.g., `scripts/fetch-vs-code-vars.js`)
- Theme data files defining semantic color tokens (e.g., `src/themes/mode/dark.json`)
- Build scripts to regenerate themes from template

## Phase 1: Discovery

**Goal**: Identify which theme variables are missing from your template.

### Step 1.1: Run Discovery Script

Execute your script that fetches VS Code's official theme colors and compares them to your template:

```bash
npm run fetch
# or directly: node scripts/fetch-vs-code-vars.js
```

This script should:
- Fetch the official list of theme color variables from VS Code documentation
- Extract color variable names from your template
- Compare the two lists
- Output results to files (e.g., `temp/missing-vars.txt`, `temp/vs-code-vars.txt`)

### Step 1.2: Review Missing Variables

Check the output file listing missing variables:

```bash
cat temp/missing-vars.txt
```

This gives you the complete list of variables to add.

### Step 1.3: Understand Official Ordering

The `temp/vs-code-vars.txt` file contains all variables in VS Code's official documentation order. This ordering is critical for proper organization:

- Variables are grouped by UI area (text colors, buttons, editor, terminal, etc.)
- Related variables are positioned near each other
- New variables should be inserted to maintain this order

**Example ordering** (excerpt):
```
textPreformat.foreground
textPreformat.background
textPreformat.border         ← New variable goes here
textSeparator.foreground
...
button.secondaryHoverBackground
button.secondaryBorder       ← New variable maintains grouping
button.border
```

## Phase 2: Analysis

**Goal**: Understand your theme's structure and determine appropriate values for missing variables.

### Step 2.1: Study Template Structure

Read your template file to understand:

1. **Organization**: How sections are grouped and commented
   ```mustache
   /* Text colors
      https://code.visualstudio.com/api/references/theme-color#text-colors
   */
   "textBlockQuote.background": "{{ surface.sunken }}",
   "textBlockQuote.border":     "{{ border.dim }}",
   ```

2. **Indentation and alignment**: Match existing patterns (usually 4 spaces, aligned colons)

3. **Comment conventions**: Section headers, inline explanations

### Step 2.2: Identify Available Color Tokens

Review your theme's data files to understand available semantic tokens. Common patterns:

**Surface tokens** (backgrounds, depths):
- `surface.none` - Transparent/invisible
- `surface.sunken` - Recessed areas
- `surface.base` - Default background
- `surface.raised.min/low/mid/high` - Elevated elements

**Text tokens** (foreground, emphasis):
- `text.base` - Primary text
- `text.mid` - Secondary text
- `text.dim` - Tertiary/de-emphasized text
- `text.disabled` - Inactive text
- `text.on-ui` - Text on colored backgrounds

**Border tokens** (dividers, outlines):
- `border.none` - No border (transparent)
- `border.base` - Standard borders
- `border.mid` - Medium emphasis borders
- `border.dim` - Subtle borders

**UI semantic tokens** (meaningful colors):
- `ui.success.*` - Positive states (green)
- `ui.danger.*` - Errors, destructive actions (red)
- `ui.warning.*` - Warnings, draft states (yellow)
- `ui.info.*` - Informational (blue)
- `ui.accent1/2/3.*` - Highlights, accents

**Opacity modifiers** (transparency):
- `{{ opacity.low }}`, `{{ opacity.mid }}`, `{{ opacity.high }}`
- Concatenated with colors: `"{{ ui.success.mid }}{{ opacity.mid-low }}"`

### Step 2.3: Map Variables to Semantic Values

For each missing variable:

1. **Determine semantic meaning** from its name:
   - `textPreformat.border` → border for preformatted text blocks
   - `button.secondaryBorder` → border for secondary buttons
   - `editor.inactiveLineHighlightBackground` → background when editor is not focused
   - `markdownAlert.warning.foreground` → text color for warning alerts
   - `agentSessionSelectedBadge.border` → border for selected agent session badge

2. **Find analogous existing variables**:
   - `textBlockQuote.border` uses `{{ border.dim }}` → `textPreformat.border` likely similar
   - `button.border` uses `{{ border.none }}` → `button.secondaryBorder` should match
   - `editor.lineHighlightBackground` uses `{{ surface.sunken }}` → inactive version uses `{{ surface.none }}`

3. **Apply semantic patterns**:

   **State patterns**:
   - Inactive/unfocused → Use dimmer variants or `none`
   - Hover → Often same or slightly elevated
   - Selected + focused → More prominent (base, mid)
   - Selected + unfocused → Less prominent (dim)
   - Draft/pending → Warning colors
   - Disabled → `text.disabled` or reduced opacity

   **UI element patterns**:
   - Borders → Often `border.none`, `border.dim`, or `border.mid`
   - Backgrounds → Use `surface.*` hierarchy
   - Text → Use `text.base/mid/dim` for hierarchy
   - Errors → `ui.danger.*`
   - Warnings → `ui.warning.*`
   - Success → `ui.success.*`
   - Info → `ui.info.*`
   - Accents → `ui.accent1/2/3.*`
   - Shimmer/animation effects → Accent color + opacity

   **GitHub markdown alert conventions**:
   - Note → Info/blue (`ui.info.base`)
   - Tip → Success/green (`ui.success.base`)
   - Important → Purple/violet (`ui.accent2.base`)
   - Warning → Yellow (`ui.warning.base`)
   - Caution → Danger/red (`ui.danger.base`)

### Step 2.4: Determine Insertion Positions

For each variable:

1. **Find its position** in `temp/vs-code-vars.txt` (line number or context)
2. **Locate the corresponding section** in your template
3. **Identify the insertion point**:
   - Insert after the variable that precedes it in VS Code's ordering
   - If it's part of a group of new variables, create a new section
   - Place new sections before the closing `}` of the colors object

**Example mapping**:
```
VS Code ordering shows:
  editor.lineHighlightBackground
  editor.lineHighlightBorder
  editor.inactiveLineHighlightBackground  ← This is new
  editor.selectionBackground

In template, insert after editor.lineHighlightBorder:
  "editor.lineHighlightBackground": "{{ surface.sunken }}",
  "editor.lineHighlightBorder": "{{ border.none }}",
  "editor.inactiveLineHighlightBackground": "{{ surface.none }}", ← NEW
  "editor.selectionBackground": "{{ surface.raised.mid }}",
```

## Phase 3: Implementation

**Goal**: Add the missing variables to your template in the correct positions with proper syntax.

### Step 3.1: Plan Insertion Order

**Critical**: Work top-to-bottom through the template to avoid line number shifts.

Group variables by section:
1. Text colors section
2. Button section
3. Scrollbar section
4. Editor section
5. ... (etc.)
6. New sections at end

### Step 3.2: Insert Variables in Existing Sections

For each variable that belongs in an existing section:

1. **Read the section** to get current content
2. **Identify exact insertion point**
3. **Use Edit tool** to insert the variable
4. **Match formatting**:
   - Indentation (usually 4 spaces)
   - Colon alignment (align with surrounding variables)
   - Comma placement (after every variable except the last in a section)
   - Spacing (1-2 blank lines between major sections)

**Example edit**:
```mustache
Before:
  "textPreformat.foreground":  "{{ syntax.08.base }}",
  "textPreformat.background":  "{{ surface.sunken }}",
  "textSeparator.foreground":  "{{ border.mid }}",

After:
  "textPreformat.foreground":  "{{ syntax.08.base }}",
  "textPreformat.background":  "{{ surface.sunken }}",
  "textPreformat.border":      "{{ border.dim }}",
  "textSeparator.foreground":  "{{ border.mid }}",
```

### Step 3.3: Create New Sections (If Needed)

If multiple related variables don't fit in existing sections, create a new section:

1. **Position**: Before the closing `}` of the colors object
2. **Add section comment** following your template's style:
   ```mustache
   /* Markdown alerts (GitHub-style) .................................. */
   ```
3. **Add variables** with proper indentation and alignment
4. **Ensure proper commas**: Variables within the section need trailing commas; the last variable before `}` should NOT have a comma

**Example new section**:
```mustache
    "gauge.errorForeground":   "{{ surface.sunken }}",


    /* Markdown alerts (GitHub-style) .................................. */
    "markdownAlert.note.foreground":      "{{ ui.info.base }}",
    "markdownAlert.tip.foreground":       "{{ ui.success.base }}",
    "markdownAlert.important.foreground": "{{ ui.accent2.base }}",
    "markdownAlert.warning.foreground":   "{{ ui.warning.base }}",
    "markdownAlert.caution.foreground":   "{{ ui.danger.base }}",


    /* Agent session (AI assistants) ..................................... */
    "agentSessionReadIndicator.foreground":           "{{ text.dim }}",
    "agentSessionSelectedBadge.border":               "{{ border.mid }}",
    "agentSessionSelectedUnfocusedBadge.border":      "{{ border.dim }}"
  },
  "tokenColors": [
```

### Step 3.4: Handle Common Syntax Patterns

**Opacity concatenation**:
```mustache
"editorOverviewRuler.commentDraftForeground": "{{ ui.warning.mid }}{{ opacity.mid-low }}"
```

**Inline comments** (if your template uses them):
```mustache
"button.secondaryBackground": "{{ button.secondary.bg }}", // notification to install extensions
```

**Section comments** (multi-line):
```mustache
/* Editor Gutter

   Requires e.g. GitHub pull requests extension to preview these comment ranges
*/
```

## Phase 4: Verification

**Goal**: Ensure all changes are correct and the theme generates successfully.

### Step 4.1: Regenerate Themes

Run your theme generation pipeline:

```bash
# Generate color schemes (merge JSON data files)
node scripts/generate-schemes.js

# Generate final themes (apply mustache template)
node scripts/generate-themes.js

# Or combined (watch mode)
npm run watch
```

**Check for errors**:
- JSON syntax errors (missing commas, unterminated strings)
- Template variable resolution issues
- File write errors

### Step 4.2: Validate Completeness

Re-run the discovery script to verify all variables are now present:

```bash
npm run fetch
cat temp/missing-vars.txt
```

**Success**: The file should be empty (or contain only deprecated variables you intentionally skip).

### Step 4.3: Verify Variable Count

Count total variables in your template:

```bash
grep -c '".*":' src/templates/theme.mustache
```

Should increase by the number of variables you added.

### Step 4.4: Test in VS Code

1. **Load a generated theme** in VS Code
2. **Check new variables apply** (if possible to trigger those UI elements)
3. **Verify no visual regressions** in existing areas

## Best Practices

### Color Token Selection

✅ **Do**:
- Use semantic tokens, not hard-coded hex values
- Match patterns from similar variables in your template
- Follow semantic meaning (error → danger, warning → warning, etc.)
- Use dimmer variants for inactive/unfocused states
- Apply GitHub conventions for markdown alerts

❌ **Don't**:
- Hard-code colors that won't adapt to theme variants
- Mix semantic meanings (e.g., using danger colors for success states)
- Ignore existing patterns in your template

### Positioning and Organization

✅ **Do**:
- Follow VS Code's official documentation ordering
- Group related variables together
- Add new sections only when variables don't fit existing sections
- Maintain section comments for clarity
- Work top-to-bottom to avoid line number confusion

❌ **Don't**:
- Randomly place variables wherever convenient
- Skip sections or break logical groupings
- Add variables without checking official ordering

### Common Patterns

**Borders**:
- Borderless elements: `border.none`
- Subtle dividers: `border.dim`
- Standard borders: `border.mid`
- Emphasized borders: `border.base`

**Backgrounds**:
- Transparent: `surface.none`
- Recessed/input fields: `surface.sunken`
- Default: `surface.base`
- Elevated: `surface.raised.min/low/mid/high`

**Text hierarchy**:
- Primary: `text.base`
- Secondary: `text.mid`
- Tertiary: `text.dim`
- Disabled: `text.disabled`
- On colored backgrounds: `text.on-ui`

**Semantic UI colors**:
- Errors/danger: `ui.danger.*` (red)
- Warnings: `ui.warning.*` (yellow)
- Success: `ui.success.*` (green)
- Info: `ui.info.*` (blue)
- Accents/highlights: `ui.accent1/2/3.*` (theme-specific)

**State patterns**:
- Draft/pending: Warning colors
- Inactive/unfocused: Dimmer variants or `none`
- Selected focused: More prominent (base/mid)
- Selected unfocused: Less prominent (dim)

## Troubleshooting

### IDE Warnings About Color Format

**Issue**: IDE shows warnings like "Invalid color format. Use #RGB, #RGBA, #RRGGBB or #RRGGBBAA" on mustache variables.

**Solution**: This is expected. The IDE's mustache/JSON validator doesn't understand that `{{ variable }}` will be replaced during build. These warnings disappear after theme generation.

### Theme Generation JSON Errors

**Issue**: Generation fails with "Unterminated string" or "Unexpected token" errors.

**Solution**: Check for:
- Missing or extra commas
- Mismatched quotes
- Unclosed braces/brackets
- Invalid template variable syntax

### File Modified Since Read

**Issue**: Edit tool fails with "File has been modified since read, either by the user or by a linter."

**Solution**: Re-read the file section and try the edit again. Auto-formatters or watchers may have modified the file.

### Line Numbers Don't Match

**Issue**: Variables aren't where the plan said they'd be.

**Solution**: Line numbers shift after each edit. Always work top-to-bottom through the template, or search for specific variable names instead of using line numbers.

### Variables Still Missing After Adding

**Issue**: Re-running fetch script still shows missing variables.

**Solution**:
1. Check variable names for typos
2. Ensure template syntax is correct (`"name": "{{ value }}"`)
3. Verify you saved the file
4. Check if the discovery script has caching issues

### Generated Theme Doesn't Load

**Issue**: VS Code reports theme file is invalid.

**Solution**:
1. Validate JSON syntax of generated theme files
2. Check for duplicate variable names
3. Ensure closing braces/brackets are correct
4. Verify template variables all resolved (no `{{ }}` remaining in output)

## Quick Reference

**Common Commands**:
```bash
npm run fetch                      # Identify missing variables
node scripts/generate-schemes.js   # Generate color schemes
node scripts/generate-themes.js    # Generate final themes
npm run watch                      # Generate and watch for changes
cat temp/missing-vars.txt          # View missing variables
cat temp/vs-code-vars.txt          # View official ordering
grep -c '".*":' template.mustache  # Count variables
```

**File Locations**:
- Template: `src/templates/theme.mustache`
- Discovery script: `scripts/fetch-vs-code-vars.js`
- Missing vars: `temp/missing-vars.txt`
- Official order: `temp/vs-code-vars.txt`
- Theme data: `src/themes/mode/dark.json`
- Generated themes: `dist/*.json`

**Semantic Token Hierarchy**:
```
surface.none < surface.sunken < surface.base < surface.raised.min/low/mid/high
text.disabled < text.dim < text.mid < text.base
border.none < border.dim < border.mid < border.base
```
