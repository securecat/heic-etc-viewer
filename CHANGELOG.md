# Changelog

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
## [3.6.0] - 2026-07-11

### Added

- Full keyboard navigation in the folder tree, based on the WAI-ARIA APG treeview pattern: `↑` `↓` move between visible folders, `→` expands a closed folder, `←` collapses an open folder, `Home`/`End` jump to the first/last visible folder, and typing a character jumps to the next folder whose name starts with it
- Pressing `Enter` or `Space` again on the already-selected folder, or `→` on it when there is nothing left to expand, moves keyboard focus into the gallery (to the first item, or to the "no supported files" message when the folder has none); pressing `←` anywhere in the gallery moves focus back to the selected folder in the tree
- An `R` keyboard shortcut in the lightbox that rotates the video 90° counter-clockwise, same as the ↶ button (videos only)
- A "Keyboard operation" section in the Settings & Information dialog describing the folder tree, gallery, and lightbox keyboard controls — previously the only keyboard reference was the hint line at the bottom of the lightbox, which is hidden from screen readers

### Changed

- The folder tree is now a single Tab stop (roving tabindex): `Tab` enters the tree on the selected folder and one more `Tab` leaves it into the gallery, instead of tabbing through every folder row and its disclosure triangle individually
- Rebuilt the tree's markup as a semantic `<ul role="tree">` / `<li role="treeitem">` / `<ul role="group">` hierarchy with `aria-level`, `aria-setsize`, `aria-posinset`, `aria-expanded`, and `aria-selected`, so screen readers announce folder depth, position, and state correctly
- The disclosure triangle (▶) is now a pointer-only control hidden from assistive technology; keyboard users expand and collapse with the arrow keys on the folder itself
- The keyboard-hint line at the bottom of the lightbox now matches the file being shown (videos: `Z` / `R` / `L`, images: `Z` / `C`, PDFs: `C`) instead of always listing the same keys, and shows only `← →` and `Esc` during a slideshow

### Fixed

- The `L` (loop) shortcut no longer silently toggles the loop state while viewing images or PDFs, the `C` (checker background) shortcut no longer switches the background while viewing videos, and the `Z` (zoom) shortcut no longer triggers while zooming is unavailable (e.g. while a video is rotated) — each lightbox shortcut now works only when its corresponding button is visible

## [3.5.2] - 2026-07-09

### Changed

- The keyboard focus order now moves through header → folder tree → gallery → footer, instead of jumping to the footer before the gallery. The visual layout (tree and footer stacked on the left, gallery on the right) is unchanged; only the underlying HTML source order (and thus tab order) was corrected via CSS Grid

### Fixed

- Closing the lightbox (Esc, the ✕ button, or clicking the backdrop) now returns keyboard focus to the gallery item that was being viewed, instead of leaving focus nowhere

## [3.5.1] - 2026-07-09

### Fixed

- The lightbox's "Convert to..." dropdown and Download button are now hidden while showing an image diff pair, since it's ambiguous which of the two files would be converted

## [3.5.0] - 2026-07-09

### Added

- Image diff mode: open a parent folder containing exactly two subfolders whose image files share the same filename (ignoring extension), and opening a matched file in the lightbox shows both versions overlaid with a divider that follows the mouse cursor — the alphabetically-first subfolder is shown on the left. Files without a match, or matched pairs that aren't both images, fall back to the normal single-image lightbox
  - The divider stops at the image's actual edges instead of continuing into any letterboxed empty space
  - Each side shows a small badge with its file extension, positioned at that image's own corner (top-left for the left side, top-right for the right side); each badge gets sliced away by the divider the same way its image does, rather than disappearing abruptly
  - Click the comparison to lock the divider in place (it turns orange); click again to resume following the mouse. The locked position is remembered relative to the image itself, so resizing the window keeps it in place instead of drifting when the letterboxing ratio changes
