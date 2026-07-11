# HEIC etc Viewer

A single-file local image/video viewer and converter with HEIC, PDF, and ICO support — built for browsing and converting iPhone photo exports.

## Overview

**HEIC etc Viewer** is a single HTML file that runs entirely in your browser. No data is sent to any server — all file processing happens locally between your browser and your local storage. This means it works equally well whether hosted on the web or run locally.
Supports HEIC/HEIF, JPEG, PNG, WebP, GIF, AVIF, SVG, BMP, TIFF, MP4, WebM, MOV, PDF, and ICO. Folder navigation is provided via a tree panel. Key features include thumbnail caching, a lightbox viewer with drag-to-select zoom, checkerboard background for transparent images, video loop, and slideshow mode. Static images (HEIC/HEIF, JPEG, PNG, WebP, BMP, TIFF, AVIF) can also be converted and saved as WebP, PNG, JPEG, or PDF — one file at a time, or in bulk as a zip.

### Tech Stack

Built as a single HTML file with no build tools or package dependencies.

- **Vanilla HTML** / **CSS** / **JavaScript** — no frameworks
- **[libheif.js](https://github.com/strukturag/libheif)** — HEIC/HEIF decoding via WebAssembly, loaded from CDN
- **[PDF.js](https://github.com/mozilla/pdf.js)** — PDF thumbnail rendering via WebAssembly, loaded from CDN
- **[jsPDF](https://github.com/parallax/jsPDF)** — PDF generation for the convert-to-PDF feature, loaded from CDN
- **[client-zip](https://github.com/Touffy/client-zip)** — zip generation for bulk conversion downloads, loaded from CDN
- **Canvas API** — thumbnail generation for video frames and zoom region rendering, and image re-encoding for the convert feature
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

### [3.7.0] - 2026-07-12

#### Added

- UI language switching between English and Japanese: a "Language" setting in the Settings & Information dialog, remembered in localStorage. The first visit follows the browser language, and `<html lang>` now tracks the selected language
- The Settings & Information dialog is now organized into three tabs — Settings (language), Guide (the previous dialog content), and About (license, copyright, and a link to GitHub Issues) — following the WAI-ARIA APG Tabs pattern. It always opens on the Settings tab, with a fixed height so switching tabs doesn't shift the layout

#### Changed

- The lightbox `Esc` hint now reflects what `Esc` actually does: "Close / Release&Exit zoom" normally, "Stop slideshow" during a slideshow, and just "Close" for PDFs and image-diff view
- The hint line's spacing no longer relies on full-width space characters (now laid out with CSS), the empty state says "Drag & drop a folder here", the lightbox's accessible name is now "Lightbox", and the filename filter input is wider

#### Removed

- The "Size" sort option: file sizes are unavailable for drag & dropped folders (the sort silently did nothing there), and sorting by size had little practical use
- The checker-background toggle (button and `C` shortcut) while viewing PDFs, where it had no visible effect

#### Fixed

- The slideshow button's `aria-label` now toggles along with its `title` when a slideshow starts and stops; the zoom button's `aria-label` now follows its three states instead of staying "Zoom mode"

See [CHANGELOG.md](CHANGELOG.md) for full history.

---

# HEIC etc Viewer（HEICなどビューアー）

HEIC、PDF、ICOに対応した、単一ファイルで動作するローカル画像・動画ビューアー＆コンバーター。iPhoneから書き出した写真の閲覧・変換に最適化されています。

## 概要

「HEIC etc Viewer」は、ブラウザ上で完全に動作する単一のHTMLファイルです。データがサーバーに送信されることはなく、すべてのファイル処理はブラウザとローカルストレージの間で完結します。そのため、Web上でホストする場合でもローカルで実行する場合でも、同様に利用可能です。
対応形式は、HEIC/HEIF、JPEG、PNG、WebP、GIF、AVIF、SVG、BMP、TIFF、MP4、WebM、MOV、PDF、ICOです。フォルダの移動は、ツリーパネルで行えます。主な機能として、サムネイルのキャッシュ、ドラッグ操作でズーム範囲を選択できるライトボックスビューアー、透過画像用の市松模様の背景表示、動画のループ再生、スライドショーモードなどを備えています。静止画（HEIC/HEIF、JPEG、PNG、WebP、BMP、TIFF、AVIF）はWebP・PNG・JPEG・PDFに変換して保存することもでき、1ファイルずつでも、まとめてzipでも保存できます。

### 技術スタック

ビルドツールやパッケージの依存関係を使用せず、単一のHTMLファイルとして構築されています。

- **Vanilla HTML** / **CSS** / **JavaScript** — フレームワーク不使用
- **[libheif.js](https://github.com/strukturag/libheif)** — WebAssemblyによるHEIC/HEIFデコード（CDNから読み込み）
- **[PDF.js](https://github.com/mozilla/pdf.js)** — WebAssemblyによるPDFサムネイルのレンダリング（CDNから読み込み）
- **[jsPDF](https://github.com/parallax/jsPDF)** — PDF変換保存機能のPDF生成（CDNから読み込み）
- **[client-zip](https://github.com/Touffy/client-zip)** — 一括変換ダウンロード時のzip生成（CDNから読み込み）
- **Canvas API** — 動画フレームのサムネイル生成・ズーム領域のレンダリング・変換機能での画像再エンコード
- **File System API** (`webkitdirectory`, `DataTransferItem.webkitGetAsEntry`) — ローカルフォルダへのアクセスおよびディレクトリツリーの走査

## インストール

最も簡単な方法は、GitHub Pagesでホストされているバージョンを開くことです：

**https://securecat.github.io/heic-etc-viewer/**

> サーバーへデータが送信されることはありません。ファイルの処理はすべて、ブラウザとローカルストレージの間でローカルに行われます。

あるいは、`heic-etc-viewer.html` をダウンロードし、Chrome で直接開いてください。

### ローカル環境で使用する際の注意点

`file://` 経由で開くと、ブラウザのセキュリティ制限により、フォルダのドラッグ＆ドロップが無効になります。これを有効にするには、同じフォルダ内でローカルサーバーを起動してください：

```
npx serve .
# または
python -m http.server 8080
```

ローカルサーバー起動後、Chromeで `http://localhost:3000/heic-etc-viewer.html` を開きます。

## 更新履歴

### [3.7.0] - 2026-07-12

#### 追加

- UI表示言語の英語・日本語切り替え：「設定と情報」ダイアログに「言語」設定を追加し、選択は localStorage に保存。初回はブラウザの言語設定に従い、`<html lang>` も選択言語に連動
- 「設定と情報」ダイアログを3タブ構成に変更 — 設定(言語)・ガイド(従来のダイアログ内容)・アバウト(ライセンス・著作権表記・GitHub Issues へのリンク)。WAI-ARIA APG の Tabs パターンに準拠。開くたびに必ず設定タブから始まり、高さは固定(タブを切り替えてもダイアログの大きさが変わらない)

#### 変更

- ライトボックスの `Esc` ヒントを実際の動作に合わせて変更：通常時は「閉じる / ズーム解除・終了」、スライドショー中は「スライドショー終了」、PDF・画像Diff表示時は「閉じる」のみ
- ヒント行の間隔に全角空白を使うのをやめCSSでレイアウトするように変更。初期画面の文言を「フォルダをドラッグ＆ドロップ」に変更、ライトボックスのアクセシブルネームを「Lightbox」に変更、ファイル名絞り込み欄の横幅を拡大

#### 削除

- ソートの「Size」オプションを削除：ドラッグ＆ドロップで開いたフォルダではファイルサイズが取得できず実質機能していなかった上、サイズ順のニーズが薄いため
- PDF表示中の市松模様背景切り替え(ボタン・`C` ショートカット)を削除。iframe表示のため効果がなかった

#### 修正

- スライドショーボタンの `aria-label` が、スライドショーの開始・停止時に `title` と一緒に切り替わるように修正。ズームボタンの `aria-label` も3つの状態に追従するように修正(「Zoom mode」のまま固定されていた)

全履歴は [CHANGELOG.md](CHANGELOG.md) を参照。

