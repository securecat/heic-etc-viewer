# HEIC etc Viewer

A single-file local image/video viewer with HEIC, PDF, and ICO support — built for browsing iPhone photo exports.

## Overview

**HEIC etc Viewer** is a single HTML file that runs entirely in your browser. No data is sent to any server — all file processing happens locally between your browser and your local storage. This means it works equally well whether hosted on the web or run locally.
Supports HEIC/HEIF, JPEG, PNG, WebP, GIF, AVIF, SVG, BMP, TIFF, MP4, WebM, MOV, PDF, and ICO. Folder navigation is provided via a collapsible tree panel. Key features include thumbnail caching, a lightbox viewer with drag-to-select zoom, checkerboard background for transparent images, video loop, and slideshow mode.

### Tech Stack

Built as a single HTML file with no build tools or package dependencies.

- **Vanilla HTML** / **CSS** / **JavaScript** — no frameworks
- **[libheif.js](https://github.com/strukturag/libheif)** — HEIC/HEIF decoding via WebAssembly, loaded from CDN
- **[PDF.js](https://github.com/mozilla/pdf.js)** — PDF thumbnail rendering via WebAssembly, loaded from CDN
- **Canvas API** — thumbnail generation for video frames and zoom region rendering
- **File System API** (`webkitdirectory`, `DataTransferItem.webkitGetAsEntry`) — local folder access and directory tree traversal

## Installation

The easiest way is to open the hosted version on GitHub Pages:

**https://securecat.github.io/heic-etc-viewer/**

> Your files never leave your device. 

Alternatively, download heic-etc-viewer.html and open it directly in Chrome.

### Note for local use

Opening via `file://` disables folder drag & drop due to browser security restrictions. To enable it, run a local server in the same folder:

```
npx serve .
# or
python -m http.server 8080
```

Then open `http://localhost:3000/heic-etc-viewer.html` in Chrome.

## Changelog

### [2.1.0] - 2026-06-28

#### Added

- Embedded "HeV" icon as a Base64-encoded data URI favicon

#### Changed

- Replaced header app icon with "HeV" icon
- Localized all UI text and aria attributes to English
- Adjusted color palette (borders, badges, scrollbars, etc.)
- Made thumbnail strip background fully opaque
- Strengthened highlight style for active checkerboard and zoom buttons
- Made image dimensions display and prev/next buttons fully opaque in lightbox
- Added margin to zoom view to avoid overlap with header and lb-info bar
- Slideshow now always starts from file `1`

See [CHANGELOG.md](CHANGELOG.md) for full history.