- "WebP (High compression)" and "JPEG (High compression)" convert options, using a much lower quality setting (0.3 vs. the existing options' 0.92) for a substantially smaller file size — useful for making format-conversion artifacts obvious when comparing with image diff mode

## [3.4.1] - 2026-07-08

### Changed

- Video thumbnail generation (gallery grid and the "Thumbnail"/"Thumbnails" conversion) now tries a few points through the video instead of only the 10%-mark, skipping ones that look like a near-solid-color frame (fade-in/out, intro card) when a more detailed frame is available
- The "Thumbnail"/"Thumbnails" download now reuses the frame already captured for the gallery grid instead of re-decoding the video from scratch
- Hovering the selected folder in the tree now shows a distinct color (`#8AB2FF` text on `#1B375E` background) instead of the same color as a non-selected row
- The "Open Folder" button's hover background is now `#2D4EC1`, also applied while pressed (previously identical to its resting color, so hovering had no visible effect)

### Fixed

- Switching from a folder scrolled partway down to another folder with enough files to scroll no longer starts the new gallery at the previous scroll position; it now always starts at the top (grid layout only scrolled back to top on a resize-triggered relayout, never on an actual folder switch)

## [3.4.0] - 2026-07-08

### Added

- A "Thumbnail" ("Thumbnails" in the header's bulk dropdown) option in the video "Convert to..." menu: saves a JPEG snapshot taken from early in the video (10% into its duration, capped at 1 second). In the lightbox this downloads one image for the video being viewed; in the header it bundles one thumbnail per video into a zip when there's more than one

## [3.3.1] - 2026-07-08

### Fixed

- The "Convert to..." dropdown's fixed width didn't leave room for the native select arrow when its longest option (the placeholder text itself, or "PDF (combine into one)") exactly filled the box, causing the arrow to overlap the trailing text in both the header and the lightbox

## [3.3.0] - 2026-07-08

### Added

- Video conversion: "Sound" in the "Convert to..." dropdown (header bulk and lightbox single-file) extracts a video's audio track as-is, without re-encoding — the output file's actual codec depends on the source (e.g. AAC, Opus). Files with no audio track are skipped in bulk, or shown an error individually
- The lightbox's "Convert to..." now automatically shows the right options (image formats, or "Sound") for the file currently being viewed
- `title="Close"` on the Settings & Information dialog's close button

### Changed

- Accessibility: raised every font-size below 14px to 14px across the app (buttons, tree, footer, error messages, empty-state and file:// guidance text, lightbox controls, etc.), except the gallery thumbnail strip's filename/dimension text and loading/badge text, which stay as-is to fit small thumbnails
  - The Settings & Information dialog now uses larger text throughout (18px heading, 14px section labels, 16px body)
  - The gallery's format badge (HEIC/PDF/etc.) scales up to 12px once the thumbnail size slider is at or past the middle setting
  - The Download button's padding was tightened slightly to keep its height unchanged after the font-size increase

## [3.2.0] - 2026-07-07

### Added

- An "All" option in the header's "Convert subject" dropdown. Selecting it swaps "Convert to..." for a single "Export as a Zip" choice, which bundles every file currently shown in the gallery (after any filter) into one zip, unchanged — no conversion, any file type
- A note about "Export as a Zip" in the Settings & Information dialog, in its own section separate from the convertible-format listing

## [3.1.2] - 2026-07-07

### Added

- A "Convert subject" dropdown (Image / Video) before the header's "Convert to..." control, laying the groundwork for an upcoming video converter; the format list still shown today is the "Image" one, "Video" is a placeholder until that feature ships
  - The "Convert to..." dropdown's width is fixed to fit the longest option across both subjects, so it no longer resizes when switching between Image and Video
- A gear-icon "Settings & Information" button in the new footer, opening a dialog that lists the app's supported (viewable) and convertible file formats — the intended home for future settings
- A vertical divider in the header between "Open Folder" and the convert controls

### Changed

- The folder tree is now always visible; the header's show/hide toggle button has been removed
- The app name and version moved from the header into a new one-line footer beneath the folder tree, and dropped the small app icon; the title's font weight is now regular instead of bold

## [3.1.1] - 2026-07-07

### Changed

- Faster gallery thumbnails for JPEG/PNG/GIF/WebP/BMP: dimensions are now read directly from the file header, then `createImageBitmap`'s resize option decodes the image pre-scaled instead of at full resolution
- HEIC/HEIF thumbnail decoding now runs in a Web Worker instead of the main thread, so scrolling and other interactions no longer stall while thumbnails decode

### Fixed

- Switching to another folder while a large folder's thumbnails were still loading could pile up an unbounded number of concurrent decodes across folder switches, freezing the tab or crashing the browser; thumbnail loading is now capped to a few concurrent decodes and abandons stale work left over from a folder you've since navigated away from

## [3.1.0] - 2026-07-04

### Added

- A new "PDF (combine into one)" option in the header's bulk convert dropdown, alongside the existing "PDF (individual files)": converting a folder's images now lets you choose between one PDF per file (zipped) or a single multi-page PDF with one image per page
  - Requires at least 2 convertible files in the current folder; shows an inline error otherwise

## [3.0.2] - 2026-07-03

### Fixed

- The lightbox's prev/next nav buttons had a different hover color (`#3a3a3a`) than the header's icon buttons (`#6c6c6c`, e.g. tile view, slideshow); unified to match

## [3.0.1] - 2026-07-03

### Changed

- The Download button label now includes an emoji, matching the "Open Folder" button convention: 📁Download in the header (bulk), 📄Download in the lightbox (per-file)

## [3.0.0] - 2026-07-03

### Added

- Convert & save (image → WebP / PNG / JPEG / PDF), the first step toward this app also being a converter, not just a viewer
  - Per-file: a "Convert to..." select and Download button in the lightbox's bottom bar. Downloads the current file re-encoded in the chosen format, keeping the original resolution
  - Per-folder (bulk): the same controls in the toolbar, next to "Open Folder". Converts every convertible file currently shown in the gallery; a single result downloads directly, multiple results are bundled into a zip named after the current folder
  - Supported source formats for this first pass: HEIC/HEIF, JPEG, PNG, WebP, BMP, TIFF, AVIF (static images only — video, animated GIF, and APNG are not yet supported)
  - An inline error message appears next to the Download button when no format is selected, or (bulk only) when the current folder has no convertible files
  - While zoomed in the lightbox, converting saves just the zoomed-in crop at full resolution instead of the whole image

### Changed

- The header's Filter field is now narrower (was 120px, now 60px) to make room for the new bulk convert controls
- The Download buttons now use a distinct blue color scheme (background `#001C43`, border `#4D6EE1`, text `#DDDDDD`, hover background `#47638A`) instead of a transparent background, so they're actually visible
- Most component borders (buttons, selects, inputs) that used a dim gray (`#767676`) are now white for legibility; layout separator borders (toolbar bottom edge, folder tree panel edge) are unchanged
- The lightbox now traps keyboard focus while open (background content is marked `inert`), matching expected modal dialog behavior

### Fixed

- The Download buttons had no `:focus-visible` style, so the browser's default focus outline overlapped the button border; it now matches the rest of the app's focus ring style
- The lightbox prev/next nav buttons had no `:focus-visible` style either; added one with a larger `outline-offset` (4px) than usual since the buttons are large enough that a 2px offset didn't read as a clearly separated ring

## [2.4.1] - 2026-07-02

### Fixed

- Navigating to the previous/next file while zoomed (or while in zoom-selection mode) left the new file's lightbox starting in zoom-selection mode instead of a fully reset (non-zoom) state
- The prev/next nav buttons were unclickable while zoom-selection mode was active, because the zoom-selection canvas overlapped them; the canvas now leaves the nav buttons' columns uncovered so they stay clickable in every zoom state

## [2.4.0] - 2026-07-02

### Added

- Video rotate button in the lightbox: rotates the video 90° counter-clockwise per click, replacing the checkerboard button (which had no effect on opaque video)

### Changed

- Zoom and video rotation are now mutually exclusive: the zoom button is hidden while a video is rotated, and the rotate button is hidden while zoom mode is active, since combining the two would misalign the zoom selection coordinates

## [2.3.2] - 2026-06-29

### Fixed

- Lightbox images can now be viewed fullscreen by double-clicking; double-click again or Esc to exit
- Improved focus indicators and hover states for icon buttons and lightbox buttons

## [2.3.1] - 2026-06-29

### Fixed

- Tile view scroll position was reset to the top on relayout; fixed by reading scroll position before clearing the gallery
- Slider value was not applied when switching between tile and default view
- Reload button is no longer shown when a folder was opened via the file dialog (reload has no meaningful effect in this mode)

### Changed

- Folder exclusion rule expanded: all folders starting with `.` or `$` are now excluded from the tree (previously only `$RECYCLE.BIN` was excluded)

## [2.3.0] - 2026-06-29

### Added

- Tile view layout mode: images fill the viewport width in justified rows while maintaining original aspect ratios; toggle between tile and default grid view via the ◰ button in the toolbar; the size slider controls target row height in tile mode

### Changed

- Icon button `aria-label` and `title` attributes are now always identical and describe the resulting action (what clicking will do)
  - Folder tree toggle: "Hide folder tree" / "Show folder tree"
  - Checker background button: "Switch to checker background" / "Switch to default background"
  - Tile view button: "Switch to tile view" / "Switch to default view"
  - Lightbox close button: added `title="Close"`

### Removed

- HEIC and PDF status badges from the header (debug artifacts from early development, no longer needed)

## [2.2.1] - 2026-06-29

### Fixed

- Zoom, checkerboard, and loop buttons reappeared during slideshow when switching between files
- During slideshow, a video with loop enabled and `play video to end` checked would loop indefinitely and never advance to the next slide
- During slideshow, a video shorter than the slide interval with `play video to end` unchecked would freeze on the last frame until the interval expired; the slideshow now advances as soon as the video ends

## [2.2.0] - 2026-06-29

### Added

- Keyboard focus indicators for the sort dropdown and thumbnail size slider
- Folder tree rows and toggle buttons are now focusable via the Tab key
- Toggle buttons in the folder tree have `aria-expanded` to reflect open/collapse state, and `aria-describedby` to associate them with the corresponding folder name; activatable with Enter or Space
- Landmark elements: toolbar (`<header>`), folder tree (`<nav>`), gallery area (`<main>`)
- `.sr-only` headings ("Toolbar", "Folder tree", "Gallery") inside each landmark for heading-based screen reader navigation

### Changed

- Lightbox video now starts with audio on and loop on by default

## [2.1.2] - 2026-06-29

### Added

- Added a privacy note in the empty state (shown when running on a web server) clarifying that no data is sent to any server

### Fixed

- Video thumbnails incorrectly showing "Unplayable" for large video files due to a 30-second metadata load timeout; timeout removed as the `error` event already handles truly unplayable formats

## [2.1.1] - 2026-06-28

### Added

- Added version number display in the app header (muted color)

### Changed

- Consolidated two separate empty-state elements into one; local server guide section now only shown when running on `file://`
- Simplified the HTTP empty state to a single line of text
- Translated remaining Japanese UI text, `title`, and `aria-label` attributes to English

### Fixed

- Thumbnail error labels (e.g. "Unplayable", "Failed to load") now wrap to multiple lines before clipping
- `$RECYCLE.BIN` folder is now excluded from the folder tree (both drag-and-drop and folder picker)
- Lightbox image not displaying due to `width`/`height` HTML attributes overriding CSS dimensions

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
- `PDF: OK` status indicator
- New badge colors (PDF: red, ICO: green)

## [1.3.0] - 2026-06-27

### Added

- Video support (MP4, WebM, MOV)
- Video thumbnail generation via frame extraction
- `Unplayable` badge for MOV files that cannot be played
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
- Keyboard navigation (`←` `→` to move between images, `Esc` to close)
- Filename filter, sort options, and thumbnail size slider
- Dark theme

---

# 更新履歴

## [3.6.0] - 2026-07-11

### 追加

- フォルダツリーに、WAI-ARIA APG の treeview パターンをベースにしたキーボード操作を追加：`↑` `↓` で表示中のフォルダ間を移動、`→` で閉じたフォルダを展開、`←` で開いたフォルダを折りたたみ、`Home`/`End` で先頭・末尾へ移動、文字キーで頭文字が一致する次のフォルダへジャンプ
- 選択済みのフォルダ上でもう一度 `Enter` または `Space` を押すか、選択済みのフォルダ上で展開するものがない状態で `→` を押すと、ギャラリーへキーボードフォーカスが移動（先頭アイテムへ。対応ファイルが0件の時は案内メッセージへ）。ギャラリー内の任意の位置で `←` を押すと、ツリーの選択中フォルダへフォーカスが戻る
- ライトボックスに `R` キーのショートカットを追加。↶ボタンと同じく動画を左に90°回転する（動画のみ）
- 「Settings & Information」ダイアログに「Keyboard operation」セクションを追加し、フォルダツリー・ギャラリー・ライトボックスのキーボード操作を記載（従来はライトボックス下端のヒント行しかキーボード操作の説明がなく、スクリーンリーダーからは読み取れなかった）

### 変更

- フォルダツリー全体を1つのタブストップに変更（roving tabindex）。`Tab` でツリーに入ると選択中のフォルダにフォーカスが乗り、もう一度 `Tab` でギャラリーへ抜ける（従来はすべてのフォルダ行と開閉三角が個別のタブストップになっていた）
- ツリーのマークアップを `<ul role="tree">` / `<li role="treeitem">` / `<ul role="group">` のセマンティックな階層構造に再構築し、`aria-level`・`aria-setsize`・`aria-posinset`・`aria-expanded`・`aria-selected` を付与。スクリーンリーダーがフォルダの階層・位置・状態を正しく読み上げられるように
- 開閉用の三角記号（▶）はポインタ専用の操作に変更し、支援技術からは非表示に。キーボードではフォルダ自体への矢印キー操作で開閉する
- ライトボックス下端の操作ヒント行を、表示中のファイル種別に合わせて切り替えるように変更（動画：`Z`/`R`/`L`、画像：`Z`/`C`、PDF：`C`。スライドショー中は `← →` と `Esc` のみ）

### 修正

- 画像・PDF表示中に `L`（ループ）ショートカットが見えないままループ状態を切り替えてしまう問題、動画表示中に `C`（市松背景）ショートカットが効いてしまう問題、ズームできない状態（動画の回転中など）でも `Z`（ズーム）ショートカットが反応してしまう問題を修正。ライトボックスの各ショートカットは、対応するボタンが表示されている時のみ動作するように

## [3.5.2] - 2026-07-09

### 変更

- キーボードフォーカスの移動順を、header→フォルダツリー→ギャラリー→footerに修正（従来はギャラリーより先にfooterに来てしまっていた）。見た目のレイアウト（左にツリー+footerが縦並び、右にギャラリー）は変えず、HTMLのソース順序（＝タブ移動順）をCSS Gridで修正

### 修正

- ライトボックスを閉じる（Esc・✕ボタン・背景クリックのいずれでも）と、それまで見ていたギャラリーのアイテムにキーボードフォーカスが戻るように修正（従来はフォーカスがどこにも残っていなかった）

## [3.5.1] - 2026-07-09

### 修正

- 画像Diffモードで比較表示中は、ライトボックスの「Convert to...」プルダウンとDownloadボタンを非表示にするように修正。2つのファイルのどちらを変換対象にするか判断できないため

## [3.5.0] - 2026-07-09

### 追加

- 画像Diffモードを追加。直下のサブフォルダがちょうど2つあり、その中の画像ファイルが拡張子違いで同じファイル名（ベースネーム）を持つ場合、ライトボックスでその2枚を重ねて表示し、マウスカーソルの位置に追従する境界線で比較できるように。左側にはフォルダ名がアルファベット順で先に来る方を表示。対になるファイルが無い場合や、ペアが画像同士でない場合は通常の単体ライトボックス表示にフォールバック
  - 境界線は、レターボックスの余白部分ではなく画像の実際の端で止まるように
  - 両サイドに拡張子を示す小さいバッジを表示。その画像自身の角（左側は左上、右側は右上）に位置を合わせ、画像本体と同じように境界線によって少しずつ断ち切られていく（唐突に消えたりはしない）
  - クリックすると境界線をその位置で固定（オレンジ色に変化）、再度クリックでマウス追従を再開。固定位置は画像自体を基準に覚えておくため、ウィンドウのリサイズでレターボックスの比率が変わっても位置がズレない
- 変換の選択肢に「WebP (High compression)」「JPEG (High compression)」を追加。既存の選択肢（quality 0.92）よりかなり低いquality 0.3を使い、ファイルサイズを大幅に削減。画像Diffモードで見比べた時に変換による劣化が分かりやすくなる

## [3.4.1] - 2026-07-08

### 変更

- 動画のサムネイル生成（ギャラリー一覧・「Thumbnail」/「Thumbnails」変換の両方）を、再生時間10%地点だけでなく数地点を試すように変更。より内容の分かる地点があれば、ほぼ単色（フェードイン/アウト、イントロ画面など）のフレームを避けて選ぶ
- 「Thumbnail」/「Thumbnails」のダウンロードは、ギャラリー表示用に生成済みのフレームを再利用するように変更（動画の再デコードなし）
- ツリーで選択済みのフォルダにカーソルを重ねた時の色を、非選択行と同じ色ではなく専用の配色（背景`#1B375E`、文字`#8AB2FF`）に変更
- 「Open Folder」ボタンのhover時の背景色を`#2D4EC1`に変更。押下時も同色を維持（これまでは通常時と同じ色でhoverしても見た目の変化がなかった）

### 修正

- スクロールした状態のフォルダから、スクロールが発生するほど内容の多い別のフォルダへ移動した際、新しいギャラリーが前のフォルダのスクロール位置のまま表示されてしまう問題を修正。常に先頭から表示されるように（グリッドレイアウトでは、リサイズ時の再レイアウトでしか先頭に戻しておらず、フォルダ切り替え時には戻していなかった）

## [3.4.0] - 2026-07-08

### 追加

- 動画の「Convert to...」メニューに「Thumbnail」（header一括では「Thumbnails」）を追加。動画の冒頭付近（再生時間の10%地点、最大1秒）のフレームをJPEGとして書き出す。ライトボックスでは表示中の動画1本分をダウンロード、headerでは対象が複数ある場合サムネイルをまとめてzipでダウンロード

## [3.3.1] - 2026-07-08

### 修正

- 「Convert to...」プルダウンの固定幅が、最長の選択肢（プレースホルダー自体、または「PDF (combine into one)」）でぴったりの幅になっていたため、プルダウンの矢印アイコンの余白が確保できず、header・ライトボックスの両方でテキスト末尾と矢印が重なっていた問題を修正

## [3.3.0] - 2026-07-08

### 追加

- 動画変換：「Convert to...」（header一括・ライトボックス個別とも）に「Sound」を追加。動画から音声トラックをそのまま（再エンコードなし）取り出す。実際の出力コーデックは元データ次第（AAC、Opus等）。音声トラックが無いファイルは、一括ではスキップ、個別ではエラー表示
- ライトボックスの「Convert to...」が、表示中のファイルに応じて（画像用の形式一覧／「Sound」）自動で切り替わるように
- Settings & Informationダイアログの閉じるボタンに `title="Close"` を追加

### 変更

- アクセシビリティ改善：アプリ全体で14px未満だったfont-sizeをすべて14pxに引き上げ（ボタン、フォルダツリー、フッター、エラーメッセージ、空の状態や`file://`案内文、ライトボックスの各種コントロールなど）。ただし、ギャラリーのサムネイル帯のファイル名・画角サイズ表示、および読み込み中/失敗テキストと拡張子バッジは、小さいサムネイルでも崩れないよう現状維持
  - Settings & Informationダイアログは全体的に文字を大きく（見出し18px、セクションラベル14px、本文16px）
  - ギャラリーの拡張子バッジ（HEIC/PDF等）は、サムネイルサイズスライダーが中央以降になると12pxへ拡大
  - Downloadボタンは、font-size引き上げ後も高さが変わらないようpaddingを微調整

## [3.2.0] - 2026-07-07

### 追加

- header内「変換対象」プルダウンに「All」を追加。選択すると「Convert to...」が「Export as a Zip」の1択に切り替わり、今ギャラリーに表示中の全ファイル（フィルタ適用後、種類は問わない）を無変換のまま1つのzipにまとめてダウンロードできる
- Settings & Informationダイアログに「Export as a Zip」についての説明を追加。変換対応形式の一覧とは別のセクションとして独立させた

## [3.1.2] - 2026-07-07

### 追加

- header内「Convert to...」の前に「変換対象」プルダウン（Image / Video）を追加。今後の動画コンバーター機能に向けた土台。現状表示されている形式一覧は「Image」選択時のものと同じで、「Video」は仕様確定までの仮置き
  - 「Convert to...」プルダウンの横幅は、Image/Videoどちらの選択肢の中でも最長のものに合わせて固定。切り替えても幅がガタつかないように
- 新設したフッター内に、歯車アイコンの「Settings & Information」ボタンを追加。押すと、対応している（表示できる）ファイル形式と、変換できるファイル形式の一覧を示すダイアログが開く。今後の設定項目の置き場としても想定
- header内「Open Folder」ボタンと変換コントロールの間に縦区切り線を追加

### 変更

- フォルダツリーを常時表示にし、header内の表示/非表示切り替えボタンを廃止
- アプリ名とバージョン表記を、headerからフォルダツリー下の新しいフッター（1行分）へ移設し、アイコン表示を廃止。タイトルの文字の太さも、太字から標準に変更

## [3.1.1] - 2026-07-07

### 変更

- JPEG/PNG/GIF/WebP/BMPのギャラリーサムネイル生成を高速化。ファイルヘッダーから直接実寸を読み取り、`createImageBitmap`の縮小オプションでフル解像度ではなく最初から縮小した状態でデコードするように
- HEIC/HEIFのサムネイルデコードをメインスレッドからWeb Workerへ移動。サムネイル生成中もスクロールなどの操作が固まらないように

### 修正

- 大きなフォルダのサムネイル読み込み中に別のフォルダへ切り替えると、フォルダ切り替えのたびに同時デコードが際限なく積み重なり、タブがフリーズしたりブラウザがクラッシュしたりすることがあった問題を修正。サムネイル読み込みの同時実行数を少数に制限し、すでに離れたフォルダの読み込みは打ち切るように

## [3.1.0] - 2026-07-04

### 追加

- header内の一括変換プルダウンに、既存の「PDF (individual files)」に加えて「PDF (combine into one)」を追加。フォルダ内の画像をPDFに変換する際、ファイルごとに個別のPDF（zip）にするか、1画像1ページの単一の複数ページPDFにまとめるかを選べるように
  - 変換対象ファイルが2つ以上ないと選択できず、1つ以下の場合はエラーメッセージを表示

## [3.0.2] - 2026-07-03

### 修正

- ライトボックスの左右移動ボタンのhover色が、header内のアイコンボタン（タイルビュー・スライドショー等）の`#6c6c6c`と異なり`#3a3a3a`になっていたのを統一

## [3.0.1] - 2026-07-03

### 変更

- Downloadボタンのラベルに、「Open Folder」ボタンと同じ慣習で絵文字を追加：header内（一括）は📁Download、ライトボックス（個別ファイル）は📄Download

## [3.0.0] - 2026-07-03

### 追加

- 変換保存機能（画像 → WebP / PNG / JPEG / PDF）を追加。ビューワーだけでなくコンバーターとしての第一歩
  - 個別ファイル：ライトボックス下部に「Convert to...」セレクトとDownloadボタンを設置。選択した形式に再エンコードして、元の解像度のままダウンロード
  - フォルダ一括：同様のコントロールをツールバーの「Open Folder」の隣に設置。ギャラリーに表示中の変換可能なファイルをすべて変換。結果が1件ならそのままダウンロード、複数件なら表示中のフォルダ名のzipにまとめてダウンロード
  - 今回対応する変換元形式：HEIC/HEIF, JPEG, PNG, WebP, BMP, TIFF, AVIF（静止画のみ。動画・アニメGIF・APNGは今回未対応）
  - 形式未選択でDownloadを押した時、または（一括の場合）フォルダ内に変換可能なファイルが無い時は、Downloadボタンの隣にエラーメッセージを表示
  - ライトボックスでズーム中に変換すると、画像全体ではなくズーム選択範囲だけを実寸で切り出して保存する

### 変更

- 一括変換用のコントロールを置くスペース確保のため、ヘッダーのFilterフィールドを狭く変更（120px→60px）
- Downloadボタンを、透過背景ではっきり見えなかった配色から、専用の青系配色（背景 `#001C43`、ボーダー `#4D6EE1`、文字 `#DDDDDD`、hover時背景 `#47638A`）に変更
- ボタン・セレクト・入力欄など、視認性の低いグレー（`#767676`）だったボーダーの大半をwhiteに変更。レイアウトの境界線（ツールバー下端・フォルダツリーパネルの境界）はそのまま
- ライトボックスを開いている間、背後のコンテンツを`inert`にしてキーボードフォーカスがモーダルの外に漏れないように変更（モーダルとして正しい挙動に）

### 修正

- Downloadボタンに`:focus-visible`スタイルが無く、ブラウザ標準のフォーカスリングがボタンのボーダーと重なっていた問題を修正。他のボタンと同じフォーカスリングスタイルに統一
- ライトボックスの前後移動ボタンにも`:focus-visible`スタイルが無かったため追加。ボタン自体が大きいため、通常より広い`outline-offset`（4px）にしてリングが単体で視認できるように

## [2.4.1] - 2026-07-02

### 修正

- ズーム中（またはズーム選択モード中）に前後のファイルへ移動すると、移動先のライトボックスがズーム選択モードのまま開始してしまう不具合を修正（完全にズーム解除された状態で開始するように）
- ズーム選択モード中、前後移動ボタンがズーム選択用キャンバスに覆われてクリックできなかった問題を修正。キャンバスがnavボタンの列を避けて描画されるようになり、どのズーム状態でもボタンをクリックできるように

## [2.4.0] - 2026-07-02

### 追加

- ライトボックスに動画回転ボタンを追加：クリックごとに動画を左回りに90°回転。市松模様ボタン（不透明な動画には効果がなかった）と入れ替え

### 変更

- ズームと動画回転は併用不可に：回転中はズームボタンを、ズームモード中は回転ボタンを非表示。両方を組み合わせるとズーム選択範囲の座標がずれてしまうため

## [2.3.2] - 2026-06-29

### 修正

- ライトボックスで画像をダブルクリックすると全画面表示に；もう一度ダブルクリックまたはEscで解除
- アイコンボタン・ライトボックスボタンのフォーカスインジケーターとhover表示のアクセシビリティを改善

## [2.3.1] - 2026-06-29

### 修正

- タイルビューで再レイアウト時にスクロール位置がトップに戻ってしまう問題を修正（ギャラリーのクリア前にスクロール位置を保存するよう変更）
- タイルビューとデフォルトビューの切り替え時に、スライダーの値が反映されていなかった問題を修正
- ファイル選択ボタン経由でフォルダを開いた場合はリロードボタンを非表示に（この場合リロードは意味をなさないため）

### 変更

- フォルダの除外ルールを拡張：`$RECYCLE.BIN` だけでなく、`$` または `.` で始まるフォルダすべてをツリーから除外するよう変更

## [2.3.0] - 2026-06-29

### 追加

- タイルビューレイアウトモード：画像が縦横比を維持したまま、ビューポート幅いっぱいに並ぶJustifiedレイアウト；ツールバーの ◰ ボタンでグリッドビューとの切り替えが可能；タイルモード時はサイズスライダーが行の高さを制御

### 変更

- アイコンボタンの `aria-label` と `title` 属性を整理：常に同じ値で、クリック後の動作（アクション）を説明するよう統一
  - フォルダツリーの開閉ボタン：「Hide folder tree」 / 「Show folder tree」
  - 市松模様ボタン：「Switch to checker background」 / 「Switch to default background」
  - タイルビューボタン：「Switch to tile view」 / 「Switch to default view」
  - ライトボックスのCloseボタンに `title="Close"` を追加

### 削除

- ヘッダーのHEIC・PDFステータスバッジを削除（開発初期のデバッグ用バッジ、現在は不要）

## [2.2.1] - 2026-06-29

### 修正

- スライドショー中にファイルが切り替わるたびにズーム・市松・ループボタンが再表示されてしまう問題を修正
- スライドショーで `play video to end` にチェックが入っている場合、ループ再生が有効な動画が終端までいってもループしてしまい、スライドが進まなくなる問題を修正
- スライドショーで `play video to end` が未チェックの場合、スライド表示時間より短い動画が最後のコマでスライド表示時間の分だけ静止してしまう問題を修正（動画の再生終了時点で次のスライドへ進むよう変更）

## [2.2.0] - 2026-06-29

### 追加

- ソートプルダウンとサムネイルサイズスライダーにキーボードフォーカスインジケーターを追加
- フォルダツリーのツリー行・トグルボタンをTabキーでフォーカス可能に
- フォルダツリーのトグルボタンに `aria-expanded`（開閉状態の明示）と `aria-describedby`（フォルダ名との関連付け）を追加；Enter/Spaceで操作可能
- ランドマーク要素を整備：ツールバー（`<header>`）、フォルダツリー（`<nav>`）、ギャラリーエリア（`<main>`）
- 各ランドマーク内に `.sr-only` 見出し（「Toolbar」「Folder tree」「Gallery」）を追加；スクリーンリーダーの見出しジャンプでも移動可能に

### 変更

- ライトボックスの動画：初期状態を音声ON・ループONに変更

## [2.1.2] - 2026-06-29

### 追加

- Webサーバー上で動作している場合、初期画面にプライバシーノートを表示（データはサーバーに送信されない旨）

### 修正

- 大きな動画ファイルで、メタデータ読み込みの30秒タイムアウトにより「Unplayable」と誤表示される問題を修正；`error` イベントが再生不可を検出するため、タイムアウト自体を削除

## [2.1.1] - 2026-06-28

### 追加

- アプリヘッダーにバージョン番号を表示（ミュートカラー）

### 変更

- 初期状態の2つのdiv要素を1つに統合；ローカルサーバー案内は `file://` で動作時のみ表示
- HTTPでの初期表示を1行の英語テキストに簡略化
- UIテキスト・`title`・`aria-label` 属性の英語訳漏れを修正

### 修正

- サムネイルのエラーラベル（「Unplayable」「Failed to load」など）が断ち切られる前に複数行に折り返されるよう対応
- `$RECYCLE.BIN` フォルダをフォルダツリーから除外（ドラッグ＆ドロップ・フォルダ選択の両方）
- lightbox内で静止画が表示されない問題を修正（HTML `width`/`height` 属性がCSSを上書きしていた）

## [2.1.0] - 2026-06-28

### 追加

- 「HeV」アイコンをBase64エンコードしてdata URIのfaviconとして埋め込み

### 変更

- ヘッダーのアプリアイコンを「HeV」アイコンに変更
- 全UIテキスト・aria属性を英語化
- カラーパレット調整（ボーダー・バッジ・スクロールバー等）
- サムネ帯の背景を不透過に
- 市松模様・ズームボタンのON状態ハイライト強化
- lightbox内の画角表示・左右ボタン不透過化
- ズーム表示のheaderとlb-info両方を避けるマージン
- スライドショー開始を常にファイル番号1から

## [2.0.0] - 2026-06-28

### 追加

- 動画ループボタン（🔁）→ 動画表示時のみ表示
- スライドショーボタン（▷）→ ギャラリー表示時に出現
- スライドショー中は常にファイル番号1から開始・ループ
- 秒数入力欄 + 「play video to end」チェックボックス
- スライドショー中はズーム・市松・ループボタン非表示
- `L` キーでループトグル

### 変更

- アプリ名の正式名称を「HEIC etc Viewer」に決定し、ファイル名を「image-viewer.html」から「heic-etc-viewer」に変更

## [1.5.0] - 2026-06-28

### 追加

- ライトボックスに 🔍 ズームモードボタン
- ドラッグで矩形選択→選択範囲をライトボックスいっぱいに拡大表示
- 矩形外はクリップ（canvas描画方式で動画は遅延なし）
- 市松模様背景トグル（▦ ボタン、`C` キー）

### 変更

- ズームモード ON/OFF は `Z` キーでもトグル
- `Esc` でズーム解除 → モード終了 → lightbox を閉じる の順
- ウィンドウリサイズで追従
- PDF 表示時はズームボタン非表示

## [1.4.0] - 2026-06-28

### 追加

- PDF対応（PDF.jsで1ページ目をサムネ生成、ライトボックスはiframe表示）
- ICO対応（ブラウザネイティブで表示、マルチサイズICOは `ICO(Multi)` バッジ）
- `PDF: OK` ステータス表示
- バッジ色追加（PDF: 赤、ICO: 緑）

## [1.3.0] - 2026-06-27

### 追加

- 動画対応（MP4・WebM・MOV）
- 動画サムネイル生成（フレーム切り出し）
- MOV再生不可の場合は「Unplayable」バッジ表示
- ライトボックスで動画プレーヤー表示
- 動画サムネに ▶ オーバーレイ

### 変更

- 対応ファイル点数表示を「files」形式に

## [1.2.0] - 2026-06-27

### 追加

- 左側にフォルダツリーパネル（折りたたみ可能）
- ツリーの展開・折りたたみはトグルアイコン（▶）で、フォルダ名クリックは選択のみ
- ルートノードは自動展開
- ☰ボタンでツリーパネルの開閉

### 削除

- パンくずナビを廃止（ツリーで代替）

## [1.1.0] - 2026-06-27

### 追加

- HEIC/HEIF対応（libheif.js、マジックバイト判定で実体がJPEGのHEICも正しく処理）
- フォルダのドロップ対応（ドロップオーバーレイ付き）
- サブフォルダ一覧表示→クリックで中に入る（パンくずナビ付き）
- `HEIC: OK` ステータス表示

### 変更

- `file://` 判定（ドロップ無効化＋案内表示）
- `HEIC(JPEG)` バッジ表示

## [1.0.0] - 2026-06-25

### 追加

- 初回リリース
- ボタンでフォルダ選択（webkitdirectory）
- JPEG・PNG・WebP・GIF・AVIF・SVG・BMP・TIFF対応
- サムネイルグリッド表示
- クリックでライトボックス表示
- `←` `→` キーで前後移動、`Esc`で閉じる
- ファイル名フィルター、並び替え、サムネサイズスライダー
- ダークテーマ

