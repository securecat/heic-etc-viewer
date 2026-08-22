# HEIC etc Viewer

A single-file local image/video viewer and converter with HEIC, PDF, and ICO support — built for browsing and converting iPhone photo exports.

## Overview

**HEIC etc Viewer** is a single HTML file that runs entirely in your browser. No data is sent to any server — all file processing happens locally between your browser and your local storage. This means it works equally well whether hosted on the web or run locally. The UI is available in English and Japanese.

### Supported formats

- Images: HEIC/HEIF, JPEG, JFIF, PNG, WebP, GIF, AVIF, SVG, BMP, TIFF, ICO
- Videos: MP4, WebM, MOV, WMV, MKV
- Documents: PDF

### Folders & gallery

- WAI-ARIA APG-compliant folder tree (fully keyboard operable) and folder drag & drop
- Two gallery layouts: the default grid, and a justified tile view that packs thumbnails edge-to-edge row by row while preserving their aspect ratios — thumbnail size is adjustable in both
- Thumbnail caching; video thumbnails automatically pick a representative frame, skipping dark or fade-in openings
- Video thumbnails play muted, at thumbnail size, while the pointer or keyboard focus rests on them — switchable in Settings, and off by default when the system asks for reduced motion
- Files whose extension doesn't match their content (e.g. a `.heic` file that is really a JPEG) are detected and handled by their real format

### Lightbox

- Images and videos open "as large as possible" by default, with an actual-size (1:1) toggle and scrolling for media that doesn't fit
- Drag-to-select zoom, 90° rotation, checker background (for checking transparency and frame boundaries), video loop, and slideshow mode
- Image diff: open a parent folder containing two subfolders with matching filenames to compare both versions with a mouse-driven divider
- WMV and MKV are converted to MP4 in your browser and then played — WMV on a button press, MKV automatically in the background when opened
- Keyboard shortcuts for all major operations

### Conversion

- Images → WebP, PNG, JPEG (normal or high compression), or PDF — one file at a time, or in bulk as a zip. Lossy conversions can be previewed against the original before downloading
- Videos → audio track extraction (without re-encoding where possible) and thumbnail image export
- PDFs → split into one PDF per page

### AI alt text

- Alt text generation for images using Chrome's built-in on-device AI (Prompt API / Gemini Nano) — per image in the lightbox, or in bulk as a JSON file. Nothing is sent off your device

## Tech Stack

Built as a single HTML file with no build tools or package dependencies.

