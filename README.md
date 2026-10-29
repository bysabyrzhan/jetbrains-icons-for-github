# JetBrains Icons for GitHub

An independent browser extension that replaces GitHub repository file and folder icons with icons from the IntelliJ Platform icon set.

## Preview

<p align="center">
  <img src="screenshots/github-repository-light.png" alt="GitHub repository listing in light theme" width="49%">
  <img src="screenshots/github-repository-dark.png" alt="GitHub repository listing in dark theme" width="49%">
</p>

> This project is not affiliated with or endorsed by JetBrains.

## Features

- Shows file and folder icons in GitHub repository listings and the file tree sidebar.
- Switches between light and dark icon variants to match GitHub's theme.
- Uses specific icons for `.css`, `.html`, `.js`, `.json`, `.jsx`, `.md`, `.svg`, `.ts`, `.tsx`, and `.txt` files.
- Recognizes `.editorconfig` and `.gitignore` by filename.
- Uses a folder icon for directories and an unknown-file icon for other files.

## Development status

Early development. The extension currently uses plain JavaScript and CSS; no build step is required.

The extension has been tested in Firefox and Microsoft Edge. Edge 136 or later is required for the `browser.*` API namespace.

## Install locally

### Firefox

1. Open `about:debugging` in Firefox.
2. Select **This Firefox**.
3. Click **Load Temporary Add-on…**.
4. Choose the project's `manifest.json` file.

Temporary add-ons are removed when Firefox closes. After changing extension files, reload the add-on from `about:debugging` and refresh the GitHub tab.

### Microsoft Edge

1. Open `edge://extensions`.
2. Turn on **Developer mode**.
3. Click **Load unpacked**.
4. Select the project folder containing `manifest.json`.

After changing extension files, reload the extension and refresh the GitHub tab.

## Project structure

- `manifest.json` — extension metadata and browser configuration.
- `content.js` — finds GitHub file and folder entries and selects their icons.
- `styles.css` — icon sizing and theme switching.
- `icons/` — light and dark SVG assets.

## Icon licenses

The included IntelliJ Platform SVG icons are licensed under Apache License 2.0, as identified in each SVG's copyright comment. A copy of the license is included in [`LICENSE-APACHE-2.0.txt`](LICENSE-APACHE-2.0.txt). Keep the original copyright and license comments in the SVG files when modifying or redistributing them.

