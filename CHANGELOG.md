# Changelog

All notable changes to the “b-theme-vscode” extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Added 
Changed 
Deprecated 
Removed
Fixed
Security



## [0.4.0] — 2023-03-23 

B Theme is now called Bikkuri Theme.

### Added 
- Styles for Profile Badge (introduced in [VS Code 1.76](https://code.visualstudio.com/updates/v1_76#_profile-badge))


## [0.3.0] — 2023-03-23

This is a significant release. One theme has grown into **8 dark theme variations** to choose from. The theme now covers the status bar and debugging styles.

### Added
- ✨ 7 new theme variations. B theme is now a collection of 8 dark themes:
  - Dark Warm & Lively
  - Dark Warm & Serene
  - Dark Moss & Lively
  - Dark Moss & Serene
  - Dark Plum & Lively
  - Dark Plum & Serene
  - Dark Coal & Lively
  - Dark Coal & Serene
- Debugging styles
- Status Bar styles

### Changed
- Refactored how tokens, schemes and templates are generated
- Muted multi-line comments in python
- Increased scrollbar contrast
- Updated Python syntax highlighting (function & support type)
- Consolidated opacity for colors
- Consolidated “Symbol Icons Colors” to tint.40
- Selection highlights



## [0.2.1] — 2023-03-18

### Added
- Sticky scroll hover

### Changed
- Improved contrast for text highlights (search results, find/match, variables)
- Toned down a highlight of Unicode characters
- Improved Diff Editor styles
- Improved Merge Editor styles
- Hid `inputOption.activeBorder`




## [0.2.0] — 2023-02-26

### Added 
- code samples to review syntax in a few languages
- markdown strikethrough text style

### Changed
- syntax highlighting for HTML
- syntax highlighting for pug
- syntax highlighting for Mermaid
- syntax highlighting for CSS/SCSS




## [0.1.5] — 2023-02-22

### Added 
- `terminal.findMatchBackground` and `terminal.findMatchHighlightBackground` to for background results in terminal (released in [VS Code 1.68](https://code.visualstudio.com/updates/v1_68#_terminal))
- bracket pair colorization as introduced in [VS Code 1.67](https://code.visualstudio.com/updates/v1_67#_editor)

### Changed
- `keyword.control.mermaid` to `violet2`
- Consolidated punctuation and markdown punctuation to gray40
- Increased contrast for scrollbarSlider.background



## [0.1.4] — 2022-04-10

### Added 
- Styles for Terminal cursor
- Styles for Quick Input title and focus colors

### Changed
- Consolidated hashtag colors in markdown to gray40
- Changed editorInfo.foreground to {{blue1}}
- Updated Peek view styles
- Increased contrast for bracket matching background
- Increased contrast for text selection background

### Removed
- ```gray25``` color from the color palette
- list.focusOutline color

## [0.1.3] — 2022-03-01

### Added
- Checkbox styles in Settings
- Terminal borders and background styles

### Fixed
- Increase contrast for “extensionIcon.starForeground”

### Security
- Development dependency (vsce) updated to its latest version



## [0.1.2] — 2022-01-07

### Added
- Project icon



## [0.1.1] — 2022-01-03

### Changed
- Selection & highlight colors in Suggest Widget
- Selection & highlight colors in Peek View
- Markdown syntax highlight: heading, link, and bold style (red—orange—yellow combination)



## [0.1.0] — 2022-01-02

### Added
- Scheme and template to generate a theme

### Changed
Since the previous release, I have split a theme into a scheme and a template and reiterated many theme definitions. There are many changes behind the scenes; here’s the list of notable ones:
- New definition of colors (yellow, orange, blue, grays)
- Consolidated minimap styles
- Consolidated Git decoration styles
- Muted underline, minimaps, and overview ruler colors
- Customized breadcrumb colors
- Consolidated dropBackground colors
- Consolidated buttons and badges into neutral gray colors
- Consolidated Tab colors
- Consolidate Panel colors
- Updated Quick Input highlights
- Consolidated Extensions buttons



## [0.0.2] — 2021-12-30

### Changed
- Consolidate borders color
- Darken title bar
- Make grays warmer
- Update focus highlight color (pink → violet)
- Update scrollbar colors
- Update editorOverviewRuler.infoForeground



## [0.0.1] — 2021-12-29
- Initial release
