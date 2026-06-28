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

### [2.1.1] - 2026-06-28

#### Added

- Added version number display in the app header (muted color)

#### Changed

- Consolidated two separate empty-state elements into one; local server guide section now only shown when running on `file://`
- Simplified the HTTP empty state to a single line of text
- Translated remaining Japanese UI text, `title`, and `aria-label` attributes to English

#### Fixed

- Thumbnail error labels (e.g. "Unplayable", "Failed to load") now wrap to multiple lines before clipping
- `$RECYCLE.BIN` folder is now excluded from the folder tree (both drag-and-drop and folder picker)
- Lightbox image not displaying due to `width`/`height` HTML attributes overriding CSS dimensions

See [CHANGELOG.md](CHANGELOG.md) for full history.

---

# HEIC etc Viewer（HEICなどビューワー）

HEIC、PDF、ICOに対応した、単一ファイルで動作するローカル画像・動画ビューアー。iPhoneから書き出した写真の閲覧に最適化されています。

## 概要

「HEIC etc Viewer」は、ブラウザ上で完全に動作する単一のHTMLファイルです。データがサーバーに送信されることはなく、すべてのファイル処理はブラウザとローカルストレージの間で完結します。そのため、Web上でホストする場合でもローカルで実行する場合でも、同様に利用可能です。
対応形式は、HEIC/HEIF、JPEG、PNG、WebP、GIF、AVIF、SVG、BMP、TIFF、MP4、WebM、MOV、PDF、ICOです。フォルダの移動は、開閉可能なツリーパネルで行えます。主な機能として、サムネイルのキャッシュ、ドラッグ操作でズーム範囲を選択できるライトボックスビューア、透過画像用の市松模様の背景表示、動画のループ再生、スライドショーモードなどを備えています。

### 技術スタック

ビルドツールやパッケージの依存関係を使用せず、単一のHTMLファイルとして構築されています。

- **Vanilla HTML** / **CSS** / **JavaScript** — フレームワーク不使用
- **[libheif.js](https://github.com/strukturag/libheif)** — WebAssemblyによるHEIC/HEIFデコード（CDNから読み込み）
- **[PDF.js](https://github.com/mozilla/pdf.js)** — WebAssemblyによるPDFサムネイルのレンダリング（CDNから読み込み）
- **Canvas API** — 動画フレームのサムネイル生成およびズーム領域のレンダリング
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

ローカルサーバ―起動後、Chromeで `http://localhost:3000/heic-etc-viewer.html` を開きます。

## 更新履歴

### [2.1.1] - 2026-06-28

#### 追加

- アプリヘッダーにバージョン番号を表示（ミュートカラー）

#### 変更

- 初期状態の2つのdiv要素を1つに統合；ローカルサーバー案内は `file://` で動作時のみ表示
- HTTPでの初期表示を1行の英語テキストに簡略化
- UIテキスト・`title`・`aria-label` 属性の英語訳漏れを修正

#### 修正

- サムネイルのエラーラベル（「Unplayable」「Failed to load」など）が断ち切られる前に複数行に折り返されるよう対応
- `$RECYCLE.BIN` フォルダをフォルダツリーから除外（ドラッグ＆ドロップ・フォルダ選択の両方）
- lightbox内で静止画が表示されない問題を修正（HTML `width`/`height` 属性がCSSを上書きしていた）

全履歴は [CHANGELOG.md](CHANGELOG.md) を参照。

