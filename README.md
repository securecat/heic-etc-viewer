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

### [3.9.0] - 2026-07-16

#### Added

- Alt text generation using Chrome's built-in on-device AI (Gemini Nano, Chrome 148+) — nothing is sent to any server. Works with JPEG, PNG, WebP, GIF, SVG, and AVIF; the output language follows the UI language
  - Bulk: "All" convert subject now offers "Export alt text (AI)", generating alt text for every eligible image and downloading a JSON file mapping each filename to its alt text
  - Per-file: the lightbox "Convert to..." menu offers "Alt text" — the result appears in the lightbox with a Copy button
  - On unsupported environments, running the feature explains the requirements (Chrome 148+, 22+ GB free disk space, more than 4 GB of VRAM, 16+ GB of RAM)

#### Changed

- Error and completion messages in the header and lightbox now sit on an opaque backing so they stay readable over other content, and the lightbox "Convert to..." menu resets when the lightbox is closed

#### Fixed

- The Download / Generate / Copy buttons had a transparent background and a semi-transparent border, so their contrast depended on whatever was behind them; they now use opaque colors
- The lightbox's "This video has no audio track" and one "Conversion failed" error message were hardcoded in English and never translated

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

### [3.9.0] - 2026-07-16

#### 追加

- Chrome内蔵のオンデバイスAI(Gemini Nano、Chrome 148以降)による代替テキスト生成機能を追加。サーバーには何も送信されない。対象はJPEG・PNG・WebP・GIF・SVG・AVIFで、生成言語はUIの表示言語に連動
  - 一括: 変換対象「すべて」の「代替テキストをエクスポート(AI)」で、対象画像すべての代替テキストを生成し、ファイル名と対にしたJSONをダウンロード
  - 個別: ライトボックスの「Convert to...」に「代替テキスト」を追加。結果はライトボックス内に表示され、コピーボタンでコピーできる
  - 非対応環境では実行時に必要要件(Chrome 148以降・空きストレージ22GB以上・VRAM 4GB超・RAM 16GB以上)を案内

#### 変更

- ヘッダー部・ライトボックスのエラー/完了メッセージに不透過の座布団を敷いて他の要素に重なっても読めるように変更。ライトボックスの「Convert to...」メニューは閉じたら選択を忘れるように変更

#### 修正

- ダウンロード/生成/コピーボタンの背景が透明・ボーダーが半透過で、下地次第でコントラスト比を確保できなかった問題を修正(不透過の配色に変更)
- ライトボックスの「This video has no audio track」と一部の「Conversion failed」エラーメッセージが英語のまま埋め込まれていて翻訳されなかった問題を修正

全履歴は [CHANGELOG.md](CHANGELOG.md) を参照。

