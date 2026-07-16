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

### [3.10.0] - 2026-07-17

#### Added

- Conversion preview in the lightbox: when a lossy format (WebP / JPEG, normal or High compression) is selected, a Preview button appears next to Download. It converts in memory and overlays the original and the result using the image-diff comparison view, with badges showing the format and file size of each side. Press Preview again, change the format, or navigate away to return to the normal view
- Downloading while a preview of the same file and format is shown reuses the already-encoded result instead of converting again
- PDFs opened in the lightbox now offer "PDF (individual pages)", splitting the file into one PDF per page and downloading them as a zip

#### Changed

- Convert error messages are now cleared when the format dropdown is operated again
- Settings & Information dialog legibility: full-color accent-bar headings, bold selected tab, 16px headings/tabs, proper subheadings throughout the Guide, and a wider dialog (max 600px)

#### Fixed

- Converting (and previewing) a `.heic` file whose actual content is another format, such as HEIC(JPEG), always failed; the converter now uses the same real-type detection as the viewer

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

### [3.10.0] - 2026-07-17

#### 追加

- ライトボックスに変換プレビューを追加：非可逆形式(WebP / JPEG、通常・高圧縮)を選ぶとダウンロードボタンの隣に「プレビュー」ボタンが表示される。押すとメモリ内で変換し、画像Diffモードの比較表示で元画像と変換後を重ねて確認できる。バッジには両側の形式名とファイルサイズを表示。もう一度プレビューを押す・形式を変える・前後移動すると通常表示に戻る
- プレビュー表示中に同じファイル・同じ形式でダウンロードした場合は、エンコード済みの結果を再利用する(二重に変換しない)
- ライトボックスでPDFを表示中は、変換メニューに「PDF(ページごと)」が表示されるように。1ページずつのPDFに分割してzipでダウンロードできる

#### 変更

- 変換エラーメッセージを、形式プルダウンの再操作で消すように変更
- 「設定と情報」ダイアログの可読性を改善(見出しをテキスト色＋アクセントバーに、選択中タブを太字に、見出し・タブを16pxに、ガイド全体を小見出し構造に、最大幅を600pxに拡大)

#### 修正

- 拡張子が `.heic` で実体が別形式のファイル(HEIC(JPEG)等)の変換・プレビューが必ず失敗していた問題を修正(変換側も表示側と同じ実体判定を使うように)

全履歴は [CHANGELOG.md](CHANGELOG.md) を参照。

