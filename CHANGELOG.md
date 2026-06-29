# Changelog

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
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

