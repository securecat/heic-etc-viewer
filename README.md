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

### [3.5.0] - 2026-07-09

#### Added

- Image diff mode: open a parent folder containing exactly two subfolders whose image files share the same filename (ignoring extension), and opening a matched file in the lightbox shows both versions overlaid with a divider that follows the mouse cursor — the alphabetically-first subfolder is shown on the left. Files without a match, or matched pairs that aren't both images, fall back to the normal single-image lightbox
  - The divider stops at the image's actual edges instead of continuing into any letterboxed empty space
  - Each side shows a small badge with its file extension, positioned at that image's own corner (top-left for the left side, top-right for the right side); each badge gets sliced away by the divider the same way its image does, rather than disappearing abruptly
  - Click the comparison to lock the divider in place (it turns orange); click again to resume following the mouse. The locked position is remembered relative to the image itself, so resizing the window keeps it in place instead of drifting when the letterboxing ratio changes
- "WebP (High compression)" and "JPEG (High compression)" convert options, using a much lower quality setting (0.3 vs. the existing options' 0.92) for a substantially smaller file size — useful for making format-conversion artifacts obvious when comparing with image diff mode

See [CHANGELOG.md](CHANGELOG.md) for full history.

---

# HEIC etc Viewer（HEICなどビューワー）

HEIC、PDF、ICOに対応した、単一ファイルで動作するローカル画像・動画ビューアー＆コンバーター。iPhoneから書き出した写真の閲覧・変換に最適化されています。

## 概要

「HEIC etc Viewer」は、ブラウザ上で完全に動作する単一のHTMLファイルです。データがサーバーに送信されることはなく、すべてのファイル処理はブラウザとローカルストレージの間で完結します。そのため、Web上でホストする場合でもローカルで実行する場合でも、同様に利用可能です。
対応形式は、HEIC/HEIF、JPEG、PNG、WebP、GIF、AVIF、SVG、BMP、TIFF、MP4、WebM、MOV、PDF、ICOです。フォルダの移動は、ツリーパネルで行えます。主な機能として、サムネイルのキャッシュ、ドラッグ操作でズーム範囲を選択できるライトボックスビューア、透過画像用の市松模様の背景表示、動画のループ再生、スライドショーモードなどを備えています。静止画（HEIC/HEIF、JPEG、PNG、WebP、BMP、TIFF、AVIF）はWebP・PNG・JPEG・PDFに変換して保存することもでき、1ファイルずつでも、まとめてzipでも保存できます。

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

### [3.5.0] - 2026-07-09

#### 追加

- 画像Diffモードを追加。直下のサブフォルダがちょうど2つあり、その中の画像ファイルが拡張子違いで同じファイル名（ベースネーム）を持つ場合、ライトボックスでその2枚を重ねて表示し、マウスカーソルの位置に追従する境界線で比較できるように。左側にはフォルダ名がアルファベット順で先に来る方を表示。対になるファイルが無い場合や、ペアが画像同士でない場合は通常の単体ライトボックス表示にフォールバック
  - 境界線は、レターボックスの余白部分ではなく画像の実際の端で止まるように
  - 両サイドに拡張子を示す小さいバッジを表示。その画像自身の角（左側は左上、右側は右上）に位置を合わせ、画像本体と同じように境界線によって少しずつ断ち切られていく（唐突に消えたりはしない）
  - クリックすると境界線をその位置で固定（オレンジ色に変化）、再度クリックでマウス追従を再開。固定位置は画像自体を基準に覚えておくため、ウィンドウのリサイズでレターボックスの比率が変わっても位置がズレない
- 変換の選択肢に「WebP (High compression)」「JPEG (High compression)」を追加。既存の選択肢（quality 0.92）よりかなり低いquality 0.3を使い、ファイルサイズを大幅に削減。画像Diffモードで見比べた時に変換による劣化が分かりやすくなる

全履歴は [CHANGELOG.md](CHANGELOG.md) を参照。

