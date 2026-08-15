# HEIC etc Viewer

A single-file local image/video viewer and converter with HEIC, PDF, and ICO support — built for browsing and converting iPhone photo exports.

## Overview

**HEIC etc Viewer** is a single HTML file that runs entirely in your browser. No data is sent to any server — all file processing happens locally between your browser and your local storage. This means it works equally well whether hosted on the web or run locally. The UI is available in English and Japanese.

### Supported formats

- Images: HEIC/HEIF, JPEG, JFIF, PNG, WebP, GIF, AVIF, SVG, BMP, TIFF, ICO
- Videos: MP4, WebM, MOV, WMV
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
- WMV is converted to MP4 in your browser on demand and then played
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
- **[mediabunny](https://github.com/Vanilagy/mediabunny)** — audio track extraction from videos (loaded from CDN)
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

### [3.22.1] - 2026-08-16

#### Added

- Thumbnails now say "Loading thumbnail…" beside the spinner while they are being prepared, so slow formats (HEIC, TIFF, WMV) no longer look like nothing is happening. At the smallest thumbnail size the spinner is shown alone, and results such as "Failed to load" are always shown regardless of size. For the first WMV, the converter's download and start-up are reported as their own steps before that

#### Fixed

- WMV thumbnails were mostly not generated at all. Asking ffmpeg for a single frame (`-frames:v 1`) makes it hang on many files — the decoding itself is fine, it is the "stop right after one frame" path that never returns. Thumbnails are now made by converting the first few seconds to MP4 (the same path the lightbox conversion already takes, which always worked) and then picking a frame from it with the viewer's regular video-thumbnail routine, so the usual handling that avoids dark openings applies to WMV as well
- A converted or extracted result could crash the next one with "memory access out of bounds": ffmpeg shuts its runtime down after a single run, so the instance is now created fresh for each job and discarded afterwards. The 31MB converter itself is still fetched only once
- A thumbnail for a large WMV took as long as it took to hand the whole file over to the converter — about 30 seconds for a 1GB file. Only the first 32MB is passed now, since just the opening seconds are needed, bringing it down to a few seconds
- The status text shown on a thumbnail while it loads was too dim (about 5.1:1) for something that reports progress; it is now brighter (about 7:1)
- The WMV badge on gallery thumbnails came in two colours: grey while the thumbnail was still queued, turning orange once its extraction started. The badge is now orange from the start, like the other video formats

See [CHANGELOG.md](CHANGELOG.md) for full history.

---

# HEIC etc Viewer（HEICなどビューアー）

HEIC、PDF、ICOに対応した、単一ファイルで動作するローカル画像・動画ビューアー＆コンバーター。iPhoneから書き出した写真の閲覧・変換に最適化されています。

## 概要

「HEIC etc Viewer」は、ブラウザ上で完全に動作する単一のHTMLファイルです。データがサーバーに送信されることはなく、すべてのファイル処理はブラウザとローカルストレージの間で完結します。そのため、Web上でホストする場合でもローカルで実行する場合でも、同様に利用可能です。UIは英語・日本語に対応しています。

### 対応形式

- 画像：HEIC/HEIF、JPEG、JFIF、PNG、WebP、GIF、AVIF、SVG、BMP、TIFF、ICO
- 動画：MP4、WebM、MOV、WMV
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
- WMVは都度ブラウザ内でMP4に変換して再生
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
- **[mediabunny](https://github.com/Vanilagy/mediabunny)** — 動画からの音声トラック抽出（CDNから読み込み）
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

### [3.22.1] - 2026-08-16

#### 追加

- サムネイルの読み込み中、スピナーの隣に「サムネイル読込中…」と表示するように。時間のかかる形式(HEIC・TIFF・WMV)で何も起きていないように見えることがなくなる。サムネイルサイズが最小のときはスピナーのみとし、「読込失敗」などの結果表示はサイズによらず常に表示する。WMVの初回は、その前に変換エンジンのダウンロードと起動も別の段階として表示する

#### 修正

- WMVのサムネイルがほとんど生成されなかった問題を修正。ffmpegに1フレームだけ出力させる指定(`-frames:v 1`)は、多くのファイルで戻ってこなくなる(デコード自体は正常で、「1フレーム出したら即終了」する処理が返らない)。先頭の数秒をMP4に変換し(ライトボックスの変換と同じ経路。こちらは常に成功していた)、そのMP4から通常の動画サムネイル生成でフレームを取り出す方式に変更した。冒頭の暗転を避ける既存の処理もWMVに適用される
- 変換・抽出のあと、次の処理が「memory access out of bounds」で落ちることがあった問題を修正。ffmpegは1回実行するとランタイムが終了するため、処理ごとにインスタンスを作り直して使い終わったら破棄するようにした(変換エンジン本体31MBの取得は初回の1度だけ)
- 大きなWMVのサムネイルが、ファイル全体を変換エンジンへ渡す時間だけ待たされていた(1GBで約30秒)問題を修正。必要なのは冒頭の数秒だけなので、先頭32MBのみを渡すようにして数秒で表示されるようにした
- サムネイルの読み込み中に表示する文字が、状態を伝えるには暗すぎた(約5.1:1)ため明るく変更(約7:1)
- ギャラリーのサムネイルに付くWMVバッジの色が2種類になっていた問題を修正。サムネイル生成の順番待ちの間はグレーで、生成が始まるとオレンジに変わっていた。他の動画形式と同じく、最初からオレンジで表示する

全履歴は [CHANGELOG.md](CHANGELOG.md) を参照。

