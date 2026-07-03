# Changelog

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
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