- **Vanilla HTML** / **CSS** / **JavaScript** — no frameworks
- **[libheif.js](https://github.com/strukturag/libheif)** — HEIC/HEIF decoding via WebAssembly, run in a Web Worker (loaded from CDN)
- **[UTIF.js](https://github.com/photopea/UTIF.js)** — TIFF decoding, run in a Web Worker (loaded from CDN)
- **[ffmpeg.wasm](https://github.com/ffmpegwasm/ffmpeg.wasm)** — MP4 conversion for WMV playback, and WMV thumbnails (loaded from CDN)
- **[PDF.js](https://github.com/mozilla/pdf.js)** — PDF thumbnail rendering (loaded from CDN)
- **[jsPDF](https://github.com/parallax/jsPDF)** — PDF generation for the convert-to-PDF feature (loaded from CDN)
- **[pdf-lib](https://github.com/Hopding/pdf-lib)** — per-page PDF splitting (loaded from CDN)
- **[mediabunny](https://github.com/Vanilagy/mediabunny)** — MKV-to-MP4 playback conversion and audio track extraction from videos (loaded from CDN)
- **[client-zip](https://github.com/Touffy/client-zip)** — zip generation for bulk downloads (loaded from CDN)
- **Prompt API (Gemini Nano)** — Chrome's built-in on-device AI, used for alt text generation
- **Canvas API** — video frame thumbnails, zoom region rendering, and image re-encoding for conversion
- **File System API** (`webkitdirectory`, `DataTransferItem.webkitGetAsEntry`) — local folder access and directory tree traversal

## HeV Sender (companion Chrome extension)

**[HeV Sender](https://chromewebstore.google.com/detail/hev-sender/palmekgdpbibhjeoflhnocfnhieenebn)** is a Chrome extension that collects images, videos, and PDFs from the page you are viewing and sends them to HEIC etc Viewer. See [its own README](chrome-extension/README.md) for details.

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

### [3.25.0] - 2026-08-22

#### Added

- MKV video support: opening one in the lightbox converts it to MP4 automatically in the background — a fast container remux when the codec is natively supported, falling back to full re-encoding otherwise, with a progress bar and cancel button shown only if it takes a moment. Gallery thumbnails are extracted directly from the source file, without a full conversion. A file needing the slower re-encoding is marked with a badge; once converted, an MKV is shown as "MKV(MP4)" in its badge and behaves exactly like a native video file for the rest of the session — slideshow, hover playback, and the Sound/Thumbnail/Rotate conversion menu all included

#### Changed

- The lightbox's rotate button (`R`) now rotates 90° clockwise instead of counter-clockwise

#### Fixed

- "Export as zip" (convert subject "All") now uses the real format's extension for a file whose actual content differs from its name — a HEIC that's actually JPEG/PNG/GIF, or an MKV already converted to MP4 this session — instead of keeping the original extension

See [CHANGELOG.md](CHANGELOG.md) for full history.

---

# HEIC etc Viewer（HEICなどビューアー）

HEIC、PDF、ICOに対応した、単一ファイルで動作するローカル画像・動画ビューアー＆コンバーター。iPhoneから書き出した写真の閲覧・変換に最適化されています。

## 概要

「HEIC etc Viewer」は、ブラウザ上で完全に動作する単一のHTMLファイルです。データがサーバーに送信されることはなく、すべてのファイル処理はブラウザとローカルストレージの間で完結します。そのため、Web上でホストする場合でもローカルで実行する場合でも、同様に利用可能です。UIは英語・日本語に対応しています。

### 対応形式

- 画像：HEIC/HEIF、JPEG、JFIF、PNG、WebP、GIF、AVIF、SVG、BMP、TIFF、ICO
- 動画：MP4、WebM、MOV、WMV、MKV
- ドキュメント：PDF

### フォルダとギャラリー

- WAI-ARIA APG準拠のフォルダツリー（キーボード操作に完全対応）と、フォルダのドラッグ＆ドロップ
- ギャラリーは通常のグリッド表示に加え、縦横比を保ったままサムネイルを行ごとに隙間なく敷き詰めるタイル表示に切り替え可能。サムネイルサイズはどちらの表示でも調整できる
- サムネイルのキャッシュ。動画のサムネイルは冒頭の暗転やフェードインを避けて代表フレームを自動選択
- 動画のサムネイルは、マウスカーソルまたはキーボードフォーカスがある間、サムネイルのサイズのまま無音で再生。設定で切り替え可能（OSのモーション低減設定が有効な場合は初期値OFF）
- 拡張子と中身が食い違うファイル（例：中身がJPEGの `.heic`）は、実際の形式を検出して扱う

### ライトボックス

- 静止画・動画とも「できるだけ大きく」表示がデフォルト。原寸表示（1:1）への切り替えと、収まらない場合のスクロールに対応
- ドラッグで範囲選択するズーム、90度回転、市松模様背景（透過や画角の確認に）、動画のループ再生、スライドショーモード
- 画像Diff：同名ファイルを持つ2つのサブフォルダの親フォルダを開くと、マウス追従の境界線で両バージョンを重ねて比較できる
- WMV・MKVはブラウザ内でMP4に変換して再生（WMVはボタン操作で、MKVは開くと自動でバックグラウンド変換）
- 主要な操作はキーボードショートカットに対応

### 変換

- 画像 → WebP・PNG・JPEG（通常・高圧縮）・PDF。1ファイルずつでも、まとめてzipでも保存可能。非可逆形式は変換前に元画像と重ねてプレビュー比較できる
- 動画 → 音声トラックの抽出（可能な限り再エンコードなし）、サムネイル画像の書き出し
- PDF → 1ページずつのPDFに分割

### AIによる代替テキスト生成

- Chrome内蔵のオンデバイスAI（Prompt API / Gemini Nano）で画像の代替テキストを生成。ライトボックスで1枚ずつ、または一括でJSONファイルに書き出し。データが端末の外に送信されることはない

## 技術スタック

ビルドツールやパッケージの依存関係を使用せず、単一のHTMLファイルとして構築されています。

- **Vanilla HTML** / **CSS** / **JavaScript** — フレームワーク不使用
- **[libheif.js](https://github.com/strukturag/libheif)** — WebAssemblyによるHEIC/HEIFデコード。Web Worker上で実行（CDNから読み込み）
- **[UTIF.js](https://github.com/photopea/UTIF.js)** — TIFFデコード。Web Worker上で実行（CDNから読み込み）
- **[ffmpeg.wasm](https://github.com/ffmpegwasm/ffmpeg.wasm)** — WMV再生のためのMP4変換とサムネ表示（CDNから読み込み）
- **[PDF.js](https://github.com/mozilla/pdf.js)** — PDFサムネイルのレンダリング（CDNから読み込み）
- **[jsPDF](https://github.com/parallax/jsPDF)** — PDF変換保存機能のPDF生成（CDNから読み込み）
- **[pdf-lib](https://github.com/Hopding/pdf-lib)** — PDFのページごと分割（CDNから読み込み）
- **[mediabunny](https://github.com/Vanilagy/mediabunny)** — MKVの再生用MP4変換、動画からの音声トラック抽出（CDNから読み込み）
- **[client-zip](https://github.com/Touffy/client-zip)** — 一括ダウンロード時のzip生成（CDNから読み込み）
- **Prompt API（Gemini Nano）** — 代替テキスト生成に使うChrome内蔵のオンデバイスAI
- **Canvas API** — 動画フレームのサムネイル生成・ズーム領域のレンダリング・変換機能での画像再エンコード
- **File System API** (`webkitdirectory`, `DataTransferItem.webkitGetAsEntry`) — ローカルフォルダへのアクセスおよびディレクトリツリーの走査

## HeV Sender（連携Chrome拡張）

**[HeV Sender](https://chromewebstore.google.com/detail/hev-sender/palmekgdpbibhjeoflhnocfnhieenebn)** は、表示中のページの画像・動画・PDFを収集して HEIC etc Viewer へ送出するChrome拡張です。詳細は[拡張側のREADME](chrome-extension/README.md)を参照してください。

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

### [3.25.0] - 2026-08-22

#### 追加

- MKV動画に対応。ライトボックスで開くとバックグラウンドで自動的にMP4へ変換する。対応コーデックならコンテナの詰め替えだけで済みほぼ一瞬で終わり、非対応の場合は再エンコードにフォールバックして、時間がかかる時だけ進捗バーと中止ボタンを表示する。ギャラリーのサムネイルは元ファイルから、変換を経ずに直接生成する。再エンコードが必要と判明したファイルはバッジで示され、変換済みのMKVはバッジに「MKV(MP4)」と表示され、そのセッション中はスライドショー・ホバー再生・Sound/Thumbnail/Rotate変換メニューも含め、普通の動画ファイルと全く同じように扱われる

#### 変更

- ライトボックスの回転ボタン(`R`)が、反時計回りではなく時計回りに90度回転するようになった

#### 修正

- 「ZIPでエクスポート」(変換対象「すべて」)で、実体が名前と食い違うファイル(実体がJPEG/PNG/GIFだったHEIC、このセッション中にMP4へ変換済みのMKV)が、元の拡張子のままではなく実体に合わせた拡張子で入るようになった

全履歴は [CHANGELOG.md](CHANGELOG.md) を参照。

