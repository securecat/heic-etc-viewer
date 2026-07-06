# HEIC etc Viewer

A single-file local image/video viewer and converter with HEIC, PDF, and ICO support — built for browsing and converting iPhone photo exports.

## Overview

**HEIC etc Viewer** is a single HTML file that runs entirely in your browser. No data is sent to any server — all file processing happens locally between your browser and your local storage. This means it works equally well whether hosted on the web or run locally.
Supports HEIC/HEIF, JPEG, PNG, WebP, GIF, AVIF, SVG, BMP, TIFF, MP4, WebM, MOV, PDF, and ICO. Folder navigation is provided via a collapsible tree panel. Key features include thumbnail caching, a lightbox viewer with drag-to-select zoom, checkerboard background for transparent images, video loop, and slideshow mode. Static images (HEIC/HEIF, JPEG, PNG, WebP, BMP, TIFF, AVIF) can also be converted and saved as WebP, PNG, JPEG, or PDF — one file at a time, or in bulk as a zip.

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

### [3.1.0] - 2026-07-04

#### Added

- A new "PDF (combine into one)" option in the header's bulk convert dropdown, alongside the existing "PDF (individual files)": converting a folder's images now lets you choose between one PDF per file (zipped) or a single multi-page PDF with one image per page
  - Requires at least 2 convertible files in the current folder; shows an inline error otherwise

See [CHANGELOG.md](CHANGELOG.md) for full history.

---

# HEIC etc Viewer（HEICなどビューワー）

HEIC、PDF、ICOに対応した、単一ファイルで動作するローカル画像・動画ビューアー＆コンバーター。iPhoneから書き出した写真の閲覧・変換に最適化されています。

## 概要

「HEIC etc Viewer」は、ブラウザ上で完全に動作する単一のHTMLファイルです。データがサーバーに送信されることはなく、すべてのファイル処理はブラウザとローカルストレージの間で完結します。そのため、Web上でホストする場合でもローカルで実行する場合でも、同様に利用可能です。
対応形式は、HEIC/HEIF、JPEG、PNG、WebP、GIF、AVIF、SVG、BMP、TIFF、MP4、WebM、MOV、PDF、ICOです。フォルダの移動は、開閉可能なツリーパネルで行えます。主な機能として、サムネイルのキャッシュ、ドラッグ操作でズーム範囲を選択できるライトボックスビューア、透過画像用の市松模様の背景表示、動画のループ再生、スライドショーモードなどを備えています。静止画（HEIC/HEIF、JPEG、PNG、WebP、BMP、TIFF、AVIF）はWebP・PNG・JPEG・PDFに変換して保存することもでき、1ファイルずつでも、まとめてzipでも保存できます。

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

### [3.1.0] - 2026-07-04

#### 追加

- header内の一括変換プルダウンに、既存の「PDF (individual files)」に加えて「PDF (combine into one)」を追加。フォルダ内の画像をPDFに変換する際、ファイルごとに個別のPDF（zip）にするか、1画像1ページの単一の複数ページPDFにまとめるかを選べるように
  - 変換対象ファイルが2つ以上ないと選択できず、1つ以下の場合はエラーメッセージを表示

全履歴は [CHANGELOG.md](CHANGELOG.md) を参照。

