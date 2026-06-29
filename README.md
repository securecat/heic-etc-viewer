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

### [2.3.0] - 2026-06-29

#### Added

- Tile view layout mode: images fill the viewport width in justified rows while maintaining original aspect ratios; toggle between tile and default grid view via the ◰ button in the toolbar; the size slider controls target row height in tile mode

#### Changed

- Icon button `aria-label` and `title` attributes are now always identical and describe the resulting action (what clicking will do)
  - Folder tree toggle: "Hide folder tree" / "Show folder tree"
  - Checker background button: "Switch to checker background" / "Switch to default background"
  - Tile view button: "Switch to tile view" / "Switch to default view"
  - Lightbox close button: added `title="Close"`

#### Removed

- HEIC and PDF status badges from the header (debug artifacts from early development, no longer needed)

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

ローカルサーバー起動後、Chromeで `http://localhost:3000/heic-etc-viewer.html` を開きます。

## 更新履歴

### [2.3.0] - 2026-06-29

#### 追加

- タイルビューレイアウトモード：画像が縦横比を維持したまま、ビューポート幅いっぱいに並ぶJustifiedレイアウト；ツールバーの ◰ ボタンでグリッドビューとの切り替えが可能；タイルモード時はサイズスライダーが行の高さを制御

#### 変更

- アイコンボタンの `aria-label` と `title` 属性を整理：常に同じ値で、クリック後の動作（アクション）を説明するよう統一
  - フォルダツリーの開閉ボタン：「Hide folder tree」 / 「Show folder tree」
  - 市松模様ボタン：「Switch to checker background」 / 「Switch to default background」
  - タイルビューボタン：「Switch to tile view」 / 「Switch to default view」
  - ライトボックスのCloseボタンに `title="Close"` を追加

#### 削除

- ヘッダーのHEIC・PDFステータスバッジを削除（開発初期のデバッグ用バッジ、現在は不要）

全履歴は [CHANGELOG.md](CHANGELOG.md) を参照。

