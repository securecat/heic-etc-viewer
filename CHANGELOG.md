# Changelog

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
## [2.1.0] - 2026-06-28

### Added

- Embedded "HeV" icon as a Base64-encoded data URI favicon

### Changed

- Replaced header app icon with "HeV" icon
- Localized all UI text and aria attributes to English
- Adjusted color palette (borders, badges, scrollbars, etc.)
- Made thumbnail strip background fully opaque
- Strengthened highlight style for active checkerboard and zoom buttons
- Made image dimensions display and prev/next buttons fully opaque in lightbox
- Added margin to zoom view to avoid overlap with header and lb-info bar
- Slideshow now always starts from file `1`

## [2.0.0] - 2026-06-28

### Added

- Added video loop button (🔁), shown only when viewing a video
- Added slideshow button (▷), shown in gallery view
- Slideshow always starts from file 1 and loops
- Added interval input and `play video to end` checkbox for slideshow
- Zoom, checkerboard, and loop buttons hidden during slideshow
- `L` key toggles video loop

### Changed

- Finalized app name as "HEIC etc Viewer"; renamed file from `image-viewer.html` to `heic-etc-viewer.html`

## [1.5.0] - 2026-06-28

### Added

- Added zoom mode button (🔍) in lightbox
- Drag to select a rectangular region and expand it to fill the lightbox
- Clipping outside the selection via canvas rendering (no delay for videos)
- Checkerboard background toggle (▦ button or `C` key)

### Changed

- Zoom mode can also be toggled with the `Z` key
- `Esc` key cycles through: exit zoom → exit zoom mode → close lightbox
- Zoom view adapts to window resize
- Zoom button hidden when viewing PDFs

## [1.4.0] - 2026-06-28

### Added

- PDF support (thumbnail generated from page 1 via PDF.js; lightbox displays via iframe)
- ICO support (rendered natively by the browser; multi-size ICO files show an `ICO(Multi)` badge)
- PDF: OK status indicator
- New badge colors (PDF: red, ICO: green)

## [1.3.0] - 2026-06-27

### Added

- Video support (MP4, WebM, MOV)
- Video thumbnail generation via frame extraction
- `Unsupported` badge for MOV files that cannot be played
- Video player in lightbox view
- Play button (▶) overlay on video thumbnails

### Changed

- Supported file count now displayed in "N files" format

## [1.2.0] - 2026-06-27

### Added

- Added collapsible folder tree panel on the left side
- Tree nodes expand/collapse via toggle icon (▶); clicking a folder name selects it without expanding
- Root node auto-expands on load
- Added hamburger button (☰) to toggle the folder tree panel

### Removed

- Removed breadcrumb navigation (replaced by folder tree)

## [1.1.0] - 2026-06-27

### Added

- HEIC/HEIF support via libheif.js, with magic byte detection to correctly handle HEIC files that are actually JPEG
- Folder drag-and-drop support with drop overlay
- Subfolder listing with click-to-navigate and breadcrumb navigation
- `HEIC: OK` status indicator

### Changed

- `file://` protocol detection (drag-and-drop disabled with a guidance message)
- `HEIC(JPEG)` badge display

## [1.0.0] - 2026-06-25

### Added

- Initial release
- Folder selection via button (webkitdirectory)
- Support for JPEG, PNG, WebP, GIF, AVIF, SVG, BMP, and TIFF formats
- Thumbnail grid view
- Lightbox view on thumbnail click
- Keyboard navigation (← → to move between images, Esc to close)
- Filename filter, sort options, and thumbnail size slider
- Dark theme

